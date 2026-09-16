import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/soundManager';

interface UseTimerProps {
  initialSeconds?: number;
  onTimeout: () => void;
  isRunning: boolean;
  roundKey?: number | string;
}

export function useTimer({ initialSeconds = 30, onTimeout, isRunning, roundKey }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const onTimeoutRef = useRef(onTimeout);
  const hasTimedOutRef = useRef<boolean>(false);
  const prevIsRunningRef = useRef<boolean>(isRunning);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const resetTimer = useCallback((newTime: number = initialSeconds) => {
    hasTimedOutRef.current = false;
    setTimeLeft(newTime);
  }, [initialSeconds]);

  // When roundKey changes, reset the timer
  useEffect(() => {
    resetTimer(initialSeconds);
  }, [roundKey, resetTimer, initialSeconds]);

  // When isRunning transitions from false -> true, reset the timer
  useEffect(() => {
    const wasRunning = prevIsRunningRef.current;
    prevIsRunningRef.current = isRunning;

    if (isRunning && !wasRunning) {
      resetTimer(initialSeconds);
    }
  }, [isRunning, resetTimer, initialSeconds]);

  // Interval ticker
  useEffect(() => {
    if (!isRunning) return;

    hasTimedOutRef.current = false;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasTimedOutRef.current) {
            hasTimedOutRef.current = true;
            setTimeout(() => {
              onTimeoutRef.current();
            }, 0);
          }
          return 0;
        }
        const next = prev - 1;
        if (next <= 5 && next > 0) {
          soundManager.playCountdownSound(true);
        } else if (next > 5 && next % 5 === 0) {
          soundManager.playCountdownSound(false);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, roundKey]);

  return {
    timeLeft,
    resetTimer,
    isUrgent: timeLeft <= 5,
    percentage: Math.max(0, (timeLeft / initialSeconds) * 100),
  };
}
