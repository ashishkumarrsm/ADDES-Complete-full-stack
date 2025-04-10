// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import Loader from "../BaseFile/comman/Loader";
// import { getTransactionById, clearErrors, clearMessage } from "../redux/transactionSlice";

// export default function UserIncomeTransaction() {
//   const { table_name } = useParams();
//   const { fit } = useParams();
//   const dispatch = useDispatch();

//   const { auth } = useSelector((state) => state.auth);
//   const { transaction, loading, error, message } = useSelector((state) => state.transaction);

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const entriesPerPage = 20;

//   // Calculate total pages
//   const totalPages = Math.ceil(transaction?.length / entriesPerPage);

//   // Get current transactions to display
//   const currentTransactions = transaction
//     ?.slice()
//     .reverse()
//     .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

//   useEffect(() => {
//     if (table_name && auth?.id) {
//       const user_id = auth?.id;
//       dispatch(getTransactionById({ table_name, user_id }));
//     }
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
//   }, [dispatch, table_name, auth?.id]);

//   // Pagination handlers
//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <>
//       <div className="p-3 bg-[#0b90c280]">
//         <div className="flex flex-col justify-between items-center mb-3 w-full sm:flex-row">
//           <div className="">
//             <h3 className="text-lg font-semibold text-slate-300">Transaction History</h3>
//             <p className="text-lg text-slate-400">Overview of the Transaction History.</p>
//           </div>
//           <div className="mt-3 sm:mt-0">
//             <div className="flex relative gap-5 w-full max-w-sm">
//               <div className="relative">
//                 <input
//                   id="search"
//                   name="search"
//                    className="w-full h-10 py-2 pl-3 text-lg transition duration-200 border rounded shadow-sm text-gray-100 bg-[#0b90c280] pr-11 placeholder:text-slate-100  border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-100 focus:shadow-md"
//                   placeholder="Search for..."
//                 />
//                 <button
//                   className="flex absolute top-1 right-1 items-center px-2 my-auto w-8 h-8 rounded"
//                   type="button"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="3"
//                     stroke="currentColor"
//                     className="w-6 h-6 text-white"
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

//         <div className="flex relative flex-col mb-4 w-full h-full text-gray-300 bg-clip-border rounded-lg">
//           {loading ? (
//             <Loader />
//           ) : (
//             <>
//                  <div className="overflow-x-auto">
//                 <table className="w-full min-w-max text-left text-gray-100 border table-auto">
//                   <thead className="text-gray-100 bg-black" >
//                     <tr>
//                       <th className="p-4 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">SR No</p>
//                       </th>
//                       {table_name !='cto_transaction' && ( 
//                       <th className="p-4 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">ID</p>
//                       </th>)}
//                       <th className="p-4 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">Amount</p>
//                       </th>
//                       <th className="p-4 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">Type</p>
//                       </th>
//                       {table_name !== 'reward_transaction' && table_name !='cto_transaction' ? (
//                         <>
//                       <th className="p-4 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">On Amount</p>
//                       </th>
//                       <th className="p-4 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">Percent</p>
//                       </th></>
//                       ):(null)}
//                       <th className="p-4 w-16 border-b border-slate-200">
//                         <p className="text-base font-normal leading-none">Created At</p>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-gray-100 bg-[#01415859]">
//                     {(fit ? currentTransactions?.filter((item)=>item?.type?.includes(fit)) : currentTransactions)?.length> 0?(
//                       (fit ? currentTransactions?.filter((item)=>item?.type?.includes(fit)) : currentTransactions)?.map((item, index) => (
//                      <tr key={index} className="text-gray-100 even:bg-[#51530ec4] even:text:white">
//                      <td className="py-4 pr-3 pl-4 text-base font-medium whitespace-nowrap sm:pl-3">
//                        {(currentPage - 1) * entriesPerPage + index + 1}
//                      </td>
//                         {table_name != 'cto_transaction'&&(
//                         <td className="py-4 pr-3 pl-4 text-base font-medium whitespace-nowrap sm:pl-3">
//                           {item?.email}
//                         </td>)}
//                         <td className="py-4 pr-3 pl-4 text-base font-medium whitespace-nowrap sm:pl-3">
//                           $ {item?.amount}
//                         </td>
//                         <td className="px-3 py-4 text-base capitalize whitespace-nowrap">
//                           {table_name == 'invest_level_transaction' ? (item?.type): (table_name.split("_")[0])}
//                         </td>
                       
//                         {table_name !== 'reward_transaction'  && table_name !='cto_transaction'? (
//                           <>
//                         <td className="px-3 py-4 text-base whitespace-nowrap">
//                           $ {item?.onamount}
//                         </td>
//                         <td className="px-3 py-4 text-base whitespace-nowrap">
//                           {item?.percent} %
//                         </td>
//                       </>):(null)}
//                         <td className="px-3 py-4 text-base whitespace-nowrap">
//                           {item?.createdAt}
//                         </td>
//                       </tr>
//                     ))):(
//                       <tr>
//                       <td
//                         colSpan="7"
//                         className="py-4 text-base text-center text-gray-100 bg-[#4b1725ab]"
//                       >
//                         No data available
//                       </td>
//                     </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination controls */}
//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   onClick={goToPreviousPage}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 bg-[#1384ad59] border hover:bg-[#24596c59] text-white rounded ${
//                     currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   Previous
//                 </button>
//                 <p className="text-lg text-gray-300">
//                   Page {currentPage} of {totalPages}
//                 </p>
//                 <button
//                   onClick={goToNextPage}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 bg-[#1384ad59] border hover:bg-[#24596c59] rounded-md not-allowed" : ""
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }















import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import { getTransactionById, clearErrors, clearMessage } from "../redux/transactionSlice";

export default function UserIncomeTransaction() {
  const { table_name } = useParams();
  const { fit } = useParams();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);
  const { transaction, loading, error, message } = useSelector((state) => state.transaction);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;

  const totalPages = Math.ceil(transaction?.length / entriesPerPage);
  const currentTransactions = transaction
    ?.slice()
    .reverse()
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  useEffect(() => {
    if (table_name && auth?.id) {
      const user_id = auth?.id;
      dispatch(getTransactionById({ table_name, user_id }));
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
  }, [dispatch, table_name, auth?.id]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white/50">
      <div className="flex flex-col justify-between items-center mb-4 sm:flex-row">
        <div>
          <h3 className="text-2xl font-bold text-white">Transaction History</h3>
          <p className="text-white">Detailed overview of your transactions</p>
        </div>
        <div className="relative mt-3 sm:mt-0">
          <input
            id="search"
            name="search"
            className="pr-10 pl-4 w-72 h-10 text-lg text-gray-700 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Search transactions..."
          />
          <button className="absolute top-2 right-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg">
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-900 bg-white rounded-lg border border-gray-300">
              <thead className="text-white bg-blue-700">
                <tr>
                  <th className="p-4">SR No</th>
                  {table_name !== "cto_transaction" && <th className="p-4">ID</th>}
                  <th className="p-4">Amount</th>
                  <th className="p-4">Type</th>
                  {table_name !== "reward_transaction" && table_name !== "cto_transaction" && (
                    <>
                      <th className="p-4">On Amount</th>
                      <th className="p-4">Percent</th>
                    </>
                  )}
                  <th className="p-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {(fit ? currentTransactions?.filter((item) => item?.type?.includes(fit)) : currentTransactions)
                  ?.length > 0 ? (
                  (fit ? currentTransactions?.filter((item) => item?.type?.includes(fit)) : currentTransactions)?.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className="transition duration-200 even:bg-gray-100 hover:bg-blue-100"
                      >
                        <td className="p-4">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                        {table_name !== "cto_transaction" && <td className="p-4">{item?.email}</td>}
                        <td className="p-4 font-semibold text-blue-600">${item?.amount}</td>
                        <td className="p-4 capitalize">{table_name === "invest_level_transaction" ? item?.type : table_name.split("_")[0]}</td>
                        {table_name !== "reward_transaction" && table_name !== "cto_transaction" && (
                          <>
                            <td className="p-4">${item?.onamount}</td>
                            <td className="p-4">{item?.percent} %</td>
                          </>
                        )}
                        <td className="p-4">{item?.createdAt}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <p className="text-lg text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
