# User Testing Synthesis Tool

A comprehensive web application for analyzing user research data and creating professional presentations with AI assistance.

## 🌟 Features

### 🆕 1. 🤝 Real-Time Collaboration (NEW!)
- **Multi-user Note Taker**: Up to 3 people can collaborate simultaneously
- **Live sync**: See changes within 1-2 seconds
- **Presence tracking**: Know who's online
- **Shareable links**: Simple link sharing with teammates
- **FREE forever**: Using Supabase (no credit card)
- **Optional**: Works offline too (localStorage fallback)
- **Setup**: 15 minutes ([Quick Start](COLLABORATION_QUICK_START.md))

### 2. 📋 Note Taker
- Sticky note board for each interview
- Color coding (yellow, green, red)
- Topic tagging for organization
- Multi-select and bulk operations
- Export notes to study report
- **Real-time collaboration** (with Supabase)
- Zoom and pan controls
- Board per participant

### 3. 📊 Presentation Builder
- Centralized section selection from within the builder
- Add any section using dropdown menu
- Drag-free slide reordering with arrow controls
- Enable/disable slides without deleting
- Automatic page numbering
- Custom slide arrangements
- PDF export support
- Persistent storage (survives page reloads)

### 4. 🤖 AI Chat Assistant
- Natural language interaction with your data
- Automatic presentation building via chat
- Data analysis and insights
- Question answering about your study
- Multi-provider support (OpenAI, Anthropic)
- Context-aware conversations
- Secure local API key storage

### 5. 📈 Data Analysis
- Study summary dashboard
- Key findings extraction
- Behavioral patterns identification
- Pain points categorization
- Notable quotes collection
- Prioritized recommendations
- Comprehensive study evaluation

### 6. 🎨 Professional Presentations
- Multiple slide templates
- Data visualization charts
- Responsive design
- Fullscreen presentation mode
- Keyboard navigation
- PDF export
- Custom branding options

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- For AI features: OpenAI or Anthropic API key

### Installation

1. **Clone or download this repository**
   ```bash
   cd /Users/vmilyavsky/Documents/Projects/user-testing-synthesis
   ```

2. **Open the application**
   - Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit: http://localhost:8000
     ```

3. **Load your data**
   - Navigate to "Build Study Report" section
   - Upload interview transcripts
   - Upload study evaluation document
   - Click "Analyze & Generate Report"

### Quick Start

1. **Load Sample Data**: Sample data loads automatically for demo purposes
2. **Explore Sections**: Navigate through different research sections
3. **Build Presentation**: 
   - Click "Add to Presentation" on any section
   - Or use AI chat to build presentations
4. **View & Export**: Open Presentation Builder and click "View Presentation"

## 📖 Documentation

### Main Guides
- **[Presentation Builder Guide](./PRESENTATION_BUILDER_GUIDE.md)** - Learn how to build custom presentations manually
- **[AI Assistant Guide](./AI_ASSISTANT_GUIDE.md)** - Complete guide to using the AI chatbot

### Quick Reference

#### Collaboration (Note Taker)
- **Setup**: See [COLLABORATION_QUICK_START.md](COLLABORATION_QUICK_START.md)
- **Enable**: Configure `supabase-config.js` with your Supabase keys
- **Share**: Click "Share" button in Note Taker
- **Status**: Check collaboration indicator (top-right)
- **Users**: Up to 3 people recommended

#### Presentation Builder
- **Location**: Navigate to "Presentation" in the left sidebar
- **Add Slides**: Open builder and select sections from dropdown menu
- **Manage**: Click "Open Builder" button on Presentation page
- **Reorder**: Use ↑↓ arrows in builder
- **View**: Click "View Presentation" button

#### AI Chat Assistant  
- **Location**: Purple button (bottom-right, above blue button)
- **Setup**: Click settings icon, enter API key
- **Usage**: Type natural language requests
- **Examples**: 
  - "Create a presentation with key findings"
  - "Add pain points slide"
  - "What are the main themes?"

## 🎯 Common Use Cases

### 1. Executive Summary Presentation
```
AI: "Create an executive summary presentation"
```
Or manually:
1. Open Presentation Builder
2. Select and add: Study Summary, Key Findings, Top Recommendations
3. Click "View Presentation"

### 2. Detailed Analysis
```
AI: "Build a complete presentation with all insights"
```
Or manually add all sections in order

### 3. Focused Review
```
AI: "Create presentation with pain points and recommendations"
```
Or add specific problem-focused sections

### 4. Stakeholder Update
```
AI: "Make a presentation showing progress and next steps"
```
Or select relevant progress indicators

## 🛠️ Technical Details

### Architecture
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser localStorage
- **AI Integration**: OpenAI API, Anthropic API
- **Charts**: Chart.js
- **PDF Export**: html2pdf.js
- **PDF Parsing**: PDF.js

### File Structure
```
user-testing-synthesis/
├── index.html                      # Main application
├── styles.css                      # Global styles
├── script.js                       # Core functionality
├── presentation.js                 # Presentation slideshow
├── presentation-builder.js         # Custom presentation builder
├── ai-chat-assistant.js           # AI chatbot
├── synthesis-data.js              # Sample data
├── file-upload.js                 # File processing
├── README.md                      # This file
├── PRESENTATION_BUILDER_GUIDE.md  # Builder documentation
└── AI_ASSISTANT_GUIDE.md          # AI documentation
```

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Storage
- **localStorage**: Used for:
  - Presentation configuration
  - AI chat history
  - API keys (encrypted)
  - User preferences
- **No backend required**: Everything runs in your browser
- **Privacy**: Your data never leaves your device

## 🔒 Privacy & Security

### Data Storage
- All data stored locally in your browser
- No cloud storage or external servers
- Clear data anytime from browser settings

### API Keys
- Stored locally only
- Never transmitted except to chosen AI provider
- Encrypted in localStorage
- Can be cleared anytime

### What's Shared with AI?
- Your messages/questions
- Study metadata and summaries
- Recent conversation context

### What's NOT Shared?
- Raw transcript files
- Participant personal information
- Your API keys
- Full dataset

## 🎨 Customization

### Branding
Edit `styles.css` to customize:
- Color scheme (`:root` variables)
- Fonts
- Spacing
- Component styles

### Slide Templates
Edit `presentation.js` to:
- Modify slide layouts
- Add custom slide types
- Change chart styles
- Adjust animations

### AI Behavior
Edit `ai-chat-assistant.js` to:
- Modify system prompts
- Add custom commands
- Change AI personality
- Add new providers

## 📊 Features in Detail

### Presentation Builder
- **Drag-free reordering**: Use arrow buttons for precise control
- **Enable/disable**: Toggle visibility without removing slides
- **Auto page numbers**: Updates automatically on reorder
- **Persistent state**: Configuration saved automatically
- **Visual feedback**: See changes in real-time
- **Bulk operations**: Clear all, add multiple at once

### AI Assistant
- **Multi-turn conversations**: Maintains context
- **Command execution**: Can modify presentations
- **Data analysis**: Provides insights from your data
- **Flexible queries**: Natural language understanding
- **Provider choice**: OpenAI or Anthropic
- **Cost efficient**: Choose model based on needs

### Data Sections
- **Study Summary**: Overview with key metrics
- **Key Findings**: Most important discoveries
- **Behavioral Patterns**: Themes and trends
- **Pain Points**: Issues by severity
- **Notable Quotes**: Direct participant feedback
- **Recommendations**: Prioritized action items
- **Study Evaluation**: Detailed question responses

## 🐛 Troubleshooting

### Presentation not updating
- Refresh the page
- Clear browser cache
- Check browser console for errors
- Verify localStorage isn't full

### AI not responding
- Check API key in settings
- Test connection
- Verify internet connection
- Check API provider status
- Review API quota/billing

### Slides missing
- Ensure sections are enabled in builder
- Check if data is loaded
- Refresh and try again
- Clear localStorage and reload

### PDF export issues
- Ensure all slides loaded
- Try reducing number of slides
- Check browser console
- Use different browser

## 💡 Tips & Tricks

1. **Use keyboard shortcuts** in presentation mode (←→ for navigation)
2. **Try AI suggestions** for common requests
3. **Save presentations** by bookmarking or exporting PDF
4. **Test with sample data** before loading real data
5. **Use GPT-3.5** for simple questions to save costs
6. **Combine manual and AI** for best control
7. **Clear chat history** for fresh AI context
8. **Export frequently** to avoid losing work

## 🔄 Updates & Roadmap

### Current Version: 2.0
- ✅ Custom presentation builder
- ✅ AI chat assistant
- ✅ Multi-provider AI support
- ✅ Persistent storage
- ✅ PDF export

### Coming Soon
- 📱 Mobile-optimized interface
- 🎤 Voice input for AI
- 🌍 Multi-language support
- 💾 Cloud sync (optional)
- 🎨 More slide templates
- 🤖 Local AI support (no API key)
- 📤 PowerPoint export
- 🔗 Shareable presentation links

## 🤝 Contributing

This is a personal project, but suggestions are welcome:
1. Document issues you encounter
2. Suggest new features
3. Share use cases
4. Report bugs

## 📝 License

Private use only. Do not distribute without permission.

## 🙏 Credits

### Libraries & Tools
- Chart.js for data visualization
- html2pdf.js for PDF generation
- PDF.js for PDF parsing
- OpenAI for GPT models
- Anthropic for Claude models

### Icons
- Heroicons for UI icons
- Custom SVG icons for sections

## 📞 Support

For issues or questions:
1. Check the documentation guides
2. Review troubleshooting section
3. Check browser console for errors
4. Try with sample data first

## 🎓 Learning Resources

### Understanding the Code
- `script.js` - Main application logic
- `presentation-builder.js` - Presentation customization
- `ai-chat-assistant.js` - AI integration
- Read inline comments for details

### Extending Features
1. Study existing code patterns
2. Use browser DevTools for debugging
3. Test changes with sample data
4. Document your modifications

---

**Version**: 2.0  
**Last Updated**: January 2026  
**Author**: Internal Tool  
**Status**: Production Ready

## Quick Links
- 📘 [Presentation Builder Guide](./PRESENTATION_BUILDER_GUIDE.md)
- 🤖 [AI Assistant Guide](./AI_ASSISTANT_GUIDE.md)
- 🔧 [Troubleshooting](#-troubleshooting)
- 💡 [Tips & Tricks](#-tips--tricks)
