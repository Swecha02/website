import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Fixed heights (not random) so the placeholder doesn't shift between renders.
const BAR_HEIGHTS = ['40%', '65%', '35%', '80%', '55%', '70%', '45%'];

const ChartSkeleton = ({ title = true, height = 'h-64', wrapperClassName = '' }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${wrapperClassName}`}>
    {title && <Skeleton className="h-5 w-48 mb-4" />}
    <div className={`${height} flex items-end gap-3`}>
      {BAR_HEIGHTS.map((h, i) => (
        <Skeleton key={i} className="flex-1 rounded-t" style={{ height: h }} />
      ))}
    </div>
  </div>
);

export default ChartSkeleton;
