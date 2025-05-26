'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Cookies from 'js-cookie';


export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Find user matching username or email
  const user = users.find(
    (u) =>
      u.username === formData.username || u.email === formData.username
  );

  if (user && user.password === formData.password) {
    // Successful login
    setLoading(false);
    // Set cookie with js-cookie
    Cookies.set('authToken', 'abc123', { expires: 1, path: '/' });
    // Redirect to dashboard
    router.push('/hrDashboard');
  } else {
    setLoading(false);
    setError('Invalid username/email or password');
  }
};

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.4&auto=format&fit=crop&w=1600&q=80)'
    }}>
      {/* Overlay for dimming background */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
        <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 space-y-6 backdrop-filter backdrop-blur-lg bg-opacity-80">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4">Welcome Back</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Sign in to your account to continue</p>
           <p className="text-center text-gray-600 dark:text-gray-300 mb-8">If you haven't registered yet make sure you register.</p>
          
          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Username/Email */}
            <div>
              <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Username or Email</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username or email"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 shadow-sm hover:shadow-md"
              />
            </div>
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 shadow-sm"
              />
              {/* Show/hide password toggle */}
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-between text-sm mt-4 px-2 font-medium">
            <a href="/" className="text-purple-600 hover:underline transition">Forgot Password?</a>
            <a href="/" className="text-purple-600 hover:underline transition">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}