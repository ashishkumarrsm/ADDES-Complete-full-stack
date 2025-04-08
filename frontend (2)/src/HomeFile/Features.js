// import { FaRocket, FaLeaf, FaGlobe, FaLightbulb } from "react-icons/fa";

// export const Features = () => {
//   const cards = [
//     {
//       id: 1,
//       title: "AI Trading Bots",
//       description:
//         "Automate your trades for smarter decisions.",
//       icon: <FaRocket className="text-3xl text-white" />,
//       bgColor: "bg-blue-500",
//       borderColor: "border-blue-500",
//     },
//     {
//       id: 2,
//       title: " Real-Time Market Data",
//       description:
//         "Get instant updates for better moves.",
//       icon: <FaLeaf className="text-3xl text-white" />,
//       bgColor: "bg-green-500",
//       borderColor: "border-green-500",
//     },
//     {
//       id: 3,
//       title: "Safe & Secure",
//       description:
//         " Advanced security for your funds and data.",
//       icon: <FaGlobe className="text-3xl text-white" />,
//       bgColor: "bg-purple-500",
//       borderColor: "border-purple-500",
//     },
//     {
//       id: 4,
//       title: "Easy to Use",
//       description:
//         "Perfect for both beginners and experts.",
//       icon: <FaLightbulb className="text-3xl text-white" />,
//       bgColor: "bg-yellow-500",
//       borderColor: "border-yellow-500",
//     },
//   ];

//   return (
//     <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//       <div className="mb-10 max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
//         <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//           Explore Our Features
//         </h2>
//         <p className="text-base text-gray-700 md:text-lg">
//           Discover what makes our platform unique.
//         </p>
//       </div>
//       <div className="grid gap-4 mb-8 row-gap-5 md:row-gap-4 lg:grid-cols-4 sm:grid-cols-2">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className={`duration-300 transform border-l-4 ${card.borderColor} ${card.bgColor} hover:-translate-y-2`}
//           >
//             <div className="p-5 h-full bg-white rounded-r border border-l-0 shadow-md transition duration-300 hover:bg-opacity-90">
//               <div className={`w-12 h-12 flex items-center justify-center rounded-full ${card.bgColor} transition duration-300 group-hover:bg-opacity-80`}>
//                 {card.icon}
//               </div>
//               <h6 className="mt-4 mb-2 font-semibold leading-4">{card.title}</h6>
//               <p className="text-sm text-justify text-gray-900">{card.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <div className="text-center">
//         <a
//           href="/"
//           className="inline-flex justify-center items-center px-6 w-full h-12 font-medium tracking-wide text-white bg-purple-600 rounded shadow-md transition duration-200 md:w-auto hover:bg-purple-800 focus:shadow-outline focus:outline-none"
//         >
//           Learn more
//         </a>
//       </div> */}
//     </div>
//   );
// };

































import { FaRocket, FaLeaf, FaGlobe, FaLightbulb } from "react-icons/fa";

export const Features = () => {
  const cards = [
    {
      id: 1,
      title: "AI Trading Bots",
      description: "Automate your trades for smarter decisions.",
      icon: <FaRocket className="text-3xl text-white" />,
      bgColor: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500/20",
    },
    {
      id: 2,
      title: "Real-Time Market Data",
      description: "Get instant updates for better moves.",
      icon: <FaLeaf className="text-3xl text-white" />,
      bgColor: "from-green-500 to-green-600",
      borderColor: "border-green-500/20",
    },
    {
      id: 3,
      title: "Safe & Secure",
      description: "Advanced security for your funds and data.",
      icon: <FaGlobe className="text-3xl text-white" />,
      bgColor: "from-purple-500 to-purple-600",
      borderColor: "border-purple-500/20",
    },
    {
      id: 4,
      title: "Easy to Use",
      description: "Perfect for both beginners and experts.",
      icon: <FaLightbulb className="text-3xl text-white" />,
      bgColor: "from-yellow-500 to-yellow-600",
      borderColor: "border-yellow-500/20",
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Explore Our Features
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover what makes our platform unique and powerful for your trading needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative bg-white rounded-xl border shadow-lg transition-all duration-300 group hover:shadow-xl border-gray-100/50 hover:border-transparent"
            >
              <div className="flex flex-col p-6 h-full">
                {/* Icon Container */}
                <div className={`mb-6 w-14 h-14 rounded-xl bg-gradient-to-r ${card.bgColor} flex items-center justify-center shadow-lg`}>
                  {card.icon}
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {card.description}
                </p>

                {/* Hover Effect Element */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Grid Adjustments */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Available on all platforms • 24/7 Support • Regular Updates
          </p>
        </div>
      </div>
    </section>
  );
};