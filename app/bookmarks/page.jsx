// app/bookmarks/page.jsx
"use client";

import React, { useContext } from 'react';
import { BookmarksContext } from '../../contexts/BookmarksContext';
import { useRouter } from 'next/navigation';

const BookmarksPage = () => {
  const { bookmarks, removeBookmark, promoteEmployee, assignToProject } = useContext(BookmarksContext);
  const router = useRouter();

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          {/* Left arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Your Bookmarks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg text-center max-w-md">
          No bookmarked employees yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pb-8">
      {/* Back Button */}
      <div className="pt-4 mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 bg-gray-300 dark:text-white dark:bg-gray-700 rounded shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          {/* Left arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Bookmarked Employees
      </h2>

      {/* Scrollable list container */}
      <div className="flex-1 overflow-y-auto max-w-6xl mx-auto">
        <ul className="space-y-6 px-4">
          {bookmarks.map((employee) => (
            <li
              key={employee.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-6 flex flex-col md:flex-row items-center"
            >
              <img
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-24 h-24 rounded-full object-cover shadow-md mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex-1 space-y-2 text-center md:text-left">
                {/* Name & Email */}
                <h3 className="text-xl font-semibold dark:text-white">{`${employee.firstName} ${employee.lastName}`}</h3>
                <p className="text-gray-500 dark:text-gray-400">{employee.email}</p>
                <p className="text-gray-600 dark:text-gray-400">Phone: {employee.phone}</p>
                {/* Buttons */}
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    onClick={() => promoteEmployee(employee.id)}
                  >
                    Promote
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    onClick={() => assignToProject(employee.id)}
                  >
                    Assign to Project
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    onClick={() => removeBookmark(employee.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookmarksPage;