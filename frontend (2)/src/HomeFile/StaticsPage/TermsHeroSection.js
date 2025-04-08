import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HomeIcon } from '@heroicons/react/20/solid'

const pages = [
  { name: 'Privacy', href: '/privacy', current: false },
]
export const TermsHeroSection = () => {
  return (
    <>
    
      <div className="relative px-6 isolate pt-14 lg:px-8">
       
       <div className="max-w-2xl py-5 mx-auto sm:py-16 ">
        
         <div className="text-center">
         <h2 className="text-4xl font-semibold tracking-tight text-[#e0e21e]  text-balance sm:text-4xl">
         Terms & <span className="text-[#40b5e3]">Conditions</span>
            </h2>
           <p className="mt-4 text-base font-medium text-gray-400 text-pretty ">
           Welcome to Teirrax! By using our website and services, you agree to follow these Terms & Conditions. Please read them carefully.</p>
<nav aria-label="Breadcrumb" className="flex justify-center mt-6">
     <ol role="list" className="flex space-x-4 rounded-md bg-black/50 border px-6 shadow">
       <li className="flex">
         <div className="flex items-center">
           <Link to="/" className="text-gray-200 hover:text-gray-300">
             <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
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
               aria-current={page.current ? 'page' : undefined}
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
// <div
//   className="absolute inset-0 object-center opacity-60"
//   style={{
//     backgroundImage:
//       "url('https://html.designingmedia.com/artelligence/assets/images/banner-background.png')",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}
// />
// <div className="px-2 mx-auto max-w-7xl sm:px-0">
//   <div className="grid items-center min-h-screen gap-12 pt-24 md:grid-cols-2 md:pt-0">
//     <div className="z-10">
//       <h2 className="mb-6 text-5xl font-semibold text-transparent sm:text-6xl bg-gradient-to-r from-blue-500 via-red-400 to-green-500 bg-clip-text lendings">
//      Terms & Conditions
//       </h2>
//       <p className="max-w-xl mb-8 text-lg text-justify text-gray-300">
//       To access FinRain and use our services, you must create an account with accurate and complete information. By using our platform, you agree to adhere to the terms outlined below.

//       </p>
//       <div className="flex space-x-4">
//         <div className="flex space-x-4">
//           <div className="group">
//             <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-2.5 flex justify-between gap-2 items-center text-white rounded-r-full rounded-tl-full px-4 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-800 group-hover:to-cyan-600">
//               <Link to="/"className="hover:text-green-100 hover:underline">Home</Link>
//               <MdKeyboardDoubleArrowRight className="text-xl" />
//               <Link to="/terms"className="hover:text-green-100 hover:underline">Terms</Link>
//             </div>
//           </div>

          
//         </div>
//       </div>
//     </div>

//     <div className="relative z-10">
//       <img
//         src="https://cdn-apinb.nitrocdn.com/LGFQTZTBRQFYZkDHnBAkeTYvUEPBCNKO/assets/images/optimized/rev-220ff1a/www.instancy.com/wp-content/uploads/2023/08/Home-bg-image.png"
//         alt="AI Robot"
//         className="w-full h-auto"
//       />
//     </div>
//   </div>
// </div>
// </div>