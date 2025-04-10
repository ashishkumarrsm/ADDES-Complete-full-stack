// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import Loader from "../BaseFile/comman/Loader";
// import SuccessAlert from "../BaseFile/comman/SuccessAlert";
// import ErrorAlert from "../BaseFile/comman/ErrorAlert";
// import {
//   getUser,
//   updateUsers,
//   clearErrors,
//   clearMessage,
// } from "../redux/userSlice";
// export default function UserProfile() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { singleuser, loading, error, message } = useSelector(
//     (state) => state.allusers
//   );
//   const [editUser, setEditUser] = useState([]);

//   useEffect(() => {
//     dispatch(getUser(id));
//     if (error) {
//       const errorInterval = setInterval(() => {
//         dispatch(clearErrors());
//       }, 3000);
//       return () => clearInterval(errorInterval);
//     }
//     if (message) {
//       const messageInterval = setInterval(() => {
//         dispatch(clearMessage());
//       }, 3000);
//       return () => clearInterval(messageInterval);
//     }
//   }, [dispatch, error, message, clearErrors, clearMessage, id]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSaveChanges = () => {
//     const updatedData = {
//       ...editUser,
//       updated_at: new Date().toISOString(),
//     };
//     dispatch(
//       updateUsers({
//         id: id,
//         updatedData: updatedData,
//       })
//     );
//   };
//   return (
//     <>
//       <div
//         className={`${loading ? "h-[560px] items-center" : "h-full"} h-screen`}
//       >
//         {loading ? (
//           <Loader />
//         ) : (
//           <>
//             {message && <SuccessAlert message={message} />}
//             {error && <ErrorAlert error={error} />}
//             <div className="relative z-10 max-w-7xl mx-auto lg:mt-10  mt-4 ">
//               <div className=" text-white">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//                 <div>
//                     <div className="">
//                       <div className="bg-white rounded-sm shadow-sm  border-b border-gray-300 p-6 flex items-center gap-4">
//                         <div className="relative">
//                           <div className="w-16 h-16 rounded-full bg-[#fafafa] overflow-hidden flex items-center justify-center relative">
//                             <img
//                               src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid"
//                               alt="User avatar"
//                               className="w-full h-full object-cover"
//                             />
//                             {/* <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
//                               <Edit className="w-3 h-3 text-white" />
//                             </div> */}
//                           </div>
//                         </div>

//                         <div>
//                           <div className="flex items-center gap-3">
//                             <h2 className="text-lg font-bold text-gray-800">
//                               {" "}
//                               {singleuser?.username}{" "}
//                             </h2>
//                             <span className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded text-white uppercase tracking-wide">
//                               Free Agent
//                             </span>
//                           </div>
//                           <p className="text-gray-500 text-sm">
//                             {singleuser?.fullname}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-[#fafafa] p-6 text-gray-800 rounded-sm shadow-md space-y-4">
//                       {/* User Details Grid */}
//                       {[
//                         { label: "Last Login", value: singleuser?.last_login },
//                         { label: "Created At", value: singleuser?.created_at },
//                         { label: "Referred By", value: singleuser?.reffer_by },
//                         {
//                           label: "Activation Date",
//                           value: singleuser?.activation_date,
//                         },
//                         {
//                           label: "Updated Date",
//                           value: singleuser?.updated_at,
//                         },
//                         {
//                           label: "Referral Code",
//                           value:
//                             singleuser?.active_plan !== 0
//                               ? "Referral code not active"
//                               : singleuser?.refferal_code,
//                         },
//                         { label: "Total Team", value: singleuser?.total_team },
//                       ].map(({ label, value }, index) => (
//                         <div
//                           key={index}
//                           className="flex justify-between border-b border-gray-500 pb-2"
//                         >
//                           <span className="font-medium ">
//                             {label}
//                           </span>
//                           <span className="">{value || "-"}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   {/* Left Column - Form Section */}
//                   <div className="bg-white p-6 rounded-sm shadow-md text-gray-800 lg:mb-0 mb-20">
//                     <h3 className="text-2xl text-gray-800 font-semibold mb-4">
//                       Update Details
//                     </h3>

//                     <div className="space-y-4">
//                       {/* Bep 20 Input */}
//                       <div>
//                         <label className="block font-medium mb-1">Bep 20</label>
//                         <input
//                           name="bep20"
//                           onChange={handleChange}
//                           defaultValue={singleuser?.bep20}
//                           className="w-full p-3 bg-[#f1f2f3] text-gray-800 rounded-sm border border-white-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           placeholder="Enter Bep 20 value"
//                         />
//                       </div>

//                       {/* Email Input */}
//                       <div>
//                         <label className="block font-medium mb-1">Email</label>
//                         <input
//                           name="email"
//                           onChange={handleChange}
//                           defaultValue={singleuser?.email}
//                           className="w-full p-3 bg-[#f1f2f3] text-gray-800 rounded-sm border border-white-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           placeholder="Enter Email"
//                         />
//                       </div>

//                       {/* Phone Input */}
//                       <div>
//                         <label className="block font-medium mb-1">Phone</label>
//                         <input
//                           name="phone"
//                           onChange={handleChange}
//                           defaultValue={singleuser?.phone}
//                           className="w-full p-3 bg-[#f1f2f3] text-gray-800 rounded-sm border border-white-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           placeholder="Enter Phone Number"
//                         />
//                       </div>

//                       {/* Update Button */}
//                       <div className="flex justify-end pt-4">
//                       <button   onClick={handleSaveChanges} className="relative mt-4 bg-gray-800 px-5 py-2 font-semibold text-white rounded-sm overflow-hidden group">
//                     <span className="relative z-10"> Update</span>
//                     <span className="absolute inset-0 w-0 bg-gray-900/70 transition-all duration-500 group-hover:w-full"></span>
//                   </button> 
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column - User Details */}
                 
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }





















import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import {
  getUser,
  updateUsers,
  clearErrors,
  clearMessage,
} from "../redux/userSlice";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleuser, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  const [editUser, setEditUser] = useState([]);

  useEffect(() => {
    dispatch(getUser(id));
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
  }, [dispatch, error, message, clearErrors, clearMessage, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedData = {
      ...editUser,
      updated_at: new Date().toISOString(),
    };
    dispatch(
      updateUsers({
        id: id,
        updatedData: updatedData,
      })
    );
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${loading ? "flex justify-center items-center" : ""}`}>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {message && <SuccessAlert message={message} />}
          {error && <ErrorAlert error={error} />}
          
          <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="text-sm mt-1 opacity-80">View and manage user information</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* User Info Card - 5 columns on large screens */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                        <img
                          src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid"
                          alt="User avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {singleuser?.username}
                    </h2>
                    <p className="text-gray-500">{singleuser?.fullname}</p>
                    <div className="mt-2">
                      <span className="bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-white uppercase tracking-wide">
                        Free Agent
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-200">
                    User Details
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Last Login", value: singleuser?.last_login, icon: "clock" },
                      { label: "Created At", value: singleuser?.created_at, icon: "calendar" },
                      { label: "Referred By", value: singleuser?.reffer_by, icon: "user" },
                      { label: "Activation Date", value: singleuser?.activation_date, icon: "check-circle" },
                      { label: "Updated Date", value: singleuser?.updated_at, icon: "refresh" },
                      { 
                        label: "Referral Code", 
                        value: singleuser?.active_plan !== 0 ? "Referral code not active" : singleuser?.refferal_code,
                        icon: "link"
                      },
                      { label: "Total Team", value: singleuser?.total_team, icon: "users" }
                    ].map(({ label, value, icon }, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center text-gray-700">
                          {getIcon(icon)}
                          <span className="ml-2 font-medium">{label}</span>
                        </div>
                        <span className="text-gray-600">{value || "-"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Update Form - 7 columns on large screens */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Update Profile Details</h3>
                </div>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BEP20 Input */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Bep 20</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          name="bep20"
                          onChange={handleChange}
                          defaultValue={singleuser?.bep20}
                          className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                          placeholder="Enter Bep 20 value"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input
                          name="email"
                          onChange={handleChange}
                          defaultValue={singleuser?.email}
                          className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                          placeholder="Enter Email"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <input
                        name="phone"
                        onChange={handleChange}
                        defaultValue={singleuser?.phone}
                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="pt-5">
                    <button
                      onClick={handleSaveChanges}
                      className="w-full sm:w-auto float-right px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to render icons based on type
function getIcon(iconName) {
  switch(iconName) {
    case 'clock':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'check-circle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'refresh':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'link':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}