import { useEffect, useState } from "react";
import type { TimerProps } from "../types/Game";

export default function Timer({ initialTime, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
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
  }, []);

  return <h3>Time: {timeLeft}</h3>;
}