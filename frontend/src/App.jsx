import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthContext from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Schedule from './pages/Schedule';
import Analytics from './pages/Analytics';
import FocusMode from './pages/FocusMode';

// Components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ProtectedRoute><PageTransitionWrapper><Dashboard /></PageTransitionWrapper></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><PageTransitionWrapper><Subjects /></PageTransitionWrapper></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><PageTransitionWrapper><Schedule /></PageTransitionWrapper></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><PageTransitionWrapper><Analytics /></PageTransitionWrapper></ProtectedRoute>} />
        <Route path="/focus" element={<ProtectedRoute><PageTransitionWrapper><FocusMode /></PageTransitionWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0B0F] text-gray-900 dark:text-[#E6EDF3] flex justify-center items-center md:p-6 transition-colors duration-500 font-sans">
      <div className="w-full h-screen md:h-auto md:max-w-7xl md:min-h-[90vh] bg-white/90 dark:bg-[#0D1117]/80 backdrop-blur-3xl shadow-none md:shadow-2xl dark:shadow-none md:rounded-[2rem] flex flex-col md:flex-row border-0 md:border border-gray-200 dark:border-white/5 overflow-hidden relative">
        <Sidebar className="hidden md:flex w-64 flex-shrink-0 z-20" />
        <main className="flex-1 overflow-x-hidden flex flex-col p-6 md:p-10 relative z-10 w-full h-full overflow-y-auto hide-scrollbar">
          <TopBar />
          <div className="flex-1 w-full max-w-full relative mt-4 md:mt-2">
             <AnimatedRoutes />
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes Wrapper */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
