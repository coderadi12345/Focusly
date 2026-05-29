import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, BarChart2, Clock, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Sidebar = ({ className }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Subjects', path: '/subjects', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'Focus Mode', path: '/focus', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className={`flex flex-col h-full border-r-0 md:border-r border-slate-800/60 pr-0 md:pr-6 ${className}`}>
      <div className="pb-8">
        <h1 className="text-xl font-bold text-gray-100 tracking-tight flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                S
            </div>
            Planner
        </h1>
      </div>

      <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap md:whitespace-normal font-medium text-sm hover:scale-[1.02] ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300 shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8 hidden md:block border-t border-slate-800/60 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-indigo-300 font-bold text-sm border border-slate-700">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-gray-200 truncate">{user?.username || 'User'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200 hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
