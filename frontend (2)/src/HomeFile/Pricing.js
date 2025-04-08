import React from "react";
import { Link } from "react-router-dom";
export const Pricing = () => {
  const pricingPlans = [
    {
      title: "Starter Plan",
      price: " $50 - $500",
      period: "/ month",
      features: ["Daily ROI: 0.20%", " Monthly ROI: 6%", "Limit: 3x"],
    },
    {
      title: "Advanced Plan",
      price: "$550 - $2450",
      period: "/ month",
      features: ["Daily ROI: 0.26%", "Monthly ROI: 8%", "Limit: 4x"],
    },
    {
      title: "Pro Plan",
      price: " $2500 - $6000",
      period: "/ month",
      features: ["Daily ROI: 0.33%", "Monthly ROI: 10%", "Limit: 5x"],
    },
    {
      title: "Elite Plan",
      price: "$6050 & Above",
      period: "/ month",
      features: ["Daily ROI: 0.40%", "Monthly ROI: 12%", "Limit: 6x"],
    },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute hidden w-full bg-gray-50 lg:block h-96" />
      <div className="relative px-4 py-16 mx-auto max-w-7xl  ">
        <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl">
          <h2 className="max-w-lg  font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          Our Pricing  <span className="text-[#0089bd]">Package</span>
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            SChoose the best plan for your trading needs and enjoy daily ROI with smart automation.
          </p>
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {pricingPlans.map((plan, index) => (
            <div key={index}>
              <div className="p-8 bg-gray-900 rounded">
                <div className="mb-4 text-center">
                  <p className="text-xl mb-4 font-medium tracking-wide text-white">{plan.title}</p>
                  <div className="flex items-center justify-center">
                    <p className="mr-2  font-semibold text-white text-xl">{plan.price}</p>
                    <p className="text-lg text-gray-500">{plan.period}</p>
                  </div>
                </div>
                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="mr-3">
                        <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" strokeLinecap="round" strokeWidth="2">
                          <polyline fill="none" stroke="currentColor" points="6,12 10,16 18,8" />
                          <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
                <Link to="registration">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#0089bd] hover:bg-[#2b87ab] focus:shadow-outline focus:outline-none"
                >
                  Get Now
                </button>
                </Link>
              </div>
              <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
              <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
              <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
