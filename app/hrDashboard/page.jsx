'use client';

import { useEffect, useState, useCallback } from 'react';
import UserCard from '../../components/UserCard';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Home() {
  // All hooks at top
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
const [ageRange, setAgeRange] = useState([18, 60]);

  // Theme toggle
  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  // Auth check - move to top
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

  // Debounced search
  const handleSearchChange = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  const onChange = (e) => handleSearchChange(e.target.value);

  // Theme class toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  // Early return if not authenticated
  if (!isAuthenticated) {
    return null; // or a loading indicator
  }

  // Loading state
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

  const handleLogout = () => {
    Cookies.remove('authToken');
    window.location.href = '/login';
  };


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

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      
      {/* Header with shifted buttons and Dark Mode toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
          HR DASHBOARD
        </h1>

        {/* Buttons section, stacked on mobile */}
<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">

  {/* Bookmarks Button */}
  <Link
    href="/bookmarks"
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z" />
    </svg>
    <span>Bookmarks</span>
  </Link>

  {/* Analytics Button */}
  <Link
    href="/analytics"
    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3v18h18V3H3zm2 2h14v2H5V5zm0 4h14v2H5V9zm0 4h14v2H5v-2zm0 4h14v2H5v-2z" />
    </svg>
    <span>Analytics</span>
  </Link>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm12 7a1 1 0 00-1-1H9a1 1 0 100 2h5a1 1 0 001-1z" />
    </svg>
    <span>Logout</span>
  </button>

  {/* Dark Mode Toggle */}
  <button
    onClick={toggleTheme}
    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
  >
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
      <div className="relative mb-6 max-w-2xl mx-auto">
        <input
          type="search" // better for mobile keyboards
          autoComplete="off"
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
<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
  {/* Department */}
  <div>
    <label className="block mb-1 font-semibold">Department</label>
    <select
      value={selectedDepartment}
      onChange={(e) => setSelectedDepartment(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="All">All</option>
      <option value="HR">HR</option>
      <option value="Engineering">Engineering</option>
      <option value="Sales">Sales</option>
      <option value="Marketing">Marketing</option>
    </select>
  </div>
  {/* Age Range */}
  <div>
    <label className="block mb-1 font-semibold">Age Range</label>
    <div className="flex items-center space-x-2">
      <input
        type="number"
        min={18}
        max={60}
        value={ageRange[0]}
        onChange={(e) =>
          setAgeRange([Number(e.target.value), ageRange[1]])
        }
        className="border rounded px-2 py-1 w-20"
      />
      <span>-</span>
      <input
        type="number"
        min={18}
        max={60}
        value={ageRange[1]}
        onChange={(e) =>
          setAgeRange([ageRange[0], Number(e.target.value)])
        }
        className="border rounded px-2 py-1 w-20"
      />
    </div>
  </div>
</div>
      {/* User Cards Grid - responsive layout */}
      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 my-8 text-lg font-semibold">
          No results found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    
    </div>
  );
}


// debounce utility
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}


