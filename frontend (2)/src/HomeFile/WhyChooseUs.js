

// import React from "react";
// import { FaAward, FaHeart, FaClock, FaUsers } from "react-icons/fa";

// const WhyChooseUsSection = () => {
//   const cards = [
//     {
//       icon: <FaAward className="w-10 h-10 text-blue-600" />,
//       title: "Faster Execution",
//       description:
//         "Make trades instantly with AI-driven speed.",
//         bgColor: "bg-blue-600",
//         textColor: "group-hover:text-blue-600"
//     },
//     {
//       icon: <FaHeart className="w-10 h-10 text-red-600" />,
//       title: "Risk Management ",
//       description:
//         "Smart tools to help minimize losses.",
//          bgColor: "bg-red-600",
//         textColor: "group-hover:text-red-600"
//     },
//     {
//       icon: <FaClock className="w-10 h-10 text-green-600" />,
//       title: "Flexible Trading Options",
//       description:
//         "Choose manual or automated strategies.",
//          bgColor: "bg-green-600",
//         textColor: "group-hover:text-green-600"
//     },
//     {
//       icon: <FaUsers className="w-10 h-10 text-yellow-600" />,
//       title: " Global Market Access ",
//       description: "Trade anytime, anywhere with ease.",
//        bgColor: "bg-yellow-600",
//         textColor: "group-hover:text-yellow-600"
//     },
//   ];

//   return (
//     <div className="py-20 bg-gradient-to-b from-blue-200 via-white to-blue-50">
//       <div className="container px-6 mx-auto text-center">
//         {/* Section Header */}
//         <h2 className="mb-2 text-4xl font-semibold text-gray-900 drop-shadow-md">
//         Why Choose Teirrax
//         </h2>
//         <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-700">
//         We combine AI technology, automation, and security to give you a seamless trading experience.
//         </p>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {cards.map((card, index) => (
//             <div
//               key={index}
//               className="overflow-hidden relative rounded-sm border border-gray-300 shadow-sm transition-all duration-500 transform group bg-white/40 hover:scale-105 hover:shadow-lg hover:bg-white/80"
//             >
//               {/* Card Content */}
//               <div className="p-4 text-center">
//                 <div className="flex justify-center mb-4">{card.icon}</div>
//                 <h3 className={` mt-4 font-semibold leading-5 text-gray-900 mb-2 ${card.textColor} transition duration-300 `}>
//                   {card.title}
//                 </h3>
//                 <p className="text-sm text-gray-900 transition duration-300 group-hover:text-gray-900">
//                   {card.description}
//                 </p>
//               </div>

//               {/* Bottom Line Animation */}
//               <div className={`absolute bottom-0 left-0 h-1 ${card.bgColor} w-0 transition-all duration-500 group-hover:w-full`}></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyChooseUsSection;






















import { motion } from "framer-motion";
import { FaAward, FaHeart, FaClock, FaUsers } from "react-icons/fa";

const WhyChooseUsSection = () => {
  const cards = [
    {
      icon: <FaAward className="w-8 h-8 text-white" />,
      title: "Faster Execution",
      description: "Make trades instantly with AI-driven speed",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaHeart className="w-8 h-8 text-white" />,
      title: "Risk Management",
      description: "Smart tools to help minimize losses",
      gradient: "from-red-500 to-pink-400",
    },
    {
      icon: <FaClock className="w-8 h-8 text-white" />,
      title: "Flexible Trading",
      description: "Choose manual or automated strategies",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-white" />,
      title: "Global Access",
      description: "Trade anytime, anywhere with ease",
      gradient: "from-amber-500 to-yellow-400",
    },
  ];

  return (
    <section className="overflow-hidden relative py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Why Choose Teirrax
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Revolutionizing trading through AI-powered automation and intelligent risk management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full group"
            >
              <div className="p-6 h-full bg-white rounded-xl border shadow-lg transition-shadow duration-300 hover:shadow-xl border-gray-100/50">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
                
                {/* Icon Container */}
                <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg`}>
                  {card.icon}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {card.description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b to-transparent from-blue-50/50" />
        <div className="absolute right-0 bottom-0 -mr-32 -mb-32 w-64 h-64 rounded-full blur-3xl bg-cyan-500/10" />
      </div>
    </section>
  );
};

export default WhyChooseUsSection;