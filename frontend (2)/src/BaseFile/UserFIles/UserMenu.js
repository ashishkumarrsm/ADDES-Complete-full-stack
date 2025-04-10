
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutuser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { defaulterNotification, getUser } from "../../redux/userSlice";
import { Wallet } from "lucide-react";

// Icons
import { 
  Menu, X, Home, BarChart2, Users, LogOut, ChevronDown,
  CreditCard, DollarSign, Settings, User, Eye, HelpCircle, 
  AlertTriangle, FileText, Award, Upload, Download, Bell,
  RefreshCw, Layers, Shield, BarChart, Briefcase
} from "lucide-react";

// Define submenu structure
const income = [
  { name: "Adds Income", to: "/transactions/add_income", icon: <FileText size={18} /> },
  { name: "Telegram", to: "/transactions/telegram_income", icon: <BarChart2 size={18} /> },
  { name: "Sponsor", to: "/transactions/sponsor_income", icon: <Users size={18} /> },
  { name: "ROI Income", to: "/transactions/roi_income", icon: <BarChart size={18} /> },
  { name: "Direct Income", to: "/user/transaction/direct_transaction", icon: <DollarSign size={18} /> },
  { name: "Level", to: "/user/transaction/invest_level_transaction/invest", icon: <Layers size={18} /> },
  { name: "Reward", to: "/user/transaction/reward_transaction", icon: <Award size={18} /> },
  { name: "Detail", to: "/user/income", icon: <FileText size={18} /> },
];

const kyc = [
  { name: "KYC Charge", to: "/user/UserKycCharge", icon: <CreditCard size={18} /> },
  { name: "KYC Details", to: "/user/UserKycDetails", icon: <FileText size={18} /> },
  { name: "KYC Transfer", to: "/user/UserKycTransfer", icon: <RefreshCw size={18} /> },
  { name: "KYC History", to: "/user/UserKycHistory", icon: <BarChart size={18} /> },
];

const team = [
  { name: "Tree View", to: "/user/referraltree", icon: <Layers size={18} /> },
  { name: "Team", to: "/user/directmember", icon: <Users size={18} /> },
];

const menus = [
  { name: "Dashboard", to: "/user/dashboard", icon: <Home size={20} /> },
  { name: "View Ad", to: "/watch-adds", icon: <Eye size={20} /> },
  { name: "Tree", to: "/user/referraltree", icon: <Layers size={20} />, submenu: team },
  { name: "Deposit", to: "/user/adddeposite", icon: <Upload size={20} /> },
  { name: "Income", to: "/user/income", icon: <DollarSign size={20} />, submenu: income },
  { name: "KYC", to: "/user/UserKyc", icon: <Shield size={20} />, submenu: kyc },
  { name: "Withdrawal", to: "/user/addwithdrawal", icon: <Download size={20} /> },
  { name: "Notification", to: "/user/Notification", icon: <Bell size={20} /> },
  { name: "ReTop-Up", to: "/user/topup", icon: <RefreshCw size={20} /> },
  { name: "Membership Plan", to: "/user/plan", icon: <Award size={20} /> },
  { name: "Support", to: "/user/sendsupport", icon: <HelpCircle size={20} /> },
  { name: "Bank Details", to: "/user/UserBankDetails", icon: <CreditCard size={20} /> },
];

export default function UserMenu({ Children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaulternotification, setDefaulterNotification] = useState(false);
  
  const { auth } = useSelector((state) => state.auth);
  const { singleuser, userrewardnotification } = useSelector(
    (state) => state.allusers
  );

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-adjust sidebar based on screen size
      if (width >= 1024) {
        setSidebarOpen(true);
      } else if (width < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch user data
  useEffect(() => {
    if (auth?.id) {
      dispatch(getUser(auth.id));
      dispatch(defaulterNotification(auth.id));
    }
  }, [auth?.id, dispatch]);

  useEffect(() => {
    if (userrewardnotification) {
      setDefaulterNotification(true);
    }
  }, [userrewardnotification]);

  // Logout function
  const handleLogout = () => {
    dispatch(signoutuser());
    navigate("/");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Improved Overlay for mobile when sidebar is open */}
      {(isMobile || isTablet) && sidebarOpen && (
        <Transition
          show={sidebarOpen}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={closeSidebar}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60" />
          </div>
        </Transition>
      )}

      {/* Sidebar with improved transitions */}
      <aside 
        className={`fixed h-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white z-40 transition-all duration-300 ease-in-out flex flex-col 
                    ${sidebarOpen 
                      ? (isMobile || isTablet) 
                        ? "w-72 translate-x-0 shadow-2xl" 
                        : "w-64 translate-x-0" 
                      : (isMobile || isTablet) 
                        ? "w-72 -translate-x-full" 
                        : "w-20 translate-x-0"
                    }`}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-indigo-800/50 flex-shrink-0">
          <div className="flex items-center">
            <div className=" flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-full bg-white shadow-lg ">
              <img src="/adtofuture.png" className=" w-10 h-10 rounded-full bg-white shadow-lg" alt="Logo" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg ml-3 text-white">Adtofutre</span>
            )}
          </div>
          {(isMobile || isTablet) && sidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="text-indigo-200 hover:text-white transition-colors p-1 rounded-full hover:bg-indigo-800/50"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* User info */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-indigo-800/50 bg-indigo-800/20 flex-shrink-0">
            <div className="flex items-center mb-2">
              <User size={18} className="text-indigo-200" />
              <span className="ml-2 text-sm font-medium text-indigo-100 truncate">
                {singleuser?.fullname || "User"}
              </span>
            </div>
            <div className="flex items-center">
              <CreditCard size={18} className="text-indigo-200" />
              <span className="ml-2 text-sm font-medium text-indigo-100 truncate">
                {singleuser?.refferal_code || "Code"}
              </span>
            </div>
          </div>
        )}

        {/* Navigation - Improved scrollbar */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent py-4 px-3">
            <div className="space-y-1">
              {menus.map((menu, index) => (
                menu.submenu ? (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 my-1 text-left transition-all ${
                            location.pathname.includes(menu.to.split('/').slice(0, 3).join('/'))
                            ? "bg-white/20 text-white shadow-md"
                            : "text-indigo-100 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded ${location.pathname.includes(menu.to.split('/').slice(0, 3).join('/')) ? "bg-indigo-500" : "bg-indigo-800/50"}`}>
                              {menu.icon}
                            </div>
                            {sidebarOpen && <span className="ml-3 text-sm font-medium">{menu.name}</span>}
                          </div>
                          {sidebarOpen && (
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-200 ${open ? "transform rotate-180" : ""}`} 
                            />
                          )}
                        </Disclosure.Button>
                        
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className={`${!sidebarOpen ? "hidden" : ""} pl-4 pr-1 py-1 space-y-1`}>
                            {menu.submenu.map((submenu, subIndex) => (
                              <Link
                                key={subIndex}
                                to={submenu.to}
                                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                                  location.pathname === submenu.to
                                  ? "bg-indigo-600/40 text-white"
                                  : "text-indigo-200 hover:bg-indigo-700/30 hover:text-white"
                                }`}
                                onClick={closeSidebar}
                              >
                                {submenu.icon}
                                <span className="ml-2 text-sm">{submenu.name}</span>
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <Link
                    key={index}
                    to={menu.to}
                    className={`flex items-center rounded-lg px-3 py-2.5 my-1.5 transition-all ${
                      location.pathname === menu.to
                      ? "bg-white/20 text-white shadow-md"
                      : "text-indigo-100 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={closeSidebar}
                  >
                    <div className={`p-1.5 rounded ${location.pathname === menu.to ? "bg-indigo-500" : "bg-indigo-800/50"}`}>
                      {menu.icon}
                    </div>
                    {sidebarOpen && <span className="ml-3 text-sm font-medium">{menu.name}</span>}
                  </Link>
                )
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="border-t border-indigo-800/50 px-3 py-3 bg-indigo-900/50 flex-shrink-0">
          <Link
            to={`/user/profile/${auth?.id}`}
            className={`flex items-center rounded-lg px-3 py-2.5 my-1 transition-all ${
              location.pathname === `/user/profile/${auth?.id}`
              ? "bg-white/20 text-white"
              : "text-indigo-100 hover:bg-white/10 hover:text-white"
            }`}
            onClick={closeSidebar}
          >
            <div className={`p-1.5 rounded ${location.pathname === `/user/profile/${auth?.id}` ? "bg-indigo-500" : "bg-indigo-800/50"}`}>
              <User size={20} />
            </div>
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Profile</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center rounded-lg px-3 py-2.5 my-1 text-left transition-all text-red-200 hover:bg-red-500/20"
          >
            <div className="p-1.5 rounded bg-red-900/50">
              <LogOut size={20} />
            </div>
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content area with responsive margin adjustments */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
                    ${isMobile ? 'pb-16' : ''} 
                    ${sidebarOpen 
                      ? (isMobile || isTablet) 
                        ? 'ml-0' 
                        : 'ml-64'
                      : (isMobile || isTablet)
                        ? 'ml-0'
                        : 'ml-20'}`}
      >
        {/* Enhanced Header with better balance display */}
        <header className="bg-gradient-to-b from-indigo-900 to-purple-900 shadow-sm sticky top-0 z-20 ">
          <div className="px-4 sm:px-6 lg:px-8 flex  items-center justify-between py-3">
            {/* Left side - Hamburger and brand */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-white hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors focus:ring-2 focus:ring-indigo-200"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen && !isMobile && !isTablet ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="ml-4 flex items-center">
                <img 
                  src="/adtofuture.png" 
                  alt="Logo" 
                  className="h-8 w-auto"
                />
                <span className="ml-2 font-semibold text-white hidden sm:block">Adtofuture Dashboard</span>
              </div>
            </div>

            {/* Right side - User info and balances */}
            <div className="flex items-center space-x-4">
              {/* Account balance cards - improved responsive display */}
              <div className="hidden md:flex space-x-3">
                <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2 shadow-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                  <Briefcase size={18} className="text-blue-600" />
                  <div className="ml-2">
                    <p className="font-medium text-blue-900">${singleuser?.business || '0.00'}</p>
                    <p className="text-xs text-blue-600">Business</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-emerald-50 rounded-lg px-4 py-2 shadow-sm border border-emerald-100 hover:bg-emerald-100 transition-colors">
                  <Wallet size={18} className="text-emerald-600" />
                  <div className="ml-2">
                    <p className="font-medium text-emerald-900">${singleuser?.wallet || '0.00'}</p>
                    <p className="text-xs text-emerald-600">Wallet</p>
                  </div>
                </div>

                <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2 shadow-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                  <Briefcase size={18} className="text-blue-600" />
                  <div className="ml-2">
                    <p className="font-medium text-blue-900">${singleuser?.business || '0.00'}</p>
                    <p className="text-xs text-blue-600">Business</p>
                  </div>
                </div>
              </div>
              
              {/* Notification indicator with animation */}
              <button className="relative p-2 text-white hover:text-indigo-600 transition-colors">
                <Bell size={22} />
                {defaulternotification && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              
              {/* User profile */}
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                  <img
                    src={`https://ui-avatars.com/api/?name=${singleuser?.fullname || "User"}&background=6366F1&color=fff`}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className="text-sm font-medium text-white truncate max-w-[120px]">{singleuser?.fullname || "User"}</p>
                  <p className="text-xs text-white truncate max-w-[120px]">{singleuser?.refferal_code || "Code"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile balance cards - improved with animations and gradients */}
          <div className="md:hidden p-3 grid grid-cols-3 gap-3 bg-gray-50 border-t border-gray-200 ">
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-3 py-2.5 shadow-md">
              <Briefcase size={16} className="text-blue-100" />
              <div className="ml-2 overflow-hidden">
                <p className="font-medium truncate">${singleuser?.business || '0.00'}</p>
                <p className="text-xs opacity-80">Business</p>
              </div>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg px-3 py-2.5 shadow-md">
              <Wallet size={16} className="text-emerald-100" />
              <div className="ml-2 overflow-hidden">
                <p className="font-medium truncate">${singleuser?.wallet || '0.00'}</p>
                <p className="text-xs opacity-80">Wallet</p>
              </div>
            </div>

            <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-3 py-2.5 shadow-md">
              <Briefcase size={16} className="text-blue-100" />
              <div className="ml-2 overflow-hidden">
                <p className="font-medium truncate">${singleuser?.business || '0.00'}</p>
                <p className="text-xs opacity-80">Business</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content with better padding for mobile */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-indigo-900 to-purple-900 px-4 py-6 sm:px-6 lg:px-8">
          {Children}
        </main>
      </div>

      {/* Mobile bottom navigation with active indicators */}
      {isMobile && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg z-30 flex items-center justify-around py-1">
          {[
            { to: "/user/dashboard", icon: <Home size={20} />, label: "Home" },
            { to: "/user/income", icon: <DollarSign size={20} />, label: "Income" },
            { to: "/user/adddeposite", icon: <Upload size={20} />, label: "Deposit" },
            { to: "/user/addwithdrawal", icon: <Download size={20} />, label: "Withdraw" },
            { to: `/user/profile/${auth?.id}`, icon: <User size={20} />, label: "Profile" }
          ].map((item, index) => {
            const isActive = location.pathname === item.to;
            return (
              <Link 
                key={index}
                to={item.to} 
                className={`flex flex-col items-center py-2 px-3 relative ${
                  isActive ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-indigo-600 rounded-t-full"></span>
                )}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}