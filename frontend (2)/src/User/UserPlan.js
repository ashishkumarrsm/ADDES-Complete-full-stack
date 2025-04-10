import { useState, useEffect } from "react";
import Loader from "../BaseFile/comman/Loader";
import { CheckIcon } from "@heroicons/react/20/solid";
import Spinner from "../BaseFile/comman/Spinner";
import UserPlanConfirmation from "./UserPlanConfirmation";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import UserEntryFeeConfirmation from "./UserEntryFeeConfirmation";
import { getAllPlans } from "../redux/planSlice";
import { getUser } from "../redux/userSlice";
import { clearErrors, clearMessage } from "../redux/depositeSlice";
import { useDispatch, useSelector } from "react-redux";
import UserPlanCard from "./UserPlaneCard";

export default function UserPlan() {
  const dispatch = useDispatch();
  const { allplans, loading } = useSelector((state) => state.allplans);
  const { error, message } = useSelector((state) => state.alltopup);
  const { auth } = useSelector((state) => state.auth);
  const { singleuser } = useSelector((state) => state.allusers);

  const [planConfirm, setPlanConfirm] = useState(false);
  const [plan, setPlan] = useState();
  const [entryPlanModel, setEntryPlanModel] = useState(false);

  useEffect(() => {
    dispatch(getAllPlans());
    if (auth?.id) {
      dispatch(getUser(auth.id));
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
  }, [dispatch, auth?.id, error, message]);

  function handleBuyPlan(plan) {
    setPlan(plan);
    setPlanConfirm(true);
  }

  function isclose() {
    setPlan(null);
    setPlanConfirm(false);
    setEntryPlanModel(false);
  }

  function handleEntryPlan() {
    setEntryPlanModel(true);
  }

  return (
    <>
     <div>
      <UserPlanCard/>
     </div>
    </>
  );
}

// {message && <SuccessAlert message={message} />}
// {error && <ErrorAlert error={error} />}
// {loading ? (
//   <Loader />
// ) : (
//   <div className="bg-gray-300/50 py-1">
//     <div>
//       <UserPlanCard/>
//     </div>
//     <div className="mx-auto max-w-7xl">
//       <div className="isolate mx-auto overflow-x-auto p-5">
//         <table className="min-w-full border shadow-xl">
//           <thead className="bg-blue-500 py-1">
//             <tr className="text-white border-b border-gray-300">
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Plan Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Package Price
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 ROI & Sponsor Bonus
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold w-[250px]">
//                 T&C
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-900 bg-white">
//             {singleuser?.entry_fees === 0
//               ? allplans
//                   ?.filter((item) => item.name === "entry")
//                   ?.map((allPlan) => (
//                     <tr
//                       key={allPlan?.id}
//                       className="text-gray-900 even:bg-gray-300/50 even:text-gray-900 text-sm border-b border-gray-400 transition duration-300"
//                     >
//                       <td className="px-6 py-4 capitalize font-semibold">
//                         {allPlan?.name}
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         {allPlan?.description}
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <div className="flex items-center gap-2">
//                           <CheckIcon className="h-5 w-5" />
//                           {allPlan?.ROI_day} ROI Overall
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <CheckIcon className="h-5 w-5" />
//                           {allPlan?.Sponser_bonus}% Sponsor Bonus
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm w-[250px]">
//                         Participants must be at least 18 years old
//                         to enroll in any marketing plan.
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={handleEntryPlan}
//                           className="px-4 py-2 text-sm font-semibold text-indigo-300 border border-indigo-200 rounded-md hover:bg-indigo-900 hover:text-white transition"
//                         >
//                           {loading ? <Spinner /> : "Buy Plan"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//               : allplans
//                   ?.filter((item) => item.name !== "entry")
//                   ?.map((allPlan) => (
//                     <tr
//                       key={allPlan?.id}
//                       className="text-gray-900 even:bg-gray-300/50 even:text-gray-900 text-sm border-b border-gray-400 transition duration-300"
//                     >
//                       <td className="px-6 py-4 capitalize font-semibold">
//                         {allPlan?.name}
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         {allPlan?.description}
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <div className="flex items-center gap-2">
//                           <CheckIcon className="h-5 w-5" />
//                           {allPlan?.ROI_day} ROI Overall
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <CheckIcon className="h-5 w-5" />
//                           {allPlan?.Sponser_bonus}% Sponsor Bonus
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm w-[250px]">
//                         Participants must be at least 18 years old
//                         to enroll in any marketing plan.
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => handleBuyPlan(allPlan)}
//                           className="px-4 py-2 text-sm font-semibold text-indigo-300 border border-indigo-200 rounded-md hover:bg-indigo-900 hover:text-white transition"
//                         >
//                           {loading ? <Spinner /> : "Buy Plan"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// )}
// {/* Plan Confirmation and Entry Fee Modals */}
// {planConfirm && <UserPlanConfirmation isclose={isclose} plan={plan} />}
// {entryPlanModel && <UserEntryFeeConfirmation isclose={isclose} />}