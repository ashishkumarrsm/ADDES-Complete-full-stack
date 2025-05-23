import React from "react";

import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { Star, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FiLink2 } from "react-icons/fi";
import { FiCheck, FiCopy } from "react-icons/fi";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import UserTransaction from "./UserTransaction";
import { getTreeData } from "../redux/referralSlice";
import { getctoListByid } from "../redux/ctoSlice";
import { getUser } from "../redux/userSlice";
import { getAllDepositeByid } from "../redux/depositeSlice";
import { getAllWithdrawalByid } from "../redux/withdrawalSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserRewardDetail from "./UserRewardDetail";
import Trading from "./Trading";
import NotificationPopup from "./NotificationPopup";
import NotificationList from "./NotificationList";
import { UserAchievement } from "./UserAchivement";
import { Link } from "react-router-dom";
import UserTradingView from "./UserTradingView";
import {
  Handshake,
  Package,
  TrendingUp,
  Info,
  UserCheck,
  Activity,
  Wallet,
} from "lucide-react";
import UserSlider from "./UserSlider";
import UserData from "./UserData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaTelegramPlane, FaRocketchat } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import UserAnimatedClock from "./UserAnimatedClock ";
import UserNotificationPanel from "./UserNotificationPanel";
import { FiGift, FiShield, FiBox, FiSend } from "react-icons/fi";
import UserPlaneCard from "./UserPlaneCard";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { singleuser } = useSelector((state) => state.allusers);
  const { singlecto } = useSelector((state) => state.cto);
  const { singleDeposite } = useSelector((state) => state.alldeposite);
  const { singleWithdrawal } = useSelector((state) => state.allwithdrawal);
  const { treeData } = useSelector((state) => state.referralTree);
  const [topGenerations, setTopGenerations] = useState([]);
  const [totalBusiness, setTotalBusiness] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const thresholds = [2500, 7500, 17500, 37500, 87500, 187500, 387500, 887500];

  useEffect(() => {
    dispatch(getUser(auth?.id));
    dispatch(getAllDepositeByid(auth?.id));
    dispatch(getAllWithdrawalByid(auth?.id));
    dispatch(getTreeData(auth?.refferal_code));
  }, [auth?.id]);
  useEffect(() => {
    if (singleuser?.cto == "true") {
      dispatch(getctoListByid(auth?.id));
    }
  }, [singleuser, auth?.id]);

  const referralCode = singleuser?.refferal_code;
  let registerUrl;
  registerUrl = `https://www.teirrax.com/registration?referral=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(registerUrl)
      .then(() => {
        alert("Referral link copied to clipboard!");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy referral link: ", err);
      });
  };

  let combinedArray = [];
  const depositsWithType =
    singleDeposite?.map((deposit) => ({ ...deposit, type: "deposit" })) || [];
  const withdrawalsWithType =
    singleWithdrawal?.map((withdrawal) => ({
      ...withdrawal,
      type: "withdrawal",
    })) || [];
  if (withdrawalsWithType.length > 0) {
    combinedArray = [...depositsWithType, ...withdrawalsWithType];
    combinedArray.sort((a, b) => new Date(a.createdAT) - new Date(b.createdAT));
  }
  const totalDeposits = depositsWithType?.reduce(
    (total, deposit) => total + (deposit.amount || 0),
    0
  );
  const totalWithdrawals = withdrawalsWithType?.reduce(
    (total, withdrawal) =>
      total + (withdrawal.amount || 0) + (withdrawal.deduction || 0),
    0
  );

  function countTotalTeamWithActiveInactive(user) {
    let totalTeam = 0;
    let activeCount = 0;
    let inactiveCount = 0;
    const stack = [user];

    while (stack.length > 0) {
      const currentUser = stack.pop();
      totalTeam += 1;

      if (currentUser.is_active === "active") {
        activeCount += 1;
      } else if (currentUser.is_active === "inactive") {
        inactiveCount += 1;
      }
      if (currentUser.referrals && currentUser.referrals.length > 0) {
        stack.push(...currentUser.referrals);
      }
    }

    return { totalTeam, activeCount, inactiveCount };
  }

  const totalDirectActiveMembers = treeData?.filter(
    (user) => user.is_active === "active"
  ).length;
  const totalDirectInactiveMembers = treeData?.filter(
    (user) => user.is_active === "inactive"
  ).length;

  let totalTeamCount = 0;
  let totalActiveMembers = 0;
  let totalInactiveMembers = 0;

  treeData?.forEach((user) => {
    const { totalTeam, activeCount, inactiveCount } =
      countTotalTeamWithActiveInactive(user);
    totalTeamCount += totalTeam;
    totalActiveMembers += activeCount;
    totalInactiveMembers += inactiveCount;
  });

  const calculateBusinessForTeam = (user) => {
    let totalBusiness = user.active_plan || 0;

    if (user.referrals && user.referrals.length > 0) {
      user.referrals.forEach((referral) => {
        totalBusiness += calculateBusinessForTeam(referral); // Recursively calculate for all referrals
      });
    }

    return totalBusiness;
  };

  useEffect(() => {
    if (treeData) {
      const businessByLeg = calculateBusinessForLegs(treeData);

      // Extract and sort legs by total business
      const sortedLegs = Object.entries(businessByLeg)
        .map(([legId, totalBusiness]) => ({
          legId: parseInt(legId),
          totalBusiness,
        }))
        .sort((a, b) => b.totalBusiness - a.totalBusiness);

      // Determine the top two legs
      const topTwoLegs = sortedLegs.slice(0, 2);

      // Sum up the total business of all legs
      const totalBusiness = Object.values(businessByLeg).reduce(
        (acc, value) => acc + value,
        0
      );

      // Calculate the third leg as the sum of all other legs
      const thirdLegTotalBusiness = sortedLegs
        .slice(2)
        .reduce((acc, leg) => acc + leg.totalBusiness, 0);

      // Combine top two legs and the third leg
      const topGenerations = [
        ...topTwoLegs,
        { legId: "Other", totalBusiness: thirdLegTotalBusiness },
      ];

      setTopGenerations(topGenerations);
      setTotalBusiness(totalBusiness);
    }
  }, [treeData]);

  const calculateBusinessForLegs = (users) => {
    const result = {};

    users?.forEach((user) => {
      result[user.id] = calculateTeamBusiness(user);
    });

    return result;
  };

  const calculateTeamBusiness = (user) => {
    let totalBusiness = user.active_plan || 0;

    if (user.referrals && user.referrals.length > 0) {
      user.referrals.forEach((referral) => {
        totalBusiness += calculateTeamBusiness(referral);
      });
    }

    return totalBusiness;
  };

  const stat = [
    // {
    //   id: 7,
    //   value: `$ ${totalWithdrawals}`,
    //   description: "Total Withdrawal",
    //   upadtePlan: "Copy Link",
    //   percentage: "20",
    //   borderColor: "border-indigo-500 ",
    //   icon: CursorArrowRaysIcon,
    //   bgColor: "bg-indigo-500",
    //   iconBgColor: "bg-indigo-700",
    //   gredient: "border-t bg-gradient-to-r from-indigo-900 to-gray-900",
    // },
    {
      id: 8,
      value: `$${totalBusiness}`,
      description: "Total Business",
      percentage: "75",
      borderColor: "border-purple-500 ",
      icon: CursorArrowRaysIcon,
      bgColor: "bg-purple-500",
      iconBgColor: "bg-purple-700",
      href: "#",
      gredient: "border-t bg-gradient-to-r from-amber-700 to-amber-800",
    },
    {
      id: 9,
      value: `${topGenerations?.[0]?.totalBusiness
        ? "$" + topGenerations?.[0]?.totalBusiness
        : 0
        }`,
      description: "Team A",
      percentage: "10",
      // upadtePlan: "Copy Link",
      icon: CursorArrowRaysIcon,
      borderColor: "border-orange-500 ",
      bgColor: "bg-orange-500",
      iconBgColor: "bg-orange-700",
      href: "#",
      gredient: "border-t bg-gradient-to-r from-green-700 to-green-800",
    },
    {
      id: "10",
      value: `${topGenerations?.[1]?.totalBusiness
        ? "$" + topGenerations?.[1]?.totalBusiness
        : 0
        }`,
      description: "Team B",
      percentage: "13",
      // upadtePlan: "Copy Link",
      icon: CursorArrowRaysIcon,
      bgColor: "bg-sky-500",
      iconBgColor: "bg-sky-700",
      borderColor: "border-sky-500 ",
      href: "#",
      gredient: "border-t bg-gradient-to-r from-sky-900 to-gray-900",
    },
    {
      id: 11,
      value: `${topGenerations?.[2]?.totalBusiness
        ? "$" + topGenerations?.[2]?.totalBusiness
        : 0
        } Business`,
      description: "Team Others",
      percentage: "48",
      icon: CursorArrowRaysIcon,
      bgColor: "bg-amber-500",
      borderColor: "border-amber-500 ",
      iconColor: "text-amber-500",
      href: "#",
      gredient: "bg-gradient-to-r from-indigo-700 to-indigo-800",
    },
    {
      id: 7,
      value: "Inactive Team",
      description: `${totalInactiveMembers} Member` || "0",
      icon: ClipboardDocumentIcon,
      iconColor: "text-blue-500",
      change: "5.4%",
      changeType: "increase",
      percentage: 51,
      bgColor: "bg-blue-800",
      href: "#",
      gredient:
        "bg-gradient-to-r from-gray-900 to-blue-900 shadow-lg shadow-blue-500/50",
    },
    {
      id: 5,

      description: "Reward Rank",
      value: `${singleuser?.reward_level} Level`,
      upadtePlan: "Add More",
      borderColor: "border-yellow-500 ",
      percentage: "25",
      href: "#",
      icon: CursorArrowRaysIcon,
      bgColor: "bg-yellow-500",
      iconBgColor: "bg-yellow-300",
      gredient: "border-t bg-gradient-to-r from-pink-700 to-pink-700",
    },
    {
      id: 5,

      description: "Total Salary",
      value: `${singleuser?.total_salary}`,
      upadtePlan: "Add More",
      borderColor: "border-amber-500 ",
      href: "/user/salary",
      percentage: "25",
      icon: CursorArrowRaysIcon,
      bgColor: "bg-amber-500",
      iconBgColor: "bg-amber-300",
      gredient: "border-t bg-gradient-to-r from-amber-700 to-amber-700",
    },
    {
      id: 5,

      description: "Total Reward",
      value: `${singleuser?.reward} `,
      upadtePlan: "Add More",
      borderColor: "border-teal-500 ",
      percentage: "25",
      icon: CursorArrowRaysIcon,
      bgColor: "bg-teal-500",
      iconBgColor: "bg-teal-300",
      href: "#",
      gredient: "border-t bg-gradient-to-r from-teal-700 to-teal-700",
    },
    {
      id: 1,
      description: "Total Direct",
      value: `${totalDirectActiveMembers + totalDirectInactiveMembers} Member`,

      borderColor: "border-blue-200 ",
      icon: UserCheck,
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-400",
      gredient: "bg-gradient-to-br from-purple-800 to-indigo-700",
      percentage: "45",
      href: "/user/directmember",
    },
    {
      id: 2,
      description: "Active Sponser",
      value: `${totalDirectActiveMembers} Member`,
      borderColor: "border-green-100 ",
      icon: Activity,
      bgColor: "bg-green-500",
      iconBgColor: "bg-green-400",
      gredient: "bg-gradient-to-br from-blue-700 to-cyan-800",
      percentage: "25",
      href: "/user/directmember",
    },
    {
      id: 3,
      value: `$ ${singleuser?.level_income}` || 0,
      description: "Level Income",

      borderColor: "border-green-100 ",
      icon: TrendingUp,
      bgColor: "bg-green-500",
      iconBgColor: "bg-teal-400",
      gredient: "bg-gradient-to-br from-teal-700 to-teal-900 ",
      percentage: "25",
      href: "/user/transaction/invest_level_transaction/invest",
    },
    {
      id: 4,
      value: `$ ${totalWithdrawals}`,
      description: "Total Withdrawal",
      upadtePlan: "Need Support",
      borderColor: "border-red-800 ",
      icon: Wallet,
      bgColor: "bg-red-500",
      iconBgColor: "bg-red-300",
      gredient: "bg-gradient-to-br from-pink-800 to-rose-900",
      percentage: "55",
      href: "/user/addwithdrawal",
    },
    {
      value: `$ ${singleuser?.active_plan}`,
      description: "Active Package",
      icon: Package,
      btnColor: "bg-purple-700 hover:bg-blue-600 shadow-blue-600",
      bgColor: "bg-purple-600",
      percentage: "+22%",
      iconColor: "text-purple-500",
      href: "/user/plan",
      gredient: "bg-gradient-to-r from-[#182a91] to-[#751bc0] shadow-lg ",
    },

    {
      value: `$ ${singleuser?.direct_income}`,
      description: "Direct",
      bgColor: "bg-blue-600 border border-blue-600",
      iconColor: "text-blue-500",
      btnColor: "bg-blue-700 hover:bg-purple-600 shadow-purple-600",
      percentage: "66",
      icon: Handshake,
      href: "/user/directmember",
      gredient: "bg-gradient-to-r from-[#182a91] to-blue-700 shadow-lg ",
    },
    {
      value: `$ ${singleuser?.roi_income}`,
      description: "ROI",
      initials: "IS",
      icon: TrendingUp,
      bgColor: "bg-red-600",
      iconColor: "text-red-500",
      btnColor: "bg-red-700 hover:bg-green-600 shadow-green-600",
      percentage: "99",
      href: "/user/transaction/roi_transaction/Invest",
      gredient: "bg-gradient-to-r from-[#182a91] to-red-700 shadow-lg ",
    },
    {
      value: "Members Tree",
      description: `${totalDirectInactiveMembers} Member`,
      href: "/user/referraltree",
      icon: Info,
      bgColor: "bg-green-600",
      btnColor: "bg-green-700 hover:bg-red-600 shadow-indigo-600",
      iconColor: "text-green-500",
      percentage: "+3%",
      gredient: "bg-gradient-to-r from-[#182a91] to-green-700 shadow-lg ",
    },
  ];

  const userIncomeData = [
    {
      username: "Telegram",
      income: "$5,200",
      platform: "Coinbase",
      icon: (
        <FaTelegramPlane className="text-5xl text-blue-500 drop-shadow-lg" />
      ),
      image: "/model-removebg-preview.png",
    },
    {
      username: "Chat",
      income: "$7,850",
      platform: "Binance",
      icon: (
        <FaRocketchat className="text-5xl text-purple-500 drop-shadow-lg" />
      ),
      image: "/model-removebg-preview.png",
    },
    {
      username: "Call",
      income: "$6,400",
      platform: "Bybit",
      icon: <IoCall className="text-5xl text-green-500 drop-shadow-lg" />,
      image: "/model-removebg-preview.png",
    },
    {
      username: "Message",
      income: "$9,100",
      platform: "Kraken",
      icon: <MdMessage className="text-5xl text-red-500 drop-shadow-lg" />,
      image: "/model-removebg-preview.png",
    },
  ];
  return (
    <>
      <div className="space-y-5">
        {/* <div className="mb-6">
          <UserSlider />
        </div> */}
        <div className="p-4 w-full  rounded-md bg-slate-300/50 sm:px-6 lg:px-8">
          <UserNotificationPanel />
        </div>
        {/* <div className="p-4 w-full  rounded-md bg-slate-300/50 sm:px-6 lg:px-8">
         <UserAnimatedClock/> 
        </div> */}

        <div className="p-4 w-full  rounded-md bg-slate-300/50 sm:px-6 lg:px-8">
          <UserData />
        </div>

        {/* Invite or reffral section */}
        <div className="p-3 sm:p-4 w-full  rounded-md bg-slate-300/50 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 space-x-4 md:grid-cols-1 space-y-4 grid-cols-1">

            {/* left  */}
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center justify-center col-span-5">
              {/* Invite & Earn Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 sm:p-6 w-full bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg sm:rounded-xl border border-blue-100 shadow-lg text-white"
              >
                <h2 className="flex gap-2 items-center mb-2 sm:mb-3 text-base sm:text-lg font-bold md:text-xl">
                  Invite & Earn <span className="text-lg sm:text-xl">🎉</span>
                </h2>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                  Share your referral code with friends and earn rewards when
                  they sign up!
                </p>
                <div className="flex items-center p-1 sm:p-2 rounded-lg border border-indigo-200 shadow-md bg-white">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="p-1 sm:p-2 w-full text-sm sm:text-base font-medium bg-transparent outline-none text-indigo-900"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex gap-1 sm:gap-2 items-center p-1 sm:p-2 rounded-md shadow-md transition-all duration-300 bg-indigo-500 hover:bg-indigo-600"
                  >
                    {isCopied ? (
                      <FiCheck className="w-3 h-3 sm:w-4 sm:h-5 text-white" />
                    ) : (
                      <FiCopy className="w-3 h-3 sm:w-4 sm:h-5 text-white" />
                    )}
                    <span className="text-xs sm:text-sm text-white">
                      {isCopied ? "Copied" : "Copy"}
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* User Income Slider */}
              <div className="w-full">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{ delay: 5000 }}
                  loop={true}
                  pagination={{ clickable: true }}
                  className="rounded-lg sm:rounded-xl overflow-hidden"
                >
                  {userIncomeData.map((user, index) => (
                    <SwiperSlide key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col items-center p-3 sm:p-6 bg-gradient-to-b from-indigo-900 to-purple-900 text-white rounded-lg sm:rounded-xl border border-purple-100 shadow-lg md:flex-row"
                      >
                        {/* React Icon on Left */}
                        <div className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-indigo-900 to-purple-900 border border-white rounded-full shadow-md md:w-20 md:h-20 text-white">
                          {user.icon}
                        </div>

                        {/* User Income Details */}
                        <div className="mt-2 sm:mt-3 text-center md:mt-0 md:ml-5 md:text-left">
                          <h2 className="text-base sm:text-lg font-bold md:text-2xl">
                            {user.username}
                          </h2>
                          <p className="text-sm sm:text-base font-bold md:text-lg">
                            {user.income}
                          </p>
                          <p className="mt-1 text-xs sm:text-sm opacity-90 md:text-base">
                            Earned on{" "}
                            <span className="font-medium text-blue-500">{user.platform}</span>
                          </p>
                        </div>

                        {/* Animated Image Section */}
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="mt-3 sm:mt-4 md:mt-0 md:ml-auto"
                        >
                          <div className="p-1 sm:p-2 rounded-full bg-white/50 shadow-md">
                            <img
                              src={user.image}
                              alt={user.username}
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>



              <div className="relative group flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg sm:rounded-xl border border-blue-100 shadow-lg col-span-7">
                {/* Main Image */}
                <img
                  src="https://img.freepik.com/premium-photo/uptrend-market-strategies-insights-navigating-maximize-gains-minimize-risks_960330-11481.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid&w=740"
                  alt="Invite Illustration"
                  className="w-full h-auto rounded-lg sm:rounded-xl object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl">
                  <div className="text-center text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Refer and Rise 🚀</h3>
                    <p className="text-sm sm:text-base w-96">Earn exciting rewards by inviting your friends!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo enim at, dolorum, consectetur officiis tempora est a maxime nulla quam, officia odit sit laboriosam numquam ipsa accusamus assumenda atque laborum.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="relative group  space-y-4  sm:p-6 bg-gradient-to-b from-indigo-900 to-purple-900 px-5 rounded-lg sm:rounded-xl border border-purple-100 shadow-lg overflow-hidden col-span-7">
              <UserPlaneCard />


              <div className="items-center flex flex-col justify-center gap-3">
                <p className="text-white font-bold text-center">AdToFuture is a digital platform that lets you earn money just by watching ads. We believe that your time and attention have value, so instead of watching ads for free, we give you the chance to earn from it. With easy-to-choose packages and daily earnings, anyone can start making passive income from the comfort of their home.</p>
                <button className="border  p-2  text-white bg-gradient-to-b to-indigo-900 from-purple-900 rounded-md hover:bg-gradient-to-b hover:from-indigo-900 hover:to-purple-900 ">click me </button>
              </div>
            </div>

          </div>
        </div>

























        {/* carde section */}

        <div className="p-4 w-full  rounded-md bg-slate-300/50 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stat.map((item, i) => (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0, ease: "easeInOut" }}
                className="flex relative flex-col justify-between p-6 bg-gradient-to-b from-indigo-900 to-purple-900 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Neon Border Animation */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-transparent"
                  animate={{
                    borderColor: [
                      "#ff6b6b",
                      "#f7b731",
                      "#20bf6b",
                      "#2bcbba",
                      "#3867d6",
                      "#8854d0",
                      "#ff6b6b",
                      "#f7b731",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Content Section */}
                <div className="relative z-10 text-left">
                  <h3 className="text-3xl font-bold ">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-lg ">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>




    </>
  );
};

export default UserDashboard;

// <div className="relative z-10 w-full  text-gray-900">
//         <div className="absolute inset-0 opacity-30 z-5"></div>
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={{
//             visible: {
//               transition: { staggerChildren: 0.2 },
//             },
//           }}
//           className="overflow-hidden"
//         >
//           <div className="relative z-10 px-4 sm:px-0 lg:max-w-7xl">
//             <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-4 sm:grid-cols-2">
//               {stat.map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial="hidden"
//                   animate="visible"
//                   variants={itemVariants}
//                   className="relative flex flex-col items-center bg-white backdrop-blur-lg shadow-md border-gray-300 border rounded-md overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
//                 >
//                   <div
//                     className={`absolute top-0 right-0 w-12 h-12 ${item.bgColor} rounded-bl-full`}
//                   ></div>
//                   <div
//                     className={`absolute bottom-0 left-0 w-12 h-12 ${item.bgColor} rounded-tr-full`}
//                   ></div>

//                   <div className="flex relative justify-center items-center mt-4 w-16 h-16 bg-white rounded-full border-4 shadow-md">
//                     <div
//                       className={`absolute inset-0 rounded-full ${item.bgColor} group-hover:scale-110 transition-all`}
//                     />
//                     <item.icon className="relative z-10 w-8 h-8 text-white" />
//                   </div>

//                   {/* Content Section */}
//                   <div className="relative px-6 py-4 w-full text-center">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {item.value}
//                     </h3>
//                     <p className="mt-1 text-base text-gray-900">
//                       {item.description}
//                     </p>
//                   </div>

//                   {/* Hover Overlay Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent opacity-0 transition-all duration-300 to-black/30 group-hover:opacity-100"></div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
//                     {stat.map((item, i) => (
//                       <motion.div
//                         key={i}
//                         variants={itemVariants}
//                         transition={{ duration: 0.3 }}
//                         className="flex overflow-hidden relative items-center bg-white rounded-lg shadow-lg"
//                       >
//                         <div className="flex relative z-10 justify-center items-center w-20 h-16 bg-white rounded-full border-4 shadow-md">
//                           <div
//                             className={`absolute inset-0 rounded-full ${item.bgColor}`}
//                           ></div>
//                           <item.icon className="relative z-10 w-8 h-8 text-white" />
//                         </div>
//                         <div className={`${item.bgColor} flex justify-between items-center w-full rounded-md relative px-6 py-4`}>
//                           <div
//                             className={`flex flex-col`}
//                           >
//                             <h3 className="text-base font-semibold text-white">
//                               {item.name}
//                             </h3>
//                             <p className="text-sm text-white">{item.members}</p>
//                             <div
//                               className={`absolute left-0 -bottom-3 w-6 h-6 bg-white rotate-45 ${item.borderColor}`}
//                             ></div>
//                           </div>
//                           <Link to={item.href} className={`${item.btnColor} text-white text-sm rounded-md border border-white/50 px-3 py-2 shadow-lg`}>
//                             {" "}
//                             <div>View →</div>
//                           </Link>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div> */}

//             {/* <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={{
//                 visible: { transition: { staggerChildren: 0.2 } },
//               }}
//               className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-4"
//             >
//               {cardData.map((card) => (
//                 <motion.div
//                   key={card.id}
//                   variants={itemVariants}
//                   transition={{ duration: 0.4 }}
//                   className={`relative rounded-sm shadow-2xl border border-white/10 flex flex-col gap-4 p-5 transform hover:scale-105 transition-all duration-300 ease-in-out ${card.gredient}`}
//                 >
//                   <div className="absolute top-4 right-4 p-3 bg-opacity-90 rounded-xl border shadow-lg border-white/20">
//                     <card.icon className="w-5 h-5 text-white drop-shadow-md" />
//                   </div>

//                   <div className="flex flex-col justify-between text-left">
//                     <p className="text-sm tracking-wide text-gray-300">
//                       {card.description}
//                     </p>
//                     <h2 className="text-lg font-semibold text-white">
//                       {card.value}
//                     </h2>
//                   </div>

//                   <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
//                   <Link to={card.href} className="mt-auto">
//                     <p className="text-sm font-semibold text-indigo-300 transition hover:text-white">
//                       View Details →
//                     </p>
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>

//             <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
//               <div className="grid col-span-full">
//                 <div className="grid grid-cols-1 gap-4 my-6 lg:grid-cols-2">
//                   <ul className="grid grid-cols-1 gap-4 bg-[#320730a3] border border-white/50 p-4 ">
//                     {incomedetail?.map((item) => (
//                       <motion.div
//                         key={item.id}
//                         variants={itemVariants}
//                         transition={{ duration: 0.3 }}
//                         className={`flex items-center justify-between gap-4 border rounded-sm shadow-sm  p-2 ${item.bgColor} overflow-hidden`}
//                       >
//                         <p className="text-base text-gray-300">{item.name}</p>
//                         <p className="text-base font-medium text-gray-300">
//                           {item.stat}
//                         </p>
//                       </motion.div>
//                     ))}
//                   </ul>
//                   <motion.div
//                     className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                     {cardDetails.map((item) => (
//                       <motion.div
//                         key={item.name}
//                         variants={itemVariant}
//                         className="overflow-hidden relative rounded-sm group"
//                       >
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-br ${item.gredient} rounded-xl opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
//                         ></div>
//                         <div className="flex relative flex-col justify-between p-5 h-full rounded-sm border shadow-md backdrop-blur-lg transition-all duration-300 bg-black/30 border-white/20 group-hover:border-white/50">
//                           <div className="flex justify-between items-start mb-3">
//                             <h3 className="text-base text-white">
//                               {item.value}
//                             </h3>
//                             <div className="w-3 h-3 rounded-full bg-white/50 group-hover:bg-white group-hover:animate-pulse"></div>
//                           </div>
//                           <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
//                           <Link to={item.href}>
//                           <p className="text-sm text-gray-300 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
//                             {item.description}
//                           </p>
//                           </Link>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </div>
//               </div>
//             </div> */}

//             <div className="grid grid-cols-2 gap-4">
//               <div className="">
//                 <div className="">
//                   <motion.div
//                     variants={itemVariants}
//                     transition={{ duration: 0.3 }}
//                     className="relative   bg-[#013144c2] backdrop-blur-lg border border-white/20 rounded-sm shadow-xl p-4  overflow-hidden"
//                   >
//                     <h2 className="flex gap-2 items-center mb-2 text-xl font-semibold text-white">
//                       Invite & Earn 🎉
//                     </h2>
//                     <p className="mb-4 text-sm text-gray-300">
//                       Share your referral code with friends and earn rewards
//                       when they sign up!
//                     </p>
//                     <div className="flex items-center p-1 border border-gray-500 bg-[#013144c2] text-white rounded-md overflow-hidden">
//                       <input
//                         type="text"
//                         value={referralCode}
//                         readOnly
//                         className="p-2 w-full text-base font-medium bg-transparent outline-none"
//                       />
//                       <button
//                         onClick={handleCopy}
//                         className="flex items-center gap-2 rounded-md p-2 bg-[#15475ac2] hover:bg-[#193b48c2] transition-all duration-300"
//                       >
//                         {isCopied ? (
//                           <FiCheck className="w-4 h-5 text-green-400" />
//                         ) : (
//                           <FiCopy className="w-4 h-5 text-white" />
//                         )}
//                         <span
//                           className={`text-sm ${
//                             isCopied ? "text-green-300" : "text-white"
//                           }`}
//                         >
//                           {isCopied ? "Copied" : "Copy"}
//                         </span>
//                       </button>
//                     </div>
//                   </motion.div>
//                 </div>
//                 <div className="bg-[#1a2d6d] text-white p-5 rounded-sm shadow-md mt-4">
//                   <h2 className="mb-1 text-xl font-bold">Buy USDT</h2>
//                   <p className="text-sm">
//                     on Coinbase, Binance, Bybit or other exchange.
//                   </p>
//                 </div>
//               </div>

//               {/* RenatusPRO Card */}
//               <div className="p-5 text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm shadow-md">
//                 <h2 className="mb-3 text-xl font-bold">RenatusPRO</h2>
//                 <p className="mb-4">
//                   We urge all members of our community to adhere to good
//                   commenting standards and contribute positively to the
//                   RenatusPRO community. Let us work together to maintain a
//                   respectful and supportive community environment. Furthermore,
//                   every user should only have one RenatusPRO account.
//                   We urge all members of our community to adhere to good
//                   commenting standards.
//                 </p>
//                 <div className="flex items-center">
//                   <button className="px-4 py-1 text-sm font-medium text-black bg-yellow-400 rounded-md transition-colors hover:bg-yellow-500">
//                     Contact Us →
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-4 mt-6">
//               {[
//                 { icon: Star, color: "bg-yellow-500", text: "Best Rated" },
//                 { icon: Award, color: "bg-red-500", text: "Elegant" },
//                 { icon: Sparkles, color: "bg-blue-500", text: "Trendsetter" },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center p-4 bg-white rounded-sm shadow-sm transition-all duration-300"
//                 >
//                   {/* Icon Section with Glassmorphism Effect */}
//                   <div
//                     className={`relative p-3 rounded-full ${item.color} text-white shadow-lg`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                     <div className="absolute inset-0 rounded-full opacity-20 blur-lg bg-white/10"></div>
//                   </div>

//                   {/* Label Text */}
//                   <span className="mt-2 text-sm font-medium text-gray-700 transition-all duration-300">
//                     {item.text}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="">
//               <aside className="overflow-y-auto w-full rounded-md">
//                 <h2 className="relative z-10 text-lg font-semibold text-gray-100">
//                   Transaction History
//                 </h2>
//                 <div className="">
//                   <div className="flow-root mt-1">
//                     <div className="overflow-x-auto">
//                       <div className="inline-block py-2 min-w-full align-middle">
//                         <UserTransaction />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </motion.div>
//       </div>

// <motion.div
//   key={i}
//   initial="hidden"
//   animate="visible"
//   variants={itemVariants}
//   className="flex overflow-hidden relative flex-col justify-between p-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//   style={{
//     background: "linear-gradient(135deg, #f9fafb, #e5e7eb)",
//   }}
// >
//   {/* Icon Section */}
//   <div className="absolute top-4 right-4">
//     <div
//       className={`w-14 h-14 flex items-center justify-center rounded-full ${item.bgColor} shadow-lg`}
//     >
//       <item.icon className="w-7 h-7 text-white" />
//     </div>
//   </div>

//   {/* Content Section */}
//   <div className="text-left">
//     <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>
//     <p className="mt-2 text-lg text-gray-700">{item.description}</p>
//   </div>

//   {/* Hover Overlay */}
//   <div className="absolute inset-0 rounded-xl opacity-0 transition-all duration-300 bg-black/10 hover:opacity-20"></div>
// </motion.div>









// {/* <div className="p-4 w-full  rounded-md bg-slate-300/50 sm:px-6 lg:px-8">
// <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//   {/* RenatusPRO Card */}
//   <motion.div
//     className="p-4 bg-gradient-to-b from-indigo-900 to-purple-900  text-white rounded-xl border border-gray-100 shadow-lg sm:p-6"
//     whileHover={{ y: -5 }}
//     transition={{ duration: 0.2 }}
//   >
//     <div className="flex gap-3 items-center mb-4">
//       <div className="p-2 bg-purple-100 rounded-lg">
//         <FiShield className="w-5 h-5 text-purple-600 sm:w-6 sm:h-6" />
//       </div>
//       <h3 className="text-lg font-bold  sm:text-xl">
//         RenatusPRO
//       </h3>
//     </div>
//     <p className="mb-4 text-sm  sm:text-base sm:mb-5">
//       Maintain a respectful community environment with single account
//       policy.
//     </p>
//     <button className="py-2 w-full text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 sm:text-base">
//       Community Guidelines
//     </button>
//   </motion.div>

//   {/* Ravenu Card */}
//   <motion.div
//     className="p-4 bg-gradient-to-b from-indigo-900 to-purple-900  text-white rounded-xl border border-gray-100 shadow-lg sm:p-6"
//     whileHover={{ y: -5 }}
//     transition={{ duration: 0.2 }}
//   >
//     <div className="flex gap-3 items-center mb-4">
//       <div className="p-2 bg-green-100 rounded-lg">
//         <FiBox className="w-5 h-5 text-green-600 sm:w-6 sm:h-6" />
//       </div>
//       <h3 className="text-lg font-bold  sm:text-xl">
//         Ravenu
//       </h3>
//     </div>
//     <p className="mb-4 text-sm  sm:text-base sm:mb-5">
//       Access advanced trading tools and exclusive market insights.
//     </p>
//     <button className="py-2 w-full text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 sm:text-base">
//       Explore Features
//     </button>
//   </motion.div>

//   {/* Telegram Ravenu Card */}
//   <motion.div
//     className="p-4 bg-gradient-to-b from-indigo-900 to-purple-900  text-white rounded-xl border border-gray-100 shadow-lg sm:p-6"
//     whileHover={{ y: -5 }}
//     transition={{ duration: 0.2 }}
//   >
//     <div className="flex gap-3 items-center mb-4">
//       <div className="p-2 bg-blue-100 rounded-lg">
//         <FiSend className="w-5 h-5 text-blue-600 sm:w-6 sm:h-6" />
//       </div>
//       <h3 className="text-lg font-bold  sm:text-xl">
//         Telegram Ravenu
//       </h3>
//     </div>
//     <p className="mb-4 text-sm  sm:text-base sm:mb-5">
//       Join our Telegram community for real-time updates and support.
//     </p>
//     <button className="py-2 w-full text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 sm:text-base">
//       Join Channel
//     </button>
//   </motion.div>
// </div>
// </div> */}