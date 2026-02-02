// Presentation Builder - Add Sections to Presentation with Page Control

// Presentation state management
const presentationBuilder = {
    slides: [],
    isOpen: false,
    
    // Initialize the presentation builder
    init() {
        this.loadFromStorage();
        // Removed: this.addSectionButtons(); - Now handled inside builder
        this.createBuilderPanel();
        this.updatePresentationView();
    },
    
    // Load saved presentation from localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('presentationSlides');
        if (saved) {
            this.slides = JSON.parse(saved);
        }
    },
    
    // Save presentation to localStorage
    saveToStorage() {
        localStorage.setItem('presentationSlides', JSON.stringify(this.slides));
    },
    
    // Add "Add to Presentation" buttons to each section
    addSectionButtons() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionId = section.id;
            
            // Skip certain sections
            if (['presentation', 'transcripts', 'select-study', 'uxd-admin', 'note-taker', 'upload-videos', 'teach-ai'].includes(sectionId)) {
                return;
            }
            
            // Check if button already exists
            if (section.querySelector('.add-to-presentation-btn')) {
                return;
            }
            
            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'section-presentation-controls';
            buttonContainer.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                z-index: 10;
                display: flex;
                gap: 0.5rem;
            `;
            
            // Add to presentation button
            const addButton = document.createElement('button');
            addButton.className = 'add-to-presentation-btn';
            addButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="13"></line>
                    <line x1="9.5" y1="10.5" x2="14.5" y2="10.5"></line>
                </svg>
                Add to Presentation
            `;
            addButton.style.cssText = `
                padding: 0.5rem 1rem;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
                box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
            `;
            
            addButton.addEventListener('mouseenter', () => {
                addButton.style.background = '#2563eb';
                addButton.style.transform = 'translateY(-2px)';
                addButton.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
            });
            
            addButton.addEventListener('mouseleave', () => {
                addButton.style.background = '#3b82f6';
                addButton.style.transform = 'translateY(0)';
                addButton.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
            });
            
            addButton.addEventListener('click', () => {
                this.addSection(sectionId);
            });
            
            buttonContainer.appendChild(addButton);
            
            // Make section position relative if it isn't already
            section.style.position = 'relative';
            
            // Insert at beginning of section
            section.insertBefore(buttonContainer, section.firstChild);
            
            // Update button state
            this.updateSectionButton(sectionId);
        });
    },
    
    // Update button state for a section
    updateSectionButton(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const button = section.querySelector('.add-to-presentation-btn');
        if (!button) return;
        
        const isAdded = this.slides.some(s => s.sectionId === sectionId);
        
        if (isAdded) {
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Added to Presentation
            `;
            button.style.background = '#10b981';
            button.disabled = false;
        }
    },
    
    // Add a section to the presentation
    addSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // Check if already added
        if (this.slides.some(s => s.sectionId === sectionId)) {
            this.showNotification('This section is already in the presentation', 'info');
            return;
        }
        
        const title = section.querySelector('h2')?.textContent || sectionId;
        
        // Add to slides array
        const slide = {
            id: Date.now(),
            sectionId: sectionId,
            title: title,
            page: this.slides.length + 1,
            enabled: true
        };
        
        this.slides.push(slide);
        this.saveToStorage();
        this.updateBuilderUI();
        this.showNotification(`"${title}" added to presentation`, 'success');
        this.updatePresentationView();
    },
    
    // Add section from selector dropdown (inside builder)
    addSectionFromSelector() {
        const selector = document.getElementById('section-selector');
        const sectionId = selector.value;
        
        if (!sectionId) {
            this.showNotification('Please select a section first', 'warning');
            return;
        }
        
        this.addSection(sectionId);
        
        // Reset selector
        selector.value = '';
    },
    
    // Remove a section from presentation
    removeSection(slideId) {
        this.slides = this.slides.filter(s => s.id !== slideId);
        this.reorderPages();
        this.saveToStorage();
        this.updateBuilderUI();
        this.updatePresentationView();
    },
    
    // Move slide up or down
    moveSlide(slideId, direction) {
        const index = this.slides.findIndex(s => s.id === slideId);
        if (index === -1) return;
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= this.slides.length) return;
        
        // Swap
        [this.slides[index], this.slides[newIndex]] = [this.slides[newIndex], this.slides[index]];
        
        this.reorderPages();
        this.saveToStorage();
        this.updateBuilderUI();
        this.updatePresentationView();
    },
    
    // Reorder page numbers after changes
    reorderPages() {
        this.slides.forEach((slide, index) => {
            slide.page = index + 1;
        });
    },
    
    // Toggle slide enabled state
    toggleSlide(slideId) {
        const slide = this.slides.find(s => s.id === slideId);
        if (slide) {
            slide.enabled = !slide.enabled;
            this.saveToStorage();
            this.updateBuilderUI();
            this.updatePresentationView();
        }
    },
    
    // Update all section buttons
    updateAllSectionButtons() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            this.updateSectionButton(section.id);
        });
    },
    
    // Create the presentation builder panel
    createBuilderPanel() {
        const panel = document.createElement('div');
        panel.id = 'presentation-builder-panel';
        panel.className = 'presentation-builder-panel';
        panel.innerHTML = `
            <div class="builder-overlay"></div>
            <div class="builder-content">
                <div class="builder-header">
                    <h3>📊 Presentation Builder</h3>
                    <button class="builder-close" onclick="presentationBuilder.closeBuilder()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="builder-body">
                    <div class="builder-add-section">
                        <label for="section-selector">Add Section to Presentation:</label>
                        <div class="add-section-controls">
                            <select id="section-selector" class="section-selector">
                                <option value="">-- Select a section --</option>
                                <option value="executive-summary">Study Summary</option>
                                <option value="research-questions">Study Evaluation</option>
                                <option value="key-findings">Key Findings</option>
                                <option value="themes">Behavioral Patterns</option>
                                <option value="pain-points">Pain Points</option>
                                <option value="quotes">Notable Quotes</option>
                                <option value="recommendations">Recommendations</option>
                            </select>
                            <button class="add-section-btn" onclick="presentationBuilder.addSectionFromSelector()">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Section
                            </button>
                        </div>
                    </div>
                    <div class="builder-instructions">
                        <p>Select sections above to add them to your presentation. Reorder, toggle visibility, or remove slides below.</p>
                    </div>
                    <div id="builder-slides-list" class="builder-slides-list">
                        <!-- Slides will be rendered here -->
                    </div>
                    <div class="builder-actions">
                        <button class="builder-btn builder-btn-secondary" onclick="presentationBuilder.clearAll()">
                            Clear All
                        </button>
                        <button class="builder-btn builder-btn-primary" onclick="presentationBuilder.viewPresentation()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            View Presentation
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add styles
        this.addBuilderStyles();
        
        // Close on overlay click
        panel.querySelector('.builder-overlay').addEventListener('click', () => {
            this.closeBuilder();
        });
    },
    
    // Add CSS styles for the builder
    addBuilderStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .presentation-builder-panel {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .presentation-builder-panel.open {
                display: flex;
            }
            
            .builder-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }
            
            .builder-content {
                position: relative;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .builder-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border);
            }
            
            .builder-header h3 {
                font-size: 1.5rem;
                color: var(--text);
                margin: 0;
            }
            
            .builder-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: var(--text-light);
                transition: color 0.2s;
            }
            
            .builder-close:hover {
                color: var(--danger);
            }
            
            .builder-body {
                padding: 1.5rem;
                overflow-y: auto;
                flex: 1;
            }
            
            .builder-add-section {
                margin-bottom: 1.5rem;
                padding: 1.25rem;
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border-radius: 8px;
                border: 2px solid #3b82f6;
            }
            
            .builder-add-section label {
                display: block;
                font-weight: 600;
                color: #1e40af;
                margin-bottom: 0.75rem;
                font-size: 0.95rem;
            }
            
            .add-section-controls {
                display: flex;
                gap: 0.75rem;
            }
            
            .section-selector {
                flex: 1;
                padding: 0.75rem 1rem;
                border: 2px solid #cbd5e1;
                border-radius: 6px;
                font-size: 0.875rem;
                background: white;
                color: var(--text);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .section-selector:hover {
                border-color: #3b82f6;
            }
            
            .section-selector:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            
            .add-section-btn {
                padding: 0.75rem 1.5rem;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 0.875rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
                white-space: nowrap;
            }
            
            .add-section-btn:hover {
                background: #2563eb;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
            }
            
            .add-section-btn:active {
                transform: translateY(0);
            }
            
            .builder-instructions {
                padding: 1rem;
                background: #eff6ff;
                border-left: 4px solid #3b82f6;
                border-radius: 6px;
                margin-bottom: 1.5rem;
            }
            
            .builder-instructions p {
                margin: 0;
                color: #1e40af;
                font-size: 0.875rem;
            }
            
            .builder-slides-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-height: 200px;
            }
            
            .builder-slide-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: var(--bg);
                border: 2px solid var(--border);
                border-radius: 8px;
                transition: all 0.2s;
            }
            
            .builder-slide-item.disabled {
                opacity: 0.5;
            }
            
            .builder-slide-item:hover {
                border-color: #3b82f6;
            }
            
            .slide-page-number {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--primary);
                min-width: 40px;
                text-align: center;
            }
            
            .slide-info {
                flex: 1;
            }
            
            .slide-title {
                font-weight: 600;
                color: var(--text);
                margin-bottom: 0.25rem;
            }
            
            .slide-section-id {
                font-size: 0.75rem;
                color: var(--text-light);
            }
            
            .slide-controls {
                display: flex;
                gap: 0.5rem;
            }
            
            .slide-control-btn {
                background: white;
                border: 1px solid var(--border);
                padding: 0.5rem;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .slide-control-btn:hover {
                background: var(--bg);
                border-color: var(--primary);
            }
            
            .slide-control-btn.danger:hover {
                background: #fee2e2;
                border-color: var(--danger);
                color: var(--danger);
            }
            
            .builder-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--border);
            }
            
            .builder-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .builder-btn-primary {
                background: #3b82f6;
                color: white;
            }
            
            .builder-btn-primary:hover {
                background: #2563eb;
            }
            
            .builder-btn-secondary {
                background: white;
                color: var(--text);
                border: 1px solid var(--border);
            }
            
            .builder-btn-secondary:hover {
                background: var(--bg);
            }
            
            .builder-empty {
                text-align: center;
                padding: 3rem;
                color: var(--text-light);
            }
            
            .builder-empty svg {
                margin-bottom: 1rem;
                opacity: 0.3;
            }
            
        `;
        
        document.head.appendChild(style);
    },
    
    // Open the builder panel
    openBuilder() {
        const panel = document.getElementById('presentation-builder-panel');
        if (panel) {
            panel.classList.add('open');
            this.isOpen = true;
            this.updateBuilderUI();
        }
    },
    
    // Close the builder panel
    closeBuilder() {
        const panel = document.getElementById('presentation-builder-panel');
        if (panel) {
            panel.classList.remove('open');
            this.isOpen = false;
        }
    },
    
    // Update builder UI
    updateBuilderUI() {
        const listContainer = document.getElementById('builder-slides-list');
        if (!listContainer) return;
        
        if (this.slides.length === 0) {
            listContainer.innerHTML = `
                <div class="builder-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    <p>No slides added yet.<br>Select a section from the dropdown above to get started.</p>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = this.slides.map((slide, index) => `
            <div class="builder-slide-item ${!slide.enabled ? 'disabled' : ''}" data-slide-id="${slide.id}">
                <div class="slide-page-number">${slide.page}</div>
                <div class="slide-info">
                    <div class="slide-title">${slide.title}</div>
                    <div class="slide-section-id">#${slide.sectionId}</div>
                </div>
                <div class="slide-controls">
                    <button class="slide-control-btn" onclick="presentationBuilder.moveSlide(${slide.id}, 'up')" ${index === 0 ? 'disabled' : ''} title="Move up">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                    <button class="slide-control-btn" onclick="presentationBuilder.moveSlide(${slide.id}, 'down')" ${index === this.slides.length - 1 ? 'disabled' : ''} title="Move down">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <button class="slide-control-btn" onclick="presentationBuilder.toggleSlide(${slide.id})" title="${slide.enabled ? 'Disable' : 'Enable'}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            ${slide.enabled ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>' : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'}
                        </svg>
                    </button>
                    <button class="slide-control-btn danger" onclick="presentationBuilder.removeSection(${slide.id})" title="Remove">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Update floating button badge
        this.updateFloatingButton();
    },
    
    // Create floating builder button
    createFloatingButton() {
        const button = document.createElement('button');
        button.className = 'floating-builder-btn';
        button.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span class="badge">0</span>
        `;
        button.title = 'Open Presentation Builder';
        button.addEventListener('click', () => {
            this.openBuilder();
        });
        
        document.body.appendChild(button);
    },
    
    // Update floating button badge
    updateFloatingButton() {
        const button = document.querySelector('.floating-builder-btn');
        if (button) {
            const badge = button.querySelector('.badge');
            const enabledCount = this.slides.filter(s => s.enabled).length;
            badge.textContent = enabledCount;
            badge.style.display = enabledCount > 0 ? 'flex' : 'none';
        }
    },
    
    // Clear all slides
    clearAll() {
        const performClear = () => {
            this.slides = [];
            this.saveToStorage();
            this.updateBuilderUI();
            this.updatePresentationView();
            this.showNotification('All slides removed', 'info');
        };
        
        // Use custom confirm if available
        if (window.customConfirm) {
            window.customConfirm('Are you sure you want to remove all slides from the presentation?', performClear);
        } else if (confirm('Are you sure you want to remove all slides from the presentation?')) {
            performClear();
        }
    },
    
    // View the presentation
    viewPresentation() {
        if (this.slides.length === 0) {
            this.showNotification('Please add some sections to the presentation first', 'warning');
            return;
        }
        
        this.closeBuilder();
        navigateToSection('presentation');
        this.updatePresentationView();
    },
    
    // Update the actual presentation view
    updatePresentationView() {
        // This will regenerate slides based on selected sections
        if (typeof regeneratePresentation === 'function') {
            regeneratePresentation(this.getEnabledSlides());
        }
    },
    
    // Get enabled slides
    getEnabledSlides() {
        return this.slides.filter(s => s.enabled);
    },
    
    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Add animation styles if not already present
        if (!document.getElementById('notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to initialize
    setTimeout(() => {
        presentationBuilder.init();
        // Removed: presentationBuilder.createFloatingButton();
    }, 1000);
});

// Make available globally
window.presentationBuilder = presentationBuilder;
