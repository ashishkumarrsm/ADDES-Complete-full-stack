import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimBonus, resetState } from "../redux/bonusSlice";
import { LoadingModal, SuccessModal } from "../components/PopModal";
import axios from "axios";
const BASEURL  ='http://localhost:8000';

const MiningButton = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [found, setFound] = useState(null); // null to indicate loading state
  const { loading, message } = useSelector((state) => state.bonuses);
  const userId = auth.id;

  const handleClaim = () => {
    dispatch(claimBonus({ user_id: userId, bonus_type: "roi_income" }));
  };

  const handleCloseModal = () => {
    dispatch(resetState());
  };

  const checkTransaction = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/tr/roi-check/${userId}`);
      setFound(response.data.success);
    } catch (error) {
      console.error(error);
      setFound(true); // fallback to true to prevent multiple claims
    }
  };

  useEffect(() => {
    checkTransaction();
  }, []);

  if (found === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-xl font-medium">Checking eligibility...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {!found ? (
        !loading ? (
          <button
            onClick={handleClaim}
            className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-2xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            ⛏️ Start Mining
          </button>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-6xl"
            >
              🧑‍🏭⛏️🪨
            </motion.div>
            <p className="text-lg font-semibold text-gray-700">
              Mining the coal... please wait
            </p>
          </div>
        )
      ) : (
        <div className="max-w-xl text-center space-y-4">
          <h2 className="text-3xl font-bold text-red-600">
            You've already mined your bonus today!
          </h2>
          <p className="text-gray-700">
            According to our mining system, you've already claimed your ROI income for today. Please come back tomorrow to continue mining your daily rewards.
          </p>
          <div className="text-sm text-gray-500 mt-4">
            <h3 className="font-semibold underline mb-2">Terms & Conditions</h3>
            <ul className="list-disc list-inside text-left">
              <li>You can only mine your bonus once every 24 hours.</li>
              <li>Make sure to claim it before the day ends.</li>
              <li>Any misuse of the system may result in suspension of mining access.</li>
              <li>Bonus is subject to availability and system checks.</li>
            </ul>
          </div>
        </div>
      )}
      <LoadingModal isLoading={loading} />
      {message && <SuccessModal message={message} clear={handleCloseModal} />}
    </div>
  );
};

export default MiningButton;
