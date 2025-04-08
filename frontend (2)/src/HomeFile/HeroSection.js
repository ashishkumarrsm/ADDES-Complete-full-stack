// import { useState, useEffect } from "react";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const HeroSection = () => {
//   const images = [
//     {
//       image:
//         "https://img.freepik.com/free-photo/majestic-mountain-peak-tranquil-winter-landscape-generated-by-ai_188544-15662.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777",
//       title: "Trade Smarter with AI & Automation",
//       subtitle:
//         "Teirrax makes trading easy and efficient with AI-powered bots and traditional strategies. Let technology do the work while you focus on profits.",
//     },
//     {
//       image:
//         "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777",
//       title: "Trade Smarter, Trade Faster",
//       subtitle:
//         "Trade faster and smarter with AI bots and real-time insights. Let technology simplify your trading journey.",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full">
//       {/* Image Slider */}
//       <div className="relative overflow-hidden rounded-lg shadow-lg h-[500px]">
//         {images.map((image, index) => (
//           <div key={index}>
//             <img
//               key={index}
//               src={image.image}
//               alt={`Slide ${index + 1}`}
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                 index === currentIndex ? "opacity-100" : "opacity-0"
//               }`}
//             />
//             <div
//               className={`absolute inset-0 w-full h-full lg:ml-10 flex items-center justify-start p-10 transition-opacity duration-1000 ${
//                 index === currentIndex ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <div className="p-3 mx-6 rounded-sm border lg:max-w-2xl bg-black/40 sm:p-6 lg:mx-0 border-white/50">
//                 {/* Conditionally render h1 for the first slide and h2 for others */}
//                 {index === 0 ? (
//                   <h1 className="text-4xl font-semibold text-white">{image.title}</h1>
//                 ) : (
//                   <h2 className="text-4xl font-semibold text-white">{image.title}</h2>
//                 )}
//                 <p className="mt-2 text-base text-gray-300">{image.subtitle}</p>
//                 <Link to="/registration">
//                   <button className=" mt-4 bg-gradient-to-r  from-[#e0e21e] to-[#cacd0d] text-white py-1 px-1 rounded-full flex items-center gap-2 hover:from-[#cdcf36] hover:to-[#d7da27] transition-all duration-300 shadow-lg">
//                     <span className=" bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-[#fff] px-5 py-2 rounded-full font-semibold">
//                       Start Trading
//                     </span>
//                     <div className="bg-[#0089bd] rounded-full p-2 flex items-center justify-center">
//                       <AiOutlineArrowRight className="w-5 h-5 text-[#fcfcfcfa]" />
//                     </div>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         className="absolute left-4 top-1/2 p-3 text-white rounded-full shadow-lg transition -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900"
//         onClick={prevSlide}
//       >
//         &#10094;
//       </button>
//       <button
//         className="absolute right-4 top-1/2 p-3 text-white rounded-full shadow-lg transition -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900"
//         onClick={nextSlide}
//       >
//         &#10095;
//       </button>

//       {/* Dots Indicator */}
//       <div className="flex absolute bottom-4 left-1/2 space-x-2 -translate-x-1/2">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentIndex ? "bg-gray-900 scale-125" : "bg-gray-400"
//             }`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



















import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const videos = [
    {
      video: "https://videocdn.cdnpk.net/videos/f3782390-1def-4f12-a511-f27a96fbcdf3/horizontal/previews/clear/small.mp4?token=exp=1743763828~hmac=29c825a220bfd82cd1d3e8b62a4b0a76a69eb779e745dbbcf1abb5772eade1ef",
      title: "Trade Smarter with AI & Automation",
      subtitle: "Teirrax makes trading easy and efficient with AI-powered bots and traditional strategies. Let technology do the work while you focus on profits.",
    },
    {
      video: "https://videocdn.cdnpk.net/videos/a5ce318c-bd69-54d4-b1ca-ac04976f3015/horizontal/previews/clear/small.mp4?token=exp=1743763874~hmac=9da3991e57ffe12baa46d932f8f1f5ee6b046aa9466af3729b44e2a62aa5397d",
      title: "Trade Smarter, Trade Faster",
      subtitle: "Trade faster and smarter with AI bots and real-time insights. Let technology simplify your trading journey.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Video Slider */}
      <div className="overflow-hidden relative h-full shadow-lg">
        {videos.map((video, index) => (
          <div key={index}>
            <video
              muted
              autoPlay
              loop
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={video.video} type="video/mp4" />
            </video>
            <div
              className={`absolute inset-0 w-full h-full lg:ml-10 flex items-center justify-start p-10 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="p-3 mx-6 rounded-sm border lg:max-w-2xl bg-black/40 sm:p-6 lg:mx-0 border-white/50">
                {index === 0 ? (
                  <h1 className="text-4xl font-semibold text-white">{video.title}</h1>
                ) : (
                  <h2 className="text-4xl font-semibold text-white">{video.title}</h2>
                )}
                <p className="mt-2 text-base text-gray-300">{video.subtitle}</p>
                <Link to="/registration">
                  <button className="mt-4 bg-gradient-to-r from-[#e0e21e] to-[#cacd0d] text-white py-1 px-1 rounded-full flex items-center gap-2 hover:from-[#cdcf36] hover:to-[#d7da27] transition-all duration-300 shadow-lg">
                    <span className="bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-[#fff] px-5 py-2 rounded-full font-semibold">
                      Start Trading
                    </span>
                    <div className="bg-[#0089bd] rounded-full p-2 flex items-center justify-center">
                      <AiOutlineArrowRight className="w-5 h-5 text-[#fcfcfcfa]" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 p-3 text-white rounded-full shadow-lg transition -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-4 top-1/2 p-3 text-white rounded-full shadow-lg transition -translate-y-1/2 bg-gray-800/70 hover:bg-gray-900"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      {/* Dots Indicator */}
      <div className="flex absolute bottom-4 left-1/2 space-x-2 -translate-x-1/2">
        {videos.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gray-900 scale-125" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;