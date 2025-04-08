import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimBonus, resetState } from "../redux/bonusSlice";
import { LoadingModal, SuccessModal } from "../components/PopModal";

const adVideos = [
  "https://www.youtube.com/embed/3fumBcKC6RE",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/kXYiU_JCYtU",
];

const WatchAdVideo = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { loading, message } = useSelector((state) => state.bonuses);
  const userId = auth.id;
  
  // Use useRef to store the randomly selected video URL
  // This prevents re-selection on every render
  const videoUrlRef = useRef(adVideos[Math.floor(Math.random() * adVideos.length)]);
  
  const [timer, setTimer] = useState(10);
  const [showButton, setShowButton] = useState(false);

  const handleClaim = async () => {
    dispatch(claimBonus({ user_id: userId, bonus_type: "add_income" }));
  };

  useEffect(() => {
    if (timer === 0) {
      setShowButton(true);
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer]);

  // Handle closing the success modal
  const handleCloseModal = () => {
    dispatch(resetState());
  };

  return (
    <div className="p-4 text-center">
      <h3 className="font-semibold mb-2">Watch this ad to claim reward</h3>
      <div className="aspect-video mb-4">
        <iframe
          width="100%"
          height="315"
          src={videoUrlRef.current}
          title="Ad Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <LoadingModal isLoading={loading} />
      {message && <SuccessModal message={message} clear={handleCloseModal} />}
      {!showButton ? (
        <p className="text-gray-600 mb-4">Claim button in {timer} seconds...</p>
      ) : (
        <button
          onClick={handleClaim}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Claim Ad Reward
        </button>
      )}
    </div>
  );
};

export default WatchAdVideo;