import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },

];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-black">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="container flex justify-between items-center p-3 mx-auto rounded-full shadow-md bg-black/50">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <Link to='/'>
            <div className="ml-2">
             <img src="/teirrax.png" className="w-10" alt="logo" />
            </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={` hover:text-[#e0e21e] ${
                  location.pathname === item.href
                    ? "text-[#e0e21e] border-b border-[#e0e21e]  font-semibold"
                    : "text-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section - Language & Login */}
          <div className="flex items-center space-x-4">
            {/* <Link to="/user/login">
              <button className="bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-white py-1 px-1 rounded-full flex items-center gap-3 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg">
                <span className="bg-[#e0e21e] text-[#018dc5fa] px-5 py-2 rounded-full font-semibold">
                  Log in
                </span>
                <div className="bg-[#e0e21e] rounded-full p-2 flex items-center justify-center">
                  <AiOutlineArrowRight className="w-5 h-5 text-[#018dc5fa]" />
                </div>
              </button>
            </Link> */}
             <Link to="/user/login">
              <button className="bg-gradient-to-r  from-[#e0e21e] to-[#cacd0d] text-white py-1 px-1 rounded-full flex items-center gap-3 hover:from-[#cdcf36] hover:to-[#d7da27] transition-all duration-300 shadow-lg">
                <span className=" bg-gradient-to-r from-[#0089bd] to-[#059ad4] text-[#fff] px-5 py-2 rounded-full font-semibold">
                  Log in
                </span>
                <div className="bg-[#0089bd] rounded-full p-2 flex items-center justify-center">
                  <AiOutlineArrowRight className="w-5 h-5 text-[#fcfcfcfa]" />
                </div>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-300"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="md:hidden"
        >
          <div className="fixed inset-0 bg-black opacity-50" />
          <DialogPanel className="fixed inset-y-0 right-0 p-6 w-64 bg-white shadow-lg">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-800">Teirrax</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-500 ${
                    location.pathname === item.href
                      ? "text-blue-500 font-semibold"
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Login Button in Mobile Menu */}
            <div className="mt-6">
              <Link to="/user/login">
                <button className="flex gap-2 justify-center items-center py-2 w-full text-white bg-yellow-400 rounded-full">
                  <span className="px-6 py-1 bg-green-800 rounded-full">
                    Log in
                  </span>
                  <div className="p-2 bg-white rounded-full">
                    <AiOutlineArrowRight className="w-4 h-4 text-green-600" />
                  </div>
                </button>
              </Link>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
