# AI-Powered Research Analysis Setup

## Overview

This application now includes **AI-powered automatic analysis** of your research data using Claude 3.5 Sonnet. Upload your transcripts and evaluation files, click "Analyze & Generate Report", and the AI will automatically extract and structure:

- ✅ Executive Summary
- ✅ Key Findings
- ✅ Behavioral Patterns/Themes
- ✅ Pain Points
- ✅ Notable Quotes
- ✅ Recommendations

**Cost:** ~$0.20 per study analysis

---

## Setup Instructions

### 1. Get Your Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com)
2. Create an account (or sign in)
3. Navigate to API Keys
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-api03-...`)

### 2. Configure the Application

1. Copy `ai-config.template.js` to `ai-config.js`:
   ```bash
   cp ai-config.template.js ai-config.js
   ```

2. Open `ai-config.js` and replace `YOUR_ANTHROPIC_API_KEY_HERE` with your actual API key

3. Save the file

**Important:** `ai-config.js` is in `.gitignore` and will never be committed to git for security.

---

## How to Use

### 1. Upload Your Files

Go to **Admin → Build Study Report**:

- **Study Evaluation:** Upload your evaluation framework/questions PDF
- **Interview Transcripts:** Upload participant interview PDFs (multiple files supported)

The system automatically extracts text from PDFs.

### 2. Analyze with AI

Click the **"Analyze & Generate Report"** button.

The AI will:
- Read all extracted text from your files
- Identify patterns across participants
- Extract meaningful quotes
- Generate themes and findings
- Create actionable recommendations
- Structure everything into your report format

This takes **30-60 seconds** depending on file size.

### 3. Review Your Report

The system automatically navigates to the **Study Summary** section when complete.

All sections are populated:
- Study Summary
- Study Evaluation Details
- Key Findings
- Behavioral Patterns
- Pain Points
- Notable Quotes
- Recommendations

---

## Cost & Usage

### Pricing
- **Claude 3.5 Sonnet:** $3.00 per 1M input tokens, $15.00 per 1M output tokens
- **Typical Study:** ~40,000 input + 5,000 output tokens
- **Cost per Study:** ~$0.20

### Monthly Estimates
- 10 studies: **$2.00/month**
- 50 studies: **$10.00/month**
- 100 studies: **$20.00/month**

Very affordable for automating hours of manual synthesis work!

---

## Security Notes

### API Key Security

✅ **DO:**
- Keep `ai-config.js` private
- Never commit API keys to git
- Rotate keys periodically
- Use separate keys for dev/prod

❌ **DON'T:**
- Share your API key
- Commit `ai-config.js` to public repos
- Use the same key across multiple projects (optional but recommended)

### If Your Key is Compromised

1. Go to [Anthropic Console](https://console.anthropic.com)
2. Delete the compromised key
3. Create a new key
4. Update `ai-config.js` with the new key

---

## Troubleshooting

### "API Error: Invalid API Key"
- Check that your API key is correct in `ai-config.js`
- Make sure the key starts with `sk-ant-api03-`
- Verify the key hasn't been deleted in Anthropic Console

### "No text could be extracted"
- Ensure your PDFs contain actual text (not scanned images)
- Try re-uploading the files
- Check browser console for errors

### "Analysis failed"
- Check your internet connection
- Verify you have API credits remaining
- Check browser console for detailed error messages
- Try with smaller files first

### Files Not Loading
- Make sure PDF.js loaded (check browser console)
- Try hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
- Clear browser cache

---

## Technical Details

### Architecture

```
User uploads PDFs
    ↓
PDF.js extracts text automatically
    ↓
Text stored in localStorage
    ↓
User clicks "Analyze"
    ↓
ai-analyzer.js sends text to Claude API
    ↓
Claude analyzes and structures data
    ↓
Response parsed and saved to campaign
    ↓
Report auto-renders with structured data
```

### Files

- `ai-config.js` - Your API key (gitignored)
- `ai-config.template.js` - Template for setup
- `ai-analyzer.js` - Main AI integration logic
- `script.js` - Existing PDF extraction (already working)

### API Model

Using **Claude 3.5 Sonnet** (`claude-3-5-sonnet-20241022`):
- Best for qualitative research analysis
- Excellent at pattern recognition
- Strong contextual understanding
- Great at extracting meaningful quotes

---

## Support

For issues or questions:
1. Check browser console for errors
2. Review troubleshooting section above
3. Check Anthropic API status: https://status.anthropic.com

---

## Future Enhancements

Potential additions:
- Multiple AI provider support (OpenAI, Gemini)
- Custom analysis prompts
- Batch processing
- Progress tracking for large files
- Export/import of analyzed data
