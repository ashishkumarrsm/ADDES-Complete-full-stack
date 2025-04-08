import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimBonus, resetState } from "../redux/bonusSlice";
import { SuccessModal } from "../components/PopModal";

const MySwal = withReactContent(Swal);

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const adVideos = [
  "https://www.youtube.com/embed/3fumBcKC6RE?autoplay=1",
  "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  "https://www.youtube.com/embed/kXYiU_JCYtU?autoplay=1",
];

const UserViewAd = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { loading, message } = useSelector((state) => state.bonuses);
  const userId = auth?.id;

  // Use useRef to store the randomly selected video URL
  // This prevents re-selection on every render
  const videoUrlRef = useRef(
    adVideos[Math.floor(Math.random() * adVideos.length)]
  );

  const [currentTimerValue, setCurrentTimerValue] = useState(10);
  const timerIntervalRef = useRef(null);
  const timerDisplayRef = useRef(null);
  const claimButtonContainerRef = useRef(null);

  // Cleanup function for all intervals
  const cleanupIntervals = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return cleanupIntervals;
  }, []);

  // Handle successful claim
  useEffect(() => {
    if (!loading && message === "Bonus claimed successfully") {
      MySwal.fire({
        title: "Congratulations!",
        text: "You've earned your daily reward!",
        icon: "success",
        confirmButtonColor: "#a855f7",
      });
      dispatch(resetState());
    }
  }, [loading, message, dispatch]);

  const handleClaim = () => {
    // Call redux action to claim bonus
    dispatch(claimBonus({ user_id: userId, bonus_type: "add_income" }));
     
    // Close the modal
    MySwal.close();
    
    // Reset timer
    setCurrentTimerValue(10);
  };

  const showVideoModal = () => {
    // Reset timer before showing modal
    setCurrentTimerValue(10);
    
    MySwal.fire({
      title: "Watch This Video!",
      html: `
        <div class="flex flex-col items-center justify-center">
          <iframe 
            width="100%" 
            height="315" 
            src="${videoUrlRef.current}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
          <div id="timer-display" class="mt-4 text-xl font-bold">Please watch for: 10s</div>
          <div id="claim-button-container" class="mt-4"></div>
        </div>
      `,
      width: 600,
      padding: "2em",
      color: "#333",
      background: "#f7fdfc",
      backdrop: `rgba(0,0,0,0.4)`,
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        // Store references to DOM elements
        timerDisplayRef.current = document.getElementById('timer-display');
        claimButtonContainerRef.current = document.getElementById('claim-button-container');
        
        // Start a new timer
        cleanupIntervals();
        timerIntervalRef.current = setInterval(() => {
          setCurrentTimerValue(prev => {
            const newValue = prev - 1;
            
            // Update the timer display
            if (timerDisplayRef.current) {
              timerDisplayRef.current.textContent = `Please watch for: ${newValue}s`;
            }
            
            // When timer reaches 0, show claim button and stop timer
            if (newValue <= 0) {
              cleanupIntervals();
              
              // Update timer text
              if (timerDisplayRef.current) {
                timerDisplayRef.current.textContent = 'Video watched! Claim your reward now.';
                timerDisplayRef.current.className = 'mt-4 text-xl font-bold text-green-600';
              }
              
              // Create and add claim button
              if (claimButtonContainerRef.current) {
                claimButtonContainerRef.current.innerHTML = '';
                const claimButton = document.createElement('button');
                claimButton.textContent = '🎁 Claim Reward';
                claimButton.className = 'px-6 py-3 text-white bg-pink-500 rounded-full hover:bg-pink-400 transition-all';
                claimButton.onclick = handleClaim;
                claimButtonContainerRef.current.appendChild(claimButton);
                
                // Add close button after timer completes
                const closeButton = document.createElement('button');
                closeButton.textContent = '✖️ Close';
                closeButton.className = 'px-6 py-3 ml-2 text-white bg-gray-500 rounded-full hover:bg-gray-400 transition-all';
                closeButton.onclick = () => MySwal.close();
                claimButtonContainerRef.current.appendChild(closeButton);
              }
              
              return 0;
            }
            
            return newValue;
          });
        }, 1000);
      },
      willClose: () => {
        // Clean up when modal closes
        cleanupIntervals();
        setCurrentTimerValue(10);
      }
    });
  };
  function clearState(){
    dispatch(resetState());
  
  }
  return (
    <div className="flex flex-col justify-center items-center px-6 py-10 space-y-6 min-h-screen text-gray-800 bg-gradient-to-br from-green-100 via-pink-100 to-gray-100">
      {/* Header */}
      {message && <SuccessModal message={message} clear={clearState}/>}
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <h2 className="mb-2 text-4xl font-bold text-pink-600">
          🎉 Watch & Earn
        </h2>
        <p className="mx-auto max-w-md text-lg text-gray-600">
          Earn rewards by watching daily videos. Learn, grow, and win exciting
          prizes along the way!
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 gap-6 text-center md:grid-cols-3"
        initial="hidden"
        animate="visible"
      >
        {[
          {
            icon: "⏱",
            title: "10 Secs Only",
            desc: "Takes just a few seconds to earn points.",
          },
          {
            icon: "🎁",
            title: "Daily Rewards",
            desc: "Win rewards and cash prizes every day.",
          },
          {
            icon: "📊",
            title: "Track Progress",
            desc: "Monitor your activity and growth.",
          },
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            className="p-5 rounded-2xl border border-pink-200 shadow-lg bg-white/80"
            variants={fadeUp}
            custom={idx + 2}
          >
            <h3 className="mb-2 text-xl font-semibold text-green-600">
              {item.icon} {item.title}
            </h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={showVideoModal}
        className="flex gap-2 items-center px-8 py-4 text-lg font-semibold text-white bg-pink-500 rounded-full shadow-xl transition hover:bg-pink-400 active:scale-95"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 12px rgba(255, 192, 203, 0.7)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        🎬 Watch Today's Video
      </motion.button>

      {/* User badge */}
      <motion.div
        className="flex flex-col items-center mt-8 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={5}
      >
        <img
          src="https://i.pravatar.cc/100?img=3"
          alt="user"
          className="mb-3 w-20 h-20 rounded-full border-4 border-green-400 shadow-md"
        />
        <p className="text-sm text-gray-600">
          Logged in as{" "}
          <span className="font-semibold text-pink-600">
            {auth?.username || "User"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default UserViewAd;