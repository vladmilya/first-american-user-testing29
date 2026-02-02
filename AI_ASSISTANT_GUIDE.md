# AI Presentation Assistant - User Guide

## Overview
The AI Presentation Assistant is an intelligent chatbot that helps you build presentations from your study data using natural language. It can answer questions about your research, suggest slides, and automatically create custom presentations.

## Features

### 🤖 Natural Language Interaction
- Ask questions about your study data in plain English
- Get insights and analysis from the AI
- Conversational interface with context awareness

### 📊 Presentation Building
- Request specific slides to be added
- Ask AI to create complete presentations
- Intelligent section recommendations based on your needs

### 💡 Data Analysis
- Query themes, findings, and recommendations
- Get summaries and insights
- Discover patterns in your research data

### ⚙️ Multi-Provider Support
- **OpenAI (GPT-4, GPT-3.5)** - Recommended for best quality
- **Anthropic (Claude 3)** - Alternative AI provider
- **Local AI** - Coming soon

## Getting Started

### 1. Set Up Your API Key

First time users need to configure their AI provider:

1. Click the **purple chat button** in the bottom-right corner
2. Click the **Settings icon** (⚙️) in the chat header
3. Choose your **AI Provider**:
   - OpenAI (GPT-4) - Best quality, requires OpenAI API key
   - Anthropic (Claude) - Alternative, requires Anthropic API key
4. Enter your **API Key**
5. Select your preferred **Model**:
   - GPT-4 (best quality, slower)
   - GPT-3.5 Turbo (faster, good quality)
   - Claude 3 Opus/Sonnet
6. Click **Test Connection** to verify
7. Click **Save Settings**

**Where to get API keys:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/

**Important:** Your API key is stored locally in your browser and never sent to our servers. Only you have access to it.

### 2. Start Chatting

Once configured, you're ready to interact with the AI:

1. Click the purple chat button
2. Type your question or request
3. Press Enter or click the send button
4. The AI will respond and can take actions on your behalf

## Example Use Cases

### Basic Questions
```
"What were the key findings from this study?"
"How many participants were involved?"
"What are the top 3 pain points?"
"Show me the main themes"
```

### Adding Slides
```
"Add a slide showing key findings"
"Include the pain points section in my presentation"
"Add quotes from participants"
"Create a slide with the study summary"
```

### Creating Full Presentations
```
"Create a presentation with key findings and recommendations"
"Build a complete presentation covering all major insights"
"Make an executive summary presentation"
"Create a presentation focused on user pain points and solutions"
```

### Analysis Requests
```
"What patterns do you see in the data?"
"Summarize the main takeaways"
"What should be our top priorities?"
"Compare the severity of different pain points"
```

## AI Commands

The AI can execute special commands to modify your presentation:

### `[ADD_SLIDE:section-id]`
Adds a specific section to your presentation.

**Example:**
```
You: "Add a slide about pain points"
AI: "I'll add the pain points section to your presentation. [ADD_SLIDE:pain-points]"
```

### `[CREATE_PRESENTATION:section1,section2,...]`
Creates a complete presentation with multiple sections.

**Example:**
```
You: "Create a presentation with summary, findings, and recommendations"
AI: "I'll create that presentation for you. [CREATE_PRESENTATION:executive-summary,key-findings,recommendations]"
```

## Available Sections

The AI can add these sections to your presentation:

- **executive-summary** - Study Summary with key metrics
- **key-findings** - Top research findings
- **themes** - Behavioral patterns and themes
- **pain-points** - User pain points by severity
- **quotes** - Notable participant quotes
- **recommendations** - Prioritized recommendations
- **research-questions** - Study evaluation details

## Tips for Best Results

### 1. Be Specific
❌ "Make a presentation"
✅ "Create a presentation with key findings, top 3 pain points, and P0 recommendations"

### 2. Ask Follow-up Questions
The AI remembers your conversation context:
```
You: "What were the main findings?"
AI: [Provides findings]
You: "Add those to my presentation"
AI: [Adds findings slide]
```

### 3. Request Explanations
```
"Why is this recommendation a P0?"
"What themes are most common?"
"Explain the relationship between these findings"
```

### 4. Iterate and Refine
```
"Add more sections about user experience"
"Focus on the most critical issues"
"Include data visualization slides"
```

## Chat Features

### Suggested Prompts
When you first open the chat, you'll see suggested prompts:
- 📊 Create presentation with key findings
- 🎯 Add top pain points slide
- 💡 Show main themes
- 📋 Create executive summary

Click any suggestion to use it instantly.

### Message History
- Chat history is saved automatically
- Persists across page reloads
- Clear history anytime with the trash icon

### Typing Indicator
The AI shows a typing animation while processing your request.

### Timestamps
Each message shows when it was sent for easy reference.

## Settings & Customization

### API Provider
Switch between OpenAI and Anthropic based on your preference and available credits.

### Model Selection
- **GPT-4**: Best quality, more expensive, slower
- **GPT-3.5 Turbo**: Faster, less expensive, good quality
- **Claude 3 Opus**: High quality, alternative to GPT-4
- **Claude 3 Sonnet**: Balanced speed and quality

### Security
- API keys stored locally only
- Never transmitted to our servers
- You can clear at any time

## Troubleshooting

### "Please set your API key in settings"
- You need to configure your API key first
- Click settings (⚙️) and enter your key
- Test the connection before saving

### "Connection failed"
- Check your API key is correct
- Verify you have credits/quota available
- Try testing the connection in settings
- Check your internet connection

### "API request failed"
- You may have exceeded your API quota
- Check your API provider's dashboard
- Try switching to a different model
- Verify your API key hasn't expired

### AI not understanding requests
- Be more specific about what you want
- Reference section names explicitly
- Break complex requests into smaller parts
- Try rephrasing your question

### Slides not being added
- Check the presentation builder (blue button)
- Verify you have study data loaded
- Look for success notifications
- The AI will tell you when slides are added

## Privacy & Security

### What Data is Sent to AI?
When you chat with the AI, it receives:
- Your message/question
- Summary of your study data (metadata, themes, findings, etc.)
- Recent chat history (last 10 messages for context)

### What's NOT Sent?
- Your actual transcript files
- Participant personal information
- Raw audio/video data
- Your API keys (stored locally only)

### Data Retention
- Chat history stored in your browser only
- No data sent to our servers
- Clear chat anytime with one click
- API providers may log requests (check their policies)

## Advanced Usage

### Combining Manual and AI Building
You can use both methods together:
1. Use AI to create initial presentation structure
2. Open Presentation Builder to manually add/remove sections
3. Ask AI to analyze and suggest improvements
4. Use Presentation Builder to fine-tune order

### Context-Aware Conversations
The AI remembers your conversation:
```
You: "Show me the high severity pain points"
AI: [Lists them]
You: "Add these to my presentation"
AI: [Adds pain-points slide]
You: "What are the recommendations for the first one?"
AI: [Provides relevant recommendations]
```

### Data-Driven Insights
Ask the AI to analyze your data:
```
"What's the most frequently mentioned theme?"
"Which pain points affect the most users?"
"What's the priority distribution of recommendations?"
"How confident were users with each feature?"
```

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line in message
- **Esc** - Close chat panel (when focused)

## Cost Considerations

### OpenAI Pricing (approximate)
- GPT-4: ~$0.03 per message
- GPT-3.5 Turbo: ~$0.002 per message

### Anthropic Pricing (approximate)
- Claude 3 Opus: ~$0.015 per message
- Claude 3 Sonnet: ~$0.003 per message

**Tip:** Use GPT-3.5 or Claude Sonnet for general questions, switch to GPT-4 or Opus for complex analysis.

## Best Practices

1. **Start with data review**: Ask the AI to summarize your study first
2. **Build incrementally**: Add slides one at a time to see results
3. **Use specific section names**: Refer to "key findings" not just "findings"
4. **Review AI suggestions**: The AI is helpful but review its recommendations
5. **Save API costs**: Use suggested prompts when possible
6. **Clear chat periodically**: Fresh context can help with unrelated topics

## Future Enhancements

Coming soon:
- Local AI support (no API key required)
- Voice input for questions
- Slide content customization via chat
- Export chat history
- Presentation templates library
- Multi-language support

## Support

If you encounter issues:
1. Check this guide first
2. Test your API connection in settings
3. Try clearing chat history and starting fresh
4. Switch to a different AI provider/model
5. Check the browser console for error messages

## Credits

- AI powered by OpenAI GPT-4 / Anthropic Claude
- Secure local storage for privacy
- No third-party data sharing

---

**Note:** The AI Assistant is a tool to help you work faster. Always review AI-generated content for accuracy and relevance to your specific needs.
