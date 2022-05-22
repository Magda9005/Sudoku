import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const reset = () => {
    setTime(0);
  };

  return {time,reset,startTimer,pauseTimer,isActive}
};
