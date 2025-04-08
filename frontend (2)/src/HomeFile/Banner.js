// import React from "react";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { Link } from "react-router-dom";
// const Banner = () => {
//   return (
//     <div className="relative w-full bg-black text-white min-h-[400px] overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <img
//           src="https://img.freepik.com/free-photo/photorealistic-tree-money_23-2151027613.jpg?t=st=1740246807~exp=1740250407~hmac=2d6a75bb775bf3aa9114059f0f729d1b00b707fb769d62c51c9377050f5a72fc&w=740"
//           alt="Satellite in space"
//           className="object-cover w-full h-full opacity-50"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
//       </div>

//       <div className="relative z-10 px-4 py-8 mx-auto max-w-7xl">
//         <div className="flex gap-2 items-center mb-4 text-blue-300">
//           <span className="text-sm">— OUR VISION </span>
//         </div>

//         <h2 className="mb-6 text-4xl font-light text-gray-300">
//         We use AI, automation, and decentralized technology to make trading smarter, faster, and safer.
//         </h2>

//         <div className="max-w-lg">
//           <p className="mb-8 text-base leading-relaxed text-justify text-gray-300">
//           Teirrax is changing the way people trade by using advanced AI, Web3 technology, and easy-to-use 
//           automation. Our goal is to make trading simple, efficient, and profitable for everyone—whether you're 
//           a beginner or an expert.
//           </p>

//           <Link to="/registration">
//             <button className=" mt-4 bg-gradient-to-r  from-[#e0e21e] to-[#cacd0d] text-white py-1 px-1 rounded-full flex items-center gap-2 hover:from-[#cdcf36] hover:to-[#d7da27] transition-all duration-300 shadow-lg">
//               <span className=" bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-[#fff] px-5 py-2 rounded-full font-semibold">
//               Start Trading Smarter
//               </span>
//               <div className="bg-[#0089bd] rounded-full p-2 flex items-center justify-center">
//                 <AiOutlineArrowRight className="w-5 h-5 text-[#fcfcfcfa]" />
//               </div>
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
//     </div>
//   );
// };

// export default Banner;

















import { motion } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 to-blue-900 min-h-[500px] overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://img.freepik.com/free-photo/photorealistic-tree-money_23-2151027613.jpg"
          alt="Abstract background"
          className="object-cover w-full h-full opacity-20 mix-blend-soft-light"
        />
      </motion.div>

      {/* Content */}
      <div className="flex relative z-10 flex-col justify-center px-4 py-12 mx-auto max-w-7xl h-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-sm font-semibold tracking-wide text-cyan-400">
              OUR VISION
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 md:text-5xl"
          >
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptate magnam ea?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-10 text-lg leading-relaxed text-gray-300"
          >
            Teirrax combines advanced artificial intelligence, blockchain technology, and intuitive automation 
            to create a seamless trading experience for both beginners and seasoned professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/registration">
              <button className="flex overflow-hidden relative gap-3 items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-xl transition-all duration-300 group hover:shadow-2xl">
                <span className="text-lg font-semibold text-white">
                  Start Trading Smarter
                </span>
                <div className="flex justify-center items-center p-2 rounded-full transition-colors bg-white/10 group-hover:bg-white/20">
                  <AiOutlineArrowRight className="w-5 h-5 text-white transition-transform transform group-hover:translate-x-1" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 transition-opacity group-hover:opacity-100 -z-10" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-cyan-500/10 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl bg-blue-500/10 -z-10" />
      </div>
    </div>
  );
};

export default Banner;