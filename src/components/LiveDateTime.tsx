import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

interface LiveDateTimeProps {
  variant?: 'header' | 'footer' | 'sidebar';
}

export const LiveDateTime: React.FC<LiveDateTimeProps> = ({ variant = 'header' }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = currentDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const timeZoneName = 'IST';

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-[#BFDBFE]">
        <Clock className="w-3.5 h-3.5 text-[#93C5FD]" />
        <span>Live System Time:</span>
        <span className="font-bold text-white bg-[#112240] px-2 py-0.5 rounded border border-[#1E3A8A]">
          {formattedDate} • {formattedTime} {timeZoneName}
        </span>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="p-2.5 rounded-xl bg-[#112240] border border-[#1E3A8A] text-left">
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#93C5FD] tracking-wider mb-1">
          <Calendar className="w-3 h-3 text-[#93C5FD]" />
          <span>Real-Time Tracker</span>
        </div>
        <div className="text-xs font-bold text-white font-mono">
          {formattedDate}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#BFDBFE] mt-0.5">
          <Clock className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-300">{formattedTime}</span>
          <span className="text-[10px] text-[#93C5FD]">({timeZoneName})</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#112240] border border-[#1E3A8A] text-xs font-mono shadow-inner">
      <div className="flex items-center gap-1 text-[#BFDBFE]">
        <Calendar className="w-3.5 h-3.5 text-[#93C5FD]" />
        <span className="font-semibold">{formattedDate}</span>
      </div>
      <span className="text-[#1E3A8A] font-bold">|</span>
      <div className="flex items-center gap-1.5 text-white">
        <Clock className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-bold text-emerald-300">{formattedTime}</span>
        <span className="text-[10px] px-1 py-0.2 rounded bg-[#0A192F] text-[#93C5FD] border border-[#1E3A8A]">
          {timeZoneName}
        </span>
      </div>
    </div>
  );
};
