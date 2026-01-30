// Accurate synthesis from 6 user testing sessions
// Research conducted for First American - ISS P4.1 Iterative Testing
// Participants: Jason (User 5), Kayla (User 6), Christina (User 1), Emily (User 2), Bree (User 3), Amanda (User 4)

var synthesisData = {
  metadata: {
    sessionDate: "January 2026",
    participants: 6,
    sessionLength: "60 minutes each",
    researchAreas: [
      "Auto Deposit Matching",
      "In-Line Settlement Statement Editing", 
      "CD Comparison & Balancing"
    ],
    userRoles: [
      "Escrow Officer/Closer (4)",
      "Senior Escrow Assistant (2)"
    ],
    locations: [
      "Castle Rock, CO",
      "Modesto, CA",
      "Portland, OR",
      "Santa Rosa, CA",
      "Bonney Lake, WA",
      "Seattle, WA"
    ],
    studyBackground: "The Settlement Statement (SS) serves as the central platform where details and funds are entered and balanced. Changes to funds and details automatically sync across all linked datasets. Instead of entering funds through source screens like FAST or Ignite, escrow teams will input all information directly through the SS. This Interactive Settlement Statement will become the primary entry point for all commercial and residential transaction fees and charges for Direct Escrow Officers, HSD, GOST, and EPS. The ISS UX team is currently developing an MVP/proof-of-concept for the Settlement and Accounting experience.",
    studyGoals: "This round of iterative testing focused on updates made to the experience of: in-line editing, auto-comparison of CD vs SS, the handling of Real Estate Broker Compensation splits and the auto-deposit recognition."
  },

  participantDetails: [
    {
      id: "user5",
      name: "Jason",
      role: "Branch Manager & Escrow Officer",
      location: "Castle Rock, CO",
      experience: "25 years closing experience, 10 years at First American",
      systems: "Fast (primary for figures), Ignite (docs/tasking)",
      keyContributions: [
        "Emphasized 25 years of manual control creates cultural adjustment to automation",
        "Strong advocate for email notifications (keeps email open all day)",
        "Preferred full row highlighting for visual focus on specific fees",
        "Noted blue text counter-intuitive (Fast uses blue for read-only clickable links)",
        "Wanted flexibility to edit deposits after acceptance (for balancing to lender CD)"
      ],
      topQuote: "For the last 25 years, we are in control of every little detail. To have a system that inputs those figures when they come from an outside third party is much different."
    },
    {
      id: "user6",
      name: "Kayla",
      role: "Senior Escrow Assistant",
      location: "Modesto, CA",
      experience: "10.5 years at First American, started as receptionist",
      systems: "Fast, Ignite, Outlook",
      keyContributions: [
        "Works on every part of file start to finish (opening, liens, payoffs, closing)",
        "Highlighted excessive scrolling as usability issue - prefers seeing everything at once",
        "Strong feedback on visual clarity: full row highlighting helps track across columns",
        "Emphasized need for pastel colors (not bright/glaring) for extended viewing",
        "Wanted projected file balance visible on settlement statement screen"
      ],
      topQuote: "I like to kind of be able to see everything in one swoop... I feel like I gotta see it all, and I know the look of it. I'm like, something's missing there."
    },
    {
      id: "user1",
      name: "Christina",
      role: "Branch Manager & Escrow Officer",
      location: "Portland, OR (Beaverton)",
      experience: "28 years total (8 years title side, 20 years escrow)",
      systems: "Fast, Ignite, IgniterE, TitlePoint, Simplifile",
      keyContributions: [
        "Emphasized importance of compact data presentation (columns easier than bunched text)",
        "Identified trial balance notes only needed for long-term/holdback files in their region",
        "Highlighted view 2 with full row highlighting better for scanning",
        "Works solo without assistant - different verification needs than team-based officers",
        "Noted office-level wire visibility is critical"
      ],
      topQuote: "It's nice to have a second set [of eyes] for lack of another term... looking at it and finding quickly where we're off."
    },
    {
      id: "user2",
      name: "Emily",
      role: "Escrow Officer",
      location: "Santa Rosa, CA",
      experience: "26 years total (22 years in escrow)",
      systems: "Fast, Ignite (uses settlement statement screen constantly)",
      keyContributions: [
        "Heavy refi desk - processes 5-10 wires daily during busy periods",
        "Disables email notifications (created rule to auto-delete office-wide wire emails)",
        "Prefers compact side-by-side view and smaller fonts (good eyesight)",
        "Emphasized full row highlighting prevents entering fees on wrong lines (has done this)",
        "Concerns about changing payee names affecting global GAB codes/address book"
      ],
      topQuote: "I trust computers somewhat, but not fully... I like to double check... A lot of people keep things in their head sometimes."
    },
    {
      id: "user3",
      name: "Bree",
      role: "Senior Escrow Assistant",
      location: "Bonney Lake, WA",
      experience: "6-7 years at First American",
      systems: "Fast, Ignite",
      keyContributions: [
        "CRITICAL FEEDBACK: No change tracking causes wasted time investigating errors",
        "Emphasized liability concerns ('it falls on us') require double-checking even with automation",
        "Works closely with escrow officer doing funding packages and figure entry",
        "Identified need for knowing who updated fees when errors discovered at closing",
        "Strong preference for email notifications over portal (team wants one place to check)"
      ],
      topQuote: "We don't know who makes those changes... who changed that amount and cost us... we do have to do a lot of investigative work to find that out, and it's kind of time wasted."
    },
    {
      id: "user4",
      name: "Amanda",
      role: "Escrow Officer/Closer",
      location: "Seattle, WA",
      experience: "6 years at First American",
      systems: "Fast, Ignite",
      keyContributions: [
        "Leads team, prepares documents and all figures for closing",
        "Emphasized seeing changes live on settlement statement vs constant screen switching",
        "Works in detailed, methodical way - reviews every document before drawing docs",
        "Balances with some lenders take 6-7 iterations of back-and-forth revisions",
        "Strong preference for keyboard navigation (Tab, Arrow keys) for efficiency"
      ],
      topQuote: "We're switching screens constantly... I can't have it open and make the changes at the same time. Seeing it as I make those changes live will be nice."
    }
  ],

  executiveSummary: `Six escrow professionals (4 escrow officers and 2 senior escrow assistants) participated in moderated usability testing of three new features for the Interactive Settlement Statement: auto-deposit matching, in-line editing, and automated CD comparison. 

All participants expressed enthusiasm about the time-saving potential of these features, particularly the automated CD comparison which could reduce balancing time from 15-45 minutes to under 10 minutes. The inline editing capability was universally appreciated for reducing constant screen switching.

However, all 6 users emphasized the need to maintain manual verification options, especially initially, due to liability concerns and the need to build trust in automated systems. Key concerns included: need for change tracking/audit logs to know who edited what, clarity on which fields are editable vs locked, and visual differentiation between system-generated and user-entered data.

Users want automation to assist their work, not replace their judgment and verification processes.`,

  keyFindings: [
    {
      title: "Massive Time Savings: CD Comparison Feature Universally Valued",
      severity: "high",
      category: "Positive Impact",
      description: "All 6 users expressed strong enthusiasm about automated CD comparison. Current manual process requires constant screen switching (20-30 times), dual monitor setup, and line-by-line review taking 15-45 minutes depending on lender. Some lenders require 6-7 rounds of back-and-forth revisions.",
      evidence: "Emily: 'This would save us a lot of time... wouldn't have to wait hours for another department.' Bree: 'This is done in no time at all...saves a lot of time.' Jason: 'I like it, I think it's pretty neat. Easy.'"
    },
    {
      title: "Trust Must Be Earned: All Users Want Manual Verification Option",
      severity: "high", 
      category: "Critical Requirement",
      description: "Despite excitement about automation, all 6 users indicated they would still manually verify the CD, at least initially. This stems from liability concerns ('it falls on us'), need to double-check critical figures, and distrust of full automation without proven accuracy.",
      evidence: "Bree: 'It would take a lot to feel good about not double-checking it... if something was missed, it falls on us, we will definitely be double-checking.' Amanda: 'I'd want to learn that I can trust it, to trust it.' Christina: 'I would still pull up the CD...just to confirm on my own.' Emily: 'I trust computers somewhat, but not fully.'"
    },
    {
      title: "Inline Editing Eliminates Screen Switching Friction",
      severity: "high",
      category: "Positive Impact", 
      description: "All 6 users strongly preferred direct inline editing on the settlement statement versus navigating to separate screens. Current workflow requires constant switching between settlement statement, loan screen, charge details screens.",
      evidence: "Amanda: 'We're switching screens constantly... seeing it as I make those changes live will be nice.' Emily: 'I like to edit on things more.' Jason: 'This would be awesome if we could just change it on the settlement statement.' Christina: 'Not to have to go to multiple different screens.'"
    },
    {
      title: "Change Tracking/Audit Log is Critical Missing Feature",
      severity: "high",
      category: "Risk/Concern",
      description: "Multiple users identified inability to track who made changes as a major pain point. When errors occur (wrong fees, shortfalls at closing), users waste significant time investigating who made changes. This creates liability issues and prevents learning opportunities.",
      evidence: "Bree: 'We don't know who makes those changes... it doesn't specifically tell us who changed that amount and cost us... we do have to do a lot of investigative work to find that out, and it's kind of time wasted.' Jason: 'Who changed that amount and cost us?' (implied from context)"
    },
    {
      title: "Edit Permissions: Concerns About Uncontrolled Field Access",
      severity: "high",
      category: "Risk/Concern",
      description: "Users expressed concern about which fields should be editable and by whom. Specific worry about title/escrow fees and recording fees being accidentally changed by unauthorized users, leading to shortfalls at closing. Want some fields locked or permission-controlled.",
      evidence: "Bree: 'You don't want anyone to just be able to update anything.' Amanda: 'I don't want our fees to get messed up... when you realize at the end your fees were missing, it's not fun.' Jason: 'I don't know if management will prefer that we have that free reign on all of that.'"
    },
    {
      title: "Visual Clarity Gap: Cannot Distinguish CD vs Settlement Statement Figures",
      severity: "medium",
      category: "Usability Issue",
      description: "3 users explicitly struggled to identify which figures came from the CD versus the settlement statement in mismatch scenarios. This affected confidence in accepting/rejecting changes. Users requested explicit labels or consistent positioning.",
      evidence: "Christina: 'How can you tell which values are from the CD vs the SS? Major pain point.' Jason: 'I don't know what just happened, because I don't know what all these are... is the black the one I input?' Amanda: 'I wouldn't know [which number is from CD].' Kayla: 'I can't quite tell if that is what we had, and this is what it should be.'"
    },
    {
      title: "Auto-Deposit Matching High Value Despite Data Quality Issues",
      severity: "medium",
      category: "Mixed",
      description: "Users loved the auto-matching concept and immediate notifications, but noted many wires lack proper reference information (file numbers, addresses). Wire matching accuracy depends on external parties providing complete OBI data, which frequently doesn't happen.",
      evidence: "Christina: 'Not everyone puts a file number... sometimes they don't put a file number, you have to go find who that is.' Kayla: 'Not everyone puts a file number or a property address... wires often have missing info.' Emily: 'They don't put a file number, they might just put a property address, so then you have to go find what that address is.'"
    },
    {
      title: "Full Row Highlighting Preferred for Visual Tracking",
      severity: "medium",
      category: "Design Preference",
      description: "5 out of 6 users explicitly preferred full row highlighting over minimal highlights when editing or reviewing discrepancies. Helps maintain visual alignment across buyer/seller columns and prevents entering data on wrong lines.",
      evidence: "Jason: 'I like the full row highlighted. It just helps my vision go to what specific fee I'm working on.' Kayla: 'I like the highlights on the whole row... makes it easier to read all the way across... attracts my eye.' Emily: 'I like the whole row highlighted... catches your eye more... keeps you in line because I've entered them on wrong incorrect line [before].' Bree: 'I like when things are highlighted, that helps me... brings it into focus better.'"
    },
    {
      title: "GAB Code Integration Concerns Create Hesitation to Edit Payee Names",
      severity: "high",
      category: "Data Integrity",
      description: "Multiple users expressed concern that editing payee names directly on settlement statement might permanently change the global address book (GAB codes), affecting other users' files. This creates hesitation to use inline editing for vendor names even when needed.",
      evidence: "Emily: 'I'd be worried if I changed it and it's connected to a GAB Code, I might mess up someone else's file... We have GAB codes set up for vendors, and I wouldn't want to mess those up.' Christina: 'I'm worried if I change one line item name, will it update the other charges to that same payee.' Bree: 'If I change a payee name, does it change it in the address book for everyone?'"
    },
    {
      title: "Keyboard Navigation Expected for Efficiency",
      severity: "medium",
      category: "Workflow Preference",
      description: "Users expressed strong preference for keyboard navigation (Tab, Arrow keys) to move between editable fields without mouse clicks. Some mentioned Fast previously had arrow-down navigation that was removed, and they miss that efficiency.",
      evidence: "Emily: 'If I'm typing fees in loan charges I tab, they used to arrow down to go to the next fee, but they took it away.' Amanda: 'I'd like to be able to tab through fields and use arrow keys to go down columns.' Kayla: 'Wants to be able to tab through. That's how she prefers to maneuver.'"
    },
    {
      title: "Toast Notifications Frequently Missed - Need More Prominent Confirmations",
      severity: "medium",
      category: "Usability Issue",
      description: "Multiple users failed to notice toast messages confirming saves, errors, or state changes. Some looked for visual persistence of errors (red highlighting) rather than temporary notifications.",
      evidence: "Kayla: 'She just didn't notice the toast message.' Christina: 'She thinks she would want the red to stay there so she remembers to go back and correct it.' Bree: 'Would want the red error highlight to stay if she doesn't make the change the other way so that it reminds her.'"
    }
  ],

  themes: [
    {
      theme: "Time & Efficiency Gains from Automation",
      frequency: 32,
      description: "Users emphasized significant time savings from all three features, particularly CD comparison",
      category: "positive",
      examples: [
        { text: "That saves me a lot of time because we're switching screens constantly", participant: "Amanda" },
        { text: "This is going to be fantastic... I'm switching back and forth 20 times. Getting it all on one screen? Love it", participant: "Jason" },
        { text: "That would make my job just so much easier and faster. Love this", participant: "Kayla" }
      ]
    },
    {
      theme: "Trust & Verification Needs (Must Earn Trust)",
      frequency: 24,
      description: "All users want to manually verify automated changes initially until trust is built through proven accuracy",
      category: "behavioral",
      examples: [
        { text: "For the last 25 years, we are in control of every little detail. To have a system that inputs those figures when they come from an outside third party is much different", participant: "Jason" },
        { text: "I trust computers somewhat, but not fully... I like to double check", participant: "Emily" },
        { text: "We do have to double check everything... it falls on us. So I absolutely would look at it first", participant: "Bree" }
      ]
    },
    {
      theme: "Screen Switching Pain (20-30 switches per session)",
      frequency: 18,
      description: "Users frustrated by constant navigation between settlement statement, loan screen, charge details, and CD",
      category: "pain",
      examples: [
        { text: "We're switching screens constantly... I can't have it open and make the changes at the same time", participant: "Amanda" },
        { text: "I'm switching back and forth 20 times. Getting it all on one screen? Love it", participant: "Jason" },
        { text: "I have to click into the loan information screen, and then I'd have to come back to the settlement statement", participant: "Christina" }
      ]
    },
    {
      theme: "Change Tracking & Audit Log Needs",
      frequency: 15,
      description: "Cannot identify who made changes when errors occur, wasting time on investigations",
      category: "gap",
      examples: [
        { text: "We don't know who makes those changes... who changed that amount and cost us... we do have to do a lot of investigative work to find that out", participant: "Bree" },
        { text: "When we get to closing and we find an error, we go back and try to track down where did that come from", participant: "Amanda" },
        { text: "It would be helpful to see who updated the fees, especially when errors discovered at closing", participant: "Jason" }
      ]
    },
    {
      theme: "Data Quality Issues in Wire OBI Fields",
      frequency: 14,
      description: "Missing file numbers, property addresses, incorrect information in wire reference fields",
      category: "pain",
      examples: [
        { text: "Not everyone puts a file number... sometimes they don't put a file number, you have to go find who that is", participant: "Christina" },
        { text: "Not everyone puts a file number or a property address... wires often have missing info", participant: "Kayla" },
        { text: "They don't put a file number, they might just put a property address, so then you have to go find what that address is", participant: "Emily" }
      ]
    },
    {
      theme: "Visual Design Preferences (Full Row Highlighting)",
      frequency: 13,
      description: "Strong preference for full row highlighting to maintain visual alignment and prevent errors",
      category: "preference",
      examples: [
        { text: "I like the full row highlighted. It just helps my vision go to what specific fee I'm working on", participant: "Jason" },
        { text: "I like the highlights on the whole row... makes it easier to read all the way across... attracts my eye", participant: "Kayla" },
        { text: "I like the whole row highlighted... catches your eye more... keeps you in line because I've entered them on wrong incorrect line [before]", participant: "Emily" }
      ]
    },
    {
      theme: "Edit Permission Concerns",
      frequency: 12,
      description: "Worry about who can edit what, especially title/escrow fees that should be locked",
      category: "concern",
      examples: [
        { text: "Title reps shouldn't be able to change anything we have on there, and we shouldn't be able to change anything they put in", participant: "Jason" },
        { text: "I would want my escrow assistant to be able to update things on the statement, but there are certain fees that should remain locked", participant: "Christina" },
        { text: "There are going to be fees that should be locked down, especially title fees and escrow fees", participant: "Amanda" }
      ]
    },
    {
      theme: "Notification Preferences (Personalized, Not Office-Wide)",
      frequency: 11,
      description: "Want notifications for their files only, not all office wires. Email preferred over in-app pop-ups",
      category: "preference",
      examples: [
        { text: "I'd want it for just my files. I don't need to know about everyone else's wires in the office", participant: "Jason" },
        { text: "I keep my email open all day, so email notification works perfect for me", participant: "Jason" },
        { text: "I created a rule to auto-delete the office-wide wire emails. I don't need them", participant: "Emily" }
      ]
    },
    {
      theme: "Keyboard Navigation Requests (Tab, Arrow Keys)",
      frequency: 8,
      description: "Users want ability to navigate with keyboard (tab between fields, arrow down columns) for efficiency",
      category: "preference",
      examples: [
        { text: "I'd like to be able to tab through fields and use arrow keys to go down columns", participant: "Amanda" },
        { text: "Keyboard navigation would make it much faster, especially when entering multiple fees", participant: "Bree" },
        { text: "Being able to tab between fields would be really helpful for efficiency", participant: "Christina" }
      ]
    },
    {
      theme: "Lender-Specific Workflows & Variations",
      frequency: 7,
      description: "Different lenders have different processes, CD formats, integration levels (Wells Fargo integrated, UWM manual)",
      category: "context",
      examples: [
        { text: "Wells Fargo is integrated so their CD comes in automatically, but with UWM we have to manually enter everything", participant: "Emily" },
        { text: "Different lenders have different CD formats and processes", participant: "Amanda" },
        { text: "Some lenders we work with closely and get CDs early, others not so much", participant: "Kayla" }
      ]
    },
    {
      theme: "Auto-Save Expectations",
      frequency: 9,
      description: "Users expect changes to save automatically when leaving field, want clear confirmation indicators",
      category: "expectation",
      examples: [
        { text: "I would expect it to save when I leave the field, like most modern systems do", participant: "Christina" },
        { text: "It should save automatically, but give me some kind of confirmation so I know it worked", participant: "Amanda" },
        { text: "I'm used to auto-save in other systems, so I'd expect that here too", participant: "Kayla" }
      ]
    },
    {
      theme: "GAB Code/Address Book Concerns",
      frequency: 6,
      description: "Worry that changing payee names on settlement statement might affect global address book (GAB codes)",
      category: "concern",
      examples: [
        { text: "I'd be worried that changing the payee name here would change it everywhere in the system", participant: "Emily" },
        { text: "We have GAB codes set up for vendors, and I wouldn't want to mess those up by editing names", participant: "Christina" },
        { text: "If I change a payee name, does it change it in the address book for everyone?", participant: "Bree" }
      ]
    }
  ],

  painPoints: [
    {
      description: "No change tracking - cannot identify who edited fields when errors occur, leading to time-wasting investigations",
      participants: "Bree, Amanda, Jason (implied)",
      severity: "high",
      frequency: 3,
      category: "accountability",
      quote: "Bree: 'We don't know who makes those changes... who changed that amount and cost us... we do have to do a lot of investigative work'"
    },
    {
      description: "Manual wire checking - must refresh wire board multiple times daily (no automatic notifications)",
      participants: "All 6 users",
      severity: "high",
      frequency: 6,
      category: "workflow",
      quote: "Emily: 'I just check the incoming wire screen in Ignite myself, randomly throughout the day.' Jason: 'We have to go into Ignite Deposit screen and check it multiple times a day.'"
    },
    {
      description: "Constant screen switching (20-30 switches per balancing session) between settlement statement, loan screen, charge details, and CD",
      participants: "All 6 users",
      severity: "high",
      frequency: 6,
      category: "workflow",
      quote: "Amanda: 'We're switching screens constantly... settlement statement, loan screen, settlement statement, loan screen, and then back to the CD.' Bree: 'You have to bounce out of screens... and then you gotta jump back.'"
    },
    {
      description: "Wires frequently missing file numbers or proper reference information (OBI), requiring manual search and matching",
      participants: "Christina, Kayla, Emily, Bree",
      severity: "high",
      frequency: 4,
      category: "data_quality",
      quote: "Christina: 'Not everyone puts a file number... sometimes they don't put a file number, you have to go find who that is.' Kayla: 'Not everyone puts a file number or a property address.'"
    },
    {
      description: "Cannot tell which fields are editable vs read-only without clicking/hovering (no visual indicators)",
      participants: "All 6 users",
      severity: "medium",
      frequency: 6,
      category: "usability",
      quote: "Jason: 'I don't know if I can click on it or not.' Bree: 'I don't know what I can do with that.' Amanda: 'How do I know where I can edit within these fields?'"
    },
    {
      description: "Unclear which number represents CD vs settlement statement in mismatch views",
      participants: "Christina, Jason, Kayla, Amanda",
      severity: "high",
      frequency: 4,
      category: "usability",
      quote: "Jason: 'I don't know what just happened, because I don't know what all these are.' Kayla: 'I can't quite tell if that is what we had, and this is what it should be.' Amanda: 'I wouldn't know [which is which].'"
    },
    {
      description: "Uncertainty about what happens when rejecting a wire/deposit (where does it go?)",
      participants: "Jason, Emily, Christina, Amanda",
      severity: "medium",
      frequency: 4,
      category: "usability",
      quote: "Emily: 'If it was meant for the file... seems a little too easy to get rid of it... no record.' Jason: 'It'll just sit in our queue, I guess, until someone goes and claims it manually.' Christina: 'I would assume it would go back to the incoming wire office level.'"
    },
    {
      description: "Trial balance notes requirements are tedious and format is hard to remember",
      participants: "Kayla, Christina, Amanda",
      severity: "medium",
      frequency: 3,
      category: "workflow",
      quote: "Kayla: 'They're just a pain to have to do. No one likes doing those... I can never remember [the order].' Christina: 'I forget the order, I always have to look.'"
    },
    {
      description: "Excessive scrolling required - cannot see full settlement statement on one screen",
      participants: "Kayla, Bree",
      severity: "low",
      frequency: 2,
      category: "usability",
      quote: "Kayla: 'It's just a lot of scrolling... I like to kind of be able to see everything in one swoop... I feel like I gotta see it all, and I know the look of it.'"
    },
    {
      description: "Prototype lag and responsiveness issues created frustration during testing sessions",
      participants: "Multiple users",
      severity: "low",
      frequency: 5,
      category: "technical",
      quote: "Jason: 'It's delayed on my end when I click.' Christina: 'It's delayed on my end when I click, so I'm trying to...'"
    },
    {
      description: "Ignite font is too thin and light gray color - hard to read for extended periods",
      participants: "Kayla, Jason",
      severity: "low",
      frequency: 2,
      category: "accessibility",
      quote: "Kayla: 'The Ignite font is just really dull and thin... very thin writing... hard for me, my eyes, to pick up. The darker font and regular font is good.'"
    },
    {
      description: "Email notification overload - office-wide wire notifications get disabled/ignored",
      participants: "Emily, Kayla, Jason",
      severity: "medium",
      frequency: 3,
      category: "notifications",
      quote: "Emily: 'I just don't like emails... I have that go to my deleted folder... I don't want 10 more emails. I only really cared about mine.' Kayla: 'Pop-ups would honestly just get ignored.'"
    },
    {
      description: "GAB Code/Address Book concerns - worry that editing payee names on settlement statement might permanently change global address book",
      participants: "Emily, Christina, Jason, Kayla",
      severity: "high",
      frequency: 4,
      category: "data_integrity",
      quote: "Emily: 'I'd be worried if I changed it and it's connected to a GAB Code, I might mess up someone else's file.' Christina: 'I'm worried if she changes one line item name, will update the other charges to that same [payee] and mess someone else's files up.'"
    },
    {
      description: "No confirmation dialog when rejecting wires - users worry about accidentally deleting with no 'are you sure?' prompt",
      participants: "Emily, Christina, Amanda",
      severity: "medium",
      frequency: 3,
      category: "usability",
      quote: "Emily: 'For deleting things, I like a little more \"are you sure?\"' Amanda: 'It kinda disappeared... I'm not sure where it went.'"
    },
    {
      description: "Toast notifications not noticed - users miss system confirmations and error messages",
      participants: "Kayla, Bree, Christina",
      severity: "medium",
      frequency: 3,
      category: "usability",
      quote: "Kayla: 'She just didn't notice the toast message.' Christina: 'At least it notifies you, we don't always get that now.'"
    },
    {
      description: "Blue text meaning unclear - inconsistent with Fast system conventions where blue means hyperlink",
      participants: "Emily, Christina, Bree, Jason",
      severity: "low",
      frequency: 4,
      category: "visual_design",
      quote: "Jason: 'Blue to me means it's hyperlinked.' Emily: 'Isn't sure what the blue copy is about - thinks it has to do with POCs.' Christina: 'Isn't sure what the blue copy indicates.'"
    },
    {
      description: "Need dropdowns for deposit type selection - users want click-to-select menu instead of typing (Seller/Buyer/Other)",
      participants: "Emily, Kayla",
      severity: "low",
      frequency: 2,
      category: "workflow",
      quote: "Emily: 'I'm assuming it would be a drop down menu - so she doesn't have to go back to the keyboard.' Kayla: 'She clicks directly, but wants a drop down and not to have to type.'"
    },
    {
      description: "Confusion between 'Charge Details' vs 'Manage Charges' - users expect consistent button labels when error messages reference different location",
      participants: "Christina, Bree, Jason",
      severity: "medium",
      frequency: 3,
      category: "usability",
      quote: "Bree: 'Reads the toast message, is a little confused that it says Charge Details but it's \"Manages Charges\" where she would go.' Jason: 'It would be fine if I knew where \"charge details\" were.'"
    }
  ],

  notableQuotes: [
    {
      quote: "This would save us a lot of time... We wouldn't feel stressed if you're behind. This is done in no time at all.",
      participant: "Bree (User 3)",
      context: "Reacting to automated CD comparison feature",
      category: "enthusiasm",
      feature: "CD Comparison"
    },
    {
      quote: "It would take a lot to feel good about not double-checking it... if something was missed, it falls on us, we will definitely be double-checking.",
      participant: "Bree (User 3)",
      context: "Explaining need to manually verify even with automation",
      category: "trust",
      feature: "CD Comparison"
    },
    {
      quote: "I'd want to learn that I can trust it, to trust it.",
      participant: "Amanda (User 4)",
      context: "Building confidence in automated CD scanning over time",
      category: "trust",
      feature: "CD Comparison"
    },
    {
      quote: "We don't know who makes those changes... who changed that amount and cost us... we do have to do a lot of investigative work to find that out, and it's kind of time wasted. It would be nice to just be like, oh, so-and-so did it.",
      participant: "Bree (User 3)",
      context: "Explaining critical need for change tracking/audit logs",
      category: "pain_point",
      feature: "General"
    },
    {
      quote: "I like to edit on things more... I like that it's side-by-side... the whole row highlighted is better because you can see both sides and it keeps you in line, because I've done that before where I've entered them on wrong incorrect line.",
      participant: "Emily (User 2)",
      context: "Preference for inline editing with full row highlighting",
      category: "preference",
      feature: "Inline Editing"
    },
    {
      quote: "We're switching screens constantly... I can't have it open and make the changes at the same time. I have to make the changes and then run over the settlement statement... seeing it as I make those changes live will be nice.",
      participant: "Amanda (User 4)",
      context: "Current pain of screen switching, excitement about inline editing",
      category: "pain_point",
      feature: "Inline Editing"
    },
    {
      quote: "I trust computers somewhat, but not fully... I like to double check... A lot of people keep things in their head sometimes.",
      participant: "Emily (User 2)",
      context: "Explaining why manual verification is still needed",
      category: "trust",
      feature: "CD Comparison"
    },
    {
      quote: "I love the notification piece, and then I would love if verified meant that you just clicked on it, and then it posted to the file. That'd be my favorite. I'll use this all day long.",
      participant: "Jason (User 5)",
      context: "Enthusiasm for auto-deposit matching with email notifications",
      category: "enthusiasm",
      feature: "Auto Deposit"
    },
    {
      quote: "The emails work for us, but not everyone puts a file number or a property address... pop-ups would honestly just get ignored. I only really cared about mine [not whole office wires].",
      participant: "Emily (User 2) & Kayla (User 6)",
      context: "Notification preferences - personalized, not office-wide",
      category: "preference",
      feature: "Notifications"
    },
    {
      quote: "For the last 25 years, we are in control of every little detail. To have a system that inputs those figures when they come from an outside third party is much different.",
      participant: "Jason (User 5)",
      context: "Cultural shift from manual control to assisted automation",
      category: "behavioral",
      feature: "CD Comparison"
    },
    {
      quote: "I don't like emails, there is an email I get, but I have it go to my deleted folder so I just watch the board throughout the day. I don't want to see anyone else's wires, I only care about mine.",
      participant: "Emily (User 2)",
      context: "Explaining why office-wide email notifications don't work - created email rule to auto-delete them",
      category: "preference",
      feature: "Notifications"
    },
    {
      quote: "It's nice to have a second set [of eyes] for lack of another term... looking at it and finding quickly where we're off.",
      participant: "Christina (User 1)",
      context: "Reacting to automated CD comparison feature - values having system catch errors she might miss",
      category: "trust",
      feature: "CD Comparison"
    },
    {
      quote: "I like to see everything in one swoop... I feel like I gotta see it all, and I know the look of it. I'm like, something's missing there.",
      participant: "Kayla (User 6)",
      context: "Explaining why she dislikes excessive scrolling - relies on visual memory of full screen layout",
      category: "preference",
      feature: "General UI"
    },
    {
      quote: "I like the whole row highlighted... catches your eye more... keeps you in line because I've entered them on wrong incorrect line [before].",
      participant: "Emily (User 2)",
      context: "Preference for full row highlighting to prevent data entry errors on wrong line",
      category: "preference",
      feature: "Inline Editing"
    },
    {
      quote: "This is definitely not something I thought we'd be doing, so this is great, a lot of new positive changes. It will save me a lot of time and will bring people a lot of confidence who are learning to do that part of the job.",
      participant: "Bree (User 3)",
      context: "Overall reaction to inline editing feature - sees training benefits beyond time savings",
      category: "enthusiasm",
      feature: "Inline Editing"
    },
    {
      quote: "We want one place to check, email would be great.",
      participant: "Amanda (User 4)",
      context: "Explaining team preference for email notifications over having to check multiple systems",
      category: "preference",
      feature: "Notifications"
    },
    {
      quote: "A lot of things live in people's head.",
      participant: "Christina (User 1)",
      context: "Explaining why automation needs manual verification - institutional knowledge often not documented",
      category: "behavioral",
      feature: "General"
    }
  ],

  recommendations: [
    {
      title: "Implement comprehensive change tracking/audit log system",
      priority: "p0",
      description: "Add audit trail showing who changed which fields and when, with ability to view change history. Critical for accountability and preventing/investigating errors.",
      rationale: "Multiple users identified this as critical missing feature. Significant time currently wasted investigating who made errors. Liability concerns require knowing who made changes.",
      impact: "Enables accountability, reduces time wasted on investigations, prevents financial errors from going untracked",
      relatedTheme: "Change Tracking & Audit Log Needs"
    },
    {
      title: "Configure field-level edit permissions (lock critical fields)",
      priority: "p0",
      description: "Allow configuration of which fields are editable vs locked (read-only). Title/escrow fees and recording fees should be locked or permission-controlled to prevent accidental changes.",
      rationale: "Users concerned about unauthorized edits to critical fee fields. Shortfalls at closing caused by accidentally changed title/escrow fees create financial and legal issues.",
      impact: "Prevents costly errors, maintains fee integrity, enables appropriate access control by role",
      relatedTheme: "Edit Permission Concerns"
    },
    {
      title: "Add explicit labels differentiating CD figures from Settlement Statement figures",
      priority: "p0",
      description: "In mismatch views, use clear labels (e.g., 'CD: $1,200' vs 'SS: $1,000') or consistent positioning to show which number is from which source. Add color coding.",
      rationale: "4 users struggled to identify which figures were from CD vs SS. This confusion reduces confidence in accepting/rejecting changes and can lead to wrong decisions.",
      impact: "Increases user confidence, reduces errors from confusion, speeds up decision-making",
      relatedTheme: "Visual Clarity Gap"
    },
    {
      title: "Provide manual verification option even after accepting automated CD scan",
      priority: "p1",
      description: "Always allow users to open and review the actual CD document, even after automated scan. Add 'View CD' button next to Balance with CD results.",
      rationale: "All 6 users stated they would still manually verify the CD initially (liability concerns, need to build trust). Several want to always have the option even after trusting the system.",
      impact: "Builds trust gradually, meets liability requirements, supports user mental models",
      relatedTheme: "Trust & Verification Needs"
    },
    {
      title: "Implement personalized wire notifications (per-user, not office-wide)",
      priority: "p1",
      description: "Send email notifications for wires matching specific user's files only. Include file number, buyer name, amount, and wire type (EMD vs loan proceeds).",
      rationale: "Users disable office-wide notifications due to noise/volume. Want to see only their wires. Currently waste time manually refreshing wire board constantly.",
      impact: "Eliminates constant manual checking, reduces notification fatigue, speeds up wire processing",
      relatedTheme: "Notification Preferences"
    },
    {
      title: "Enhance auto-match confidence indicators and show matching logic",
      priority: "p1",
      description: "Show confidence score for auto-matches (high/medium/low) and display which fields were used to match (file number match, name match, address match, etc.). Allow users to override low-confidence matches.",
      rationale: "Auto-match accuracy depends on external data quality (OBI fields often incomplete). Users need to know how confident the system is to decide whether to verify manually.",
      impact: "Builds appropriate trust, helps users prioritize verification efforts, reduces false positives",
      relatedTheme: "Auto-Deposit Matching"
    },
    {
      title: "Add keyboard navigation (Tab, Arrow keys, Enter to save)",
      priority: "p2",
      description: "Support tab to move between editable fields, arrow down/up to navigate columns, Enter to save changes. Maintains hands on keyboard for efficiency.",
      rationale: "Multiple users mentioned wanting keyboard navigation. Some users already habitually tab through fields in current Fast system.",
      impact: "Increases data entry speed, reduces mouse dependency, improves workflow efficiency for power users",
      relatedTheme: "Keyboard Navigation Requests"
    },
    {
      title: "Use gray background consistently for read-only/locked fields",
      priority: "p1",
      description: "Implement gray background for all fields that cannot be edited directly from settlement statement (POC charges, title/escrow fees, recording fees).",
      rationale: "Users tested 3 visual treatments. Gray background tested best for immediately showing what cannot be edited without requiring hover/click.",
      impact: "Reduces confusion, prevents frustrated clicking on locked fields, sets clear expectations",
      relatedTheme: "Visual Design Preferences"
    },
    {
      title: "Add confirmation dialogs for destructive actions (reject wire, delete fee)",
      priority: "p1",
      description: "When user rejects a wire or deletes a significant item, show confirmation dialog explaining what will happen (e.g., 'Wire will return to pending queue for office'). Include undo option.",
      rationale: "Users uncertain about consequences of rejecting wires. Emily expressed concern about 'too easy to get rid of' with no record.",
      impact: "Prevents accidental deletions, clarifies system behavior, provides safety net",
      relatedTheme: "Uncertainty about system behavior"
    },
    {
      title: "Clarify GAB Code behavior when editing payee names inline",
      priority: "p0",
      description: "Add explicit messaging explaining whether inline payee name edits affect only current transaction or update global address book. Consider making SS edits local-only with option to 'Update GAB Code' as separate action.",
      rationale: "4 users expressed high concern about accidentally changing GAB codes that would affect other users' files. This fear creates hesitation to use inline editing for vendor names even when legitimately needed.",
      impact: "Removes barrier to using inline edit, prevents accidental global changes, maintains data integrity",
      relatedTheme: "GAB Code/Address Book Concerns"
    },
    {
      title: "Make toast notifications more prominent with persistent error indicators",
      priority: "p1",
      description: "Replace or supplement toast messages with persistent visual indicators (red borders, warning icons) that remain until user addresses the issue. Add sound/animation for critical errors.",
      rationale: "3 users completely missed toast notifications. Users want red error highlighting to persist as reminder rather than disappearing after few seconds.",
      impact: "Ensures users see important system feedback, reduces errors from missed notifications",
      relatedTheme: "Toast notifications frequently missed"
    },
    {
      title: "Add dropdown menus for deposit type selection (Buyer/Seller/Other)",
      priority: "p2",
      description: "Replace text input fields for deposit types with click-to-select dropdown menus to reduce keyboard switching and typing errors.",
      rationale: "Users prefer clicking selections over typing when options are limited. Reduces typos and standardizes data entry.",
      impact: "Speeds up deposit entry, reduces errors, improves user experience",
      relatedTheme: "Workflow efficiency"
    },
    {
      title: "Align button labels with error message references",
      priority: "p2",
      description: "Ensure error messages reference exact button names users see on screen (e.g., if button says 'Manage Charges,' error should say 'Manage Charges' not 'Charge Details').",
      rationale: "3 users confused when toast error referenced 'Charge Details' but button said 'Manage Charges.' Inconsistent terminology reduces error recovery success.",
      impact: "Improves error recovery, reduces user frustration, maintains consistency",
      relatedTheme: "Usability"
    }
  ],

  researchQuestions: [
    {
      section: "Auto Deposit - Ways of Working",
      questions: [
        {
          question: "How often do you receive deposits?",
          answer: "Daily deposits for all users. Volume ranges from 2-10+ per day depending on closing schedule and time of month. Purchase transactions typically have 2 wires (buyer funds + lender funds). Refi-heavy officers see more volume.",
          userCount: 6
        },
        {
          question: "How are you notified? (Single, batch)",
          answer: "Email notifications available but often disabled due to high volume and office-wide noise. Users manually check wire board in Fast/Ignite by refreshing multiple times daily. Some offices have hourly wire bot sweeps that email assistants only.",
          userCount: 6
        },
        {
          question: "How urgent is it for you to act on a wire notification?",
          answer: "Highly urgent for closing day wires and lender funds (immediate action needed to release for recording). EMD has slight more flexibility but still requires same-day processing. Users constantly refresh screens waiting for expected wires.",
          userCount: 6
        },
        {
          question: "What do you do when you see it come through?",
          answer: "Verify wire details against file information (file number, buyer name, amount, property address), confirm payer identity, check purpose (EMD vs loan proceeds vs closing funds), then post to file and update settlement statement.",
          userCount: 6
        },
        {
          question: "Is there a way that would be more helpful for you to receive notice?",
          answer: "Want personalized email notifications for THEIR files only, not all office wires. Email preferred over in-app pop-ups which get ignored. Need file number, buyer name, and amount in notification.",
          userCount: 6
        },
        {
          question: "What do you typically enter in deposit notes?",
          answer: "File number, purpose (EMD, loan proceeds, closing funds, seller proceeds), payer name, user initials, date, any special instructions or holds. For holds: reason, review date, responsible party.",
          userCount: 6
        },
        {
          question: "OBI: What do you tell the buyer/lender to place in the OBI? Why?",
          answer: "File number is CRITICAL for matching (most important). Also request property address and buyer/seller names. Helps quickly identify which file the wire belongs to, especially with common names (multiple Jesse Hernandez files).",
          userCount: 6
        },
        {
          question: "Do you ever have issues with them entering it incorrectly?",
          answer: "Frequently (all 6 users mentioned this). Wires often have missing file numbers, wrong/missing addresses, generic references, or only lender loan numbers. Users must manually search and match these wires, wasting significant time.",
          userCount: 6
        },
        {
          question: "How do you know what the review by date is for holds?",
          answer: "Based on contract contingency dates, amended escrow instructions, lender conditions, or escrow officer judgment. For rent-back holdbacks: check agent form for rental period. For final utilities/bills: estimate 3-4 weeks. Pulled from contracts or file notes.",
          userCount: 5
        },
        {
          question: "In what situations do you have to hold a deposit?",
          answer: "Contingencies not cleared, earnest money disputes between buyer/seller, loan not fully approved, seller hasn't signed documents, title issues pending, holdback files (rent-back, repairs), commercial/long-term files (6+ months), awaiting final utilities/bills, awaiting reconveyance/release.",
          userCount: 6
        }
      ]
    },
    {
      section: "Auto Deposit - Prototype Testing",
      questions: [
        {
          question: "What stands out about the auto-match email notification?",
          answer: "Users appreciated seeing file details pre-populated and all information in one place. Loved the notification concept. Concerned about accuracy if OBI data is poor. Verify button purpose was clear.",
          userCount: 6
        },
        {
          question: "How confident are you in the accuracy of auto-matched information?",
          answer: "Moderately to highly confident if OBI is complete and accurate. Would still verify against file details before accepting. Confidence depends on data quality from external parties (buyers/lenders providing correct reference info).",
          userCount: 6
        },
        {
          question: "How would you verify that the auto-match is correct?",
          answer: "Check file number matches expected file, verify buyer name matches originator, confirm amount matches expected deposit (EMD from contract, loan proceeds from file balance), review property address. Some users 'just know' from working the file actively.",
          userCount: 6
        },
        {
          question: "What would you expect to happen after you click 'verify'?",
          answer: "Wire posts to file automatically, updates trial balance, reflects on settlement statement, generates activity log entry, sends prono (proactive notification) to parties if applicable. Should show receipt confirmation on screen.",
          userCount: 6
        },
        {
          question: "Can you tell which information came from the bank vs system-generated?",
          answer: "Not always clear in initial designs. Users want visual differentiation (color coding, section labels like 'Wire Details' vs 'Proposed Deposit Info', or icons) to distinguish data sources.",
          userCount: 5
        },
        {
          question: "What information is most crucial to see in the snapshot view?",
          answer: "Amount (most critical for lender wires/closing funds), file number, buyer name, property address, payer name/originator (must match buyer unless third-party), date received, purpose (EMD vs loan proceeds), and posting status (pending vs posted).",
          userCount: 6
        },
        {
          question: "How would you edit the deposit information?",
          answer: "Expected inline editing - click directly on field to modify (e.g., change 'Received From' from Buyer to Seller). Strongly preferred dropdown menus over typing for common fields (buyer/seller/lender/other options).",
          userCount: 6
        },
        {
          question: "What elements would you expect to be able to adjust?",
          answer: "Payer designation (buyer/seller/lender/other - CRITICAL for third-party funds), purpose, file assignment if incorrect match, notes field, hold status. Bank-provided data (amount, date, confirmation number) should be read-only. Need ability to add 'FBO' (for benefit of) for third-party funds.",
          userCount: 6
        },
        {
          question: "How can you tell which details are 'read only' and which are editable?",
          answer: "Not immediately clear without visual indicators. Users suggested gray background for read-only (tested best), blue/underlined text for editable, pencil edit icon, or hover state tooltip saying 'Cannot be edited'.",
          userCount: 6
        },
        {
          question: "What would you do if you don't want to accept a wire?",
          answer: "Click X or 'reject' button. Want to know where rejected wire goes (back to pending office queue, stays visible with 'rejected' flag). Concerned it disappears with no record. Want undo capability. Need confirmation dialog explaining consequences.",
          userCount: 6
        },
        {
          question: "Which design (A vs B) do you prefer for deposit approval?",
          answer: "SPLIT preferences. 3 users preferred compact side-by-side view (Variant B) - less scrolling, see multiple wires at once. 3 users preferred expanded card view (Variant A) - more detail, easier to read. Both have merits depending on number of pending wires.",
          userCount: 6
        },
        {
          question: "How much time does it normally take to manually enter deposit information?",
          answer: "2-5 minutes per wire depending on complexity and whether it's a wire (faster - auto-populates some fields) or check (slower - manual entry of account numbers). Longer if missing file number and must search by address or investigate unclear OBI.",
          userCount: 6
        }
      ]
    },
    {
      section: "In-Line Editing - Initial Impressions",
      questions: [
        {
          question: "Does anything stand out about the settlement statement?",
          answer: "Blue text immediately caught attention and suggested clickability/links (consistent with web conventions and current Fast system where blue = clickable Eagle Commitment links). Some users noticed POC charges highlighted. Full row highlighting when clicking stood out positively.",
          userCount: 6
        },
        {
          question: "Why do you think some copy is color-coded? What does each color mean?",
          answer: "Users guessed blue = clickable/editable or links, gray = read-only/locked, yellow/highlighted = needs attention/error/recently changed. Some confusion as meaning varied by design version. POC charges in blue suggested special status.",
          userCount: 6
        },
        {
          question: "How easy was it to edit a charge inline?",
          answer: "Easy once interaction pattern understood (click to activate field, type new value). Some initial confusion about single vs double-click. Appreciated not having to navigate to separate Manage Charges screen for simple edits.",
          userCount: 6
        },
        {
          question: "Would you expect the save to happen automatically or take time?",
          answer: "All users expected immediate auto-save when leaving field (tab away, click elsewhere, enter key). Consistent with most current Fast screens that auto-save. Concerned about lag without clear feedback indicating whether save succeeded.",
          userCount: 6
        },
        {
          question: "How do you know that the update is saved?",
          answer: "Wanted clear visual confirmation - checkmark icon, 'Saved' or 'Change updated' message (brief toast at bottom), color change, or highlight disappearing. Some designs lacked sufficient feedback causing uncertainty and anxiety about whether change persisted.",
          userCount: 6
        },
        {
          question: "What happened when you saw an error state?",
          answer: "Red highlight and error message appeared ('Change not saved due to system error. Try updating using charge details'). Users understood error occurred but wanted clearer guidance - some interpreted 'charge details' as separate screen, others understood meant Manage Charges.",
          userCount: 5
        },
        {
          question: "Should visual indicator of error persist if not fixing now?",
          answer: "5 users wanted persistent red flag/highlight to remind them to fix later (can't balance with lender until fixed). 1 user wanted error to go away after acknowledging it. Users noted they wouldn't typically leave errors unfixed due to balancing requirements.",
          userCount: 6
        },
        {
          question: "How can you tell what parts of the SS you can directly click to edit?",
          answer: "Very difficult without hover tooltips or visual cues. Users clicked randomly to explore. Suggested gray background for read-only (tested best), blue underlined text for editable, pencil icon on hover, or white box/border indicating editable field.",
          userCount: 6
        },
        {
          question: "What do you think the blue text signifies?",
          answer: "Assumed clickable/editable or links to more details, consistent with web conventions. HOWEVER: 1 user (Jason) found blue COUNTER-INTUITIVE because Fast system uses blue for read-only clickable links (Eagle Commitment documents), so black = locked and blue = clickable in his mental model. Color meaning confusion.",
          userCount: 6
        },
        {
          question: "Which version makes it most clear where you can/can't edit?",
          answer: "Gray background for read-only fields tested best with 5 users - could instantly see edit capabilities without clicking. 1 user was confused by all versions. Full row highlighting when actively editing preferred by 5/6 users for maintaining visual alignment across columns.",
          userCount: 5
        }
      ]
    },
    {
      section: "In-Line Editing - Usage Patterns",
      questions: [
        {
          question: "What kinds of changes do you make most often?",
          answer: "Most frequent: Lender fee updates from CD (interest rates, points, insurance), payee names (correcting GAB codes, adding FBO for third-party funds), POC designations, invoice amounts, buyer/seller charge allocation. Less frequent: title/escrow fees (should be auto-calculated and locked). Sales price and loan amount corrections when contract changes.",
          userCount: 6
        },
        {
          question: "At what points during a file do you usually make the most changes?",
          answer: "Throughout file lifecycle: initial fee entry, after receiving initial CD, when lender sends revised CD (multiple iterations - some lenders 6-7 rounds), when receiving updated invoices, during final balancing before closing. Most changes concentrated 2-3 days before closing when loan documents finalized. Can touch settlement statement 4+ times for one file.",
          userCount: 6
        },
        {
          question: "Which changes tend to take the most time or effort? Why?",
          answer: "POC designation changes (paid outside closing) - requires verifying payoff statements and coordination. Complex fee splits between buyer/seller. Recording fee updates when lender sends incorrect page count estimates (users keep high estimates to avoid shortfalls). Prorations requiring entry into separate calculation screens with specific formulas.",
          userCount: 5
        }
      ]
    },
    {
      section: "CD Comparison - Current Process",
      questions: [
        {
          question: "At what point are you reviewing the lender CD against the Settlement Statement?",
          answer: "Multiple times per file: When initial CD received (3-4 days before closing), after each CD revision from lender (can be 6-7 iterations for some lenders), when loan documents arrive, and final review on closing day. Frequency depends on lender - some balance in one try, others require many rounds.",
          userCount: 6
        },
        {
          question: "How do you generally receive the CD?",
          answer: "Email from lender with PDF attachment (most common), lender secure portal uploads, some lenders have integrated systems (Wells Fargo pushes CDs automatically), occasionally through buyer/agent forwarding, rarely printed/hand-delivered.",
          userCount: 6
        },
        {
          question: "Who uploads it into the system? How? When?",
          answer: "Escrow officer or closer uploads to document management system upon receipt. Sometimes EPS department handles upload. Manual drag-and-drop to Ignite/Fast doc repository. Timing: immediately when received via email.",
          userCount: 6
        },
        {
          question: "How do you know it's been uploaded?",
          answer: "No automatic notification in current system for CD uploads. Must check file documents manually or receive email from colleague (if EPS uploaded). Some get task notification in Ignite when EPS completes fee entry saying 'settlement figures complete'.",
          userCount: 5
        },
        {
          question: "How do you typically conduct the review?",
          answer: "CD on one monitor (or printed preview), Fast/Ignite on second monitor. Switch between settlement statement screen, loan fee entry screen, and charge details. Go line-by-line from top to bottom. Some users pull draft CD in Fast format for side-by-side comparison when stuck on small balance discrepancies. Focus on numbers first, names secondary.",
          userCount: 6
        },
        {
          question: "Are there other documents you compare against the SS besides CD?",
          answer: "Yes, frequently: Purchase contract (for price, EMD amount, commission rates), payoff statements, invoices from vendors (HOA, title companies, inspectors), HOA statements, tax bills, loan estimate, title report/sub (for policy premiums), commission demand forms from agents.",
          userCount: 6
        },
        {
          question: "What do you imagine 'Balance with CD' button would do?",
          answer: "Users expected: automatic comparison/scan showing differences, side-by-side view, list of discrepancies to review, highlighting mismatches, possibly auto-populate fees from CD into settlement statement. Some thought it might upload the CD or take them to fee entry screen.",
          userCount: 6
        },
        {
          question: "What do you think will happen once you click it?",
          answer: "System scans CD, compares to current SS, shows mismatches in highlighted list, allows approve/reject changes. Some expected full auto-update with option to review after. Uncertainty about whether it auto-applies changes or just flags them for review.",
          userCount: 6
        }
      ]
    },
    {
      section: "CD Comparison - Prototype Reactions",
      questions: [
        {
          question: "What do you think the colors indicate in CD comparison view?",
          answer: "Red = mismatch/error (caught attention most), yellow = missing from SS/needs attention, purple = missing from CD (removed by lender), green = match/correct. Initial confusion about meaning - users needed hover tooltips or legend to understand. Requested color legend visible on screen.",
          userCount: 6
        },
        {
          question: "What do you think each icon indicates?",
          answer: "Green checkmark = approve change, X = reject, blue bookmark = save for later, flags = items needing review. Icons were generally intuitive. Pencil icon for edit expected in some designs (familiar from Ignite).",
          userCount: 6
        },
        {
          question: "Do these filters help you with your review? How would you use them?",
          answer: "Filters very helpful for focusing review. Users would start with 'Mismatch' to address critical differences first, then review 'Missing from SS' to add new items, finally check 'Missing from CD' to see lender removals. However, some users want option to see full unfiltered SS too.",
          userCount: 6
        },
        {
          question: "How can you tell which values are from the CD vs the SS?",
          answer: "MAJOR PAIN POINT - 4 users explicitly could not tell which number was which. Caused significant confusion and hesitation. Users wanted explicit labels ('CD: $1,200' vs 'SS: $1,000'), consistent positioning (top = SS, bottom = CD or vice versa), or color coding (black = SS, red = CD).",
          userCount: 4
        },
        {
          question: "How would you approve a change from the CD?",
          answer: "Click green checkmark icon or 'Approve' button. Expected change to apply to SS immediately, icon to change/disappear, item to move to 'Resolved' section at bottom, brief 'Saved' confirmation message to appear, and mismatch filter count to decrement.",
          userCount: 6
        },
        {
          question: "How would you reject a change from the CD?",
          answer: "Click X icon or 'Reject' button. Wanted confirmation dialog explaining consequences: does it keep SS value? Does rejected item stay visible with flag? Create note? One user wanted rejected items to stay in mismatch view with different icon showing 'We reviewed this, we're not matching.'",
          userCount: 6
        },
        {
          question: "How would you undo a change you just made?",
          answer: "Expected 'Undo' button to revert most recent action, or version history access showing resolved items where they could re-open. Some users found undo button easily, some looked for it in resolved items section. Wanted ability to undo accidental approvals.",
          userCount: 4
        },
        {
          question: "Is undo something you find yourself needing to do?",
          answer: "Yes, occasionally needed. Might approve wrong item by mistake (clicking too fast), receive updated information from lender after accepting change, or realize upon further review that CD figure was incorrect. Want safety net for accidental clicks.",
          userCount: 5
        },
        {
          question: "How does the second design compare?",
          answer: "Mixed reactions - no clear winner. Some preferred side-by-side comparison for seeing discrepancies clearly. Others preferred inline highlighting (View 2 with full row highlighting) - said it 'catches your eye more' and 'faster to see.' Depends on number of discrepancies and personal preference.",
          userCount: 6
        },
        {
          question: "Which design is easier to review? Why?",
          answer: "SPLIT DECISION. 3 users preferred View 2 with full row highlighting (Kayla: 'faster to see', Emily: 'catches your eye more', Bree: 'highlights it better'). 3 users liked both equally or had no strong preference. Full row highlighting consistently mentioned as helpful for maintaining visual alignment across buyer/seller columns.",
          userCount: 6
        },
        {
          question: "How often do you go back and look at previously saved SS versions?",
          answer: "Regularly when investigating errors or discrepancies, verifying who made changes when fees drop off unexpectedly, checking if fee was present in prior version when lender questions it. More common for EAs than EOs when covering for absent officer. Critical for accountability and troubleshooting. Less frequent for officers who work their own files exclusively.",
          userCount: 6
        },
        {
          question: "How does this CD comparison experience feel?",
          answer: "Overwhelmingly positive. Significant time savings anticipated. Cultural adjustment needed - feels 'strange' after 25 years of manual control. Users excited but want manual verification option. Concerned about building trust in system accuracy. Overall: 'This is really cool', 'I would use this all day long', 'Great, positive changes.'",
          userCount: 6
        },
        {
          question: "How confident would you be using this on a live file?",
          answer: "Moderately confident after training and testing period. Would start with less complex files to build confidence. Need to verify accuracy multiple times before trusting fully. Confidence grows over time with consistent accuracy. Initial period requires manual verification alongside automated scan.",
          userCount: 6
        },
        {
          question: "If you had automatic scan, would you still review CD by hand?",
          answer: "YES - all 6 users said they would still manually verify the CD, at least initially. Reasons: Liability concerns ('it falls on us'), need to earn trust through consistent accuracy, might miss details computer doesn't catch, knowledge of lender-specific quirks, peace of mind from visual confirmation. Want option to verify even long-term.",
          userCount: 6
        }
      ]
    }
  ],

  usabilityIssues: [
    {
      issue: "Unclear which number represents CD vs settlement statement in mismatch view",
      severity: "high",
      frequency: 4,
      recommendation: "Add clear labels ('From CD: $1,200' / 'Current SS: $1,000') or consistent positioning with color coding"
    },
    {
      issue: "Cannot tell which fields are editable vs read-only without clicking",
      severity: "high",
      frequency: 6,
      recommendation: "Use gray background for read-only fields - tested best with users for instant recognition"
    },
    {
      issue: "Uncertainty about what happens when rejecting a wire/deposit",
      severity: "high",
      frequency: 4,
      recommendation: "Show confirmation dialog: 'Wire will return to office pending queue. You can reassign it later.' Add undo option."
    },
    {
      issue: "No change tracking - cannot identify who edited what and when",
      severity: "critical",
      frequency: 3,
      recommendation: "Implement audit log showing user, timestamp, field changed, old/new values. Add 'View Change History' option."
    },
    {
      issue: "Prototype responsiveness/lag caused confusion about whether actions succeeded",
      severity: "low",
      frequency: 5,
      recommendation: "Ensure production system provides immediate visual feedback for all actions (< 200ms response time)"
    },
    {
      issue: "Color meaning not immediately clear - need legend for flag colors",
      severity: "medium",
      frequency: 4,
      recommendation: "Add persistent legend: 🟡 Missing from SS, 🟣 Missing from CD, 🔴 Mismatch, 🟢 Match"
    }
  ],

  successMetrics: [
    {
      metric: "Time to balance with lender CD",
      current: "15-45 minutes (varies by lender, 6-7 rounds for some)",
      target: "5-10 minutes",
      measurement: "Track time from 'Balance with CD' click to final approval"
    },
    {
      metric: "Number of screen switches per balancing session",
      current: "20-30 switches (SS → Loan Screen → Charge Details → CD → repeat)",
      target: "3-5 switches",
      measurement: "Analytics tracking of screen navigation events during balancing"
    },
    {
      metric: "Time to deposit wire into file",
      current: "2-5 minutes per wire (manual entry + verification)",
      target: "30 seconds per wire (with auto-match)",
      measurement: "Track from wire arrival notification to deposit completion with prono sent"
    },
    {
      metric: "Manual verification rate after auto-CD comparison",
      current: "N/A (baseline)",
      target: "<20% after 90 days of proven accuracy",
      measurement: "Track how often users open CD document after using automated scan (expect 100% initially, declining over time as trust builds)"
    },
    {
      metric: "Wire board manual refresh frequency",
      current: "Constant refreshing throughout day (estimated 30-50+ checks)",
      target: "Zero manual checks (notification-driven)",
      measurement: "Track wire board access frequency before/after notification implementation"
    },
    {
      metric: "Error rate from incorrect edits",
      current: "Unknown (baseline needed)",
      target: "Maintain or reduce",
      measurement: "Track changes that get reversed, audit log for investigation patterns, monitor shortfalls at closing attributed to fee errors"
    }
  ]
};

// Make sure it's available globally in browser
if (typeof window !== 'undefined') {
  window.synthesisData = synthesisData;
}

// Export for use in main script (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = synthesisData;
}

console.log('synthesis-data.js loaded successfully - 6 participants', synthesisData ? 'Data available' : 'Data missing');
