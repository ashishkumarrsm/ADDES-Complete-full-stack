import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaRupeeSign, FaHashtag, FaUpload } from "react-icons/fa";
import UserKycInfo from "./UserKycInfo";

const UserKycCharge = () => {
  return (
    <>
    
   <div className="p-5 mx-auto space-y-5 max-w-7xl">



   <div className="p-6 bg-gradient-to-br from-green-100 via-pink-100 to-gray-100 rounded-xl shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 justify-between items-center md:flex-row"
      >
        {/* Left Side Form */}
        <div className="p-6 w-full bg-white rounded-lg shadow-lg md:w-2/3">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">KYC Payment Details</h2>

          <form className="space-y-4">
            {/* No. of KYC */}
            <div className="flex items-center px-3 py-2 rounded-md border border-gray-300">
              <FaUserCheck className="mr-3 text-gray-500" />
              <input
                type="number"
                placeholder="Number of KYC"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>

            {/* KYC Charges */}
            <div className="flex items-center px-3 py-2 rounded-md border border-gray-300">
              <FaRupeeSign className="mr-3 text-gray-500" />
              <input
                type="number"
                placeholder="KYC Charges"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>

            {/* UTR Number */}
            <div className="flex items-center px-3 py-2 rounded-md border border-gray-300">
              <FaHashtag className="mr-3 text-gray-500" />
              <input
                type="text"
                placeholder="UTR Number"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>

            {/* Upload Slip */}
            <div className="flex items-center px-3 py-2 rounded-md border border-gray-300">
              <FaUpload className="mr-3 text-gray-500" />
              <input
                type="file"
                className="w-full text-sm text-gray-700"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 mt-4 w-full font-semibold text-white bg-green-500 rounded-lg shadow transition hover:bg-green-600"
            >
              Submit
            </motion.button>
          </form>
        </div>

        {/* Right Side QR Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center w-full md:w-1/3"
        >
          <img
            src="https://img.freepik.com/free-vector/characters-scanning-qr-codes-their-phones_23-2148616039.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid&w=740" // Replace this with your real QR code image
            alt="QR Code"
            className="rounded-xl shadow-md"
          />
        </motion.div>
      </motion.div>
    </div>




    <div>
        <UserKycInfo/>
    </div>
   </div>
    </>
    
  );
};

export default UserKycCharge;
