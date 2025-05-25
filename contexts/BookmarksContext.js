'use client';
import React, { createContext, useState, useEffect } from 'react';

// Example employee data
const allEmployees = [
  {
    id: 1,
    firstName: 'Emily',
    lastName: 'Johnson',
    address: '123 Maple Ave, Springfield, USA',
    phone: '+1234567890',
    bio: 'HR professional dedicated to employee well-being.',
    email: 'emily.johnson@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/6914da7a3557e685836a71e635c237b9.png?updatedAt=1748195280434',
    performanceRating: 4,
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Williams',
    address: '456 Oak St, Metropolis, USA',
    phone: '+1987654321',
    bio: 'Senior engineer with 10+ years of experience.',
    email: 'michael.williams@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/2244af71ad0c25f2cb0a8efa167491fb.png?updatedAt=1748170065374',
    performanceRating: 3,
  },
  {
    id: 3,
    firstName: 'Sophia',
    lastName: 'Brown',
    address: '789 Pine Rd, Gotham, USA',
    phone: '+1122334455',
    bio: 'Sales expert with a passion for customer relationships.',
    email: 'sophia.brown@x.dummyjson.com',
    avatar: 'https://i.imgur.com/8Km9tLL.png',
    performanceRating: 5,
  },
  {
    id: 4,
    firstName: 'James',
    lastName: 'Davis',
    address: '321 Birch Ln, Star City, USA',
    phone: '+12223334444',
    bio: 'Marketing strategist with a focus on digital growth.',
    email: 'james.davis@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/d36865e08723cc1b764e084873e53662.png?updatedAt=1748170137530',
    performanceRating: 4,
  },
  {
    id: 5,
    firstName: 'Emma',
    lastName: 'Miller',
    address: '654 Cedar Ct, Central City, USA',
    phone: '+13334445555',
    bio: 'HR coordinator specializing in onboarding.',
    email: 'emma.miller@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/50382765fd5648c7876d91cc37b27394.png?updatedAt=1748169960405',
    performanceRating: 3,
  },
  {
    id: 6,
    firstName: 'Olivia',
    lastName: 'Wilson',
    address: '852 Spruce St, City, Country',
    phone: '+17778889999',
    bio: 'Marketing specialist with a focus on digital campaigns.',
    email: 'olivia.moore@example.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/f118c882025868bca7499ea0f41bc43b.png?updatedAt=1748195392647',
    performanceRating: 5,
  },
  {
    id: 7,
    firstName: 'Alexander',
    lastName: 'Jones',
    address: '987 Elm St, Smallville, USA',
    phone: '+14445556666',
    bio: 'Experienced sales manager leading regional teams.',
    email: 'alexander.jones@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/a599c01dec11cb6099c6aacafe3bc5a9.png?updatedAt=1748195607866',
    performanceRating: 2,
  },
  {
    id: 8,
    firstName: 'Ava',
    lastName: 'Taylor',
    address: '159 Walnut St, Gotham, USA',
    phone: '+15556667777',
    bio: 'Creative marketing expert with a focus on social media.',
    email: 'ava.taylor@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/7c9062905b4ce3d276dfffd2b34bbb49.png?updatedAt=1748195679410',
    performanceRating: 5,
  },
  {
    id: 9,
    firstName: 'Ethan',
    lastName: 'Martinez',
    address: '753 Maple Ave, Metropolis, USA',
    phone: '+16667778888',
    bio: 'HR professional with a focus on employee engagement.',
    email: 'ethan.martinez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/237d3876ef98d5364ed1326813f4ed5b.png?updatedAt=1748195739933',
    performanceRating: 4,
  },
  {
    id: 10,
    firstName: 'Isabella',
    lastName: 'Anderson',
    address: '246 Oak Rd, Star City, USA',
    phone: '+17778880000',
    bio: 'Engineer passionate about innovative solutions.',
    email: 'isabella.anderson@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/d447a9fd5010652f6c0911fbe9c662c6.png?updatedAt=1748195811479',
    performanceRating: 3,
  },
  {
    id: 11,
    firstName: 'Liam',
    lastName: 'García',
    address: '369 Pine St, Gotham, USA',
    phone: '+18889990000',
    bio: 'Sales executive with excellent client relationships.',
    email: 'liam.garcia@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/b0a4b1922813b989103a3616d7111562.png?updatedAt=1748196003379',
    performanceRating: 2,
  },
  {
    id: 12,
    firstName: 'Mia',
    lastName: 'Rodriguez',
    address: '147 Cedar Ave, Central City, USA',
    phone: '+19990001111',
    bio: 'Marketing coordinator with a focus on digital campaigns.',
    email: 'mia.rodriguez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/6914da7a3557e685836a71e635c237b9.png?updatedAt=1748195280434',
    performanceRating: 4,
  },
  {
    id: 13,
    firstName: 'Noah',
    lastName: 'Hernandez',
    address: '258 Walnut Rd, Smallville, USA',
    phone: '+17774445555',
    bio: 'HR specialist with experience in talent acquisition.',
    email: 'noah.hernandez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/7c9062905b4ce3d276dfffd2b34bbb49.png?updatedAt=1748195679410',
    performanceRating: 3,
  },
  {
    id: 14,
    firstName: 'Charlotte',
    lastName: 'Lopez',
    address: '369 Spruce St, Star City, USA',
    phone: '+16665554444',
    bio: 'Engineer focused on software development.',
    email: 'charlotte.lopez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/1a270860bac2c66b434968a3047822e3.png?updatedAt=1748196105609',
    performanceRating: 5,
  },
  {
    id: 15,
    firstName: 'William',
    lastName: 'Gonzalez',
    address: '480 Elm St, Metropolis, USA',
    phone: '+18887776666',
    bio: 'Sales director with a strategic mindset.',
    email: 'william.gonzalez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/2244af71ad0c25f2cb0a8efa167491fb.png?updatedAt=1748170065374',
    performanceRating: 4,
  },
  {
    id: 16,
    firstName: 'Avery',
    lastName: 'Perez',
    address: '591 Oak Ave, Gotham, USA',
    phone: '+17772223333',
    bio: 'Marketing analyst with expertise in SEO.',
    email: 'avery.perez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/c29e12118b27e54e8883db0b98c610df.png?updatedAt=1748196160371',
    performanceRating: 3,
  },
  {
    id: 17,
    firstName: 'Evelyn',
    lastName: 'Sanchez',
    address: '602 Pine Rd, Star City, USA',
    phone: '+19998887777',
    bio: 'HR manager with focus on employee retention.',
    email: 'evelyn.sanchez@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/50382765fd5648c7876d91cc37b27394.png?updatedAt=1748169960405',
    performanceRating: 4,
  },
  {
    id: 18,
    firstName: 'Logan',
    lastName: 'Torres',
    address: '713 Cedar St, Central City, USA',
    phone: '+15553334444',
    bio: 'Engineer specialized in cloud solutions.',
    email: 'logan.torres@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/d36865e08723cc1b764e084873e53662.png?updatedAt=1748170137530',
    performanceRating: 2,
  },
  {
    id: 19,
    firstName: 'Abigail',
    lastName: 'Rivera',
    address: '824 Walnut Ave, Smallville, USA',
    phone: '+17771112222',
    bio: 'Sales associate with a focus on retail markets.',
    email: 'abigail.rivera@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/b0a4b1922813b989103a3616d7111562.png?updatedAt=1748196003379',
    performanceRating: 3,
  },
  {
    id: 20,
    firstName: 'Jackson',
    lastName: 'Evans',
    address: '935 Maple Rd, Star City, USA',
    phone: '+19997778888',
    bio: 'Marketing manager with a focus on branding.',
    email: 'jackson.evans@x.dummyjson.com',
    avatar: 'https://ik.imagekit.io/jxtjn4hpqj/237d3876ef98d5364ed1326813f4ed5b.png?updatedAt=1748195739933',
    performanceRating: 5,
  },
];

// Function to fetch employees by IDs
const fetchEmployeesByIds = (ids) => {
  return new Promise((resolve) => {
    const filtered = allEmployees.filter((emp) => ids.includes(emp.id));
    resolve(filtered);
  });
};

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks on mount
  useEffect(() => {
    const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedUsers')) || [];
    fetchEmployeesByIds(bookmarkedIds).then(setBookmarks);
  }, []);

  // Function to remove a bookmark
  const removeBookmark = (id) => {
    const currentIds = JSON.parse(localStorage.getItem('bookmarkedUsers')) || [];
    const newIds = currentIds.filter((i) => i !== id);
    localStorage.setItem('bookmarkedUsers', JSON.stringify(newIds));
    // Fetch updated list
    fetchEmployeesByIds(newIds).then(setBookmarks);
  };

  // Optional: add functions to promote or assign employees
  const promoteEmployee = (id) => {
    alert(`Promote employee with ID: ${id}`);
  };

  const assignToProject = (id) => {
    alert(`Assign employee with ID: ${id} to a project`);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, removeBookmark, promoteEmployee, assignToProject }}>
      {children}
    </BookmarksContext.Provider>
  );
};