import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import type { TimerProps } from "../types/Game";

export type TimerHandle = {
  addTime: (seconds: number) => void;
};

const Timer = forwardRef<TimerHandle, TimerProps>(({ initialTime, onTimeUp }, ref) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useImperativeHandle(ref, () => ({
    addTime: (seconds: number) => {
      setTimeLeft((prev) => prev + seconds);
    },
  }));

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft > 0]);

  return <h3>Time: {timeLeft}</h3>;
});

export default Timer;