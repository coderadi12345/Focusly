import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar as CalendarIcon, Clock, BookOpen } from 'lucide-react';
import api from '../api/axios';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    difficulty: 'Medium',
    estimatedHours: '',
  });

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get('/subjects');
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/subjects', formData);
      setFormData({ name: '', deadline: '', difficulty: 'Medium', estimatedHours: '' });
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto space-y-10 animate-fade-in-up pb-10">
      
      <div className="w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">Subject Management</h1>
        <p className="text-indigo-100 mt-2 text-lg">Define your goals and set your targets.</p>
      </div>

      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center text-center">
                <Plus className="w-6 h-6 mr-2 text-blue-500" /> Add Subject
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Name</label>
                    <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
                    placeholder="e.g. Data Structures"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Deadline</label>
                    <input 
                    type="date" name="deadline" value={formData.deadline} onChange={handleChange} required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                    <select 
                    name="difficulty" value={formData.difficulty} onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition appearance-none"
                    >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Total Hours</label>
                    <input 
                    type="number" name="estimatedHours" min="1" value={formData.estimatedHours} onChange={handleChange} required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none transition"
                    placeholder="e.g. 20"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:scale-105 transition duration-300 font-bold shadow-md mt-4"
                >
                    Save Subject
                </button>
            </form>
      </div>

      {subjects.length > 0 && (
         <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Your Tracked Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
               {subjects.map(subject => (
                    <div key={subject._id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow flex flex-col relative group">
                        <button onClick={() => handleDelete(subject._id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <h3 className="font-bold text-gray-800 truncate pr-6 text-xl mb-2">{subject.name}</h3>
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full w-max text-white shadow-sm ${
                            subject.difficulty === 'Hard' ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                            subject.difficulty === 'Medium' ? 'bg-gradient-to-r from-orange-400 to-amber-500' :
                            'bg-gradient-to-r from-emerald-400 to-teal-500'
                        }`}>{subject.difficulty}</span>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200/60 space-y-3 text-sm text-gray-600 font-medium">
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                <span className="flex items-center text-blue-600"><CalendarIcon className="w-4 h-4 mr-2"/> Due Date</span>
                                <span>{new Date(subject.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                <span className="flex items-center text-purple-600"><Clock className="w-4 h-4 mr-2"/> Progress</span>
                                <span>{subject.completedHours} / {subject.estimatedHours} hrs</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default Subjects;
