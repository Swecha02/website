import React, { useState } from 'react';
import { subDays, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DateRangeFilter = ({ onRangeChange, className = "" }) => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    const end = new Date();
    let start = new Date();

    switch (range) {
      case '7d':
        start = subDays(end, 7);
        break;
      case '30d':
        start = subDays(end, 30);
        break;
      case '90d':
        start = subDays(end, 90);
        break;
      default:
        // For custom, don't trigger change yet
        return;
    }

    onRangeChange({ startDate: start, endDate: end });
  };

  const applyCustomRange = () => {
    if (customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd);
      // Set end of day for the end date to include the full day
      end.setHours(23, 59, 59, 999);
      onRangeChange({ startDate: start, endDate: end });
      setIsCustomOpen(false);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Button
        variant={selectedRange === '7d' ? 'default' : 'outline'}
        onClick={() => handleRangeSelect('7d')}
        size="sm"
        className="rounded-full"
      >
        Last 7 Days
      </Button>
      <Button
        variant={selectedRange === '30d' ? 'default' : 'outline'}
        onClick={() => handleRangeSelect('30d')}
        size="sm"
        className="rounded-full"
      >
        Last 30 Days
      </Button>
      <Button
        variant={selectedRange === '90d' ? 'default' : 'outline'}
        onClick={() => handleRangeSelect('90d')}
        size="sm"
        className="rounded-full"
      >
        Last 90 Days
      </Button>

      <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={selectedRange === 'custom' ? 'default' : 'outline'}
            onClick={() => setSelectedRange('custom')}
            size="sm"
            className="rounded-full flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Custom
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Custom Range</h4>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="start" className="text-sm">Start</label>
                <input
                  type="date"
                  id="start"
                  className="col-span-2 h-8 rounded-md border border-input px-3 text-sm"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="end" className="text-sm">End</label>
                <input
                  type="date"
                  id="end"
                  className="col-span-2 h-8 rounded-md border border-input px-3 text-sm"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={applyCustomRange} className="w-full">
              Apply Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;