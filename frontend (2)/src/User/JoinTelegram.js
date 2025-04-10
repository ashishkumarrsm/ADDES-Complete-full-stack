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

  // Dummy video data
  const communityVideos = [
    {
      id: 1,
      title: "Welcome to Our Community",
      thumbnail: "/images/welcome-thumb.jpg",
      url: "https://example.com/videos/welcome",
      duration: "2:45"
    },
    {
      id: 2,
      title: "How to Earn Rewards",
      thumbnail: "/images/rewards-thumb.jpg",
      url: "https://example.com/videos/rewards",
      duration: "4:20"
    },
    {
      id: 3,
      title: "Community Guidelines",
      thumbnail: "/images/guidelines-thumb.jpg",
      url: "https://example.com/videos/guidelines",
      duration: "3:15"
    }
  ];

  return (
    <div className="bg-gray-300/50 rounded-xl shadow-lg p-6 w-full mx-auto text-white">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-500 rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-center  mb-3">Join our Telegram Community</h3>
      
      <p className=" text-center mb-6">
        Connect with other members, get exclusive updates, and earn rewards by joining our Telegram group.
      </p>
      
      <LoadingModal isLoading={loading} />

      <div className="flex justify-center mb-8">
        {!joined ? (
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" />
            </svg>
            Join Telegram Group
          </button>
        ) : !claimReady ? (
          <div className="text-center">
            <div className="animate-pulse flex items-center justify-center mb-2">
              <div className="h-4 w-4 bg-blue-500 rounded-full mr-1"></div>
              <div className="h-4 w-4 bg-blue-500 rounded-full mr-1"></div>
              <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-blue-600 font-medium">Confirming your membership... (10s)</p>
          </div>
        ) : (
          <button
            onClick={handleClaim}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M12 22l-8-4v-8l8-4 8 4v8l-8 4zm0-2.1l6-3V9.1l-6-3-6 3v7.8l6 3z" />
              <path d="M12 12l-3-1.5v3l3 1.5 3-1.5v-3L12 12z" />
            </svg>
            Claim Telegram Reward
          </button>
        )}
      </div>

      {/* Video section added after join button */}
      {joined && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Community Videos</h4>
          <div className="space-y-4">
            {communityVideos.map(video => (
              <div key={video.id} className="bg-white rounded-lg shadow-sm p-3 flex">
                <div className="relative rounded-md overflow-hidden w-24 h-16 flex-shrink-0">
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-white bg-black bg-opacity-60 px-1 py-0.5 rounded absolute bottom-1 right-1">
                      {video.duration}
                    </span>
                    {/* Video thumbnail placeholder */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h5 className="font-medium text-gray-800">{video.title}</h5>
                  <p className="text-xs text-gray-500 mt-1">Learn more about our community</p>
                  <a href={video.url} className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                    Watch now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {message && <SuccessModal message={message} clear={resetState} />}
    </div>
  );
};

export default JoinTelegram;