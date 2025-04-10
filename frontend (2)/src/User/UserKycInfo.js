


import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaList, FaHashtag, FaCoins, FaFileImage, FaCalendar, FaCheckCircle } from "react-icons/fa";

const dummyData = [
  { id: 1, userId: "USR001", type: "New", utr: "UTR123456", qty: 5, amount: 2500, slip: "slip1.png", date: "2025-04-04", status: "Pending" },
  { id: 2, userId: "USR002", type: "Update", utr: "UTR789123", qty: 2, amount: 1000, slip: "slip2.png", date: "2025-04-03", status: "Approved" },
  { id: 3, userId: "USR003", type: "New", utr: "UTR456789", qty: 3, amount: 1500, slip: "slip3.png", date: "2025-04-02", status: "Rejected" }
];

const UserKycInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-green-100 via-pink-100 to-gray-100 rounded-xl shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-900">KYC Info</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="p-3 border"><FaList className="inline mr-2" />#</th>
              <th className="p-3 border"><FaUser className="inline mr-2" />User ID</th>
              <th className="p-3 border"><FaList className="inline mr-2" />Req. Type</th>
              <th className="p-3 border"><FaHashtag className="inline mr-2" />UTR No</th>
              <th className="p-3 border"><FaCoins className="inline mr-2" />KYC Qty</th>
              <th className="p-3 border"><FaCoins className="inline mr-2" />Amount</th>
              <th className="p-3 border"><FaFileImage className="inline mr-2" />Slip/Screenshot</th>
              <th className="p-3 border"><FaCalendar className="inline mr-2" />Request Date</th>
              <th className="p-3 border"><FaCheckCircle className="inline mr-2" />Status</th>
            </tr>
          </thead>

          <tbody>
            {dummyData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-gray-700 transition hover:bg-gray-100"
              >
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border">{item.userId}</td>
                <td className="p-3 border">{item.type}</td>
                <td className="p-3 border">{item.utr}</td>
                <td className="p-3 border">{item.qty}</td>
                <td className="p-3 border">{item.amount}</td>
                <td className="p-3 border">
                  <img src={`https://img.freepik.com/free-vector/characters-scanning-qr-codes-their-phones_23-2148616039.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid&w=740`} alt="Slip" className="w-10 h-10 rounded-md shadow-md" />
                </td>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">
                  <span className={`px-3 py-1 rounded-full text-gray-900 text-xs font-semibold ${item.status === "Approved" ? "bg-green-500" : item.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserKycInfo;
