# Campaign Files Auto-Population

## What This Does

The first campaign ("ISS Iterative Testing 4.1") is automatically populated with the original research files you provided:

### Files Included:
- **1 Research Questions file:** `Questions.pdf`
- **6 Transcript files:** `User1.pdf` through `User 6.pdf`
- **1 Presentation/Notes file:** `P4.1_Formal Notes.pdf`

**Total: 8 files**

## How It Works

1. **Automatic Detection:** When you load the page, the system checks if the first campaign has any files
2. **One-Time Population:** If no files exist, it automatically loads the original research files
3. **No Duplication:** If files already exist, it skips the auto-population
4. **Instant Display:** Files appear immediately in the Current Campaign card

## Files Generated

- `campaign-files-data.json` - Contains all 8 PDFs encoded in base64 format (~1.9MB)
- `auto-populate-files.js` - Script that runs on page load to populate files
- `populate-campaign-files.js` - Helper script used to generate the data (not deployed)

## For Future Campaigns

For any new campaigns you create:
- ✅ Upload files through the web interface (Build Study Report page)
- ✅ Files will be automatically saved to the active campaign
- ✅ No manual setup needed

## Viewing the Files

After the page loads and files are populated:
1. Go to **UXD Admin**
2. See **"📎 Uploaded Files (8)"** in the Current Campaign card
3. Click any file icon to preview
4. Download files if needed

## Technical Notes

- Files are stored in browser's localStorage
- Base64 encoding allows full file preview
- First-time load may take a moment to process
- Subsequent loads are instant (files already in localStorage)
