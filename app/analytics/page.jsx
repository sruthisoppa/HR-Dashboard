"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13+ routing

// Chart.js imports
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigates to previous page
  };

  const [departmentRatings, setDepartmentRatings] = useState({});
  const [bookmarkTrends, setBookmarkTrends] = useState({});

  const [chartType, setChartType] = useState('bar'); // 'bar' or 'line' for department ratings

  // Initialize mock data
  useEffect(() => {
    const departments = ['HR', 'Engineering', 'Sales', 'Marketing'];
    const ratings = departments.reduce((acc, dept) => {
      acc[dept] = Math.random() * 4 + 1; // Random between 1-5
      return acc;
    }, {});
    setDepartmentRatings(ratings);

    setBookmarkTrends({
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      data: [5, 10, 7, 12],
    });
  }, []);

  // Chart data for department ratings
  const data = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: 'Average Ratings',
        data: Object.values(departmentRatings),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // Tailwind blue-500 with opacity
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for bookmark trends
  const trendData = {
    labels: bookmarkTrends.labels || ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Bookmarks Trend',
        data: bookmarkTrends.data || [5, 10, 7, 12],
        fill: false,
        borderColor: 'rgb(37, 99, 235)', // Tailwind blue-600
        tension: 0.1,
      },
    ],
  };

  const toggleChartType = () => {
    setChartType(prev => (prev === 'bar' ? 'line' : 'bar'));
  };

  const ChartComponent = chartType === 'bar' ? Bar : Line;

  return (
    <div className="p-4 space-y-8 bg-white dark:bg-gray-700 dark:text-white">
      {/* Back Button with arrow icon */}
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded flex items-center space-x-2 dark:text-black"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>

      {/* Main Heading */}
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      {/* Button to toggle chart type */}
      <button
        onClick={toggleChartType}
        className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        {chartType === 'bar' ? 'Switch to Line Chart' : 'Switch to Bar Chart'}
      </button>

      {/* Department-wise Ratings Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Department-wise {chartType === 'bar' ? 'Ratings' : 'Trend'}</h2>
        <div className="w-full md:w-[768px] h-[512px] relative">
          <ChartComponent
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Bookmark Trends Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Bookmark Trends</h2>
        <div className="w-full md:w-[768px] h-[512px] relative">
          <Line data={trendData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}