// AI Chat Assistant for Presentation Building

class PresentationAIAssistant {
    constructor() {
        this.chatHistory = [];
        this.isOpen = false;
        this.apiKey = this.loadAPIKey();
        this.apiProvider = localStorage.getItem('aiProvider') || 'openai'; // openai, anthropic, local
        this.model = localStorage.getItem('aiModel') || 'gpt-4';
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        this.createChatUI();
        this.loadChatHistory();
        this.setupEventListeners();
    }
    
    loadAPIKey() {
        return localStorage.getItem('aiApiKey') || '';
    }
    
    saveAPIKey(key) {
        localStorage.setItem('aiApiKey', key);
        this.apiKey = key;
    }
    
    loadChatHistory() {
        const saved = localStorage.getItem('aiChatHistory');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
            this.renderChatHistory();
        }
    }
    
    saveChatHistory() {
        localStorage.setItem('aiChatHistory', JSON.stringify(this.chatHistory));
    }
    
    createChatUI() {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'ai-chat-container';
        chatContainer.className = 'ai-chat-container';
        chatContainer.innerHTML = `
            <button class="ai-chat-toggle" id="ai-chat-toggle" title="AI Presentation Assistant">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <circle cx="9" cy="10" r="1"></circle>
                    <circle cx="15" cy="10" r="1"></circle>
                    <path d="M9 14s1 1 3 1 3-1 3-1"></path>
                </svg>
                <span class="ai-badge">AI</span>
            </button>
            
            <div class="ai-chat-panel" id="ai-chat-panel">
                <div class="ai-chat-header">
                    <div class="ai-chat-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <path d="M12 1v6m0 6v6m5.2-13.2l-4.3 4.3m-1.8 1.8l-4.3 4.3M23 12h-6m-6 0H1m18.2 5.2l-4.3-4.3m-1.8-1.8l-4.3-4.3"></path>
                        </svg>
                        <span>AI Presentation Assistant</span>
                    </div>
                    <div class="ai-chat-controls">
                        <button class="ai-control-btn" id="ai-settings-btn" title="Settings">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </button>
                        <button class="ai-control-btn" id="ai-clear-btn" title="Clear Chat">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                        <button class="ai-control-btn" id="ai-close-btn" title="Close">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="ai-chat-suggestions" id="ai-suggestions">
                    <p class="suggestions-title">Try asking:</p>
                    <button class="suggestion-btn" data-prompt="Create a presentation with key findings and recommendations">
                        📊 Create presentation with key findings
                    </button>
                    <button class="suggestion-btn" data-prompt="Add a slide showing the top 3 pain points">
                        🎯 Add top pain points slide
                    </button>
                    <button class="suggestion-btn" data-prompt="What are the main themes from the research?">
                        💡 Show main themes
                    </button>
                    <button class="suggestion-btn" data-prompt="Create an executive summary slide">
                        📋 Create executive summary
                    </button>
                </div>
                
                <div class="ai-chat-messages" id="ai-chat-messages">
                    <!-- Messages will appear here -->
                </div>
                
                <div class="ai-chat-input-container">
                    <textarea 
                        id="ai-chat-input" 
                        class="ai-chat-input" 
                        placeholder="Ask me to build slides, analyze data, or answer questions..."
                        rows="1"
                    ></textarea>
                    <button id="ai-send-btn" class="ai-send-btn" title="Send message">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Settings Modal -->
            <div class="ai-settings-modal" id="ai-settings-modal">
                <div class="ai-settings-content">
                    <div class="ai-settings-header">
                        <h3>AI Assistant Settings</h3>
                        <button class="ai-settings-close" id="ai-settings-close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="ai-settings-body">
                        <div class="settings-section">
                            <label>AI Provider</label>
                            <select id="ai-provider-select" class="settings-select">
                                <option value="openai">OpenAI (GPT-4)</option>
                                <option value="anthropic">Anthropic (Claude)</option>
                                <option value="local">Local AI</option>
                            </select>
                        </div>
                        
                        <div class="settings-section">
                            <label>API Key</label>
                            <input 
                                type="password" 
                                id="ai-api-key-input" 
                                class="settings-input" 
                                placeholder="Enter your API key"
                                value=""
                            >
                            <p class="settings-hint">Your API key is stored locally and never sent to our servers.</p>
                        </div>
                        
                        <div class="settings-section">
                            <label>Model</label>
                            <select id="ai-model-select" class="settings-select">
                                <option value="gpt-4">GPT-4 (Best quality)</option>
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                                <option value="claude-3-opus">Claude 3 Opus</option>
                                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                            </select>
                        </div>
                        
                        <div class="settings-actions">
                            <button class="settings-btn settings-btn-secondary" id="ai-test-connection">
                                Test Connection
                            </button>
                            <button class="settings-btn settings-btn-primary" id="ai-save-settings">
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatContainer);
        this.addStyles();
    }
    
    setupEventListeners() {
        // Toggle chat
        document.getElementById('ai-chat-toggle').addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Close chat
        document.getElementById('ai-close-btn').addEventListener('click', () => {
            this.closeChat();
        });
        
        // Clear chat
        document.getElementById('ai-clear-btn').addEventListener('click', () => {
            this.clearChat();
        });
        
        // Open settings
        document.getElementById('ai-settings-btn').addEventListener('click', () => {
            this.openSettings();
        });
        
        // Close settings
        document.getElementById('ai-settings-close').addEventListener('click', () => {
            this.closeSettings();
        });
        
        // Save settings
        document.getElementById('ai-save-settings').addEventListener('click', () => {
            this.saveSettings();
        });
        
        // Test connection
        document.getElementById('ai-test-connection').addEventListener('click', () => {
            this.testConnection();
        });
        
        // Send message
        document.getElementById('ai-send-btn').addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Input handlers
        const input = document.getElementById('ai-chat-input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        });
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.getAttribute('data-prompt');
                document.getElementById('ai-chat-input').value = prompt;
                this.sendMessage();
            });
        });
        
        // Load saved settings
        this.loadSettings();
    }
    
    toggleChat() {
        const panel = document.getElementById('ai-chat-panel');
        this.isOpen = !this.isOpen;
        panel.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            document.getElementById('ai-chat-input').focus();
            
            // Hide suggestions if there's chat history
            if (this.chatHistory.length > 0) {
                document.getElementById('ai-suggestions').style.display = 'none';
            }
        }
    }
    
    closeChat() {
        this.isOpen = false;
        document.getElementById('ai-chat-panel').classList.remove('open');
    }
    
    openSettings() {
        document.getElementById('ai-settings-modal').style.display = 'flex';
    }
    
    closeSettings() {
        document.getElementById('ai-settings-modal').style.display = 'none';
    }
    
    loadSettings() {
        document.getElementById('ai-provider-select').value = this.apiProvider;
        document.getElementById('ai-api-key-input').value = this.apiKey;
        document.getElementById('ai-model-select').value = this.model;
    }
    
    saveSettings() {
        this.apiProvider = document.getElementById('ai-provider-select').value;
        this.apiKey = document.getElementById('ai-api-key-input').value;
        this.model = document.getElementById('ai-model-select').value;
        
        localStorage.setItem('aiProvider', this.apiProvider);
        localStorage.setItem('aiApiKey', this.apiKey);
        localStorage.setItem('aiModel', this.model);
        
        this.showNotification('Settings saved successfully', 'success');
        this.closeSettings();
    }
    
    async testConnection() {
        const btn = document.getElementById('ai-test-connection');
        btn.textContent = 'Testing...';
        btn.disabled = true;
        
        try {
            const response = await this.callAI('Hello, please respond with "Connection successful"', true);
            if (response) {
                this.showNotification('✅ Connection successful!', 'success');
            } else {
                this.showNotification('❌ Connection failed. Check your API key.', 'error');
            }
        } catch (error) {
            this.showNotification(`❌ Error: ${error.message}`, 'error');
        } finally {
            btn.textContent = 'Test Connection';
            btn.disabled = false;
        }
    }
    
    clearChat() {
        const performClear = () => {
            this.chatHistory = [];
            this.saveChatHistory();
            document.getElementById('ai-chat-messages').innerHTML = '';
            document.getElementById('ai-suggestions').style.display = 'block';
            this.showNotification('Chat history cleared', 'info');
        };
        
        // Use custom confirm if available
        if (window.customConfirm) {
            window.customConfirm('Are you sure you want to clear the chat history?', performClear);
        } else if (confirm('Are you sure you want to clear the chat history?')) {
            performClear();
        }
    }
    
    async sendMessage() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (!message || this.isProcessing) return;
        
        if (!this.apiKey) {
            this.showNotification('Please set your API key in settings first', 'warning');
            this.openSettings();
            return;
        }
        
        // Hide suggestions
        document.getElementById('ai-suggestions').style.display = 'none';
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        input.style.height = 'auto';
        
        // Show typing indicator
        this.showTypingIndicator();
        this.isProcessing = true;
        
        try {
            // Call AI
            const response = await this.callAI(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            this.addMessage('assistant', response);
            
            // Process any commands in the response
            this.processCommands(response);
            
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('error', `Sorry, I encountered an error: ${error.message}`);
        } finally {
            this.isProcessing = false;
        }
    }
    
    async callAI(message, isTest = false) {
        // Get context about the study
        const context = this.getStudyContext();
        
        const systemPrompt = `You are an AI assistant helping to create presentations from user research data. 
        
You have access to the following study data:
${context}

Your capabilities:
1. Answer questions about the study data
2. Create presentation slides by suggesting sections to add
3. Analyze themes, findings, and recommendations
4. Provide insights and suggestions

When the user asks to create slides or add content to presentation, respond with specific commands in this format:
[ADD_SLIDE:section-id] - to add a specific section
[CREATE_PRESENTATION:section-id1,section-id2,...] - to create a full presentation

Available sections:
- executive-summary (Study Summary)
- key-findings (Key Findings)
- themes (Behavioral Patterns)
- pain-points (Pain Points)
- quotes (Notable Quotes)
- recommendations (Recommendations)
- research-questions (Study Evaluation)

Be conversational, helpful, and provide actionable insights.`;

        if (this.apiProvider === 'openai') {
            return await this.callOpenAI(systemPrompt, message, isTest);
        } else if (this.apiProvider === 'anthropic') {
            return await this.callAnthropic(systemPrompt, message, isTest);
        } else {
            throw new Error('Local AI not yet implemented. Please use OpenAI or Anthropic.');
        }
    }
    
    async callOpenAI(systemPrompt, message, isTest) {
        const messages = [
            { role: 'system', content: systemPrompt },
            ...this.chatHistory.slice(-10).map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
            })),
            { role: 'user', content: message }
        ];
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    async callAnthropic(systemPrompt, message, isTest) {
        // Anthropic Claude API implementation
        const messages = this.chatHistory.slice(-10).map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
        }));
        messages.push({ role: 'user', content: message });
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: this.model,
                system: systemPrompt,
                messages: messages,
                max_tokens: 1000
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }
        
        const data = await response.json();
        return data.content[0].text;
    }
    
    getStudyContext() {
        if (!window.synthesisData) {
            return 'No study data loaded yet.';
        }
        
        const data = window.synthesisData;
        return `
Study: ${data.metadata?.title || 'ISS Iterative Testing 4.1'}
Participants: ${data.metadata?.participants || 6}
Research Areas: ${data.metadata?.researchAreas?.join(', ') || 'N/A'}

Key Findings (${data.keyFindings?.length || 0}):
${data.keyFindings?.slice(0, 3).map(f => `- ${f.title}`).join('\n') || 'None'}

Themes (${data.themes?.length || 0}):
${data.themes?.slice(0, 5).map(t => `- ${t.theme} (${t.frequency} mentions)`).join('\n') || 'None'}

Pain Points (${data.painPoints?.length || 0}):
${data.painPoints?.slice(0, 3).map(p => `- [${p.severity}] ${p.description}`).join('\n') || 'None'}

Recommendations (${data.recommendations?.length || 0}):
${data.recommendations?.slice(0, 3).map(r => `- [${r.priority}] ${r.title}`).join('\n') || 'None'}
        `;
    }
    
    processCommands(response) {
        // Process ADD_SLIDE commands
        const addSlidePattern = /\[ADD_SLIDE:([a-z-]+)\]/gi;
        let match;
        while ((match = addSlidePattern.exec(response)) !== null) {
            const sectionId = match[1];
            if (window.presentationBuilder) {
                window.presentationBuilder.addSection(sectionId);
            }
        }
        
        // Process CREATE_PRESENTATION commands
        const createPresentationPattern = /\[CREATE_PRESENTATION:([a-z-,]+)\]/gi;
        while ((match = createPresentationPattern.exec(response)) !== null) {
            const sectionIds = match[1].split(',');
            if (window.presentationBuilder) {
                // Clear existing
                window.presentationBuilder.slides = [];
                // Add each section
                sectionIds.forEach(id => {
                    window.presentationBuilder.addSection(id.trim());
                });
                window.presentationBuilder.showNotification('Presentation created! Click the floating button to view.', 'success');
            }
        }
    }
    
    addMessage(role, content) {
        const message = { role, content, timestamp: new Date().toISOString() };
        this.chatHistory.push(message);
        this.saveChatHistory();
        
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = `ai-message ai-message-${role}`;
        
        // Parse markdown-like formatting
        const formattedContent = this.formatMessage(content);
        
        messageEl.innerHTML = `
            <div class="ai-message-avatar">
                ${role === 'user' ? this.getUserAvatar() : this.getAIAvatar()}
            </div>
            <div class="ai-message-content">
                <div class="ai-message-text">${formattedContent}</div>
                <div class="ai-message-time">${this.formatTime(message.timestamp)}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    formatMessage(content) {
        // Remove command syntax from display
        content = content.replace(/\[ADD_SLIDE:[^\]]+\]/g, '');
        content = content.replace(/\[CREATE_PRESENTATION:[^\]]+\]/g, '');
        
        // Simple markdown formatting
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
        content = content.replace(/\n/g, '<br>');
        
        return content;
    }
    
    getUserAvatar() {
        return `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        `;
    }
    
    getAIAvatar() {
        return `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v6m0 6v6m5.2-13.2l-4.3 4.3m-1.8 1.8l-4.3 4.3M23 12h-6m-6 0H1m18.2 5.2l-4.3-4.3m-1.8-1.8l-4.3-4.3"></path>
            </svg>
        `;
    }
    
    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'ai-message ai-message-assistant';
        indicator.innerHTML = `
            <div class="ai-message-avatar">${this.getAIAvatar()}</div>
            <div class="ai-message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    renderChatHistory() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        messagesContainer.innerHTML = '';
        
        this.chatHistory.forEach(message => {
            this.addMessageToDOM(message);
        });
        
        if (this.chatHistory.length > 0) {
            document.getElementById('ai-suggestions').style.display = 'none';
        }
    }
    
    addMessageToDOM(message) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = `ai-message ai-message-${message.role}`;
        
        const formattedContent = this.formatMessage(message.content);
        
        messageEl.innerHTML = `
            <div class="ai-message-avatar">
                ${message.role === 'user' ? this.getUserAvatar() : this.getAIAvatar()}
            </div>
            <div class="ai-message-content">
                <div class="ai-message-text">${formattedContent}</div>
                <div class="ai-message-time">${this.formatTime(message.timestamp)}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageEl);
    }
    
    showNotification(message, type = 'info') {
        // Reuse notification system from presentation builder if available
        if (window.presentationBuilder && window.presentationBuilder.showNotification) {
            window.presentationBuilder.showNotification(message, type);
        } else {
            alert(message);
        }
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* AI Chat Toggle Button */
            .ai-chat-toggle {
                position: fixed;
                bottom: 6rem;
                right: 2rem;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            
            .ai-chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
            }
            
            .ai-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #10b981;
                color: white;
                font-size: 0.65rem;
                font-weight: 700;
                padding: 2px 6px;
                border-radius: 10px;
                border: 2px solid white;
            }
            
            /* Chat Panel */
            .ai-chat-panel {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 420px;
                height: 600px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                display: none;
                flex-direction: column;
                z-index: 1000;
                overflow: hidden;
            }
            
            .ai-chat-panel.open {
                display: flex;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Chat Header */
            .ai-chat-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem 1.25rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .ai-chat-title {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 600;
                font-size: 0.95rem;
            }
            
            .ai-chat-controls {
                display: flex;
                gap: 0.5rem;
            }
            
            .ai-control-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                padding: 0.5rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ai-control-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            /* Suggestions */
            .ai-chat-suggestions {
                padding: 1rem;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .suggestions-title {
                font-size: 0.75rem;
                color: #64748b;
                margin-bottom: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            .suggestion-btn {
                display: block;
                width: 100%;
                text-align: left;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.875rem;
                color: #1e293b;
            }
            
            .suggestion-btn:hover {
                background: #f1f5f9;
                border-color: #667eea;
                transform: translateX(4px);
            }
            
            /* Messages */
            .ai-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .ai-message {
                display: flex;
                gap: 0.75rem;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ai-message-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .ai-message-user .ai-message-avatar {
                background: #3b82f6;
                color: white;
            }
            
            .ai-message-assistant .ai-message-avatar {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .ai-message-error .ai-message-avatar {
                background: #ef4444;
                color: white;
            }
            
            .ai-message-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .ai-message-text {
                padding: 0.75rem 1rem;
                border-radius: 12px;
                font-size: 0.875rem;
                line-height: 1.5;
            }
            
            .ai-message-user .ai-message-text {
                background: #3b82f6;
                color: white;
                border-bottom-right-radius: 4px;
            }
            
            .ai-message-assistant .ai-message-text {
                background: #f1f5f9;
                color: #1e293b;
                border-bottom-left-radius: 4px;
            }
            
            .ai-message-error .ai-message-text {
                background: #fee2e2;
                color: #991b1b;
                border-bottom-left-radius: 4px;
            }
            
            .ai-message-time {
                font-size: 0.7rem;
                color: #94a3b8;
                padding: 0 0.5rem;
            }
            
            /* Typing Indicator */
            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 0.75rem 1rem;
                background: #f1f5f9;
                border-radius: 12px;
                width: fit-content;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: #94a3b8;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }
            
            .typing-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.5;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }
            
            /* Input */
            .ai-chat-input-container {
                padding: 1rem;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 0.75rem;
                background: white;
            }
            
            .ai-chat-input {
                flex: 1;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
                resize: none;
                font-family: inherit;
                transition: all 0.2s;
                max-height: 120px;
            }
            
            .ai-chat-input:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .ai-send-btn {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .ai-send-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            
            .ai-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            /* Settings Modal */
            .ai-settings-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                z-index: 10001;
                align-items: center;
                justify-content: center;
            }
            
            .ai-settings-content {
                background: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .ai-settings-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .ai-settings-header h3 {
                margin: 0;
                font-size: 1.25rem;
                color: #1e293b;
            }
            
            .ai-settings-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: #64748b;
                transition: color 0.2s;
            }
            
            .ai-settings-close:hover {
                color: #ef4444;
            }
            
            .ai-settings-body {
                padding: 1.5rem;
            }
            
            .settings-section {
                margin-bottom: 1.5rem;
            }
            
            .settings-section label {
                display: block;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: #1e293b;
                font-size: 0.875rem;
            }
            
            .settings-select,
            .settings-input {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 0.875rem;
                font-family: inherit;
                transition: all 0.2s;
            }
            
            .settings-select:focus,
            .settings-input:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .settings-hint {
                margin-top: 0.5rem;
                font-size: 0.75rem;
                color: #64748b;
                font-style: italic;
            }
            
            .settings-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .settings-btn {
                flex: 1;
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.875rem;
            }
            
            .settings-btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .settings-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            
            .settings-btn-secondary {
                background: white;
                color: #1e293b;
                border: 2px solid #e2e8f0;
            }
            
            .settings-btn-secondary:hover {
                background: #f1f5f9;
                border-color: #cbd5e1;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .ai-chat-panel {
                    width: calc(100% - 2rem);
                    height: calc(100% - 2rem);
                    right: 1rem;
                    bottom: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.aiAssistant = new PresentationAIAssistant();
    }, 1500);
});
