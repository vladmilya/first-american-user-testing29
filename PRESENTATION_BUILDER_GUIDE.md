# Presentation Builder - User Guide

## Overview
The Presentation Builder allows you to create custom presentations by selecting sections from your study data within a centralized builder interface. Arrange slides in your preferred order and control which ones are included.

## Features

### 1. Centralized Section Selection
- Open the Presentation Builder to access all available sections
- Use the dropdown menu to select sections you want to add
- Click "Add Section" to add it to your presentation
- Sections can only be added once (prevents duplicates)

### 2. Accessing the Builder
- **Location**: Navigate to "Presentation" in the left sidebar
- **Open Builder**: Click the "Open Builder" button on the Presentation page
- **Alternative**: Use the "Open Presentation Builder" button in the banner

### 3. Presentation Builder Panel
The builder panel allows you to:
- **Add Sections**: Use the dropdown at the top to select and add sections
- **Reorder Slides**: Use ↑ ↓ arrows to move slides up or down
- **Enable/Disable Slides**: Toggle visibility with the eye icon (hides from presentation without deleting)
- **Remove Slides**: Delete slides permanently with the trash icon
- **Clear All**: Remove all slides at once
- **View Presentation**: Generate and view your custom presentation

### 4. Automatic Page Numbering
- Slides are automatically numbered based on their order
- Page numbers update automatically when you reorder slides

## How to Use

### Basic Workflow
1. Navigate to **"Presentation"** in the left sidebar
2. Click **"Open Builder"** button or **"Open Presentation Builder"** in the banner
3. In the builder panel, **select a section** from the dropdown menu
4. Click **"Add Section"** to add it to your presentation
5. **Repeat** to add more sections
6. **Arrange slides** using the up/down arrows
7. Click **"View Presentation"** to see your custom slideshow

### Managing Slides

**To add slides:**
- Open the builder
- Select a section from the dropdown
- Click "Add Section"

**To reorder slides:**
- Use the up ↑ and down ↓ arrow buttons in the builder

**To temporarily hide a slide:**
- Click the eye icon (keeps it in the list but won't show in presentation)

**To remove a slide permanently:**
- Click the trash icon (🗑️)

**To clear all slides:**
- Click "Clear All" button at the bottom of the builder

### Viewing Your Presentation
1. Click "View Presentation" in the builder panel
2. Use arrow keys (← →) or navigation buttons to move between slides
3. Press **F** key or click **Fullscreen** for presentation mode
4. **Download as PDF** using the download button

## Available Sections

You can add these sections to your presentation:
- **Study Summary** - Overview and key metrics
- **Study Evaluation** - Detailed question responses
- **Key Findings** - Most important discoveries
- **Behavioral Patterns** - Themes and trends
- **Pain Points** - User issues by severity
- **Notable Quotes** - Direct participant feedback
- **Recommendations** - Prioritized action items

## Technical Details

### Data Storage
- Your presentation configuration is saved in browser localStorage
- Slides persist across page reloads
- Each slide includes:
  - Section ID
  - Title
  - Page number
  - Enabled/disabled state

### Dynamic Slide Generation
- Slides are generated dynamically based on your selections
- Each section has a dedicated slide generator
- Content is extracted from the actual section data

### Persistence
- Changes are automatically saved
- No manual save button needed
- Data survives page refreshes

## Keyboard Shortcuts

**In Presentation View:**
- **← →** (Arrow keys): Navigate slides
- **F**: Toggle fullscreen mode
- **Escape**: Exit fullscreen mode

## Tips & Best Practices

1. **Start with key sections**: Add Study Summary and Key Findings first
2. **Use enable/disable for testing**: Test different slide arrangements without deleting
3. **Export regularly**: Download PDF backups of important presentations
4. **Reorder strategically**: Put executive summary first, recommendations last
5. **Hide instead of delete**: Use disable to temporarily remove slides
6. **Build incrementally**: Add sections one at a time and review as you go

## Troubleshooting

### Slides not appearing in presentation?
- Make sure slides are **enabled** (eye icon should be open, not crossed out)
- Check that you clicked **"View Presentation"**
- Verify at least one slide is enabled
- Try refreshing the page if issues persist

### Can't add a section?
- Check if the section is already added (sections can only be added once)
- Make sure you selected a section from the dropdown
- Only content sections are available (Admin, Note Taker, etc. are excluded)

### Lost your configuration?
- Presentation data is stored in **localStorage**
- Clearing browser data will reset your presentation
- Export to PDF regularly as a backup
- Consider taking screenshots of your builder configuration

### Dropdown not showing sections?
- Make sure the builder panel is fully loaded
- Try closing and reopening the builder
- Refresh the page if the issue persists

### Page numbers not updating?
- Page numbers update automatically based on slide order
- If they seem incorrect, try closing and reopening the builder
- The numbers reflect only enabled slides

## Comparison with AI Chat Assistant

The Presentation Builder works alongside the AI Chat Assistant:

| Feature | Manual Builder | AI Chat Assistant |
|---------|---------------|-------------------|
| Control | Full manual control | Natural language requests |
| Speed | Click and select | Ask and receive |
| Precision | Exact section selection | AI interprets intent |
| Learning Curve | Intuitive UI | Requires API key setup |
| Best For | Specific custom builds | Quick exploration |

**Recommendation**: Use both! Start with AI to quickly build a base presentation, then use the manual builder to fine-tune the order and selection.

## Future Enhancements

Planned features:
- Drag-and-drop reordering
- Slide templates and themes
- Export to PowerPoint
- Share presentations via link
- Duplicate slides
- Custom slide content editing
- Slide notes and speaker notes
- Transition effects
- Slide thumbnails preview

## Support

If you encounter issues:
1. Check this guide first
2. Review the troubleshooting section
3. Try the browser console for error messages (F12)
4. Clear localStorage and start fresh if needed
5. Export your presentation before making major changes

---

**Version**: 2.0  
**Last Updated**: January 2026  
**Location**: Available via "Presentation" in the left sidebar
