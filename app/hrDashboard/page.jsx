'use client';

import { useEffect, useState, useCallback } from 'react';
import UserCard from '../../components/UserCard';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Home() {
  // State variables
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [ageRange, setAgeRange] = useState([18, 60]);

  // Load theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'true') {
      setIsDarkTheme(true);
    }
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem('darkMode', newTheme);
      return newTheme;
    });
  };

  // Check authentication
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token === 'abc123') {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/login';
    }
  }, []);

  // Fetch users
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
  const onChange = (e) => handleSearchChange(e.target.value);

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    window.location.href = '/login';
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesDepartment =
      selectedDepartment === 'All' || u.department === selectedDepartment;
    const matchesAge =
      u.age >= ageRange[0] && u.age <= ageRange[1];
    const matchesSearch =
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());

    return matchesDepartment && matchesAge && matchesSearch;
  });

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
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
    <div className="relative bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 font-sans">

      {/* Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-300 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
          {/* Left Logo or Title */}
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 6v6c0 5.52 4.48 10 10 10s10-4.48 10-10V6l-8-4z" />
            </svg>
            <h1 className="text-xl font-semibold hidden text-gray-800 dark:text-white md:block">User Dashboard</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 items-center">
            {/* Bookmarks */}
            <Link
              href="/bookmarks"
              className="flex flex-col items-center text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 transition"
            >
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z" />
              </svg>
              <span className="text-xs">Bookmarks</span>
            </Link>

            {/* Analytics */}
            <Link
              href="/analytics"
              className="flex flex-col items-center text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 transition"
            >
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3v18h18V3H3zm2 2h14v2H5V5zm0 4h14v2H5V9zm0 4h14v2H5v-2zm0 4h14v2H5v-2z" />
              </svg>
              <span className="text-xs">Analytics</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 transition"
            >
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm12 7a1 1 0 00-1-1H9a1 1 0 100 2h5a1 1 0 001-1z" />
              </svg>
              <span className="text-xs">Logout</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 bg-gray-200 dark:text-white dark:bg-gray-700 rounded-full p-2 transition hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {isDarkTheme ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 00-8 8h2a6 6 0 0112 0h2a8 8 0 00-8-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm4.95 3.05a1 1 0 011.415 1.415l-1.414 1.414a1 1 0 01-1.415-1.414l1.414-1.415zM18 10a1 1 0 01-1 1h-2a1 1 0 010-2h2a1 1 0 011 1zm-3.05 4.95a1 1 0 01-1.415 1.415l-1.414-1.414a1 1 0 011.414-1.415l1.415 1.414zM10 16a1 1 0 01-1-1v-2a1 1 0 012 0v2a1 1 0 01-1 1zm-4.95-3.05a1 1 0 01-1.415-1.415l1.414-1.414a1 1 0 011.415 1.414l-1.414 1.415z" />
                </svg>
              )}
              <span className="text-xs">{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className=" pt-20 md:pt-24 max-w-7xl mx-auto px-4">
        {/* Search & Filters */}
        <div className="mb-6 mt-8 md:mt-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search by name"
              className="w-full pl-12 pr-4 py-3 rounded-full shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition"
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

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-auto">
            {/* Department Filter */}
            <div className="w-full md:w-40">
              <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="All">All</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Age Range Filter */}
            <div className="w-full md:w-40">
              <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white">Age Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={ageRange[0]}
                  onChange={(e) =>
                    setAgeRange([Number(e.target.value), ageRange[1]])
                  }
                  className="w-20 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={ageRange[1]}
                  onChange={(e) =>
                    setAgeRange([ageRange[0], Number(e.target.value)])
                  }
                  className="w-20 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* User Cards Grid */}
        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500 my-8 text-lg font-semibold">
            No results found.
          </div>
        ) : (
          <div className="w-full max-w-8xl mx-auto px-8 py-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} className="hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200" />
            ))}
          </div>
          </div>
        )}
      
    </div>
  );
}

// debounce utility function
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}