

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signoutuser } from "../../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaUserAlt,
//   FaUsers,
//   FaUserShield,
//   FaUserCheck,
//   FaUserTimes,
//   FaDirections,
//   FaHandHoldingDollar,
//   FaRegUser,
// } from "react-icons/fa";
// import {
//   AiOutlineMenu,
//   AiOutlineClose,
//   AiOutlineDashboard,
// } from "react-icons/ai";
// import {
//   MdNotificationAdd,
//   MdManageAccounts,
//   MdNotificationsPaused,
//   MdOutlineSupportAgent,
//   MdRecentActors,
//   MdAccountTree,
// } from "react-icons/md";
// import { IoMdNotifications, IoMdLogOut } from "react-icons/io";
// import { TbReportSearch, TbListDetails } from "react-icons/tb";
// import { GrAchievement, GrDown } from "react-icons/gr";
// import { SiNginxproxymanager, SiFirewalla } from "react-icons/si";
// import { GiLevelEndFlag } from "react-icons/gi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import {
//   RiPolaroid2Line,
//   RiPolaroid2Fill,
//   RiUserForbidFill,
// } from "react-icons/ri";
// import { FcSupport } from "react-icons/fc";
// import { Disclosure } from "@headlessui/react";
// import { defaulterNotification, getUser } from "../../redux/userSlice";
// import NotificationPopup from "../../User/NotificationPopup";
// import RewardNotification from "../../User/RewardNotification";
// import {
//   BellIcon,
//   Bars3Icon,
//   XMarkIcon,
//   ChevronLeftIcon,
//   ChevronDownIcon,
//   Bars3CenterLeftIcon,
//   ClockIcon,
//   CreditCardIcon,
//   DocumentChartBarIcon,
//   HomeIcon,
//   ScaleIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/outline";
// import { PiHandDepositFill } from "react-icons/pi";
// import { FaNotdef } from "react-icons/fa6";
// import { FaSquareWebAwesome } from "react-icons/fa6";
// import { signoutadmin } from "../../redux/authSlice";
// // const income = [
// //   {
// //     name: "ROI",
// //     to: "/user/transaction/roi_transaction/Invest",
// //     icon: <TbListDetails className="w-6 h-6" />,
// //   },
// //   {
// //     name: "Direct",
// //     to: "/user/directmember",
// //     icon: <AiOutlineDashboard className="w-6 h-6" />,
// //   },
// //   {
// //     name: "Level",
// //     to: "/user/transaction/invest_level_transaction/invest",
// //     icon: <GiLevelEndFlag className="w-6 h-6" />,
// //   },
// //   {
// //     name: "Reward",
// //     to: "/user/transaction/reward_transaction",
// //     icon: <SiFirewalla className="w-6 h-6" />,
// //   },
// //   {
// //     name: "Detail",
// //     to: "/user/income",
// //     icon: <TbListDetails className="w-6 h-6" />,
// //   },
// // ];

// const Settings = [
//   {
//     name: "Create notification",
//     to: "/admin/notification",
//     icon: <MdNotificationAdd className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "Notification list",
//     to: "/admin/notification/list",
//     icon: <MdNotificationsPaused className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "Support",
//     to: "/admin/support",
//     icon: <MdOutlineSupportAgent className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },

//   {
//     name: "Defaulter",
//     to: "/admin/defaulter",
//     icon: <FaNotdef className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "Reports",
//     to: "/admin/reports",
//     icon: <TbReportSearch className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
// ];

// const Management = [
//   {
//     name: "Unblocked Users",
//     to: "/admin/user/unblock",
//     icon: <FaUserShield className="w-5 h-5"/>,
//     current: true,
//   },
//   {
//     name: "Blocked User",
//     to: "/admin/user/block",
//     icon: <RiUserForbidFill className="w-5 h-5"/>,
//     current: false,
//   },
//   {
//     name: "Active Member",
//     to: "/admin/user/active",
//     icon: <FaUserCheck className="w-5 h-5"/>,
//     current: false,
//   },
//   {
//     name: "Inactive Member",
//     to: "/admin/user/inactive",
//     icon: <FaUserTimes className="w-5 h-5"/>,
//     current: false,
//   },
//   { name: "All User", to: "/admin/user/all", icon: <FaUsers className="w-5 h-5"/>, current: false },
// ];

// const Requests = [
//   // {
//   //   name: "Withdrawal",
//   //   to: "/admin/pendingwithdrawalrequest",
//   //   current: true,
//   // },
//   {
//     name: "Income",
//     to: "/admin/income",
//     icon: <RiPolaroid2Line className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
//   {
//     id: 2,
//     name: "CTO",
//     to: "/admin/cto",
//     icon: <MdRecentActors className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "ROI Withdrawal",
//     to: "/admin/roipendingwithdrawalrequest",
//     current: false,
//     icon: <RiPolaroid2Fill className="w-5 h-5"/>,
//   },
//   {
//     name: "Deposite",
//     to: "/admin/deposite",
//     icon: <PiHandDepositFill className="w-5 h-5"/>,
//     current: false,
//   },
//   { name: "TopUp", to: "/admin/topup", icon: <RiPolaroid2Line className="w-5 h-5"/>, current: false },
// ];

// const Achivers = [
//   {
//     name: "Rewards",
//     to: "/admin/rewards",
//     icon: <FaSquareWebAwesome className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
// ];

// const MainMenu = [
//   {
//     name: "Dashboard",
//     to: "/admin/dashboard",
//     icon: <AiOutlineDashboard className="w-5 h-5"/>,
//     current: true,
//     submenu: [],
//   },
//   {
//     name: "Bonus Manager",
//     to: "/admin/bonus-manager",
//     icon: <MdAccountTree className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "Membership Plans",
//     to: "/admin/membership/plan",
//     icon: <MdAccountTree className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },

//   {
//     name: "Management",
//     to: "/admin/user/all",
//     icon: <SiNginxproxymanager className="w-5 h-5"/>,
//     current: false,
//     submenu: Management,
//   },

//   {
//     name: "Achivers",
//     to: "/admin/achivers",
//     icon: <GrAchievement className="w-5 h-5"/>,
//     current: false,
//     submenu: Achivers,
//   },
//   {
//     name: "Withdrawal",
//     to: "/admin/pendingwithdrawalrequest",
//     icon: <PiHandWithdrawFill className="w-5 h-5"/>,
//     current: false,
//     submenu: Requests,
//   },
//   {
//     name: "QR Setting",
//     to: "/admin/qr/Link",
//     icon: <MdManageAccounts className="w-5 h-5"/>,
//     current: false,
//     submenu: [],
//   },

//   {
//     name: "Settings",
//     to: "/admin/settings",
//     icon: <MdManageAccounts className="w-5 h-5"/>,
//     current: false,
//     submenu: Settings,
//   },
// ];

// export default function AdminMenu({ Children, PageName }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { admin } = useSelector((state) => state.auth);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [headerMenu, setHeaderMenu] = useState([]);
//   const [defaulternotification, setDefaulterNotification] = useState(false);
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
//   const [currentTab, setCurrentTab] = useState([]);

//   // const [currentSubTab, setCurrentSubTab] = useState("Dashboard");
//   const [currentMenu, setCurrentMenu] = useState("Dashboard");
//   function handleHeaderMenu(submenu, name) {
//     console.log(submenu, name);
//     setHeaderMenu(submenu);
//     setCurrentTab(name);
//   }
//   function handlesignout() {
//     dispatch(signoutadmin());
//     navigate("/admin/login");
//   }
//   function isClose() {
//     setDefaulterNotification(false);
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <header className="w-full bg-[#fafafa] shadow-md  text-gray-900 py-4 px-10 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
//         <Link to="/" className="flex items-center">
//           <img src="/adtofuture.png" className="w-10" alt="Logo" />
//         </Link>
//         <div className="relative w-full text-center">
//           <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg transition-all duration-500 hover:scale-105">
//             {PageName}
//           </h2>
//           <div className="mx-auto mt-1 w-10 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 hover:w-20"></div>
//         </div>

//         <button
//           className="px-3 py-2 text-black bg-blue-200 rounded-sm border border-blue-400 shadow-lg"
//           onClick={() => setSidebarOpen(true)}
//         >
//           <AiOutlineMenu className="w-6 h-6" />
//         </button>
//       </header>
//       <aside
//         className={`fixed top-0 left-0 h-screen z-50 w-64 bg-white text-gray-900 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } transition-transform duration-300`}
//       >
//         <button
//           className="absolute top-4 right-4 text-gray-900"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <AiOutlineClose className="w-6 h-6" />
//         </button>
//         <div className="flex flex-col items-center px-6 py-3 bg-blue-50">
//           <div className="flex justify-center items-center w-16 h-16">
//             <img src="/adtofuture.png" className="w-10" alt="Logo" />
//           </div>
//           <p className="mt-2 text-lg font-bold"> 
//             {/* {admin?.fullname} */}
//             Admin
//             </p>
//           <p className="text-sm text-gray-800"></p>
//         </div>
//         <nav className="flex-1 overflow-y-auto p-4 mb-10 no-scrollbar max-h-[calc(100vh-13rem)]">
//           {MainMenu.map((menu, index) => {
//             return menu.submenu.length > 0 ? (
//               <Disclosure key={index}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button className="flex items-center justify-between w-full p-3 rounded hover:bg-[#e1eaff] transition">
//                       <div className="flex items-center">
//                         <span>{menu.icon}</span>
//                         <span className="ml-3">{menu.name}</span>
//                       </div>
//                       <span
//                         className={`transform transition-transform ${
//                           open ? "rotate-180" : "rotate-0"
//                         }`}
//                       >
//                         <GrDown className="w-4 h-4" />
//                       </span>
//                     </Disclosure.Button>

//                     <Disclosure.Panel className="overflow-y-auto pl-6 mt-1 max-h-60">
//                       {menu.submenu.map((sub, i) => (
//                         <Link
//                           key={i}
//                           to={sub.to}
//                           className="flex items-center p-2 rounded hover:bg-[#e1eaff] transition"
//                           onClick={() => setSidebarOpen(false)}
//                         >
//                           {sub.icon}
//                           <span className="ml-3">{sub.name}</span>
//                         </Link>
//                       ))}
//                     </Disclosure.Panel>
//                   </>
//                 )}
//               </Disclosure>
//             ) : (
//               <Link
//                 key={index}
//                 to={menu.to}
//                 className="flex items-center p-3 rounded hover:bg-[#e1eaff] transition"
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 {menu.icon}
//                 <span className="ml-3">{menu.name}</span>
//               </Link>
//             );
//           })}

//           {/* Profile Link */}
//           <Link
//            to={`/admin/check/profile/${admin?.id}`}
//             className={`flex items-center justify-start p-3 ${
//               location.pathname === "/admin/profile"
//                 ? "text-[#0089bd]"
//                 : "text-gray-800"
//             }`}
//           >
//             <FaRegUser className="w-5 h-5" />
//             <span className="ml-3">Profile</span>
//           </Link>
//         </nav>
//       </aside>

//       <div className="w-full   text-gray-800 mt-[78px]">
//         {Children}
//       </div>
//       <div className="h-[50px]"></div>
//       <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#fafafa] shadow-lg text-gray-900 border-t border-black/20">
//         <div className="flex justify-between px-4 py-3 mx-auto max-w-5xl">
//           {MainMenu.slice(0, 4).map((menu, index) => (
//             <Link
//               key={index}
//               to={menu.to}
//               className={`flex flex-col items-center text-sm ${
//                 location.pathname === menu.to
//                   ? "text-[#0089bd]"
//                   : "text-gray-800"
//               }`}
//             >
//               {menu.icon}
//               <span className="text-xs font-semibold">{menu.name}</span>
//             </Link>
//           ))}
//           <Link
//             to={`/admin/check/profile/${admin?.id}`}
//             className={`flex flex-col items-center text-sm ${
//               location.pathname === "/admin/profile"
//                 ? "text-[#0089bd]"
//                 : "text-gray-800"
//             }`}
//           >
//             <FaRegUser className="w-5 h-5" />
//             <span className="mt-1 text-xs font-semibold">Profile</span>
//           </Link>
//           <button
//             onClick={handlesignout}
//             className="flex flex-col items-center text-sm text-red-400"
//           >
//             <IoMdLogOut className="w-5 h-5 text-red-400" />
//             <span className="mt-1 text-xs font-semibold">Logout</span>
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutadmin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { defaulterNotification } from "../../redux/userSlice";

// Lucide Icons - more modern alternative
import { 
  Menu, X, Home, BarChart2, Users, LogOut, ChevronDown,
  Settings, User, Shield, FileText, Award, Bell,
  Layers, UserCheck, UserX, LayoutDashboard, PieChart,
  CreditCard, UserCog, BadgeAlert, Wallet, PlusCircle,
  Milestone, DollarSign, BellRing, GanttChart, Trophy,
  CircleUser, Database, BookOpen, FileBarChart2, PlusSquare
} from "lucide-react";


// Management submenu
const Management = [
  {
    name: "Unblocked Users",
    to: "/admin/user/unblock",
    icon: <Shield size={18} />,
    current: true,
  },
  {
    name: "Blocked User",
    to: "/admin/user/block",
    icon: <UserX size={18} />,
    current: false,
  },
  {
    name: "Active Member",
    to: "/admin/user/active",
    icon: <UserCheck size={18} />,
    current: false,
  },
  {
    name: "Inactive Member",
    to: "/admin/user/inactive",
    icon: <UserX size={18} />,
    current: false,
  },
  { 
    name: "All User", 
    to: "/admin/user/all", 
    icon: <Users size={18} />, 
    current: false 
  },
];

// Requests submenu
const Requests = [
  {
    name: "Income",
    to: "/admin/income",
    icon: <PieChart size={18} />,
    current: false,
    submenu: [],
  },
  {
    id: 2,
    name: "CTO",
    to: "/admin/cto",
    icon: <Database size={18} />,
    current: false,
    submenu: [],
  },
  {
    name: "ROI Withdrawal",
    to: "/admin/roipendingwithdrawalrequest",
    current: false,
    icon: <Wallet size={18} />,
  },
  {
    name: "Deposite",
    to: "/admin/deposite",
    icon: <PlusCircle size={18} />,
    current: false,
  },
  { 
    name: "TopUp", 
    to: "/admin/topup", 
    icon: <DollarSign size={18} />, 
    current: false 
  },
];

// Achievers submenu
const Achivers = [
  {
    name: "Rewards",
    to: "/admin/rewards",
    icon: <Trophy size={18} />,
    current: false,
    submenu: [],
  },
];

// Main menu items
const MainMenu = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
    current: true,
    submenu: [],
  },
  {
    name: "Bonus Manager",
    to: "/admin/bonus-manager",
    icon: <GanttChart size={18} />,
    current: false,
    submenu: [],
  },
  {
    name: "Membership Plans",
    to: "/admin/membership/plan",
    icon: <BookOpen size={18} />,
    current: false,
    submenu: [],
  },
  {
    name: "Management",
    to: "/admin/user/all",
    icon: <Users size={18} />,
    current: false,
    submenu: Management,
  },
  {
    name: "Achivers",
    to: "/admin/achivers",
    icon: <Award size={18} />,
    current: false,
    submenu: Achivers,
  },
  {
    name: "Withdrawal",
    to: "/admin/pendingwithdrawalrequest",
    icon: <Wallet size={18} />,
    current: false,
    submenu: Requests,
  },
  {
    name: "QR Setting",
    to: "/admin/qr/Link",
    icon: <PlusSquare size={18} />,
    current: false,
    submenu: [],
  },
  {
    name: "Settings",
    to: "/admin/settings",
    icon: <Settings size={18} />,
    current: false,
    submenu: Settings,
  },
];

export default function AdminMenu({ Children, PageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [defaulternotification, setDefaulterNotification] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useSelector((state) => state.auth);

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-adjust sidebar based on screen size
      if (width >= 1280) {
        setSidebarOpen(true);
      } else if (width < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  function handlesignout() {
    dispatch(signoutadmin());
    navigate("/admin/login");
  }

  // Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    if (isMobile || isTablet) {
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
        className={`fixed h-full bg-gradient-to-b from-blue-900 to-purple-900 text-white z-40 transition-all duration-300 ease-in-out flex flex-col 
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
        <div className="flex items-center justify-between px-4 py-6 border-b border-blue-800/50 flex-shrink-0">
          <div className="flex items-center">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full  shadow-lg">
              <img src="/adtofuture.png" className="w-10 h-10" alt="Logo" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg ml-3 text-white">Adtofuture</span>
            )}
          </div>
          {(isMobile || isTablet) && sidebarOpen && (
            <button 
              onClick={closeSidebar}
              className="text-blue-200 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-800/50"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Admin info */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-blue-800/50 bg-blue-800/20 flex-shrink-0">
            <div className="flex items-center mb-2">
              <User size={18} className="text-blue-200" />
              <span className="ml-2 text-sm font-medium text-blue-100 truncate">
                {admin?.fullname || "Admin"}
              </span>
            </div>
          </div>
        )}

        {/* Navigation - Improved scrollbar */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {MainMenu.map((menu, index) => (
                menu.submenu && menu.submenu.length > 0 ? (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 my-1 text-left transition-all ${
                            location.pathname.includes(menu.to.split('/').slice(0, 3).join('/'))
                            ? "bg-white/20 text-white shadow-md"
                            : "text-blue-100 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded ${location.pathname.includes(menu.to.split('/').slice(0, 3).join('/')) ? "bg-blue-500" : "bg-blue-800/50"}`}>
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
                            {menu.submenu.map((sub, subIndex) => (
                              <Link
                                key={subIndex}
                                to={sub.to}
                                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                                  location.pathname === sub.to
                                  ? "bg-blue-600/40 text-white"
                                  : "text-blue-200 hover:bg-blue-700/30 hover:text-white"
                                }`}
                                onClick={closeSidebar}
                              >
                                {sub.icon}
                                <span className="ml-2 text-sm">{sub.name}</span>
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
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={closeSidebar}
                  >
                    <div className={`p-1.5 rounded ${location.pathname === menu.to ? "bg-blue-500" : "bg-blue-800/50"}`}>
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
        <div className="border-t border-blue-800/50 px-3 py-3 bg-blue-900/50 flex-shrink-0">
          <Link
            to={`/admin/check/profile/${admin?.id}`}
            className={`flex items-center rounded-lg px-3 py-2.5 my-1 transition-all ${
              location.pathname === `/admin/check/profile/${admin?.id}`
              ? "bg-white/20 text-white"
              : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
            onClick={closeSidebar}
          >
            <div className={`p-1.5 rounded ${location.pathname === `/admin/check/profile/${admin?.id}` ? "bg-blue-500" : "bg-blue-800/50"}`}>
              <CircleUser size={20} />
            </div>
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Profile</span>}
          </Link>
          
          <button
            onClick={handlesignout}
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
        {/* Enhanced Header with page name */}
        <header className="bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-lg sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
            {/* Left side - Hamburger and brand */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-800/20 focus:outline-none transition-colors"
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
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-white drop-shadow-md transition-all duration-500 hover:scale-105">
                    {PageName}
                  </h2>
                  <div className="mx-auto mt-1 w-10 h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full transition-all duration-500 hover:w-20"></div>
                </div>
              </div>
            </div>

            {/* Notification bell */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-white hover:text-blue-200 transition-colors">
                <Bell size={22} />
                {defaulternotification && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              
              {/* Admin profile */}
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                  <CircleUser size={24} className="text-white" />
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className="text-sm font-medium text-white">
                    {admin?.fullname || "Admin"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
          {Children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg z-30 flex items-center justify-around py-1">
          {MainMenu.slice(0, 4).map((menu, index) => {
            // Use first submenu item's path for menus with submenus
            const menuPath = menu.submenu && menu.submenu.length > 0 
              ? menu.submenu[0].to 
              : menu.to;
            
            const isActive = location.pathname === menuPath ||
              (menu.submenu && menu.submenu.some(sub => location.pathname === sub.to));
            
            return (
              <Link 
                key={index}
                to={menuPath} 
                className={`flex flex-col items-center py-2 px-3 relative ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {menu.icon}
                <span className="text-xs mt-1">{menu.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-blue-600 rounded-t-full"></span>
                )}
              </Link>
            );
          })}
          
          <Link 
            to={`/admin/check/profile/${admin?.id}`}
            className={`flex flex-col items-center py-2 px-3 relative ${
              location.pathname === `/admin/check/profile/${admin?.id}` ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <CircleUser size={20} />
            <span className="text-xs mt-1">Profile</span>
            {location.pathname === `/admin/check/profile/${admin?.id}` && (
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-blue-600 rounded-t-full"></span>
            )}
          </Link>
          
          <button
            onClick={handlesignout}
            className="flex flex-col items-center py-2 px-3 text-red-500"
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </nav>
      )}
    </div>
  );
}