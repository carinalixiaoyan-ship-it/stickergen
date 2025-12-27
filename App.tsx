
import React, { useState, useEffect } from 'react';
import { PHRASES, CATEGORIES, CATEGORY_ICONS } from './constants';
import { AppMode, Progress } from './types';
import Layout from './components/Layout';
import QuizMode from './components/QuizMode';
import PracticeMode from './components/PracticeMode';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>({
    masteredIds: [],
    currentCategory: null,
    streak: 3,
    lastVisit: new Date().toISOString()
  });

  const activePhrases = currentCategory 
    ? PHRASES.filter(p => p.category === currentCategory)
    : PHRASES;

  const masteredCount = progress.masteredIds.length;
  const totalCount = PHRASES.length;
  const progressPercent = Math.round((masteredCount / totalCount) * 100);

  const handleMastered = (ids: number[]) => {
    setProgress(prev => ({
      ...prev,
      masteredIds: Array.from(new Set([...prev.masteredIds, ...ids]))
    }));
  };

  const renderContent = () => {
    switch (mode) {
      case AppMode.DASHBOARD:
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Hello, Master!</h2>
                  <p className="opacity-90 mb-6">You've mastered {masteredCount} out of {totalCount} daily phrases.</p>
                  <button 
                    onClick={() => {
                        setMode(AppMode.QUIZ);
                        setCurrentCategory(null);
                    }}
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                  >
                    Quick Quiz
                  </button>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z"/>
                  </svg>
               </div>
            </div>

            <div>
               <h3 className="text-xl font-bold text-slate-800 mb-4">学习分类</h3>
               <div className="grid grid-cols-2 gap-4">
                 {CATEGORIES.map(cat => {
                   const catPhrases = PHRASES.filter(p => p.category === cat);
                   const catMastered = catPhrases.filter(p => progress.masteredIds.includes(p.id)).length;
                   const perc = Math.round((catMastered / catPhrases.length) * 100);

                   return (
                     <button
                       key={cat}
                       onClick={() => {
                         setCurrentCategory(cat);
                         setMode(AppMode.LEARN);
                       }}
                       className="group p-6 bg-white border-2 border-slate-100 rounded-3xl text-left hover:border-blue-400 hover:shadow-lg transition-all"
                     >
                       <span className="text-3xl mb-3 block">{CATEGORY_ICONS[cat]}</span>
                       <h4 className="font-bold text-slate-800 group-hover:text-blue-600">{cat}</h4>
                       <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                         {catPhrases.length} PHRASES
                       </p>
                       <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="bg-blue-400 h-1.5 rounded-full" 
                            style={{ width: `${perc}%` }}
                          ></div>
                       </div>
                     </button>
                   );
                 })}
               </div>
            </div>
          </div>
        );

      case AppMode.LEARN:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{currentCategory}</h2>
              <button 
                onClick={() => setMode(AppMode.PRACTICE)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-200"
              >
                AI Practice Mode
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {activePhrases.map(p => (
                <div key={p.id} className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:bg-slate-50">
                  <div>
                    <p className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{p.english}</p>
                    <p className="text-slate-500 mt-1">{p.chinese}</p>
                  </div>
                  <button 
                    onClick={() => {
                        // In a real app, this would play audio
                        const msg = new SpeechSynthesisUtterance(p.english);
                        msg.lang = 'en-US';
                        window.speechSynthesis.speak(msg);
                    }}
                    className="p-3 rounded-full bg-slate-100 text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case AppMode.QUIZ:
        return (
          <QuizMode 
            phrases={activePhrases.slice(0, 10).sort(() => Math.random() - 0.5)} 
            onComplete={handleMastered}
            onFinish={() => setMode(AppMode.DASHBOARD)}
          />
        );

      case AppMode.PRACTICE:
        // For simplicity, just pick the first non-mastered or random phrase in the category
        const phraseToPractice = activePhrases[Math.floor(Math.random() * activePhrases.length)];
        return (
          <PracticeMode 
            phrase={phraseToPractice} 
            onNext={() => {}} // Re-render logic handled by state usually
            onFinish={() => setMode(AppMode.LEARN)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout 
      title={mode === AppMode.DASHBOARD ? "Master 399" : mode} 
      onBack={mode !== AppMode.DASHBOARD ? () => setMode(AppMode.DASHBOARD) : undefined}
      progress={progressPercent}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
