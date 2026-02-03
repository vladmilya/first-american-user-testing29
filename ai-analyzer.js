// AI-Powered Research Analysis Module
// Uses Claude 3.5 Sonnet to analyze uploaded research data

console.log('🤖 AI Analyzer script loaded');

// Analyze uploaded files and generate structured report data
async function analyzeResearchData() {
    try {
        // Get active campaign
        const campaigns = getCampaigns();
        const activeCampaign = campaigns.find(c => c.isActive);
        
        if (!activeCampaign) {
            showNotification('❌ No active study selected', 'error');
            return false;
        }
        
        // Check if files are uploaded
        const hasQuestions = activeCampaign.files?.questions?.length > 0;
        const hasTranscripts = activeCampaign.files?.transcripts?.length > 0;
        
        if (!hasQuestions && !hasTranscripts) {
            showNotification('❌ Please upload study files first', 'error');
            return false;
        }
        
        // Show loading indicator
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Analyzing with AI...
            `;
        }
        
        showNotification('🤖 AI is analyzing your research data...', 'info');
        
        // Collect all extracted text
        let allText = '';
        
        // Add evaluation/questions text
        if (hasQuestions) {
            allText += '=== STUDY EVALUATION FILES ===\n\n';
            activeCampaign.files.questions.forEach(file => {
                if (file.extractedText) {
                    allText += `File: ${file.name}\n${file.extractedText}\n\n`;
                }
            });
        }
        
        // Add transcript text
        if (hasTranscripts) {
            allText += '\n\n=== PARTICIPANT TRANSCRIPTS ===\n\n';
            activeCampaign.files.transcripts.forEach(file => {
                if (file.extractedText) {
                    allText += `File: ${file.name}\n${file.extractedText}\n\n`;
                }
            });
        }
        
        if (!allText.trim()) {
            showNotification('❌ No text could be extracted from uploaded files', 'error');
            if (analyzeBtn) {
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Analyze & Generate Report
                `;
            }
            return false;
        }
        
        // Call Claude API
        const structuredData = await callClaudeAPI(allText);
        
        if (!structuredData) {
            showNotification('❌ Analysis failed. Please try again.', 'error');
            if (analyzeBtn) {
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Analyze & Generate Report
                `;
            }
            return false;
        }
        
        // Save structured data to campaign
        activeCampaign.reportData = structuredData.reportData;
        activeCampaign.researchQuestions = structuredData.researchQuestions;
        saveCampaigns(campaigns);
        
        // Render the insights
        if (typeof renderInsights === 'function') {
            renderInsights();
        }
        
        // Update button
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Analysis Complete!
            `;
            
            setTimeout(() => {
                analyzeBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Re-analyze Report
                `;
            }, 3000);
        }
        
        showNotification('✅ AI analysis complete! Your report is ready.', 'success');
        
        // Navigate to summary
        setTimeout(() => {
            navigateToSection('executive-summary');
        }, 1500);
        
        return true;
        
    } catch (error) {
        console.error('Analysis error:', error);
        showNotification('❌ Analysis failed: ' + error.message, 'error');
        
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                Analyze & Generate Report
            `;
        }
        return false;
    }
}

// Call Claude API with research data
async function callClaudeAPI(text) {
    try {
        const prompt = createAnalysisPrompt(text);
        
        const response = await fetch(AI_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': AI_CONFIG.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                max_tokens: 8000,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
        }
        
        const data = await response.json();
        const aiResponse = data.content[0].text;
        
        // Parse JSON response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Could not parse AI response');
        }
        
        return JSON.parse(jsonMatch[0]);
        
    } catch (error) {
        console.error('Claude API error:', error);
        throw error;
    }
}

// Create analysis prompt for Claude
function createAnalysisPrompt(text) {
    return `You are an expert UX researcher analyzing user testing data. Analyze the following research data and extract structured insights.

RESEARCH DATA:
${text.substring(0, 100000)}

TASK: Analyze this data and return a JSON object with the following structure:

{
  "reportData": {
    "summary": "A comprehensive 2-3 paragraph executive summary of the study",
    "keyFindings": [
      {
        "title": "Finding title",
        "description": "Detailed description",
        "impact": "high/medium/low",
        "participants": "number affected"
      }
    ],
    "themes": [
      {
        "id": "theme-1",
        "title": "Theme name",
        "description": "Theme description",
        "frequency": "How often this came up",
        "category": "usability/content/navigation/workflow",
        "severity": "critical/major/minor",
        "evidence": ["Quote or observation 1", "Quote or observation 2"]
      }
    ],
    "painPoints": [
      {
        "issue": "Pain point description",
        "severity": "critical/high/medium/low",
        "affectedUsers": "number or percentage",
        "context": "When/where this occurs",
        "impact": "Impact description"
      }
    ],
    "quotes": [
      {
        "quote": "Actual user quote",
        "participant": "Participant name/number",
        "context": "What they were discussing",
        "category": "feedback/pain-point/praise",
        "feature": "Related feature"
      }
    ],
    "recommendations": [
      {
        "title": "Recommendation title",
        "description": "Detailed recommendation",
        "priority": "high/medium/low",
        "rationale": "Why this matters",
        "expectedImpact": "Expected outcome",
        "relatedTheme": "Related theme name"
      }
    ]
  },
  "researchQuestions": [
    {
      "section": "Evaluation topic/question name",
      "subsections": [
        {
          "title": "Specific aspect",
          "content": "Findings and observations for this aspect",
          "userFeedback": ["User quote 1", "User quote 2"]
        }
      ]
    }
  ]
}

IMPORTANT INSTRUCTIONS:
- Extract ACTUAL quotes from participants (look for first-person statements)
- Identify patterns across multiple participants
- Prioritize issues by frequency and severity
- Be specific with findings (include numbers, context)
- Group related observations into themes
- Create actionable recommendations based on findings
- If evaluation topics are listed, organize findings under those topics
- Extract participant names/identifiers when available

Return ONLY the JSON object, no additional text.`;
}

// Simple notification system
function showNotification(message, type = 'info') {
    // Check if custom notification exists
    const existingNotification = document.getElementById('api-key-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'api-key-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Save API key to localStorage
window.saveAPIKey = function() {
    console.log('✅ saveAPIKey called');
    const input = document.getElementById('ai-api-key-input');
    console.log('Input element:', input);
    const key = input?.value?.trim();
    console.log('Key value:', key ? 'Found (length: ' + key.length + ')' : 'Empty');
    
    if (!key) {
        console.log('No key entered');
        alert('❌ Please enter an API key');
        return;
    }
    
    if (!key.startsWith('sk-ant-api03-')) {
        console.log('Invalid key format');
        alert('⚠️ Invalid Claude API key format. Should start with: sk-ant-api03-');
        return;
    }
    
    // Save to localStorage
    console.log('Saving to localStorage...');
    try {
        localStorage.setItem('ai_api_key', key);
        console.log('Saved successfully');
        
        // Clear input
        if (input) input.value = '';
        
        // Update UI
        updateAIStatus();
        
        alert('✅ API key saved successfully!');
    } catch (error) {
        console.error('Save error:', error);
        alert('❌ Error saving API key: ' + error.message);
    }
}

// Test API key connection
window.testAPIKey = async function() {
    if (!isAIConfigured()) {
        showNotification('⚠️ Please configure your API key first', 'warning');
        return;
    }
    
    const testBtn = document.querySelector('.test-api-key-btn');
    if (testBtn) {
        testBtn.disabled = true;
        testBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            Testing...
        `;
    }
    
    try {
        const response = await fetch(AI_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': AI_CONFIG.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                max_tokens: 10,
                messages: [{
                    role: 'user',
                    content: 'Hello'
                }]
            })
        });
        
        if (response.ok) {
            showNotification('✅ API connection successful!', 'success');
        } else {
            const errorData = await response.json();
            showNotification(`❌ API Error: ${errorData.error?.message || 'Connection failed'}`, 'error');
        }
    } catch (error) {
        showNotification('❌ Connection failed: ' + error.message, 'error');
    } finally {
        if (testBtn) {
            testBtn.disabled = false;
            testBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Test Connection
            `;
        }
    }
}

// Update AI status display
function updateAIStatus() {
    const statusDot = document.getElementById('ai-status-dot');
    const statusText = document.getElementById('ai-status-text');
    const keyDisplay = document.getElementById('ai-key-display');
    
    if (isAIConfigured()) {
        if (statusDot) {
            statusDot.classList.remove('status-inactive');
            statusDot.classList.add('status-active');
        }
        if (statusText) {
            statusText.textContent = 'AI Configured ✓';
            statusText.style.color = 'var(--success)';
        }
        if (keyDisplay) {
            keyDisplay.textContent = getAPIKeyMasked();
        }
    } else {
        if (statusDot) {
            statusDot.classList.remove('status-active');
            statusDot.classList.add('status-inactive');
        }
        if (statusText) {
            statusText.textContent = 'AI Not Configured';
            statusText.style.color = '';
        }
        if (keyDisplay) {
            keyDisplay.textContent = 'No API key set';
        }
    }
}

// Check AI configuration before analysis
function checkAIConfigBeforeAnalysis() {
    if (!isAIConfigured()) {
        showNotification('⚠️ Please configure your Claude API key in Admin settings first', 'warning');
        setTimeout(() => {
            navigateToSection('uxd-admin');
        }, 1500);
        return false;
    }
    return true;
}

// Confirm functions are registered
console.log('✅ saveAPIKey function registered:', typeof window.saveAPIKey);
console.log('✅ testAPIKey function registered:', typeof window.testAPIKey);

// Initialize - attach to analyze button and update status
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AI Analyzer DOMContentLoaded');
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            if (checkAIConfigBeforeAnalysis()) {
                analyzeResearchData();
            }
        });
    }
    
    // Update AI status on load
    updateAIStatus();
    console.log('✅ AI Status updated');
});

// Add animations for loading and notifications
const style = document.createElement('style');
style.textContent = `
    .spinning {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0;
            transform: translateX(100px);
        }
        to { 
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
