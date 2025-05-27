'use client';

import { useState, useEffect } from 'react';
import { useParams,  useRouter } from 'next/navigation';


// Static list of employees with unique data for each ID
const employeesData = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
    id: '7',
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
    id: '8',
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
    id: '9',
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
    id: '10',
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
    id: '11',
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
    id: '12',
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
    id: '13',
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
    id: '14',
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
    id: '15',
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
    id: '16',
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
    id: '17',
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
    id: '18',
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
    id: '19',
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
    id: '20',
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

function starRating(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 inline-block ${
          i <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.213c.969 0 1.371 1.24.588 1.81l-3.412 2.48a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.54 1.118l-3.412-2.48a1 1 0 00-1.175 0l-3.412 2.48c-.784.57-1.839-.197-1.54-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.048 9.402c-.783-.57-.38-1.81.588-1.81h4.213a1 1 0 00.95-.69l1.286-3.975z" />
      </svg>
    );
  }
  return stars;
}

const getBadgeColor = (rating) => {
  if (rating >= 4) return 'bg-green-200 text-green-800';
  if (rating >= 2) return 'bg-yellow-200 text-yellow-800';
  return 'bg-red-200 text-red-800';
};

export default function EmployeePage() {
  const { id } = useParams();
  const router = useRouter();
   const [feedbacks, setFeedbacks] = useState([]);
const [newReviewer, setNewReviewer] = useState('');
const [newRating, setNewRating] = useState(0);
const [newMessage, setNewMessage] = useState('');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  // Mock performance history
  const performanceHistory = [
    { date: '2023-01-15', rating: 4 },
    { date: '2023-06-10', rating: 5 },
    { date: '2023-09-05', rating: 3 },
  ];
    useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('feedbacks');
      if (saved) {
        setFeedbacks(JSON.parse(saved));
      }
    }
  }, []);
   useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
  }, [feedbacks]);
   
  useEffect(() => {
    const foundUser = employeesData.find((emp) => emp.id === id);
    if (foundUser) {
      setUser(foundUser);
    } else {
      setError('User not found');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 dark:border-gray-700 h-12 w-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h2 className="text-xl font-semibold">User not found</h2>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen space-y-8 transition-colors duration-300 relative ">

      {/* Back button at top-left */}
   <button
  onClick={() => router.back()}
  className="flex items-center px-4 py-2 bg-gray-300 dark:text-white dark:bg-gray-700 rounded shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition"
>
  {/* Arrow icon (left arrow) */}
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

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 transition-shadow duration-300 hover:shadow-xl">
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-gray-600 mb-3">{user.email}</p>
          {/* Performance stars and badge */}
          <div className="flex items-center space-x-3 mb-4">
            {starRating(user.performanceRating)}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                user.performanceRating
              )}`}
            >
              {user.performanceRating} Stars
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-shadow hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-gray-300 dark:text-white">
            Profile Details
          </h2>
          <p className="mb-2 dark:text-white">
            <strong>Address:</strong> {user.address}
          </p>
          <p className="mb-2 dark:text-white">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="dark:text-white">
            <strong>Bio:</strong> {user.bio}
          </p>
        </div>
        {/* Add more info if needed */}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
        {['Overview', 'Projects', 'Feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold rounded-t-lg transition duration-200 focus:outline-none ${
              activeTab === tab
                ? 'bg-white dark:bg-gray-700 border-b-2 border-blue-500 text-blue-600'
                : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      {activeTab === 'Overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-shadow hover:shadow-xl mb-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:text-white">
            Performance History
          </h3>
          <ul className="space-y-3 dark:text-white">
            {performanceHistory.map((entry, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium">{entry.date}</span>
                <div className="flex items-center">{starRating(entry.rating)}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'Projects' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-shadow hover:shadow-xl mb-6 dark:text-white">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">
            Projects
          </h3>
          <div className="space-y-3">
            {/* Mock projects */}
            <div className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div className="flex justify-between items-center">
                <span className="font-medium">Project Alpha</span>
                <span className="text-sm px-2 py-1 rounded bg-green-200 text-green-800">
                  Completed
                </span>
              </div>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div className="flex justify-between items-center">
                <span className="font-medium">Project Beta</span>
                <span className="text-sm px-2 py-1 rounded bg-yellow-200 text-yellow-800">
                  In Progress
                </span>
              </div>
            </div>
            {/* Add more projects as needed */}
          </div>
        </div>
      )}

     {activeTab === 'Feedback' && (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-shadow hover:shadow-xl mb-6 dark:text-white">
    <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">
      Feedback
    </h3>
     {/* Feedback Form */}
    <form
  onSubmit={(e) => {
    e.preventDefault();
    setFeedbacks((prev) => [
      ...prev,
      {
        id: Date.now(),
        reviewer: newReviewer,
        rating: newRating,
        message: newMessage,
      },
    ]);
    setNewReviewer('');
    setNewRating(0);
    setNewMessage('');
  }}
  className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
>
  <h2 className="text-2xl font-semibold text-center mb-4">Feel Free to Submit Feedback</h2>

  {/* Full Name */}
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700 dark:text-gray-200" htmlFor="fullName">
      Full Name
    </label>
    <input
      id="fullName"
      type="text"
      placeholder="Your Name"
      value={newReviewer}
      onChange={(e) => setNewReviewer(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      required
    />
  </div>

  {/* Rating */}
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700 dark:text-gray-200" htmlFor="rating">
      Rating
    </label>
    <select
      id="rating"
      value={newRating}
      onChange={(e) => setNewRating(Number(e.target.value))}
      className="border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      required
    >
      <option value={0}>Select Rating</option>
      <option value={1}>1 ⭐</option>
      <option value={2}>2 ⭐</option>
      <option value={3}>3 ⭐</option>
      <option value={4}>4 ⭐</option>
      <option value={5}>5 ⭐</option>
    </select>
  </div>

  {/* Feedback Message */}
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700 dark:text-gray-200" htmlFor="feedbackMessage">
      Feedback
    </label>
    <textarea
      id="feedbackMessage"
      placeholder="Your feedback"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-4 py-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      required
    />
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <button
      type="submit"
      className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Submit Feedback
    </button>
  </div>
</form>

    {/* Feedback List */}
    <div className="space-y-3 mb-6">
        {feedbacks.length === 0 ? (
      <p className="text-gray-500 mb-4"></p>
    ) : (
      feedbacks.map((fb) => (
        <div
          key={fb.id}
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition mb-3"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{fb.reviewer}</span>
            <div className="flex items-center">{starRating(fb.rating)}</div>
          </div>
          <p>{fb.message}</p>
        </div>
      ))
    )}
    
      {/* Existing feedbacks */}
      <div className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Manager A</span>
          <div className="flex items-center">{starRating(5)}</div>
        </div>
        <p>Excellent work!</p>
      </div>
      <div className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Peer B</span>
          <div className="flex items-center">{starRating(4)}</div>
        </div>
        <p>Great team player.</p>

      </div>
    </div>

   
  </div>
)}
    </div>
  );
}