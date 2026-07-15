import React, { useState, useEffect } from 'react';
import { getPageVisitCount, getFormSubmissionCount } from '@/lib/api';
import { subDays } from 'date-fns';
import { Users, FileText, Activity } from 'lucide-react';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';
import PageVisitsChart from '@/components/analytics/PageVisitsChart';
import TrendChart from '@/components/analytics/TrendChart';
import FormSubmissionsChart from '@/components/analytics/FormSubmissionsChart';
import PageBreakdownCard from '@/components/analytics/PageBreakdownCard';

const WebsiteStats = () => {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 7),
    endDate: new Date()
  });

  const [metrics, setMetrics] = useState({
    totalVisits: 0,
    totalForms: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      try {
        const { startDate, endDate } = dateRange;

        // 1. Total Page Visits (All pages)
        const totalVisits = await getPageVisitCount(startDate, endDate);

        // 2. Total Form Submissions
        const totalForms = await getFormSubmissionCount(startDate, endDate);

        setMetrics({
          totalVisits: totalVisits || 0,
          totalForms: totalForms || 0
        });

      } catch (error) {
        console.error("Error fetching website stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [dateRange]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Website Overview</h2>
          <p className="text-sm text-gray-500">Main Website Traffic & Engagement</p>
        </div>
        <DateRangeFilter onRangeChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard 
          title="Total Page Views"
          value={metrics.totalVisits}
          icon={Users}
          color="bg-blue-600"
          isLoading={isLoading}
        />
        <AnalyticsCard 
          title="Total Form Submissions"
          value={metrics.totalForms}
          icon={FileText}
          color="bg-purple-600"
          isLoading={isLoading}
        />
        <AnalyticsCard 
          title="Avg. Daily Visits"
          value={metrics.totalVisits > 0 ? Math.round(metrics.totalVisits / 7) : 0} // Approximation based on range or just keep simple
          icon={Activity}
          color="bg-orange-500"
          isLoading={isLoading}
          subtext="Estimated average"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-md font-bold text-gray-500 uppercase tracking-wider px-1">Traffic Trends</h3>
          <TrendChart startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-md font-bold text-gray-500 uppercase tracking-wider px-1">Page Popularity</h3>
          <PageVisitsChart startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-4">
          <h3 className="text-md font-bold text-gray-500 uppercase tracking-wider px-1">Detailed Page Breakdown</h3>
          <PageBreakdownCard startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-bold text-gray-500 uppercase tracking-wider px-1">Conversion Breakdown</h3>
          <FormSubmissionsChart startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>
      </div>
    </div>
  );
};

export default WebsiteStats;