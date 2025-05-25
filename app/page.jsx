'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleRegister = async (e) => {
  e.preventDefault();
  setError('');
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  setLoading(true);

  // Simulate API call
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Retrieve existing users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for duplicate username or email
    const duplicateUser = existingUsers.find(
      (u) => u.username === formData.username || u.email === formData.email
    );
    if (duplicateUser) {
      setError('Username or email already exists.');
      setLoading(false);
      return;
    }

    // Save new user
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password, // note: store hashed in real app!
    };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Please log in.');

    // Optional: redirect to login page
    // router.push('/login');

  } catch (err) {
    setError('Registration failed. Please try again.');
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      {/* Card container with professional styling, no zoom effect */}
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 md:p-10 backdrop-blur-md bg-opacity-70 transition-all duration-500">
        {/* Header */}
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
          Create Your Account
        </h2>
        {/* Subtext */}
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">
          Join our community and enjoy exclusive benefits!
        </p>

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Fullname"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm"
            />
            {/* Show/hide password toggle */}
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter the password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-purple-600 hover:underline transition"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}