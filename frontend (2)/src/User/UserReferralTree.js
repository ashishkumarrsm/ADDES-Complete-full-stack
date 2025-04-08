// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getTreeData } from "../redux/referralSlice";
// import "./ReferralTree.css"; // Import your CSS file here
// import Loader from "../BaseFile/comman/Loader";

// // TreeNode Component

// const calculateTotalBusiness = (user) => {
//   let totalBusiness = Number(user.active_plan) || 0;
//   if (Array.isArray(user?.referrals) && user?.referrals.length > 0) {
//     user?.referrals?.forEach((referral) => {
//       totalBusiness += calculateTotalBusiness(referral);
//     });
//   }
//   return totalBusiness;
// };

// const TreeNode = ({ user, expandedNodes, toggleExpand, isWhite }) => {
//   const bgColor = isWhite ? "black" : "green"; // White or Gray based on index
//   const borderColor = isWhite ? "border-gray-400" : "border-gray-300"; // Alternating borders
//   return (
//     <li className="flex relative flex-col items-center">
//       {/* Before condition */}
//       <div className="text-lg text-gray-200 before-condition">
//         {/* Before: {user.beforeCondition || "N/A"} */}
//       </div>

//       <a
//         href="#"
//         onClick={(e) => {
//           e.preventDefault();
//           toggleExpand(user.id);
//         }}
//         className={`flex items-center px-4 py-2 rounded border ${borderColor} hover:bg-blue-100`}
//         style={{ backgroundColor: bgColor }} // Use the defined background color
//       >
//         <div className="flex relative gap-2 items-center text-white">
//           <div>
//             <img
//               src="/default.jpg" // Placeholder image
//               alt={user?.username}
//               className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
//             />
//             {user?.referrals && user?.referrals.length > 0 && (
//               <div className="absolute top-10 left-1/2 w-0 h-full bg-gray-300 transform -translate-x-1/2"></div>
//             )}
//           </div>
//           <div className="text-left">
//             <div className="font-semibold break-all">{user?.username}</div>
//             <div className="break-all">{user?.email}</div>
//             <div className="text-left"> {user?.is_active}</div>
//           </div>
//         </div>
//         <div className="mt-2 ml-2 text-gray-200">
          
//           <div className="">
//             Self business : ${user?.active_plan}
//           </div>
//           <div className="">Refferal : ${user?.refferal_code}</div>
//           <div className="">
//             Total business : ${calculateTotalBusiness(user)}
//           </div>
//         </div>
//       </a>

//       <div className="text-lg text-gray-500 after-condition"></div>

//       {expandedNodes[user.id] &&
//         user.referrals &&
//         user.referrals.length > 0 && (
//           <ul className="flex relative justify-center pt-4 space-x-8">
//             {user.referrals.map((childUser, index) => (
//               <li key={childUser.id} className="mx-2 mb-4">
//                 <TreeNode
//                   user={childUser}
//                   expandedNodes={expandedNodes}
//                   toggleExpand={toggleExpand}
//                   isWhite={index % 2 === 0}
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//     </li>
//   );
// };

// // UserReferralTree Component
// const UserReferralTree = () => {
//   const dispatch = useDispatch();
//   const [error, setError] = useState(null);
//   const { auth } = useSelector((state) => state.auth);
//   const { treeData,loading } = useSelector((state) => state.referralTree);
//   const [expandedNodes, setExpandedNodes] = useState({}); // Track which nodes are expanded

//   useEffect(() => {
//     if (auth?.refferal_code) {
//       dispatch(getTreeData(auth?.refferal_code));
//     }
//   }, [auth?.refferal_code, dispatch]);

//   // Toggle expand/collapse for a node
//   const toggleExpand = (id) => {
//     setExpandedNodes((prev) => ({
//       ...prev,
//       [id]: !prev[id], // Toggle the current state
//     }));
//   };

//   return (
//     <div className="py-12 overflow-auto genealogy-scroll whitespace-nowrap min-h-screen text-center bg-[#0b90c280]">
//       <div className="flex justify-center items-center mb-6">
//         <div className="bg-[#03242f59] p-4 border border-white/50  rounded-md w-48">
//           <div className="flex relative justify-center mb-3">
//             <div className="text-white absolute -top-10 rounded-t-lg bg-[#0b90c280] px-3 py-1 text-xs">
//               {" "}
//               {auth?.is_active ? "Active" : "Inactive"}
//             </div>
//             <img
//               src="/default.jpg" // Placeholder image
//               alt={auth?.username}
//               className="w-10 h-10 rounded-full border border-gray-300"
//             />
//           </div>
//           <div className="ml-2 text-white">
//           <div>ID: {auth?.id}</div>
//             <div className="py-1 text-sm font-medium">
//                {auth?.username}
//             </div>
            
//             <div> {auth?.email}</div>
//           </div>
//         </div>
//       </div>
//       <Loader isLoading={loading}/>

//       <div className="inline-block tree">
//         <ul className="flex justify-center pt-5 space-x-8">
//           {treeData?.map((user, index) => {
//             return (
//               <>
//                 {/* <p className="text-white">{user.referrals.length > 0 ?"has-referrals" : "not-referrals"}</p> */}
//                 <TreeNode
//                   key={user.id}
//                   user={user}
//                   expandedNodes={expandedNodes}
//                   toggleExpand={toggleExpand}
//                   isWhite={index % 2 === 0} 
//                 />
//               </>
//             );
//           })}
//         </ul>
//       </div>

//       {error && <p>{error}</p>}
//       {treeData?.length === 0 && (
//         <div className="text-center text-white">No More Tree</div>
//       )}
//     </div>
//   );
// };

// export default UserReferralTree;





















import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTreeData } from "../redux/referralSlice";
import Loader from "../BaseFile/comman/Loader";

// Helper function to calculate total business
const calculateTotalBusiness = (user) => {
  let totalBusiness = Number(user.active_plan) || 0;
  if (Array.isArray(user?.referrals) && user?.referrals.length > 0) {
    user?.referrals?.forEach((referral) => {
      totalBusiness += calculateTotalBusiness(referral);
    });
  }
  return totalBusiness;
};

// TreeNode Component with updated UI
const TreeNode = ({ user, expandedNodes, toggleExpand }) => {
  const totalBusiness = calculateTotalBusiness(user);
  const isActive = user?.is_active === "active" || user?.is_active === true;
  
  return (
    <li className="flex relative flex-col items-center">
      <div 
        onClick={(e) => {
          e.preventDefault();
          toggleExpand(user.id);
        }}
        className="transition-all duration-300 transform cursor-pointer hover:scale-105"
      >
        <div className={`relative rounded-xl overflow-hidden shadow-2xl border-2 ${isActive ? 'border-emerald-500' : 'border-rose-400'}`}>
          <div className={`absolute top-0 right-0 w-3 h-3 rounded-full m-2 ${isActive ? 'bg-emerald-500' : 'bg-rose-400'}`}></div>
          
          <div className="flex flex-col p-4 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="flex items-center mb-3">
              <div className="relative">
                <img
                  src="/default.jpg"
                  alt={user?.username}
                  className="w-12 h-12 rounded-full border-2 shadow-lg border-slate-600"
                />
                {isActive && (
                  <div className="absolute right-0 bottom-0 w-3 h-3 bg-emerald-500 rounded-full border border-white"></div>
                )}
              </div>
              <div className="ml-3 text-white">
                <h3 className="text-sm font-bold md:text-base">{user?.username}</h3>
                <p className="max-w-xs text-xs truncate text-slate-300 md:text-sm">{user?.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2 text-xs md:text-sm">
              <div className="flex flex-col">
                <span className="text-slate-400">Self Investment</span>
                <span className="font-semibold text-emerald-400">${user?.active_plan || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400">Total Network</span>
                <span className="font-semibold text-sky-400">${totalBusiness}</span>
              </div>
              <div className="flex flex-col col-span-2 mt-1">
                <span className="text-slate-400">Referral Code</span>
                <div className="p-1 font-mono text-xs text-amber-300 break-all rounded-md bg-slate-700/50">{user?.refferal_code}</div>
              </div>
            </div>
            
            {user.referrals && user.referrals.length > 0 && (
              <div className="flex justify-center mt-3">
                <button 
                  className={`text-xs rounded-full px-3 py-1 border transition-colors ${
                    expandedNodes[user.id] 
                      ? 'bg-indigo-900 text-indigo-200 border-indigo-700' 
                      : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center">
                    {expandedNodes[user.id] ? 'Hide' : 'Show'} {user.referrals.length} Referral{user.referrals.length !== 1 ? 's' : ''}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform duration-300 ${expandedNodes[user.id] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vertical connector line */}
      {expandedNodes[user.id] && user.referrals && user.referrals.length > 0 && (
        <div className="w-px h-8 bg-slate-500/50"></div>
      )}

      {/* Children nodes */}
      {expandedNodes[user.id] && user.referrals && user.referrals.length > 0 && (
        <div className="relative">
          {/* Horizontal connector line */}
          <div className="absolute top-0 left-1/2 w-full h-px transform -translate-x-1/2 bg-slate-500/50"></div>
          
          <ul className="flex relative flex-wrap gap-4 justify-center items-start pt-8 md:gap-6">
            {user.referrals.map((childUser) => (
              <li key={childUser.id} className="mb-6">
                <TreeNode
                  user={childUser}
                  expandedNodes={expandedNodes}
                  toggleExpand={toggleExpand}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

// Main Component
const UserReferralTree = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { auth } = useSelector((state) => state.auth);
  const { treeData, loading } = useSelector((state) => state.referralTree);
  const [expandedNodes, setExpandedNodes] = useState({});

  useEffect(() => {
    if (auth?.refferal_code) {
      dispatch(getTreeData(auth?.refferal_code));
    }
  }, [auth?.refferal_code, dispatch]);

  // Toggle expand/collapse for a node
  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="overflow-auto px-2 py-6 min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 sm:px-4">
      <Loader isLoading={loading} />
      
      {/* User Profile Card */}
      <div className="flex justify-center items-center mb-10">
        <div className="p-4 w-full max-w-xs bg-gradient-to-r rounded-2xl border shadow-2xl from-slate-800 to-slate-900 border-slate-700 sm:p-5">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className={`absolute -top-2 -right-2 rounded-full px-3 py-1 text-xs ${
                auth?.is_active 
                  ? 'bg-emerald-500 text-emerald-100' 
                  : 'bg-rose-500 text-rose-100'
              }`}>
                {auth?.is_active ? "Active" : "Inactive"}
              </div>
              <img
                src="/default.jpg"
                alt={auth?.username}
                className="w-20 h-20 rounded-full border-4 shadow-lg border-slate-700"
              />
            </div>
            
            <div className="text-center text-white">
              <h2 className="text-xl font-bold">{auth?.username}</h2>
              <p className="mb-2 text-sm text-slate-300">{auth?.email}</p>
              <div className="inline-block px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-300">
                ID: {auth?.id}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 w-full">
              <div className="p-2 text-center rounded-lg bg-slate-800/50">
                <p className="text-xs text-slate-400">Investment</p>
                <p className="font-bold text-emerald-400">${auth?.active_plan || 0}</p>
              </div>
              <div className="p-2 text-center rounded-lg bg-slate-800/50">
                <p className="text-xs text-slate-400">Referrals</p>
                <p className="font-bold text-sky-400">{auth?.referrals?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tree visualization */}
      <div className="relative">
        <div className="overflow-x-auto pb-8 mx-auto w-full tree-container">
          {treeData?.length > 0 ? (
            <ul className="flex justify-center pt-5 space-x-4 md:space-x-8">
              {treeData?.map((user) => (
                <TreeNode
                  key={user.id}
                  user={user}
                  expandedNodes={expandedNodes}
                  toggleExpand={toggleExpand}
                />
              ))}
            </ul>
          ) : !loading && (
            <div className="py-10 mx-4 text-center text-white rounded-lg border bg-slate-800/50 border-slate-700 sm:mx-auto sm:max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mb-1 text-xl font-medium">No Referral Data</h3>
              <p className="text-slate-400">You don't have any referrals in your network yet</p>
              
              <div className="mt-6">
                <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-lg transition-colors duration-300 hover:bg-indigo-700">
                  Share Your Referral Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 mx-auto mt-4 max-w-md text-center text-rose-400 rounded-lg bg-rose-900/20">
          <div className="flex justify-center items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Error</span>
          </div>
          {error}
        </div>
      )}
    </div>
  );
};

export default UserReferralTree;













