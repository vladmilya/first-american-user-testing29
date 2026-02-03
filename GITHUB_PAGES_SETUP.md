# GitHub Pages Setup - One-Time Configuration

## ✅ All Code is Now on GitHub!

Your AI-powered analysis feature is fully deployed to GitHub. However, for security reasons, the API key is NOT in the code (stored locally in your browser instead).

---

## 🔧 One-Time Setup (Takes 2 minutes)

### After deploying to GitHub Pages:

1. **Open your deployed site:** `https://vladmilya.github.io/first-american-user-testing29/`

2. **Navigate to:** Admin → AI Analysis Settings

3. **Paste your API key:**
   - Get from: https://console.anthropic.com
   - Format: `sk-ant-api03-...`

4. **Click "Save API Key"**

5. **Click "Test Connection"** to verify it works

6. **Done!** AI analysis now works on GitHub Pages ✅

---

## 🔒 Security Notes

- ✅ Your API key is stored in **your browser only** (localStorage)
- ✅ Key is **never sent to GitHub**
- ✅ Safe for public repos
- ✅ Each user sets their own key
- ✅ Password protection still active on your site

---

## 👥 For Other Users

If other people need to use the site:
1. They go to Admin → AI Analysis Settings
2. They enter their own Claude API key
3. Key is stored in their browser only

Each user manages their own key.

---

## 🔄 Key Rotation (Recommended)

**Since your key was shared in our chat, you should rotate it:**

1. Go to: https://console.anthropic.com
2. Delete the current key
3. Create a new key
4. Update in Admin → AI Analysis Settings

---

## 🚀 Testing the Feature

1. **Upload files** (Admin → Build Study Report)
   - Study Evaluation PDF
   - Participant Transcripts PDFs

2. **Click "Analyze & Generate Report"**

3. **Wait 30-60 seconds** while AI processes

4. **Review your report** - all sections auto-populated!

---

## 💰 Cost Tracking

- Each analysis: ~$0.20
- Monitor at: https://console.anthropic.com/settings/usage

---

## 🆘 Troubleshooting

### "AI Not Configured"
- Go to Admin → AI Analysis Settings
- Enter and save your API key

### "API Error: Invalid Key"
- Check key is correct in settings
- Verify key hasn't been deleted in Anthropic Console
- Try rotating the key

### Still Not Working?
- Check browser console for errors
- Try hard refresh (Cmd+Shift+R)
- Clear browser cache

---

## ✨ That's It!

The AI feature now works securely on your public GitHub Pages site!
