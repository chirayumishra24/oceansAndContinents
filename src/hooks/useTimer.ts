import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/soundManager';

interface UseTimerProps {
  initialSeconds?: number;
  onTimeout: () => void;
  isRunning: boolean;
}

export function useTimer({ initialSeconds = 15, onTimeout, isRunning }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const resetTimer = useCallback((newTime: number = initialSeconds) => {
    setTimeLeft(newTime);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onTimeoutRef.current();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 5 && next > 0) {
          // Play warning sonar tick for urgency
          soundManager.playCountdownSound(true);
        } else if (next > 5 && next % 5 === 0) {
          soundManager.playCountdownSound(false);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return {
    timeLeft,
    resetTimer,
    isUrgent: timeLeft <= 5,
    percentage: Math.max(0, (timeLeft / initialSeconds) * 100),
  };
}
