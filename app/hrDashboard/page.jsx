'use client';

import { useEffect, useState, useCallback } from 'react';
import UserCard from '../../components/UserCard';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/users?limit=20');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        const departments = ['HR', 'Engineering', 'Sales', 'Marketing'];
        const enhancedUsers = data.users.map((user, index) => ({
          ...user,
          department: departments[index % departments.length],
          age: user.age,
          performanceRating: Math.ceil(Math.random() * 5),
        }));
        setUsers(enhancedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Debounced search input
  const handleSearchChange = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  const onChange = (e) => {
    handleSearchChange(e.target.value);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  // Apply theme class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="border-4 border-gray-300 dark:border-gray-600 rounded-full w-16 h-16 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-red-600 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      
      {/* Header with shifted buttons and Dark Mode toggle */}
      <div className="flex items-center justify-between mb-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          HR DASHBOARD
        </h1>

        {/* Buttons section, shifted right with ml-6 */}
        <div className="flex items-center space-x-4 ml-6">
          
          {/* Bookmarks Button with red color */}
          <Link
            href="/bookmarks"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
          >
            {/* Optional icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z" />
            </svg>
            <span>Bookmarks</span>
          </Link>

          {/* Analytics Button */}
          <Link
            href="/analytics"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
          >
            {/* Optional icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3v18h18V3H3zm2 2h14v2H5V5zm0 4h14v2H5V9zm0 4h14v2H5v-2zm0 4h14v2H5v-2z" />
            </svg>
            <span>Analytics</span>
          </Link>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
          >
            {/* Icon for dark/light mode */}
            {isDarkTheme ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 0010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm4.95 3.05a1 1 0 011.415 1.415l-1.414 1.414a1 1 0 01-1.415-1.414l1.414-1.415zM18 10a1 1 0 01-1 1h-2a1 1 0 010-2h2a1 1 0 011 1zm-3.05 4.95a1 1 0 01-1.415 1.415l-1.414-1.414a1 1 0 011.414-1.415l1.415 1.414zM10 16a1 1 0 01-1-1v-2a1 1 0 012 0v2a1 1 0 01-1 1zm-4.95-3.05a1 1 0 01-1.415-1.415l1.414-1.414a1 1 0 011.415 1.414l-1.414 1.415z" />
              </svg>
            )}
            <span>{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm transition-shadow"
          onChange={onChange}
        />
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* User Cards Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 my-8 text-lg font-semibold">
          No results found.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

// Debounce utility
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

