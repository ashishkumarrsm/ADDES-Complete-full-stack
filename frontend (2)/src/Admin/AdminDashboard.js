// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";



// import { getAllUsers, getUser } from "../redux/userSlice";
// import { getAllDeposite } from "../redux/depositeSlice";
// import { ScaleIcon } from "@heroicons/react/24/outline";
// import { FaUsers } from "react-icons/fa";
// import { FaUserCheck } from "react-icons/fa";
// import { FaUserTimes } from "react-icons/fa";
// import { RiUserForbidFill } from "react-icons/ri";
// import { FaUserShield } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import AdminSetting from "./AdminSetting";
// import { getAllWithdrawal } from "../redux/withdrawalSlice";
// import Connect from "../metamask/Connect";
// import Loader from "../BaseFile/comman/Loader";
// export default function AdminDashboard() {
//   const { admin } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { allusers, loading, error, message } = useSelector(
//     (state) => state.allusers
//   );
//   const { alldeposite } = useSelector((state) => state.alldeposite);
//   const { allwithdrawal } = useSelector((state) => state.allwithdrawal);
//   useEffect(() => {
//     dispatch(getAllUsers());
//     dispatch(getAllDeposite());
//     dispatch(getAllWithdrawal());
//   }, [admin?.id]);
//   let totalCount = allusers?.length;
//   let activeCount = allusers?.filter(
//     (user) => user?.is_active == "active"
//   ).length;
//   let blockCount = allusers?.filter((user) => user?.status == "block").length;
//   let activePlanSum = allusers
//     ?.filter((user) => user.is_active)
//     .reduce((sum, user) => sum + user.active_plan, 0);
//   let totalbusiness = allusers?.reduce(
//     (sum, user) => sum + user.active_plan,
//     0
//   );
//   let inactiveCount = totalCount - activeCount;
//   let unblockCount = totalCount - blockCount;

//   const today = new Date().toISOString().slice(0, 10);

//   // Filter users who joined today
//   let joinedTodayCount = allusers?.filter((user) => {
//     const createdAtDate = user?.created_at?.slice(0, 10); // Extract YYYY-MM-DD from created_at
//     return createdAtDate === today;
//   }).length;

//   let pendingDepositsCount = alldeposite?.filter(
//     (deposit) => deposit.status === "pending"
//   ).length;
//   let pendingaWithdrawalCount = allwithdrawal?.filter(
//     (wd) => wd.status === "pending"
//   ).length;

//   let TotalDepositsAmount = alldeposite
//     ?.filter(
//       (deposit) =>
//         deposit.status === "complete" || deposit.status === "TRN-ADM002"
//     )
//     .reduce((sum, deposit) => sum + (deposit.amount || 0), 0);

//   let TotalWithdrawalAmount = allwithdrawal
//     ?.filter((wd) => wd.status === "complete" || wd.status === "TRN-ADM002")
//     .reduce((sum, wd) => sum + (wd.amount || 0) + (wd.deduction || 0), 0);

//   let TotalPendingDepositsAmount = alldeposite
//     ?.filter((deposit) => deposit.status === "pending")
//     .reduce((sum, deposit) => sum + (deposit.amount || 0), 0);

//   let TotalPendingWithdrawalAmount = allwithdrawal
//     ?.filter((wd) => wd.status === "pending")
//     .reduce((sum, wd) => sum + (wd.amount || 0) + (wd.deduction || 0), 0);

//   const cards = [
//     {
//       name: "Total User",
//       to: "/admin/user/all",
//       icon: FaUsers,
//       amount: totalCount,
//       bgColor: "bg-blue-300",
//       iconBgColor: "text-blue-700",

//       borderColor: "border-[#77cae0]",

//       gredient: " from-[#182a91] to-[#751bc0]  ",
//       percentage: "76",
//     },
//     {
//       name: "Active Member",
//       to: "/admin/user/active",
//       icon: FaUserCheck,
//       amount: activeCount,
//       bgColor: "bg-green-300",
//       iconBgColor: "text-green-700",
//       borderColor: "border-[#5bd9ab]",

//       gredient: "border-gradient-r from-[#182a91] to-blue-700  ",
//       percentage: "36",
//     },
//     {
//       name: "Inactive Member",
//       to: "/admin/user/inactive",
//       icon: FaUserTimes,
//       amount: inactiveCount,
//       bgColor: "bg-red-300",
//       iconBgColor: "text-red-700",
//       gredient: " from-[#182a91] to-red-700  ",

//       borderColor: "border-[#f7aa81]",

//       percentage: "98",
//     },
//     {
//       name: "Plan Amount",
//       to: "/admin/dashboard",
//       icon: ScaleIcon,
//       amount: `$${activePlanSum}`,
//       bgColor: "bg-yellow-300",
//       iconBgColor: "text-yellow-700",
//       borderColor: "border-[#f3f781]",

//       gredient: " from-[#182a91] to-green-700  ",
//       percentage: "76",
//     },
//     {
//       name: "Block Member",
//       to: "/admin/user/block",
//       icon: RiUserForbidFill,
//       amount: blockCount,
//       bgColor: "bg-purple-300",
//       iconBgColor: "text-purple-700",
//       gredient: " from-[#182a91] to-green-700  ",
//       borderColor: "border-[#f4bbfa]",


//       percentage: "69",
//     },
//     {
//       name: "Unblock Member",
//       to: "/admin/user/unblock",
//       icon: FaUserShield,
//       amount: unblockCount,
//       bgColor: "bg-indigo-300",
//       iconBgColor: "text-indigo-700",
//       gredient: " from-[#182a91] to-green-700  ",
//       borderColor: "border-[#b9befa]",

//       percentage: "66",
//     },
//   ];

//   const cards2 = [
//     {
//       name: "Total Business",
//       to: "/admin/income",
//       icon: ScaleIcon,
//       amount: "$" + totalbusiness,
//       bgColor: "before:bg-indigo-200",
//       iconBgColor: "bg-indigo-500",
//       iconColour: 'text-white',
//       gredient: "bg-gradient-to-r from-[#182a91] to-green-700 shadow-lg ",
//     },
//     {
//       name: "Today Join",
//       to: "/admin/user/all",
//       icon: FaUserCheck,
//       amount: joinedTodayCount,
//       bgColor: "before:bg-purple-200",
//       iconBgColor: "bg-purple-500",
//       gredient: "bg-gradient-to-r from-blue-800 to-purple-900 shadow-lg ",
//     },
//     {
//       name: "Pending Deposite",
//       to: "/admin/deposite",
//       icon: FaUserTimes,
//       amount: pendingDepositsCount,
//       bgColor: "before:bg-blue-200",
//       iconBgColor: "bg-blue-500",
//       gredient: "bg-gradient-to-r from-pink-800 to-teal-700 shadow-lg ",
//     },
//     {
//       name: "Pending Withdrawal",
//       to: "/admin/pendingwithdrawalrequest",

//       icon: ScaleIcon,
//       amount: pendingaWithdrawalCount,
//       bgColor: "before:bg-red-200",
//       iconBgColor: "bg-red-500",

//       percentage: "66",
//       gredient: "bg-gradient-to-r from-indigo-900 to-green-700 shadow-lg ",
//     },
//     {
//       name: "Total Deposite",
//       to: "/admin/deposite",
//       icon: RiUserForbidFill,
//       amount: TotalDepositsAmount,
//       bgColor: "before:bg-purple-200",
//       iconBgColor: "bg-purple-500",

//       percentage: "66",
//       gredient: "bg-gradient-to-r from-black to-pink-700 shadow-lg ",
//     },
//     {
//       name: "Total Withdrawal",
//       to: "/admin/pendingwithdrawalrequest",
//       icon: ScaleIcon,
//       amount: TotalWithdrawalAmount?.toFixed(2),
//       bgColor: "before:bg-red-200",
//       iconBgColor: "bg-red-500",

//       percentage: "66",
//       gredient: "bg-gradient-to-r from-amber-700 to-purple-700 shadow-lg ",
//     },
//     {
//       name: "Pending Deposite",
//       to: "/admin/deposite/pending",
//       icon: ScaleIcon,

//       amount: TotalPendingDepositsAmount,
//       bgColor: "before:bg-purple-200",
//       iconBgColor: "bg-purple-500",

//       percentage: "66",
//       gredient: "bg-gradient-to-r from-orange-600 to-purple-700 shadow-lg ",
//     },
//     {
//       name: "Pending Withdrawal",
//       to: "/admin/pendingwithdrawalrequest/pending",
//       icon: FaUserShield,
//       iconColour: 'text-white',
//       amount: TotalPendingWithdrawalAmount?.toFixed(2),
//       bgColor: "before:bg-blue-200",
//       iconBgColor: "bg-blue-500",

//       percentage: "66",
//       gredient: "bg-gradient-to-r from-pink-800 to-red-700 shadow-lg ",
//     },
//   ];
//   const itemVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: { opacity: 1, scale: 1 },
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariant = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   return (
//     <>
//       <div className="flex overflow-hidden relative flex-col min-h-screen text-gray-900">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
//         <Loader isLoading={loading} />
//         <div className="flex relative z-10 flex-col flex-1">
//           <main className="flex-1 pb-8">
//             <Connect />
//             <div className="mt-8">
//               <div className="container mx-auto">
//                 <div className="">
//                   <motion.div
//                     initial="hidden"
//                     animate="visible"
//                     variants={{
//                       visible: {
//                         transition: { staggerChildren: 0.3 },
//                       },
//                     }}
//                     className=""
//                   >


//                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
//                       {cards?.map((item, index) => (
//                         <div
//                           key={index}
//                           className="relative w-full bg-transparent rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
//                         >



//                           {/* Card Content */}
//                           <div className={`flex relative items-center p-4 text-center text-gray-900 bg-white border-b-4  ${item.borderColor} `}>
//                             <div className="flex gap-4 items-center">
//                               {/* Icon Container */}
//                               <div className={`p-4 rounded-md ${item.bgColor}`}>
//                                 <motion.div
//                                   animate={{ y: [0, 0, 0] }}
//                                   transition={{
//                                     duration: 3.5,
//                                     ease: "easeInOut",
//                                     repeat: Infinity,
//                                     repeatType: "loop",
//                                   }}
//                                 >
//                                   <item.icon className={`w-5 h-5 ${item.iconBgColor}`} />
//                                 </motion.div>
//                               </div>

//                               {/* Card Text */}
//                               <div className="text-left">
//                                 <h2 className="mb-1 text-base font-semibold">{item.name}</h2>
//                                 <p className="text-sm opacity-80">{item.amount}</p>
//                               </div>

//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>








//                   </motion.div>
//                 </div>

//                 <section className="mt-4">
//                   <motion.div
//                     className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                   >


//                     {cards2?.map((item) => (
//                       <>




//                         <div className="flex overflow-hidden relative flex-col gap-2 justify-center items-center text-center rounded-2xl group bg-slate-50">
//                           {/* Background and hover effect */}
//                           <div className={`before:absolute before:top-1 before:left-0 before:w-full before:h-24 before:rounded-t-2xl  before:transition-all before:duration-500 group-hover:before:scale-95 group-hover:before:h-[155px] group-hover:before:w-full group-hover:before:rounded-b-2xl ${item.bgColor}`}></div>

//                           {/* Icon with hover effect */}
//                           <div className={`z-10 my-2 w-20 h-20 rounded-full border-4 transition-all duration-500 border-slate-50 group-hover:scale-150 group-hover:-translate-x-36 group-hover:-translate-y-5 ${item.iconBgColor}`}>
//                             <motion.div
//                               className="relative top-5 left-5"
//                               animate={{ y: [0, 0, 0] }}
//                               transition={{
//                                 duration: 3.5,
//                                 ease: "easeInOut",
//                                 repeat: Infinity,
//                                 repeatType: "loop",
//                               }}
//                             >
//                               <item.icon className={`items-center w-8 h-8 text-white hover:top-20`} />
//                             </motion.div>
//                           </div>

//                           {/* Name and amount display */}
//                           <div className="z-10 transition-all duration-500 group-hover:-translate-y-7">
//                             <span className="text-xl font-semibold">{item.name}</span>
//                             <p className="text-gray-800">{item.amount}</p>
//                           </div>

//                         </div>

//                       </>
//                     ))}


















//                   </motion.div>




//                 </section>
//                 <div className="py-4">
//                   <AdminSetting />
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }














import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllUsers } from "../redux/userSlice";
import { getAllDeposite } from "../redux/depositeSlice";
import { getAllWithdrawal } from "../redux/withdrawalSlice";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserShield } from "react-icons/fa";
import { RiUserForbidFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminSetting from "./AdminSetting";
import Connect from "../metamask/Connect";
import Loader from "../BaseFile/comman/Loader";

export default function AdminDashboard() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { allusers, loading } = useSelector((state) => state.allusers);
  const { alldeposite } = useSelector((state) => state.alldeposite);
  const { allwithdrawal } = useSelector((state) => state.allwithdrawal);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDeposite());
    dispatch(getAllWithdrawal());
  }, [admin?.id]);

  // Calculate dashboard statistics
  const totalCount = allusers?.length || 0;
  const activeCount = allusers?.filter(user => user?.is_active === "active").length || 0;
  const blockCount = allusers?.filter(user => user?.status === "block").length || 0;
  const activePlanSum = allusers?.filter(user => user.is_active).reduce((sum, user) => sum + user.active_plan, 0) || 0;
  const totalbusiness = allusers?.reduce((sum, user) => sum + user.active_plan, 0) || 0;
  const inactiveCount = totalCount - activeCount;
  const unblockCount = totalCount - blockCount;

  // Get today's date for filtering
  const today = new Date().toISOString().slice(0, 10);

  // Filter users who joined today
  const joinedTodayCount = allusers?.filter(user => {
    const createdAtDate = user?.created_at?.slice(0, 10);
    return createdAtDate === today;
  }).length || 0;

  // Deposits and withdrawals statistics
  const pendingDepositsCount = alldeposite?.filter(deposit => deposit.status === "pending").length || 0;
  const pendingWithdrawalCount = allwithdrawal?.filter(wd => wd.status === "pending").length || 0;

  const TotalDepositsAmount = alldeposite
    ?.filter(deposit => deposit.status === "complete" || deposit.status === "TRN-ADM002")
    .reduce((sum, deposit) => sum + (deposit.amount || 0), 0) || 0;

  const TotalWithdrawalAmount = allwithdrawal
    ?.filter(wd => wd.status === "complete" || wd.status === "TRN-ADM002")
    .reduce((sum, wd) => sum + (wd.amount || 0) + (wd.deduction || 0), 0) || 0;

  const TotalPendingDepositsAmount = alldeposite
    ?.filter(deposit => deposit.status === "pending")
    .reduce((sum, deposit) => sum + (deposit.amount || 0), 0) || 0;

  const TotalPendingWithdrawalAmount = allwithdrawal
    ?.filter(wd => wd.status === "pending")
    .reduce((sum, wd) => sum + (wd.amount || 0) + (wd.deduction || 0), 0) || 0;

  const summaryCards = [
    {
      name: "Total Users",
      to: "/admin/user/all",
      icon: FaUsers,
      amount: totalCount,
      color: "blue"
    },
    {
      name: "Active Members",
      to: "/admin/user/active",
      icon: FaUserCheck,
      amount: activeCount,
      color: "green"
    },
    {
      name: "Inactive Members",
      to: "/admin/user/inactive",
      icon: FaUserTimes,
      amount: inactiveCount,
      color: "red"
    },
    {
      name: "Plan Amount",
      to: "/admin/dashboard",
      icon: ScaleIcon,
      amount: `$${activePlanSum.toLocaleString()}`,
      color: "amber"
    },
    {
      name: "Blocked Members",
      to: "/admin/user/block",
      icon: RiUserForbidFill,
      amount: blockCount,
      color: "purple"
    },
    {
      name: "Unblocked Members",
      to: "/admin/user/unblock",
      icon: FaUserShield,
      amount: unblockCount,
      color: "indigo"
    },
  ];

  const statCards = [
    {
      name: "Total Business",
      to: "/admin/income",
      icon: ScaleIcon,
      amount: "$" + totalbusiness.toLocaleString(),
      color: "blue"
    },
    {
      name: "Today's Joins",
      to: "/admin/user/all",
      icon: FaUserCheck,
      amount: joinedTodayCount,
      color: "violet"
    },
    {
      name: "Pending Deposits",
      to: "/admin/deposite",
      icon: ScaleIcon,
      amount: pendingDepositsCount,
      color: "teal"
    },
    {
      name: "Pending Withdrawals",
      to: "/admin/pendingwithdrawalrequest",
      icon: ScaleIcon,
      amount: pendingWithdrawalCount,
      color: "rose"
    },
    {
      name: "Total Deposits",
      to: "/admin/deposite",
      icon: ScaleIcon,
      amount: `$${TotalDepositsAmount.toLocaleString()}`,
      color: "emerald"
    },
    {
      name: "Total Withdrawals",
      to: "/admin/pendingwithdrawalrequest",
      icon: ScaleIcon,
      amount: `$${Number(TotalWithdrawalAmount).toLocaleString()}`,
      color: "cyan"
    },
    {
      name: "Pending Deposit Amount",
      to: "/admin/deposite/pending",
      icon: ScaleIcon,
      amount: `$${TotalPendingDepositsAmount.toLocaleString()}`,
      color: "amber"
    },
    {
      name: "Pending Withdrawal Amount",
      to: "/admin/pendingwithdrawalrequest/pending",
      icon: FaUserShield,
      amount: `$${Number(TotalPendingWithdrawalAmount).toLocaleString()}`,
      color: "pink"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Color mapping for cards
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      icon: "bg-blue-500 text-white",
      hover: "hover:bg-blue-100",
      text: "text-blue-900"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-500",
      icon: "bg-green-500 text-white",
      hover: "hover:bg-green-100",
      text: "text-green-900"
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-500",
      icon: "bg-red-500 text-white",
      hover: "hover:bg-red-100",
      text: "text-red-900"
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-500",
      icon: "bg-amber-500 text-white",
      hover: "hover:bg-amber-100",
      text: "text-amber-900"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-500", 
      icon: "bg-purple-500 text-white",
      hover: "hover:bg-purple-100",
      text: "text-purple-900"
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-500",
      icon: "bg-indigo-500 text-white",
      hover: "hover:bg-indigo-100",
      text: "text-indigo-900"
    },
    violet: {
      bg: "bg-violet-50",
      border: "border-violet-500",
      icon: "bg-violet-500 text-white",
      hover: "hover:bg-violet-100",
      text: "text-violet-900"
    },
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-500",
      icon: "bg-teal-500 text-white",
      hover: "hover:bg-teal-100",
      text: "text-teal-900"
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-500",
      icon: "bg-rose-500 text-white",
      hover: "hover:bg-rose-100",
      text: "text-rose-900"
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-500",
      icon: "bg-emerald-500 text-white",
      hover: "hover:bg-emerald-100",
      text: "text-emerald-900"
    },
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-500",
      icon: "bg-cyan-500 text-white",
      hover: "hover:bg-cyan-100",
      text: "text-cyan-900"
    },
    pink: {
      bg: "bg-pink-50",
      border: "border-pink-500",
      icon: "bg-pink-500 text-white",
      hover: "hover:bg-pink-100",
      text: "text-pink-900"
    }
  };

  return (
    <div className=" bg-gray-50">
      <div className="px-4 py-6 mx-auto w-full sm:px-6 lg:px-8">
        {/* Loader component */}
        <Loader isLoading={loading} />
        
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Dashboard overview and statistics</p>
        </div>

        {/* Connect component */}
        <div className="mb-6">
          <Connect />
        </div>

        {/* Summary Cards Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-medium text-gray-700">User Overview</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          >
            {summaryCards.map((card, index) => (
              <Link to={card.to} key={index}>
                <motion.div
                  variants={itemVariants}
                  className={`relative p-5 rounded-lg shadow-sm ${colorMap[card.color].bg} ${colorMap[card.color].hover} border-l-4 border-r-4 border-t border-b ${colorMap[card.color].border} transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${colorMap[card.color].icon}`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">{card.name}</h3>
                      <p className={`mt-1 text-xl font-semibold ${colorMap[card.color].text}`}>{card.amount}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </section>

        {/* Statistics Cards Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-medium text-gray-700">Financial Overview</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statCards.map((card, index) => (
              <Link to={card.to} key={index}>
                <motion.div
                  variants={itemVariants}
                  className={`overflow-hidden relative p-6 rounded-lg shadow-sm ${colorMap[card.color].bg} border-l-4 ${colorMap[card.color].border} transition-all duration-300 hover:shadow-md group`}
                >
                  {/* Card decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-opacity-20 bg-white"></div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{card.name}</h3>
                      <p className={`mt-2 text-2xl font-bold ${colorMap[card.color].text}`}>{card.amount}</p>
                    </div>
                    <div className={`p-3 rounded-full ${colorMap[card.color].icon} transform transition-transform duration-300 group-hover:scale-110`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Progress indicator bar */}
                  <div className="mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${colorMap[card.color].border.replace('border', 'bg')}`} style={{ width: `${Math.random() * 100}%` }}></div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </section>

        {/* Admin Settings Section */}
        <section className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-6 text-lg font-medium text-gray-700">Admin Settings</h2>
          <AdminSetting />
        </section>
      </div>
    </div>
  );
}