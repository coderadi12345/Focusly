import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame } from 'lucide-react';

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      
      if (!isBreak) {
        setSessions(s => s + 1);
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12 animate-fade-in-up">
      <div className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white rounded-xl p-8 mb-16 shadow-lg text-center flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center justify-center">
             <Flame className="w-10 h-10 mr-4 animate-pulse text-yellow-300" /> Focus Zone
        </h1>
        <p className="text-rose-100 mt-3 text-lg font-medium">Maximize cognitive output with targeted sessions.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-[3rem] p-16 border border-white flex flex-col items-center transform transition-all duration-500 hover:shadow-cyan-500/20">
          <div className={`rounded-full w-80 h-80 flex flex-col items-center justify-center border-8 shadow-inner transition-colors duration-700 bg-white relative
            ${isBreak ? 'border-teal-400 shadow-teal-500/30' : 'border-indigo-500 shadow-indigo-500/30'}
          `}>
             <div className="absolute inset-4 rounded-full border-2 border-dashed border-gray-200 pointer-events-none animate-spin-slow"></div>
             
             <span className={`text-base font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full shadow-sm ${isBreak ? 'bg-teal-50 text-teal-600' : 'bg-indigo-50 text-indigo-600'}`}>
                {isBreak ? 'Break Timer' : 'Deep Focus'}
             </span>
             
             <div className="text-7xl font-extrabold text-gray-900 font-mono tracking-tighter" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(minutes).padStart(2, '0')}<span className={`${isActive ? 'animate-pulse' : ''}`}>:</span>{String(seconds).padStart(2, '0')}
             </div>
          </div>

          <div className="flex items-center space-x-6 mt-12 w-full justify-center">
            <button 
              onClick={toggleTimer}
              className={`flex items-center justify-center px-10 py-5 rounded-2xl text-white font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isActive ? 'bg-gradient-to-r from-rose-500 to-red-600' : 'bg-gradient-to-r from-indigo-500 to-blue-600'}`}
            >
              {isActive ? <Pause className="w-6 h-6 mr-3" /> : <Play className="w-6 h-6 mr-3" />}
              {isActive ? 'Pause' : 'Start Timer'}
            </button>
            <button 
              onClick={resetTimer}
              className="p-5 bg-white text-gray-500 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-md hover:shadow-lg hover:scale-105"
              title="Reset Timer"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
      </div>

      <div className="mt-14 bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-5 rounded-2xl shadow-lg text-white font-bold text-xl flex items-center justify-between min-w-[300px] hover:scale-105 transition-transform duration-300">
         <span className="uppercase tracking-wide opacity-90">Completed</span>
         <span className="text-4xl bg-white/20 px-4 py-1 rounded-lg backdrop-blur-sm">{sessions}</span>
      </div>
    </div>
  );
};

export default FocusMode;
