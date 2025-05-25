// app/bookmarks/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useBookmarks } from '../../contexts/BookmarksContext';
import UserCard from '../../components/UserCard';

export default function BookmarksPage() {
  const { bookmarkedIds } = useBookmarks();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users (or fetch only bookmarked ones)
    fetch('https://dummyjson.com/users?limit=50') // increase limit if needed
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

 const bookmarkedUsers = users.filter(user => bookmarkedIds.includes(String(user.id)));


  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 dark:border-gray-700 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Bookmarked Users</h1>
      {bookmarkedUsers.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {bookmarkedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p>No bookmarks yet.</p>
      )}
    </div>
  );
}