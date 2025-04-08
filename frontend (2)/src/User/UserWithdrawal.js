










import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaArrowLeft, FaCheck } from "react-icons/fa";

const UserWithdrawal = () => {
  const [balance, setBalance] = useState(600);
  const [formData, setFormData] = useState({
    amount: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.amount) > balance) {
      alert("Insufficient Balance!");
    } else {
      setBalance(balance - parseInt(formData.amount));
      alert("Withdrawal Successful!");
      setFormData({ amount: "", password: "" });
    }
  };

  return (
 <>
 <div className="p-10 mx-auto max-w-7xl">
 <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mx-auto max-w-5xl rounded-xl shadow-md bg-white/50"
    >
      <h2 className="flex items-center mb-4 text-2xl font-bold text-gray-900">
        <FaUser className="mr-2 text-gray-900" /> Withdrawal
      </h2>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="mb-4 text-lg font-semibold">
          Balance: <span className="font-bold text-blue-600">${balance}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700">Amount*</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="p-2 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block font-medium text-gray-700">
                Transaction Password*
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="p-2 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              <FaCheck className="mr-2" /> Submit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-md"
            >
              <FaArrowLeft className="mr-2" /> Back
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
 </div>
 
 </>
  );
};

export default UserWithdrawal;
