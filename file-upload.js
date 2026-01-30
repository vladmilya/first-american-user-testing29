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

// Handle research questions file upload
async function handleQuestionsUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusElement = document.getElementById('questions-status');
    statusElement.textContent = `Loading ${file.name}...`;
    statusElement.className = 'upload-status';

    try {
        const text = await extractTextFromFile(file);
        document.getElementById('questions-input').value = text;
        statusElement.textContent = `✓ Loaded ${file.name} successfully!`;
        statusElement.className = 'upload-status success';
    } catch (error) {
        console.error('Error loading questions file:', error);
        statusElement.textContent = `✗ Error loading file: ${error.message}`;
        statusElement.className = 'upload-status error';
    }
}

// Handle transcript files upload (multiple files supported)
async function handleTranscriptUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const statusElement = document.getElementById('transcript-status');
    statusElement.textContent = `Loading ${files.length} file(s)...`;
    statusElement.className = 'upload-status';

    try {
        const allText = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            statusElement.textContent = `Loading ${i + 1}/${files.length}: ${file.name}...`;
            
            const text = await extractTextFromFile(file);
            allText.push(`\n\n=== ${file.name} ===\n\n${text}`);
        }

        const combinedText = allText.join('\n\n');
        document.getElementById('transcript-input').value = combinedText;
        
        statusElement.textContent = `✓ Loaded ${files.length} file(s) successfully!`;
        statusElement.className = 'upload-status success';
    } catch (error) {
        console.error('Error loading transcript files:', error);
        statusElement.textContent = `✗ Error loading files: ${error.message}`;
        statusElement.className = 'upload-status error';
    }
}

// Extract text from various file types
async function extractTextFromFile(file) {
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.pdf')) {
        return await extractTextFromPDF(file);
    } else if (fileName.endsWith('.txt')) {
        return await extractTextFromTXT(file);
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        // DOC/DOCX parsing is complex in browser
        // For now, instruct user to convert or use a simple approach
        throw new Error('DOC/DOCX files not yet supported. Please convert to PDF or TXT, or paste the text directly.');
    } else {
        // Try to read as text anyway
        return await extractTextFromTXT(file);
    }
}

// Extract text from PDF using PDF.js
async function extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.onload = async function() {
            try {
                // PDF.js requires Uint8Array
                const typedArray = new Uint8Array(this.result);
                
                // Load PDF document
                const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                
                let fullText = '';
                
                // Extract text from each page
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n\n';
                }
                
                resolve(fullText);
            } catch (error) {
                reject(new Error('Failed to parse PDF: ' + error.message));
            }
        };
        
        fileReader.onerror = function() {
            reject(new Error('Failed to read PDF file'));
        };
        
        fileReader.readAsArrayBuffer(file);
    });
}

// Extract text from TXT file
async function extractTextFromTXT(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.onload = function() {
            resolve(this.result);
        };
        
        fileReader.onerror = function() {
            reject(new Error('Failed to read text file'));
        };
        
        fileReader.readAsText(file);
    });
}

// Configure PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}
