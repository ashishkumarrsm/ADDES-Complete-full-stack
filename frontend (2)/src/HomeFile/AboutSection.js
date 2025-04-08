// export const AboutSection = () => {
//   const features = [
//     {
      
//       description:
//         "Teirrax is designed to simplify trading with AI-powered bots, real-time market insights, and advanced security. Whether you prefer manual trading or want to let automation handle the work, our platform gives you the tools to succeed.",
//     },
//     {
      
//       description:
//         "With cutting-edge technology and a user-friendly interface, Teirrax makes trading accessible for beginners and professionals. We believe in smart, secure, and efficient trading, helping you maximize profits with minimal effort",
//     },
//     {
      
//       description:"We combine traditional trading strategies with modern AI-driven solutions to create a seamless experience. Our smart algorithms analyze market trends, execute trades efficiently, and minimize risks, allowing you to trade with confidence."
//     },
//     {
      
//       description:"We are committed to innovation, security, and transparency, ensuring that every trader—whether a beginner or an expert—has access to reliable tools and insights. Our goal is to empower you with a powerful, automated, and secure trading environment for long-term success. "
//     },
   
//   ];

//   const images = [
//     "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   ];

//   return (
//     <div className="px-4 py-6 mx-auto max-w-7xl">
//       <div className="mb-10 max-w-3xl md:mx-auto sm:text-center md:mb-12">
//         <p className="inline-block px-3 py-px mb-2 text-xs font-semibold tracking-wider text-teal-900 uppercase bg-blue-100 rounded-full bg-teal-accent-400">
//           About
//         </p>
//         <h2 className="mb-2 text-4xl font-semibold tracking-tight leading-none text-gray-900 md:mx-auto">
//         About Teirrax 
//         </h2>
//         <p className="text-base text-gray-700 md:text-lg">
//         Bringing AI technology and automation to make trading easier, faster, and more profitable.        </p>
//       </div>

//       <div className="grid gap-8 lg:grid-cols-2 sm:mx-auto">
//         <div className="flex flex-col justify-center">
//           {features.map((feature, index) => (
//             <div className="flex" key={index}>
//               <div className="mr-4">
//                 <div className="flex justify-center items-center mb-3 w-10 h-10 bg-indigo-50 rounded-full">
//                   <svg
//                     className="w-8 h-8 text-deep-purple-accent-400"
//                     stroke="currentColor"
//                     viewBox="0 0 52 52"
//                   >
//                     <polygon
//                       strokeWidth="3"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       fill="none"
//                       points="29 13 14 29 25 29 23 39 38 23 27 23"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <div>
//                 <h6 className="mb-2 font-semibold leading-5">{feature.title}</h6>
//                 <p className="text-sm text-gray-900">{feature.description}</p>
//                 {index !== features.length - 1 && <hr className="my-6 w-full border-gray-300" />}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Column - Images */}
//         <div className="grid grid-cols-2 gap-5">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               className={`object-cover w-full ${
//                 index === 0 ? "h-56 col-span-2" : "h-48"
//               } rounded shadow-lg`}
//               src={image}
//               alt=" images of data"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };























import { FaRobot, FaShieldAlt, FaChartLine, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

export const AboutSection = () => {
  const features = [
    {
      icon: <FaRobot className="text-2xl" />,
      description: "Teirrax is designed to simplify trading with AI-powered bots, real-time market insights, and advanced security. Whether you prefer manual trading or want to let automation handle the work, our platform gives you the tools to succeed.",
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      description: "With cutting-edge technology and a user-friendly interface, Teirrax makes trading accessible for beginners and professionals. We believe in smart, secure, and efficient trading, helping you maximize profits with minimal effort",
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      description: "We combine traditional trading strategies with modern AI-driven solutions to create a seamless experience. Our smart algorithms analyze market trends, execute trades efficiently, and minimize risks, allowing you to trade with confidence."
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      description: "We are committed to innovation, security, and transparency, ensuring that every trader—whether a beginner or an expert—has access to reliable tools and insights. Our goal is to empower you with a powerful, automated, and secure trading environment for long-term success."
    },
  ];

  const videos = [
    {
      src: "https://assets.mixkit.co/videos/preview/mixkit-stock-market-chart-data-3274.mp4",
      caption: "Real-time Market Analysis"
    },
    {
      src: "https://assets.mixkit.co/videos/preview/mixkit-man-analyzing-stock-market-data-3273.mp4",
      caption: "AI Trading Strategies"
    },
    {
      src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-binary-code-133.mp4",
      caption: "Secure Transactions"
    },
    // {
    //   src: "https://assets.mixkit.co/videos/preview/mixkit-server-racks-in-a-dark-room-229.mp4",
    //   caption: "Advanced Infrastructure"
    // }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
    <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 md:text-4xl">
          About Teirrax
        </h2>
        <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
          Bringing AI technology and automation to make trading easier, faster, and more profitable
        </p>
      </motion.div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
        {/* Video Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`relative ${
                index === 0 ? "sm:col-span-2 aspect-video" : "aspect-square"
              } rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group`}
            >
              <video
                className="object-cover w-full h-full transition-transform duration-300"
                controls
                muted
                autoPlay
                loop
                playsInline
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Overlay */}
              <div className="flex absolute inset-0 items-end p-4 bg-gradient-to-t to-transparent from-black/60">
                <p className="text-sm font-medium text-white md:text-base">
                  {video.caption}
                </p>
              </div>
              
              {/* Play Button */}
              <button className="flex absolute inset-0 justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/20">
                <div className="p-3 rounded-full backdrop-blur-sm bg-white/20 hover:bg-white/30">
                  <svg className="w-6 h-6 text-white md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex gap-4 items-start md:gap-6">
                <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-md">
                  {feature.icon}
                </div>
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b to-transparent from-blue-50/50 -z-10" />
      <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full blur-3xl bg-cyan-500/10 -z-10" />
    </div>
  </section>
  );
};