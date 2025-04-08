import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaTimes } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const UserNotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "🔥 New user signed up!", type: "success" },
    { id: 2, message: "⚠️ Server maintenance at midnight!", type: "warning" },
    { id: 3, message: "✅ Your profile was updated!", type: "info" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="relative p-4 rounded-xl shadow-lg bg-white/50">
      {/* Bell Icon with Badge and Marquee */}
      <div className="flex justify-between items-center">
        <motion.div
          className="flex relative justify-center items-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 100 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBell className="text-2xl text-gray-600 transition hover:text-pink-500" />
          {notifications.length > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 px-2 text-xs text-white bg-pink-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {notifications.length}
            </motion.span>
          )}
        </motion.div>

        <div className="ml-4 w-3/4">
          <Marquee gradient={false} speed={50} pauseOnHover>
            📢 Latest Updates:{" "}
            {notifications.map((notif) => (
              <span key={notif.id} className="mx-4 font-medium text-gray-700">
                {notif.message} &nbsp; | &nbsp;
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 z-50 p-4 mt-3 w-80 bg-white rounded-lg border border-gray-300 shadow-xl"
          >
            {/* Marquee Header */}
            <div className="overflow-hidden py-1 text-sm text-white bg-pink-400 rounded-md">
              <Marquee gradient={false} speed={50} pauseOnHover>
                📢 Latest Updates:{" "}
                {notifications.map((notif) => (
                  <span key={notif.id} className="mx-4">
                    {notif.message} &nbsp; | &nbsp;
                  </span>
                ))}
              </Marquee>
            </div>

            {/* Notification Header */}
            <div className="flex justify-between items-center mt-2">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes className="text-gray-500 transition hover:text-pink-500" />
              </button>
            </div>

            {/* Scrolling Notification Highlights */}
            <div className="overflow-hidden p-2 mt-3 bg-gray-50 rounded-md shadow-sm">
              <Marquee gradient={false} speed={40} pauseOnHover>
                {notifications.map((notif) => (
                  <span key={notif.id} className="mx-4 text-sm text-gray-600">
                    {notif.message} &nbsp; | &nbsp;
                  </span>
                ))}
              </Marquee>
            </div>

            {/* Notification List */}
            <ul className="mt-4 space-y-3">
              {notifications.map((notif) => (
                <motion.li
                  key={notif.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className={`flex justify-between items-center p-3 rounded-md shadow-sm border-l-4 ${
                    notif.type === "success"
                      ? "bg-green-50 text-green-700 border-green-300"
                      : notif.type === "warning"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                      : "bg-pink-50 text-pink-700 border-pink-300"
                  }`}
                >
                  <span className="text-sm">{notif.message}</span>
                  <button onClick={() => removeNotification(notif.id)}>
                    <FaTimes className="text-gray-400 transition hover:text-red-500" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNotificationPanel;
