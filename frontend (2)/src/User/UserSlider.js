// import { useState, useEffect } from "react";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const UserSlider = () => {
//   const images = [
//     {
//       image: "https://renatuspro.io/img/bg-img/32.png",
//       title: "Trade Smarter with AI & Automation",
//       subtitle:
//         "Teirrax makes trading easy and efficient with AI-powered bots and traditional strategies. Let technology do the work while you focus on profits.",
//     },
//     {
//       image: "https://renatuspro.io/img/bg-img/34.png",
//       title: "Trade Smarter, Trade Faster",
//       subtitle:
//         "Trade faster and smarter with AI bots and real-time insights. Let technology simplify your trading journey.",
//     },
//     {
//       image: "https://renatuspro.io/img/bg-img/33.png",
//       title: "Trade Smarter, Trade Faster",
//       subtitle:
//         "Trade faster and smarter with AI bots and real-time insights. Let technology simplify your trading journey.",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <div className="relative w-full">
//         <div className="relative overflow-hidden  h-[450px] bg-black/40">
//           {images.map((image, index) => (
//             <div key={index}>
//               <img
//                 key={index}
//                 src={image.image}
//                 alt={`Slide ${index + 1}`}
//                 className={`absolute inset-0 w-full bg-black h-full object-cover transition-opacity duration-1000 ${
//                   index === currentIndex ? "opacity-80" : "opacity-0"
//                 }`}
//               />
//               <div
//                 className={`absolute inset-0 w-full h-full flex items-center justify-center p-10 transition-opacity duration-1000 ${
//                   index === currentIndex ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <div className="flex flex-col items-center p-6 mx-auto text-center rounded-sm border lg:max-w-2xl bg-black/40 border-white/50">
//                   <h1 className="text-4xl font-semibold text-white">
//                     {image.title}
//                   </h1>
//                   <p className="mt-2 text-base text-gray-300">
//                     {image.subtitle}
//                   </p>
//                   <button className="overflow-hidden relative px-5 py-2 mt-4 font-semibold text-white bg-gray-800 rounded-sm group">
//                     <span className="relative z-10">Start Trading</span>
//                     <span className="absolute inset-0 w-0 transition-all duration-500 bg-gray-900/70 group-hover:w-full"></span>
//                   </button> 
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           className="absolute left-4 top-1/2 p-2 w-10 h-10 text-white rounded-full shadow-lg transition -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900"
//           onClick={prevSlide}
//         >
//           &#10094;
//         </button>
//         <button
//           className="absolute right-4 top-1/2 p-2 w-10 h-10 text-white rounded-full shadow-lg transition -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900"
//           onClick={nextSlide}
//         >
//           &#10095;
//         </button>
//         <div className="flex absolute bottom-4 left-1/2 space-x-2 -translate-x-1/2">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentIndex ? "bg-gray-900 scale-125" : "bg-gray-400"
//               }`}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserSlider;


















import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const UserSlider = () => {
  const videos = [
    {
      video: "https://videocdn.cdnpk.net/videos/da1f3982-56b9-4a55-999c-71f272df9604/horizontal/previews/clear/small.mp4?token=exp=1743664395~hmac=96b775f8b653375f30914a9fc4dfb9c3e4755da1ab992a05ecac158b8871e7b8",
      title: "We can help on chat",
      subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit illo officiis, provident eum similique tempora possimus aliquam, explicabo obcaecati hic, sapiente beatae veniam.",
      buttontitel: "Chat",
    },
    {
      video: "https://videocdn.cdnpk.net/videos/a5ce318c-bd69-54d4-b1ca-ac04976f3015/horizontal/previews/clear/small.mp4?token=exp=1743664395~hmac=070f2c0500dfcf9c5081bc4b9aeada9dfa894aff81dab309b9fe65b024186df9",
      title: "Trade Smarter, Trade Faster",
      subtitle: "Trade faster and smarter with AI bots and real-time insights. Let technology simplify your trading journey.",
      buttontitel: "X.com",
    },
    {
      video: "https://videocdn.cdnpk.net/videos/d5c3087c-dae6-4189-b79a-deb6adb1840d/horizontal/previews/clear/small.mp4?token=exp=1743664591~hmac=001aee8e15995bdc2be5e4ab1f29cae4a1692d8f6be83008324606a442b76b51",
      title: "Trade Smarter, Trade Faster",
      subtitle: "Trade faster and smarter with AI bots and real-time insights. Let technology simplify your trading journey.",
      buttontitel: "Message",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full h-screen md:h-[500px] bg-black overflow-hidden lg:h-screen">
      <AnimatePresence>
        {videos.map((video, index) => (
          index === currentIndex && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                src={video.video}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full brightness-75"
              ></video>

              {/* Content Overlay */}
              <div className="flex absolute inset-0 flex-col justify-center items-center p-4 text-center bg-black/50">
                <motion.h1
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-xl font-bold text-white drop-shadow-lg md:text-3xl lg:text-4xl"
                >
                  {video.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-2 text-sm md:text-lg text-gray-300 max-w-[80%] md:max-w-xl"
                >
                  {video.subtitle}
                </motion.p>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-lg transition-all md:mt-5 md:px-6 md:py-3 md:text-lg hover:bg-blue-700"
                >
                  {video.buttontitel}
                </motion.button>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-3 top-1/2 p-2 text-white rounded-full transition transform -translate-y-1/2 md:left-5 md:p-3 bg-black/50 hover:bg-black/70"
        onClick={prevSlide}
      >
        <AiOutlineLeft  />
      </button>
      <button
        className="absolute right-3 top-1/2 p-2 text-white rounded-full transition transform -translate-y-1/2 md:right-5 md:p-3 bg-black/50 hover:bg-black/70"
        onClick={nextSlide}
      >
        <AiOutlineRight  />
      </button>

      {/* Dots Navigation */}
      <div className="flex absolute bottom-4 space-x-2 md:bottom-6 md:space-x-3">
        {videos.map((_, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0.8 }}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></motion.span>
        ))}
      </div>
    </div>
  );
};

export default UserSlider;
