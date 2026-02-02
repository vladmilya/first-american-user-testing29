// Auto-populate first campaign with original research files
// This script runs automatically when the page loads

(function() {
    'use strict';
    
    // Check if we need to populate files
    function shouldPopulateFiles() {
        const campaigns = JSON.parse(localStorage.getItem('uxd_campaigns') || '[]');
        if (campaigns.length === 0) return false;
        
        const firstCampaign = campaigns.find(c => c.name === 'ISS Iterative Testing 4.1');
        if (!firstCampaign) return false;
        
        // Check if files already exist
        const files = firstCampaign.files || { questions: [], transcripts: [], videos: [], presentations: [] };
        const totalFiles = (files.questions?.length || 0) + 
                          (files.transcripts?.length || 0) + 
                          (files.videos?.length || 0) + 
                          (files.presentations?.length || 0);
        
        return totalFiles === 0; // Only populate if no files exist
    }
    
    // Load campaign files from external JSON
    async function loadCampaignFiles() {
        try {
            const response = await fetch('./campaign-files-data.json');
            if (!response.ok) {
                console.log('Campaign files data not found, skipping auto-population');
                return null;
            }
            return await response.json();
        } catch (error) {
            console.log('Could not load campaign files:', error.message);
            return null;
        }
    }
    
    // Populate files into the first campaign
    async function populateFirstCampaign() {
        if (!shouldPopulateFiles()) {
            console.log('Campaign files already exist, skipping auto-population');
            return;
        }
        
        console.log('Loading original research files into campaign...');
        const campaignFiles = await loadCampaignFiles();
        
        if (!campaignFiles) {
            console.log('No campaign files data available');
            return;
        }
        
        // Update campaign with files
        const campaigns = JSON.parse(localStorage.getItem('uxd_campaigns') || '[]');
        const firstCampaign = campaigns.find(c => c.name === 'ISS Iterative Testing 4.1');
        
        if (firstCampaign) {
            firstCampaign.files = campaignFiles;
            localStorage.setItem('uxd_campaigns', JSON.stringify(campaigns));
            
            console.log('✅ Successfully populated campaign with files:');
            console.log(`   - Questions: ${campaignFiles.questions.length}`);
            console.log(`   - Transcripts: ${campaignFiles.transcripts.length}`);
            console.log(`   - Videos: ${campaignFiles.videos.length}`);
            console.log(`   - Presentations: ${campaignFiles.presentations.length}`);
            
            // Trigger UI update if the function exists
            if (typeof updateCurrentCampaignDisplay === 'function') {
                updateCurrentCampaignDisplay();
            }
            if (typeof renderCampaignsList === 'function') {
                renderCampaignsList();
            }
        }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', populateFirstCampaign);
    } else {
        populateFirstCampaign();
    }
})();
