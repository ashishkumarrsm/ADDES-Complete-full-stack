import React from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaRocketchat, FaPhotoVideo, FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

// User Information
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  memberSince: "2021",
};

// Card Data
const cardData = [
  { title: "Telegram", icon: <FaTelegramPlane className="mb-3 text-4xl text-green-500" /> , url:'/join-telegram' },
  { title: "ROI Mining", icon: <FaRocketchat className="mb-3 text-4xl text-purple-500" />, url:'/roi-mining' },
  { title: "Call", icon: <IoCall className="mb-3 text-4xl text-yellow-500" />,  url:'/watch-adds' },
  { title: "Watch Video", icon: <FaPhotoVideo className="mb-3 text-4xl text-red-500" />,  url:'/watch-adds' },
];

const UserData = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 mx-auto max-w-7xl rounded-md bg-white/50 md:grid-cols-3">
      {/* User Info Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center p-6 text-center bg-white rounded-lg shadow-lg"
      >
        <FaUser className="mb-4 text-5xl text-blue-500" />
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2 text-gray-500">Member since {user.memberSince}</p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 col-span-2 gap-4 sm:grid-cols-2">
        {cardData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-lg"
          >
            {item.icon}
            <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
            <Link to={item.url} className="px-4 py-2 rounded-md border transition bg-gray-600/10 hover:bg-gray-200">
              Click Me
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserData;
