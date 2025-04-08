// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signoutuser } from "../../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";
// import {
//   AiOutlineMenu,
//   AiOutlineClose,
//   AiOutlineDashboard,
// } from "react-icons/ai";
// import { MdAccountTree } from "react-icons/md";
// import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
// import {
//   FaHandHoldingDollar,
//   FaDirections,
//   FaRegUser,
//   FaMoneyBillTransfer,
// } from "react-icons/fa6";
// import { IoMdNotifications, IoMdLogOut } from "react-icons/io";
// import { GiLevelEndFlag } from "react-icons/gi";
// import { SiFirewalla } from "react-icons/si";
// import { TbListDetails } from "react-icons/tb";
// import { BiSolidUserPin, BiDetail, BiSolidUserDetail } from "react-icons/bi";
// import { MdKey } from "react-icons/md";
// import { BiTask } from "react-icons/bi";
// import { FaChartBar, FaHistory } from "react-icons/fa";
// import { FaBusinessTime, FaWallet } from "react-icons/fa6";
// import {
//   DocumentChartBarIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/outline";
// import { FcSupport } from "react-icons/fc";
// import { Disclosure } from "@headlessui/react";
// import { defaulterNotification, getUser } from "../../redux/userSlice";
// import NotificationPopup from "../../User/NotificationPopup";
// import RewardNotification from "../../User/RewardNotification";
// import { GrDown } from "react-icons/gr";
// import { Wallet } from "lucide-react";

// const income = [
//   {
//     name: "Adds Income",
//     to: "/transactions/add_income",
//     icon: <TbListDetails className="w-6 h-6" />,
//   },
//   {
//     name: "Telegram",
//     to: "/transactions/telegram_income",
//     icon: <AiOutlineDashboard className="w-6 h-6" />,
//   },
//   {
//     name: "Sponsor",
//     to: "/transactions/sponsor_income",
//     icon: <AiOutlineDashboard className="w-6 h-6" />,
//   },

//   {
//     name: "ROI Income",
//     to: "/transactions/roi_income",
//     icon: <GiLevelEndFlag className="w-6 h-6" />,
//   },
//   {
//     name: "Direct Income",
//     to: "/user/transaction/direct_transaction",
//     icon: <GiLevelEndFlag className="w-6 h-6" />,
//   },
//   {
//     name: "Level",
//     to: "/user/transaction/invest_level_transaction/invest",
//     icon: <GiLevelEndFlag className="w-6 h-6" />,
//   },
//   {
//     name: "Reward",
//     to: "/user/transaction/reward_transaction",
//     icon: <FaHistory className="w-6 h-6" />,
//   },
//   {
//     name: "Detail",
//     to: "/user/income",
//     icon: <TbListDetails className="w-6 h-6" />,
//   },
// ];
// const kyc = [
//   {
//     name: "KYC Charge",
//     to: "/user/UserKycCharge",
//     icon: <FaChartBar className="w-6 h-6" />,
//   },
//   {
//     name: "KYC Details",
//     to: "/user/UserKycDetails",
//     icon: <BiDetail className="w-6 h-6" />,
//   },
//   {
//     name: "KYC Transfer",
//     to: "/user/UserKycTransfer",
//     icon: <FaMoneyBillTransfer className="w-6 h-6" />,
//   },
//   {
//     name: "KYC History",
//     to: "/user/UserKycHistory",
//     icon: <FaHistory className="w-6 h-6" />,
//   },
// ];
// const team = [
//   {
//     name: "Tree View",
//     to: "/user/referraltree",
//   },
//   {
//     name: "Team ",
//     to: "/user/directmember",
//   },
// ];

// const menus = [
//   {
//     name: "Dashboard",
//     to: "/user/dashboard",
//     icon: <AiOutlineDashboard className="w-6 h-6" />,
//   },
//   {
//     name: "View Ad",
//     to: "/watch-adds",
//     icon: <BiTask className="w-6 h-6" />,
//   },
//   {
//     name: "Tree",
//     to: "/user/referraltree",
//     icon: <MdAccountTree className="w-6 h-6" />,
//     submenu: team,
//   },
//   {
//     name: "Deposit",
//     to: "/user/adddeposite",
//     icon: <PiHandDepositFill className="w-6 h-6" />,
//   },
//   {
//     name: "Income",
//     to: "/user/income",
//     icon: <FaHandHoldingDollar className="w-6 h-6" />,
//     submenu: income,
//   },
//   {
//     name: "kyc",
//     to: "/user/income",
//     icon: <MdKey className="w-6 h-6" />,
//     submenu: kyc,
//   },

//   {
//     name: "Withdrawal",
//     to: "/user/addwithdrawal",
//     icon: <PiHandWithdrawFill className="w-6 h-6" />,
//   },
//   {
//     name: "Notification",
//     to: "/user/Notification",
//     icon: <IoMdNotifications className="w-6 h-6" />,
//   },
//   {
//     name: "ReTop-Up",
//     to: "/user/topup",
//     icon: <DocumentChartBarIcon className="w-6 h-6" />,
//   },
//   {
//     name: "Membership Plan",
//     to: "/user/plan",
//     icon: <UserGroupIcon className="w-6 h-6" />,
//   },
//   {
//     name: "Support",
//     to: "/user/sendsupport",
//     icon: <FcSupport className="w-6 h-6" />,
//   },
//   {
//     name: "Kyc",
//     to: "/user/UserKyc",
//     icon: <BiSolidUserPin className="w-6 h-6" />,
//   },

//   {
//     name: " Bank Details",
//     to: "/user/UserBankDetails",
//     icon: <BiSolidUserDetail className="w-6 h-6" />,
//   },
// ];

// export default function UserMenu({ Children }) {
//   const [expanded, setExpanded] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [defaulternotification, setDefaulterNotification] = useState(false);
//   const { auth } = useSelector((state) => state.auth);
//   const { singleuser, userrewardnotification } = useSelector(
//     (state) => state.allusers
//   );

//   const [tabs, setTabs] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentMenu, setCurrentMenu] = useState("Dashboard");
//   const [currentTabs, setCurrentTabs] = useState(tabs?.[0]);
//   const [timeRemaining, setTimeRemaining] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [timeRemaining2, setTimeRemaining2] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   // Check if screen is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setExpanded(false);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     dispatch(getUser(auth?.id));
//     dispatch(defaulterNotification(auth?.id));
//   }, [auth?.id]);

//   useEffect(() => {
//     if (userrewardnotification) {
//       setDefaulterNotification(true);
//     }
//   }, [userrewardnotification]);

//   function handleLogout() {
//     dispatch(signoutuser());
//     navigate("/");
//   }

//   function handleMenu(submenu, name) {
//     setTabs(submenu);
//     setCurrentMenu(name);
//   }

//   useEffect(() => {
//     if (!singleuser?.created_at) return;
//     const createdAtDate = new Date(singleuser.created_at);
//     const referenceDate = new Date("2025-02-08T00:00:00Z"); // 7 Feb 2025 (UTC)
//     if (createdAtDate < referenceDate) {
//       setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       return;
//     }

//     const timerDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
//     const endDate = createdAtDate.getTime() + timerDuration;

//     const calculateTimeRemaining = () => {
//       const now = new Date().getTime();
//       const difference = endDate - now;

//       if (difference <= 0) {
//         clearInterval(timerInterval);
//         setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         setTimeRemaining({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor(
//             (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//           ),
//           minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((difference % (1000 * 60)) / 1000),
//         });
//       }
//     };

//     const timerInterval = setInterval(calculateTimeRemaining, 1000);
//     return () => clearInterval(timerInterval);
//   }, [singleuser?.created_at]);

//   useEffect(() => {
//     if (!singleuser?.created_at) return;

//     const createdAtDate = new Date(singleuser.created_at);
//     const referenceDate = new Date("2025-02-08T00:00:00Z"); // 7 Feb 2025 (UTC)

//     // If created_at is before 7th Feb 2025, stop the countdown
//     if (createdAtDate < referenceDate) {
//       setTimeRemaining2({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       return;
//     }

//     const timerDuration2 = 7 * 24 * 60 * 60 * 1000;
//     const endDate2 = createdAtDate.getTime() + timerDuration2;

//     const calculateTimeRemaining2 = () => {
//       const now = new Date().getTime();
//       const difference2 = endDate2 - now;

//       if (difference2 <= 0) {
//         clearInterval(timerInterval2);
//         setTimeRemaining2({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         setTimeRemaining2({
//           days: Math.floor(difference2 / (1000 * 60 * 60 * 24)),
//           hours: Math.floor(
//             (difference2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//           ),
//           minutes: Math.floor((difference2 % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((difference2 % (1000 * 60)) / 1000),
//         });
//       }
//     };

//     const timerInterval2 = setInterval(calculateTimeRemaining2, 1000);
//     return () => clearInterval(timerInterval2);
//   }, [singleuser?.created_at]);

//   function isClose() {
//     setDefaulterNotification(false);
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Sidebar - collapsible */}
//       <aside
//         className={`fixed left-0 top-0 h-screen bg-white text-gray-900 shadow-lg z-40 transition-all duration-300 ${isMobile ? (sidebarOpen ? "w-64" : "w-0") : expanded ? "w-64" : "w-16"
//           } overflow-hidden`}
//         onMouseEnter={() => !isMobile && setExpanded(true)}
//         onMouseLeave={() => !isMobile && setExpanded(false)}
//       >
//         {/* Logo and User Info */}
//         <div
//           className={`flex flex-col items-center p-4 bg-white transition-all duration-300 ${expanded || sidebarOpen ? "justify-start" : "justify-center"
//             }`}
//         >
//           <div className="flex justify-center items-center mb-2 w-10 h-10">
//             <img src="/teirrax.png" className="w-10" alt="Logo" />
//           </div>
//           {/* <div className="text-black">okk</div> */}
//           {(expanded || sidebarOpen) && (
//             <>
//               <p className="mt-2 text-lg font-bold">
//                 {singleuser?.refferal_code}
//               </p>
//               <p className="text-sm text-gray-800">{singleuser?.fullname}</p>
//             </>
//           )}
//         </div>

//         {/* Close button - only on mobile */}
//         {isMobile && sidebarOpen && (
//           <button
//             className="absolute top-4 right-4 text-gray-900"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <AiOutlineClose className="w-6 h-6" />
//           </button>
//         )}

//         {/* Navigation Menu */}
//         <nav className="flex-1 overflow-y-auto p-2 mb-10 no-scrollbar max-h-[calc(100vh-6rem)]">
//           {menus.map((menu, index) =>
//             menu.submenu ? (
//               <Disclosure key={index}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button
//                       className={`flex items-center justify-between w-full p-3 rounded hover:bg-[#e1eaff] transition my-1 ${location.pathname === menu.to ? "bg-[#e1eaff]" : ""
//                         }`}
//                     >
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0">{menu.icon}</div>
//                         {(expanded || sidebarOpen) && (
//                           <span className="ml-3">{menu.name}</span>
//                         )}
//                       </div>
//                       {(expanded || sidebarOpen) && (
//                         <span
//                           className={`transform transition-transform ${open ? "rotate-180" : "rotate-0"
//                             }`}
//                         >
//                           <GrDown className="w-4 h-4" />
//                         </span>
//                       )}
//                     </Disclosure.Button>

//                     {/* Apply scrolling to submenu when it exceeds height */}
//                     <Disclosure.Panel
//                       className={`overflow-y-auto pl-4 mt-1 max-h-60 ${!expanded && !sidebarOpen ? "hidden" : ""
//                         }`}
//                     >
//                       {menu.submenu.map((sub, i) => (
//                         <Link
//                           key={i}
//                           to={sub.to}
//                           className={`flex items-center p-2 rounded hover:bg-[#e1eaff] transition my-1 ${location.pathname === sub.to ? "bg-[#e1eaff]" : ""
//                             }`}
//                           onClick={() => isMobile && setSidebarOpen(false)}
//                         >
//                           <div className="flex-shrink-0">{sub.icon}</div>
//                           {(expanded || sidebarOpen) && (
//                             <span className="ml-3">{sub.name}</span>
//                           )}
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
//                 className={`flex items-center p-3 rounded hover:bg-[#e1eaff] transition my-1 ${location.pathname === menu.to ? "bg-[#e1eaff]" : ""
//                   }`}
//                 onClick={() => isMobile && setSidebarOpen(false)}
//               >
//                 <div className="flex-shrink-0">{menu.icon}</div>
//                 {(expanded || sidebarOpen) && (
//                   <span className="ml-3">{menu.name}</span>
//                 )}
//               </Link>
//             )
//           )}
//           <Link
//             to={`/user/profile/${auth?.id}`}
//             className={`flex items-center p-3 rounded hover:bg-[#e1eaff] transition my-1 ${location.pathname === `/user/profile/${auth?.id}`
//               ? "bg-[#e1eaff]"
//               : ""
//               }`}
//             onClick={() => isMobile && setSidebarOpen(false)}
//           >
//             <FaRegUser className="w-5 h-5" />
//             {(expanded || sidebarOpen) && <span className="ml-3">Profile</span>}
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="flex items-center p-3 my-1 w-full text-red-500 rounded transition hover:bg-red-100"
//           >
//             <IoMdLogOut className="w-5 h-5" />
//             {(expanded || sidebarOpen) && <span className="ml-3">Logout</span>}
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ${isMobile ? "" : expanded ? "ml-64" : "ml-16"
//           }`}
//       >
//         {/* Mobile Header */}
//         <header className="w-full bg-[#fafafa] shadow-md text-gray-900 py-4 px-4 flex justify-between items-center sticky top-0 z-30">
//           <Link to="/" className="flex items-center">
//             <img
//               src="https://img.freepik.com/free-photo/portrait-expressive-young-woman_1258-48167.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid&w=740"
//               className="w-14"
//               alt="Logo"
//             />
//           </Link>
//           <div className="text-black flex gap-4">
//             <div className=" flex items-center space-x-5 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition duration-300 py-2 px-4 cursor-pointer">
//               <FaBusinessTime className="text-2xl text-gray-900 transition hover:text-pink-500" />

//               <button className=" text-white font-semibold  ">
//                 ${singleuser?.business}
//                 <p>Business</p>
//               </button>
//             </div>
//             <div className=" flex items-center space-x-5 bg-slate-600 hover:bg-slate-700 rounded-xl shadow-md transition duration-300 py-2 px-4 cursor-pointer">
//               <FaWallet className="text-2xl text-gray-900 transition hover:text-pink-500" />
//               <button className=" text-white font-semibold ">
//                 ${singleuser?.wallet}

//                 <p>Wallet</p>
//               </button>

//             </div>

//             <div className=" flex items-center space-x-5 bg-green-600 hover:bg-green-700 rounded-xl shadow-md transition duration-300 py-2 px-4 cursor-pointer">
//             <FaWallet className="text-2xl text-gray-900 transition hover:text-pink-500" />
//               <button className= "text-white font-semibold ">
//                 ${singleuser?.wallet}
//                 <p>Wallet</p>
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col justify-center items-center px-5">
//             <p className="mt-2 text-lg font-bold">
//               {singleuser?.refferal_code}
//             </p>
//             <p className="text-sm text-gray-800">{singleuser?.fullname}</p>
//           </div>

//           {isMobile && (
//             <button
//               className="px-3 py-2 text-black bg-blue-200 rounded-sm border border-blue-400 shadow-lg"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <AiOutlineMenu className="w-6 h-6" />
//             </button>
//           )}
//         </header>

//         {/* Main Content Area */}
//         <div className="w-full bg-[#eeeeeefa] text-gray-800 min-h-screen ">
//           <div className="w-full h-full bg-gradient-to-br from-green-100 via-pink-100 to-gray-100">
//             {Children}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       {isMobile && (
//         <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#fafafa] shadow-lg text-gray-900 border-t border-black/20">
//           <div className="flex justify-between px-4 py-3 mx-auto">
//             {menus.slice(0, 4).map((menu, index) => (
//               <Link
//                 key={index}
//                 to={menu.to}
//                 className={`flex flex-col items-center text-sm ${location.pathname === menu.to
//                   ? "text-[#0089bd]"
//                   : "text-gray-800"
//                   }`}
//               >
//                 {menu.icon}
//                 <span className="text-xs font-semibold">{menu.name}</span>
//               </Link>
//             ))}
//             <Link
//               to={`/user/profile/${auth?.id}`}
//               className={`flex flex-col items-center text-sm ${location.pathname === `/user/profile/${auth?.id}`
//                 ? "text-[#0089bd]"
//                 : "text-gray-800"
//                 }`}
//             >
//               <FaRegUser className="w-5 h-5" />
//               <span className="mt-1 text-xs font-semibold">Profile</span>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="flex flex-col items-center text-sm text-red-400"
//             >
//               <IoMdLogOut className="w-5 h-5 text-red-400" />
//               <span className="mt-1 text-xs font-semibold">Logout</span>
//             </button>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// }




















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
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaulternotification, setDefaulterNotification] = useState(false);
  
  const { auth } = useSelector((state) => state.auth);
  const { singleuser, userrewardnotification } = useSelector(
    (state) => state.allusers
  );

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
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

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex bg-gray-100">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed h-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white z-40 transition-all duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "w-64" : isMobile ? "w-0" : "w-20"
        }`}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-indigo-800/50 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0">
              <img src="/teirrax.png" className="w-8 h-8" alt="Logo" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg ml-3 text-white">Teirrax</span>
            )}
          </div>
          {isMobile && sidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="text-indigo-200 hover:text-white transition-colors"
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
              <span className="ml-2 text-sm font-medium text-indigo-100">{singleuser?.fullname || "User"}</span>
            </div>
            <div className="flex items-center">
              <CreditCard size={18} className="text-indigo-200" />
              <span className="ml-2 text-sm font-medium text-indigo-100">{singleuser?.refferal_code || "Code"}</span>
            </div>
          </div>
        )}

        {/* Navigation - Improved scrollbar */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto scrollbar-container py-4 px-3">
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
                                onClick={() => isMobile && setSidebarOpen(false)}
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
                    onClick={() => isMobile && setSidebarOpen(false)}
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
            onClick={() => isMobile && setSidebarOpen(false)}
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

      {/* Main content area */}
      <div className={`flex-1 flex flex-col min-h-screen ${isMobile ? 'pb-16' : ''} ${sidebarOpen ? (isMobile ? 'ml-0' : 'ml-64') : (isMobile ? 'ml-0' : 'ml-20')}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
            {/* Left side - Hamburger and brand */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen && !isMobile ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="ml-4 flex items-center">
                <img 
                  src="/teirrax.png" 
                  alt="Logo" 
                  className="h-8 w-auto"
                />
                <span className="ml-2 font-semibold text-gray-800 hidden sm:block">Teirrax Dashboard</span>
              </div>
            </div>

            {/* Right side - User info and balances */}
            <div className="flex items-center space-x-4">
              {/* Account balance cards - hide on smaller screens */}
              <div className="hidden md:flex space-x-3">
                <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2 shadow-sm border border-blue-100">
                  <Briefcase size={18} className="text-blue-600" />
                  <div className="ml-2">
                    <p className="font-medium text-blue-900">${singleuser?.business || '0.00'}</p>
                    <p className="text-xs text-blue-600">Business</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-emerald-50 rounded-lg px-4 py-2 shadow-sm border border-emerald-100">
                  <Wallet size={18} className="text-emerald-600" />
                  <div className="ml-2">
                    <p className="font-medium text-emerald-900">${singleuser?.wallet || '0.00'}</p>
                    <p className="text-xs text-emerald-600">Wallet</p>
                  </div>
                </div>
              </div>
              
              {/* Notification indicator */}
              <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                <Bell size={22} />
                {defaulternotification && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                  <p className="text-sm font-medium text-gray-800">{singleuser?.fullname || "User"}</p>
                  <p className="text-xs text-gray-500">{singleuser?.refferal_code || "Code"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile balance cards */}
          <div className="md:hidden p-3 flex space-x-3 bg-gray-50 border-t border-gray-200">
            <div className="flex-1 flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-3 py-2 shadow-sm">
              <Briefcase size={16} className="text-blue-100" />
              <div className="ml-2">
                <p className="font-medium">${singleuser?.business || '0.00'}</p>
                <p className="text-xs opacity-80">Business</p>
              </div>
            </div>
            
            <div className="flex-1 flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg px-3 py-2 shadow-sm">
              <Wallet size={16} className="text-emerald-100" />
              <div className="ml-2">
                <p className="font-medium">${singleuser?.wallet || '0.00'}</p>
                <p className="text-xs opacity-80">Wallet</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
          {Children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg z-30 flex items-center justify-around py-2">
          <Link 
            to="/user/dashboard" 
            className={`flex flex-col items-center py-1 px-3 ${
              location.pathname === '/user/dashboard' 
              ? 'text-indigo-600' 
              : 'text-gray-600'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            to="/user/income" 
            className={`flex flex-col items-center py-1 px-3 ${
              location.pathname === '/user/income' 
              ? 'text-indigo-600' 
              : 'text-gray-600'
            }`}
          >
            <DollarSign size={20} />
            <span className="text-xs mt-1">Income</span>
          </Link>
          
          <Link 
            to="/user/adddeposite" 
            className={`flex flex-col items-center py-1 px-3 ${
              location.pathname === '/user/adddeposite' 
              ? 'text-indigo-600' 
              : 'text-gray-600'
            }`}
          >
            <Upload size={20} />
            <span className="text-xs mt-1">Deposit</span>
          </Link>
          
          <Link 
            to="/user/addwithdrawal" 
            className={`flex flex-col items-center py-1 px-3 ${
              location.pathname === '/user/addwithdrawal' 
              ? 'text-indigo-600' 
              : 'text-gray-600'
            }`}
          >
            <Download size={20} />
            <span className="text-xs mt-1">Withdraw</span>
          </Link>
          
          <Link 
            to={`/user/profile/${auth?.id}`}
            className={`flex flex-col items-center py-1 px-3 ${
              location.pathname === `/user/profile/${auth?.id}` 
              ? 'text-indigo-600' 
              : 'text-gray-600'
            }`}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </nav>
      )}
    </div>
  );
}