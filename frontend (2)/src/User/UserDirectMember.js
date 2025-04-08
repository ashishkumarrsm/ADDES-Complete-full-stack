// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getReferralTree } from "../redux/referralSlice";
// import Loader from "../BaseFile/comman/Loader";

// export default function UserDirectMember() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const { auth } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const { referralTree } = useSelector((state) => state.referralTree);
//   const [allRefferal, setAllRefferal] = useState();

//   useEffect(() => {
//     dispatch(getReferralTree(auth?.refferal_code));
//     setAllRefferal(referralTree);
//   }, [dispatch, allRefferal, auth?.refferal_code]);

//   const handleSearch = (e) => {
//     setAllRefferal(
//       referralTree?.filter((p) => p.username?.includes(e.target.value))
//     );
//     setSearchQuery(e.target.value);
//   };

  

//   return (
//     <>
//       <div className="my-5  p-4 bg-[#0b90c280]">
//         <div className="flex flex-wrap justify-between items-center mb-3 w-full">
//           <div className="">
//             <h3 className="text-lg font-semibold text-gray-200">Your Member</h3>
//             <p className="text-lg text-gray-300">
//               Overview of the Your Member.
//             </p>
//           </div>
//           <div className="mt-3 lg:ml-3 sm:mt-0">
//             <div className="flex relative gap-5 w-full max-w-sm">
//               <div className="relative">
//                 <input
//                   id="search"
//                   name="search"
//                   value={searchQuery}
//                   onChange={(e) => handleSearch(e)}
//                   className="w-full h-10 py-2 pl-3 text-lg transition duration-200 border rounded shadow-sm text-gray-100 bg-[#1a8ab280] pr-11 placeholder:text-slate-100  border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-100 focus:shadow-md"
//                   placeholder="Search for..."
//                 />
//                 <button
//                   className="flex absolute top-1 right-1 justify-center items-center px-2 my-auto h-8 rounded jus"
//                   type="button"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="3"
//                     stroke="currentColor"
//                     className="w-5 h-5 text-white"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                     />
//                   </svg>
                  
//                 </button>
                
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex relative flex-col mb-4 w-full h-full text-gray-100 bg-clip-border bg-black rounded-sm shadow-md">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-max text-left rounded-sm border table-auto">
//               <thead>
//                 <tr>
//                   <th className="p-4 border-b border-slate-200">
//                     <p className="text-base font-normal leading-none">
//                       S. No
//                     </p>
//                   </th>
//                   <th className="p-4 border-b border-slate-200">
//                     <p className="text-base font-normal leading-none">
//                       UserName
//                     </p>
//                   </th>
//                   <th className="p-4 border-b border-slate-200">
//                     <p className="text-base font-normal leading-none">
//                       is_active
//                     </p>
//                   </th>
                 
//                   <th className="p-4 border-b border-slate-200">
//                     <p className="text-base font-normal leading-none">
//                       E-Mail
//                     </p>
//                   </th>
//                   <th className="p-4 border-b border-slate-200">
//                     <p className="text-base font-normal leading-none">
//                       Active Plan
//                     </p>
//                   </th>
//                   <th className="p-4 border-b border-slate-200">
//                     <p className="text-base font-normal leading-none">
//                       Created at
//                     </p>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[#0f1b61a8] ">
//                 {(searchQuery ? allRefferal : referralTree)?.length > 0 ? (
//                   (searchQuery ? allRefferal : referralTree)?.map(
//                   (item, index) => (
//                     <tr
//                       key={index}
//                       className="text-gray-100 even:bg-[#7e66c5b3] even:text:white"
//                     >
//                       <td className="py-4 pr-3 pl-4 text-lg font-medium whitespace-nowrap sm:pl-3">
//                         {index+1}
//                       </td>
//                       <td className="py-4 pr-3 pl-4 text-lg font-medium whitespace-nowrap sm:pl-3">
//                         {item?.username}
//                       </td>
//                       <td className="px-3 py-4 text-lgwhitespace-nowrap">
//                         <div className="flex gap-x-2 justify-end items-center sm:justify-start">
//                           {item?.is_active === "active" ? (
//                             <div className="flex-none p-1 rounded-full">
//                               <div className="w-1.5 h-1.5 bg-green-800 rounded-full" />
//                             </div>
//                           ) : (
//                             <div className="flex-none p-1 rounded-full">
//                               <div className="w-1.5 h-1.5 bg-red-800 rounded-full" />
//                             </div>
//                           )}
//                           <div className="hidden sm:block">
//                             {item?.is_active}
//                           </div>
//                         </div>
//                       </td>
                     
//                       <td className="px-3 py-4 text-lg whitespace-nowrap">
//                         {item?.email}
//                       </td>
//                       <td className="px-3 py-4 text-lg whitespace-nowrap">
//                         ${item?.active_plan}
//                       </td>
//                       <td className="px-3 py-4 text-lg whitespace-nowrap">
//                         {item?.created_at
//                           ? new Date(item.created_at).toLocaleDateString(
//                               "en-US",
//                               {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "numeric",
//                               }
//                             )
//                           : "N/A"}
//                       </td>
//                     </tr>
//                   )
//                 )):(
//                   <tr>
//                       <td
//                         colSpan="6"
//                         className="py-4 text-lg text-center text-gray-100 bg-[#4b1725ab]"
//                       >
//                         No data available
//                       </td>
//                     </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferralTree } from "../redux/referralSlice";
import Loader from "../BaseFile/comman/Loader";

export default function UserDirectMember() {
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { referralTree } = useSelector((state) => state.referralTree);
  const [allRefferal, setAllRefferal] = useState();

  useEffect(() => {
    dispatch(getReferralTree(auth?.refferal_code));
    setAllRefferal(referralTree);
  }, [dispatch, allRefferal, auth?.refferal_code]);

  const handleSearch = (e) => {
    setAllRefferal(
      referralTree?.filter((p) => p.username?.includes(e.target.value))
    );
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 my-5 text-gray-900 bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold">Your Members</h3>
          <p className="text-sm text-gray-900">Overview of your members</p>
        </div>
        <div className="relative w-full max-w-xs">
          <input
            id="search"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 pr-10 w-full text-gray-900 bg-gray-200 rounded-lg focus:outline-none"
            placeholder="Search..."
          />
          <div className="flex absolute inset-y-0 right-0 items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-hidden text-white bg-blue-700 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="">
            <tr>
              <th className="px-4 py-3">S. No</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">E-Mail</th>
              <th className="px-4 py-3">Active Plan</th>
              <th className="px-4 py-3">Created at</th>
            </tr>
          </thead>
          <tbody>
            {(searchQuery ? allRefferal : referralTree)?.length > 0 ? (
              (searchQuery ? allRefferal : referralTree)?.map((item, index) => (
                <tr
                  key={index}
                  className="text-gray-900 bg-gray-100 transition even:bg-gray-100"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item?.username}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        item?.is_active === "active" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {item?.is_active}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item?.email}</td>
                  <td className="px-4 py-3">${item?.active_plan}</td>
                  <td className="px-4 py-3">
                    {item?.created_at
                      ? new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-3 text-center text-gray-400 bg-gray-700"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
