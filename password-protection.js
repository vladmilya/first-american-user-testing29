// Simple Password Protection for User Testing Report
// This provides basic access control without requiring user accounts

(function() {
    'use strict';
    
    // SET YOUR PASSWORD HERE
    const CORRECT_PASSWORD = 'FirstAmerican2026'; // Change this to your desired password
    
    // TEMPORARILY DISABLED - Password protection turned off for development
    // Check if user is already authenticated in this session
    const isAuthenticated = true; // Force authenticated to bypass password
    
    if (!isAuthenticated) {
        // Create password overlay
        createPasswordOverlay();
    }
    
    function createPasswordOverlay() {
        // Create overlay HTML
        const overlay = document.createElement('div');
        overlay.id = 'password-overlay';
        overlay.innerHTML = `
            <div class="password-container">
                <div class="password-header">
                    <h1>🔒 Protected Report</h1>
                    <p>First American - ISS P4.1 User Testing Synthesis</p>
                    <p style="color: #64748b; font-size: 0.9rem; margin-top: 0.5rem;">This report contains confidential research data</p>
                </div>
                <div class="password-form">
                    <input 
                        type="password" 
                        id="password-input" 
                        placeholder="Enter password to access report"
                        autocomplete="off"
                    />
                    <button id="password-submit">Access Report</button>
                    <div id="password-error" class="password-error"></div>
                </div>
                <div class="password-footer">
                    <p>For access, contact the report administrator</p>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #password-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .password-container {
                background: white;
                padding: 3rem;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 450px;
                width: 90%;
                text-align: center;
            }
            
            .password-header h1 {
                color: #1e293b;
                margin-bottom: 0.5rem;
                font-size: 2rem;
            }
            
            .password-header p {
                color: #64748b;
                margin: 0.5rem 0;
                font-size: 1rem;
            }
            
            .password-form {
                margin: 2rem 0;
            }
            
            #password-input {
                width: 100%;
                padding: 1rem;
                font-size: 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                margin-bottom: 1rem;
                box-sizing: border-box;
                transition: border-color 0.3s ease;
            }
            
            #password-input:focus {
                outline: none;
                border-color: #3b82f6;
            }
            
            #password-submit {
                width: 100%;
                padding: 1rem;
                font-size: 1rem;
                font-weight: 600;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            #password-submit:hover {
                background: #2563eb;
            }
            
            #password-submit:active {
                transform: scale(0.98);
            }
            
            .password-error {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                min-height: 20px;
            }
            
            .password-footer {
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid #e2e8f0;
            }
            
            .password-footer p {
                color: #94a3b8;
                font-size: 0.875rem;
                margin: 0;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(overlay);
        
        // Add event listeners
        const input = document.getElementById('password-input');
        const button = document.getElementById('password-submit');
        const error = document.getElementById('password-error');
        
        function checkPassword() {
            const enteredPassword = input.value;
            
            if (enteredPassword === CORRECT_PASSWORD) {
                // Correct password
                sessionStorage.setItem('reportAuthenticated', 'true');
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            } else {
                // Wrong password
                error.textContent = '❌ Incorrect password. Please try again.';
                input.value = '';
                input.focus();
                
                // Shake animation
                input.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            }
        }
        
        button.addEventListener('click', checkPassword);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        // Focus input
        setTimeout(() => input.focus(), 100);
    }
    
    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(shakeStyle);
    
})();
