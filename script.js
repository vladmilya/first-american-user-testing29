// User Testing Insights Report - Interactive Script

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
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
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
            <div style="background: var(--surface); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--secondary); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--secondary); font-size: 1.25rem;">🎯 Study Goals</h3>
                <p style="line-height: 1.7; color: var(--text); margin: 0;">${metadata.studyGoals}</p>
            </div>
        ` : ''}
        
        <h3 style="margin-bottom: 1rem; color: var(--primary);">👥 Research Participants</h3>
        <p style="color: var(--text-light); margin-bottom: 1.5rem;">Click on any participant icon to view their detailed profile, experience, and key contributions to this research.</p>
        
        <div class="participants-icons-grid">
            ${participants.map(p => `
                <div class="participant-icon-wrapper" onclick="toggleParticipantDetails('${p.id}')">
                    <div class="participant-icon">
                        <div class="icon-initials">${p.name.charAt(0)}</div>
                    </div>
                    <div class="icon-label">${p.name}</div>
                    <div class="icon-sublabel">${p.location.split(',')[0]}</div>
                </div>
            `).join('')}
        </div>
        
        <div id="participant-detail-modal" class="participant-modal" style="display: none;">
            <div class="modal-content">
                <span class="modal-close" onclick="closeParticipantModal()">×</span>
                <div id="modal-participant-content"></div>
            </div>
        </div>
    `;
}

// Toggle participant detail visibility
function toggleParticipantDetails(participantId) {
    const participant = synthesisData.participantDetails.find(p => p.id === participantId);
    if (!participant) return;
    
    const modal = document.getElementById('participant-detail-modal');
    const content = document.getElementById('modal-participant-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">${participant.name.charAt(0)}</div>
            <div>
                <h2>${participant.name}</h2>
                <div class="modal-role">${participant.role}</div>
                <div class="modal-location">📍 ${participant.location}</div>
            </div>
        </div>
        <div class="modal-section">
            <h4>Experience</h4>
            <p>${participant.experience}</p>
        </div>
        <div class="modal-section">
            <h4>Systems Used</h4>
            <p>${participant.systems}</p>
        </div>
        <div class="modal-section">
            <h4>Key Contributions</h4>
            <ul>
                ${participant.keyContributions.map(contrib => `<li>${contrib}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-section highlight-quote">
            <h4>Notable Quote</h4>
            <p style="font-style: italic;">"${participant.topQuote}"</p>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeParticipantModal() {
    document.getElementById('participant-detail-modal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('participant-detail-modal');
    if (e.target === modal) {
        closeParticipantModal();
    }
});

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
        
        return `
            <div class="card finding-card" data-severity="${finding.severity}" data-category="${featureCategory}">
                <span class="severity ${finding.severity}">${finding.severity.toUpperCase()}</span>
                <span class="category-badge">${finding.category}</span>
                <h3>${finding.title}</h3>
                <p>${finding.description}</p>
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
    
    section.innerHTML = themes.map(theme => `
        <div class="card theme-card">
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
    
    section.innerHTML = recommendations.map(rec => `
        <div class="card recommendation-card">
            <div class="rec-header">
                <span class="priority ${rec.priority}">${rec.priority.toUpperCase()}</span>
                <span class="related-theme">Theme: ${rec.relatedTheme}</span>
            </div>
            <h3>${rec.title}</h3>
            <p class="rec-description">${rec.description}</p>
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
    `).join('');
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
