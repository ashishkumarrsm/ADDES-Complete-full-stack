

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaExchangeAlt } from "react-icons/fa";

const dummyData = {
  transferFrom: "PTP7311992",
  kyc: "",
  transferTo: "",
  password: "",
};

const UserKycTransfer = () => {
  const [formData, setFormData] = useState(dummyData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
  <div className="p-10 mx-auto max-w-7xl">
      <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-xl shadow-md"
    >
      <h2 className="flex items-center mb-4 text-2xl font-bold text-gray-900">
        <FaUser className="mr-2 text-blue-900" /> KYC Transfer
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-4 bg-white rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Transfer From */}
          <div>
            <label className="block font-semibold text-gray-600">
              Transfer From *
            </label>
            <input
              type="text"
              name="transferFrom"
              value={formData.transferFrom}
              className="p-2 w-full bg-gray-200 rounded border cursor-not-allowed"
              readOnly
            />
          </div>

          {/* Transfer To */}
          <div>
            <label className="block font-semibold text-gray-600">
              Transfer To (User ID) *
            </label>
            <input
              type="text"
              name="transferTo"
              value={formData.transferTo}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="Enter recipient user ID"
              required
            />
          </div>

          {/* KYC */}
          <div>
            <label className="block font-semibold text-gray-600">KYC *</label>
            <input
              type="text"
              name="kyc"
              value={formData.kyc}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="Enter KYC Number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-600">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="Enter your withdrawal password"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            <FaExchangeAlt className="mr-2" /> Submit
          </motion.button>
          <button
            type="button"
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => setFormData(dummyData)}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  </div>
  );
};

export default UserKycTransfer;
