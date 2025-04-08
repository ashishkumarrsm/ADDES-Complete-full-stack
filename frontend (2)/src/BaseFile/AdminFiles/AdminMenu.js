// import { Disclosure, Menu, MenuButton, MenuItems } from "@headlessui/react";
// import { FaUserAlt } from "react-icons/fa";
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
// import { TbReportSearch } from "react-icons/tb";
// import { MdNotificationAdd } from "react-icons/md";
// import { FaNotdef } from "react-icons/fa6";
// import { MdManageAccounts } from "react-icons/md";
// import { MdNotificationsPaused } from "react-icons/md";
// import { MdOutlineSupportAgent } from "react-icons/md";
// import { FaDirections } from "react-icons/fa";
// import { FaSquareWebAwesome } from "react-icons/fa6";
// import { GrAchievement } from "react-icons/gr";
// import { SiNginxproxymanager } from "react-icons/si";
// import { TbListDetails } from "react-icons/tb";
// import { GiLevelEndFlag } from "react-icons/gi";
// import { FaUserCheck } from "react-icons/fa";
// import { FaUserTimes } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
// import { FcSupport } from "react-icons/fc";
// import { RiPolaroid2Line } from "react-icons/ri";
// import { SiFirewalla } from "react-icons/si";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import { IoMdNotifications } from "react-icons/io";
// import { FaHandHoldingDollar } from "react-icons/fa6";
// import { MdAccountTree } from "react-icons/md";
// import { PiHandDepositFill } from "react-icons/pi";
// import { RiPolaroid2Fill } from "react-icons/ri";
// import { AiOutlineDashboard } from "react-icons/ai";
// import { IoMdLogOut } from "react-icons/io";
// import { FaUserShield } from "react-icons/fa";
// import { RiUserForbidFill } from "react-icons/ri";
// import { MdRecentActors } from "react-icons/md";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signoutadmin } from "../../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { defaulterNotification, getUser } from "../../redux/userSlice";
// import NotificationPopup from "../../User/NotificationPopup";
// import RewardNotification from "../../User/RewardNotification";
// import { FaRegUser } from "react-icons/fa";
// export default function UserMenu({ Children, PageName }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
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

//  const Settings = [
//   {
//     name: "Create notification",
//     to: "/admin/notification",
//     icon: MdNotificationAdd ,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "Notification list",
//     to: "/admin/notification/list",
//     icon: MdNotificationsPaused ,
//     current: false,
//     submenu: [] ,
//   },
//   {
//     name: "Support",
//     to: "/admin/support",
//     icon: MdOutlineSupportAgent ,
//     current: false,
//     submenu: [],
//   },

//   {
//     name: "Defaulter",
//     to: "/admin/defaulter",
//    icon: FaNotdef,
//     current: false,
//     submenu: [],
//   },
//   {
//     name: "Reports",
//     to: "/admin/reports",
//     icon: TbReportSearch,
//     current: false,
//     submenu: [],
//   },
//  ]

//   const Management = [
//     { name: "Unblocked Users", to: "/admin/user/unblock", icon: FaUserShield, current: true },
//     { name: "Blocked User", to: "/admin/user/block", icon: RiUserForbidFill, current: false },
//     { name: "Active Member", to: "/admin/user/active", icon: FaUserCheck, current: false },
//     { name: "Inactive Member", to: "/admin/user/inactive", icon: FaUserTimes, current: false },
//     { name: "All User", to: "/admin/user/all", icon: FaUsers, current: false },
//   ];

//   const Requests = [
//     // {
//     //   name: "Withdrawal",
//     //   to: "/admin/pendingwithdrawalrequest",
//     //   current: true,
//     // },
//     {
//       name: "Income",
//       to: "/admin/income",
//       icon: FaHandHoldingDollar,
//       current: false,
//       submenu: [],
//     },
//     {
//       id: 2,
//       name: "CTO",
//       to: "/admin/cto",
//       icon: MdRecentActors,
//       current: false,
//       submenu: [],
//     },
//     {
//       name: "ROI Withdrawal",
//       to: "/admin/roipendingwithdrawalrequest",
//       current: false,
//       icon: RiPolaroid2Fill,
//     },
//     { name: "Deposite", to: "/admin/deposite",  icon: PiHandDepositFill, current: false },
//     { name: "TopUp", to: "/admin/topup",  icon: RiPolaroid2Line, current: false },
//   ];
//   const Achivers =[
//     {
//       name: "Rewards",
//       to: "/admin/rewards",
//       icon: FaSquareWebAwesome,
//       current: false,
//       submenu: [],
//     },
//   ]

//   const MainMenu = [
//     {
//       name: "Dashboard",
//       to: "/admin/dashboard",
//       icon: AiOutlineDashboard,
//       current: true,
//       submenu: [],
//     },
//     {
//       name: "Membership Plans",
//       to: "/admin/membership/plan",
//       icon: MdAccountTree,
//       current: false,
//       submenu: [],
//     },

//     {
//       name: "Management",
//       to: "/admin/user/all",
//       icon: SiNginxproxymanager,
//       current: false,
//       submenu: Management,
//     },

//     {
//       name: "Achivers",
//       to: "/admin/achivers",
//       icon: GrAchievement,
//       current: false,
//       submenu: Achivers,
//     },
//     {
//       name: "Withdrawal",
//       to: "/admin/pendingwithdrawalrequest",
//       icon: PiHandWithdrawFill ,
//       current: false,
//       submenu: Requests,
//     },
//     {
//       name: "QR Setting",
//       to: "/admin/qr/Link",
//       icon: MdManageAccounts,
//       current: false,
//       submenu: [],
//     },

//     {
//       name: "Settings",
//       to: "/admin/settings",
//       icon: MdManageAccounts,
//       current: false,
//       submenu: Settings,
//     },
//   ];

//   const menus = MainMenu;

//   return (
//     <div className="flex h-screen bg-[#0089BD]">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-gray-900/50 border-r border-white/50 text-white transition-all duration-300 z-50
//           ${
//             isMobileMenuOpen
//               ? "w-64 translate-x-0"
//               : isSidebarOpen
//               ? "w-64"
//               : "md:w-16"
//           }
//           ${
//             isMobileMenuOpen
//               ? "translate-x-0"
//               : "-translate-x-full md:translate-x-0"
//           }`}
//       >
//         <div className="flex justify-between items-center px-4 py-3 border-b border-white/50">
//           <Link to="/">
//             <img src="/teirrax.png" className="w-10" alt="Logo" />
//           </Link>
//           <button
//             onClick={toggleMobileMenu}
//             className="p-2 text-white md:hidden"
//           >
//             <XMarkIcon className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Sidebar Toggle Button */}
//         <button
//           onClick={toggleSidebar}
//           className="absolute top-[50px] -right-3.5 p-2 text-white bg-[#006b95] rounded-full transition-all duration-300 hidden md:block"
//         >
//           <ChevronLeftIcon
//             className={`w-4 h-4 transition-transform ${
//               isSidebarOpen ? "rotate-0" : "rotate-180"
//             }`}
//           />
//         </button>

//         {/* Menu Items */}
//         <div className="flex flex-col p-2 h-full">
//           <ul className="flex flex-col space-y-2">
//             {menus?.map((menu, index) => {
//               const isActive = activeTab === menu.name;
//               return (
//                 <Disclosure key={index} as="div" className="">
//                   {({ open }) => (
//                     <>
//                       <Link to={menu.to}>
//                         <Disclosure.Button
//                           className={`flex items-center   w-full text-white transition-all duration-300 rounded ${
//                             isSidebarOpen ? "p-2" : "justify-center p-2"
//                           } ${isActive ? "bg-[#0089bd]" : ""}`}
//                           onClick={() => setActiveTab(menu.name)}
//                         >
//                           {menu?.icon && <menu.icon className="w-6 h-6" />}
//                           {(isSidebarOpen || isMobileMenuOpen) && (
//                             <span className="ml-3">{menu.name}</span>
//                           )}
//                           {(isSidebarOpen || isMobileMenuOpen) &&
//                             menu.submenu.length > 0 && (
//                               <ChevronDownIcon
//                                 className={`w-5 h-5 ml-auto transition-transform ${
//                                   open ? "rotate-180" : "rotate-0"
//                                 }`}
//                               />
//                             )}
//                         </Disclosure.Button>
//                         {open && (isSidebarOpen || isMobileMenuOpen) && (
//                           <Disclosure.Panel className="pl-4">
//                             <ul>
//                               {menu?.submenu.map((submenu, subIndex) => (
//                                 <li
//                                   key={subIndex}
//                                   className={`p-2 rounded cursor-pointer ${
//                                     activeTab === submenu.name
//                                       ? "bg-[#0089bd] text-white"
//                                       : ""
//                                   }`}
//                                   onClick={() => setActiveTab(submenu.name)}
//                                 >
//                                   <Link
//                                     to={submenu.to}
//                                     className="block flex items-center w-full"
//                                   >
//                                     {submenu.icon && (
//                                       <submenu.icon className="inline-block mr-4 w-5 h-5" />
//                                     )}
//                                     {submenu.name}
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </Disclosure.Panel>
//                         )}
//                       </Link>
//                     </>
//                   )}
//                 </Disclosure>
//               );
//             })}
//           </ul>
//         </div>
//       </aside>
//       <div
//         className={`flex flex-col flex-1 transition-all duration-300 overflow-x-hidden ${
//           isSidebarOpen || isMobileMenuOpen ? "md:ml-64" : "md:ml-16"
//         }`}
//       >
//         {/* Header */}
//         <header className=" flex justify-between  items-center w-full bg-[#0089bd] shadow-md dark:bg-gray-900 dark:border-gray-700">
//         <button
//             onClick={toggleMobileMenu}
//             className="p-2 text-gray-100 rounded-md md:hidden dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             <Bars3Icon className="w-6 h-6" />
//           </button>
//           <div className="flex flex-col flex-1 item-center">
//             <nav
//               aria-label="Breadcrumb"
//               className="flex justify-end px-4 py-2 border-b md:justify-between"
//             >
//               <div className="flex gap-2 items-center text-gray-100">

//                     <Link
//                       to="/"
//                       className="text-gray-100 hover:text-gray-200/85"
//                     >
//                       <HomeIcon
//                         aria-hidden="true"
//                         className="flex-shrink-0 w-5 h-5"
//                       />
//                       <span className="sr-only">Home</span>
//                     </Link>

//                  <svg
//                     fill="currentColor"
//                     viewBox="0 0 24 44"
//                     preserveAspectRatio="none"
//                     aria-hidden="true"
//                     className="flex-shrink-0 w-6 h-full text-green-200"
//                   >
//                     <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
//                   </svg>
//                   Admin
//                   <svg
//                     fill="currentColor"
//                     viewBox="0 0 24 44"
//                     preserveAspectRatio="none"
//                     aria-hidden="true"
//                     className="flex-shrink-0 w-6 h-full text-green-200"
//                   >
//                     <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
//                   </svg>
//                    {PageName}
//                 </div>

//               <Menu as="div" className="inline-block relative text-left">
//                 <Menu.Button className="flex items-center p-3 text-sm font-medium rounded-full text-gray-400 bg-[#e0e21e]">
//                   <FaUserAlt
//                     aria-hidden="true"
//                     className="size-4 text-[#0089bd]"
//                   />
//                 </Menu.Button>

//                 <Menu.Items className="absolute right-0 z-50 py-1 mt-2 break-all bg-black rounded-sm ring-1 shadow-lg origin-top-right min-w-48 max-w-96 focus:outline-none">

//                   <div className="px-2 mt-3 space-y-1">
//                     <Link to={`/admin/check/profile/${admin?.id}`}>
//                       <button
//                         className={`group flex w-full text-gray-200 items-center px-4 py-2 text-sm font-medium ${
//                           currentMenu === "Profile"
//                             ? "bg-gray-900 text-gray-900"
//                             : " hover:bg-gray-900 hover:text-gray-100"
//                         }`}
//                       >
//                         <FaRegUser className="mr-2 w-4 h-4" />
//                         Profile
//                       </button>
//                     </Link>
//                     <button
//                       onClick={handlesignout}
//                       className="flex items-center px-4 py-2 w-full text-sm font-medium text-left text-red-400 hover:bg-gray-900"
//                     >
//                       <IoMdLogOut className="mr-2 w-5 h-5 text-red-400" />
//                       Logout
//                     </button>
//                   </div>
//                 </Menu.Items>
//               </Menu>
//             </nav>
//           </div>
//         </header>
//         <main className="flex-1 p-4 text-white bg-black">
//           <div className="mx-auto max-w-7xl">
//             {/* <h1 className="mb-4 text-2xl font-semibold">{PageName}</h1> */}
//             {Children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutuser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserAlt,
  FaUsers,
  FaUserShield,
  FaUserCheck,
  FaUserTimes,
  FaDirections,
  FaHandHoldingDollar,
  FaRegUser,
} from "react-icons/fa";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineDashboard,
} from "react-icons/ai";
import {
  MdNotificationAdd,
  MdManageAccounts,
  MdNotificationsPaused,
  MdOutlineSupportAgent,
  MdRecentActors,
  MdAccountTree,
} from "react-icons/md";
import { IoMdNotifications, IoMdLogOut } from "react-icons/io";
import { TbReportSearch, TbListDetails } from "react-icons/tb";
import { GrAchievement, GrDown } from "react-icons/gr";
import { SiNginxproxymanager, SiFirewalla } from "react-icons/si";
import { GiLevelEndFlag } from "react-icons/gi";
import { PiHandWithdrawFill } from "react-icons/pi";
import {
  RiPolaroid2Line,
  RiPolaroid2Fill,
  RiUserForbidFill,
} from "react-icons/ri";
import { FcSupport } from "react-icons/fc";
import { Disclosure } from "@headlessui/react";
import { defaulterNotification, getUser } from "../../redux/userSlice";
import NotificationPopup from "../../User/NotificationPopup";
import RewardNotification from "../../User/RewardNotification";
import {
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  Bars3CenterLeftIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  ScaleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { PiHandDepositFill } from "react-icons/pi";
import { FaNotdef } from "react-icons/fa6";
import { FaSquareWebAwesome } from "react-icons/fa6";
import { signoutadmin } from "../../redux/authSlice";
// const income = [
//   {
//     name: "ROI",
//     to: "/user/transaction/roi_transaction/Invest",
//     icon: <TbListDetails className="w-6 h-6" />,
//   },
//   {
//     name: "Direct",
//     to: "/user/directmember",
//     icon: <AiOutlineDashboard className="w-6 h-6" />,
//   },
//   {
//     name: "Level",
//     to: "/user/transaction/invest_level_transaction/invest",
//     icon: <GiLevelEndFlag className="w-6 h-6" />,
//   },
//   {
//     name: "Reward",
//     to: "/user/transaction/reward_transaction",
//     icon: <SiFirewalla className="w-6 h-6" />,
//   },
//   {
//     name: "Detail",
//     to: "/user/income",
//     icon: <TbListDetails className="w-6 h-6" />,
//   },
// ];

const Settings = [
  {
    name: "Create notification",
    to: "/admin/notification",
    icon: <MdNotificationAdd className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
  {
    name: "Notification list",
    to: "/admin/notification/list",
    icon: <MdNotificationsPaused className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
  {
    name: "Support",
    to: "/admin/support",
    icon: <MdOutlineSupportAgent className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },

  {
    name: "Defaulter",
    to: "/admin/defaulter",
    icon: <FaNotdef className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
  {
    name: "Reports",
    to: "/admin/reports",
    icon: <TbReportSearch className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
];

const Management = [
  {
    name: "Unblocked Users",
    to: "/admin/user/unblock",
    icon: <FaUserShield className="w-5 h-5"/>,
    current: true,
  },
  {
    name: "Blocked User",
    to: "/admin/user/block",
    icon: <RiUserForbidFill className="w-5 h-5"/>,
    current: false,
  },
  {
    name: "Active Member",
    to: "/admin/user/active",
    icon: <FaUserCheck className="w-5 h-5"/>,
    current: false,
  },
  {
    name: "Inactive Member",
    to: "/admin/user/inactive",
    icon: <FaUserTimes className="w-5 h-5"/>,
    current: false,
  },
  { name: "All User", to: "/admin/user/all", icon: <FaUsers className="w-5 h-5"/>, current: false },
];

const Requests = [
  // {
  //   name: "Withdrawal",
  //   to: "/admin/pendingwithdrawalrequest",
  //   current: true,
  // },
  {
    name: "Income",
    to: "/admin/income",
    icon: <RiPolaroid2Line className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
  {
    id: 2,
    name: "CTO",
    to: "/admin/cto",
    icon: <MdRecentActors className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
  {
    name: "ROI Withdrawal",
    to: "/admin/roipendingwithdrawalrequest",
    current: false,
    icon: <RiPolaroid2Fill className="w-5 h-5"/>,
  },
  {
    name: "Deposite",
    to: "/admin/deposite",
    icon: <PiHandDepositFill className="w-5 h-5"/>,
    current: false,
  },
  { name: "TopUp", to: "/admin/topup", icon: <RiPolaroid2Line className="w-5 h-5"/>, current: false },
];

const Achivers = [
  {
    name: "Rewards",
    to: "/admin/rewards",
    icon: <FaSquareWebAwesome className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
];

const MainMenu = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <AiOutlineDashboard className="w-5 h-5"/>,
    current: true,
    submenu: [],
  },
  {
    name: "Bonus Manager",
    to: "/admin/bonus-manager",
    icon: <MdAccountTree className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },
  {
    name: "Membership Plans",
    to: "/admin/membership/plan",
    icon: <MdAccountTree className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },

  {
    name: "Management",
    to: "/admin/user/all",
    icon: <SiNginxproxymanager className="w-5 h-5"/>,
    current: false,
    submenu: Management,
  },

  {
    name: "Achivers",
    to: "/admin/achivers",
    icon: <GrAchievement className="w-5 h-5"/>,
    current: false,
    submenu: Achivers,
  },
  {
    name: "Withdrawal",
    to: "/admin/pendingwithdrawalrequest",
    icon: <PiHandWithdrawFill className="w-5 h-5"/>,
    current: false,
    submenu: Requests,
  },
  {
    name: "QR Setting",
    to: "/admin/qr/Link",
    icon: <MdManageAccounts className="w-5 h-5"/>,
    current: false,
    submenu: [],
  },

  {
    name: "Settings",
    to: "/admin/settings",
    icon: <MdManageAccounts className="w-5 h-5"/>,
    current: false,
    submenu: Settings,
  },
];

export default function AdminMenu({ Children, PageName }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerMenu, setHeaderMenu] = useState([]);
  const [defaulternotification, setDefaulterNotification] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const [currentTab, setCurrentTab] = useState([]);

  // const [currentSubTab, setCurrentSubTab] = useState("Dashboard");
  const [currentMenu, setCurrentMenu] = useState("Dashboard");
  function handleHeaderMenu(submenu, name) {
    console.log(submenu, name);
    setHeaderMenu(submenu);
    setCurrentTab(name);
  }
  function handlesignout() {
    dispatch(signoutadmin());
    navigate("/admin/login");
  }
  function isClose() {
    setDefaulterNotification(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-[#fafafa] shadow-md  text-gray-900 py-4 px-10 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
        <Link to="/" className="flex items-center">
          <img src="/teirrax.png" className="w-10" alt="Logo" />
        </Link>
        <div className="relative w-full text-center">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg transition-all duration-500 hover:scale-105">
            {PageName}
          </h2>
          <div className="mx-auto mt-1 w-10 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 hover:w-20"></div>
        </div>

        <button
          className="px-3 py-2 text-black bg-blue-200 rounded-sm border border-blue-400 shadow-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <AiOutlineMenu className="w-6 h-6" />
        </button>
      </header>
      <aside
        className={`fixed top-0 left-0 h-screen z-50 w-64 bg-white text-gray-900 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300`}
      >
        <button
          className="absolute top-4 right-4 text-gray-900"
          onClick={() => setSidebarOpen(false)}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center px-6 py-3 bg-blue-50">
          <div className="flex justify-center items-center w-16 h-16">
            <img src="/teirrax.png" className="w-10" alt="Logo" />
          </div>
          <p className="mt-2 text-lg font-bold"> 
            {/* {admin?.fullname} */}
            Admin
            </p>
          <p className="text-sm text-gray-800"></p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 mb-10 no-scrollbar max-h-[calc(100vh-13rem)]">
          {MainMenu.map((menu, index) => {
            return menu.submenu.length > 0 ? (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full p-3 rounded hover:bg-[#e1eaff] transition">
                      <div className="flex items-center">
                        <span>{menu.icon}</span>
                        <span className="ml-3">{menu.name}</span>
                      </div>
                      <span
                        className={`transform transition-transform ${
                          open ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <GrDown className="w-4 h-4" />
                      </span>
                    </Disclosure.Button>

                    <Disclosure.Panel className="overflow-y-auto pl-6 mt-1 max-h-60">
                      {menu.submenu.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.to}
                          className="flex items-center p-2 rounded hover:bg-[#e1eaff] transition"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {sub.icon}
                          <span className="ml-3">{sub.name}</span>
                        </Link>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              <Link
                key={index}
                to={menu.to}
                className="flex items-center p-3 rounded hover:bg-[#e1eaff] transition"
                onClick={() => setSidebarOpen(false)}
              >
                {menu.icon}
                <span className="ml-3">{menu.name}</span>
              </Link>
            );
          })}

          {/* Profile Link */}
          <Link
           to={`/admin/check/profile/${admin?.id}`}
            className={`flex items-center justify-start p-3 ${
              location.pathname === "/admin/profile"
                ? "text-[#0089bd]"
                : "text-gray-800"
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <span className="ml-3">Profile</span>
          </Link>
        </nav>
      </aside>

      <div className="w-full   text-gray-800 mt-[78px]">
        {Children}
      </div>
      <div className="h-[50px]"></div>
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#fafafa] shadow-lg text-gray-900 border-t border-black/20">
        <div className="flex justify-between px-4 py-3 mx-auto max-w-5xl">
          {MainMenu.slice(0, 4).map((menu, index) => (
            <Link
              key={index}
              to={menu.to}
              className={`flex flex-col items-center text-sm ${
                location.pathname === menu.to
                  ? "text-[#0089bd]"
                  : "text-gray-800"
              }`}
            >
              {menu.icon}
              <span className="text-xs font-semibold">{menu.name}</span>
            </Link>
          ))}
          <Link
            to={`/admin/check/profile/${admin?.id}`}
            className={`flex flex-col items-center text-sm ${
              location.pathname === "/admin/profile"
                ? "text-[#0089bd]"
                : "text-gray-800"
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <span className="mt-1 text-xs font-semibold">Profile</span>
          </Link>
          <button
            onClick={handlesignout}
            className="flex flex-col items-center text-sm text-red-400"
          >
            <IoMdLogOut className="w-5 h-5 text-red-400" />
            <span className="mt-1 text-xs font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
