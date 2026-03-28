import React, { useState, useEffect, useMemo } from "react";
import { minute_Calculate, formatTime } from "../utils/Helper";

export default function Timer({ totalQuestions, setResult }) {
  const totalSeconds = useMemo(
    () => minute_Calculate(totalQuestions),
    [totalQuestions]
  );
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      setResult(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setResult]);

  return (
    <div className="text-center mb-3">
      <h5>Time Left: {formatTime(timeLeft)}</h5>
    </div>
  );
}
