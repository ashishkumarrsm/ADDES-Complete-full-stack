import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HomeIcon } from "@heroicons/react/20/solid";

const pages = [{ name: "About", href: "/about", current: false }];
export const AboutHeroSection = () => {
  return (
    <>
      <div className="relative px-6 isolate pt-14 lg:px-8">
        <div className="max-w-2xl py-5 mx-auto sm:py-16 ">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-[#e0e21e]  text-balance sm:text-4xl">
              About <span className="text-[#40b5e3]">Us</span>
            </h2>
            <p className="mt-4 text-base font-medium text-gray-400 text-pretty ">
            At Teirrax, we make trading simple and smart with AI-powered automation. Our 
            goal is to help everyone trade easily, safely, and profitably. Whether you're new 
            or experienced, our platform is designed for you!
            </p>
            <nav aria-label="Breadcrumb" className="flex justify-center mt-6">
              <ol
                role="list"
                className="flex space-x-4 rounded-md bg-black/50 border px-6 shadow"
              >
                <li className="flex">
                  <div className="flex items-center">
                    <Link to="/" className="text-gray-200 hover:text-gray-300">
                      <HomeIcon
                        aria-hidden="true"
                        className="size-5 shrink-0"
                      />
                      <span className="sr-only">Home</span>
                    </Link>
                  </div>
                </li>
                {pages.map((page) => (
                  <li key={page.name} className="flex justify-center">
                    <div className="flex items-center justify-center">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="h-full w-6 shrink-0 text-gray-200"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      <Link
                        to={page.href}
                        aria-current={page.current ? "page" : undefined}
                        className="ml-4 text-sm font-medium text-gray-200 hover:text-gray-300"
                      >
                        {page.name}
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

// <div className="relative min-h-screen bg-[#010D1F] overflow-hidden">
//         <div
//           className="absolute inset-0 object-center opacity-60"
//           style={{
//             backgroundImage:
//               "url('https://html.designingmedia.com/artelligence/assets/images/banner-background.png')",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <div className="px-2 mx-auto max-w-7xl sm:px-0">
//           <div className="grid items-center gap-12 pt-24 md:grid-cols-2 min-h-svh md:pt-0">
//             <div className="z-10">
//               <h2 className="mb-6 text-5xl font-semibold text-transparent sm:text-6xl bg-gradient-to-r from-blue-500 via-red-400 to-green-500 bg-clip-text lendings">
//               About Us
//               </h2>
//               <p className="max-w-xl mb-8 text-lg text-justify text-gray-300">
//               Take charge of your investments with FinRain, a smart trading designed to help you make more profit with less effort. Our advanced AI-powered technology allows you to trade 24/7 without the hassle of manual trading. Whether you are a beginner or an expert, FinRain makes trading simpler, safer, and more efficient for everyone.
//               </p>
//               <div className="flex space-x-4">
//                 <div className="flex space-x-4">
//                   <div className="group">
//                     <div className="flex items-center justify-between gap-2 px-4 py-2 text-white transition-all duration-300 rounded-r-full rounded-tl-full bg-gradient-to-r from-blue-600 to-blue-800 group-hover:bg-gradient-to-r group-hover:from-blue-800 group-hover:to-cyan-600">
//  <Link to='/'className="hover:text-green-100 hover:underline">Home</Link>

//  <MdKeyboardDoubleArrowRight className="text-xl"/>
//   <Link to='/about'className="hover:text-green-100 hover:underline">About</Link>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>

//             <div className="relative z-10">
//               <img
//                 src="https://html.designingmedia.com/artelligence/assets/images/sub-bannerimage.png"
//                 alt="AI Robot"
//                 className="absolute object-cover w-full h-auto -right-20 -top-28"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
