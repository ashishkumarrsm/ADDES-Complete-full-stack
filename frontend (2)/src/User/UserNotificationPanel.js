// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaBell, FaTimes } from "react-icons/fa";
// import Marquee from "react-fast-marquee";

// const UserNotificationPanel = () => {
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: "🔥 New user signed up!", type: "success" },
//     { id: 2, message: "⚠️ Server maintenance at midnight!", type: "warning" },
//     { id: 3, message: "✅ Your profile was updated!", type: "info" },
//   ]);

//   const [isOpen, setIsOpen] = useState(false);

//   const removeNotification = (id) => {
//     setNotifications(notifications.filter((n) => n.id !== id));
//   };

//   return (
//     <div className="relative p-4 rounded-xl shadow-lg bg-white/50">
//       {/* Bell Icon with Badge and Marquee */}
//       <div className="flex justify-between items-center">
//         <motion.div
//           className="flex relative justify-center items-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
//           whileHover={{ scale: 1.1 }}
//           transition={{ type: "spring", stiffness: 100 }}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <FaBell className="text-2xl text-gray-600 transition hover:text-pink-500" />
//           {notifications.length > 0 && (
//             <motion.span
//               className="absolute -top-1 -right-1 px-2 text-xs text-white bg-pink-500 rounded-full"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               {notifications.length}
//             </motion.span>
//           )}
//         </motion.div>

//         <div className="ml-4 w-3/4">
//           <Marquee gradient={false} speed={50} pauseOnHover>
//             📢 Latest Updates:{" "}
//             {notifications.map((notif) => (
//               <span key={notif.id} className="mx-4 font-medium text-gray-700">
//                 {notif.message} &nbsp; | &nbsp;
//               </span>
//             ))}
//           </Marquee>
//         </div>
//       </div>

//       {/* Notification Panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute right-0 z-50 p-4 mt-3 w-80 bg-white rounded-lg border border-gray-300 shadow-xl"
//           >
//             {/* Marquee Header */}
//             <div className="overflow-hidden py-1 text-sm text-white bg-pink-400 rounded-md">
//               <Marquee gradient={false} speed={50} pauseOnHover>
//                 📢 Latest Updates:{" "}
//                 {notifications.map((notif) => (
//                   <span key={notif.id} className="mx-4">
//                     {notif.message} &nbsp; | &nbsp;
//                   </span>
//                 ))}
//               </Marquee>
//             </div>

//             {/* Notification Header */}
//             <div className="flex justify-between items-center mt-2">
//               <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
//               <button onClick={() => setIsOpen(false)}>
//                 <FaTimes className="text-gray-500 transition hover:text-pink-500" />
//               </button>
//             </div>

//             {/* Scrolling Notification Highlights */}
//             <div className="overflow-hidden p-2 mt-3 bg-gray-50 rounded-md shadow-sm">
//               <Marquee gradient={false} speed={40} pauseOnHover>
//                 {notifications.map((notif) => (
//                   <span key={notif.id} className="mx-4 text-sm text-gray-600">
//                     {notif.message} &nbsp; | &nbsp;
//                   </span>
//                 ))}
//               </Marquee>
//             </div>

//             {/* Notification List */}
//             <ul className="mt-4 space-y-3">
//               {notifications.map((notif) => (
//                 <motion.li
//                   key={notif.id}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex justify-between items-center p-3 rounded-md shadow-sm border-l-4 ${
//                     notif.type === "success"
//                       ? "bg-green-50 text-green-700 border-green-300"
//                       : notif.type === "warning"
//                       ? "bg-yellow-50 text-yellow-700 border-yellow-300"
//                       : "bg-pink-50 text-pink-700 border-pink-300"
//                   }`}
//                 >
//                   <span className="text-sm">{notif.message}</span>
//                   <button onClick={() => removeNotification(notif.id)}>
//                     <FaTimes className="text-gray-400 transition hover:text-red-500" />
//                   </button>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserNotificationPanel;

























// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Bell, 
//   X, 
//   CheckCircle, 
//   AlertTriangle, 
//   Info, 
//   Settings, 
//   Trash2,
//   Clock
// } from "lucide-react";
// import Marquee from "react-fast-marquee";

// const UserNotificationPanel = () => {
//   const [notifications, setNotifications] = useState([
//     { 
//       id: 1, 
//       message: "New user signed up to your network!", 
//       type: "success",
//       time: "2 minutes ago" 
//     },
//     { 
//       id: 2, 
//       message: "Server maintenance scheduled at midnight", 
//       type: "warning",
//       time: "1 hour ago" 
//     },
//     { 
//       id: 3, 
//       message: "Your profile was updated successfully", 
//       type: "info",
//       time: "3 hours ago" 
//     },
//     { 
//       id: 4, 
//       message: "Monthly report is now available for download", 
//       type: "info",
//       time: "Yesterday" 
//     },
//   ]);

//   const [isOpen, setIsOpen] = useState(false);
//   const [showClearConfirm, setShowClearConfirm] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("all");

//   const filteredNotifications = notifications.filter(n => {
//     if (activeFilter === "all") return true;
//     return n.type === activeFilter;
//   });

//   const removeNotification = (id) => {
//     setNotifications(notifications.filter((n) => n.id !== id));
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//     setShowClearConfirm(false);
//   };

//   const notificationColors = {
//     success: {
//       bg: "bg-emerald-50",
//       border: "border-emerald-400",
//       text: "text-emerald-700",
//       icon: <CheckCircle size={18} className="text-emerald-500" />
//     },
//     warning: {
//       bg: "bg-amber-50",
//       border: "border-amber-400",
//       text: "text-amber-700",
//       icon: <AlertTriangle size={18} className="text-amber-500" />
//     },
//     info: {
//       bg: "bg-indigo-50",
//       border: "border-indigo-400",
//       text: "text-indigo-700",
//       icon: <Info size={18} className="text-indigo-500" />
//     }
//   };

//   // Auto close panel when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const panel = document.getElementById("notification-panel");
//       const bell = document.getElementById("notification-bell");
      
//       if (isOpen && panel && bell && 
//           !panel.contains(event.target) && 
//           !bell.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
    
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <div className="relative p-4 rounded-xl shadow-lg bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
//       {/* Bell Icon with Badge and Marquee */}
//       <div className="flex justify-between items-center gap-4">
//         <motion.div
//           id="notification-bell"
//           className="flex relative justify-center items-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg cursor-pointer"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 300, damping: 15 }}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <Bell className="text-white" size={22} />
//           {notifications.length > 0 && (
//             <motion.span
//               className="absolute -top-1 -right-1 px-2 py-0.5 min-w-[20px] text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center shadow-md"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               {notifications.length}
//             </motion.span>
//           )}
//         </motion.div>

//         <div className="flex-1  rounded-lg overflow-hidden shadow-inner bg-white/">
//           <Marquee gradient gradientColor={[248, 250, 252]} gradientWidth={20} speed={40} pauseOnHover>
//             {notifications.length > 0 ? (
//               notifications.map((notif) => (
//                 <span key={notif.id} className="mx-4 font-medium flex items-center">
//                   {notificationColors[notif.type].icon}
//                   <span className="ml-2 ">{notif.message}</span>
//                   <span className="mx-2 ">•</span>
//                 </span>
//               ))
//             ) : (
//               <span className="mx-4 font-medium  flex items-center">
//                 <Info size={18} className="mr-2" />
//                 No new notifications
//               </span>
//             )}
//           </Marquee>
//         </div>
//       </div>

//       {/* Notification Panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             id="notification-panel"
//             initial={{ opacity: 0, y: -20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20, scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300, damping: 25 }}
//             className="absolute right-0 z-50 p-4 mt-3 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-indigo-100 shadow-2xl"
//           >
//             {/* Notification Header */}
//             <div className="flex justify-between items-center pb-3 border-b border-indigo-100">
//               <h3 className="text-lg font-bold text-indigo-900 flex items-center">
//                 <Bell size={20} className="mr-2 text-indigo-600" />
//                 Notifications
//               </h3>
//               <div className="flex gap-2">
//                 {notifications.length > 0 && (
//                   <motion.button 
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setShowClearConfirm(true)}
//                     className="p-1.5 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
//                   >
//                     <Trash2 size={16} />
//                   </motion.button>
//                 )}
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsOpen(false)}
//                   className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <X size={16} />
//                 </motion.button>
//               </div>
//             </div>

//             {/* Filter Tabs */}
//             <div className="flex mt-3 p-1 bg-gray-100 rounded-lg">
//               {[
//                 { id: "all", label: "All" },
//                 { id: "success", label: "Success" },
//                 { id: "warning", label: "Alerts" },
//                 { id: "info", label: "Updates" }
//               ].map(filter => (
//                 <button
//                   key={filter.id}
//                   onClick={() => setActiveFilter(filter.id)}
//                   className={`flex-1 py-1.5 px-2 text-sm font-medium rounded-md transition-all ${
//                     activeFilter === filter.id
//                       ? "bg-white text-indigo-700 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>

//             {/* Notification List */}
//             <div className="mt-4 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
//               {filteredNotifications.length > 0 ? (
//                 <ul className="space-y-3">
//                   {filteredNotifications.map((notif) => (
//                     <motion.li
//                       key={notif.id}
//                       layout
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-start p-3 rounded-lg shadow-sm ${notificationColors[notif.type].bg} ${notificationColors[notif.type].border} border-l-4`}
//                     >
//                       <div className="mr-3 mt-0.5">
//                         {notificationColors[notif.type].icon}
//                       </div>
//                       <div className="flex-1">
//                         <p className={`text-sm font-medium ${notificationColors[notif.type].text}`}>
//                           {notif.message}
//                         </p>
//                         <div className="flex items-center mt-1 text-xs text-gray-500">
//                           <Clock size={12} className="mr-1" />
//                           {notif.time}
//                         </div>
//                       </div>
//                       <motion.button 
//                         whileHover={{ scale: 1.15 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => removeNotification(notif.id)}
//                         className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-white/50 transition-colors"
//                       >
//                         <X size={14} />
//                       </motion.button>
//                     </motion.li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="py-8 text-center">
//                   <div className="inline-flex justify-center items-center w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full mb-4">
//                     <Bell size={24} />
//                   </div>
//                   <p className="text-gray-500 font-medium">
//                     {notifications.length === 0 
//                       ? "No notifications yet" 
//                       : `No ${activeFilter} notifications`}
//                   </p>
//                   {notifications.length === 0 ? (
//                     <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
//                   ) : (
//                     <button 
//                       onClick={() => setActiveFilter("all")}
//                       className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
//                     >
//                       Show all notifications
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Footer with settings link */}
//             {notifications.length > 0 && (
//               <div className="mt-4 pt-3 border-t border-indigo-100 flex justify-between items-center text-sm">
//                 <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
//                   <Settings size={14} className="mr-1" />
//                   Notification Settings
//                 </button>
//                 <button 
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={() => setActiveFilter("all")}
//                 >
//                   {filteredNotifications.length !== notifications.length && (
//                     `View all (${notifications.length})`
//                   )}
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Clear All Confirmation */}
//       <AnimatePresence>
//         {showClearConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-xl p-6 shadow-2xl max-w-sm mx-4"
//             >
//               <h3 className="text-lg font-bold text-gray-800 mb-2">Clear all notifications?</h3>
//               <p className="text-gray-600 mb-6">This action cannot be undone. All notifications will be permanently removed.</p>
              
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowClearConfirm(false)}
//                   className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={clearAllNotifications}
//                   className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserNotificationPanel;














import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfo, FaCog, FaTrash, FaClock } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const UserNotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: "🔥 New user signed up!", 
      type: "success",
      time: "2 minutes ago" 
    },
    { 
      id: 2, 
      message: "⚠️ Server maintenance at midnight!", 
      type: "warning",
      time: "1 hour ago" 
    },
    { 
      id: 3, 
      message: "✅ Your profile was updated!", 
      type: "info",
      time: "3 hours ago" 
    },
    { 
      id: 4, 
      message: "📊 Monthly report is available", 
      type: "info",
      time: "Yesterday" 
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowClearConfirm(false);
  };

  const notificationColors = {
    success: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
      icon: <FaCheckCircle className="text-green-500" />
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-700",
      icon: <FaExclamationTriangle className="text-yellow-500" />
    },
    info: {
      bg: "bg-pink-50",
      border: "border-pink-300",
      text: "text-pink-700",
      icon: <FaInfo className="text-pink-500" />
    }
  };

  // Auto close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const panel = document.getElementById("notification-panel");
      const bell = document.getElementById("notification-bell");
      
      if (isOpen && panel && bell && 
          !panel.contains(event.target) && 
          !bell.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative p-2 sm:p-4 rounded-xl shadow-lg bg-gradient-to-b from-indigo-900 to-purple-900  text-white">
      {/* Bell Icon with Badge and Marquee */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <motion.div
          id="notification-bell"
          className="flex relative justify-center items-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBell className="text-xl sm:text-2xl text-gray-600 transition hover:text-pink-500" />
          {notifications.length > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] sm:min-w-[20px] text-xs font-medium text-white bg-pink-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {notifications.length}
            </motion.span>
          )}
        </motion.div>

        <div className="flex-1 w-full ml-0 sm:ml-4 rounded-lg overflow-hidden">
          <Marquee gradient={false} speed={50} pauseOnHover>
            📢 Latest Updates:{" "}
            {notifications.map((notif) => (
              <span key={notif.id} className="mx-4 font-medium ">
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
            id="notification-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 left-0 sm:left-auto z-50 p-3 sm:p-4 mt-3 w-full sm:w-80 bg-white rounded-lg border border-gray-300 shadow-xl"
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Notifications</h3>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowClearConfirm(true)}
                    className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <FaTrash size={12} />
                  </motion.button>
                )}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-gray-500 transition hover:text-pink-500" />
                </motion.button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex mt-3 p-1 bg-gray-100 rounded-lg">
              {[
                { id: "all", label: "All" },
                { id: "success", label: "Success" },
                { id: "warning", label: "Alerts" },
                { id: "info", label: "Updates" }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex-1 py-1 sm:py-1.5 px-1 sm:px-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                    activeFilter === filter.id
                      ? "bg-white text-pink-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
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
            <div className="mt-3 max-h-64 sm:max-h-80 overflow-y-auto pr-1 custom-scrollbar">
              {filteredNotifications.length > 0 ? (
                <ul className="mt-2 space-y-2 sm:space-y-3">
                  {filteredNotifications.map((notif) => (
                    <motion.li
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className={`flex justify-between items-start p-2 sm:p-3 rounded-md shadow-sm border-l-4 ${
                        notif.type === "success"
                          ? "bg-green-50 text-green-700 border-green-300"
                          : notif.type === "warning"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                          : "bg-pink-50 text-pink-700 border-pink-300"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="mr-2">{notificationColors[notif.type].icon}</span>
                          <span className="text-xs sm:text-sm">{notif.message}</span>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <FaClock size={10} className="mr-1" />
                          {notif.time}
                        </div>
                      </div>
                      <button onClick={() => removeNotification(notif.id)} className="ml-2 p-1">
                        <FaTimes className="text-gray-400 transition hover:text-red-500" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="py-6 text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 bg-pink-50 text-pink-500 rounded-full mb-3">
                    <FaBell size={20} />
                  </div>
                  <p className="text-gray-500 font-medium">
                    {notifications.length === 0 
                      ? "No notifications yet" 
                      : `No ${activeFilter} notifications`}
                  </p>
                  {notifications.length === 0 ? (
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">You're all caught up!</p>
                  ) : (
                    <button 
                      onClick={() => setActiveFilter("all")}
                      className="mt-2 text-xs sm:text-sm text-pink-600 hover:text-pink-800"
                    >
                      Show all notifications
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer with settings link */}
            {notifications.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center text-xs sm:text-sm">
                <button className="text-pink-600 hover:text-pink-800 font-medium flex items-center">
                  <FaCog size={12} className="mr-1" />
                  Notification Settings
                </button>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setActiveFilter("all")}
                >
                  {filteredNotifications.length !== notifications.length && (
                    `View all (${notifications.length})`
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear All Confirmation */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl w-full max-w-xs sm:max-w-sm"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Clear all notifications?</h3>
              <p className="text-sm text-gray-600 mb-4 sm:mb-6">This action cannot be undone. All notifications will be permanently removed.</p>
              
              <div className="flex justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-white bg-pink-500 hover:bg-pink-600 rounded-lg font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserNotificationPanel;