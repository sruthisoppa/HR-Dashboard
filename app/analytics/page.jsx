// app/analytics/page.jsx
"use client";

import { useEffect, useState } from 'react';

// Import chart components
import { Bar, Line } from 'react-chartjs-2';

// Import Chart.js core and components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary Chart.js components
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
  const [departmentRatings, setDepartmentRatings] = useState({});
  const [bookmarkTrends, setBookmarkTrends] = useState({});

  useEffect(() => {
    // Mock data for department ratings
    const departments = ['HR', 'Engineering', 'Sales', 'Marketing'];
    const ratings = departments.reduce((acc, dept) => {
      acc[dept] = Math.random() * 4 + 1; // Random rating between 1-5
      return acc;
    }, {});
    setDepartmentRatings(ratings);

    // Mock trend data
    setBookmarkTrends({
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      data: [5, 10, 7, 12],
    });
  }, []);

  // Data for Department-wise Ratings Bar Chart
  const data = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: 'Average Ratings',
        data: Object.values(departmentRatings),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // Tailwind blue-500 with opacity
      },
    ],
  };

  // Data for Bookmark Trends Line Chart
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

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      
      {/* Department-wise Ratings Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Department-wise Average Ratings</h2>
        <div className="w-[768px] h-[512px]">
            <Bar data={data} />

        </div>
        
      </div>
      
      {/* Bookmark Trends Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="mb-2 font-semibold">Bookmark Trends</h2>
    <div className="w-[768px] h-[512px]">
         <Line data={trendData} />
    </div>
       
      </div>
    </div>
  );
}