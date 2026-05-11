import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0 };
      } else {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        };
      }
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute since we only show hours

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerContainerStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    fontFamily: "'Outfit', sans-serif"
  };

  const textStyle = {
    fontSize: '20px',
    fontWeight: '800',
    color: '#ED1C24',
    letterSpacing: '-0.3px'
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    marginRight: '8px'
  };

  return (
    <div style={timerContainerStyle}>
      <span style={textStyle}>{timeLeft.days}</span>
      <span style={labelStyle}>Days</span>
      <span style={textStyle}>{timeLeft.hours}</span>
      <span style={labelStyle}>Hours</span>
    </div>
  );
};

export default CountdownTimer;
