// Custom Confirmation Dialog with Black Background

function showCustomConfirm(message, onConfirm, onCancel = null) {
    // Remove any existing confirm dialog
    const existing = document.getElementById('custom-confirm-modal');
    if (existing) existing.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'custom-confirm-modal';
    modal.className = 'custom-confirm-modal';
    modal.innerHTML = `
        <div class="custom-confirm-overlay"></div>
        <div class="custom-confirm-content">
            <div class="custom-confirm-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <div class="custom-confirm-message">${message}</div>
            <div class="custom-confirm-actions">
                <button class="custom-confirm-btn custom-confirm-cancel" id="custom-confirm-cancel">
                    Cancel
                </button>
                <button class="custom-confirm-btn custom-confirm-ok" id="custom-confirm-ok">
                    OK
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles if not already added
    addCustomConfirmStyles();
    
    // Show with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Handle confirm
    document.getElementById('custom-confirm-ok').addEventListener('click', () => {
        closeCustomConfirm();
        if (onConfirm) onConfirm();
    });
    
    // Handle cancel
    document.getElementById('custom-confirm-cancel').addEventListener('click', () => {
        closeCustomConfirm();
        if (onCancel) onCancel();
    });
    
    // Close on overlay click
    modal.querySelector('.custom-confirm-overlay').addEventListener('click', () => {
        closeCustomConfirm();
        if (onCancel) onCancel();
    });
    
    // Focus OK button
    setTimeout(() => {
        document.getElementById('custom-confirm-ok').focus();
    }, 100);
    
    // Handle Enter and Escape keys
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            closeCustomConfirm();
            if (onConfirm) onConfirm();
            document.removeEventListener('keydown', handleKeyPress);
        } else if (e.key === 'Escape') {
            closeCustomConfirm();
            if (onCancel) onCancel();
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
    document.addEventListener('keydown', handleKeyPress);
}

function closeCustomConfirm() {
    const modal = document.getElementById('custom-confirm-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function addCustomConfirmStyles() {
    // Check if styles already exist
    if (document.getElementById('custom-confirm-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'custom-confirm-styles';
    style.textContent = `
        .custom-confirm-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10003;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .custom-confirm-modal.show {
            opacity: 1;
        }
        
        .custom-confirm-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(4px);
        }
        
        .custom-confirm-content {
            position: relative;
            background: #1a1a1a;
            border-radius: 16px;
            padding: 2rem;
            width: 90%;
            max-width: 450px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .custom-confirm-modal.show .custom-confirm-content {
            transform: scale(1);
        }
        
        .custom-confirm-icon {
            text-align: center;
            margin-bottom: 1.5rem;
            color: #fb923c;
        }
        
        .custom-confirm-message {
            color: #e5e7eb;
            font-size: 1.125rem;
            line-height: 1.6;
            text-align: center;
            margin-bottom: 2rem;
            font-weight: 500;
        }
        
        .custom-confirm-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .custom-confirm-btn {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            min-width: 120px;
        }
        
        .custom-confirm-cancel {
            background: #374151;
            color: #e5e7eb;
            border: 2px solid #4b5563;
        }
        
        .custom-confirm-cancel:hover {
            background: #4b5563;
            border-color: #6b7280;
        }
        
        .custom-confirm-ok {
            background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
            color: white;
            border: 2px solid #ea580c;
        }
        
        .custom-confirm-ok:hover {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(251, 146, 60, 0.4);
        }
        
        .custom-confirm-ok:focus,
        .custom-confirm-cancel:focus {
            outline: 2px solid #fb923c;
            outline-offset: 2px;
        }
    `;
    
    document.head.appendChild(style);
}

// Replace native confirm for specific functions
window.customConfirm = showCustomConfirm;
