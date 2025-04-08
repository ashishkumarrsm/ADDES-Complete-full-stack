


import React from "react";
import { motion } from "framer-motion";
import { FaList, FaIdCard, FaBox, FaMoneyBill, FaUser, FaCheckCircle } from "react-icons/fa";

const dummyData = [
  { id: 1, kyc: "KYC001", packageName: "Gold Plan", amount: "$100", issuedTo: "John Doe", status: "Active" },
  { id: 2, kyc: "KYC002", packageName: "Silver Plan", amount: "$50", issuedTo: "Jane Smith", status: "Pending" },
  { id: 3, kyc: "KYC003", packageName: "Platinum Plan", amount: "$200", issuedTo: "Mike Johnson", status: "Expired" }
];

const UserKycDetails = () => {
  return (
   <div className="p-10 mx-auto max-w-7xl">
     <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl shadow-md bg-white/50"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-900">KYC Package Info</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="p-3 border"><FaList className="inline mr-2" />#</th>
              <th className="p-3 border"><FaIdCard className="inline mr-2" />KYC</th>
              <th className="p-3 border"><FaBox className="inline mr-2" />Package Name</th>
              <th className="p-3 border"><FaMoneyBill className="inline mr-2" />Package Amount</th>
              <th className="p-3 border"><FaUser className="inline mr-2" />Issued To</th>
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
                <td className="p-3 border">{item.kyc}</td>
                <td className="p-3 border">{item.packageName}</td>
                <td className="p-3 border">{item.amount}</td>
                <td className="p-3 border">{item.issuedTo}</td>
                <td className="p-3 border">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${item.status === "Active" ? "bg-green-500" : item.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
   </div>
  );
};

export default UserKycDetails;
