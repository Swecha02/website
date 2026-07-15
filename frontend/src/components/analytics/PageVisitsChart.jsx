import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getPageVisits } from '@/lib/api';
import ChartSkeleton from './ChartSkeleton';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PageVisitsChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getPageVisits(startDate, endDate);

        // Group by page name
        const counts = {};
        data.forEach(visit => {
          const page = visit.page_name || 'Unknown';
          counts[page] = (counts[page] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Visits',
              data: values,
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching page visits:", err);
        setError("Failed to load page visits data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (isLoading) {
    return <ChartSkeleton wrapperClassName="h-80" />;
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-red-500">
        {error}
      </div>
    );
  }

  if (!chartData || chartData.labels.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-gray-400">
        No visit data for this period
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-80">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Visited Pages</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PageVisitsChart;