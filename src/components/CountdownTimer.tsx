import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: string | null;
  label?: string;
}

interface TimeCardProps {
  value: number;
  label: string;
  index: number;
}

const TimeCard: React.FC<TimeCardProps> = ({ value, label, index }) => {
  const displayValue = value < 10 ? `0${value}` : value.toString();
  
  return (
    <div 
      className="flex flex-col items-center"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative">
        <div className="flex flex-col items-center justify-center w-16 h-20 sm:w-24 sm:h-28 rounded-lg shadow-lg 
                      bg-white dark:bg-dark-surface bg-opacity-95 backdrop-blur-sm
                      animate-countdown">
          <span className="text-2xl sm:text-4xl font-display font-bold">
            {displayValue}
          </span>
        </div>
      </div>
      <span className="text-xs sm:text-sm font-medium mt-2 opacity-80">
        {label}
      </span>
    </div>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, label }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-6 px-4">
        <h2 className="text-2xl font-bold mb-4 animate-pulse">
          {label || 'Trip has started!'}
        </h2>
        <p className="text-lg opacity-80">
          Enjoy your adventure!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto text-center py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">{label || 'Trip Countdown'}</h2>
      <div className="flex justify-center gap-2 sm:gap-4 mt-4">
        <TimeCard value={days} label="Days" index={0} />
        <TimeCard value={hours} label="Hours" index={1} />
        <TimeCard value={minutes} label="Min" index={2} />
        <TimeCard value={seconds} label="Sec" index={3} />
      </div>
    </div>
  );
};

export default CountdownTimer;