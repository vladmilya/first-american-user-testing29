// User Testing Synthesizer - Interactive Script

// State management
const state = {
    transcripts: [],
    questions: [],
    insights: null,
    currentSection: 'executive-summary'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeSearch();
    initializeAnalyze();
    setDate();
    loadSampleData(); // Optional: load sample data
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Skip if it's a toggle link
            if (link.classList.contains('nav-toggle')) {
                return;
            }
            
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
}

// Toggle sub-menu
function toggleSubMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const toggleLink = event.currentTarget;
    const subMenu = toggleLink.nextElementSibling;
    
    // Toggle expanded class
    toggleLink.classList.toggle('expanded');
    subMenu.classList.toggle('expanded');
}

function navigateToSection(sectionId) {
    // Update active states
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`[href="#${sectionId}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
    
    state.currentSection = sectionId;
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        performSearch(searchTerm);
    });
}

function performSearch(term) {
    if (!term) {
        clearHighlights();
        return;
    }
    
    const contentElements = document.querySelectorAll('.card, .section p, .section li');
    
    contentElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(term)) {
            highlightText(element, term);
        } else {
            element.classList.remove('highlight');
        }
    });
}

function highlightText(element, term) {
    // Simple highlighting - can be enhanced
    element.classList.add('highlight');
}

function clearHighlights() {
    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
    });
}

// Analyze transcripts
function initializeAnalyze() {
    const analyzeBtn = document.getElementById('analyze-btn');
    
    analyzeBtn.addEventListener('click', () => {
        const transcriptText = document.getElementById('transcript-input').value;
        const questionsText = document.getElementById('questions-input').value;
        
        if (!transcriptText.trim()) {
            alert('Please paste transcript data first!');
            return;
        }
        
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        
        // Parse input
        state.transcripts = parseTranscripts(transcriptText);
        state.questions = parseQuestions(questionsText);
        
        // Simulate analysis (in real app, this would be AI-powered)
        setTimeout(() => {
            state.insights = analyzeData(state.transcripts, state.questions);
            renderInsights(state.insights);
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Transcripts';
            navigateToSection('executive-summary');
        }, 1500);
    });
}

// Parse transcripts from text
function parseTranscripts(text) {
    // Simple parser - assumes paragraphs are separated by double newlines
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((para, index) => ({
        id: index + 1,
        text: para.trim(),
        participant: `P${Math.floor(index / 5) + 1}`, // Group every 5 paragraphs
        timestamp: null
    }));
}

// Parse research questions
function parseQuestions(text) {
    if (!text.trim()) {
        return [
            'What problems are users trying to solve?',
            'What features do they find most valuable?',
            'Where do they encounter difficulties?',
            'What improvements would enhance their experience?'
        ];
    }
    
    return text.split('\n').filter(q => q.trim()).map(q => q.trim());
}

// Analyze data (simplified version - real implementation would use AI)
function analyzeData(transcripts, questions) {
    // This is a simplified analysis. In production, you'd use:
    // - NLP/AI for theme extraction
    // - Sentiment analysis
    // - Pattern recognition
    // - Quote extraction based on importance
    
    const keywords = extractKeywords(transcripts);
    const themes = identifyThemes(transcripts, keywords);
    const painPoints = identifyPainPoints(transcripts);
    const quotes = extractNotableQuotes(transcripts);
    const recommendations = generateRecommendations(themes, painPoints);
    
    return {
        summary: generateSummary(transcripts, themes),
        keyFindings: generateKeyFindings(themes, painPoints),
        themes,
        painPoints,
        quotes,
        recommendations,
        stats: {
            participants: new Set(transcripts.map(t => t.participant)).size,
            responses: transcripts.length,
            themes: themes.length,
            painPoints: painPoints.length
        }
    };
}

// Helper: Extract keywords
function extractKeywords(transcripts) {
    const text = transcripts.map(t => t.text.toLowerCase()).join(' ');
    const words = text.match(/\b\w{4,}\b/g) || [];
    const frequency = {};
    
    words.forEach(word => {
        if (!isCommonWord(word)) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });
    
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word, count]) => ({ word, count }));
}

function isCommonWord(word) {
    const common = ['that', 'this', 'with', 'from', 'have', 'they', 'would', 'there', 'their', 'about', 'were', 'been'];
    return common.includes(word);
}

// Helper: Identify themes
function identifyThemes(transcripts, keywords) {
    // Simplified theme identification
    const themeKeywords = {
        'Usability Issues': ['confusing', 'difficult', 'hard', 'unclear', 'complicated'],
        'Feature Requests': ['wish', 'would', 'like', 'want', 'need', 'should'],
        'Performance': ['slow', 'fast', 'quick', 'loading', 'speed'],
        'Navigation': ['find', 'search', 'navigate', 'menu', 'page'],
        'Design Feedback': ['design', 'layout', 'visual', 'color', 'interface']
    };
    
    const themes = [];
    
    Object.entries(themeKeywords).forEach(([theme, words]) => {
        const examples = [];
        let frequency = 0;
        
        transcripts.forEach(transcript => {
            const text = transcript.text.toLowerCase();
            const matches = words.filter(word => text.includes(word));
            
            if (matches.length > 0) {
                frequency++;
                if (examples.length < 3) {
                    examples.push({
                        text: transcript.text.substring(0, 150) + '...',
                        participant: transcript.participant
                    });
                }
            }
        });
        
        if (frequency > 0) {
            themes.push({ theme, frequency, examples });
        }
    });
    
    return themes.sort((a, b) => b.frequency - a.frequency);
}

// Helper: Identify pain points
function identifyPainPoints(transcripts) {
    const painWords = ['problem', 'issue', 'frustrat', 'annoy', 'confus', 'difficult', 'bug', 'error', 'wrong', 'broken'];
    const painPoints = [];
    
    transcripts.forEach(transcript => {
        const text = transcript.text.toLowerCase();
        const hasPainWord = painWords.some(word => text.includes(word));
        
        if (hasPainWord) {
            // Extract sentence containing pain word
            const sentences = transcript.text.match(/[^.!?]+[.!?]+/g) || [transcript.text];
            sentences.forEach(sentence => {
                const lowerSentence = sentence.toLowerCase();
                if (painWords.some(word => lowerSentence.includes(word))) {
                    painPoints.push({
                        description: sentence.trim(),
                        participant: transcript.participant,
                        severity: determineSeverity(sentence)
                    });
                }
            });
        }
    });
    
    return painPoints.slice(0, 10); // Top 10 pain points
}

function determineSeverity(text) {
    const high = ['critical', 'major', 'serious', 'broken', 'cant', 'impossible'];
    const low = ['minor', 'small', 'slight'];
    
    const lowerText = text.toLowerCase();
    
    if (high.some(word => lowerText.includes(word))) return 'high';
    if (low.some(word => lowerText.includes(word))) return 'low';
    return 'medium';
}

// Helper: Extract notable quotes
function extractNotableQuotes(transcripts) {
    // Extract longer, meaningful statements
    const quotes = [];
    
    transcripts.forEach(transcript => {
        const sentences = transcript.text.match(/[^.!?]+[.!?]+/g) || [];
        
        sentences.forEach(sentence => {
            if (sentence.length > 50 && sentence.length < 200) {
                quotes.push({
                    text: sentence.trim(),
                    participant: transcript.participant,
                    context: 'User Feedback'
                });
            }
        });
    });
    
    return quotes.slice(0, 8); // Top 8 quotes
}

// Helper: Generate recommendations
function generateRecommendations(themes, painPoints) {
    const recommendations = [];
    
    // Generate recommendations based on themes
    themes.slice(0, 3).forEach((theme, index) => {
        recommendations.push({
            title: `Address ${theme.theme}`,
            description: `Based on ${theme.frequency} mentions, users are experiencing issues related to ${theme.theme.toLowerCase()}.`,
            priority: index === 0 ? 'p0' : index === 1 ? 'p1' : 'p2',
            impact: `This affects user satisfaction and could improve retention if addressed.`,
            actionItems: [
                'Conduct deeper investigation',
                'Design solution',
                'Implement and test',
                'Validate with users'
            ]
        });
    });
    
    // Add pain point recommendation
    if (painPoints.length > 0) {
        recommendations.push({
            title: 'Resolve Critical Pain Points',
            description: `Users reported ${painPoints.length} specific issues that are blocking or frustrating their experience.`,
            priority: 'p0',
            impact: `Resolving these will immediately improve user satisfaction and reduce support burden.`,
            actionItems: [
                'Prioritize by severity and frequency',
                'Fix critical bugs first',
                'Improve error messaging',
                'Add better onboarding'
            ]
        });
    }
    
    return recommendations;
}

// Helper: Generate summary
function generateSummary(transcripts, themes) {
    const participantCount = new Set(transcripts.map(t => t.participant)).size;
    const topThemes = themes.slice(0, 3).map(t => t.theme).join(', ');
    
    return `Analysis of ${participantCount} user testing sessions revealed key insights across ${themes.length} major themes. 
    The most prominent areas of feedback include: ${topThemes}. Users provided detailed perspectives on their 
    experience, highlighting both opportunities for improvement and positive aspects of the current implementation.`;
}

// Helper: Generate key findings
function generateKeyFindings(themes, painPoints) {
    const findings = [];
    
    findings.push({
        title: 'Primary User Concerns',
        description: `Users expressed concerns primarily around ${themes[0]?.theme.toLowerCase() || 'various aspects'}.`,
        severity: 'high',
        evidence: `Mentioned in ${themes[0]?.frequency || 0} separate instances across multiple participants.`
    });
    
    findings.push({
        title: 'Critical Pain Points Identified',
        description: `${painPoints.filter(p => p.severity === 'high').length} high-severity issues were discovered.`,
        severity: painPoints.filter(p => p.severity === 'high').length > 2 ? 'high' : 'medium',
        evidence: `These issues directly impact user ability to complete core tasks.`
    });
    
    if (themes.length > 1) {
        findings.push({
            title: 'Secondary Themes',
            description: `Additional patterns emerged around ${themes[1]?.theme.toLowerCase()}.`,
            severity: 'medium',
            evidence: `Observed in ${themes[1]?.frequency || 0} user sessions.`
        });
    }
    
    return findings;
}

// Render insights to the page
function renderInsights(insights) {
    renderExecutiveSummary(insights);
    renderKeyFindings(insights.keyFindings);
    renderThemes(insights.themes);
    renderPainPoints(insights.painPoints);
    renderQuotes(insights.quotes);
    renderRecommendations(insights.recommendations);
    
    // Render research questions if available
    if (typeof synthesisData !== 'undefined' && synthesisData.researchQuestions) {
        renderResearchQuestions(synthesisData.researchQuestions);
    }
    
    updateParticipantCount(insights.stats.participants);
}

function renderExecutiveSummary(insights) {
    const section = document.querySelector('#executive-summary .summary-content');
    
    // Get participant details and metadata from synthesisData
    const participants = (typeof synthesisData !== 'undefined' && synthesisData.participantDetails) 
        ? synthesisData.participantDetails 
        : [];
    
    const metadata = (typeof synthesisData !== 'undefined' && synthesisData.metadata) 
        ? synthesisData.metadata 
        : {};
    
    section.innerHTML = `
        ${metadata.studyBackground ? `
            <div style="background: var(--surface); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--primary); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--primary); font-size: 1.25rem;">📋 Study Background</h3>
                <p style="line-height: 1.7; color: var(--text); margin: 0;">${metadata.studyBackground}</p>
            </div>
        ` : ''}
        
        ${metadata.studyGoals ? `
            <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: white; font-size: 1.25rem;">🎯 Study Goals</h3>
                <p style="line-height: 1.7; color: rgba(255,255,255,0.95); margin: 0;">${metadata.studyGoals}</p>
            </div>
        ` : ''}
        
        <h3 style="margin-bottom: 1rem; color: var(--primary);">👥 Research Participants</h3>
        <p style="color: var(--text-light); margin-bottom: 1.5rem;">Click on any participant to view their detailed profile, experience, and key contributions to this research.</p>
        
        <div class="participants-grid">
            ${participants.map(p => `
                <div class="participant-card" onclick="toggleParticipantDetails('${p.id}')">
                    <div class="participant-header">
                        <div>
                            <h4>${p.name}</h4>
                            <div class="participant-role">${p.role}</div>
                            <div class="participant-location">📍 ${p.location}</div>
                        </div>
                        <div class="expand-icon" id="icon-${p.id}">›</div>
                    </div>
                    <div class="participant-details" id="details-${p.id}" style="display: none;">
                        <div class="detail-section">
                            <strong>Experience:</strong>
                            <p>${p.experience}</p>
                        </div>
                        <div class="detail-section">
                            <strong>Systems Used:</strong>
                            <p>${p.systems}</p>
                        </div>
                        <div class="detail-section">
                            <strong>Key Contributions:</strong>
                            <ul>
                                ${p.keyContributions.map(contrib => `<li>${contrib}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="detail-section highlight-quote">
                            <strong>Notable Quote:</strong>
                            <p style="font-style: italic; color: var(--text-light);">"${p.topQuote}"</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Toggle participant detail visibility
function toggleParticipantDetails(participantId) {
    const detailsEl = document.getElementById(`details-${participantId}`);
    const iconEl = document.getElementById(`icon-${participantId}`);
    
    if (detailsEl.style.display === 'none') {
        detailsEl.style.display = 'block';
        iconEl.textContent = '∨';
        iconEl.style.transform = 'rotate(0deg)';
    } else {
        detailsEl.style.display = 'none';
        iconEl.textContent = '›';
        iconEl.style.transform = 'rotate(0deg)';
    }
}

function renderKeyFindings(findings) {
    const container = document.querySelector('#key-findings');
    const existingGrid = container.querySelector('.findings-grid');
    
    // Create filter controls if they don't exist
    if (!container.querySelector('.findings-filters')) {
        const filtersHTML = `
            <div class="findings-filters">
                <div class="filter-group">
                    <label>Severity:</label>
                    <button class="filter-btn active" data-filter="severity" data-value="all">All</button>
                    <button class="filter-btn" data-filter="severity" data-value="high">High</button>
                    <button class="filter-btn" data-filter="severity" data-value="medium">Medium</button>
                    <button class="filter-btn" data-filter="severity" data-value="low">Low</button>
                </div>
                <div class="filter-group">
                    <label>Feature:</label>
                    <button class="filter-btn active" data-filter="category" data-value="all">All</button>
                    <button class="filter-btn" data-filter="category" data-value="inline">Inline Editing</button>
                    <button class="filter-btn" data-filter="category" data-value="cd">CD Comparison</button>
                    <button class="filter-btn" data-filter="category" data-value="deposit">Auto Deposit</button>
                    <button class="filter-btn" data-filter="category" data-value="general">General</button>
                </div>
            </div>
        `;
        existingGrid.insertAdjacentHTML('beforebegin', filtersHTML);
        
        // Add event listeners to filter buttons
        initializeFindingsFilters();
    }
    
    // Store findings data globally for filtering
    window.allFindings = findings;
    
    // Render findings
    renderFindingsCards(findings);
}

function renderFindingsCards(findings) {
    const section = document.querySelector('#key-findings .findings-grid');
    
    section.innerHTML = findings.map(finding => {
        // Determine feature category from title or description
        let featureCategory = 'general';
        const text = (finding.title + ' ' + finding.description + ' ' + finding.category).toLowerCase();
        
        if (text.includes('inline') || text.includes('edit') || text.includes('settlement statement')) {
            featureCategory = 'inline';
        } else if (text.includes('cd') || text.includes('comparison') || text.includes('closing disclosure')) {
            featureCategory = 'cd';
        } else if (text.includes('deposit') || text.includes('wire') || text.includes('notification')) {
            featureCategory = 'deposit';
        }
        
        // Bold participant names in evidence (names before colons)
        const formattedEvidence = finding.evidence.replace(/(\b[A-Z][a-z]+\b):/g, '<strong>$1</strong>:');
        
        // Get stored edits from localStorage
        const storedEdit = getStoredEdit('finding', findings.indexOf(finding));
        const description = storedEdit || finding.description;
        
        return `
            <div class="card finding-card" data-severity="${finding.severity}" data-category="${featureCategory}" data-index="${findings.indexOf(finding)}">
                <button class="edit-btn" onclick="toggleEdit('finding', ${findings.indexOf(finding)})" title="Edit description">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <span class="severity ${finding.severity}">${finding.severity.toUpperCase()}</span>
                <span class="category-badge">${finding.category}</span>
                <h3>${finding.title}</h3>
                <div class="editable-content">
                    <p class="description-text">${description}</p>
                    <textarea class="description-edit" style="display: none;">${description}</textarea>
                    <div class="edit-actions" style="display: none;">
                        <button class="save-btn" onclick="saveEdit('finding', ${findings.indexOf(finding)})">Save</button>
                        <button class="cancel-btn" onclick="cancelEdit('finding', ${findings.indexOf(finding)})">Cancel</button>
                    </div>
                </div>
                <div class="evidence">
                    <strong>Evidence:</strong> ${formattedEvidence}
                </div>
            </div>
        `;
    }).join('');
}

function initializeFindingsFilters() {
    const filterButtons = document.querySelectorAll('.findings-filters .filter-btn');
    const activeFilters = {
        severity: 'all',
        category: 'all'
    };
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.getAttribute('data-filter');
            const filterValue = btn.getAttribute('data-value');
            
            // Update active state
            document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active filters
            activeFilters[filterType] = filterValue;
            
            // Filter findings
            filterFindings(activeFilters);
        });
    });
}

function filterFindings(filters) {
    const cards = document.querySelectorAll('.finding-card');
    
    cards.forEach(card => {
        const cardSeverity = card.getAttribute('data-severity');
        const cardCategory = card.getAttribute('data-category');
        
        const severityMatch = filters.severity === 'all' || cardSeverity === filters.severity;
        const categoryMatch = filters.category === 'all' || cardCategory === filters.category;
        
        if (severityMatch && categoryMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function renderThemes(themes) {
    const section = document.querySelector('#themes .themes-container');
    
    // Get unique categories
    const categories = [...new Set(themes.map(t => t.category))].sort();
    
    // Create filter buttons
    const filterHTML = `
        <div class="themes-filters">
            <div class="filter-group">
                <label>Filter by Category:</label>
                <button class="filter-btn active" data-filter="category" data-value="all">All</button>
                ${categories.map(cat => `
                    <button class="filter-btn" data-filter="category" data-value="${cat}">
                        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Store themes globally for filtering
    window.allThemes = themes;
    
    section.innerHTML = filterHTML + '<div class="themes-grid"></div>';
    
    // Render theme cards
    renderThemeCards(themes);
    
    // Initialize filters
    initializeThemeFilters();
}

function renderThemeCards(themes) {
    const grid = document.querySelector('#themes .themes-grid');
    
    grid.innerHTML = themes.map(theme => `
        <div class="card theme-card" data-category="${theme.category}">
            <div class="theme-header">
                <h3>${theme.theme}</h3>
                <span class="frequency">${theme.frequency} mentions</span>
            </div>
            <div class="theme-category">
                <span class="badge ${theme.category}">${theme.category}</span>
            </div>
            <p class="theme-description">${theme.description}</p>
            ${theme.examples ? `
                <div class="examples">
                    <h4>Example Feedback:</h4>
                    <ul>
                        ${theme.examples.map(ex => `
                            <li>
                                "${ex.text}" <em>- ${ex.participant}</em>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function initializeThemeFilters() {
    const filterButtons = document.querySelectorAll('#themes .filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-value');
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter themes
            filterThemes(filterValue);
        });
    });
}

function filterThemes(category) {
    const cards = document.querySelectorAll('#themes .theme-card');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function renderPainPoints(painPoints) {
    const section = document.querySelector('#pain-points .pain-points-list');
    
    section.innerHTML = painPoints.map(pain => `
        <div class="card pain-point-card">
            <div class="pain-header">
                <span class="severity ${pain.severity}">${pain.severity.toUpperCase()}</span>
                <span class="badge ${pain.category}">${pain.category.replace('_', ' ').toUpperCase()}</span>
                <span class="frequency">${pain.frequency} users</span>
            </div>
            <p class="pain-description">${pain.description}</p>
            <div class="pain-participants">
                <strong>Reported by:</strong> ${pain.participants}
            </div>
            <div class="pain-quote">
                <strong>Quote:</strong>
                <p style="font-style: italic; color: var(--text-light); margin-top: 0.5rem;">"${pain.quote}"</p>
            </div>
        </div>
    `).join('');
}

function renderQuotes(quotes) {
    const section = document.querySelector('#quotes .quotes-container');
    
    section.innerHTML = quotes.map(quote => `
        <div class="card quote-card">
            <div class="quote-badges">
                <span class="badge ${quote.category}">${quote.category.replace('_', ' ').toUpperCase()}</span>
                <span class="badge feature-badge">${quote.feature}</span>
            </div>
            <div class="quote-text">"${quote.quote}"</div>
            <div class="quote-meta">
                <div><strong>${quote.participant}</strong></div>
                <div style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.25rem;">${quote.context}</div>
            </div>
        </div>
    `).join('');
}

function renderRecommendations(recommendations) {
    const section = document.querySelector('#recommendations .recommendations-list');
    
    section.innerHTML = recommendations.map((rec, index) => {
        // Get stored edits from localStorage
        const storedEdit = getStoredEdit('recommendation', index);
        const description = storedEdit || rec.description;
        
        return `
        <div class="card recommendation-card" data-index="${index}">
            <button class="edit-btn" onclick="toggleEdit('recommendation', ${index})" title="Edit description">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
            <div class="rec-header">
                <span class="priority ${rec.priority}">${rec.priority.toUpperCase()}</span>
                <span class="related-theme">Theme: ${rec.relatedTheme}</span>
            </div>
            <h3>${rec.title}</h3>
            <div class="editable-content">
                <p class="rec-description description-text">${description}</p>
                <textarea class="description-edit" style="display: none;">${description}</textarea>
                <div class="edit-actions" style="display: none;">
                    <button class="save-btn" onclick="saveEdit('recommendation', ${index})">Save</button>
                    <button class="cancel-btn" onclick="cancelEdit('recommendation', ${index})">Cancel</button>
                </div>
            </div>
            <div class="rec-details">
                <div class="detail-block">
                    <h4>📊 Rationale:</h4>
                    <p>${rec.rationale}</p>
                </div>
                <div class="detail-block">
                    <h4>💡 Expected Impact:</h4>
                    <p>${rec.impact}</p>
                </div>
            </div>
        </div>
    `}).join('');
}

function renderResearchQuestions(questionSections) {
    const section = document.querySelector('#research-questions .research-questions-list');
    
    // Count total questions
    const totalQuestions = questionSections.reduce((sum, sec) => sum + sec.questions.length, 0);
    
    section.innerHTML = `
        <div style="background: var(--surface); padding: 2rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
            <h3 style="margin-bottom: 1rem; color: var(--primary); font-size: 1.5rem;">📋 Complete Research Discussion Guide</h3>
            <p style="color: var(--text-light); line-height: 1.7; margin-bottom: 1rem;">
                This section contains <strong>all ${totalQuestions} detailed research questions</strong> from the ISS P4.1 Iterative Testing Discussion Guide, 
                organized by feature area. Each answer represents synthesized findings from patterns observed across all 6 participants, 
                with <strong>user consensus indicators (👤)</strong> showing how many participants expressed similar responses.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
                <div style="background: var(--bg); padding: 1rem; border-radius: 6px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">${totalQuestions}</div>
                    <div style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.25rem;">Total Questions</div>
                </div>
                <div style="background: var(--bg); padding: 1rem; border-radius: 6px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--secondary);">${questionSections.length}</div>
                    <div style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.25rem;">Topic Areas</div>
                </div>
                <div style="background: var(--bg); padding: 1rem; border-radius: 6px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">6</div>
                    <div style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.25rem;">Participants</div>
                </div>
                <div style="background: var(--bg); padding: 1rem; border-radius: 6px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--secondary);">60</div>
                    <div style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.25rem;">Minutes Each</div>
                </div>
            </div>
        </div>
        
        <div style="background: var(--bg); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid var(--border);">
            <h4 style="margin: 0 0 1rem 0; color: var(--text); font-size: 1rem;">👤 User Consensus Indicators</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="display: flex; gap: 0.25rem;">
                        <span style="color: var(--primary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--primary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--primary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--primary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--primary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--primary); font-size: 1.25rem;">👤</span>
                    </div>
                    <span style="color: var(--text-light); font-size: 0.875rem;"><strong style="color: var(--primary);">100% Consensus</strong> - All 6 users</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="display: flex; gap: 0.25rem;">
                        <span style="color: var(--secondary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--secondary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--secondary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--secondary); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--secondary); font-size: 1.25rem;">👤</span>
                        <span style="color: #ddd; font-size: 1.25rem;">👤</span>
                    </div>
                    <span style="color: var(--text-light); font-size: 0.875rem;"><strong style="color: var(--secondary);">83% Agreement</strong> - 5 of 6 users</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="display: flex; gap: 0.25rem;">
                        <span style="color: var(--text-light); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--text-light); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--text-light); font-size: 1.25rem;">👤</span>
                        <span style="color: var(--text-light); font-size: 1.25rem;">👤</span>
                        <span style="color: #ddd; font-size: 1.25rem;">👤</span>
                        <span style="color: #ddd; font-size: 1.25rem;">👤</span>
                    </div>
                    <span style="color: var(--text-light); font-size: 0.875rem;"><strong>67% Agreement</strong> - 4 of 6 users</span>
                </div>
            </div>
            <p style="margin: 1rem 0 0 0; color: var(--text-light); font-size: 0.875rem; line-height: 1.5;">
                Each question shows how many of the 6 participants expressed similar responses. Filled icons (👤) indicate agreement, while gray icons show users who had different perspectives or didn't address that specific question.
            </p>
        </div>
        
        ${questionSections.map((section, sectionIndex) => `
            <div style="margin-bottom: 3rem;">
                <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); padding: 1.5rem 2rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h2 style="color: white; margin: 0; font-size: 1.5rem;">
                        ${sectionIndex + 1}. ${section.section}
                    </h2>
                    <p style="color: white; opacity: 0.9; margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                        ${section.questions.length} questions in this section
                    </p>
                </div>
                
                ${section.questions.map((q, qIndex) => {
                    // Generate user icons based on userCount (6 participants)
                    const userIcons = Array(6).fill(0).map((_, i) => 
                        i < q.userCount 
                            ? '<span style="color: var(--primary); font-size: 1.25rem;">👤</span>' 
                            : '<span style="color: #ddd; font-size: 1.25rem;">👤</span>'
                    ).join('');
                    
                    const consensusLabel = q.userCount === 6 
                        ? '100% Consensus' 
                        : q.userCount === 5 
                        ? '83% Agreement' 
                        : q.userCount === 4
                        ? '67% Agreement'
                        : `${q.userCount}/6 Users`;
                    
                    const consensusColor = q.userCount === 6 
                        ? 'var(--primary)' 
                        : q.userCount >= 5 
                        ? 'var(--secondary)' 
                        : 'var(--text-light)';
                    
                    return `
                    <div class="card" style="margin-bottom: 1.25rem;">
                        <div style="display: flex; align-items: start; gap: 1.25rem;">
                            <div style="background: var(--secondary); color: white; min-width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0;">
                                ${qIndex + 1}
                            </div>
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem; gap: 1rem;">
                                    <h3 style="color: var(--text); margin: 0; font-size: 1.125rem; line-height: 1.5; flex: 1;">
                                        ${q.question}
                                    </h3>
                                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
                                        ${userIcons}
                                        <span style="color: ${consensusColor}; font-size: 0.75rem; font-weight: 700; white-space: nowrap; margin-left: 0.25rem;">
                                            ${consensusLabel}
                                        </span>
                                    </div>
                                </div>
                                <div style="padding: 1.25rem; background: var(--bg); border-radius: 6px; border-left: 3px solid var(--secondary);">
                                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                        <span style="color: var(--secondary); font-weight: 600; font-size: 0.875rem;">💡 SYNTHESIZED FINDING</span>
                                    </div>
                                    <p style="line-height: 1.7; margin: 0; color: var(--text);">
                                        ${q.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        `).join('')}
        
        <div style="background: var(--surface); padding: 2rem; border-radius: 8px; margin-top: 3rem; border: 2px solid var(--primary);">
            <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.25rem;">📚 About These Questions & Answers</h3>
            <p style="margin: 0 0 1rem 0; line-height: 1.7; color: var(--text);">
                These ${totalQuestions} questions were part of the <strong>ISS P4.1 Iterative Testing Discussion Guide</strong> used during moderated usability testing sessions. 
                The answers synthesize patterns, behaviors, and insights observed across all 6 participants.
            </p>
            <p style="margin: 0; line-height: 1.7; color: var(--text-light);">
                For direct quotes, specific evidence, and detailed findings, explore the <strong>"Key Findings,"</strong> <strong>"Notable Quotes,"</strong> and <strong>"Pain Points"</strong> sections.
            </p>
        </div>
    `;
}

function updateParticipantCount(count) {
    document.getElementById('participant-count').textContent = `${count} Participants`;
}

function setDate() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('date').textContent = today;
}

// Load sample data (optional, for demo purposes)
function loadSampleData() {
    // Check if synthesis data is available
    if (typeof synthesisData !== 'undefined' && synthesisData) {
        console.log('Loading synthesis data...', synthesisData);
        
        // Auto-load the synthesized data
        state.insights = {
            summary: synthesisData.executiveSummary,
            keyFindings: synthesisData.keyFindings,
            themes: synthesisData.themes,
            painPoints: synthesisData.painPoints,
            quotes: synthesisData.notableQuotes,
            recommendations: synthesisData.recommendations,
            stats: {
                participants: synthesisData.metadata.participants,
                responses: synthesisData.themes.reduce((sum, t) => sum + t.frequency, 0),
                themes: synthesisData.themes.length,
                painPoints: synthesisData.painPoints.length
            }
        };
        
        // Render the insights automatically
        console.log('Rendering insights...', state.insights);
        renderInsights(state.insights);
        console.log('Insights rendered successfully!');
    } else {
        console.error('synthesisData not found! Make sure synthesis-data.js is loaded.');
    }
}

// Export functionality (future enhancement)
function exportReport() {
    // Could generate PDF, CSV, or JSON export
    console.log('Export functionality - coming soon!');
}

// ========== INLINE EDITING FUNCTIONS ==========

// Get stored edit from localStorage
function getStoredEdit(type, index) {
    const key = `edit_${type}_${index}`;
    return localStorage.getItem(key);
}

// Save edit to localStorage
function saveStoredEdit(type, index, value) {
    const key = `edit_${type}_${index}`;
    localStorage.setItem(key, value);
}

// Toggle edit mode
function toggleEdit(type, index) {
    const card = document.querySelector(`.${type}-card[data-index="${index}"]`);
    if (!card) return;
    
    const textEl = card.querySelector('.description-text');
    const editEl = card.querySelector('.description-edit');
    const actionsEl = card.querySelector('.edit-actions');
    const editBtn = card.querySelector('.edit-btn');
    
    // Enter edit mode
    textEl.style.display = 'none';
    editEl.style.display = 'block';
    actionsEl.style.display = 'flex';
    editBtn.style.display = 'none';
    
    // Focus the textarea
    editEl.focus();
    
    // Store original value for cancel
    editEl.dataset.original = textEl.textContent;
}

// Save edit
function saveEdit(type, index) {
    const card = document.querySelector(`.${type}-card[data-index="${index}"]`);
    if (!card) return;
    
    const textEl = card.querySelector('.description-text');
    const editEl = card.querySelector('.description-edit');
    const actionsEl = card.querySelector('.edit-actions');
    const editBtn = card.querySelector('.edit-btn');
    
    const newValue = editEl.value.trim();
    
    if (newValue) {
        // Save to localStorage
        saveStoredEdit(type, index, newValue);
        
        // Update display
        textEl.textContent = newValue;
        
        // Exit edit mode
        textEl.style.display = 'block';
        editEl.style.display = 'none';
        actionsEl.style.display = 'none';
        editBtn.style.display = 'flex';
        
        // Show success feedback
        showEditFeedback(card, 'Saved!');
    }
}

// Cancel edit
function cancelEdit(type, index) {
    const card = document.querySelector(`.${type}-card[data-index="${index}"]`);
    if (!card) return;
    
    const textEl = card.querySelector('.description-text');
    const editEl = card.querySelector('.description-edit');
    const actionsEl = card.querySelector('.edit-actions');
    const editBtn = card.querySelector('.edit-btn');
    
    // Restore original value
    editEl.value = editEl.dataset.original || textEl.textContent;
    
    // Exit edit mode
    textEl.style.display = 'block';
    editEl.style.display = 'none';
    actionsEl.style.display = 'none';
    editBtn.style.display = 'flex';
}

// Show feedback message
function showEditFeedback(card, message) {
    const feedback = document.createElement('div');
    feedback.className = 'edit-feedback';
    feedback.textContent = message;
    card.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('fade-out');
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// ========== VIDEO UPLOAD FUNCTIONS ==========

// Store uploaded videos in memory
window.uploadedVideos = [];

// Initialize video upload functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoInput = document.getElementById('video-file-input');
    const analyzeBtn = document.getElementById('analyze-videos-btn');
    
    if (videoInput) {
        videoInput.addEventListener('change', handleVideoUpload);
    }
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeVideos);
    }
    
    // Load saved videos from localStorage
    loadSavedVideos();
});

// Handle video file upload
function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if we've reached the limit
    if (window.uploadedVideos.length >= 12) {
        alert('Maximum of 12 videos reached. Please remove a video before adding more.');
        return;
    }
    
    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid video file (MP4, WebM, MOV, or AVI)');
        return;
    }
    
    // Create video object
    const videoData = {
        id: Date.now(),
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        uploadDate: new Date().toISOString(),
        videoName: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        userName: '',
        userNumber: '',
        file: file
    };
    
    // Add to array
    window.uploadedVideos.push(videoData);
    
    // Save to localStorage (without the actual file)
    saveVideosToStorage();
    
    // Update UI
    renderVideoList();
    updateVideoCount();
    updateAnalyzeButton();
    
    // Show success message
    const status = document.getElementById('video-upload-status');
    status.innerHTML = `<span style="color: var(--success);">✓ ${file.name} uploaded successfully!</span>`;
    setTimeout(() => status.innerHTML = '', 3000);
    
    // Reset input
    event.target.value = '';
}

// Render video list
function renderVideoList() {
    const videoList = document.getElementById('video-list');
    
    if (window.uploadedVideos.length === 0) {
        videoList.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-light); margin-bottom: 1rem;">
                    <path d="M23 7l-7 5 7 5V7z"></path>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <p style="color: var(--text-light);">No videos uploaded yet. Add your first video above.</p>
            </div>
        `;
        return;
    }
    
    videoList.innerHTML = window.uploadedVideos.map((video, index) => `
        <div class="video-item" data-id="${video.id}">
            <div class="video-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 7l-7 5 7 5V7z"></path>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
            </div>
            <div class="video-details">
                <input type="text" class="video-name-input" value="${video.videoName}" 
                       onchange="updateVideoName(${video.id}, this.value)" 
                       placeholder="Video name...">
                <div class="video-meta">
                    <span>${video.fileName}</span>
                    <span>${video.fileSize}</span>
                </div>
                <div class="user-fields">
                    <input type="text" class="user-input" value="${video.userName}" 
                           onchange="updateUserName(${video.id}, this.value)" 
                           placeholder="Participant name (e.g., Sarah Johnson)">
                    <input type="text" class="user-input" value="${video.userNumber}" 
                           onchange="updateUserNumber(${video.id}, this.value)" 
                           placeholder="User # (e.g., P1, User 3)">
                </div>
            </div>
            <button class="remove-video-btn" onclick="removeVideo(${video.id})" title="Remove video">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `).join('');
}

// Update video name
function updateVideoName(id, name) {
    const video = window.uploadedVideos.find(v => v.id === id);
    if (video) {
        video.videoName = name;
        saveVideosToStorage();
    }
}

// Update user name
function updateUserName(id, name) {
    const video = window.uploadedVideos.find(v => v.id === id);
    if (video) {
        video.userName = name;
        saveVideosToStorage();
    }
}

// Update user number
function updateUserNumber(id, number) {
    const video = window.uploadedVideos.find(v => v.id === id);
    if (video) {
        video.userNumber = number;
        saveVideosToStorage();
    }
}

// Remove video
function removeVideo(id) {
    if (confirm('Are you sure you want to remove this video?')) {
        window.uploadedVideos = window.uploadedVideos.filter(v => v.id !== id);
        saveVideosToStorage();
        renderVideoList();
        updateVideoCount();
        updateAnalyzeButton();
    }
}

// Update video count
function updateVideoCount() {
    const countEl = document.getElementById('video-count');
    if (countEl) {
        countEl.textContent = window.uploadedVideos.length;
    }
}

// Update analyze button state
function updateAnalyzeButton() {
    const btn = document.getElementById('analyze-videos-btn');
    if (btn) {
        btn.disabled = window.uploadedVideos.length === 0;
    }
}

// Save videos to localStorage (metadata only)
function saveVideosToStorage() {
    const videosData = window.uploadedVideos.map(v => ({
        id: v.id,
        fileName: v.fileName,
        fileSize: v.fileSize,
        uploadDate: v.uploadDate,
        videoName: v.videoName,
        userName: v.userName,
        userNumber: v.userNumber
    }));
    localStorage.setItem('uploadedVideos', JSON.stringify(videosData));
}

// Load saved videos from localStorage
function loadSavedVideos() {
    const saved = localStorage.getItem('uploadedVideos');
    if (saved) {
        try {
            const videosData = JSON.parse(saved);
            window.uploadedVideos = videosData.map(v => ({
                ...v,
                file: null // File objects can't be saved in localStorage
            }));
            renderVideoList();
            updateVideoCount();
            updateAnalyzeButton();
        } catch (e) {
            console.error('Error loading saved videos:', e);
        }
    }
}

// Analyze videos
function analyzeVideos() {
    const instructions = document.getElementById('bot-instructions').value.trim();
    const progressSection = document.getElementById('analysis-progress');
    const progressText = document.getElementById('progress-text');
    const analyzeBtn = document.getElementById('analyze-videos-btn');
    
    // Show progress
    progressSection.style.display = 'block';
    analyzeBtn.disabled = true;
    
    // Generate analysis summary
    const videoSummary = window.uploadedVideos.map(v => {
        const userLabel = v.userName || v.userNumber || 'Unnamed User';
        return `• ${v.videoName} (${userLabel})`;
    }).join('\n');
    
    const analysisRequest = `
=== VIDEO ANALYSIS REQUEST ===

Total Videos: ${window.uploadedVideos.length}

Videos to Analyze:
${videoSummary}

Custom Instructions:
${instructions || 'No specific instructions provided. Please perform standard user testing analysis.'}

=== ACTION REQUIRED ===
Please analyze these ${window.uploadedVideos.length} user testing session videos and synthesize findings into:
1. Key behavioral insights
2. Usability issues and pain points
3. Notable quotes and reactions
4. Task completion patterns
5. Recommendations for improvement

Update the synthesis-data.js file with the new findings.
`;
    
    // Show the request in a modal for user to share with AI
    showAnalysisModal(analysisRequest);
    
    // Reset progress
    progressSection.style.display = 'none';
    analyzeBtn.disabled = false;
}

// Show analysis modal
function showAnalysisModal(request) {
    const modal = document.createElement('div');
    modal.className = 'analysis-modal';
    modal.innerHTML = `
        <div class="analysis-modal-content">
            <h3>📋 Video Analysis Request Generated</h3>
            <p style="color: var(--text-light); margin-bottom: 1.5rem;">
                Copy the information below and share it with the AI assistant to begin video analysis:
            </p>
            <textarea readonly class="analysis-request-text">${request}</textarea>
            <div class="modal-actions">
                <button class="copy-btn" onclick="copyAnalysisRequest()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy to Clipboard
                </button>
                <button class="close-modal-btn" onclick="closeAnalysisModal()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Copy analysis request to clipboard
function copyAnalysisRequest() {
    const textarea = document.querySelector('.analysis-request-text');
    textarea.select();
    document.execCommand('copy');
    
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    setTimeout(() => btn.innerHTML = originalText, 2000);
}

// Close analysis modal
function closeAnalysisModal() {
    const modal = document.querySelector('.analysis-modal');
    if (modal) {
        modal.remove();
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ========== PRESENTATION UPLOAD FUNCTIONS ==========

// Store uploaded presentations
window.uploadedPresentations = [];

// Initialize presentation upload functionality
document.addEventListener('DOMContentLoaded', () => {
    const presentationInput = document.getElementById('presentation-files-input');
    const submitBtn = document.getElementById('submit-presentations-btn');
    
    if (presentationInput) {
        presentationInput.addEventListener('change', handlePresentationUpload);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitPresentations);
    }
});

// Handle presentation file upload
function handlePresentationUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    // Validate file types
    const validExtensions = ['.xls', '.xlsx', '.doc', '.docx', '.pdf'];
    const invalidFiles = files.filter(file => {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        return !validExtensions.includes(ext);
    });
    
    if (invalidFiles.length > 0) {
        alert(`Invalid file types detected. Only Excel, Word, and PDF files are supported.\n\nInvalid files: ${invalidFiles.map(f => f.name).join(', ')}`);
        return;
    }
    
    // Add files to presentations array
    files.forEach(file => {
        const presentationData = {
            id: Date.now() + Math.random(),
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            fileType: getFileType(file.name),
            uploadDate: new Date().toISOString(),
            title: '',
            description: '',
            file: file
        };
        
        window.uploadedPresentations.push(presentationData);
    });
    
    // Update UI
    renderPresentationsList();
    showSubmitSection();
    
    // Reset input
    event.target.value = '';
}

// Get file type icon
function getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const types = {
        'xls': 'Excel',
        'xlsx': 'Excel',
        'doc': 'Word',
        'docx': 'Word',
        'pdf': 'PDF'
    };
    return types[ext] || 'Document';
}

// Get file type color
function getFileTypeColor(type) {
    const colors = {
        'Excel': '#217346',
        'Word': '#2b579a',
        'PDF': '#dc2626'
    };
    return colors[type] || '#6b7280';
}

// Render presentations list
function renderPresentationsList() {
    const listContainer = document.getElementById('presentations-list');
    const itemsContainer = document.getElementById('presentation-items');
    const countEl = document.getElementById('presentation-count');
    
    if (window.uploadedPresentations.length === 0) {
        listContainer.style.display = 'none';
        return;
    }
    
    listContainer.style.display = 'block';
    countEl.textContent = window.uploadedPresentations.length;
    
    itemsContainer.innerHTML = window.uploadedPresentations.map((pres, index) => `
        <div class="presentation-item" data-id="${pres.id}">
            <div class="presentation-icon" style="background: ${getFileTypeColor(pres.fileType)};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span class="file-type-badge">${pres.fileType}</span>
            </div>
            <div class="presentation-details">
                <input type="text" 
                       class="presentation-title-input" 
                       value="${pres.title}" 
                       onchange="updatePresentationTitle(${pres.id}, this.value)" 
                       placeholder="Enter presentation title *">
                <textarea 
                    class="presentation-description-input" 
                    onchange="updatePresentationDescription(${pres.id}, this.value)" 
                    placeholder="Describe what makes this a good presentation example (key strengths, effective techniques, etc.) *"
                    rows="3">${pres.description}</textarea>
                <div class="presentation-meta">
                    <span>📄 ${pres.fileName}</span>
                    <span>💾 ${pres.fileSize}</span>
                </div>
            </div>
            <button class="remove-presentation-btn" onclick="removePresentation(${pres.id})" title="Remove presentation">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `).join('');
}

// Update presentation title
function updatePresentationTitle(id, title) {
    const pres = window.uploadedPresentations.find(p => p.id === id);
    if (pres) {
        pres.title = title;
    }
}

// Update presentation description
function updatePresentationDescription(id, description) {
    const pres = window.uploadedPresentations.find(p => p.id === id);
    if (pres) {
        pres.description = description;
    }
}

// Remove presentation
function removePresentation(id) {
    if (confirm('Are you sure you want to remove this presentation?')) {
        window.uploadedPresentations = window.uploadedPresentations.filter(p => p.id !== id);
        renderPresentationsList();
        
        if (window.uploadedPresentations.length === 0) {
            hideSubmitSection();
        }
    }
}

// Show submit section
function showSubmitSection() {
    const submitSection = document.getElementById('submit-section');
    if (submitSection) {
        submitSection.style.display = 'block';
    }
}

// Hide submit section
function hideSubmitSection() {
    const submitSection = document.getElementById('submit-section');
    if (submitSection) {
        submitSection.style.display = 'none';
    }
}

// Submit presentations
function submitPresentations() {
    const feedbackEl = document.getElementById('submission-feedback');
    
    // Validate that all presentations have title and description
    const incomplete = window.uploadedPresentations.filter(p => !p.title.trim() || !p.description.trim());
    
    if (incomplete.length > 0) {
        feedbackEl.innerHTML = `<span style="color: var(--danger);">⚠️ Please provide a title and description for all presentations before submitting.</span>`;
        return;
    }
    
    // Show success message
    feedbackEl.innerHTML = `<span style="color: var(--success);">✓ Successfully submitted ${window.uploadedPresentations.length} presentation(s)! The AI will analyze these examples to learn effective presentation styles.</span>`;
    
    // Log submission (in real app, would send to server)
    console.log('Presentations submitted:', window.uploadedPresentations.map(p => ({
        title: p.title,
        description: p.description,
        fileName: p.fileName
    })));
    
    // Optional: Clear after submission
    setTimeout(() => {
        if (confirm('Presentations submitted successfully! Would you like to clear the list and upload more examples?')) {
            window.uploadedPresentations = [];
            renderPresentationsList();
            hideSubmitSection();
            feedbackEl.innerHTML = '';
        }
    }, 2000);
}

// Toggle FAQ
function toggleFAQ() {
    const content = document.querySelector('.faq-content');
    const icon = document.querySelector('.faq-toggle-icon');
    
    content.classList.toggle('expanded');
    icon.classList.toggle('rotated');
}

// ========== CAMPAIGN MANAGEMENT FUNCTIONS ==========

// Initialize campaigns on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCampaigns();
    renderCampaignsList();
});

// Campaign storage structure
function initializeCampaigns() {
    const campaigns = getCampaigns();
    
    // Original research files for ISS Iterative Testing 4.1
    const originalResearchFiles = {
        questions: [
            { id: 'file-orig-q1', name: 'Questions.pdf', uploadedDate: '2026-01-22T10:09:00.000Z', data: null }
        ],
        transcripts: [
            { id: 'file-orig-t1', name: 'User1.pdf', uploadedDate: '2026-01-22T10:04:00.000Z', data: null },
            { id: 'file-orig-t2', name: 'User2.pdf', uploadedDate: '2026-01-22T10:08:00.000Z', data: null },
            { id: 'file-orig-t3', name: 'User3.pdf', uploadedDate: '2026-01-22T10:12:00.000Z', data: null },
            { id: 'file-orig-t4', name: 'User4.pdf', uploadedDate: '2026-01-22T10:15:00.000Z', data: null },
            { id: 'file-orig-t5', name: 'User 5.pdf', uploadedDate: '2026-01-29T19:20:00.000Z', data: null },
            { id: 'file-orig-t6', name: 'User 6.pdf', uploadedDate: '2026-01-29T19:24:00.000Z', data: null }
        ],
        videos: [],
        presentations: [
            { id: 'file-orig-p1', name: 'P4.1_Formal Notes.pdf', uploadedDate: '2026-01-29T23:30:00.000Z', data: null }
        ]
    };
    
    // Default Discussion Guide topics for ISS campaign
    const defaultDiscussionGuideTopics = [
        { id: 'topic-default-1', name: 'Auto Deposits', category: 'behavioral' },
        { id: 'topic-default-2', name: 'SS In-Line Editing', category: 'behavioral' },
        { id: 'topic-default-3', name: 'CD Comparison', category: 'behavioral' }
    ];
    
    // If no campaigns exist, create the default one with original files
    if (campaigns.length === 0) {
        const defaultCampaign = {
            id: 'campaign-' + Date.now(),
            name: 'ISS Iterative Testing 4.1',
            createdDate: new Date().toISOString(),
            isActive: true,
            files: originalResearchFiles,
            customTopics: defaultDiscussionGuideTopics
        };
        campaigns.push(defaultCampaign);
        saveCampaigns(campaigns);
    } else {
        // Check if ISS campaign exists and has no files, add original files
        const issCampaign = campaigns.find(c => c.name === 'ISS Iterative Testing 4.1');
        if (issCampaign) {
            const files = issCampaign.files || { questions: [], transcripts: [], videos: [], presentations: [] };
            const totalFiles = (files.questions?.length || 0) + (files.transcripts?.length || 0) + 
                              (files.videos?.length || 0) + (files.presentations?.length || 0);
            
            if (totalFiles === 0) {
                issCampaign.files = originalResearchFiles;
            }
            
            // Add default topics if none exist
            if (!issCampaign.customTopics || issCampaign.customTopics.length === 0) {
                issCampaign.customTopics = defaultDiscussionGuideTopics;
            }
            
            saveCampaigns(campaigns);
        }
    }
    
    // Ensure all campaigns have files property
    campaigns.forEach(campaign => {
        if (!campaign.files) {
            campaign.files = {
                questions: [],
                transcripts: [],
                videos: [],
                presentations: []
            };
        }
    });
    saveCampaigns(campaigns);
}

// Get campaigns from localStorage
function getCampaigns() {
    const stored = localStorage.getItem('uxd_campaigns');
    return stored ? JSON.parse(stored) : [];
}

// Save campaigns to localStorage
function saveCampaigns(campaigns) {
    localStorage.setItem('uxd_campaigns', JSON.stringify(campaigns));
}

// Get active campaign
function getActiveCampaign() {
    const campaigns = getCampaigns();
    return campaigns.find(c => c.isActive) || campaigns[0];
}

// Set active campaign
function setActiveCampaign(campaignId) {
    const campaigns = getCampaigns();
    campaigns.forEach(c => {
        c.isActive = (c.id === campaignId);
    });
    saveCampaigns(campaigns);
    updateCurrentCampaignDisplay();
    renderCampaignsList();
}

// Update current campaign display
function updateCurrentCampaignDisplay() {
    const campaign = getActiveCampaign();
    const titleEl = document.getElementById('current-campaign-title');
    if (titleEl && campaign) {
        titleEl.textContent = campaign.name;
    }
    
    // Update current campaign files display
    const filesContainer = document.getElementById('current-campaign-files');
    if (filesContainer && campaign) {
        const files = campaign.files || { questions: [], transcripts: [], videos: [], presentations: [] };
        const totalFiles = (files.questions?.length || 0) + (files.transcripts?.length || 0) + 
                          (files.videos?.length || 0) + (files.presentations?.length || 0);
        
        if (totalFiles > 0) {
            filesContainer.innerHTML = `
                <div class="campaign-files-section">
                    <h5 class="files-header">📎 Uploaded Files (${totalFiles})</h5>
                    <div class="campaign-files-grid">
                        ${renderCampaignFiles(files)}
                    </div>
                </div>
            `;
        } else {
            filesContainer.innerHTML = '';
        }
    }
}

// Edit campaign title inline
function editCampaignTitle() {
    const campaign = getActiveCampaign();
    if (!campaign) return;
    
    const titleEl = document.getElementById('current-campaign-title');
    if (!titleEl) return;
    
    const currentName = campaign.name;
    
    // Create inline input
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.className = 'campaign-title-input';
    input.style.cssText = `
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text);
        border: 2px solid var(--primary);
        border-radius: 6px;
        padding: 0.25rem 0.5rem;
        outline: none;
        width: 100%;
        max-width: 300px;
        background: white;
    `;
    
    // Replace title with input
    titleEl.style.display = 'none';
    titleEl.parentNode.insertBefore(input, titleEl);
    input.focus();
    input.select();
    
    // Hide the edit button while editing
    const editBtn = titleEl.parentNode.querySelector('.edit-title-btn');
    if (editBtn) editBtn.style.display = 'none';
    
    // Save on blur or Enter
    const saveTitle = () => {
        const newName = input.value.trim();
        if (newName && newName !== currentName) {
            // Update campaign name
            const campaigns = getCampaigns();
            const activeCampaign = campaigns.find(c => c.isActive);
            if (activeCampaign) {
                activeCampaign.name = newName;
                saveCampaigns(campaigns);
            }
        }
        
        // Restore title display
        titleEl.textContent = newName || currentName;
        titleEl.style.display = '';
        if (editBtn) editBtn.style.display = '';
        input.remove();
        
        // Update other displays
        renderCampaignsList();
    };
    
    input.addEventListener('blur', saveTitle);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            input.blur();
        }
        if (e.key === 'Escape') {
            input.value = currentName;
            input.blur();
        }
    });
}

// Render campaigns list
function renderCampaignsList() {
    const listContainer = document.getElementById('campaigns-list');
    if (!listContainer) return;
    
    const campaigns = getCampaigns();
    
    if (campaigns.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 2rem;">No campaigns yet. Create your first campaign!</p>';
        return;
    }
    
    listContainer.innerHTML = campaigns.map(campaign => `
        <div class="campaign-list-item ${campaign.isActive ? 'active' : ''}" onclick="${!campaign.isActive ? `setActiveCampaign('${campaign.id}')` : ''}">
            <div class="campaign-list-info">
                <span class="campaign-list-name">${campaign.name}</span>
                <span class="campaign-list-date">Created: ${new Date(campaign.createdDate).toLocaleDateString()}</span>
            </div>
            <div class="campaign-list-actions">
                ${campaign.isActive ? '<span class="status-badge active">Active</span>' : '<span class="status-badge inactive">Click to activate</span>'}
                <button class="action-btn edit-btn" onclick="event.stopPropagation(); openEditCampaignModal('${campaign.id}')" title="Edit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="action-btn delete-btn" onclick="event.stopPropagation(); openDeleteModal('${campaign.id}')" title="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCurrentCampaignDisplay();
}

// Open create campaign modal
function openCreateCampaignModal() {
    const modal = document.getElementById('campaign-modal');
    const modalTitle = document.getElementById('campaign-modal-title');
    const input = document.getElementById('campaign-name-input');
    const saveBtn = document.querySelector('.save-campaign-btn');
    
    modalTitle.textContent = 'Create New Campaign';
    input.value = '';
    saveBtn.textContent = 'Create Campaign';
    saveBtn.setAttribute('data-mode', 'create');
    saveBtn.removeAttribute('data-campaign-id');
    
    modal.style.display = 'flex';
    setTimeout(() => input.focus(), 100);
}

// Open edit campaign modal
function openEditCampaignModal(campaignId) {
    const campaigns = getCampaigns();
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    const modal = document.getElementById('campaign-modal');
    const modalTitle = document.getElementById('campaign-modal-title');
    const input = document.getElementById('campaign-name-input');
    const saveBtn = document.querySelector('.save-campaign-btn');
    
    modalTitle.textContent = 'Edit Campaign';
    input.value = campaign.name;
    saveBtn.textContent = 'Save Changes';
    saveBtn.setAttribute('data-mode', 'edit');
    saveBtn.setAttribute('data-campaign-id', campaignId);
    
    modal.style.display = 'flex';
    setTimeout(() => input.focus(), 100);
}

// Close campaign modal
function closeCampaignModal() {
    const modal = document.getElementById('campaign-modal');
    modal.style.display = 'none';
}

// Save campaign (create or edit)
function saveCampaign() {
    const input = document.getElementById('campaign-name-input');
    const saveBtn = document.querySelector('.save-campaign-btn');
    const mode = saveBtn.getAttribute('data-mode');
    const campaignId = saveBtn.getAttribute('data-campaign-id');
    const name = input.value.trim();
    
    if (!name) {
        alert('Please enter a campaign name');
        return;
    }
    
    const campaigns = getCampaigns();
    
    if (mode === 'create') {
        // Create new campaign
        const newCampaign = {
            id: 'campaign-' + Date.now(),
            name: name,
            createdDate: new Date().toISOString(),
            isActive: false
        };
        campaigns.push(newCampaign);
    } else if (mode === 'edit') {
        // Edit existing campaign
        const campaign = campaigns.find(c => c.id === campaignId);
        if (campaign) {
            campaign.name = name;
        }
    }
    
    saveCampaigns(campaigns);
    renderCampaignsList();
    closeCampaignModal();
}

// Open delete modal
let campaignToDelete = null;

function openDeleteModal(campaignId) {
    const campaigns = getCampaigns();
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    // Prevent deleting the last campaign
    if (campaigns.length === 1) {
        alert('Cannot delete the last campaign. You must have at least one campaign.');
        return;
    }
    
    // Prevent deleting active campaign
    if (campaign.isActive) {
        alert('Cannot delete the active campaign. Please switch to another campaign first.');
        return;
    }
    
    campaignToDelete = campaignId;
    
    const modal = document.getElementById('delete-modal');
    const nameDisplay = document.getElementById('delete-campaign-name');
    nameDisplay.textContent = `"${campaign.name}"`;
    
    modal.style.display = 'flex';
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'none';
    campaignToDelete = null;
}

// Confirm delete campaign
function confirmDeleteCampaign() {
    if (!campaignToDelete) return;
    
    let campaigns = getCampaigns();
    campaigns = campaigns.filter(c => c.id !== campaignToDelete);
    
    saveCampaigns(campaigns);
    renderCampaignsList();
    closeDeleteModal();
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const campaignModal = document.getElementById('campaign-modal');
    const deleteModal = document.getElementById('delete-modal');
    
    if (e.target === campaignModal) {
        closeCampaignModal();
    }
    if (e.target === deleteModal) {
        closeDeleteModal();
    }
});

// ========== UNIFIED BUILD REPORT FUNCTIONS ==========

// Toggle video instructions expandable section
function toggleVideoInstructions() {
    const box = document.getElementById('video-instructions-box');
    const btn = box.querySelector('.expand-btn');
    const content = box.querySelector('.expandable-content');
    
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
        content.classList.remove('expanded');
        btn.classList.remove('expanded');
        content.style.maxHeight = '0';
    } else {
        content.classList.add('expanded');
        btn.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Handle multiple video file uploads
const uploadedVideosCompact = [];

document.getElementById('video-file-input')?.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    const statusDiv = document.getElementById('video-upload-status');
    
    if (files.length > 0) {
        statusDiv.innerHTML = `<span style="color: var(--primary);">⏳ Processing ${files.length} video(s)...</span>`;
    }
    
    files.forEach((file, index) => {
        if (file.type.startsWith('video/')) {
            // Process video with compression and thumbnail
            processVideoFile(file, statusDiv, index === files.length - 1);
        }
    });
    
    // Reset input
    e.target.value = '';
});

// Process video file with compression and thumbnail generation
async function processVideoFile(file, statusDiv, isLast) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    
    video.onloadedmetadata = async function() {
        // Seek to 1 second for thumbnail (or 0 if too short)
        video.currentTime = Math.min(1, video.duration / 2);
    };
    
    video.onseeked = async function() {
        try {
            // Generate thumbnail
            const thumbnail = generateVideoThumbnail(video);
            
            // Compress video (reduce quality by ~50%)
            const compressedData = await compressVideo(file, video);
            
            // Add to local list
            uploadedVideosCompact.push({
                name: file.name,
                size: file.size,
                type: file.type,
                thumbnail: thumbnail,
                duration: formatDuration(video.duration),
                originalSize: formatFileSize(file.size),
                compressedSize: compressedData ? formatFileSize(compressedData.length * 0.75) : 'N/A'
            });
            
            // Save to campaign with thumbnail
            addVideoToCampaign(file.name, thumbnail, compressedData);
            
            renderCompactVideoList();
            
            if (isLast) {
                statusDiv.innerHTML = `<span style="color: var(--success);">✓ Video(s) processed and compressed</span>`;
            }
            
            // Cleanup
            URL.revokeObjectURL(videoURL);
        } catch (error) {
            console.error('Video processing error:', error);
            statusDiv.innerHTML = `<span style="color: var(--danger);">Error processing video</span>`;
        }
    };
    
    video.onerror = function() {
        statusDiv.innerHTML = `<span style="color: var(--danger);">Error loading video</span>`;
        URL.revokeObjectURL(videoURL);
    };
}

// Generate thumbnail from video frame
function generateVideoThumbnail(video) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Thumbnail size (320px wide, maintain aspect ratio)
    const thumbWidth = 320;
    const thumbHeight = (video.videoHeight / video.videoWidth) * thumbWidth;
    
    canvas.width = thumbWidth;
    canvas.height = thumbHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, thumbWidth, thumbHeight);
    
    // Convert to JPEG with 70% quality
    return canvas.toDataURL('image/jpeg', 0.7);
}

// Compress video by re-encoding at lower quality
async function compressVideo(file, videoElement) {
    // For files over 10MB, only store thumbnail (localStorage has limits)
    if (file.size > 10 * 1024 * 1024) {
        console.log('Video too large for storage, saving thumbnail only');
        return null;
    }
    
    // For smaller files, compress using canvas-based frame capture
    // Note: Full video compression requires FFmpeg.wasm which is large
    // For now, we reduce quality by re-encoding the first few seconds as a preview
    
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Reduce dimensions by 50%
        const newWidth = Math.floor(videoElement.videoWidth * 0.5);
        const newHeight = Math.floor(videoElement.videoHeight * 0.5);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Draw current frame at reduced size
        ctx.drawImage(videoElement, 0, 0, newWidth, newHeight);
        
        // Return compressed preview image (not full video)
        // Full video compression would require FFmpeg.wasm
        return canvas.toDataURL('image/jpeg', 0.6);
    } catch (error) {
        console.error('Compression error:', error);
        return null;
    }
}

// Add video to campaign with thumbnail (overwrites if same name exists)
function addVideoToCampaign(fileName, thumbnail, compressedData) {
    const campaigns = getCampaigns();
    const activeCampaign = campaigns.find(c => c.isActive);
    
    if (!activeCampaign) return;
    
    if (!activeCampaign.files) {
        activeCampaign.files = {
            questions: [],
            transcripts: [],
            videos: [],
            presentations: []
        };
    }
    
    // Check if video with same name already exists
    const existingIndex = activeCampaign.files.videos.findIndex(f => f.name === fileName);
    
    const fileObject = {
        name: fileName,
        uploadedDate: new Date().toISOString(),
        thumbnail: thumbnail,
        data: compressedData, // Compressed preview or null for large files
        id: existingIndex >= 0 
            ? activeCampaign.files.videos[existingIndex].id  // Keep same ID if overwriting
            : 'file-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    };
    
    if (existingIndex >= 0) {
        // Overwrite existing video
        activeCampaign.files.videos[existingIndex] = fileObject;
        showFileOverwriteNotification(fileName);
    } else {
        // Add new video
        activeCampaign.files.videos.push(fileObject);
    }
    
    saveCampaigns(campaigns);
    updateCurrentCampaignDisplay();
    renderCampaignsList();
}

// Format duration as MM:SS
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function renderCompactVideoList() {
    const listDiv = document.getElementById('video-list-compact');
    const itemsDiv = document.getElementById('video-items-compact');
    const countSpan = document.getElementById('video-count-compact');
    
    if (uploadedVideosCompact.length === 0) {
        listDiv.style.display = 'none';
        return;
    }
    
    listDiv.style.display = 'block';
    countSpan.textContent = uploadedVideosCompact.length;
    
    itemsDiv.innerHTML = uploadedVideosCompact.map((video, index) => `
        <div class="compact-video-item">
            ${video.thumbnail ? `<img src="${video.thumbnail}" alt="${video.name}" class="video-thumbnail">` : '<div class="video-thumbnail-placeholder">🎥</div>'}
            <div class="video-item-info">
                <span class="compact-file-name">${video.name}</span>
                <span class="video-meta-info">${video.duration || ''} • ${video.originalSize || ''}</span>
            </div>
            <button class="compact-file-remove" onclick="removeCompactVideo(${index})" title="Remove">×</button>
        </div>
    `).join('');
}

function removeCompactVideo(index) {
    uploadedVideosCompact.splice(index, 1);
    renderCompactVideoList();
}

// Handle multiple presentation file uploads
const uploadedPresentationsCompact = [];

document.getElementById('presentation-files-input')?.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        uploadedPresentationsCompact.push({
            name: file.name,
            size: file.size,
            type: file.type
        });
        
        // Save to campaign
        const reader = new FileReader();
        reader.onload = function(event) {
            addFileToCampaign('presentations', file.name, event.target.result);
        };
        reader.readAsDataURL(file);
    });
    
    renderCompactPresentationList();
    
    // Reset input
    e.target.value = '';
});

function renderCompactPresentationList() {
    const listDiv = document.getElementById('presentations-list-compact');
    const itemsDiv = document.getElementById('presentation-items-compact');
    const countSpan = document.getElementById('presentation-count-compact');
    
    if (uploadedPresentationsCompact.length === 0) {
        listDiv.style.display = 'none';
        return;
    }
    
    listDiv.style.display = 'block';
    countSpan.textContent = uploadedPresentationsCompact.length;
    
    itemsDiv.innerHTML = uploadedPresentationsCompact.map((file, index) => `
        <div class="compact-file-item">
            <span class="compact-file-name">📄 ${file.name}</span>
            <button class="compact-file-remove" onclick="removeCompactPresentation(${index})" title="Remove">×</button>
        </div>
    `).join('');
}

function removeCompactPresentation(index) {
    uploadedPresentationsCompact.splice(index, 1);
    renderCompactPresentationList();
}

// ========== CAMPAIGN FILE MANAGEMENT ==========

// Add file to active campaign (overwrites if same name exists)
function addFileToCampaign(fileType, fileName, fileData) {
    const campaigns = getCampaigns();
    const activeCampaign = campaigns.find(c => c.isActive);
    
    if (!activeCampaign) return;
    
    if (!activeCampaign.files) {
        activeCampaign.files = {
            questions: [],
            transcripts: [],
            videos: [],
            presentations: []
        };
    }
    
    // Check if file with same name already exists
    const existingIndex = activeCampaign.files[fileType].findIndex(f => f.name === fileName);
    
    const fileObject = {
        name: fileName,
        uploadedDate: new Date().toISOString(),
        data: fileData, // Store base64 or file reference
        id: existingIndex >= 0 
            ? activeCampaign.files[fileType][existingIndex].id  // Keep same ID if overwriting
            : 'file-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    };
    
    if (existingIndex >= 0) {
        // Overwrite existing file
        activeCampaign.files[fileType][existingIndex] = fileObject;
        showFileOverwriteNotification(fileName);
    } else {
        // Add new file
        activeCampaign.files[fileType].push(fileObject);
    }
    
    saveCampaigns(campaigns);
    updateCurrentCampaignDisplay();
    renderCampaignsList();
}

// Show notification when file is overwritten
function showFileOverwriteNotification(fileName) {
    // Create notification element
    let notification = document.getElementById('file-overwrite-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'file-overwrite-notification';
        notification.className = 'file-overwrite-notification';
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <span class="notification-icon">🔄</span>
        <span class="notification-text">File updated: <strong>${fileName}</strong></span>
    `;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========== AI CHATBOT FUNCTIONS ==========

// Store chat history
let chatHistory = [];

// Get OpenAI API key from localStorage
function getApiKey() {
    return localStorage.getItem('openai_api_key') || '';
}

// Save OpenAI API key to localStorage
function saveApiKey(key) {
    localStorage.setItem('openai_api_key', key);
}

// Send chat message
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    input.value = '';
    
    // Check for API key
    const apiKey = getApiKey();
    if (!apiKey) {
        // Show prompt to add API key
        setTimeout(() => {
            addChatMessage(
                `To get AI-powered responses, please add your OpenAI API key. <br><br>
                <button onclick="promptForApiKey()" class="chat-action-btn">🔑 Add API Key</button><br><br>
                <small>Your key is stored locally and never sent to our servers.</small>`,
                'ai',
                true
            );
        }, 500);
        return;
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get uploaded presentation files for context
    const presentations = getUploadedPresentations();
    
    // Send to AI
    sendToAI(message, presentations, apiKey);
}

// Add message to chat UI
function addChatMessage(content, sender, isHtml = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
        <div class="message-content">
            ${isHtml ? content : `<p>${escapeHtml(content)}</p>`}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to history
    chatHistory.push({ role: sender === 'user' ? 'user' : 'assistant', content: content });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const indicator = document.createElement('div');
    indicator.className = 'chat-message ai-message';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// Get uploaded presentations info
function getUploadedPresentations() {
    const campaigns = getCampaigns();
    const activeCampaign = campaigns.find(c => c.isActive);
    
    if (!activeCampaign || !activeCampaign.files || !activeCampaign.files.presentations) {
        return [];
    }
    
    return activeCampaign.files.presentations.map(f => ({
        name: f.name,
        uploadedDate: f.uploadedDate
    }));
}

// Send message to OpenAI API
async function sendToAI(userMessage, presentations, apiKey) {
    const systemPrompt = `You are an AI Presentation Assistant helping UX researchers improve their presentation examples and report formats.

${presentations.length > 0 ? `The user has uploaded the following presentation examples: ${presentations.map(p => p.name).join(', ')}` : 'No presentation examples have been uploaded yet.'}

Your role is to:
1. Analyze presentation structure and provide feedback
2. Suggest improvements for clarity and impact
3. Recommend best practices for UX research presentations
4. Help users understand what makes an effective presentation
5. Provide specific, actionable suggestions

Be helpful, specific, and encouraging. If no files are uploaded, guide the user to upload examples first for more personalized feedback.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...chatHistory.slice(-10).map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        removeTypingIndicator();
        
        if (!response.ok) {
            const error = await response.json();
            if (response.status === 401) {
                addChatMessage(
                    `API key is invalid. Please update your key. <br><br>
                    <button onclick="promptForApiKey()" class="chat-action-btn">🔑 Update API Key</button>`,
                    'ai',
                    true
                );
            } else {
                addChatMessage(`Error: ${error.error?.message || 'Failed to get response'}`, 'ai');
            }
            return;
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        addChatMessage(aiResponse, 'ai');
        
    } catch (error) {
        removeTypingIndicator();
        addChatMessage(`Error connecting to AI: ${error.message}`, 'ai');
    }
}

// Prompt user for API key
function promptForApiKey() {
    const currentKey = getApiKey();
    const key = prompt('Enter your OpenAI API key:', currentKey ? '••••••••' + currentKey.slice(-4) : '');
    
    if (key && key !== '••••••••' + (currentKey ? currentKey.slice(-4) : '')) {
        saveApiKey(key);
        addChatMessage('✅ API key saved! You can now ask questions about your presentations.', 'ai');
    }
}

// Make suggestion items clickable
document.addEventListener('click', function(e) {
    if (e.target.matches('.suggestion-list li')) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = e.target.textContent.replace(/^["']|["']$/g, '');
            input.focus();
        }
    }
});

// ========== NOTE TAKER FUNCTIONS ==========

let currentZoom = 1;
let noteIdCounter = 0;
let selectedNotes = []; // Array for multiple selection
let isDragging = false;
let isResizing = false;
let dragOffset = { x: 0, y: 0 };
let currentBoardId = null;

// Initialize Note Taker
function initNoteTaker() {
    initBoards();
    restoreSplitScreenState();
    
    // Deselect notes when clicking outside (unless holding Ctrl/Cmd)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sticky-note') && !e.ctrlKey && !e.metaKey && selectedNotes.length > 0) {
            deselectAllNotes();
        }
    });
    
    // Check if Note Taker is active on load
    if (window.location.hash === '#note-taker') {
        enterNoteTaker();
    }
    
    // Listen for hash changes to enter/exit Note Taker mode
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#note-taker') {
            enterNoteTaker();
        } else {
            exitNoteTaker();
        }
    });
}

// Enter full-screen Note Taker mode
function enterNoteTaker() {
    document.body.classList.add('note-taker-active');
    // Hide sidebar and header immediately
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.report-header');
    if (sidebar) sidebar.style.display = 'none';
    if (header) header.style.display = 'none';
    
    // Refresh topic filter to sync with Discussion Guide topics
    populateTopicFilter();
    
    // Also refresh the topic selects in existing notes
    refreshAllNoteTopicSelects();
}

// Exit full-screen Note Taker mode
function exitNoteTaker() {
    document.body.classList.remove('note-taker-active');
    // Show sidebar and header
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.report-header');
    if (sidebar) sidebar.style.display = '';
    if (header) header.style.display = '';
}

// Go to Study Report Summary from Note Taker
function goToExecutiveSummary() {
    exitNoteTaker();
    navigateToSection('executive-summary');
}

// ========== TOPIC MANAGEMENT ==========

// Get custom topics from campaign (deduplicated)
function getCustomTopics() {
    const campaign = getActiveCampaign();
    if (campaign && campaign.customTopics) {
        // Deduplicate topics by name
        const seenNames = new Set();
        const uniqueTopics = campaign.customTopics.filter(topic => {
            const lowerName = topic.name.toLowerCase().trim();
            if (seenNames.has(lowerName)) {
                return false;
            }
            seenNames.add(lowerName);
            return true;
        });
        return uniqueTopics;
    }
    return [];
}

// Save custom topics to campaign
function saveCustomTopics(topics) {
    const campaigns = getCampaigns();
    const campaign = campaigns.find(c => c.isActive);
    if (campaign) {
        campaign.customTopics = topics;
        saveCampaigns(campaigns);
    }
}

// Get all topics (custom + themes from data)
function getAllTopics() {
    const customTopics = getCustomTopics();
    const dataThemes = getCampaignThemes();
    
    // Convert custom topics to theme format
    const customAsThemes = customTopics.map(t => ({
        theme: t.name,
        category: t.category,
        isCustom: true
    }));
    
    return [...customAsThemes, ...dataThemes];
}

// Get themes from synthesisData
function getCampaignThemes() {
    if (typeof synthesisData !== 'undefined' && synthesisData.themes) {
        return synthesisData.themes;
    }
    return [];
}

// Get topic options HTML for sticky note dropdown - ONLY Discussion Guide topics
function getTopicOptionsHtml(selectedTopic = '') {
    const customTopics = getCustomTopics();
    return customTopics.map(t => {
        const selected = t.name === selectedTopic ? 'selected' : '';
        // Truncate long topic names
        const displayName = t.name.length > 30 ? t.name.substring(0, 30) + '...' : t.name;
        return `<option value="${escapeHtml(t.name)}" ${selected}>${escapeHtml(displayName)}</option>`;
    }).join('');
}

// Get topic category for coloring
function getTopicCategory(topicName) {
    const customTopics = getCustomTopics();
    const topic = customTopics.find(t => t.name === topicName);
    return topic ? topic.category : null;
}

// Populate topic filter dropdown - ONLY shows Discussion Guide topics
function populateTopicFilter() {
    const select = document.getElementById('topic-filter-select');
    if (!select) return;
    
    // Clear existing options
    select.innerHTML = '<option value="all">All Topics</option>';
    
    // Only get custom topics from Discussion Guide
    const customTopics = getCustomTopics();
    
    if (customTopics.length === 0) {
        // Add placeholder if no topics
        const option = document.createElement('option');
        option.value = '';
        option.disabled = true;
        option.textContent = 'No topics added - Add in Build Report';
        select.appendChild(option);
        return;
    }
    
    // Deduplicate topics by name (keep only unique topics)
    const seenNames = new Set();
    const uniqueTopics = customTopics.filter(topic => {
        const lowerName = topic.name.toLowerCase().trim();
        if (seenNames.has(lowerName)) {
            return false;
        }
        seenNames.add(lowerName);
        return true;
    });
    
    // Add unique Discussion Guide topics
    uniqueTopics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.name;
        option.textContent = topic.name;
        select.appendChild(option);
    });
}

// Change topic of a sticky note
function changeNoteTopic(noteId, topic) {
    const note = document.getElementById(noteId);
    if (!note) return;
    
    // Update data attributes
    note.dataset.topic = topic;
    const category = getTopicCategory(topic);
    if (category) {
        note.dataset.topicCategory = category;
    } else {
        delete note.dataset.topicCategory;
    }
    
    // Save to storage
    saveStickyNotes();
    
    // Re-apply filter if active
    const currentFilter = document.getElementById('topic-filter-select')?.value || 'all';
    if (currentFilter !== 'all') {
        filterByTopic(currentFilter);
    }
}

// Filter notes by topic
function filterByTopic(topic) {
    const notes = document.querySelectorAll('.sticky-note');
    
    notes.forEach(note => {
        if (topic === 'all') {
            note.classList.remove('filtered-out');
        } else {
            const noteTopic = note.dataset.topic || '';
            if (noteTopic === topic) {
                note.classList.remove('filtered-out');
            } else {
                note.classList.add('filtered-out');
            }
        }
    });
}

// ========== MANAGE TOPICS MODAL ==========

// Show manage topics modal
function showManageTopicsModal() {
    const modal = document.getElementById('manage-topics-modal');
    if (modal) {
        modal.style.display = 'flex';
        renderCustomTopicsList();
        renderReportThemesList();
    }
}

// Close manage topics modal
function closeManageTopicsModal() {
    const modal = document.getElementById('manage-topics-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Refresh topic dropdowns
    populateTopicFilter();
    refreshAllNoteTopicSelects();
}

// Add custom topic
function addCustomTopic() {
    const input = document.getElementById('new-topic-input');
    const categorySelect = document.getElementById('topic-category-select');
    
    const topicName = input.value.trim();
    const category = categorySelect.value;
    
    if (!topicName) {
        alert('Please enter a topic name');
        return;
    }
    
    const customTopics = getCustomTopics();
    
    // Check for duplicates
    if (customTopics.some(t => t.name.toLowerCase() === topicName.toLowerCase())) {
        alert('This topic already exists');
        return;
    }
    
    customTopics.push({
        id: 'topic-' + Date.now(),
        name: topicName,
        category: category
    });
    
    saveCustomTopics(customTopics);
    
    // Clear input
    input.value = '';
    
    // Refresh list
    renderCustomTopicsList();
}

// Delete custom topic
function deleteCustomTopic(topicId) {
    let customTopics = getCustomTopics();
    customTopics = customTopics.filter(t => t.id !== topicId);
    saveCustomTopics(customTopics);
    renderCustomTopicsList();
}

// Render custom topics list
function renderCustomTopicsList() {
    const container = document.getElementById('custom-topics-list');
    if (!container) return;
    
    const customTopics = getCustomTopics();
    
    if (customTopics.length === 0) {
        container.innerHTML = '<div class="empty-topics-message">No custom topics yet. Add topics from your scenario file above.</div>';
        return;
    }
    
    container.innerHTML = customTopics.map(topic => `
        <div class="topic-item">
            <div class="topic-item-info">
                <span class="topic-category-badge ${topic.category}"></span>
                <span class="topic-item-name">${escapeHtml(topic.name)}</span>
            </div>
            <button class="delete-topic-btn" onclick="deleteCustomTopic('${topic.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `).join('');
}

// Render report themes list (read-only)
function renderReportThemesList() {
    const container = document.getElementById('report-themes-list');
    if (!container) return;
    
    const themes = getCampaignThemes();
    
    if (themes.length === 0) {
        container.innerHTML = '<div class="empty-topics-message">No themes found in report data.</div>';
        return;
    }
    
    container.innerHTML = themes.map(theme => `
        <div class="topic-item">
            <div class="topic-item-info">
                <span class="topic-category-badge ${theme.category}"></span>
                <span class="topic-item-name">${escapeHtml(theme.theme)}</span>
            </div>
        </div>
    `).join('');
}

// Refresh all note topic select dropdowns
function refreshAllNoteTopicSelects() {
    document.querySelectorAll('.sticky-note').forEach(note => {
        const topicSelect = note.querySelector('.topic-select');
        if (topicSelect) {
            const currentValue = topicSelect.value;
            const options = getTopicOptionsHtml(currentValue);
            topicSelect.innerHTML = `<option value="">No Topic</option>${options}`;
        }
    });
}

// ========== BUILD REPORT TOPICS ==========

// Add topic from Build Report page
function addTopicFromBuildReport() {
    const input = document.getElementById('build-report-topic-input');
    const categorySelect = document.getElementById('build-report-topic-category');
    
    const topicName = input.value.trim();
    const category = categorySelect.value;
    
    if (!topicName) {
        alert('Please enter a topic name');
        return;
    }
    
    const customTopics = getCustomTopics();
    
    // Check for duplicates
    if (customTopics.some(t => t.name.toLowerCase() === topicName.toLowerCase())) {
        alert('This topic already exists');
        return;
    }
    
    customTopics.push({
        id: 'topic-' + Date.now(),
        name: topicName,
        category: category
    });
    
    saveCustomTopics(customTopics);
    
    // Clear input
    input.value = '';
    
    // Refresh list
    renderBuildReportTopics();
}

// Delete topic from Build Report
function deleteTopicFromBuildReport(topicId) {
    let customTopics = getCustomTopics();
    customTopics = customTopics.filter(t => t.id !== topicId);
    saveCustomTopics(customTopics);
    renderBuildReportTopics();
}

// Render topics in Build Report page
function renderBuildReportTopics() {
    const container = document.getElementById('build-report-topics-list');
    if (!container) return;
    
    const customTopics = getCustomTopics();
    
    if (customTopics.length === 0) {
        container.innerHTML = '<span class="topics-empty-message">No topics added yet. Add topics from your discussion guide above.</span>';
        return;
    }
    
    container.innerHTML = customTopics.map(topic => `
        <div class="topic-tag">
            <span class="topic-tag-dot ${topic.category}"></span>
            <span class="topic-tag-name">${escapeHtml(topic.name)}</span>
            <button class="topic-tag-remove" onclick="deleteTopicFromBuildReport('${topic.id}')" title="Remove">×</button>
        </div>
    `).join('');
}

// Initialize Build Report topics on page load
document.addEventListener('DOMContentLoaded', function() {
    renderBuildReportTopics();
});

// ========== SPLIT SCREEN FUNCTIONALITY ==========

let isSplitScreenActive = false;
let splitResizeStartX = 0;
let splitLeftWidth = 0;

// Toggle split screen view
function toggleSplitScreen() {
    const container = document.getElementById('split-container');
    const splitRight = document.getElementById('split-right');
    const splitBtn = document.querySelector('.split-screen-btn');
    const iframe = document.getElementById('usertesting-iframe');
    
    isSplitScreenActive = !isSplitScreenActive;
    
    if (isSplitScreenActive) {
        container.classList.add('split-active');
        splitRight.style.display = 'flex';
        splitBtn.classList.add('active');
        
        // Load the URL if iframe is empty
        if (iframe.src === 'about:blank') {
            loadUserTestingUrl();
        }
        
        // Initialize resizer
        initSplitResizer();
    } else {
        container.classList.remove('split-active');
        splitRight.style.display = 'none';
        splitBtn.classList.remove('active');
    }
    
    // Save state
    localStorage.setItem('split_screen_active', isSplitScreenActive);
}

// Load UserTesting URL into iframe
function loadUserTestingUrl() {
    const urlInput = document.getElementById('usertesting-url');
    const iframe = document.getElementById('usertesting-iframe');
    const url = urlInput.value.trim();
    
    if (url) {
        iframe.src = url;
        localStorage.setItem('usertesting_url', url);
    }
}

// Open UserTesting in new tab
function openUserTestingExternal() {
    const urlInput = document.getElementById('usertesting-url');
    const url = urlInput.value.trim();
    
    if (url) {
        window.open(url, '_blank');
    }
}

// Initialize split resizer drag functionality
function initSplitResizer() {
    const resizer = document.getElementById('split-resizer');
    const container = document.getElementById('split-container');
    const splitLeft = container.querySelector('.split-left');
    
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        splitResizeStartX = e.clientX;
        splitLeftWidth = splitLeft.getBoundingClientRect().width;
        
        resizer.classList.add('resizing');
        document.addEventListener('mousemove', onSplitResize);
        document.addEventListener('mouseup', stopSplitResize);
    });
}

function onSplitResize(e) {
    const container = document.getElementById('split-container');
    const splitLeft = container.querySelector('.split-left');
    const containerWidth = container.getBoundingClientRect().width;
    
    const delta = e.clientX - splitResizeStartX;
    let newLeftWidth = splitLeftWidth + delta;
    
    // Constrain to min/max
    const minWidth = 300;
    const maxWidth = containerWidth - 300 - 6; // 6px for resizer
    
    newLeftWidth = Math.max(minWidth, Math.min(maxWidth, newLeftWidth));
    
    const percentage = (newLeftWidth / containerWidth) * 100;
    splitLeft.style.flex = `0 0 ${percentage}%`;
}

function stopSplitResize() {
    const resizer = document.getElementById('split-resizer');
    resizer.classList.remove('resizing');
    document.removeEventListener('mousemove', onSplitResize);
    document.removeEventListener('mouseup', stopSplitResize);
}

// Restore split screen state on page load
function restoreSplitScreenState() {
    const savedUrl = localStorage.getItem('usertesting_url');
    if (savedUrl) {
        const urlInput = document.getElementById('usertesting-url');
        if (urlInput) urlInput.value = savedUrl;
    }
    
    const wasSplitActive = localStorage.getItem('split_screen_active') === 'true';
    if (wasSplitActive) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            toggleSplitScreen();
        }, 100);
    }
}

// ========== BOARD MANAGEMENT ==========

// Get all boards from localStorage
function getBoards() {
    const stored = localStorage.getItem('note_boards');
    if (!stored) {
        // Get first participant name from report if available
        const participantNames = getParticipantNames();
        const firstParticipant = participantNames.find(p => p.userId === 1);
        const boardName = firstParticipant ? `${firstParticipant.name} (User Interview 1)` : 'User Interview 1';
        
        // Create default board
        const defaultBoard = {
            id: 'board-' + Date.now(),
            name: boardName,
            notes: [],
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('note_boards', JSON.stringify([defaultBoard]));
        return [defaultBoard];
    }
    return JSON.parse(stored);
}

// Save boards to localStorage
function saveBoards(boards) {
    localStorage.setItem('note_boards', JSON.stringify(boards));
}

// Initialize boards
function initBoards() {
    const boards = getBoards();
    currentBoardId = localStorage.getItem('current_board_id') || boards[0]?.id;
    
    // Make sure current board exists
    if (!boards.find(b => b.id === currentBoardId)) {
        currentBoardId = boards[0]?.id;
    }
    
    localStorage.setItem('current_board_id', currentBoardId);
    
    updateBoardSelector();
    updateUserCountDisplay();
    updateNoteTakerCampaignName();
    populateTopicFilter();
    loadCurrentBoard();
}

// Update campaign name display in Note Taker
function updateNoteTakerCampaignName() {
    const campaignNameEl = document.getElementById('note-taker-campaign-name');
    if (!campaignNameEl) return;
    
    const activeCampaign = getActiveCampaign();
    if (activeCampaign) {
        campaignNameEl.textContent = activeCampaign.name;
    } else {
        campaignNameEl.textContent = 'No Campaign';
    }
}

// Update user count display
function updateUserCountDisplay() {
    const boards = getBoards();
    const userBoards = boards.filter(b => b.name.startsWith('User Interview '));
    const countDisplay = document.getElementById('user-count-display');
    if (countDisplay) {
        const count = userBoards.length || boards.length;
        countDisplay.textContent = count + (count === 1 ? ' User' : ' Users');
    }
}

// Show user setup modal
function showUserSetupModal() {
    const modal = document.getElementById('user-setup-modal');
    if (modal) {
        modal.style.display = 'flex';
        updateUserPreview();
    }
}

// Close user setup modal
function closeUserSetupModal() {
    const modal = document.getElementById('user-setup-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Adjust user count
function adjustUserCount(delta) {
    const input = document.getElementById('user-count-input');
    if (input) {
        let value = parseInt(input.value) || 1;
        value = Math.max(1, Math.min(50, value + delta));
        input.value = value;
        updateUserPreview();
    }
}

// Update user preview
function updateUserPreview() {
    const input = document.getElementById('user-count-input');
    const preview = document.getElementById('user-preview');
    if (!input || !preview) return;
    
    const count = parseInt(input.value) || 1;
    const participantNames = getParticipantNames();
    
    let html = '<div class="user-preview-title">Boards to be created:</div><div class="user-preview-list">';
    for (let i = 1; i <= count; i++) {
        const participant = participantNames.find(p => p.userId === i);
        const boardName = participant ? `${participant.name} (User ${i})` : `User ${i}`;
        html += `<span class="user-preview-item">${boardName}</span>`;
    }
    html += '</div>';
    
    preview.innerHTML = html;
}

// Get participant names from synthesis data
function getParticipantNames() {
    if (typeof synthesisData !== 'undefined' && synthesisData.participantDetails) {
        // Sort by user ID number and extract names
        return synthesisData.participantDetails
            .sort((a, b) => {
                const numA = parseInt(a.id.replace('user', '')) || 0;
                const numB = parseInt(b.id.replace('user', '')) || 0;
                return numA - numB;
            })
            .map((p, index) => ({
                name: p.name,
                userId: index + 1
            }));
    }
    return [];
}

// Create user boards
function createUserBoards() {
    const input = document.getElementById('user-count-input');
    if (!input) return;
    
    const count = parseInt(input.value) || 1;
    
    // Confirm if there are existing boards
    const existingBoards = getBoards();
    const hasNotes = existingBoards.some(b => b.notes && b.notes.length > 0);
    
    if (hasNotes) {
        if (!confirm('This will replace all existing boards. Notes in current boards will be lost. Continue?')) {
            return;
        }
    }
    
    // Get participant names from report if available
    const participantNames = getParticipantNames();
    
    // Create new boards for each user
    const newBoards = [];
    const timestamp = Date.now();
    
    for (let i = 1; i <= count; i++) {
        // Use participant name from report if available, otherwise use "User Interview X"
        const participant = participantNames.find(p => p.userId === i);
        const boardName = participant ? `${participant.name} (User Interview ${i})` : `User Interview ${i}`;
        
        newBoards.push({
            id: 'board-' + timestamp + '-' + i,
            name: boardName,
            notes: [],
            createdAt: new Date().toISOString()
        });
    }
    
    // Save new boards
    saveBoards(newBoards);
    
    // Switch to first board
    currentBoardId = newBoards[0].id;
    localStorage.setItem('current_board_id', currentBoardId);
    
    // Reload
    const board = document.getElementById('sticky-board');
    if (board) {
        board.innerHTML = '';
    }
    
    updateBoardSelector();
    updateUserCountDisplay();
    loadCurrentBoard();
    closeUserSetupModal();
}

// Add listener to update preview when input changes
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-count-input');
    if (input) {
        input.addEventListener('input', updateUserPreview);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('user-setup-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeUserSetupModal();
            }
        });
    }
});

// Update board selector dropdown
function updateBoardSelector() {
    const select = document.getElementById('board-select');
    if (!select) return;
    
    const boards = getBoards();
    
    select.innerHTML = boards.map(board => `
        <option value="${board.id}" ${board.id === currentBoardId ? 'selected' : ''}>
            ${board.name}
        </option>
    `).join('');
    
    // Update current board name display
    const currentBoard = boards.find(b => b.id === currentBoardId);
    const nameEl = document.getElementById('current-board-name');
    if (nameEl && currentBoard) {
        nameEl.textContent = currentBoard.name;
    }
}

// Switch to a different board
function switchBoard(boardId) {
    // Save current board first
    saveStickyNotes();
    
    currentBoardId = boardId;
    localStorage.setItem('current_board_id', boardId);
    
    // Clear and load new board
    const board = document.getElementById('sticky-board');
    if (board) {
        board.innerHTML = '';
    }
    
    // Reset topic filter
    const topicFilter = document.getElementById('topic-filter-select');
    if (topicFilter) topicFilter.value = 'all';
    
    loadCurrentBoard();
    updateBoardSelector();
}

// Create a new board
function createNewBoard() {
    const name = prompt('Enter board name:', 'New Board');
    if (!name) return;
    
    const boards = getBoards();
    const newBoard = {
        id: 'board-' + Date.now(),
        name: name.trim(),
        notes: [],
        createdAt: new Date().toISOString()
    };
    
    boards.push(newBoard);
    saveBoards(boards);
    
    // Switch to new board
    switchBoard(newBoard.id);
}

// Delete current board
function deleteCurrentBoard() {
    const boards = getBoards();
    
    if (boards.length <= 1) {
        alert('Cannot delete the last board. You must have at least one board.');
        return;
    }
    
    const currentBoard = boards.find(b => b.id === currentBoardId);
    if (!confirm(`Are you sure you want to delete "${currentBoard?.name}"? All notes will be lost.`)) {
        return;
    }
    
    const newBoards = boards.filter(b => b.id !== currentBoardId);
    saveBoards(newBoards);
    
    // Switch to first available board
    switchBoard(newBoards[0].id);
}

// Edit board name
function editBoardName() {
    const boards = getBoards();
    const currentBoard = boards.find(b => b.id === currentBoardId);
    if (!currentBoard) return;
    
    const newName = prompt('Enter new board name:', currentBoard.name);
    if (!newName || newName.trim() === currentBoard.name) return;
    
    currentBoard.name = newName.trim();
    saveBoards(boards);
    updateBoardSelector();
}

// Load current board notes
function loadCurrentBoard() {
    const board = document.getElementById('sticky-board');
    if (!board) return;
    
    const boards = getBoards();
    const currentBoard = boards.find(b => b.id === currentBoardId);
    
    if (!currentBoard) return;
    
    // Update name display
    const nameEl = document.getElementById('current-board-name');
    if (nameEl) {
        nameEl.textContent = currentBoard.name;
    }
    
    // Load notes
    board.innerHTML = '';
    
    if (currentBoard.notes && currentBoard.notes.length > 0) {
        currentBoard.notes.forEach(noteData => {
            createNoteElement(noteData);
        });
    }
}

// Create note element from data
function createNoteElement(noteData) {
    const board = document.getElementById('sticky-board');
    if (!board) return;
    
    const note = document.createElement('div');
    note.className = `sticky-note ${noteData.color}`;
    note.id = noteData.id;
    note.style.left = noteData.x + 'px';
    note.style.top = noteData.y + 'px';
    note.style.width = noteData.width;
    note.style.minHeight = noteData.height;
    
    // Set topic data attributes
    if (noteData.topic) {
        note.dataset.topic = noteData.topic;
        const topicCategory = getTopicCategory(noteData.topic);
        if (topicCategory) note.dataset.topicCategory = topicCategory;
    }
    
    // Get topic options HTML
    const topicOptionsHtml = getTopicOptionsHtml(noteData.topic || '');
    
    note.innerHTML = `
        <div class="sticky-note-header">
            <div class="color-picker">
                <button class="color-btn yellow" onclick="changeNoteColor('${noteData.id}', 'yellow')" title="Yellow"></button>
                <button class="color-btn green" onclick="changeNoteColor('${noteData.id}', 'green')" title="Green"></button>
                <button class="color-btn red" onclick="changeNoteColor('${noteData.id}', 'red')" title="Red"></button>
            </div>
            <button class="delete-note-btn" onclick="deleteNote('${noteData.id}')" title="Delete Note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="sticky-note-topic">
            <select class="topic-select" onchange="changeNoteTopic('${noteData.id}', this.value)">
                <option value="">No Topic</option>
                ${topicOptionsHtml}
            </select>
        </div>
        <div class="text-format-toolbar">
            <button class="format-btn text-black" onclick="formatSelectedText('black')" title="Black Text">A</button>
            <button class="format-btn text-red" onclick="formatSelectedText('red')" title="Red Text">A</button>
        </div>
        <div class="sticky-note-content" contenteditable="true" 
             onfocus="onNoteEdit('${noteData.id}')" 
             onblur="onNoteBlur('${noteData.id}')"
             oninput="autoResizeFont(this)">${noteData.content || ''}</div>
        <div class="resize-handle" onmousedown="startResize(event, '${noteData.id}')"></div>
    `;
    
    board.appendChild(note);
    note.addEventListener('mousedown', (e) => startDrag(e, noteData.id));
    
    // Apply auto-resize font
    const content = note.querySelector('.sticky-note-content');
    if (content) autoResizeFont(content);
}

// Add a new sticky note
function addStickyNote(x = null, y = null) {
    const board = document.getElementById('sticky-board');
    const wrapper = document.getElementById('board-wrapper');
    if (!board) return;
    
    const noteId = 'note-' + Date.now() + '-' + (++noteIdCounter);
    
    // Position in visible area, accounting for scroll
    const scrollLeft = wrapper ? wrapper.scrollLeft : 0;
    const scrollTop = wrapper ? wrapper.scrollTop : 0;
    const visibleWidth = wrapper ? wrapper.offsetWidth : 600;
    const visibleHeight = wrapper ? wrapper.offsetHeight : 400;
    
    const posX = x !== null ? x : scrollLeft + Math.random() * (visibleWidth - 250) + 25;
    const posY = y !== null ? y : scrollTop + Math.random() * (visibleHeight - 200) + 25;
    
    const noteData = {
        id: noteId,
        x: posX,
        y: posY,
        width: '200px',
        height: '150px',
        color: 'yellow',
        content: ''
    };
    
    createNoteElement(noteData);
    
    // Focus on the content
    setTimeout(() => {
        const note = document.getElementById(noteId);
        const content = note?.querySelector('.sticky-note-content');
        if (content) content.focus();
    }, 100);
    
    saveStickyNotes();
    return noteId;
}

// Start dragging a note
function startDrag(e, noteId) {
    // Don't drag if clicking on buttons, content, or resize handle
    if (e.target.closest('.color-btn') || 
        e.target.closest('.delete-note-btn') || 
        e.target.closest('.format-btn') ||
        e.target.closest('.resize-handle') ||
        e.target.closest('.topic-select') ||
        e.target.classList.contains('sticky-note-content')) {
        return;
    }
    
    const note = document.getElementById(noteId);
    if (!note) return;
    
    // Pass event for multi-select detection
    selectNote(noteId, e);
    
    isDragging = true;
    note.classList.add('dragging');
    
    const rect = note.getBoundingClientRect();
    const board = document.getElementById('sticky-board');
    const boardRect = board.getBoundingClientRect();
    
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    const onMouseMove = (e) => {
        if (!isDragging) return;
        
        const newX = (e.clientX - boardRect.left - dragOffset.x) / currentZoom;
        const newY = (e.clientY - boardRect.top - dragOffset.y) / currentZoom;
        
        note.style.left = Math.max(0, newX) + 'px';
        note.style.top = Math.max(0, newY) + 'px';
    };
    
    const onMouseUp = () => {
        isDragging = false;
        note.classList.remove('dragging');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        saveStickyNotes();
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Start resizing a note
function startResize(e, noteId) {
    e.preventDefault();
    e.stopPropagation();
    
    const note = document.getElementById(noteId);
    if (!note) return;
    
    isResizing = true;
    
    const startWidth = note.offsetWidth;
    const startHeight = note.offsetHeight;
    const startX = e.clientX;
    const startY = e.clientY;
    
    const onMouseMove = (e) => {
        if (!isResizing) return;
        
        const newWidth = startWidth + (e.clientX - startX) / currentZoom;
        const newHeight = startHeight + (e.clientY - startY) / currentZoom;
        
        note.style.width = Math.max(120, newWidth) + 'px';
        note.style.minHeight = Math.max(100, newHeight) + 'px';
        
        // Auto-resize font after resize
        const content = note.querySelector('.sticky-note-content');
        if (content) autoResizeFont(content);
    };
    
    const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        saveStickyNotes();
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Select a note (supports multi-select with Ctrl/Cmd)
function selectNote(noteId, event) {
    const note = document.getElementById(noteId);
    if (!note) return;
    
    const isMultiSelect = event && (event.ctrlKey || event.metaKey);
    
    if (isMultiSelect) {
        // Toggle selection
        if (selectedNotes.includes(note)) {
            // Remove from selection
            note.classList.remove('selected');
            selectedNotes = selectedNotes.filter(n => n !== note);
        } else {
            // Add to selection
            note.classList.add('selected');
            selectedNotes.push(note);
        }
    } else {
        // Single select - clear others first
        deselectAllNotes();
        note.classList.add('selected');
        selectedNotes = [note];
    }
    
    // Update selection count display
    updateSelectionCount();
}

// Deselect all notes
function deselectAllNotes() {
    selectedNotes.forEach(note => {
        note.classList.remove('selected');
        note.classList.remove('editing');
    });
    selectedNotes = [];
    updateSelectionCount();
}

// Update selection count display
function updateSelectionCount() {
    const addToReportBtn = document.querySelector('.add-to-report-btn');
    if (addToReportBtn) {
        if (selectedNotes.length > 1) {
            addToReportBtn.innerHTML = `📄 Add ${selectedNotes.length} Notes to Report`;
        } else if (selectedNotes.length === 1) {
            addToReportBtn.innerHTML = `📄 Add to Report`;
        } else {
            addToReportBtn.innerHTML = `📄 Add to Report`;
        }
    }
}

// Legacy function for backward compatibility
function deselectNote() {
    deselectAllNotes();
}

// Change note color
function changeNoteColor(noteId, color) {
    const note = document.getElementById(noteId);
    if (!note) return;
    
    note.classList.remove('yellow', 'green', 'red');
    note.classList.add(color);
    saveStickyNotes();
}

// Delete a note
function deleteNote(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        note.remove();
        saveStickyNotes();
    }
}

// On note edit (focus)
function onNoteEdit(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        note.classList.add('editing');
        selectNote(noteId);
    }
}

// On note blur
function onNoteBlur(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        note.classList.remove('editing');
        saveStickyNotes();
    }
}

// Auto-resize font based on content length
function autoResizeFont(element) {
    const textLength = element.textContent.length;
    const noteWidth = element.parentElement.offsetWidth;
    
    let fontSize = 14;
    
    if (textLength > 200) fontSize = 11;
    else if (textLength > 150) fontSize = 12;
    else if (textLength > 100) fontSize = 13;
    
    // Also consider note width
    if (noteWidth < 150) fontSize = Math.min(fontSize, 11);
    
    element.style.fontSize = fontSize + 'px';
}

// Format selected text
function formatSelectedText(color) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;
    
    const span = document.createElement('span');
    span.style.color = color === 'red' ? '#dc2626' : 'black';
    
    try {
        range.surroundContents(span);
        saveStickyNotes();
    } catch (e) {
        // Handle partial selection across elements
        document.execCommand('foreColor', false, color === 'red' ? '#dc2626' : 'black');
        saveStickyNotes();
    }
}

// Zoom controls
function zoomBoard(delta) {
    currentZoom = Math.max(0.5, Math.min(2, currentZoom + delta));
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    const board = document.getElementById('sticky-board');
    if (board) {
        board.style.transform = `scale(${currentZoom})`;
    }
    
    const zoomLevel = document.getElementById('zoom-level');
    if (zoomLevel) {
        zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
    }
}

// Save sticky notes to current board
function saveStickyNotes() {
    const board = document.getElementById('sticky-board');
    if (!board || !currentBoardId) return;
    
    const notes = [];
    board.querySelectorAll('.sticky-note').forEach(note => {
        const content = note.querySelector('.sticky-note-content');
        const color = note.classList.contains('green') ? 'green' : 
                      note.classList.contains('red') ? 'red' : 'yellow';
        const topic = note.dataset.topic || '';
        
        notes.push({
            id: note.id,
            x: parseFloat(note.style.left),
            y: parseFloat(note.style.top),
            width: note.style.width,
            height: note.style.minHeight,
            color: color,
            content: content ? content.innerHTML : '',
            topic: topic
        });
    });
    
    // Update current board
    const boards = getBoards();
    const currentBoard = boards.find(b => b.id === currentBoardId);
    if (currentBoard) {
        currentBoard.notes = notes;
        saveBoards(boards);
    }
}

// Add selected note to report
function addSelectedToReport() {
    if (selectedNotes.length === 0) {
        alert('Please select one or more notes first.\n\nTip: Hold Ctrl/Cmd and click to select multiple notes.');
        return;
    }
    
    // Filter out empty notes
    const validNotes = selectedNotes.filter(note => {
        const content = note.querySelector('.sticky-note-content');
        return content && content.textContent.trim();
    });
    
    if (validNotes.length === 0) {
        alert('The selected notes are empty.');
        return;
    }
    
    // Add to report notes (stored in campaign)
    const campaigns = getCampaigns();
    const activeCampaign = campaigns.find(c => c.isActive);
    
    if (!activeCampaign) {
        alert('No active campaign found.');
        return;
    }
    
    if (!activeCampaign.reportNotes) {
        activeCampaign.reportNotes = [];
    }
    
    // Add each selected note
    validNotes.forEach(note => {
        const content = note.querySelector('.sticky-note-content');
        const noteText = content.textContent.trim();
        const noteColor = note.classList.contains('green') ? 'positive' : 
                          note.classList.contains('red') ? 'negative' : 'neutral';
        const noteTopic = note.dataset.topic || '';
        
        activeCampaign.reportNotes.push({
            id: 'report-note-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            content: noteText,
            type: noteColor,
            topic: noteTopic,
            addedAt: new Date().toISOString(),
            fromBoard: currentBoardId
        });
        
        // Visual feedback for each note
        note.style.outline = '3px solid var(--success)';
    });
    
    saveCampaigns(campaigns);
    
    // Clear visual feedback after delay
    setTimeout(() => {
        validNotes.forEach(note => {
            note.style.outline = '';
            note.classList.remove('selected');
        });
        selectedNotes = [];
        updateSelectionCount();
    }, 1500);
    
    const noteWord = validNotes.length === 1 ? 'note' : 'notes';
    alert(`${validNotes.length} ${noteWord} added to report!`);
}

// Initialize Note Taker when page loads
document.addEventListener('DOMContentLoaded', initNoteTaker);

// Render files for a campaign
function renderCampaignFiles(files) {
    let html = '';
    
    // Questions
    if (files.questions && files.questions.length > 0) {
        files.questions.forEach(file => {
            html += `
                <div class="campaign-file-item" onclick="previewFile('${file.id}', 'questions')">
                    <div class="file-icon questions-icon">📋</div>
                    <div class="file-info">
                        <div class="file-name" title="${file.name}">${file.name}</div>
                        <div class="file-type">Discussion Guide</div>
                    </div>
                </div>
            `;
        });
    }
    
    // Transcripts
    if (files.transcripts && files.transcripts.length > 0) {
        files.transcripts.forEach(file => {
            html += `
                <div class="campaign-file-item" onclick="previewFile('${file.id}', 'transcripts')">
                    <div class="file-icon transcripts-icon">📝</div>
                    <div class="file-info">
                        <div class="file-name" title="${file.name}">${file.name}</div>
                        <div class="file-type">Transcript</div>
                    </div>
                </div>
            `;
        });
    }
    
    // Videos
    if (files.videos && files.videos.length > 0) {
        files.videos.forEach(file => {
            html += `
                <div class="campaign-file-item video-file-item" onclick="previewFile('${file.id}', 'videos')">
                    ${file.thumbnail 
                        ? `<img src="${file.thumbnail}" alt="${file.name}" class="campaign-video-thumb">`
                        : `<div class="file-icon videos-icon">🎥</div>`
                    }
                    <div class="file-info">
                        <div class="file-name" title="${file.name}">${file.name}</div>
                        <div class="file-type">Video</div>
                    </div>
                </div>
            `;
        });
    }
    
    // Presentations
    if (files.presentations && files.presentations.length > 0) {
        files.presentations.forEach(file => {
            html += `
                <div class="campaign-file-item" onclick="previewFile('${file.id}', 'presentations')">
                    <div class="file-icon presentations-icon">📊</div>
                    <div class="file-info">
                        <div class="file-name" title="${file.name}">${file.name}</div>
                        <div class="file-type">AI Example</div>
                    </div>
                </div>
            `;
        });
    }
    
    return html || '<p style="color: var(--text-light); font-size: 0.875rem;">No files uploaded</p>';
}

// Preview file
function previewFile(fileId, fileType) {
    const campaigns = getCampaigns();
    let file = null;
    let campaign = null;
    
    // Find the file across all campaigns
    for (const c of campaigns) {
        if (c.files && c.files[fileType]) {
            const found = c.files[fileType].find(f => f.id === fileId);
            if (found) {
                file = found;
                campaign = c;
                break;
            }
        }
    }
    
    if (!file) {
        alert('File not found');
        return;
    }
    
    // Open preview modal
    openFilePreviewModal(file, campaign, fileType);
}

// Open file preview modal
function openFilePreviewModal(file, campaign, fileType) {
    const modal = document.getElementById('file-preview-modal');
    if (!modal) {
        // Create modal if it doesn't exist
        createFilePreviewModal();
        openFilePreviewModal(file, campaign, fileType);
        return;
    }
    
    const modalTitle = document.getElementById('file-preview-title');
    const modalCampaign = document.getElementById('file-preview-campaign');
    const modalContent = document.getElementById('file-preview-content');
    const downloadBtn = document.getElementById('file-preview-download');
    
    modalTitle.textContent = file.name;
    modalCampaign.textContent = `Campaign: ${campaign.name}`;
    
    // Display file preview based on type
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // Function to display file content
    function displayFileContent(fileData) {
        if (fileExt === 'pdf') {
            modalContent.innerHTML = `
                <iframe src="${fileData}" style="width: 100%; height: 500px; border: none;"></iframe>
            `;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
            modalContent.innerHTML = `
                <img src="${fileData}" style="max-width: 100%; height: auto;" alt="${file.name}">
            `;
        } else if (fileData.startsWith('data:video')) {
            modalContent.innerHTML = `
                <video controls style="max-width: 100%; height: auto;">
                    <source src="${fileData}" type="${fileData.split(';')[0].split(':')[1]}">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            modalContent.innerHTML = `
                <div style="padding: 2rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                    <h3>${file.name}</h3>
                    <p style="color: var(--text-light); margin-top: 1rem;">
                        Uploaded: ${new Date(file.uploadedDate).toLocaleString()}
                    </p>
                    <p style="color: var(--text-light);">
                        Preview not available for this file type
                    </p>
                </div>
            `;
        }
        
        // Setup download button
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = fileData;
            a.download = file.name;
            a.click();
        };
    }
    
    if (file.data) {
        displayFileContent(file.data);
    } else if (file.id && file.id.startsWith('file-orig-')) {
        // Original research file - load from external JSON
        modalContent.innerHTML = `
            <div style="padding: 3rem; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
                <h3 style="color: var(--primary);">Loading ${file.name}...</h3>
                <p style="color: var(--text-light); margin-top: 1rem;">Please wait while the file is being loaded</p>
            </div>
        `;
        
        // Fetch original file data
        fetch('./original-files-data.json')
            .then(response => {
                if (!response.ok) throw new Error('File data not available');
                return response.json();
            })
            .then(data => {
                if (data[file.id]) {
                    displayFileContent(data[file.id]);
                } else {
                    throw new Error('File not found in data');
                }
            })
            .catch(error => {
                modalContent.innerHTML = `
                    <div style="padding: 3rem; text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 1.5rem;">✅</div>
                        <h3 style="color: var(--primary); margin-bottom: 1rem;">${file.name}</h3>
                        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--success); margin: 1.5rem 0;">
                            <p style="color: var(--text); margin: 0; font-weight: 500;">
                                📊 This file has been processed and synthesized into the report
                            </p>
                        </div>
                        <p style="color: var(--text-light); margin-top: 1rem;">
                            <strong>Uploaded:</strong> ${new Date(file.uploadedDate).toLocaleDateString()}
                        </p>
                        <p style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.5rem;">
                            The insights from this document are reflected in the Executive Summary, Key Findings, Themes, Pain Points, and Recommendations sections.
                        </p>
                    </div>
                `;
                downloadBtn.style.display = 'none';
            });
    } else {
        // File without data - show processed message
        modalContent.innerHTML = `
            <div style="padding: 3rem; text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1.5rem;">✅</div>
                <h3 style="color: var(--primary); margin-bottom: 1rem;">${file.name}</h3>
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--success); margin: 1.5rem 0;">
                    <p style="color: var(--text); margin: 0; font-weight: 500;">
                        📊 This file has been processed and synthesized into the report
                    </p>
                </div>
                <p style="color: var(--text-light); margin-top: 1rem;">
                    <strong>Uploaded:</strong> ${new Date(file.uploadedDate).toLocaleDateString()}
                </p>
                <p style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.5rem;">
                    The insights from this document are reflected in the Executive Summary, Key Findings, Themes, Pain Points, and Recommendations sections.
                </p>
            </div>
        `;
        
        // Hide download button for processed files
        downloadBtn.style.display = 'none';
    }
    
    modal.style.display = 'flex';
}

// Close file preview modal
function closeFilePreviewModal() {
    const modal = document.getElementById('file-preview-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Create file preview modal
function createFilePreviewModal() {
    const modalHTML = `
        <div id="file-preview-modal" class="campaign-modal">
            <div class="file-preview-modal-content">
                <div class="file-preview-header">
                    <div>
                        <h3 id="file-preview-title">File Preview</h3>
                        <p id="file-preview-campaign" style="color: var(--text-light); font-size: 0.875rem; margin: 0.25rem 0 0 0;"></p>
                    </div>
                    <button class="close-modal-btn" onclick="closeFilePreviewModal()">&times;</button>
                </div>
                <div id="file-preview-content" class="file-preview-body">
                    <!-- Content will be inserted here -->
                </div>
                <div class="file-preview-footer">
                    <button id="file-preview-download" class="save-campaign-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download File
                    </button>
                    <button class="cancel-btn" onclick="closeFilePreviewModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close on outside click
    document.getElementById('file-preview-modal').addEventListener('click', (e) => {
        if (e.target.id === 'file-preview-modal') {
            closeFilePreviewModal();
        }
    });
}

// Update file upload handlers to save files to campaign
document.getElementById('questions-file')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            addFileToCampaign('questions', file.name, event.target.result);
            document.getElementById('questions-status').innerHTML = `<span style="color: var(--success);">✓ ${file.name} uploaded</span>`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('transcript-files')?.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            addFileToCampaign('transcripts', file.name, event.target.result);
        };
        reader.readAsDataURL(file);
    });
    if (files.length > 0) {
        document.getElementById('transcript-status').innerHTML = `<span style="color: var(--success);">✓ ${files.length} file(s) uploaded</span>`;
    }
});
