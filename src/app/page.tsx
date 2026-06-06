'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// --- Global Theme & Design Constants ---
const BASE_BG_COLOR = 'bg-black'; // OLED Pitch Black
const ACCENT_ROYAL_BLUE = 'text-[#4169E1]'; // Neon Tech Royal Blue
const ACCENT_ROYAL_BLUE_BG = 'bg-[#4169E1]';
const ACCENT_ROYAL_BLUE_BORDER = 'border-[#4169E1]';
const HIGHLIGHT_CYAN = 'text-[#00f2fe]'; // Electric Cyberpunk Cyan
const HIGHLIGHT_CYAN_BG = 'bg-[#00f2fe]';
const HIGHLIGHT_CYAN_BORDER = 'border-[#00f2fe]';
const GLASS_STYLE = 'bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg border border-opacity-10 border-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out';
const SKELETON_CLASS = 'animate-pulse bg-gray-800 rounded-md'; // Darker skeleton for OLED theme
const INCOME_COLOR = 'text-green-500';
const EXPENSE_COLOR = 'text-red-500';

// --- Data Structures (Interfaces/Types) ---

// Smart Notepad Pro
type NoteCategory = 'Personal' | 'Work' | 'Idea';
interface Note {
  id: string;
  title: string;
  category: NoteCategory;
  content: string;
  timestamp: string;
}

// Wallet Pro
type TransactionType = 'income' | 'expense';
type LedgerType = 'personal' | 'affinity';
interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: TransactionType;
  ledger: LedgerType;
  timestamp: string;
}

// Iman Tracker
interface ImanLogEntry {
  date: string; // YYYY-MM-DD
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  morningAdhkar: boolean;
  eveningAdhkar: boolean;
  quran: boolean;
}
const PRAYER_TIMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Morning Adhkar', 'Evening Adhkar', 'Quran'];


// Study Hub
type GradeTier = 'HD' | 'D' | 'C' | 'P' | 'F'; // High Distinction, Distinction, Credit, Pass, Fail
interface HSCSubject {
  id: string;
  name: string;
  score: number; // Percentage
  grade: GradeTier;
}

// Vision Board
interface Goal {
  id: string;
  name: string;
  targetDate: string; // YYYY-MM-DD
}

// Skill Lab & Social
type CampaignStatus = 'Draft' | 'Scheduled' | 'Published';
interface ContentCampaign {
  id: string;
  title: string;
  status: CampaignStatus;
  scheduledDate: string | null;
  content: string;
}


// --- Main Page Component ---
export default function HomePage() {
  // --- Module 1: Smart Notepad Pro State ---
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Brainstorm new project ideas', category: 'Idea', content: 'Explore AI-driven features for Minhaj LifeOS, focusing on predictive analytics for task management.', timestamp: new Date().toISOString() },
    { id: '2', title: 'Meeting notes - Q3 Review', category: 'Work', content: 'Discussed performance metrics and identified key areas for improvement in sales and marketing. Follow-up with John.', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', title: 'Grocery List', category: 'Personal', content: 'Milk, Eggs, Bread, Spinach, Chicken Breast, Olive Oil.', timestamp: new Date(Date.now() - 7200000).toISOString() },
  ]);
  const [activeNoteFilter, setActiveNoteFilter] = useState<NoteCategory | 'All'>('All');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<NoteCategory>('Personal');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAIPolishing, setIsAIPolishing] = useState(false);
  const [aiUndoStack, setAiUndoStack] = useState<Note[]>([]); // Stores previous state for undo

  // --- Module 4: Wallet Pro State ---
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't1', amount: 2500, description: 'Salary Deposit', type: 'income', ledger: 'personal', timestamp: new Date().toISOString() },
    { id: 't2', amount: 120, description: 'Groceries', type: 'expense', ledger: 'personal', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 't3', amount: 500, description: 'Software License Sale', type: 'income', ledger: 'affinity', timestamp: new Date(Date.now() - 172800000).toISOString() },
    { id: 't4', amount: 80, description: 'Internet Bill', type: 'expense', ledger: 'personal', timestamp: new Date(Date.now() - 259200000).toISOString() },
    { id: 't5', amount: 300, description: 'Marketing Campaign Expense', type: 'expense', ledger: 'affinity', timestamp: new Date(Date.now() - 345600000).toISOString() },
  ]);
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const [newTransactionType, setNewTransactionType] = useState<TransactionType>('income');
  const [newTransactionLedger, setNewTransactionLedger] = useState<LedgerType>('personal');

  // --- Module 6: Focus Zone Engine State ---
  const POMODORO_WORK_TIME = 25 * 60; // 25 minutes in seconds
  const POMODORO_BREAK_TIME = 5 * 60; // 5 minutes in seconds
  const [timerSeconds, setTimerSeconds] = useState(POMODORO_WORK_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true); // true for work, false for break
  const [brainDumpContent, setBrainDumpContent] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Extended Modules State ---

  // Iman Tracker
  const [imanLog, setImanLog] = useState<ImanLogEntry[]>([
    { date: '2023-10-26', fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true, morningAdhkar: true, eveningAdhkar: true, quran: true },
    { date: '2023-10-25', fajr: true, dhuhr: true, asr: false, maghrib: true, isha: true, morningAdhkar: true, eveningAdhkar: false, quran: true },
  ]);
  const [selectedImanDate, setSelectedImanDate] = useState(new Date().toISOString().split('T')[0]);

  // Study Hub
  const [hscSubjects, setHscSubjects] = useState<HSCSubject[]>([
    { id: 's1', name: 'Advanced Mathematics', score: 92, grade: 'HD' },
    { id: 's2', name: 'Physics', score: 85, grade: 'D' },
    { id: 's3', name: 'English Extension 1', score: 78, grade: 'C' },
    { id: 's4', name: 'Chemistry', score: 62, grade: 'P' },
  ]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectScore, setNewSubjectScore] = useState('');

  // Vision Board
  const [goals, setGoals] = useState<Goal[]>([
    { id: 'g1', name: 'Complete Minhaj v1.0', targetDate: '2024-03-15' },
    { id: 'g2', name: 'Launch Personal Blog', targetDate: '2023-12-31' },
  ]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTargetDate, setNewGoalTargetDate] = useState('');

  // Skill Lab & Social
  const [streaks, setStreaks] = useState<Record<string, number>>({
    'Coding Challenge': 7,
    'Daily Reading': 14,
  });
  const [newStreakName, setNewStreakName] = useState('');
  const [campaigns, setCampaigns] = useState<ContentCampaign[]>([
    { id: 'c1', title: 'Minhaj LifeOS Launch Announcement', status: 'Published', scheduledDate: '2023-10-20', content: 'Excited to announce the official launch of Minhaj LifeOS! Experience productivity reimagined.' },
    { id: 'c2', title: 'Q4 Feature Rollout Plan', status: 'Scheduled', scheduledDate: '2023-11-10', content: 'New features including enhanced AI integrations and custom dashboard options coming soon.' },
    { id: 'c3', title: 'Community Feedback Survey', status: 'Draft', scheduledDate: null, content: 'Gathering insights from our early adopters to shape the future of Minhaj LifeOS.' },
  ]);
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignContent, setNewCampaignContent] = useState('');
  const [newCampaignStatus, setNewCampaignStatus] = useState<CampaignStatus>('Draft');
  const [newCampaignScheduledDate, setNewCampaignScheduledDate] = useState('');


  // --- Helper Functions ---

  const generateId = useCallback(() => Math.random().toString(36).substring(2, 11), []);

  const formatTimestamp = useCallback((isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, []);

  const calculateGrade = useCallback((score: number): GradeTier => {
    if (score >= 90) return 'HD';
    if (score >= 80) return 'D';
    if (score >= 70) return 'C';
    if (score >= 50) return 'P';
    return 'F';
  }, []);

  const getGradeColor = useCallback((grade: GradeTier) => {
    switch (grade) {
      case 'HD': return 'text-purple-400';
      case 'D': return HIGHLIGHT_CYAN;
      case 'C': return ACCENT_ROYAL_BLUE;
      case 'P': return 'text-yellow-400';
      case 'F': return EXPENSE_COLOR;
      default: return 'text-white';
    }
  }, []);

  // --- Module 1: Smart Notepad Pro Logic ---

  const filteredNotes = useMemo(() => {
    if (activeNoteFilter === 'All') {
      return notes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return notes.filter(note => note.category === activeNoteFilter)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [notes, activeNoteFilter]);

  const handleAddNote = useCallback(() => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote: Note = {
        id: generateId(),
        title: newNoteTitle,
        category: newNoteCategory,
        content: newNoteContent,
        timestamp: new Date().toISOString(),
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNoteCategory('Personal'); // Reset to default
    }
  }, [newNoteTitle, newNoteCategory, newNoteContent, generateId]);

  const handleDeleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, []);

  const handleAIModifyNote = useCallback(async (id: string) => {
    setIsAIPolishing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    setNotes(prevNotes => {
      const noteToModify = prevNotes.find(note => note.id === id);
      if (noteToModify) {
        setAiUndoStack(prevStack => [...prevStack, { ...noteToModify }]); // Save current state for undo
        const modifiedContent = `[AI POLISHED] ${noteToModify.content.split(' ').slice(0, 10).join(' ')}... This content has been synthetically enhanced for clarity and brevity.`;
        return prevNotes.map(note =>
          note.id === id ? { ...note, content: modifiedContent, title: `AI: ${note.title}` } : note
        );
      }
      return prevNotes;
    });
    setIsAIPolishing(false);
  }, []);

  const handleUndoAIMode = useCallback(() => {
    if (aiUndoStack.length > 0) {
      const lastModifiedNote = aiUndoStack[aiUndoStack.length - 1];
      setNotes(prevNotes =>
        prevNotes.map(note => (note.id === lastModifiedNote.id ? lastModifiedNote : note))
      );
      setAiUndoStack(prevStack => prevStack.slice(0, -1)); // Remove from stack
    }
  }, [aiUndoStack]);

  // --- Module 4: Wallet Pro Logic ---

  const handleAddTransaction = useCallback(() => {
    const amount = parseFloat(newTransactionAmount);
    if (newTransactionDescription.trim() && !isNaN(amount) && amount > 0) {
      const newTransaction: Transaction = {
        id: generateId(),
        amount: amount,
        description: newTransactionDescription,
        type: newTransactionType,
        ledger: newTransactionLedger,
        timestamp: new Date().toISOString(),
      };
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      setNewTransactionAmount('');
      setNewTransactionDescription('');
      setNewTransactionType('income');
      setNewTransactionLedger('personal');
    }
  }, [newTransactionAmount, newTransactionDescription, newTransactionType, newTransactionLedger, generateId]);

  const { personalBalance, affinityProfit, netWorth } = useMemo(() => {
    let personalIncome = 0;
    let personalExpense = 0;
    let affinityIncome = 0;
    let affinityExpense = 0;

    transactions.forEach(t => {
      if (t.ledger === 'personal') {
        if (t.type === 'income') personalIncome += t.amount;
        else personalExpense += t.amount;
      } else { // affinity
        if (t.type === 'income') affinityIncome += t.amount;
        else affinityExpense += t.amount;
      }
    });

    const personalBalance = personalIncome - personalExpense;
    const affinityProfit = affinityIncome - affinityExpense;
    const netWorth = personalBalance + affinityProfit;

    return { personalBalance, affinityProfit, netWorth };
  }, [transactions]);

  // --- Module 6: Focus Zone Engine Logic ---

  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(timerRef.current!);
      // Switch session type
      setIsWorkSession(prev => !prev);
      setTimerSeconds(isWorkSession ? POMODORO_BREAK_TIME : POMODORO_WORK_TIME);
      setIsTimerRunning(false); // Optionally pause after session completion
      alert(`Time for a ${isWorkSession ? 'break' : 'work'} session!`);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds, isWorkSession]);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current!);
    setIsTimerRunning(false);
    setIsWorkSession(true);
    setTimerSeconds(POMODORO_WORK_TIME);
  }, []);

  const formatTime = useCallback((totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const timerProgress = useMemo(() => {
    const total = isWorkSession ? POMODORO_WORK_TIME : POMODORO_BREAK_TIME;
    return (timerSeconds / total) * 100;
  }, [timerSeconds, isWorkSession]);

  // --- Extended Modules Logic ---

  // Iman Tracker
  const currentImanLog = useMemo(() => {
    return imanLog.find(log => log.date === selectedImanDate) || {
      date: selectedImanDate,
      fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false,
      morningAdhkar: false, eveningAdhkar: false, quran: false,
    };
  }, [imanLog, selectedImanDate]);

  const handleImanLogToggle = useCallback((prayerKey: keyof Omit<ImanLogEntry, 'date'>) => {
    setImanLog(prevLog => {
      const existingEntryIndex = prevLog.findIndex(log => log.date === selectedImanDate);
      if (existingEntryIndex > -1) {
        return prevLog.map((log, index) =>
          index === existingEntryIndex
            ? { ...log, [prayerKey]: !log[prayerKey] }
            : log
        );
      } else {
        const newEntry: ImanLogEntry = {
          date: selectedImanDate,
          fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false,
          morningAdhkar: false, eveningAdhkar: false, quran: false,
          [prayerKey]: true,
        };
        return [...prevLog, newEntry];
      }
    });
  }, [selectedImanDate]);

  const getPrayerStatus = useCallback((date: string, prayerKey: keyof Omit<ImanLogEntry, 'date'>) => {
    const logEntry = imanLog.find(log => log.date === date);
    return logEntry ? logEntry[prayerKey] : false;
  }, [imanLog]);

  const calculateImanStreak = useCallback((prayerKey: keyof Omit<ImanLogEntry, 'date'>) => {
    let streak = 0;
    let currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      const entry = imanLog.find(log => log.date === dateString);
      if (entry && entry[prayerKey]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (entry && !entry[prayerKey]) {
        break; // Streak broken
      } else if (!entry && currentDate.getTime() < new Date().getTime()) {
        break; // No entry, but date is in the past, so streak broken
      } else {
        // Date is in future or no relevant history yet
        break;
      }
    }
    return streak;
  }, [imanLog]);


  // Study Hub
  const handleAddSubject = useCallback(() => {
    const score = parseFloat(newSubjectScore);
    if (newSubjectName.trim() && !isNaN(score) && score >= 0 && score <= 100) {
      const newSubject: HSCSubject = {
        id: generateId(),
        name: newSubjectName,
        score: score,
        grade: calculateGrade(score),
      };
      setHscSubjects(prev => [...prev, newSubject]);
      setNewSubjectName('');
      setNewSubjectScore('');
    }
  }, [newSubjectName, newSubjectScore, generateId, calculateGrade]);

  const handleDeleteSubject = useCallback((id: string) => {
    setHscSubjects(prev => prev.filter(sub => sub.id !== id));
  }, []);

  // Vision Board
  const handleAddGoal = useCallback(() => {
    if (newGoalName.trim() && newGoalTargetDate) {
      const newGoal: Goal = {
        id: generateId(),
        name: newGoalName,
        targetDate: newGoalTargetDate,
      };
      setGoals(prev => [...prev, newGoal]);
      setNewGoalName('');
      setNewGoalTargetDate('');
    }
  }, [newGoalName, newGoalTargetDate, generateId]);

  const calculateDaysRemaining = useCallback((targetDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0); // Normalize target to start of day

    const diffTime = target.getTime() - today.getTime();
    if (diffTime < 0) return 0; // Target date is in the past
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const handleDeleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  }, []);

  // Skill Lab & Social
  const handleIncrementStreak = useCallback((name: string) => {
    setStreaks(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  }, []);

  const handleAddStreak = useCallback(() => {
    if (newStreakName.trim()) {
      setStreaks(prev => ({ ...prev, [newStreakName]: 0 }));
      setNewStreakName('');
    }
  }, [newStreakName]);

  const handleAddCampaign = useCallback(() => {
    if (newCampaignTitle.trim() && newCampaignContent.trim()) {
      const newCampaign: ContentCampaign = {
        id: generateId(),
        title: newCampaignTitle,
        content: newCampaignContent,
        status: newCampaignStatus,
        scheduledDate: newCampaignStatus === 'Scheduled' && newCampaignScheduledDate ? new Date(newCampaignScheduledDate).toISOString() : null,
      };
      setCampaigns(prev => [...prev, newCampaign]);
      setNewCampaignTitle('');
      setNewCampaignContent('');
      setNewCampaignStatus('Draft');
      setNewCampaignScheduledDate('');
    }
  }, [newCampaignTitle, newCampaignContent, newCampaignStatus, newCampaignScheduledDate, generateId]);

  const handleDeleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  }, []);

  return (
    <div className={`${BASE_BG_COLOR} min-h-screen text-white p-8 font-mono`}>
      <h1 className={`text-5xl font-extrabold text-center mb-12 ${HIGHLIGHT_CYAN} drop-shadow-[0_0_10px_rgba(0,242,254,0.7)]`}>
        Minhaj | LifeOS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Module 1: Smart Notepad Pro */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Smart Notepad Pro</h2>

          {/* New Note Input */}
          <div className="mb-8 p-4 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg">
            <input
              type="text"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Note Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <textarea
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg min-h-[80px]"
              placeholder="Note Content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
            ></textarea>
            <select
              className="w-full p-3 mb-4 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
              value={newNoteCategory}
              onChange={(e) => setNewNoteCategory(e.target.value as NoteCategory)}
            >
              <option className="bg-gray-900 text-white" value="Personal">Personal</option>
              <option className="bg-gray-900 text-white" value="Work">Work</option>
              <option className="bg-gray-900 text-white" value="Idea">Idea</option>
            </select>
            <button
              onClick={handleAddNote}
              className={`w-full ${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG} text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              Add Note
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Personal', 'Work', 'Idea'].map(category => (
              <button
                key={category}
                onClick={() => setActiveNoteFilter(category as NoteCategory | 'All')}
                className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out
                  ${activeNoteFilter === category
                    ? `${HIGHLIGHT_CYAN_BG} text-black transform scale-105`
                    : `bg-gray-800 text-gray-300 hover:bg-gray-700`
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 gap-4">
            {isAIPolishing && (
              <div className={`${SKELETON_CLASS} h-32 mb-4 p-4 flex flex-col justify-between`}>
                <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 w-full bg-gray-700 rounded"></div>
              </div>
            )}
            {aiUndoStack.length > 0 && (
              <button
                onClick={handleUndoAIMode}
                className={`w-full ${HIGHLIGHT_CYAN_BG} text-black font-bold py-2 px-4 rounded-md mb-4 transition-all duration-200 ease-in-out transform hover:scale-105`}
              >
                Undo AI Modification
              </button>
            )}
            {filteredNotes.map(note => (
              <div key={note.id} className={`${GLASS_STYLE} p-4 hover:scale-[1.01] flex flex-col justify-between`}>
                <div>
                  <h3 className={`text-xl font-semibold ${ACCENT_ROYAL_BLUE} mb-2`}>{note.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{note.content}</p>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{note.category} | {formatTimestamp(note.timestamp)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAIModifyNote(note.id)}
                      className={`text-xs px-3 py-1 rounded-full ${HIGHLIGHT_CYAN_BG} text-black hover:opacity-80 transition-opacity duration-200`}
                      disabled={isAIPolishing}
                    >
                      {isAIPolishing ? 'AI Polishing...' : 'AI Polish'}
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-xs px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredNotes.length === 0 && !isAIPolishing && (
              <p className="text-gray-500 text-center mt-4">No notes found for this category.</p>
            )}
          </div>
        </section>

        {/* Module 4: Wallet Pro */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Wallet Pro (FinTech)</h2>

          {/* Metrics Boards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className={`${GLASS_STYLE} p-3 text-center`}>
              <p className="text-sm text-gray-400">Net Worth</p>
              <p className={`text-2xl font-bold ${HIGHLIGHT_CYAN}`}>${netWorth.toFixed(2)}</p>
            </div>
            <div className={`${GLASS_STYLE} p-3 text-center`}>
              <p className="text-sm text-gray-400">Personal Balance</p>
              <p className={`text-2xl font-bold ${personalBalance >= 0 ? INCOME_COLOR : EXPENSE_COLOR}`}>${personalBalance.toFixed(2)}</p>
            </div>
            <div className={`${GLASS_STYLE} p-3 text-center`}>
              <p className="text-sm text-gray-400">Affinity Sales Profit</p>
              <p className={`text-2xl font-bold ${affinityProfit >= 0 ? INCOME_COLOR : EXPENSE_COLOR}`}>${affinityProfit.toFixed(2)}</p>
            </div>
          </div>

          {/* Add Transaction */}
          <div className="mb-8 p-4 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg">
            <input
              type="number"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Amount"
              value={newTransactionAmount}
              onChange={(e) => setNewTransactionAmount(e.target.value)}
              min="0.01"
              step="0.01"
            />
            <input
              type="text"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Description"
              value={newTransactionDescription}
              onChange={(e) => setNewTransactionDescription(e.target.value)}
            />
            <div className="flex gap-4 mb-3">
              <select
                className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
                value={newTransactionType}
                onChange={(e) => setNewTransactionType(e.target.value as TransactionType)}
              >
                <option className="bg-gray-900 text-white" value="income">Income</option>
                <option className="bg-gray-900 text-white" value="expense">Expense</option>
              </select>
              <select
                className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
                value={newTransactionLedger}
                onChange={(e) => setNewTransactionLedger(e.target.value as LedgerType)}
              >
                <option className="bg-gray-900 text-white" value="personal">Personal Wallet</option>
                <option className="bg-gray-900 text-white" value="affinity">Affinity Sales</option>
              </select>
            </div>
            <button
              onClick={handleAddTransaction}
              className={`w-full ${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG} text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              Add Transaction
            </button>
          </div>

          {/* Transactions List */}
          <h3 className={`text-xl font-semibold mb-4 ${HIGHLIGHT_CYAN}`}>Recent Transactions</h3>
          <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(t => (
              <div key={t.id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-b-0">
                <div>
                  <p className="text-gray-200 text-sm">{t.description}</p>
                  <p className="text-xs text-gray-500">{t.ledger === 'personal' ? 'Personal' : 'Affinity'} | {formatTimestamp(t.timestamp)}</p>
                </div>
                <p className={`text-lg font-bold ${t.type === 'income' ? INCOME_COLOR : EXPENSE_COLOR}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </p>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No transactions recorded.</p>
            )}
          </div>
        </section>

        {/* Module 6: Focus Zone Engine */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Focus Zone Engine</h2>

          {/* Pomodoro Timer */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-gray-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="70"
                cx="96"
                cy="96"
              />
              <circle
                className={`${isWorkSession ? ACCENT_ROYAL_BLUE : HIGHLIGHT_CYAN}`}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={(2 * Math.PI * 70) * (1 - timerProgress / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="70"
                cx="96"
                cy="96"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-5xl font-extrabold ${HIGHLIGHT_CYAN}`}>{formatTime(timerSeconds)}</p>
              <p className="text-sm text-gray-400">{isWorkSession ? 'Work Session' : 'Break Time'}</p>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={toggleTimer}
              className={`${isTimerRunning ? 'bg-red-600 hover:bg-red-700' : `${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG}`} text-white font-bold py-2 px-5 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Reset
            </button>
          </div>

          {/* Brain Dump Container */}
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${HIGHLIGHT_CYAN}`}>Brain Dump</h3>
            <textarea
              className="w-full p-3 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg text-white min-h-[120px] focus:border-cyan-500 outline-none transition-all duration-200"
              placeholder="Jot down thoughts without breaking focus..."
              value={brainDumpContent}
              onChange={(e) => setBrainDumpContent(e.target.value)}
            ></textarea>
          </div>
        </section>

        {/* Extended Module 2: Iman Tracker */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Iman Tracker</h2>

          <div className="mb-6">
            <label htmlFor="imanDate" className="block text-gray-400 text-sm mb-2">Select Date:</label>
            <input
              type="date"
              id="imanDate"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
              value={selectedImanDate}
              onChange={(e) => setSelectedImanDate(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.keys(currentImanLog).filter(key => key !== 'date').map(prayerKey => (
              <div key={prayerKey} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">{prayerKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                <button
                  onClick={() => handleImanLogToggle(prayerKey as keyof Omit<ImanLogEntry, 'date'>)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    currentImanLog[prayerKey as keyof Omit<ImanLogEntry, 'date'>] ? HIGHLIGHT_CYAN_BG : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      currentImanLog[prayerKey as keyof Omit<ImanLogEntry, 'date'>] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <h3 className={`text-xl font-semibold mb-4 ${HIGHLIGHT_CYAN}`}>Streaks</h3>
          <div className="grid grid-cols-2 gap-4">
            {PRAYER_TIMES.map(prayer => {
              const key = prayer.replace(/\s/g, '') as keyof Omit<ImanLogEntry, 'date'>;
              const streak = calculateImanStreak(key);
              return (
                <div key={key} className={`${GLASS_STYLE} p-3 text-center`}>
                  <p className="text-sm text-gray-400">{prayer}</p>
                  <p className={`text-2xl font-bold ${streak > 0 ? HIGHLIGHT_CYAN : 'text-gray-500'}`}>{streak} days</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Extended Module 3: Study Hub */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Study Hub (HSC 2026)</h2>

          {/* Add Subject */}
          <div className="mb-8 p-4 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg">
            <input
              type="text"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Subject Name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-3 mb-4 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Score (0-100)"
              value={newSubjectScore}
              onChange={(e) => setNewSubjectScore(e.target.value)}
              min="0"
              max="100"
            />
            <button
              onClick={handleAddSubject}
              className={`w-full ${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG} text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              Add Subject
            </button>
          </div>

          {/* Subject List */}
          <h3 className={`text-xl font-semibold mb-4 ${HIGHLIGHT_CYAN}`}>Performance Log</h3>
          <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {hscSubjects.map(subject => (
              <div key={subject.id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-b-0">
                <div>
                  <p className="text-gray-200 text-sm">{subject.name}</p>
                  <p className={`text-xs font-semibold ${getGradeColor(subject.grade)}`}>{subject.grade}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-gray-100">{subject.score}%</p>
                  <button
                    onClick={() => handleDeleteSubject(subject.id)}
                    className="text-sm px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            {hscSubjects.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No subjects added.</p>
            )}
          </div>
        </section>

        {/* Extended Module 5: Vision Board */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Vision Board</h2>

          {/* Add Goal */}
          <div className="mb-8 p-4 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg">
            <input
              type="text"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Goal Name"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
            />
            <label htmlFor="targetDate" className="block text-gray-400 text-sm mb-2">Target Date:</label>
            <input
              type="date"
              id="targetDate"
              className="w-full p-3 mb-4 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
              value={newGoalTargetDate}
              onChange={(e) => setNewGoalTargetDate(e.target.value)}
            />
            <button
              onClick={handleAddGoal}
              className={`w-full ${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG} text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              Add Goal
            </button>
          </div>

          {/* Goals List */}
          <h3 className={`text-xl font-semibold mb-4 ${HIGHLIGHT_CYAN}`}>Current Goals</h3>
          <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {goals.map(goal => {
              const daysRemaining = calculateDaysRemaining(goal.targetDate);
              const isOverdue = daysRemaining === 0 && new Date(goal.targetDate).getTime() < new Date().getTime();
              return (
                <div key={goal.id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-b-0">
                  <div>
                    <p className="text-gray-200 text-sm">{goal.name}</p>
                    <p className="text-xs text-gray-500">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`text-lg font-bold ${daysRemaining > 0 ? HIGHLIGHT_CYAN : (isOverdue ? EXPENSE_COLOR : 'text-gray-500')}`}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : (isOverdue ? 'Overdue' : 'Today')}
                    </p>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-sm px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
            {goals.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No goals set.</p>
            )}
          </div>
        </section>

        {/* Extended Module: Skill Lab & Social (Placeholder with some functionality) */}
        <section className={`${GLASS_STYLE} hover:scale-[1.01] transition-transform duration-300`}>
          <h2 className={`text-3xl font-bold mb-6 ${ACCENT_ROYAL_BLUE}`}>Skill Lab & Social</h2>

          {/* Automated Streak Builders */}
          <div className="mb-8 p-4 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg">
            <h3 className={`text-xl font-semibold mb-3 ${HIGHLIGHT_CYAN}`}>Streaks</h3>
            <input
              type="text"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="New Streak Name"
              value={newStreakName}
              onChange={(e) => setNewStreakName(e.target.value)}
            />
            <button
              onClick={handleAddStreak}
              className={`w-full ${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG} text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 mb-4`}
            >
              Add New Streak
            </button>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(streaks).map(([name, count]) => (
                <div key={name} className={`${GLASS_STYLE} p-3 text-center flex flex-col items-center justify-center`}>
                  <p className="text-sm text-gray-400">{name}</p>
                  <p className={`text-3xl font-bold ${HIGHLIGHT_CYAN}`}>{count}</p>
                  <p className="text-xs text-gray-500">days</p>
                  <button
                    onClick={() => handleIncrementStreak(name)}
                    className="mt-2 text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                  >
                    +1 Day
                  </button>
                </div>
              ))}
              {Object.keys(streaks).length === 0 && (
                <p className="text-gray-500 text-center mt-4 col-span-2">No streaks added.</p>
              )}
            </div>
          </div>

          {/* Dynamic Content Campaign Planners */}
          <div className="mb-8 p-4 bg-white bg-opacity-5 border border-opacity-10 border-white rounded-lg">
            <h3 className={`text-xl font-semibold mb-3 ${HIGHLIGHT_CYAN}`}>Content Campaigns</h3>
            <input
              type="text"
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg"
              placeholder="Campaign Title"
              value={newCampaignTitle}
              onChange={(e) => setNewCampaignTitle(e.target.value)}
            />
            <textarea
              className="w-full p-3 mb-3 bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white text-lg min-h-[80px]"
              placeholder="Campaign Content"
              value={newCampaignContent}
              onChange={(e) => setNewCampaignContent(e.target.value)}
            ></textarea>
            <select
              className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
              value={newCampaignStatus}
              onChange={(e) => setNewCampaignStatus(e.target.value as CampaignStatus)}
            >
              <option className="bg-gray-900 text-white" value="Draft">Draft</option>
              <option className="bg-gray-900 text-white" value="Scheduled">Scheduled</option>
              <option className="bg-gray-900 text-white" value="Published">Published</option>
            </select>
            {newCampaignStatus === 'Scheduled' && (
              <input
                type="date"
                className="w-full p-3 mb-4 bg-gray-900 border border-gray-700 rounded-md text-white text-lg appearance-none"
                value={newCampaignScheduledDate}
                onChange={(e) => setNewCampaignScheduledDate(e.target.value)}
              />
            )}
            <button
              onClick={handleAddCampaign}
              className={`w-full ${ACCENT_ROYAL_BLUE_BG} hover:${HIGHLIGHT_CYAN_BG} text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              Add Campaign
            </button>
          </div>

          {/* Campaigns List */}
          <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {campaigns.sort((a, b) => {
              if (a.status === 'Scheduled' && b.status !== 'Scheduled') return -1;
              if (a.status !== 'Scheduled' && b.status === 'Scheduled') return 1;
              if (a.status === 'Draft' && b.status !== 'Draft') return 1;
              if (a.status !== 'Draft' && b.status === 'Draft') return -1;
              return 0;
            }).map(campaign => (
              <div key={campaign.id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-b-0">
                <div>
                  <p className="text-gray-200 text-sm">{campaign.title}</p>
                  <p className="text-xs text-gray-500">{campaign.status} {campaign.scheduledDate ? `on ${new Date(campaign.scheduledDate).toLocaleDateString()}` : ''}</p>
                </div>
                <button
                  onClick={() => handleDeleteCampaign(campaign.id)}
                  className="text-sm px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  X
                </button>
              </div>
            ))}
            {campaigns.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No campaigns created.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}