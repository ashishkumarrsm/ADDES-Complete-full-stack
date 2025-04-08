





import React from "react";
import { motion } from "framer-motion";
import { FaTable } from "react-icons/fa";

const dummyData = [
  {
    sr: 1,
    particular: "Transaction 1",
    date: "2025-04-04",
    userId: "USR12345",
    name: "John Doe",
    noOfKycs: 3,
  },
  {
    sr: 2,
    particular: "Transaction 2",
    date: "2025-04-03",
    userId: "USR67890",
    name: "Jane Smith",
    noOfKycs: 5,
  },
  {
    sr: 3,
    particular: "Transaction 3",
    date: "2025-04-02",
    userId: "USR54321",
    name: "Michael Lee",
    noOfKycs: 2,
  },
];

const UserKycHistory = () => {
  return (
   <div className="p-10 mx-auto max-w-7xl">
     <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mx-auto max-w-5xl bg-white rounded-xl shadow-md"
    >
      <h2 className="flex items-center mb-4 text-2xl font-bold text-gray-900">
        <FaTable className="mr-2 text-gray-900" /> KYC Transactions
      </h2>

      <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Sr#</th>
              <th className="p-3 border">Particular</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">No of KYC’s</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover:bg-gray-100"
              >
                <td className="p-3 text-center border">{item.sr}</td>
                <td className="p-3 border">{item.particular}</td>
                <td className="p-3 text-center border">{item.date}</td>
                <td className="p-3 text-center border">{item.userId}</td>
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 text-center border">{item.noOfKycs}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
   </div>
  );
};

export default UserKycHistory;
