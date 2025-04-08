// import React from "react";

// export default function NewsLetters() {
//     return (
//         <div className="container py-16 mx-auto">
//             <div className="relative flex items-center justify-center w-full ">
//                 <img src="https://img.freepik.com/free-photo/photorealistic-money-with-plant_23-2151027606.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid" alt="dining" className="absolute z-0 hidden w-full h-full xl:block" />
//                 <img src="https://img.freepik.com/free-photo/photorealistic-money-with-plant_23-2151027606.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid" alt="dining" className="absolute z-0 hidden w-full h-full sm:block xl:hidden" />
//                 <img src="https://img.freepik.com/free-photo/photorealistic-money-with-plant_23-2151027606.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid" alt="dining" className="absolute z-0 w-full h-full sm:hidden " />
//                 <div className="relative z-40 flex flex-col items-center justify-center w-full px-4 py-10 bg-gray-800/50 bg-opacity-80 md:my-16 lg:py-16 md:mx-24 md:px-12">
//                     <h2 className="text-4xl font-semibold leading-9 text-center text-white">Don’t miss out!</h2>
//                     <p className="mt-6 text-base leading-normal text-center text-white">
//                     Subscribe to our newsletter and get exclusive updates, expert strategies, 
//                     <br />and special offers straight to your inbox. Don’t miss your chance to stay ahead in the trading world!
//                     </p>
//                     <div className="flex flex-col items-center w-full mt-12 space-y-4 border-white sm:border sm:flex-row lg:w-5/12 sm:space-y-0">
//                         <input className="w-full p-4 text-base font-medium leading-none text-white placeholder-white bg-transparent border border-white sm:border-transparent focus:outline-none" placeholder="Email Address" />
//                         <button className="w-full px-6 py-4 bg-white border border-white focus:outline-none focus:ring-offset-2 focus:ring sm:border-transparent sm:w-auto hover:bg-opacity-75">Subscribe</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function NewsLetters() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-50 p-4">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section - Text & Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Start Trading with 
            <br /> Teirrax Today!
          </h2>
          <p className="text-gray-700 mb-8">
          Experience the power of AI-driven automation 
          and Web3 technology for seamless and secure trading. Take control of your financial future now!
          </p>

          {/* Subscription Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Subscribe for new releases</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
               
              <button
                type="submit"
                className="w-full bg-[#0089bd] hover:bg-[#2b87ab] text-white font-medium py-3 px-4 rounded-md transition duration-200"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-full md:w-1/2 bg-blue-50 relative flex items-center justify-center p-6">
          <img
            src="https://kitwind.io/static/7277c9785e82b31b79de9c72e716bce1/8309f/human.png"
            alt="3D character with megaphone"
            className="w-full h-full object-contain"
          />

          {/* Floating Elements */}
          <div className="absolute top-10 right-10 animate-bounce">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#E53E3E"
              />
            </svg>
          </div>

          <div className="absolute bottom-20 left-10 animate-pulse">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                fill="#ECC94B"
              />
            </svg>
          </div>

          <div className="absolute bottom-10 right-10 animate-pulse delay-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="#9CA3AF" />
              <rect x="7" y="9" width="10" height="6" fill="#10B981" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
