import React, { useContext } from 'react';
import { Sun, Moon, Bell } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';

const TopBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center w-full pb-6 mt-4 md:mt-0 px-2 md:px-0">
      <div className="flex items-center gap-2">
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-slate-800/50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 transition-all hover:scale-105 border border-transparent dark:border-white/5"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold ml-2">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
