import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import Header from "../../CoreFile/Header";
import Footer from "../../CoreFile/Footer";
import { ContactHeroSection } from "./ContactHeroSection";
import { AiOutlineArrowRight } from "react-icons/ai";
export const Contact = () => {
  return (
    <>
      <Header />
      <ContactHeroSection />

      <div className="bg-gray-100">
        <div className="px-6 py-16 mx-auto max-w-7xl lg:px-8">
          <div className="relative bg-white shadow-xl">
            <h2 className="sr-only">Contact us</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Contact information */}
              <div className="relative px-6 py-10 overflow-hidden bg-[#0089bd] sm:px-10 xl:p-12">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none sm:hidden"
                >
                  <svg
                    fill="none"
                    width={343}
                    height={388}
                    viewBox="0 0 343 388"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 size-full"
                  >
                    <path
                      d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                      fill="url(#linear1)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear1"
                        x1="254.553"
                        x2="961.66"
                        y1="107.554"
                        y2="814.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff" />
                        <stop offset={1} stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none sm:block lg:hidden"
                >
                  <svg
                    fill="none"
                    width={359}
                    height={339}
                    viewBox="0 0 359 339"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 size-full"
                  >
                    <path
                      d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                      fill="url(#linear2)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear2"
                        x1="192.553"
                        x2="899.66"
                        y1="28.553"
                        y2="735.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff" />
                        <stop offset={1} stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none lg:block"
                >
                  <svg
                    fill="none"
                    width={160}
                    height={678}
                    viewBox="0 0 160 678"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 size-full"
                  >
                    <path
                      d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                      fill="url(#linear3)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear3"
                        x1="192.553"
                        x2="899.66"
                        y1="325.553"
                        y2="1032.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff" />
                        <stop offset={1} stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                We're Here to Help!
                </h3>
                <p className="max-w-3xl mt-6 text-base text-indigo-50">
                Need assistance? Our support team is available to answer your questions 
                and guide you through every step. Reach out to us anytime—we’re happy to help!
                </p>
                <dl className="mt-8 space-y-6">
                  <dt>
                    <span className="sr-only">Phone number</span>
                  </dt>
                  <dd className="flex text-base text-indigo-50">
                    <PhoneIcon
                      aria-hidden="true"
                      className="text-indigo-200 size-6 shrink-0"
                    />
                    <span className="ml-3">+9876543210</span>
                  </dd>
                  <dt>
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd className="flex text-base text-indigo-50">
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="text-indigo-200 size-6 shrink-0"
                    />
                    <span className="ml-3">terriax12@gmail.com</span>
                  </dd>
                </dl>
                <ul role="list" className="flex mt-8 space-x-12">
                  <li>
                    <a
                      href="#"
                      className="text-indigo-200 hover:text-indigo-100"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-6"
                      >
                        <path
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-200 hover:text-indigo-100"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-6"
                      >
                        <path
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-200 hover:text-indigo-100"
                    >
                      <span className="sr-only">X</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-6"
                      >
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact form */}
              <div className="px-6 py-10 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 className="text-lg font-medium text-gray-900">
                  Send us a message
                </h3>
                <form
                  action="#"
                  method="POST"
                  className="grid grid-cols-1 mt-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <span
                        id="phone-optional"
                        className="text-sm text-gray-500"
                      >
                        Optional
                      </span>
                    </div>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        aria-describedby="phone-optional"
                        className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Subject
                    </label>
                    <div className="mt-1">
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Message
                      </label>
                      <span id="message-max" className="text-sm text-gray-500">
                        Max. 500 characters
                      </span>
                    </div>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        aria-describedby="message-max"
                        className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="submit"
                      className=" mt-4 bg-gradient-to-r  from-[#e0e21e] to-[#cacd0d] text-white py-1 px-1 rounded-full flex items-center gap-2 hover:from-[#cdcf36] hover:to-[#d7da27] transition-all duration-300 shadow-lg"
                    >
                      <span className=" bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-[#fff] px-5 py-2 rounded-full font-semibold">
                        Submit
                      </span>
                      <div className="bg-[#0089bd] rounded-full p-2 flex items-center justify-center">
                        <AiOutlineArrowRight className="w-5 h-5 text-[#fcfcfcfa]" />
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// <div className="mt-20 bg-gray-100">
// <div className="px-2 py-8 mx-auto max-w-7xl ">
//   <div className="relative bg-white shadow-sm">
//     <h2 className="sr-only">Contact Us</h2>

//     <div className="grid grid-cols-1 lg:grid-cols-3">
//       {/* Contact information */}
//       <div className="relative px-6 py-10 overflow-hidden bg-green-700 sm:px-10 xl:p-12">
//         <div aria-hidden="true" className="absolute inset-0 pointer-events-none sm:hidden">
//           <svg
//             fill="none"
//             width={343}
//             height={388}
//             viewBox="0 0 343 388"
//             preserveAspectRatio="xMidYMid slice"
//             className="absolute inset-0 size-full"
//           >
//             <path
//               d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
//               fill="url(#linear1)"
//               fillOpacity=".1"
//             />
//             <defs>
//               <linearGradient
//                 id="linear1"
//                 x1="254.553"
//                 x2="961.66"
//                 y1="107.554"
//                 y2="814.66"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#fff" />
//                 <stop offset={1} stopColor="#fff" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//         <div
//           aria-hidden="true"
//           className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none sm:block lg:hidden"
//         >
//           <svg
//             fill="none"
//             width={359}
//             height={339}
//             viewBox="0 0 359 339"
//             preserveAspectRatio="xMidYMid slice"
//             className="absolute inset-0 size-full"
//           >
//             <path
//               d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
//               fill="url(#linear2)"
//               fillOpacity=".1"
//             />
//             <defs>
//               <linearGradient
//                 id="linear2"
//                 x1="192.553"
//                 x2="899.66"
//                 y1="28.553"
//                 y2="735.66"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#fff" />
//                 <stop offset={1} stopColor="#fff" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//         <div
//           aria-hidden="true"
//           className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none lg:block"
//         >
//           <svg
//             fill="none"
//             width={160}
//             height={678}
//             viewBox="0 0 160 678"
//             preserveAspectRatio="xMidYMid slice"
//             className="absolute inset-0 size-full"
//           >
//             <path
//               d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
//               fill="url(#linear3)"
//               fillOpacity=".1"
//             />
//             <defs>
//               <linearGradient
//                 id="linear3"
//                 x1="192.553"
//                 x2="899.66"
//                 y1="325.553"
//                 y2="1032.66"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#fff" />
//                 <stop offset={1} stopColor="#fff" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//         <h3 className="text-lg font-medium text-white">We’re Here to Help!</h3>
//         <p className="max-w-3xl mt-6 text-base text-indigo-50">
//         We're here to help! Reach out to us anytime with your questions, feedback, or support needs—we're just a message away.
//         </p>
//         <dl className="mt-8 space-y-6">
//           <dt>
//             <span className="sr-only">Phone number</span>
//           </dt>
//           <dd className="flex text-base text-indigo-50">
//             <PhoneIcon aria-hidden="true" className="text-indigo-200 size-6 shrink-0" />
//             <span className="ml-3">+1 (555) 123-4567</span>
//           </dd>
//           <dt>
//             <span className="sr-only">Email</span>
//           </dt>
//           <dd className="flex text-base text-indigo-50">
//             <EnvelopeIcon aria-hidden="true" className="text-indigo-200 size-6 shrink-0" />
//             <span className="ml-3">info@Finrain.live</span>
//           </dd>
//         </dl>
//         <ul role="list" className="flex mt-8 space-x-12">
//           <li>
//             <a href="#" className="text-indigo-200 hover:text-indigo-100">
//               <span className="sr-only">Facebook</span>
//               <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-6">
//                 <path
//                   d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                 />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-indigo-200 hover:text-indigo-100">
//               <span className="sr-only">GitHub</span>
//               <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-6">
//                 <path
//                   d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                 />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-indigo-200 hover:text-indigo-100">
//               <span className="sr-only">X</span>
//               <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-6">
//                 <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
//               </svg>
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Contact form */}
//       <div className="px-6 py-10 sm:px-10 lg:col-span-2 xl:p-12">
//         <h3 className="text-lg font-bold text-green-600">Send us a message</h3>
//         <form action="#" method="POST" className="grid grid-cols-1 mt-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
//           <div>
//             <label htmlFor="first-name" className="block text-lg font-medium text-gray-900">
//               First name
//             </label>
//             <div className="mt-1">
//               <input
//                 id="first-name"
//                 name="first-name"
//                 type="text"
//                 autoComplete="given-name"
//                 className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="last-name" className="block text-lg font-medium text-gray-900">
//               Last name
//             </label>
//             <div className="mt-1">
//               <input
//                 id="last-name"
//                 name="last-name"
//                 type="text"
//                 autoComplete="family-name"
//                 className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-lg font-medium text-gray-900">
//               Email
//             </label>
//             <div className="mt-1">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//           <div>
//             <div className="flex justify-between">
//               <label htmlFor="phone" className="block text-lg font-medium text-gray-900">
//                 Phone
//               </label>
//               <span id="phone-optional" className="text-lg text-gray-500">
//                 Optional
//               </span>
//             </div>
//             <div className="mt-1">
//               <input
//                 id="phone"
//                 name="phone"
//                 type="text"
//                 autoComplete="tel"
//                 aria-describedby="phone-optional"
//                 className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-2">
//             <label htmlFor="subject" className="block text-lg font-medium text-gray-900">
//               Subject
//             </label>
//             <div className="mt-1">
//               <input
//                 id="subject"
//                 name="subject"
//                 type="text"
//                 className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-2">
//             <div className="flex justify-between">
//               <label htmlFor="message" className="block text-lg font-medium text-gray-900">
//                 Message
//               </label>
//               <span id="message-max" className="text-lg text-gray-500">
//                 Max. 500 characters
//               </span>
//             </div>
//             <div className="mt-1">
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={4}
//                 aria-describedby="message-max"
//                 className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 defaultValue={''}
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-2 sm:flex sm:justify-end">
//             <button
//               type="submit"
//               className="inline-flex items-center justify-center w-full px-6 py-2 mt-2 text-lg font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
