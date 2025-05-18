import { useState, useEffect, useCallback } from 'react';
import { CountdownValues } from '../types';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export const useCountdown = (targetDate: string | null): CountdownValues => {
  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true
      };
    }

    const target = new Date(targetDate);
    const now = new Date();

    if (target <= now) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true
      };
    }

    const days = differenceInDays(target, now);
    const hours = differenceInHours(target, now) % 24;
    const minutes = differenceInMinutes(target, now) % 60;
    const seconds = differenceInSeconds(target, now) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<CountdownValues>(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;
    
    // Update immediately on first render
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Clear interval if countdown is expired
      if (newTimeLeft.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  return timeLeft;
};