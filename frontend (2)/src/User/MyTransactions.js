import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserTransactions,
  createTransaction,
  resetTransactionState,
} from "../redux/transactionSlice";
import { useParams } from "react-router-dom";

const MyTransactions = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const  user_id  = auth.id;
  const { source } = useParams();
  const {
    userTransactions,
    totalPages,
    currentPage,
    loading,
    error,
    success,
    message,
  } = useSelector((state) => state.transaction);

  // Filter states
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    transaction_type: "",
    status: "",
    search: "",
  });

  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    transaction_type: "deposit",
    source: "bank",
    status: "pending",
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transaction type and source options
  const transactionTypeOptions = ["deposit", "withdrawal", "transfer"];
  const sourceOptions = ["bank", "card", "wallet", "crypto"];

  // Load user transactions on component mount and when filters change
  useEffect(() => {
    if (user_id) {
      dispatch(getUserTransactions({ user_id, ...filters, source }));
    }
  }, [dispatch, user_id, filters.page, filters.limit, source]);

  // Clear success message after displaying
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetTransactionState());
        if (isModalOpen) {
          setIsModalOpen(false);
          setNewTransaction({
            amount: "",
            transaction_type: "deposit",
            source: "bank",
            status: "pending",
          });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, isModalOpen]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page when changing filters
    }));
  };

  // Apply filters
  const applyFilters = () => {
    dispatch(getUserTransactions({ user_id, ...filters, source }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      transaction_type: "",
      status: "",
      search: "",
    });
    dispatch(getUserTransactions({ user_id, page: 1, limit: 10, source }));
  };

  // Handle new transaction form changes
  const handleNewTransactionChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value,
    }));
  };

  // Submit new transaction
  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        user_id,
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
      })
    );
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get transaction type badge color
  const getTransactionTypeBadgeClass = (type) => {
    switch (type) {
      case "deposit":
        return "bg-green-100 text-green-800";
      case "withdrawal":
        return "bg-red-100 text-red-800";
      case "transfer":
        return "bg-blue-100 text-blue-800";
      case "refund":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Transactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          New Transaction
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Filter Transactions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Transaction Type Filter */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Transaction Type
            </label>
            <select
              name="transaction_type"
              value={filters.transaction_type}
              onChange={handleFilterChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {transactionTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
              <option value="refund">Refund</option>
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Source
            </label>
            <select
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sources</option>
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {source.charAt(0).toUpperCase() + source.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search
        </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by transaction ID or amount"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reset Filters
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Source</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : userTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center">
                    No transactions found
                  </td>
                </tr>
              ) : (
                userTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.transaction_id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left">
                      {index+1}
                    </td>
                    <td className="py-3 px-6 text-left">
                      ${Number(transaction.amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getTransactionTypeBadgeClass(
                          transaction.transaction_type
                        )}`}
                      >
                        {transaction.transaction_type.charAt(0).toUpperCase() +
                          transaction.transaction_type.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {transaction.source.charAt(0).toUpperCase() +
                        transaction.source.slice(1)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {userTransactions.length > 0 && (
          <div className="px-6 py-4 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * filters.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * filters.limit,
                    (currentPage - 1) * filters.limit + userTransactions.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {totalPages * filters.limit}
                </span>{" "}
                entries
              </span>
            </div>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Prev
              </button>
              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageToShow;
                  if (totalPages <= 5) {
                    pageToShow = i + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i;
                  } else {
                    pageToShow = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageToShow}
                      onClick={() => handlePageChange(pageToShow)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === pageToShow
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {pageToShow}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Create New Transaction
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitTransaction}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleNewTransactionChange}
                  placeholder="Enter amount"
                  step="0.01"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Transaction Type
                </label>
                <select
                  name="transaction_type"
                  value={newTransaction.transaction_type}
                  onChange={handleNewTransactionChange}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {transactionTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Source
                </label>
                <select
                  name="source"
                  value={newTransaction.source}
                  onChange={handleNewTransactionChange}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source.charAt(0).toUpperCase() + source.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
