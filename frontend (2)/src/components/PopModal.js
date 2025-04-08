import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
// Loading Modal Component
export const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className="w-full sm:w-96 md:w-96 p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-white relative"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg font-medium text-gray-800 text-center"
        >
          Processing request...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Success Modal Component
export const SuccessModal = ({ message, clear }) => {
  const dispatch = useDispatch();
  const onClose = () => {
    clear();
  };
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
          opacity: 1,
          scale: [0.8, 1.1, 1],
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className="w-full sm:w-96 md:w-96 p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-green-50 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle className="w-16 h-16 text-green-600" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg font-medium text-green-700 text-center"
        >
          {message || "Action completed successfully!"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Error Modal Component
export const ErrorModal = ({ message, clear }) => {
  const dispatch = useDispatch();
  if (!message) return null;
  const onClose = () => {
    clear();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: [0, -3, 3, -2, 2, 0],
          transition: { duration: 0.5 },
        }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className="w-full sm:w-96 md:w-96 p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-red-50 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <XCircle className="w-16 h-16 text-red-600" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg font-medium text-red-700 text-center"
        >
          {message || "Oops! Something went wrong."}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
