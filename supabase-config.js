// Supabase Configuration for Note Taker Collaboration
// Setup Instructions: https://supabase.com/dashboard

// ⚠️ SETUP REQUIRED:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Project Settings > API
// 4. Copy your Project URL and anon/public key below
// 5. Run the SQL setup in setup-supabase.sql

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_PROJECT_URL', // e.g., 'https://xxxxx.supabase.co'
    anonKey: 'YOUR_SUPABASE_ANON_KEY', // Your public anon key
    enabled: false // Set to true after setup
};

// Initialize Supabase client
let supabase = null;

function initSupabase() {
    if (!SUPABASE_CONFIG.enabled) {
        console.log('Supabase is disabled. Using localStorage mode.');
        return false;
    }

    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey || 
        SUPABASE_CONFIG.url === 'YOUR_SUPABASE_PROJECT_URL') {
        console.warn('Supabase not configured. Using localStorage mode.');
        return false;
    }

    try {
        // Initialize Supabase client
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );
        
        console.log('✅ Supabase initialized successfully');
        return true;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        return false;
    }
}

// Check if Supabase is available
function isSupabaseEnabled() {
    return SUPABASE_CONFIG.enabled && supabase !== null;
}

// Get current user info
function getCurrentUser() {
    let userName = localStorage.getItem('collaborator_name');
    let userId = localStorage.getItem('collaborator_id');
    
    if (!userName) {
        // Prompt for name on first use
        userName = prompt('Enter your name for collaboration (shown to teammates):') || 'Anonymous';
        localStorage.setItem('collaborator_name', userName);
    }
    
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('collaborator_id', userId);
    }
    
    return { id: userId, name: userName };
}

// Generate shareable link for current campaign
function generateShareableLink(campaignId) {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#campaign=${campaignId}&note-taker`;
}

// Get campaign ID from URL or create new one
function getCampaignIdFromUrl() {
    const hash = window.location.hash;
    const match = hash.match(/campaign=([^&]+)/);
    return match ? match[1] : null;
}

// Show share link dialog
function showShareLinkDialog(campaignId) {
    const shareLink = generateShareableLink(campaignId);
    const user = getCurrentUser();
    
    const modal = document.createElement('div');
    modal.className = 'share-link-modal';
    modal.innerHTML = `
        <div class="share-link-overlay" onclick="this.parentElement.remove()"></div>
        <div class="share-link-content">
            <div class="share-link-header">
                <h3>🔗 Share Note Taker</h3>
                <button class="share-link-close" onclick="this.closest('.share-link-modal').remove()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="share-link-body">
                <p style="color: var(--text-light); margin-bottom: 1rem;">
                    Share this link with up to 2 teammates to collaborate on notes in real-time.
                </p>
                <div class="share-link-box">
                    <input type="text" readonly value="${shareLink}" id="share-link-input" 
                           style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
                </div>
                <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
                    <button onclick="copyShareLink()" class="share-link-btn share-link-btn-primary">
                        📋 Copy Link
                    </button>
                    <button onclick="this.closest('.share-link-modal').remove()" class="share-link-btn share-link-btn-secondary">
                        Close
                    </button>
                </div>
                <div style="margin-top: 1.5rem; padding: 1rem; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <p style="margin: 0; color: #1e40af; font-size: 0.875rem;">
                        <strong>Your name:</strong> ${user.name}<br>
                        <button onclick="changeCollaboratorName()" style="margin-top: 0.5rem; padding: 0.4rem 0.75rem; background: white; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                            Change Name
                        </button>
                    </p>
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0; color: #92400e; font-size: 0.875rem;">
                        ⚠️ <strong>Note:</strong> Anyone with this link can view and edit notes. Only share with trusted teammates.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-select link for easy copying
    setTimeout(() => {
        document.getElementById('share-link-input').select();
    }, 100);
}

// Copy share link to clipboard
function copyShareLink() {
    const input = document.getElementById('share-link-input');
    input.select();
    document.execCommand('copy');
    
    // Show success message
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Change collaborator name
function changeCollaboratorName() {
    const currentName = localStorage.getItem('collaborator_name') || 'Anonymous';
    const newName = prompt('Enter your new name:', currentName);
    
    if (newName && newName.trim()) {
        localStorage.setItem('collaborator_name', newName.trim());
        alert('Name updated! Refresh the page to apply changes.');
    }
}

// Add share button styles
function addShareLinkStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .share-link-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .share-link-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
        }
        
        .share-link-content {
            position: relative;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .share-link-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border);
        }
        
        .share-link-header h3 {
            margin: 0;
            font-size: 1.25rem;
            color: var(--text);
        }
        
        .share-link-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            color: var(--text-light);
            transition: color 0.2s;
        }
        
        .share-link-close:hover {
            color: var(--danger);
        }
        
        .share-link-body {
            padding: 1.5rem;
        }
        
        .share-link-box {
            background: #f9fafb;
            border: 2px dashed var(--border);
            border-radius: 8px;
            padding: 1rem;
        }
        
        .share-link-btn {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.875rem;
        }
        
        .share-link-btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .share-link-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .share-link-btn-secondary {
            background: white;
            color: var(--text);
            border: 2px solid var(--border);
        }
        
        .share-link-btn-secondary:hover {
            background: var(--bg);
        }
        
        .collaboration-indicator {
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: white;
            border: 2px solid #10b981;
            border-radius: 8px;
            padding: 0.75rem 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.875rem;
        }
        
        .collaboration-indicator .online-dot {
            width: 10px;
            height: 10px;
            background: #10b981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .collaborators-list {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .collaborator-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.75rem;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    addShareLinkStyles();
});

// Export for global use
window.supabaseConfig = {
    initSupabase,
    isSupabaseEnabled,
    getCurrentUser,
    generateShareableLink,
    getCampaignIdFromUrl,
    showShareLinkDialog,
    copyShareLink,
    changeCollaboratorName
};
