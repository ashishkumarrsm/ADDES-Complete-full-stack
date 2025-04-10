import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import { TrashIcon } from "@heroicons/react/20/solid";
import BebModal from "./BebModal";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import { getUser } from "../redux/userSlice";
import { CgDetailsMore } from "react-icons/cg";

import {
  getAllWithdrawalByid,
  deleteWithdrawal,
  clearErrors,
  clearMessage,
} from "../redux/withdrawalSlice";
import UserWithdrawalModel from "./UserWithdrawalModel";
import ROIWithdrawalConfirmation from "./ROIWithdrawalConfirmation";
import BalanceDetail from "./BalanceDetail";

export default function UserAddWithdrawal() {
  const dispatch = useDispatch();
  const { singleWithdrawal, loading, error, message } = useSelector(
    (state) => state.allwithdrawal
  );
  const { singleuser } = useSelector((state) => state.allusers);

  const { auth } = useSelector((state) => state.auth);
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [compoundModel, setCompoundModel] = useState(false);
  const [withdrawalROIModel, setWithdrawalROIModel] = useState(false);
  const [withdrawalcompoundModel, setWithdrawalCompoundModel] = useState(false);
  const [openModel, setOpenModel] = useState(null);
  const [bebModal, setBebModal] = useState(false);
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    dispatch(getUser(auth?.id));

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
  }, [dispatch, error, message]);

  useEffect(() => {
    if (auth?.id) {
      dispatch(getAllWithdrawalByid(auth?.id));
    }
  }, [auth?.id]);

  const handleBebClose = (id) => {
    setBebModal(false);
  };

  const isClose = () => {
    setModalOpen(false);
    setDetail(false);
  };

  function modelClose() {
    setOpenModel(false);
    setCompoundModel(false);
    setWithdrawalCompoundModel(false);
    setWithdrawalROIModel(false);
  }
  function handleWithdrawalButton() {
    const today = new Date().getDate(); 
    // const allowedDays = [1, 11, 21];

    // if (!allowedDays.includes(today)) {
    //   alert(
    //     "Withdrawals are only allowed on the 1st, 11th, or 21st of the month."
    //   );
    //   return;
    // }

    if (singleuser?.bep20 || singleuser?.trc20) {
      setOpenModel(true);
    } else {
      setBebModal(true);
    }
  }

  function handleWithdrawalROI() {
    const today = new Date().getDate();
    console.log(today); // Get the current day of the month
    const allowedDays = [10, 20, 30];

    if (!allowedDays.includes(today)) {
      alert(
        "Withdrawals are only allowed on the 10st, 20th, or 30st of the month."
      );
      return;
    }
    if (singleuser?.bep20 || singleuser?.trc20) {
      setWithdrawalROIModel(true);
    } else {
      setBebModal(true);
    }
  }
  return (
    <>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <Loader isLoading={loading}/>
      <div className="m-3 p-4 bg-gray-300/50">
        <div className="w-full mb-3 ">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-200">
              Withdraw Request{" "}
            </h3>
            <p className="text-lg text-slate-300">
              Overview of the Withdraw Request.
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 ">
            <div>
            <div className="relative flex-grow">
              <input
                className=" h-10 py-2 pl-8 text-base transition duration-200 border rounded shadow-sm text-gray-100 bg-gray-300/50 pr-11 placeholder:text-slate-100  border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-100 focus:shadow-md"
                placeholder="Search..."
              />
              <button
                className="absolute  flex items-center w-8 h-8 px-2 my-auto  rounded left-0 top-1 "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
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
            <div className="relative md:flex mt-4 md:mt-0 justify-end max-w-full gap-2 ">
              <div className="sm:flex  gap-2 sm:space-y-0 space-y-4">
                <button
                  type="button"
                  onClick={handleWithdrawalButton}
                  className="block  px-3 py-2 sm:text-base text-sm font-semibold text-center text-white bg-gray-300/50 border border-white/50 rounded-sm shadow-sm hover:bg-[#2b6b8380] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Withdrawal Working
                </button>
                <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleWithdrawalROI}
                  className="block px-3 py-2 sm:text-base text-sm font-semibold text-center text-white bg-gray-300/50 border border-white/50 rounded-sm shadow-sm hover:bg-[#2b6b8380] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Withdrawal ROI
                </button>
                <div>
                <button
                  className="px-3 py-[7px] text-2xl  border border-gray-400 rounded-sm text-gray-100 bg-gray-300/50"
                  onClick={() => setDetail(true)}
                >
                  {" "}
                  <CgDetailsMore />
                </button>
                </div>
              </div>
              </div>
             
            </div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full py-1 mb-4 text-gray-300 rounded-lg shadow-md bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border table-auto min-w-max text-gray-100 bg-blue-500">
                <thead className="text-gray-100 ">
                  <tr>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none md:text-lg">
                        E-Mail
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none md:text-lg">
                        Amount
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none md:text-lg">
                        Status
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none md:text-lg">
                        Request
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none md:text-lg">
                        Type
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none md:text-lg">
                        Action at
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-100 bg-[#01415859]">
                  {singleWithdrawal?.length > 0 ? (
                    singleWithdrawal
                      ?.slice()
                      .reverse()
                      .map((item, index) => (
                        <tr
                          key={index}
                          className=" text-gray-100 even:bg-[#51530ec4] even:text:white"
                        >
                          <td className="py-2 pl-4 pr-3 text-xs font-medium whitespace-nowrap md:py-4 md:text-lg sm:pl-3">
                            {item?.email}
                          </td>
                          <td className="px-3 py-2 text-xs whitespace-nowrap md:py-4 md:text-lg">
                            ${item?.amount + item?.deduction}
                          </td>
                          <td className="px-3 py-2 text-xs whitespace-nowrap md:py-4 md:text-lg">
                            {item?.status}
                          </td>
                          <td className="px-3 py-2 text-xs whitespace-nowrap md:py-4 md:text-lg">
                            {item?.createdAT}
                          </td>
                          <td className="px-3 py-2 text-xs whitespace-nowrap md:py-4 md:text-lg">
                            {item?.type}
                          </td>

                          <td className="px-3 py-2 text-xs whitespace-nowrap md:py-4 md:text-lg">
                            {item?.acceptat || " - "}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-4 text-base font-medium text-center text-gray-100 whitespace-nowrap bg-gray-400"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deleteWithdrawal}
          id={deleteID}
        />
      )}

      {openModel && (
        <UserWithdrawalModel openModel={openModel} modelClose={modelClose} />
      )}

      {withdrawalROIModel && (
        <ROIWithdrawalConfirmation
          openModel={withdrawalROIModel}
          modelClose={modelClose}
          id={auth?.id}
        />
      )}
      {bebModal && <BebModal handleBebClose={handleBebClose} />}
      {detail && (
        <BalanceDetail
          detail={singleuser?.business}
          detail2={singleuser?.wallet}
          isClose={isClose}
        />
      )}
    </>
  );
}
