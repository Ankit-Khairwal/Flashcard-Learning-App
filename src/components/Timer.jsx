import React, { useEffect, useState } from "react";
import { localStorageKeys } from "../data/flashcards";

const Timer = ({ initialTime, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(localStorageKeys.TIMER);
    return savedTime ? parseInt(savedTime, 10) : initialTime;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem(localStorageKeys.TIMER, newTime.toString());

        if (newTime <= 0) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        padding: "1rem",
        color: timeLeft < 60 ? "#ef4444" : "var(--text-color)",
      }}
    >
      Time Remaining: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
