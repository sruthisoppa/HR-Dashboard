'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserCard({ user }) {
  const [hover, setHover] = useState(false);
  const [promoted, setPromoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const router = useRouter();

  // Load bookmark status from localStorage
  useEffect(() => {
    const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedUsers')) || [];
    setBookmarked(bookmarkedIds.includes(user.id));
  }, [user.id]);

  const handleView = () => {
    router.push(`/employee/${user.id}`);
  };

  const handleBookmark = () => {
    setBookmarked((prev) => {
      const newStatus = !prev;
      const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedUsers')) || [];
      if (newStatus) {
        localStorage.setItem('bookmarkedUsers', JSON.stringify([...bookmarkedIds, user.id]));
      } else {
        localStorage.setItem(
          'bookmarkedUsers',
          JSON.stringify(bookmarkedIds.filter(id => id !== user.id))
        );
      }
      return newStatus;
    });
  };

  const handlePromote = () => {
    setPromoted(true);
    alert(`Promoted ${user.firstName} ${user.lastName}`);
  };

  return (
    <div
      className={`border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl ${
        hover ? 'translate-y-[-2px]' : ''
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* User Info Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {user.firstName} {user.lastName}
        </h2>
        {/* Optional: Add an icon or badge here */}
      </div>

      {/* Basic Info */}
      <div className="mb-4 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Department: {user.department}</p>
      </div>

      {/* Performance Rating Stars */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= user.performanceRating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
          </svg>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        {/* View Button */}
        <button
          onClick={handleView}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center text-sm"
        >
          {/* Optional icon */}
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View
        </button>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`flex-1 ${
            bookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
          } text-sm font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center`}
        >
          {bookmarked ? (
            <>
              {/* Optional icon */}
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v14l7-3 7 3V5a2 2 0 00-2-2H5z" />
              </svg>
              Unbookmark
            </>
          ) : (
            <>
              {/* Optional icon */}
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v14l7-3 7 3V5a2 2 0 00-2-2H5z" />
              </svg>
              Bookmark
            </>
          )}
        </button>

        {/* Promote Button */}
        <button
          onClick={handlePromote}
          disabled={promoted}
          className={`flex-1 ${
            promoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {/* Optional icon */}
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 00-8 8h2a6 6 0 0112 0h2a8 8 0 00-8-8z" />
          </svg>
          {promoted ? 'Promoted' : 'Promote'}
        </button>
      </div>
    </div>
  );
}