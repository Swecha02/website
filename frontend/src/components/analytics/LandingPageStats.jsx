import React, { useState, useEffect } from 'react';
import { getPageVisitCount, getButtonClicks, getCatalogueDownloadCount } from '@/lib/api';
import { subDays } from 'date-fns';
import { Users, Download, MessageCircle, Globe, FileText } from 'lucide-react';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';

const LandingPageStats = () => {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 7),
    endDate: new Date()
  });
  
  const [metrics, setMetrics] = useState({
    landingVisits: 0,
    downloadClicks: 0,
    whatsappClicks: 0,
    websiteClicks: 0,
    formSubmissions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      try {
        const { startDate, endDate } = dateRange;

        // 1. Landing Visits (filtering by page_name for QR landing)
        const landingVisits = await getPageVisitCount(startDate, endDate, 'QR Landing Page');

        // 2. Button Clicks
        const clicks = await getButtonClicks(startDate, endDate);

        let downloadClicks = 0;
        let whatsappClicks = 0;
        let websiteClicks = 0;

        if (clicks) {
          clicks.forEach(click => {
            if (click.button_name === 'Download Product Catalogue') downloadClicks++;
            if (click.button_name === 'Book a Demo / Request Quote (WhatsApp)') whatsappClicks++;
            if (click.button_name === 'Visit Official Website') websiteClicks++;
          });
        }

        // 3. Catalogue Form Submissions
        const formSubmissions = await getCatalogueDownloadCount(startDate, endDate);

        setMetrics({
          landingVisits: landingVisits || 0,
          downloadClicks,
          whatsappClicks,
          websiteClicks,
          formSubmissions: formSubmissions || 0
        });

      } catch (error) {
        console.error("Error fetching landing page stats:", error);
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
          <h2 className="text-lg font-semibold text-gray-800">Campaign Performance</h2>
          <p className="text-sm text-gray-500">QR Code Landing Page Analytics</p>
        </div>
        <DateRangeFilter onRangeChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <AnalyticsCard 
          title="Total Visits"
          value={metrics.landingVisits}
          icon={Users}
          color="bg-blue-600"
          isLoading={isLoading}
        />
        <AnalyticsCard 
          title="Download Clicks"
          value={metrics.downloadClicks}
          icon={Download}
          color="bg-green-600"
          isLoading={isLoading}
        />
        <AnalyticsCard 
          title="WhatsApp Leads"
          value={metrics.whatsappClicks}
          icon={MessageCircle}
          color="bg-teal-500"
          isLoading={isLoading}
        />
        <AnalyticsCard 
          title="Website Redirects"
          value={metrics.websiteClicks}
          icon={Globe}
          color="bg-indigo-500"
          isLoading={isLoading}
        />
        <AnalyticsCard 
          title="Catalogue Forms"
          value={metrics.formSubmissions}
          icon={FileText}
          color="bg-purple-600"
          isLoading={isLoading}
          subtext={`Conversion: ${metrics.landingVisits > 0 ? ((metrics.formSubmissions / metrics.landingVisits) * 100).toFixed(1) : 0}%`}
        />
      </div>

      {/* Additional Visualizations or Detailed tables could go here if needed later */}
    </div>
  );
};

export default LandingPageStats;