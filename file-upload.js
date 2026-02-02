// File Upload Handler for User Testing Synthesis Tool

// Initialize file upload handlers
document.addEventListener('DOMContentLoaded', () => {
    initializeFileUploads();
});

function initializeFileUploads() {
    // Questions file upload
    const questionsFile = document.getElementById('questions-file');
    if (questionsFile) {
        questionsFile.addEventListener('change', handleQuestionsUpload);
    }

    // Transcript files upload
    const transcriptFiles = document.getElementById('transcript-files');
    if (transcriptFiles) {
        transcriptFiles.addEventListener('change', handleTranscriptUpload);
    }
}

// Handle research questions/participant files upload (multiple files supported)
async function handleQuestionsUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const statusElement = document.getElementById('questions-status');
    statusElement.innerHTML = `<span style="color: var(--primary);">Loading ${files.length} file(s)...</span>`;
    statusElement.className = 'upload-status';

    let uploadedCount = 0;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        statusElement.innerHTML = `<span style="color: var(--primary);">Processing ${i + 1}/${files.length}: ${file.name}...</span>`;
        
        try {
            // Read file as base64
            const fileData = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsDataURL(file);
            });
            
            // Add to campaign
            if (typeof addFileToCampaign === 'function') {
                const success = await addFileToCampaign('questions', file.name, fileData);
                if (success !== false) {
                    uploadedCount++;
                }
            }
            
            // Update file list after each file
            if (typeof updateBuildReportFileLists === 'function') {
                updateBuildReportFileLists();
            }
        } catch (err) {
            console.error('Error processing file:', file.name, err);
        }
    }
    
    statusElement.innerHTML = `<span style="color: var(--success);">✓ ${uploadedCount} file(s) uploaded</span>`;
    statusElement.className = 'upload-status success';
}

// Handle transcript files upload (multiple files supported)
async function handleTranscriptUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const statusElement = document.getElementById('transcript-status');
    statusElement.textContent = `Loading ${files.length} file(s)...`;
    statusElement.className = 'upload-status';

    try {
        let uploadedCount = 0;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            statusElement.textContent = `Loading ${i + 1}/${files.length}: ${file.name}...`;
            
            // Read each file and save to campaign
            await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async function(e) {
                    if (typeof addFileToCampaign === 'function') {
                        await addFileToCampaign('transcripts', file.name, e.target.result);
                    }
                    uploadedCount++;
                    resolve();
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        
        statusElement.innerHTML = `<span style="color: var(--success);">✓ ${uploadedCount} file(s) uploaded</span>`;
        statusElement.className = 'upload-status success';
        
        // Update the file list display
        if (typeof updateBuildReportFileLists === 'function') {
            updateBuildReportFileLists();
        }
    } catch (error) {
        console.error('Error loading transcript files:', error);
        statusElement.textContent = `✗ Error loading files: ${error.message}`;
        statusElement.className = 'upload-status error';
    }
}

// Note: PDF text extraction is handled in script.js via addFileToCampaign

// PDF.js configuration is handled in index.html
