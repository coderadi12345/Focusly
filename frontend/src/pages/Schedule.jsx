import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Calendar, Sparkles } from 'lucide-react';
import api from '../api/axios';

const Schedule = () => {
  const [tasks, setTasks] = useState([]);
  const [generating, setGenerating] = useState(false);

  const fetchSchedule = async () => {
    try {
      const { data } = await api.get('/schedule');
      setTasks(data);
    } catch (error) {
      console.error('Error fetching schedule', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await api.post('/schedule/generate');
      fetchSchedule();
    } catch (error) {
      console.error('Error generating schedule', error);
      alert('Failed to generate schedule');
    } finally {
      setGenerating(false);
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    try {
      await api.put(`/schedule/${taskId}/complete`, { isCompleted: !currentStatus });
      setTasks(tasks.map(t => t._id === taskId ? { ...t, isCompleted: !currentStatus } : t));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const dateStr = new Date(task.date).toDateString();
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(task);
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10">
      <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-8 flex flex-col md:flex-row justify-between items-center shadow-lg hover:shadow-2xl transition duration-300">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Schedule</h1>
          <p className="text-indigo-100 text-lg">Your automated, intelligent study timeline.</p>
        </div>
        <button 
          onClick={handleGenerate} disabled={generating}
          className="mt-6 md:mt-0 bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition duration-300 flex items-center"
        >
          <Sparkles className="w-5 h-5 mr-3" />
          {generating ? 'Calculating...' : 'Generate Plan'}
        </button>
      </div>

      <div className="w-full pt-4">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center flex flex-col items-center">
             <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Calendar className="w-10 h-10 text-indigo-400" />
             </div>
             <h3 className="text-2xl font-bold text-gray-800">Timeline Empty</h3>
             <p className="text-gray-500 mt-2 text-lg">Click the generate button above to map out your deadlines.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {Object.entries(groupedTasks).map(([date, dayTasks]) => (
              <div key={date} className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 shadow-sm border border-blue-100">
                    <h3 className="font-bold text-indigo-800 text-center text-lg">{date}</h3>
                </div>
                <div className="space-y-4">
                  {dayTasks.map(task => (
                    <div 
                      key={task._id} 
                      className={`flex justify-between items-center p-4 rounded-lg shadow-sm hover:scale-105 transition duration-300 ${
                        task.isCompleted ? 'bg-green-50 border border-green-100 opacity-70' : 'bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <button onClick={() => toggleTask(task._id, task.isCompleted)} className="focus:outline-none hover:scale-110 transition-transform">
                            {task.isCompleted ? <CheckCircle className="w-6 h-6 text-green-500 mr-4" /> : <Circle className="w-6 h-6 text-gray-400 hover:text-indigo-500 mr-4 transition-colors" />}
                        </button>
                        <span className={`font-bold text-base ${task.isCompleted ? 'text-green-600 line-through' : 'text-gray-800'}`}>
                          {task.subject.name}
                        </span>
                      </div>
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-md shadow-sm ${task.isCompleted ? 'bg-green-200 text-green-800' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'}`}>
                        {task.durationHours} hrs
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
