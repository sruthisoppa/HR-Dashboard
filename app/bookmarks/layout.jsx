// app/bookmarks/layout.jsx
import React from 'react';
import { BookmarksProvider } from '../../contexts/BookmarksContext';

export default function BookmarksLayout({ children }) {
  return (
    <BookmarksProvider>
      {children}
    </BookmarksProvider>
  );
}