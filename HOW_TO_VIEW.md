# 👀 How to View This Report

## Quick Start (3 Steps)

### **Step 1: Unzip the file**
Extract this folder to any location on your computer

### **Step 2: Open Terminal/Command Prompt**

**Mac/Linux:**
- Right-click the folder → "New Terminal at Folder"
- OR open Terminal and type: `cd /path/to/this/folder`

**Windows:**
- Open Command Prompt or PowerShell
- Navigate to the folder: `cd C:\path\to\this\folder`

### **Step 3: Start the server**

**Mac/Linux:**
```bash
python3 -m http.server 8080
```

**Windows:**
```bash
python -m http.server 8080
```

### **Step 4: Open in browser**
Visit: **http://localhost:8080**

---

## 🎯 What You'll See

An interactive user testing synthesis report with:

- **Executive Summary** - 6 participant profiles (click to expand)
- **Key Findings** - 8 major insights from testing
- **Behavioral Patterns** - 12 themes with frequency and examples
- **User Pain Points** - 12 identified issues with severity
- **Notable Quotes** - 10 impactful participant quotes
- **Recommendations** - 9 actionable improvements
- **Research Questions** - All 57 questions with synthesized answers
- **Presentation Mode** - Slideshow format with downloadable PDF

---

## 🚫 Troubleshooting

### "Command not found: python3"
Try: `python -m http.server 8080` (without the "3")

### "Port 8080 already in use"
Try a different port: `python3 -m http.server 8081`
Then open: http://localhost:8081

### "Blank page" or "File not loading"
Make sure you're in the correct folder when running the command.
You should see `index.html` in the folder.

### Still having issues?
Open `index.html` directly in Chrome or Firefox (may have limited functionality)

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the Terminal window

---

## 📧 Questions?

Contact the report creator for assistance.
