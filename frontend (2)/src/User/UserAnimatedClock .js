import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";

const UserCountdownTimer = () => {
  const targetDate = new Date("2025-12-31T23:59:59").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-5 rounded-lg  flex flex-col items-center justify-center text-white ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col justify-center items-center p-6 w-full "
      >
        {/* Animated Clock Icon */}
        <motion.div
          className="z-10 p-4 bg-pink-400 rounded-full shadow-md"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <FaClock className="text-4xl text-white" />
        </motion.div>

        {/* Countdown Timer */}
        <h2 className="mt-4 text-3xl font-bold tracking-wider ">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </h2>

        <p className="mt-2 text-sm ">⏳ Time Left Until Event</p>
      </motion.div>
    </div>
  );
};

export default UserCountdownTimer;







