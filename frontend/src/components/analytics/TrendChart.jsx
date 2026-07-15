import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getPageVisits, getFormSubmissions } from '@/lib/api';
import { format, eachDayOfInterval } from 'date-fns';
import ChartSkeleton from './ChartSkeleton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // 1. Fetch Visits
        const visitsData = await getPageVisits(startDate, endDate);

        // 2. Fetch Submissions
        const submissionsData = await getFormSubmissions(startDate, endDate);

        // 3. Process Data
        const days = eachDayOfInterval({ start: startDate, end: endDate });
        const labels = days.map(day => format(day, 'MMM dd'));
        
        const visitsByDay = new Array(days.length).fill(0);
        const submissionsByDay = new Array(days.length).fill(0);

        // Helper to find index
        const getDayIndex = (dateStr) => {
          const date = new Date(dateStr);
          return days.findIndex(d => 
            format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          );
        };

        visitsData.forEach(v => {
          const idx = getDayIndex(v.visited_at);
          if (idx !== -1) visitsByDay[idx]++;
        });

        submissionsData.forEach(s => {
          const idx = getDayIndex(s.submitted_at);
          if (idx !== -1) submissionsByDay[idx]++;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Visits',
              data: visitsByDay,
              borderColor: 'rgba(59, 130, 246, 1)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Form Submissions',
              data: submissionsByDay,
              borderColor: 'rgba(16, 185, 129, 1)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true,
            }
          ],
        });
      } catch (err) {
        console.error("Error fetching trend data:", err);
        setError("Failed to load trend analytics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (isLoading) {
    return <ChartSkeleton wrapperClassName="h-96" height="h-80" />;
  }

  if (error) {
    return (
      <div className="h-80 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-red-500">
        {error}
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic & Conversions Trend</h3>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TrendChart;