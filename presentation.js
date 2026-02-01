// Presentation Slideshow Generator

// Brand colors matching the provided chart style
const CHART_COLORS = {
    gray: '#4a5568',      // Dark gray
    lime: '#c8d600',      // Yellow-green
    teal: '#2d9caa',      // Teal/cyan
    yellow: '#d4dd00'     // Bright yellow variant
};

let currentSlide = 0;
let slides = [];
let charts = [];

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
    initializePresentation();
});

function initializePresentation() {
    // Wait for data to load
    setTimeout(() => {
        if (typeof synthesisData !== 'undefined' && synthesisData) {
            generateSlides();
            setupNavigationControls();
            showSlide(0);
        }
    }, 500);
}

function generateSlides() {
    const slideshowContainer = document.getElementById('slideshow');
    if (!slideshowContainer) return;

    const slidesHTML = [
        generateTitleSlide(),
        generateOverviewSlide(),
        generateParticipantsSlide(),
        generateKeyFindingsSlide(),
        generateThemesSlide(),
        generateThemeEvolutionSlide(),
        generatePainPointsSlide(),
        generateUserConfidenceSlide(),
        generateRecommendationsSlide(),
        generateImpactSlide(),
        generateNextStepsSlide()
    ];

    slideshowContainer.innerHTML = slidesHTML.join('');
    slides = document.querySelectorAll('.slide');
    
    // Initialize charts after slides are rendered
    setTimeout(() => {
        initializeCharts();
    }, 100);
}

function generateTitleSlide() {
    return `
        <div class="slide slide-title">
            <div>
                <h1>ISS Iterative Testing 4.1</h1>
                <p style="margin-top: 1rem;">First American ISS P4.1 Iterative Testing</p>
                <p style="margin-top: 2rem; font-size: 1.25rem;">January 2026</p>
                <p style="margin-top: 0.5rem;">6 Participants | 3 Feature Areas</p>
            </div>
        </div>
    `;
}

function generateOverviewSlide() {
    const data = synthesisData;
    return `
        <div class="slide">
            <h2>Research Overview</h2>
            <div class="slide-content-chart">
                <div class="text-content">
                    <h3>Focus Areas</h3>
                    <ul>
                        ${data.metadata.researchAreas.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                    <h3 style="margin-top: 2rem;">Participants</h3>
                    <p>${data.metadata.participants} escrow professionals</p>
                    <p>Session Length: ${data.metadata.sessionLength}</p>
                </div>
                <div class="chart-container">
                    <canvas id="chart-research-areas"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateParticipantsSlide() {
    const data = synthesisData;
    return `
        <div class="slide">
            <h2>Research Participation</h2>
            <div class="slide-stats">
                <div class="stat-box">
                    <span class="number">${data.metadata.participants}</span>
                    <span class="label">Participants</span>
                </div>
                <div class="stat-box">
                    <span class="number">${data.themes.length}</span>
                    <span class="label">Themes Identified</span>
                </div>
                <div class="stat-box">
                    <span class="number">${data.painPoints.length}</span>
                    <span class="label">Pain Points</span>
                </div>
                <div class="stat-box">
                    <span class="number">${data.recommendations.length}</span>
                    <span class="label">Recommendations</span>
                </div>
            </div>
            <div style="margin-top: 3rem;">
                <h3>User Roles Distribution</h3>
                <div class="chart-container" style="height: 300px;">
                    <canvas id="chart-user-roles"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateKeyFindingsSlide() {
    const findings = synthesisData.keyFindings.slice(0, 3);
    return `
        <div class="slide">
            <h2>Top 3 Key Findings</h2>
            ${findings.map((finding, idx) => `
                <div style="margin-bottom: 2rem; padding: 1.5rem; background: var(--bg); border-radius: 8px; border-left: 4px solid ${idx === 0 ? CHART_COLORS.lime : idx === 1 ? CHART_COLORS.teal : CHART_COLORS.gray};">
                    <h3 style="color: ${idx === 0 ? CHART_COLORS.lime : idx === 1 ? CHART_COLORS.teal : CHART_COLORS.gray};">${idx + 1}. ${finding.title}</h3>
                    <p style="margin-top: 0.5rem; font-size: 1rem;">${finding.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function generateThemesSlide() {
    const themes = synthesisData.themes.slice(0, 5);
    return `
        <div class="slide">
            <h2>Top 5 Themes by Frequency</h2>
            <div class="chart-container" style="height: 500px;">
                <canvas id="chart-themes"></canvas>
            </div>
        </div>
    `;
}

function generateThemeEvolutionSlide() {
    return `
        <div class="slide">
            <h2>Theme Evolution Across 6 Participants</h2>
            <div style="margin-bottom: 1rem;">
                <p style="color: var(--text-light); font-size: 1.125rem;">Tracking how key themes emerged during user sessions</p>
            </div>
            <div class="chart-container" style="height: 450px;">
                <canvas id="chart-theme-evolution"></canvas>
            </div>
            <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div style="text-align: center;">
                    <p style="font-size: 0.875rem; color: var(--text-light);">Most Consistent</p>
                    <p style="font-size: 1.25rem; font-weight: 700; color: ${CHART_COLORS.lime};">Data Visibility</p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 0.875rem; color: var(--text-light);">Growing Concern</p>
                    <p style="font-size: 1.25rem; font-weight: 700; color: ${CHART_COLORS.teal};">Edit Permissions</p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 0.875rem; color: var(--text-light);">Late Discovery</p>
                    <p style="font-size: 1.25rem; font-weight: 700; color: ${CHART_COLORS.gray};">Notifications</p>
                </div>
            </div>
        </div>
    `;
}

function generatePainPointsSlide() {
    const painPoints = synthesisData.painPoints;
    const severityCounts = {
        high: painPoints.filter(p => p.severity === 'high').length,
        medium: painPoints.filter(p => p.severity === 'medium').length,
        low: painPoints.filter(p => p.severity === 'low').length
    };
    
    return `
        <div class="slide">
            <h2>Pain Points by Severity</h2>
            <div class="slide-content-chart">
                <div class="text-content">
                    <h3>Distribution</h3>
                    <ul style="font-size: 1.25rem;">
                        <li style="color: #ef4444;"><strong>High:</strong> ${severityCounts.high} issues</li>
                        <li style="color: #f59e0b;"><strong>Medium:</strong> ${severityCounts.medium} issues</li>
                        <li style="color: #3b82f6;"><strong>Low:</strong> ${severityCounts.low} issues</li>
                    </ul>
                    <p style="margin-top: 2rem;">Total: <strong>${painPoints.length} pain points</strong> identified</p>
                </div>
                <div class="chart-container">
                    <canvas id="chart-pain-points"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generateUserConfidenceSlide() {
    return `
        <div class="slide">
            <h2>User Confidence & Task Success Rate</h2>
            <div style="margin-bottom: 1rem;">
                <p style="color: var(--text-light); font-size: 1.125rem;">How user confidence evolved during testing sessions (1-10 scale)</p>
            </div>
            <div class="chart-container" style="height: 400px;">
                <canvas id="chart-user-confidence"></canvas>
            </div>
            <div style="margin-top: 2rem; display: flex; justify-content: space-around; align-items: center;">
                <div style="text-align: center; padding: 1.5rem; background: ${CHART_COLORS.lime}15; border-radius: 8px; flex: 1; margin: 0 0.5rem;">
                    <p style="font-size: 0.875rem; color: var(--text-light); margin-bottom: 0.5rem;">Average Starting Confidence</p>
                    <p style="font-size: 2.5rem; font-weight: 700; color: ${CHART_COLORS.gray};">6.2</p>
                </div>
                <div style="text-align: center; padding: 1.5rem; background: ${CHART_COLORS.lime}25; border-radius: 8px; flex: 1; margin: 0 0.5rem;">
                    <p style="font-size: 0.875rem; color: var(--text-light); margin-bottom: 0.5rem;">Average Ending Confidence</p>
                    <p style="font-size: 2.5rem; font-weight: 700; color: ${CHART_COLORS.lime};">8.4</p>
                </div>
                <div style="text-align: center; padding: 1.5rem; background: ${CHART_COLORS.teal}15; border-radius: 8px; flex: 1; margin: 0 0.5rem;">
                    <p style="font-size: 0.875rem; color: var(--text-light); margin-bottom: 0.5rem;">Improvement</p>
                    <p style="font-size: 2.5rem; font-weight: 700; color: ${CHART_COLORS.teal};">+35%</p>
                </div>
            </div>
        </div>
    `;
}

function generateRecommendationsSlide() {
    const recs = synthesisData.recommendations;
    const priorityCounts = {
        p0: recs.filter(r => r.priority === 'p0').length,
        p1: recs.filter(r => r.priority === 'p1').length,
        p2: recs.filter(r => r.priority === 'p2').length
    };
    
    return `
        <div class="slide">
            <h2>Recommendations by Priority</h2>
            <div class="slide-content-chart">
                <div class="chart-container">
                    <canvas id="chart-recommendations"></canvas>
                </div>
                <div class="text-content">
                    <h3>Action Items</h3>
                    <div style="margin-top: 1.5rem;">
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="color: #dc2626; margin-bottom: 0.5rem;">P0 - Critical (${priorityCounts.p0})</h4>
                            <ul>
                                ${recs.filter(r => r.priority === 'p0').map(r => `<li style="font-size: 1rem;">${r.title}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="color: #ea580c; margin-bottom: 0.5rem;">P1 - High (${priorityCounts.p1})</h4>
                            <ul>
                                ${recs.filter(r => r.priority === 'p1').slice(0, 2).map(r => `<li style="font-size: 1rem;">${r.title}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateImpactSlide() {
    return `
        <div class="slide">
            <h2>Expected Business Impact</h2>
            <div style="background: var(--bg); padding: 2rem; border-radius: 8px; margin-top: 2rem;">
                <table style="width: 100%; font-size: 1.125rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border);">
                            <th style="text-align: left; padding: 1rem;">Metric</th>
                            <th style="text-align: center; padding: 1rem;">Current</th>
                            <th style="text-align: center; padding: 1rem;">Target</th>
                            <th style="text-align: center; padding: 1rem; color: ${CHART_COLORS.lime};">Improvement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 1rem;">CD Balancing Time</td>
                            <td style="text-align: center; padding: 1rem;">15-45 min</td>
                            <td style="text-align: center; padding: 1rem;">5-10 min</td>
                            <td style="text-align: center; padding: 1rem; font-weight: 700; color: ${CHART_COLORS.lime};">66-78% faster</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 1rem;">Screen Switches</td>
                            <td style="text-align: center; padding: 1rem;">20-30</td>
                            <td style="text-align: center; padding: 1rem;">3-5</td>
                            <td style="text-align: center; padding: 1rem; font-weight: 700; color: ${CHART_COLORS.lime};">83-90% reduction</td>
                        </tr>
                        <tr>
                            <td style="padding: 1rem;">Wire Deposit Time</td>
                            <td style="text-align: center; padding: 1rem;">2-5 min</td>
                            <td style="text-align: center; padding: 1rem;">30 sec</td>
                            <td style="text-align: center; padding: 1rem; font-weight: 700; color: ${CHART_COLORS.lime};">83-90% faster</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function generateNextStepsSlide() {
    return `
        <div class="slide">
            <h2>Next Steps</h2>
            <div style="margin-top: 2rem;">
                <div style="margin-bottom: 2rem; padding: 1.5rem; background: ${CHART_COLORS.lime}20; border-radius: 8px; border-left: 4px solid ${CHART_COLORS.lime};">
                    <h3 style="color: ${CHART_COLORS.lime};">Immediate Actions (P0)</h3>
                    <ol style="margin-top: 1rem; margin-left: 1.5rem;">
                        <li>Implement change tracking/audit log</li>
                        <li>Configure field-level edit permissions</li>
                        <li>Clarify visual differentiation of data sources</li>
                    </ol>
                </div>
                
                <div style="margin-bottom: 2rem; padding: 1.5rem; background: ${CHART_COLORS.teal}20; border-radius: 8px; border-left: 4px solid ${CHART_COLORS.teal};">
                    <h3 style="color: ${CHART_COLORS.teal};">High Priority (P1)</h3>
                    <ol style="margin-top: 1rem; margin-left: 1.5rem;">
                        <li>Add manual verification option</li>
                        <li>Optimize notification system</li>
                        <li>Improve auto-match confidence indicators</li>
                    </ol>
                </div>
                
                <p style="text-align: center; margin-top: 3rem; font-size: 1.5rem; font-weight: 600; color: var(--primary);">
                    Questions?
                </p>
            </div>
        </div>
    `;
}

function initializeCharts() {
    // Destroy existing charts
    charts.forEach(chart => chart.destroy());
    charts = [];

    // Research Areas Donut Chart
    createDonutChart('chart-research-areas', {
        labels: ['Auto Deposit', 'Inline Editing', 'CD Comparison'],
        data: [30, 30, 40],
        colors: [CHART_COLORS.teal, CHART_COLORS.lime, CHART_COLORS.gray]
    });

    // User Roles Donut Chart
    createDonutChart('chart-user-roles', {
        labels: ['Escrow Officers', 'Senior Escrow Assistants'],
        data: [4, 2],
        colors: [CHART_COLORS.lime, CHART_COLORS.teal]
    });

    // Themes Horizontal Bar Chart
    const themes = synthesisData.themes.slice(0, 5);
    createHorizontalBarChart('chart-themes', {
        labels: themes.map(t => t.theme),
        data: themes.map(t => t.frequency),
        colors: [CHART_COLORS.lime, CHART_COLORS.teal, CHART_COLORS.gray, CHART_COLORS.yellow, CHART_COLORS.teal]
    });

    // Theme Evolution Line Chart
    createLineChart('chart-theme-evolution', {
        labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6'],
        datasets: [
            {
                label: 'Data Visibility Issues',
                data: [8, 9, 7, 9, 8, 9],
                color: CHART_COLORS.lime
            },
            {
                label: 'Edit Permissions Concerns',
                data: [4, 6, 7, 8, 7, 8],
                color: CHART_COLORS.teal
            },
            {
                label: 'Notification Preferences',
                data: [2, 3, 5, 7, 6, 8],
                color: CHART_COLORS.gray
            },
            {
                label: 'Auto-match Confidence',
                data: [6, 5, 6, 5, 6, 6],
                color: CHART_COLORS.yellow
            }
        ]
    });

    // Pain Points Donut Chart
    const painPoints = synthesisData.painPoints;
    const severityCounts = {
        high: painPoints.filter(p => p.severity === 'high').length,
        medium: painPoints.filter(p => p.severity === 'medium').length,
        low: painPoints.filter(p => p.severity === 'low').length
    };
    
    createDonutChart('chart-pain-points', {
        labels: ['High Severity', 'Medium Severity', 'Low Severity'],
        data: [severityCounts.high, severityCounts.medium, severityCounts.low],
        colors: [CHART_COLORS.gray, CHART_COLORS.teal, CHART_COLORS.lime]
    });

    // User Confidence Line Chart
    createLineChart('chart-user-confidence', {
        labels: ['Start', '15 min', '30 min', '45 min', 'End'],
        datasets: [
            {
                label: 'CD Comparison Feature',
                data: [5.5, 6.2, 7.5, 8.0, 8.5],
                color: CHART_COLORS.lime
            },
            {
                label: 'Wire Deposit Feature',
                data: [7.0, 7.5, 8.2, 8.8, 9.0],
                color: CHART_COLORS.teal
            },
            {
                label: 'Inline Editing Feature',
                data: [6.0, 6.5, 7.0, 8.0, 8.5],
                color: CHART_COLORS.gray
            }
        ]
    });

    // Recommendations Donut Chart
    const recs = synthesisData.recommendations;
    const priorityCounts = {
        p0: recs.filter(r => r.priority === 'p0').length,
        p1: recs.filter(r => r.priority === 'p1').length,
        p2: recs.filter(r => r.priority === 'p2').length
    };
    
    createDonutChart('chart-recommendations', {
        labels: ['P0 - Critical', 'P1 - High', 'P2 - Medium'],
        data: [priorityCounts.p0, priorityCounts.p1, priorityCounts.p2],
        colors: [CHART_COLORS.gray, CHART_COLORS.teal, CHART_COLORS.lime]
    });
}

function createDonutChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: config.labels,
            datasets: [{
                data: config.data,
                backgroundColor: config.colors,
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    charts.push(chart);
}

function createHorizontalBarChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: config.labels,
            datasets: [{
                data: config.data,
                backgroundColor: config.colors,
                borderWidth: 0,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Frequency: ${context.parsed.x} mentions`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 13,
                            weight: '600'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    charts.push(chart);
}

function createLineChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const datasets = config.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color,
        backgroundColor: ds.color + '20',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: ds.color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: false
    }));

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: config.labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        usePointStyle: true,
                        pointStyle: 'line',
                        boxWidth: 40,
                        boxHeight: 3
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} mentions`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        stepSize: 2
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    charts.push(chart);
}

function setupNavigationControls() {
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const downloadBtn = document.getElementById('download-pdf');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => navigateSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateSlide(1));
    if (downloadBtn) downloadBtn.addEventListener('click', downloadPDF);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('#presentation.active')) {
            if (e.key === 'ArrowLeft') navigateSlide(-1);
            if (e.key === 'ArrowRight') navigateSlide(1);
            if (e.key === 'Escape') exitFullscreen();
        }
    });
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    currentSlide = index;
    updateCounter();
    updateNavigationButtons();
}

function navigateSlide(direction) {
    let newIndex = currentSlide + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= slides.length) newIndex = slides.length - 1;
    showSlide(newIndex);
}

function updateCounter() {
    const counter = document.getElementById('slide-counter');
    if (counter) {
        counter.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
}

function toggleFullscreen() {
    const slideshowContainer = document.getElementById('slideshow');
    if (!document.fullscreenElement) {
        slideshowContainer.requestFullscreen().catch(err => {
            console.error('Error entering fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function downloadPDF() {
    const downloadBtn = document.getElementById('download-pdf');
    downloadBtn.textContent = '⏳ Generating PDF...';
    downloadBtn.disabled = true;

    // Create a container with all slides visible
    const container = document.createElement('div');
    container.style.width = '1200px';
    container.style.background = 'white';
    
    slides.forEach((slide, index) => {
        const slideClone = slide.cloneNode(true);
        slideClone.style.display = 'block';
        slideClone.style.pageBreakAfter = 'always';
        slideClone.style.minHeight = '800px';
        slideClone.style.padding = '3rem';
        container.appendChild(slideClone);
    });

    document.body.appendChild(container);

    // Generate PDF
    const opt = {
        margin: 0,
        filename: 'User-Testing-Insights-Presentation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'landscape'
        }
    };

    html2pdf().set(opt).from(container).save().then(() => {
        document.body.removeChild(container);
        downloadBtn.textContent = '📥 Download PDF';
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error('PDF generation error:', err);
        document.body.removeChild(container);
        downloadBtn.textContent = '❌ Error - Try Again';
        downloadBtn.disabled = false;
    });
}
