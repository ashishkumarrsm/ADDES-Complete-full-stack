import React from "react";
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="px-6 py-10 text-white bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/">
                <div className="ml-2">
                  <img src="/teirrax.png" className="w-12" alt="logo" />
                </div>
              </Link>
            </div>
            <p className="text-sm text-gray-300">
              Trade smarter and faster with AI-powered technology. Your success
              starts here!
            </p>
            {/* <div className="text-sm text-gray-300">
              <div className="flex">
                <span className="w-24 font-medium">MON - FRI</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="my-2 border-t border-gray-800" />
              <div className="flex">
                <span className="w-24 font-medium">SATURDAY</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
            </div> */}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {/* <div className="flex items-start">
                <div className="p-1 mt-1 mr-3 bg-gray-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p>175 10h Street, Office 375<br />Berlin, De 21562</p>
              </div>
              <div className="flex items-start">
                <div className="p-1 mt-1 mr-3 bg-gray-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p>+123 34598768</p>
                  <p>+554 34598734</p>
                </div>
              </div> */}
              <div className="flex items-start items-center">
                <div className="p-1 mt-1 mr-3 bg-gray-800 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p>info@teirrax.com</p>
              </div>
              <div className="flex items-start items-center">
                <div className="p-1 mt-1 mr-3 bg-gray-800 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p>support@teirrax.com</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-sm text-gray-300">
              Join our subscribers list to get the latest news and special
              offers.
            </p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-grow px-3 py-2 text-sm text-white bg-gray-800 rounded-l outline-none"
              />
              <button className="px-3 py-2 text-white bg-gray-700 rounded-r">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" id="privacy" className="mr-2" />
              <label htmlFor="privacy" className="text-sm text-gray-300">
                I agree to the Privacy Policy
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center pt-6 mt-8 border-t border-gray-800 md:flex-row">
          <p className="text-sm text-gray-400">
            © Copyright 2025 Teirrax. All Rights Reserved
          </p>
          <div className="flex mt-4 space-x-3 md:mt-0">
            <Link
              to="https://www.facebook.com/profile.php?id=61573958066914"
              className="p-2 bg-gray-800 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
            <Link
              to="https://www.instagram.com/_teirrax_/"
              className="p-2 text-white bg-gray-800 rounded-full"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              to="https://x.com/teirraxcoin"
              className="p-2 bg-gray-800 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </Link>
            {/* <Link to="#" className="p-2 bg-gray-800 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
