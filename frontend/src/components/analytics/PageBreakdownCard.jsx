import React, { useEffect, useState } from 'react';
import { getPageVisits } from '@/lib/api';
import { Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const PageBreakdownCard = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const visits = await getPageVisits(startDate, endDate);

        // Group by page name
        const counts = {};
        visits.forEach(visit => {
          const page = visit.page_name || 'Unknown';
          counts[page] = (counts[page] || 0) + 1;
        });

        // Convert to array and sort
        const sortedData = Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setData(sortedData);
      } catch (err) {
        console.error("Error fetching page breakdown:", err);
        setError("Failed to load page data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-96 flex flex-col">
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="flex-1 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton className="w-6 h-6 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-96 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-96 overflow-hidden flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5 text-indigo-500" />
        Most Visited Pages
      </h3>
      
      <div className="overflow-y-auto flex-1 pr-2 space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No visits recorded in this period.</p>
        ) : (
          data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold rounded text-xs">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-700 truncate max-w-[180px] sm:max-w-[240px]" title={item.name}>
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-gray-900">{item.count}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PageBreakdownCard;