/**
 * GitHub Milestone and Issues Display
 * Fetches milestone data and associated issues from GitHub API
 * and displays them on release announcement pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const GITHUB_REPO = 'faraaz-bot/ROCm';
    const GITHUB_API_BASE = 'https://api.github.com';
    
    // Get milestone name from page title or data attribute
    const milestoneContainer = document.getElementById('github-milestone-tracker');
    if (!milestoneContainer) return;
    
    const milestoneName = milestoneContainer.dataset.milestone;
    if (!milestoneName) return;
    
    // Fetch milestone data
    fetchMilestoneData(milestoneName);
    
    async function fetchMilestoneData(milestoneName) {
        try {
            // Show loading state
            milestoneContainer.innerHTML = '<div class="milestone-loading">Loading milestone data...</div>';
            
            // Fetch all milestones
            const milestonesResponse = await fetch(
                `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/milestones?state=all&per_page=100`
            );
            
            if (!milestonesResponse.ok) {
                throw new Error('Failed to fetch milestones');
            }
            
            const milestones = await milestonesResponse.json();
            const milestone = milestones.find(m => m.title === milestoneName);
            
            if (!milestone) {
                milestoneContainer.innerHTML = `
                    <div class="milestone-not-found">
                        <p>Milestone "${milestoneName}" not found. <a href="https://github.com/${GITHUB_REPO}/milestones" target="_blank">View all milestones →</a></p>
                    </div>
                `;
                return;
            }
            
            // Fetch issues for this milestone
            const issuesResponse = await fetch(
                `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/issues?milestone=${milestone.number}&state=all&per_page=100`
            );
            
            if (!issuesResponse.ok) {
                throw new Error('Failed to fetch issues');
            }
            
            const issues = await issuesResponse.json();
            
            // Render milestone and issues
            renderMilestone(milestone, issues);
            
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            milestoneContainer.innerHTML = `
                <div class="milestone-error">
                    <p>Unable to load milestone data. <a href="https://github.com/${GITHUB_REPO}/milestones" target="_blank">View on GitHub →</a></p>
                </div>
            `;
        }
    }
    
    function renderMilestone(milestone, issues) {
        const openIssues = issues.filter(i => i.state === 'open' && !i.pull_request);
        const closedIssues = issues.filter(i => i.state === 'closed' && !i.pull_request);
        const totalIssues = openIssues.length + closedIssues.length;
        const progress = totalIssues > 0 ? Math.round((closedIssues.length / totalIssues) * 100) : 0;
        
        // Get pinned/important issues (issues with specific labels or first few)
        const pinnedIssues = issues
            .filter(i => !i.pull_request)
            .filter(i => i.labels.some(l => l.name.toLowerCase().includes('important') || 
                                           l.name.toLowerCase().includes('pinned') ||
                                           l.name.toLowerCase().includes('feature')))
            .slice(0, 5);
        
        // If no labeled issues, show first 5 open issues
        const displayIssues = pinnedIssues.length > 0 ? pinnedIssues : openIssues.slice(0, 5);
        
        const html = `
            <div class="github-milestone-tracker">
                <div class="milestone-header">
                    <h3>
                        <a href="${milestone.html_url}" target="_blank" rel="noopener noreferrer">
                            ${milestone.title}
                        </a>
                    </h3>
                    ${milestone.description ? `<p class="milestone-description">${milestone.description}</p>` : ''}
                </div>
                
                <div class="milestone-progress">
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-stats">
                        <span class="stat-item">
                            <span class="stat-value">${progress}%</span> complete
                        </span>
                        <span class="stat-item">
                            <span class="stat-value">${closedIssues.length}</span> closed
                        </span>
                        <span class="stat-item">
                            <span class="stat-value">${openIssues.length}</span> open
                        </span>
                    </div>
                </div>
                
                ${displayIssues.length > 0 ? `
                    <div class="milestone-issues">
                        <h4>Key Issues</h4>
                        <ul class="issue-list">
                            ${displayIssues.map(issue => `
                                <li class="issue-item ${issue.state}">
                                    <span class="issue-state ${issue.state}">${issue.state === 'open' ? '🔵' : '✅'}</span>
                                    <a href="${issue.html_url}" target="_blank" rel="noopener noreferrer" class="issue-title">
                                        #${issue.number} ${issue.title}
                                    </a>
                                    ${issue.labels.length > 0 ? `
                                        <span class="issue-labels">
                                            ${issue.labels.slice(0, 3).map(label => `
                                                <span class="issue-label" style="background-color: #${label.color}">
                                                    ${label.name}
                                                </span>
                                            `).join('')}
                                        </span>
                                    ` : ''}
                                </li>
                            `).join('')}
                        </ul>
                        <a href="https://github.com/${GITHUB_REPO}/issues?q=milestone%3A%22${encodeURIComponent(milestone.title)}%22" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="view-all-link">
                            View all ${totalIssues} issues →
                        </a>
                    </div>
                ` : ''}
                
                ${milestone.due_on ? `
                    <div class="milestone-due-date">
                        <strong>Due:</strong> ${new Date(milestone.due_on).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                ` : ''}
            </div>
        `;
        
        milestoneContainer.innerHTML = html;
    }
});
