    

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const UserBankDetails = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    holderName: "",
    ifsc: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
 <>
 
 <div className="p-10 mx-auto max-w-7xl">
    
 <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 mx-auto max-w-4xl bg-white rounded-lg border border-gray-200 shadow-lg"
    >
      <div className="flex items-center mb-4 text-lg font-semibold text-blue-600">
        <FaUser className="mr-2 text-xl" />
        My Bank Details
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block font-medium text-gray-700">Bank Name *</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Enter Bank Name"
              className="block p-2 mt-1 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">A/C Holder Name *</label>
            <input
              type="text"
              name="holderName"
              value={formData.holderName}
              onChange={handleChange}
              placeholder="Enter A/C Holder Name"
              className="block p-2 mt-1 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Bank IFSC *</label>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Enter IFSC Code"
              className="block p-2 mt-1 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Bank A/C Number *</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter Account Number"
              className="block p-2 mt-1 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-start mt-4 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg transition hover:bg-blue-700"
          >
            SUBMIT
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="px-4 py-2 font-medium text-white bg-gray-600 rounded-lg transition hover:bg-gray-700"
          >
            BACK
          </motion.button>
        </div>
      </form>
    </motion.div>
    </div>
    </>
  );
};

export default UserBankDetails;
