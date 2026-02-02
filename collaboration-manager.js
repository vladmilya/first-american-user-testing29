// Collaboration Manager - Handles real-time sync with Supabase
// This replaces localStorage for multi-user collaboration

class CollaborationManager {
    constructor() {
        this.isEnabled = false;
        this.supabase = null;
        this.currentUser = null;
        this.currentCampaignId = null;
        this.subscriptions = [];
        this.onlineUsers = [];
        this.presenceInterval = null;
        this.isSyncing = false;
        this.pendingChanges = [];
        this.lastSyncTime = null;
    }

    // Initialize collaboration
    async init() {
        // Check if Supabase is configured
        if (!window.supabaseConfig) {
            console.log('Supabase not loaded, using local mode');
            return false;
        }

        const initialized = window.supabaseConfig.initSupabase();
        if (!initialized) {
            return false;
        }

        this.supabase = window.supabase;
        this.currentUser = window.supabaseConfig.getCurrentUser();
        this.isEnabled = true;

        // Check for campaign in URL
        this.currentCampaignId = this.getCampaignId();

        console.log('✅ Collaboration enabled for campaign:', this.currentCampaignId);
        console.log('👤 User:', this.currentUser.name);

        // Set up presence tracking
        this.startPresenceTracking();

        // Subscribe to real-time changes
        this.subscribeToChanges();

        // Show collaboration UI
        this.showCollaborationIndicator();

        return true;
    }

    // Get current campaign ID
    getCampaignId() {
        // First try URL
        let campaignId = window.supabaseConfig.getCampaignIdFromUrl();
        
        // Then try active campaign from localStorage
        if (!campaignId) {
            campaignId = localStorage.getItem('active_campaign');
        }
        
        // Create new if none exists
        if (!campaignId) {
            campaignId = 'campaign_' + Date.now();
            localStorage.setItem('active_campaign', campaignId);
        }

        return campaignId;
    }

    // Save notes to Supabase (replaces localStorage)
    async saveNotes(boardId, boardName, notes) {
        if (!this.isEnabled || this.isSyncing) {
            // Fallback to localStorage if Supabase not available
            return this.saveNotesLocal(boardId, notes);
        }

        try {
            const { data, error } = await this.supabase
                .from('note_boards')
                .upsert({
                    campaign_id: this.currentCampaignId,
                    board_id: boardId,
                    board_name: boardName,
                    notes: notes,
                    updated_by_id: this.currentUser.id,
                    updated_by_name: this.currentUser.name
                }, {
                    onConflict: 'campaign_id,board_id'
                });

            if (error) throw error;

            this.lastSyncTime = new Date();
            console.log('✅ Notes saved to cloud');
            
            // Also save to localStorage as backup
            this.saveNotesLocal(boardId, notes);

            return true;
        } catch (error) {
            console.error('Failed to save notes:', error);
            // Fallback to localStorage
            return this.saveNotesLocal(boardId, notes);
        }
    }

    // Load notes from Supabase
    async loadNotes(boardId) {
        if (!this.isEnabled) {
            return this.loadNotesLocal(boardId);
        }

        try {
            const { data, error } = await this.supabase
                .from('note_boards')
                .select('*')
                .eq('campaign_id', this.currentCampaignId)
                .eq('board_id', boardId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = not found
                throw error;
            }

            if (data && data.notes) {
                console.log('✅ Notes loaded from cloud');
                // Also save to localStorage as cache
                this.saveNotesLocal(boardId, data.notes);
                return data.notes;
            }

            // No data found, try localStorage
            return this.loadNotesLocal(boardId);
        } catch (error) {
            console.error('Failed to load notes:', error);
            return this.loadNotesLocal(boardId);
        }
    }

    // Subscribe to real-time changes
    subscribeToChanges() {
        if (!this.isEnabled) return;

        // Subscribe to note boards changes
        const notesChannel = this.supabase
            .channel('note_boards_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'note_boards',
                    filter: `campaign_id=eq.${this.currentCampaignId}`
                },
                (payload) => this.handleNoteChange(payload)
            )
            .subscribe();

        // Subscribe to online users changes
        const usersChannel = this.supabase
            .channel('online_users_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'online_users',
                    filter: `campaign_id=eq.${this.currentCampaignId}`
                },
                (payload) => this.handlePresenceChange(payload)
            )
            .subscribe();

        this.subscriptions.push(notesChannel, usersChannel);

        console.log('👂 Listening for real-time changes...');
    }

    // Handle incoming note changes
    handleNoteChange(payload) {
        console.log('📥 Note change received:', payload);

        // Ignore changes made by current user
        if (payload.new?.updated_by_id === this.currentUser.id) {
            return;
        }

        // Flag that we're syncing to prevent save loop
        this.isSyncing = true;

        // Update UI with new notes
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const boardId = payload.new.board_id;
            const notes = payload.new.notes;

            // Check if we're on the same board
            if (boardId === window.currentBoardId) {
                // Reload notes
                this.reloadNotesUI(notes);
                
                // Show notification
                this.showChangeNotification(payload.new.updated_by_name);
            }
        }

        setTimeout(() => {
            this.isSyncing = false;
        }, 500);
    }

    // Reload notes in UI
    reloadNotesUI(notes) {
        const board = document.getElementById('sticky-board');
        if (!board) return;

        // Clear existing notes
        board.innerHTML = '';

        // Render new notes
        if (notes && Array.isArray(notes)) {
            notes.forEach(noteData => {
                if (window.renderStickyNote) {
                    window.renderStickyNote(noteData);
                }
            });
        }
    }

    // Start presence tracking
    startPresenceTracking() {
        if (!this.isEnabled) return;

        // Update presence immediately
        this.updatePresence();

        // Update presence every 30 seconds
        this.presenceInterval = setInterval(() => {
            this.updatePresence();
            this.loadOnlineUsers();
        }, 30000);

        // Load online users initially
        this.loadOnlineUsers();
    }

    // Update user presence
    async updatePresence() {
        if (!this.isEnabled) return;

        try {
            await this.supabase.rpc('update_user_presence', {
                p_campaign_id: this.currentCampaignId,
                p_user_id: this.currentUser.id,
                p_user_name: this.currentUser.name
            });
        } catch (error) {
            console.error('Failed to update presence:', error);
        }
    }

    // Load online users
    async loadOnlineUsers() {
        if (!this.isEnabled) return;

        try {
            const { data, error } = await this.supabase
                .rpc('get_online_users', {
                    p_campaign_id: this.currentCampaignId
                });

            if (error) throw error;

            this.onlineUsers = data || [];
            this.updateCollaborationIndicator();
        } catch (error) {
            console.error('Failed to load online users:', error);
        }
    }

    // Handle presence changes
    handlePresenceChange(payload) {
        console.log('👥 Presence change:', payload);
        this.loadOnlineUsers();
    }

    // Show collaboration indicator
    showCollaborationIndicator() {
        let indicator = document.getElementById('collaboration-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'collaboration-indicator';
            indicator.className = 'collaboration-indicator';
            document.body.appendChild(indicator);
        }

        this.updateCollaborationIndicator();
    }

    // Update collaboration indicator
    updateCollaborationIndicator() {
        const indicator = document.getElementById('collaboration-indicator');
        if (!indicator) return;

        const otherUsers = this.onlineUsers.filter(u => u.user_id !== this.currentUser.id);
        const totalUsers = otherUsers.length + 1; // Including current user

        indicator.innerHTML = `
            <div class="online-dot"></div>
            <div>
                <div style="font-weight: 600; color: var(--text);">
                    ${totalUsers} ${totalUsers === 1 ? 'person' : 'people'} online
                </div>
                <div style="font-size: 0.75rem; color: var(--text-light);">
                    ${this.currentUser.name} (you)${otherUsers.length > 0 ? ', ' + otherUsers.map(u => u.user_name).join(', ') : ''}
                </div>
            </div>
            <button onclick="collaborationManager.showShareDialog()" 
                    style="margin-left: auto; padding: 0.4rem 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
                🔗 Share
            </button>
        `;
    }

    // Show share dialog
    showShareDialog() {
        if (window.supabaseConfig) {
            window.supabaseConfig.showShareLinkDialog(this.currentCampaignId);
        }
    }

    // Show change notification
    showChangeNotification(userName) {
        const notification = document.createElement('div');
        notification.className = 'collab-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: #3b82f6;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            font-weight: 600;
            font-size: 0.875rem;
            animation: slideUp 0.3s ease;
        `;
        notification.textContent = `📝 ${userName} updated the notes`;
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Fallback: Save to localStorage
    saveNotesLocal(boardId, notes) {
        const boards = JSON.parse(localStorage.getItem('note_boards') || '[]');
        const boardIndex = boards.findIndex(b => b.id === boardId);
        
        if (boardIndex >= 0) {
            boards[boardIndex].notes = notes;
        }
        
        localStorage.setItem('note_boards', JSON.stringify(boards));
        return true;
    }

    // Fallback: Load from localStorage
    loadNotesLocal(boardId) {
        const boards = JSON.parse(localStorage.getItem('note_boards') || '[]');
        const board = boards.find(b => b.id === boardId);
        return board?.notes || [];
    }

    // Cleanup
    destroy() {
        // Unsubscribe from channels
        this.subscriptions.forEach(sub => {
            if (sub && sub.unsubscribe) {
                sub.unsubscribe();
            }
        });

        // Stop presence tracking
        if (this.presenceInterval) {
            clearInterval(this.presenceInterval);
        }

        // Remove indicator
        const indicator = document.getElementById('collaboration-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Create global instance
const collaborationManager = new CollaborationManager();
window.collaborationManager = collaborationManager;

// Initialize when Note Taker is opened
document.addEventListener('DOMContentLoaded', () => {
    // Check if on note-taker page or has campaign in URL
    if (window.location.hash.includes('note-taker') || window.location.hash.includes('campaign=')) {
        setTimeout(() => {
            collaborationManager.init();
        }, 1000);
    }
});

// Initialize when navigating to note-taker
window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('note-taker') || window.location.hash.includes('campaign=')) {
        if (!collaborationManager.isEnabled) {
            collaborationManager.init();
        }
    }
});
