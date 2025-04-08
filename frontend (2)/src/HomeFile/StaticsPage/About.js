import React from "react";
import {
  FaBuilding,
  FaUsers,
  FaChartBar,
  FaUsersCog,
  FaClipboardList,
  FaNewspaper,
} from "react-icons/fa";
import Header from "../../CoreFile/Header";
import Footer from "../../CoreFile/Footer";
import { AboutHeroSection } from "./AboutHeroSection";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
export const About = () => {
  const statsData = [
    {
      icon: <FaBuilding className="w-6 h-6 text-blue-500" />,
      title: "✅ 400K+ Active Users ",
      description: "Trusted by a growing community of traders.",
    },
    {
      icon: <FaChartBar className="w-6 h-6 text-green-500" />,
      title: "✅ 50M+ Trades Executed",
      description: "Proven success with high trading volume.",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-purple-500" />,
      title: "✅ 24/7 Automated Trading",
      description: " Earn anytime, even while you sleep.",
    },
  ];

  const infoData = [
    {
      icon: <FaUsersCog className="w-6 h-6 text-red-500" />,
      title: "✅ Financial Growth for Everyone ",
      description: "Helping people earn through simple trading.",
    },
    {
      icon: <FaClipboardList className="w-6 h-6 text-yellow-500" />,
      title: "✅ Transparency & Trust ",
      description: "Clear and fair trading with no hidden fees.",
    },
    {
      icon: <FaNewspaper className="w-6 h-6 text-indigo-500" />,
      title: "✅ Continuous Improvement ",
      description:
        "Evolving our platform for better user experience and success.",
    },
  ];
  const stats = [
    { value: " 10+ ", label: "Years of Innovation" },
    { value: "100+ ", label: "Expert Traders & Developers" },
    { value: "75+ ", label: "AI-Driven Strategies Implemented" },
    { value: "200+ ", label: "Satisfied Traders Worldwide" },
  ];
  return (
    <>
      <Header />
      <AboutHeroSection />

      <section className="bg-[#0089bd] text-white pb-16 relative">
        {/* Top Blue Background */}
        <div className="max-w-7xl mx-auto px-4 py-28">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <div>
              <p className="text-sm uppercase text-[#e0e21e]">Why Teirrax?</p>
              <h2 className="text-4xl font-bold leading-tight mt-2">
              We bring AI, automation, and security together for a better trading experience.
              </h2>
            </div>
            {/* Right Side */}
            <div>
              <p className="text-gray-200">
              Our mission is to make trading easier and more rewarding. With 
              real-time insights and automated tools, you can trade with confidence and success.
              </p>
              <Link to="/registration">
                <button className=" mt-4 bg-gradient-to-r  from-[#e0e21e] to-[#cacd0d] text-white py-1 px-1 rounded-full flex items-center gap-2 hover:from-[#cdcf36] hover:to-[#d7da27] transition-all duration-300 shadow-lg">
                  <span className=" bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-[#fff] px-5 py-2 rounded-full font-semibold">
                  Join Us Now
                  </span>
                  <div className="bg-[#0089bd] rounded-full p-2 flex items-center justify-center">
                    <AiOutlineArrowRight className="w-5 h-5 text-[#fcfcfcfa]" />
                  </div>
                </button>
              </Link>
             
            </div>
          </div>
        </div>

        {/* White Background Section */}
      </section>
      <div className=" relative z-10 rounded-t-3xl -mt-40 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <img
              src="https://img.freepik.com/free-photo/modern-building-exterior-design_23-2148895602.jpg"
              alt="Architecture 1"
              className="rounded-lg shadow-lg h-60 w-full object-cover"
            />
            <img
              src="https://img.freepik.com/free-photo/low-angle-modern-glass-building_23-2148895603.jpg"
              alt="Architecture 2"
              className="rounded-lg shadow-lg h-60 w-full object-cover"
            />
            <img
              src="https://img.freepik.com/free-photo/futuristic-architecture-building_23-2148895604.jpg"
              alt="Architecture 3"
              className="rounded-lg shadow-lg h-60 w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[#0089bd]  py-8">
            {stats.map((stat, index) => (
              <div key={index} className="border border-gray-300 px-3 py-4">
                <h2 className="text-3xl font-bold">{stat.value}</h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// hero section

// <div className="grid items-center grid-cols-1 gap-12 mb-20 lg:grid-cols-2">
//           <div>
//             <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-lg border-blue-500  border-b-[2px] ">
//               About Us
//             </span>
//             <h2 className="mt-2 mb-3 text-4xl font-semibold leading-snug">
//             We Make Automated Trading Easy and Profitable
//             </h2>
//             <p className="text-base text-justify text-gray-600">
//             Take charge of your investments with FinRain, a smart trading designed to help you make more profit with less effort. Our advanced AI-powered technology allows you to trade 24/7 without the hassle of manual trading. Whether you are a beginner or an expert, FinRain makes trading simpler, safer, and more efficient for everyone.
//             </p>
//           </div>
//           <div className="relative sm:h-[400px] rounded-lg overflow-hidden">
//             <img
//               src="https://img.freepik.com/free-photo/robot-with-final-piece-jigsaw-puzzle_1048-3550.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid"
//               alt="Office workspace"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>
