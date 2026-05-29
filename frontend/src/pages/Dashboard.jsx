import React, { useState, useEffect, useContext } from 'react';
import { Book, CheckCircle, Clock, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalSubjects: 0,
    pendingTasksCount: 0,
    completedTasksCount: 0,
    completionRate: 0,
  });

  // Example AI Plan Cards
  const aiPlans = [
    { subject: 'Calculus III', timeBlock: '10:00 AM - 12:00 PM', progress: 65, color: 'from-blue-500 to-cyan-400', statCol: 'shadow-cyan-500/20' },
    { subject: 'Data Structures', timeBlock: '2:00 PM - 3:30 PM', progress: 30, color: 'from-purple-500 to-pink-500', statCol: 'shadow-purple-500/20' },
    { subject: 'Physics Resnick', timeBlock: '5:00 PM - 6:30 PM', progress: 0, color: 'from-orange-500 to-red-500', statCol: 'shadow-red-500/20' }
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get('/analytics');
        setStats({
          totalSubjects: data.totalSubjects,
          pendingTasksCount: data.pendingTasksCount,
          completedTasksCount: data.completedTasksCount,
          completionRate: data.completionRate,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      }
    };
    fetchAnalytics();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col space-y-10 pb-12 w-full max-w-6xl mx-auto"
    >
      {/* Header Area */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-2">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-[#E6EDF3] tracking-tight">
            {getGreeting()}, {user?.username}
          </h1>
          <p className="text-gray-500 dark:text-[#9DA7B3] mt-3 md:text-lg font-medium">Here is your AI-optimized schedule for today.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/10 dark:shadow-white/10 hover:shadow-gray-900/20 dark:hover:shadow-white/20">
          <Sparkles className="w-4 h-4" />
          <span>Regenerate Plan</span>
        </button>
      </motion.div>

      {/* AI Study Plan Cards */}
      <motion.div variants={itemVariants} className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500" /> Today's Focus
          </h2>
          <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center transition-colors">
            View Calendar <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {aiPlans.map((plan, index) => (
             <motion.div 
                key={index}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none transition-all duration-300 hover:shadow-2xl dark:hover:shadow-lg dark:hover:${plan.statCol} flex flex-col justify-between`}
             >
                <div className="flex justify-between items-start mb-6">
                   <div className={`p-3 rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-lg`}>
                     <Book className="w-6 h-6" />
                   </div>
                   <span className="text-xs font-bold text-gray-600 dark:text-[#9DA7B3] bg-gray-100 dark:bg-[#0D1117] border border-transparent dark:border-white/5 py-1.5 px-3 rounded-lg flex items-center gap-1.5">
                     <Clock className="w-3.5 h-3.5" /> {plan.timeBlock}
                   </span>
                </div>
                <div>
                   <h3 className="font-extrabold text-gray-900 dark:text-white text-xl tracking-tight">{plan.subject}</h3>
                   
                   <div className="mt-6">
                     <div className="flex justify-between text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                       <span>Progress</span>
                       <span>{plan.progress}%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-[#0D1117] rounded-full h-2 overflow-hidden shadow-inner">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${plan.progress}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                          className={`h-full rounded-full bg-gradient-to-r ${plan.color}`}
                       />
                     </div>
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pt-6">
        {[
          { title: 'Total Subjects', value: stats.totalSubjects, icon: Book, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
          { title: 'Pending Tasks', value: stats.pendingTasksCount, icon: Clock, color: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' },
          { title: 'Completed Tasks', value: stats.completedTasksCount, icon: CheckCircle, color: 'text-green-500 bg-green-50 dark:bg-green-500/10' },
          { title: 'Completion Rate', value: `${stats.completionRate}%`, icon: TrendingUp, color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-[#161B22] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none flex items-center justify-between transition-all duration-300 hover:shadow-xl dark:hover:bg-[#1A202A]"
          >
            <div>
              <p className="text-sm md:text-xs xl:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-[#9DA7B3]">{stat.title}</p>
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-[#E6EDF3] mt-2 tracking-tight">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
