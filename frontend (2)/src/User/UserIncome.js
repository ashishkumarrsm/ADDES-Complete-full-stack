import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser, clearErrors, clearMessage } from "../redux/userSlice";
import { getTreeData } from "../redux/referralSlice";
import { getctoListByid } from "../redux/ctoSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserIncome() {
  const dispatch = useDispatch();
  const { singleuser, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  const { singlecto } = useSelector((state) => state.cto);

  const { auth } = useSelector((state) => state.auth);
  const { treeData } = useSelector((state) => state.referralTree);

  useEffect(() => {
    if (auth?.id) {
      dispatch(getUser(auth?.id));
      dispatch(getTreeData(auth?.refferal_code));
    }

    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message, clearErrors, clearMessage, auth?.id]);

  useEffect(() => {
    if (singleuser?.cto == "true") {
      dispatch(getctoListByid(auth?.id));
    }
  }, [singleuser, auth?.id]);

  function analyzeTeamData(treeData) {
    let totalMembers = 0;
    let activeMembers = 0;
    let totalActivePlanAmount = 0;
    let totalInvestmentPlanAmount = 0;

    let queue = Array.isArray(treeData) ? [...treeData] : [treeData];

    while (queue.length > 0) {
      let node = queue.shift();
      if (!node) continue;

      totalMembers++;
      if (node.is_active === "active") {
        activeMembers++;
        totalActivePlanAmount += node.active_plan || 0;
        totalInvestmentPlanAmount += node.investment_plan || 0;
      }

      if (node.referrals && node.referrals.length > 0) {
        queue.push(...node.referrals);
      }
    }

    return {
      totalMembers,
      activeMembers,
      totalActivePlanAmount,
      totalInvestmentPlanAmount,
    };
  }
  const {
    totalMembers,
    activeMembers,
    totalActivePlanAmount,
    totalInvestmentPlanAmount,
  } = analyzeTeamData(treeData);
  const projects = [
    {
      name: "Limit",
      initials: "Li",
      href: "/user/dashboard",
      members: (
        singleuser?.active_plan * singleuser?.max -
        (singleuser?.level_income +
          singleuser?.roi_income +
          (singlecto?.amount || 0))
      ).toFixed(2),
      bgColor: "bg-yellow-900",
      iconColor: "bg-yellow-600",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      name: "Direct Income",
      initials: "DI",
      href: "/user/directmember",
      members: singleuser?.direct_income,
      bgColor: "bg-sky-900",
      iconColor: "bg-sky-600",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      name: "Telegram Income",
      initials: "TL",
      href: "/user/directmember",
      members: singleuser?.telegram_income,
      bgColor: "bg-sky-900",
      iconColor: "bg-sky-600",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      name: "sponsor income",
      initials: "TL",
      href: "/user/directmember",
      members: singleuser?.sponsor_income,
      bgColor: "bg-sky-900",
      iconColor: "bg-sky-600",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      name: "Watch Add income",
      initials: "TL",
      href: "/user/directmember",
      members: singleuser?.add_income,
      bgColor: "bg-sky-900",
      iconColor: "bg-sky-600",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      name: "Promotion Wallet",
      initials: "TL",
      href: "/user/directmember",
      members: singleuser?.wallet,
      bgColor: "bg-sky-900",
      iconColor: "bg-sky-600",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },

    // {
    //   name: "Level Income",
    //   initials: "ILI",
    //   href: "/user/transaction/invest_level_transaction/invest",
    //   members: singleuser?.level_income,
    //   bgColor: "bg-blue-900",
    //   iconColor: "bg-blue-600",
    //   buttonColor: "bg-blue-600 hover:bg-blue-700",
    // },

    {
      name: "Roi",
      initials: "RI",
      href: "/user/transaction/roi_transaction/Invest",
      members: singleuser?.roi_income,
      bgColor: "bg-purple-900",
      iconColor: "bg-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },

    {
      name: "Total Earning",
      initials: "TE",
      href: "#",
      members: (
        singleuser?.level_income +
        singleuser?.roi_income +
        singleuser?.reward +
        singleuser?.total_salary +
        singleuser?.direct_income
      ).toFixed(2),
      bgColor: "bg-pink-900",
      iconColor: "bg-pink-600",
      buttonColor: "bg-pink-600 hover:bg-pink-700",

    },
    {
      name: "Total Reward",
      initials: "TR",
      href: "/user/transaction/reward_transaction",
      members: singleuser?.reward,
      bgColor: "bg-indigo-900",
      iconColor: "bg-indigo-600",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    // {
    //   name: "Total Salary",
    //   initials: "TR",
    //   href: "/user/dashboard",
    //   members: singleuser?.total_salary,
    //   bgColor: "bg-teal-900",
    //   iconColor: "bg-teal-600",
    //   buttonColor: "bg-teal-600 hover:bg-teal-700",
    // },

    {
      name: "Total Member",
      initials: "TM",
      href: "/user/dashboard",
      members: totalMembers,
      bgColor: "bg-amber-900",
      iconColor: "bg-amber-600",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    {
      name: "Active Member",
      initials: "AM",
      href: "/user/referraltree",
      members: activeMembers,
      bgColor: "bg-green-900",
      iconColor: "bg-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      name: "Total Team Business",
      initials: "TTB",
      href: "/user/dashboard",
      members: totalActivePlanAmount + totalInvestmentPlanAmount,
      bgColor: "bg-purple-900",
      iconColor: "bg-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const animations = [
    { y: [-10, 0], opacity: [0, 1] }, // Slide up
    { scale: [0.8, 1], opacity: [0, 1] }, // Scale up
    { x: [-10, 0], opacity: [0, 1] }, // Slide left
    { x: [10, 0], opacity: [0, 1] }, // Slide right
  ];

  return (
    // <div className="bg-[#0b90c280] p-4 rounded-sm shadow-md">
    //   <div className="grid grid-cols-2 gap-4">
    //     {projects.length > 0 ? (
    //       projects.map((project) => (
    //         <div
    //           key={project.name}
    //           className={`${project.bgColor} p-4 border flex justify-between items-center border-white/50 rounded-sm shadow-md hover:shadow-xl transition duration-300`}
    //         >
    //           <div className="flex items-center space-x-4">
    //             {/* Icon Section */}
    //             <div
    //               className={`${project.iconColor} h-14 w-14 rounded-full flex items-center justify-center text-gray-900 text-xl font-semibold`}
    //             >
    //               {project.initials}
    //             </div>

    //             {/* Project Info */}
    //             <div>
    //               <h3 className="text-base font-semibold text-gray-900">
    //                 {project.name}
    //               </h3>
    //               <p className="text-sm text-gray-300">
    //                 {project.members}
    //               </p>
    //             </div>
    //           </div>
    //           <Link to={project.href} className="">
    //           <button className={`flex items-center space-x-2 text-gray-900  px-4 py-3 rounded-sm  ${project.buttonColor} transition`}>
    //             <span>View All</span>
    //             <FaArrowRight className="text-base" />
    //           </button>
    //           </Link>
    //         </div>
    //       ))
    //     ) : (
    //       <div className="col-span-full text-center text-gray-400 text-xl py-6 bg-[#2a3b4c] rounded-lg">
    //         No data available
    //       </div>
    //     )}
    //   </div>
    // </div>




    
    // <div className="bg-[#0b90c280] p-4 rounded-sm shadow-md">
    //   <div className="grid grid-cols-2 gap-4">
    //     {projects.length > 0 ? (
    //       projects.map((project, index) => (
    //         <motion.div
    //           key={project.name}
    //           initial={{ opacity: 0 }}
    //           animate={animations[index % animations.length]}
    //           transition={{ duration: 0.5, ease: "easeOut" }}
    //           className={`${project.bgColor} p-4 border flex justify-between items-center border-white/50 rounded-sm shadow-md hover:shadow-xl transition duration-300`}
    //         >
    //           <div className="flex items-center space-x-4">
    //             <div
    //               className={`${project.iconColor} h-14 w-14 rounded-full flex items-center justify-center text-gray-900 text-xl font-semibold`}
    //             >
    //               {project.initials}
    //             </div>
    //             <div>
    //               <h3 className="text-base font-semibold text-gray-900">
    //                 {project.name}
    //               </h3>
    //               <p className="text-sm text-gray-300">{project.members}</p>
    //             </div>
    //           </div>
    //           <Link to={project.href}>
    //             <button className={`flex items-center space-x-2 text-gray-900 px-4 py-3 rounded-sm ${project.buttonColor} transition`}>
    //               <span>View All</span>
    //               <FaArrowRight className="text-base" />
    //             </button>
    //           </Link>
    //         </motion.div>
    //       ))
    //     ) : (
    //       <div className="col-span-full text-center text-gray-400 text-xl py-6 bg-[#2a3b4c] rounded-lg">
    //         No data available
    //       </div>
    //     )}
    //   </div>
    // </div>








    <div className="p-6 bg-gray-300/50 rounded-xl shadow-2xl">
      <h2 className="mb-6 ml-2 text-2xl font-bold text-gray-100">Income Overview</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`group relative bg-gradient-to-br ${project.bgColor} p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className={` bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-lg mb-4`}>
                      <span className="text-lg font-semibold ">{project.initials}</span>
                    </div>
                    <h3 className="text-sm font-medium text-blue-500">{project.name}</h3>
                    <p className="mt-2 text-2xl font-bold text-white">
                      ${typeof project.members === 'number' ? project.members.toLocaleString() : project.members}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to={project.href}
                    className={`inline-flex justify-between items-center px-4 py-2 w-full text-sm font-medium rounded-lg border border-white backdrop-blur-sm transition-colors duration-200 bg-white/10 hover:bg-white/20`}
                  >
                    <span className="text-white">Details</span>
                    <FaArrowRight className="w-4 h-4 transition-transform transform text-white group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-8 text-lg text-center text-gray-200 rounded-xl bg-white/5">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
