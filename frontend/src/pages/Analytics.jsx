import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Zap, Clock, Activity } from 'lucide-react';
import api from '../api/axios';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalEstimatedHours: 0,
    totalCompletedHours: 0,
    completionRate: 0,
    completedTasksCount: 0,
    pendingTasksCount: 0,
    studyHoursPerDay: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics');
        setStats(data);
      } catch (error) {
        console.error('Error fetching analytics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const chartData = Object.keys(stats.studyHoursPerDay).map(day => ({
    name: day,
    hours: stats.studyHoursPerDay[day]
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white shadow-xl">
          <p className="font-bold text-gray-800 mb-1">{label}</p>
          <p className="font-semibold text-purple-600 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {payload[0].value} hours
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10">
      
      <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-lg flex justify-between items-center transition-transform hover:scale-[1.01] duration-300">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
             <Activity className="w-8 h-8 mr-3 opacity-90" /> Activity Data
          </h1>
          <p className="text-purple-100 text-lg">Measure your momentum and track study targets.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-xl border border-white/30 shadow-inner hidden md:block">
            <span className="font-bold tracking-widest uppercase text-sm">Live Feed Active</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center space-x-4 mb-4 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-inner">
                <Target className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-wider text-sm opacity-90">Current Goal</span>
          </div>
          <p className="text-6xl font-extrabold tracking-tighter relative z-10">{stats?.completionRate || 0}%</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center space-x-4 mb-4 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-inner">
                <Clock className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-wider text-sm opacity-90">Hours Logged</span>
          </div>
          <div className="flex items-baseline space-x-3 relative z-10">
            <p className="text-6xl font-extrabold tracking-tighter">{stats?.totalCompletedHours || 0}</p>
            <p className="text-2xl font-bold opacity-70">/ {stats?.totalEstimatedHours || 0}h</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white relative overflow-hidden group">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center space-x-4 mb-4 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-inner">
                <Zap className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-wider text-sm opacity-90">Total Tasks Meta</span>
          </div>
          <p className="text-6xl font-extrabold tracking-tighter relative z-10">{stats?.completedTasksCount || 0}</p>
        </div>
      </div>

      <div className="w-full bg-white shadow-2xl p-8 lg:p-10 rounded-2xl border border-gray-100 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Study Velocity (7 Days)</h2>
        </div>
        <div className="w-full h-[400px] flex justify-center">
          <ResponsiveContainer width="99%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={44}>
              <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6"/>
                      <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 600 }} dx={-10} />
              <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="url(#purpleGradient)" radius={[6, 6, 0, 0]} className="hover:opacity-80 transition-opacity duration-300" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
