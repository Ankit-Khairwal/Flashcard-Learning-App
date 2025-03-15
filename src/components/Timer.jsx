import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp, isComplete }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("studySessionTimer");
    return savedTime ? parseInt(savedTime) : duration;
  });

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("studySessionTimer", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration, onTimeUp, isComplete]);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration);
    localStorage.setItem("studySessionTimer", duration.toString());
  }, [duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "1.25rem",
        fontWeight: "500",
        color: timeLeft < 60 ? "#ef4444" : "var(--text-color)",
        padding: "0.75rem 1rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <span role="img" aria-label="timer" style={{ fontSize: "1.5rem" }}>
        ⏱️
      </span>
      <div>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
      {timeLeft < 60 && (
        <span
          style={{
            fontSize: "0.875rem",
            color: "#ef4444",
            marginLeft: "0.5rem",
          }}
        >
          Time running out!
        </span>
      )}
    </div>
  );
};

export default Timer;
