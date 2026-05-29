import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Zap } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center p-6 relative overflow-hidden">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col md:flex-row-reverse overflow-hidden border border-white">
        
        {/* Left Side Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 text-white p-12 flex flex-col justify-center items-center text-center relative overflow-hidden hidden md:flex">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 opacity-20 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <Zap className="w-16 h-16 text-yellow-300 mb-8 animate-pulse" />
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Start your journey!</h1>
            <p className="text-pink-100 text-lg font-medium leading-relaxed">Create a free account to automatically generate intelligent study schedules and visualize your academic goals.</p>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
            
            <div className="text-center md:text-left mb-8 md:hidden">
                <h1 className="text-3xl font-extrabold text-pink-700">Get Started</h1>
            </div>

            <div className="mb-8 hidden md:block">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
                <p className="text-gray-500 mt-2 font-medium bg-gray-50 p-3 justify-center text-center rounded-lg border border-gray-100">Setup your planner instantly</p>
            </div>

            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded-r-lg mb-8 shadow-sm font-semibold">{error}</div>}

            <form onSubmit={submitHandler} className="space-y-5">
                <div>
                    <div className="relative group">
                        <User className="absolute top-3.5 left-4 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                        <input
                        type="text"
                        placeholder="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white focus:border-purple-400 transition-all font-semibold text-gray-800 shadow-inner"
                        required
                        />
                    </div>
                </div>
                <div>
                    <div className="relative group">
                        <Mail className="absolute top-3.5 left-4 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                        <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white focus:border-purple-400 transition-all font-semibold text-gray-800 shadow-inner"
                        required
                        />
                    </div>
                </div>
                <div>
                    <div className="relative group">
                        <Lock className="absolute top-3.5 left-4 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white focus:border-purple-400 transition-all font-semibold text-gray-800 shadow-inner"
                        required
                        />
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg mt-2"
                    >
                        Sign Up <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </form>

            <p className="mt-8 text-center text-gray-600 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 font-bold hover:text-purple-800 transition-colors bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                    Sign in here
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
