# 🤝 Collaboration Setup Guide - Supabase Integration

## Overview
Enable real-time collaboration for up to 3 people to work together on the Note Taker simultaneously. Changes sync instantly and everyone can see who's online.

## ⏱️ Setup Time: 15-20 minutes

---

## Step 1: Create Supabase Account (5 minutes)

### 1.1 Sign Up
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or Email (FREE forever for 3 people)

### 1.2 Create Project
1. Click "New Project"
2. Fill in:
   - **Project name**: `user-testing-notes` (or any name)
   - **Database password**: Create a strong password (save it somewhere!)
   - **Region**: Choose closest to your location
   - **Pricing plan**: FREE
3. Click "Create new project"
4. Wait 2-3 minutes for setup to complete

---

## Step 2: Set Up Database (5 minutes)

### 2.1 Run SQL Setup
1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `setup-supabase.sql` from this project
4. **Copy ALL the SQL code** from that file
5. **Paste it** into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see: "Success. No rows returned"

✅ Your database tables are now created!

---

## Step 3: Get Your API Keys (2 minutes)

### 3.1 Find Your Keys
1. In Supabase, click **"Project Settings"** (gear icon in bottom left)
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (very long string)

### 3.2 Copy Your Keys
📋 Keep these ready for the next step!

---

## Step 4: Configure the Application (3 minutes)

### 4.1 Open Configuration File
1. Open `supabase-config.js` in your project
2. Find these lines near the top:
```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_PROJECT_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
    enabled: false
};
```

### 4.2 Add Your Keys
Replace the placeholder values:
```javascript
const SUPABASE_CONFIG = {
    url: 'https://xxxxx.supabase.co',  // Your Project URL
    anonKey: 'eyJhbGci...',             // Your anon public key
    enabled: true                        // Change to true!
};
```

### 4.3 Save the File
✅ Configuration complete!

---

## Step 5: Test It Out (5 minutes)

### 5.1 Open the Application
1. Open `index.html` in your browser
2. Navigate to **"Select Study"**
3. Open a study or create a new one
4. Go to **"Note Taker"**

### 5.2 Check for Collaboration
Look for:
- ✅ **Collaboration indicator** in top-right showing "1 person online"
- ✅ **Share button** in Note Taker controls (purple gradient)
- ✅ Console message: "✅ Collaboration enabled for campaign..."

### 5.3 Share with Teammates
1. Click the **"Share"** button in Note Taker
2. Copy the shareable link
3. Send it to your teammates (via Slack, email, etc.)
4. They open the link and can collaborate instantly!

---

## How It Works

### When You Open Note Taker:
1. System asks for your name (first time only)
2. Connects to Supabase
3. Loads existing notes from cloud
4. Shows who else is online

### When You Add/Edit Notes:
1. Changes save to Supabase automatically
2. Other users see updates within 1-2 seconds
3. Notification shows who made the change

### When Someone Else Edits:
1. You see a notification: "📝 [Name] updated the notes"
2. Notes refresh automatically
3. No conflicts - last change wins

---

## Using Collaboration

### Creating a New Session
1. Open Note Taker
2. System creates a unique campaign ID
3. Click "Share" to get the shareable link
4. Send link to teammates

### Joining an Existing Session
1. Click the shareable link
2. Enter your name
3. Start collaborating!

### Who's Online
- Check the indicator in top-right
- Shows all active users
- Updates every 30 seconds

### Sharing Best Practices
- ✅ Share links via secure channels (Slack DM, Email)
- ✅ Only 2-3 people recommended for best performance
- ⚠️ Anyone with the link can edit
- ⚠️ No authentication required (shared link approach)

---

## Features

### ✅ What Works
- **Real-time sync**: See changes within 1-2 seconds
- **Presence tracking**: See who's online
- **Automatic saves**: No manual save needed
- **Offline fallback**: Works without internet (saves locally)
- **User names**: See who made each change
- **Notifications**: Know when others edit

### ⚠️ Limitations
- **No conflict resolution**: Last edit wins
- **No edit locking**: Two people can edit same note
- **No undo across users**: Each person's undo is local
- **No cursors**: Can't see where others are typing
- **Simple security**: Anyone with link can edit

---

## Troubleshooting

### "Supabase not configured" message
- ✅ Check `enabled: true` in `supabase-config.js`
- ✅ Verify URL and API key are correct
- ✅ Make sure quotes are around the values

### Collaboration indicator doesn't appear
- ✅ Refresh the page
- ✅ Check browser console for errors (F12)
- ✅ Verify you're on Note Taker page
- ✅ Check if Supabase CDN loaded (see Network tab)

### Changes not syncing
- ✅ Check internet connection
- ✅ Verify all users are on same campaign (same link)
- ✅ Check Supabase project isn't paused (free tier)
- ✅ Look for errors in browser console

### "Failed to save notes" error
- ✅ Check Supabase project is active
- ✅ Verify database tables were created (Step 2)
- ✅ Check API key has correct permissions
- ✅ Notes still save locally as backup

### Two people editing at once
- ⚠️ This is expected behavior
- ⚠️ Last person to save wins
- ⚠️ Coordinate who edits what to avoid conflicts
- 💡 Use different boards/interviews per person

---

## Cost & Limits

### Supabase Free Tier
- **Storage**: 500MB database (plenty for notes)
- **Bandwidth**: 2GB per month
- **Realtime**: Unlimited connections
- **Duration**: FREE forever

### Estimated Usage (3 people)
- **Storage**: ~1-5MB per campaign
- **Bandwidth**: ~10-50MB per month
- **Projects**: Unlimited campaigns

### When You Might Need Paid
- **Never** for 3 people with normal use
- Only if you have 100+ campaigns
- Or 50+ people collaborating
- Or 1GB+ of notes

---

## Advanced Configuration

### Disable Collaboration
In `supabase-config.js`:
```javascript
enabled: false  // System uses localStorage only
```

### Change User Name
1. Open Note Taker
2. Look for collaboration indicator
3. Click "Change Name"
4. Or clear `localStorage.collaborator_name`

### Reset Everything
Clear browser localStorage:
```javascript
localStorage.removeItem('collaborator_name');
localStorage.removeItem('collaborator_id');
```

### Self-Host (Advanced)
Supabase is open source - you can self-host:
1. Follow [Supabase self-hosting guide](https://supabase.com/docs/guides/self-hosting)
2. Update URL in `supabase-config.js`
3. No other changes needed

---

## Security Notes

### What's Shared
- ✅ Note content and positions
- ✅ User names (what you entered)
- ✅ Board structure
- ✅ Timestamps

### What's NOT Shared
- ❌ Your email or personal info
- ❌ Other campaigns (isolated)
- ❌ Browser history
- ❌ Login credentials (no auth)

### Best Practices
- 🔒 Only share links with trusted teammates
- 🔒 Use private Slack DMs or email
- 🔒 Don't post links publicly
- 🔒 Create new campaign for each study
- 🔒 Clear old data when done

---

## Need Help?

### Check These First
1. Browser console (F12) for errors
2. Supabase project dashboard for status
3. This guide's troubleshooting section
4. Test with sample data first

### Common Issues
- **90% of issues**: Wrong API key or URL
- **5% of issues**: SQL not run correctly
- **5% of issues**: Browser/network problems

### Still Stuck?
- Double-check all setup steps
- Try incognito/private browsing
- Test with a fresh Supabase project
- Check if firewall blocks Supabase

---

## What's Next?

### After Setup
- ✅ Test with 2-3 people
- ✅ Create separate campaigns per study
- ✅ Share links only with team
- ✅ Check collaboration indicator regularly

### Optional Enhancements
- Add authentication (more secure)
- Show live cursors
- Add chat feature
- Version history
- Conflict resolution

---

## Quick Reference

### Key Files
- `supabase-config.js` - Main configuration
- `setup-supabase.sql` - Database schema
- `collaboration-manager.js` - Sync logic
- `COLLABORATION_SETUP.md` - This file

### Important Functions
- `window.collaborationManager.init()` - Start collaboration
- `window.collaborationManager.showShareDialog()` - Show share link
- `window.collaborationManager.loadOnlineUsers()` - Refresh users

### Key Concepts
- **Campaign ID**: Unique identifier for each study
- **Board ID**: Individual interview/user board
- **Shareable Link**: URL with campaign ID
- **Presence**: Who's currently online

---

**Setup Complete!** 🎉

You now have real-time collaboration enabled for up to 3 people. Start collaborating!

**Version**: 1.0  
**Last Updated**: January 2026
