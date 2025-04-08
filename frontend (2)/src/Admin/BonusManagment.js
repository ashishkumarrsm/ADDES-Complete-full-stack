import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchBonuses, updateBonus, resetState } from "../redux/bonusSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoadingModal, SuccessModal, ErrorModal } from "../components/PopModal";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const BonusManagement = () => {
  const dispatch = useDispatch();
  const bonusData = useSelector((state) => state.bonuses.bonuses);
  const { loading, message, error } = useSelector((state) => state.bonuses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState(null);

  useEffect(() => {
    dispatch(fetchBonuses());
  }, [dispatch]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle edit button click
  const handleEdit = (bonus) => {
    setSelectedBonus(bonus);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBonus(null);
  };

  // Handle save changes
  const handleSaveChanges = (values) => {
    const { id, ...data } = values;
    // Here you would typically dispatch an action to update the bonus in your Redux store/backend
    dispatch(updateBonus({ id, data }));

    // Show success message (you could implement your own toast notification here)
    setIsModalOpen(false);
    dispatch(fetchBonuses());

    // Simple success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg";
    notification.textContent = "Bonus updated successfully!";
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  // Get bonus type formatted for display
  const formatBonusType = (type) => {
    switch (type) {
      case "ad_income":
        return "Ad Income";
      case "referral":
        return "Referral";
      case "signup":
        return "Signup";
      case "achievement":
        return "Achievement";
      default:
        return type;
    }
  };
  function handleClear() {
    dispatch(resetState());
  }

  return (
    <motion.div
      className="px-6 py-8 mx-auto max-w-6xl"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Bonus Management
        </h1>
        <p className="text-gray-600">
          View and manage all bonus entries in the system
        </p>
      </div>
      {message && <SuccessModal message={message} clear={handleClear} />}
       <LoadingModal isLoading={loading} />
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-pink-100 shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-pink-50 to-purple-50 text-left">
                <th className="p-4 font-semibold text-gray-700">ID</th>
                <th className="p-4 font-semibold text-gray-700">Amount</th>
                <th className="p-4 font-semibold text-gray-700">Bonus Type</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Created At</th>
                <th className="p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bonusData.map((bonus) => (
                <tr
                  key={bonus.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-800">#{bonus.id}</td>
                  <td className="p-4 font-medium text-gray-800">
                    ${bonus.amount.toFixed(2)}
                  </td>
                  <td className="p-4 text-gray-700">
                    {formatBonusType(bonus.bonus_type)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        bonus.status
                      )}`}
                    >
                      {bonus.status.charAt(0).toUpperCase() +
                        bonus.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">
                    {formatDate(bonus.created_at)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(bonus)}
                      className="px-3 py-1 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && selectedBonus && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Modal Panel */}
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl transform transition-all">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  Edit Bonus Entry
                </h3>
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <Formik
                initialValues={{
                  id: selectedBonus.id,
                  amount: selectedBonus.amount,
                  bonus_type: selectedBonus.bonus_type,
                  status: selectedBonus.status,
                }}
                onSubmit={(values) => {
                  handleSaveChanges(values);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="px-6 py-4">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="amount"
                          className="text-sm font-medium text-gray-700"
                        >
                          Amount
                        </label>
                        <Field
                          id="amount"
                          name="amount"
                          type="number"
                          step="0.01"
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <ErrorMessage
                          name="amount"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="bonus_type"
                          className="text-sm font-medium text-gray-700"
                        >
                          Bonus Type
                        </label>
                        <Field
                          as="select"
                          id="bonus_type"
                          name="bonus_type"
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="add_income">Ad Income</option>
                          <option value="referral">Referral</option>
                          <option value="signup">Signup</option>
                          <option value="achievement">Achievement</option>
                        </Field>
                        <ErrorMessage
                          name="bonus_type"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="status"
                          className="text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <Field
                          as="select"
                          id="status"
                          name="status"
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BonusManagement;
