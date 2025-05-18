import { format, addDays, differenceInDays } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatShortDate = (date: string | Date): string => {
  if (!date) return '';
  return format(new Date(date), 'MMM d');
};

export const getDaysBetweenDates = (startDate: string | Date, endDate: string | Date): number => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return differenceInDays(end, start) + 1; // Include both start and end dates
};

export const generateDayList = (startDate: string | Date, endDate: string | Date): { date: Date; dayNumber: number }[] => {
  if (!startDate || !endDate) return [];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayCount = getDaysBetweenDates(start, end);
  
  return Array.from({ length: dayCount }, (_, i) => {
    return {
      date: addDays(start, i),
      dayNumber: i + 1
    };
  });
};

export const getTripDurationText = (startDate: string | Date, endDate: string | Date): string => {
  if (!startDate || !endDate) return '';
  const days = getDaysBetweenDates(startDate, endDate);
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  if (weeks === 1 && remainingDays === 0) return '1 week';
  if (remainingDays === 0) return `${weeks} weeks`;
  if (weeks === 1) return `1 week, ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  return `${weeks} weeks, ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
};