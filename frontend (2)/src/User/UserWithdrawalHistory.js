







import React from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";

const transactions = [
  { id: 1, date: "2025-04-01", txnNo: "TXN12345", adminTDS: "$5", netAmount: "$95", status: "Success" },
  { id: 2, date: "2025-04-02", txnNo: "TXN12346", adminTDS: "$3", netAmount: "$97", status: "Pending" },
  { id: 3, date: "2025-04-03", txnNo: "TXN12347", adminTDS: "$10", netAmount: "$90", status: "Failed" },
];

const UserWithdrawalHistory = () => {
  return (
  <>
  
  <div className="p-10 mx-auto max-w-7xl">
  <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mx-auto max-w-6xl rounded-xl shadow-md bg-white/50"
    >
      <h2 className="flex items-center mb-4 text-2xl font-bold text-gray-900">
        <FaRegFileAlt className="mr-2 text-gray-900" /> Transaction History
      </h2>

      <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-sm font-semibold text-left bg-gray-200">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Txn No.</th>
              <th className="p-3 border">Admin/TDS</th>
              <th className="p-3 border">Net Amount</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-sm border-t hover:bg-gray-100"
              >
                <td className="p-3 border">{txn.id}</td>
                <td className="p-3 border">{txn.date}</td>
                <td className="p-3 border">{txn.txnNo}</td>
                <td className="p-3 border">{txn.adminTDS}</td>
                <td className="p-3 border">{txn.netAmount}</td>
                <td className={`p-3 border font-semibold ${
                  txn.status === "Success" ? "text-green-500" :
                  txn.status === "Pending" ? "text-yellow-500" : "text-red-500"
                }`}>
                  {txn.status}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
  </>
  );
};

export default UserWithdrawalHistory;
