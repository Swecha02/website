import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AnalyticsCard = ({ title, value, icon: Icon, color = "bg-blue-600", subtext, isLoading = false }) => {
  const iconColor = color.replace('bg-', 'text-');
  const bgOpacity = "bg-opacity-10";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 ${color}`}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
          {isLoading ? (
            <div className="h-9 flex items-center">
              <Skeleton className="h-7 w-16" />
            </div>
          ) : (
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} ${bgOpacity}`}>
          {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
        </div>
      </div>
      
      {subtext && (
        <p className="text-xs text-gray-400 font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default AnalyticsCard;