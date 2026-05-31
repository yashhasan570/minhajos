\# Project Specification: MINHAJ LifeOS



\## 1. UI/UX Architecture (Elite Cyberpunk Minimalist)

\- \*\*Background:\*\* Pure Pitch Black (`#000000`) for OLED screens.

\- \*\*Accents:\*\* Royal Blue (`#4169E1`) and Electric Neon Cyan for tech/highlight elements.

\- \*\*Cards \& Boxes:\*\* Translucent dark glassmorphism look (Semi-transparent with subtle borders and heavy background blurs).

\- \*\*Animations:\*\* Smooth scale-up transitions on card hover, glowing border effects, and clean slide-in animations for screens.

\- \*\*Layout:\*\* Responsive single-column grid optimized for mobile and desktop screens.



\## 2. Core Functional Modules \& Logic



\### Module 1: Smart Notepad Pro

\- \*\*Interface:\*\* Card-based feed displaying saved notes instead of plain text.

\- \*\*Features:\*\* Tag filtering (Personal, Work, Idea) and absolute timestamps (e.g., "31 May 2026, 11:30 PM").

\- \*\*AI Integration:\*\* Connect to Gemini AI for "AI Polish" with a glowing skeleton loading state during processing.

\- \*\*Safety:\*\* An explicit "Undo" system to revert AI changes.



\### Module 4: Wallet Pro

\- \*\*Interface:\*\* Separate dynamic dashboards for "Personal Wallet" and "Affinity Sales Business Wallet".

\- \*\*Features:\*\* Dynamic progress bars for expense limits, calculated net profit cards, and clear green/red color coding for Income/Expense.



\### Module 6: Focus Zone

\- \*\*Interface:\*\* Beautiful circular visual countdown timer for Pomodoro sessions (25 min work / 5 min break).

\- \*\*Features:\*\* A "Brain Dump" textarea that saves distractions locally without breaking the user's current focus session.



\## 3. Code Quality Requirements

\- Eliminate the generic, shared `saveData` engine to prevent data corruption.

\- Implement strictly isolated, robust CRUD controllers/functions for each individual module.

\- Ensure all states sync perfectly with browser `localStorage`.

