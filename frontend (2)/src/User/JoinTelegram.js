import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimBonus, resetState } from "../redux/bonusSlice";
import { LoadingModal, SuccessModal } from "../components/PopModal";
const telegramGroupUrl = "https://t.me/your_telegram_group"; // Replace with your real group link

const JoinTelegram = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { loading, message } = useSelector((state) => state.bonuses);
  const userId = auth.id;

  const handleClaim = async () => {
    dispatch(claimBonus({ user_id: userId, bonus_type: "telegram_income" }));
  };
  const [joined, setJoined] = useState(false);
  const [claimReady, setClaimReady] = useState(false);

  const handleJoin = () => {
    window.open(telegramGroupUrl, "_blank"); // Opens Telegram group in new tab
    setJoined(true);
    setTimeout(() => {
      setClaimReady(true);
    }, 10000); // Show claim button after 10 seconds
  };

  return (
    <div className="p-4 text-center">
      <h3 className="font-semibold mb-2">Join our Telegram Channel</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click below to join our Telegram community. Once done, you'll be able to
        claim your reward.
      </p>
      <LoadingModal isLoading={loading} />

      {!joined ? (
        <button
          onClick={handleJoin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Join Telegram
        </button>
      ) : !claimReady ? (
        <p className="text-sm text-gray-500">Waiting for confirmation... 10s</p>
      ) : (
        <button
          onClick={handleClaim}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Claim Telegram Reward
        </button>
      )}
      {message && <SuccessModal message={message} clear={resetState} />}
    </div>
  );
};

export default JoinTelegram;
