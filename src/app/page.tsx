'use client';
import { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('notepad');

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans p-4 md:p-8 select-none">
      {/* Premium Header */}
      <header className="text-center mb-10 mt-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-500 to-cyan-400">
          MINHAJ | LifeOS
        </h1>
        <p className="text-xs tracking-[0.3em] text-zinc-500 mt-2 uppercase">Enterprise Matrix v2.0</p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {[
            { id: 'notepad', label: 'Smart Notepad Pro', icon: '📝' },
            { id: 'wallet', label: 'Wallet Pro', icon: '💳' },
            { id: 'focus', label: 'Focus Zone', icon: '⚡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 whitespace-nowrap w-full ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                  : 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Dynamic Glassmorphic Panel Display */}
        <section className="md:col-span-3 p-6 rounded-2xl bg-zinc-950/40 backdrop-blur-xl border border-zinc-900/80 min-h-[450px] shadow-2xl">
          {activeTab === 'notepad' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h2 className="text-xl font-bold tracking-wide text-white">Smart Notepad Pro</h2>
                <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">AI Synced</span>
              </div>
              <input 
                type="text" 
                placeholder="Note Title..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <textarea 
                rows={6} 
                placeholder="Write your brilliant ideas here..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              ></textarea>
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                Save Asset
              </button>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h2 className="text-xl font-bold tracking-wide text-white">Wallet Pro Ledger</h2>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Double-Entry</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">Total Net Worth</p>
                  <p className="text-lg md:text-2xl font-black text-cyan-400 mt-1">৳0.00</p>
                </div>
                <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">Personal Wallet</p>
                  <p className="text-lg md:text-2xl font-black text-white mt-1">৳0.00</p>
                </div>
                <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">Affinity Sales</p>
                  <p className="text-lg md:text-2xl font-black text-emerald-400 mt-1">৳0.00</p>
                </div>
              </div>
              <div className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-xl text-center text-xs text-zinc-600 italic">
                No recent transactions detected in Ledger.
              </div>
            </div>
          )}

          {activeTab === 'focus' && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-fadeIn">
              <div className="w-44 h-44 rounded-full border-4 border-zinc-800 border-t-cyan-400 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.05)] animate-spin-slow">
                <span className="text-3xl font-black tracking-wider text-white">25:00</span>
                <span className="text-[10px] uppercase text-zinc-500 tracking-widest mt-1">Work Block</span>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold rounded-xl transition-all">
                  Start Session
                </button>
                <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold rounded-xl transition-all text-zinc-500">
                  Reset
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
