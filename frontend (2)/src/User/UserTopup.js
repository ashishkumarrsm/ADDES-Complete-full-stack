import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import { AiFillDelete } from "react-icons/ai";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import {
  deleteTopup,
  getAllTopupByid,
  clearErrors,
  clearMessage,
} from "../redux/topupSlice";
import { getAllPlans } from "../redux/planSlice";
import UserTopupModel from "./UserTopupModel";

export default function UserTopup() {
  const dispatch = useDispatch();
  const { singletopup, loading, error, message } = useSelector(
    (state) => state.alltopup
  );
  const { auth } = useSelector((state) => state.auth);
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(null);

  useEffect(() => {
    dispatch(getAllPlans());
    if (auth?.id) {
      dispatch(getAllTopupByid(auth?.id));
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
  }, [dispatch, error, message]);

  const handleDelete = (id) => {
    setDeleteID(id);
    setModalOpen(true);
  };

  const isClose = () => {
    setModalOpen(false);
  };

  function modelClose() {
    setOpenModel(false);
  }
  return (
    <>
      {/* {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="mx-5">
        <div className="flex items-center justify-between w-full pl-3 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-300">
            Top-Up History
            </h3>
            <p className="text-lg text-slate-400">
              Overview of the    Top-Up History.
            </p>
          </div>
          <div className="ml-3">
            <div className="relative flex w-full max-w-sm gap-5">
              <div className="relative">
                <input
                  className="w-full h-10 py-2 pl-3 text-lg transition duration-200 bg-transparent bg-black border rounded shadow-sm pr-11 placeholder:text-slate-400 text-slate-300 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 focus:shadow-md"
                  placeholder="Search for invoice..."
                />
                <button
                  className="absolute flex items-center w-8 h-8 px-2 my-auto bg-gray-900 rounded right-1 top-1"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-8 h-8 text-slate-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setOpenModel(true)}
                className="block px-3 py-2 text-lg font-semibold text-center text-white bg-gray-700 rounded-md shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Top-Up
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full px-3 py-1 text-gray-300 bg-gray-800 rounded-lg shadow-md bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-left border table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 bg-black border-b border-slate-200">
                    <p className="text-lg font-normal leading-none text-white">
                    Topup To
                    </p>
                  </th>
                  <th className="p-4 bg-black border-b border-slate-200">
                    <p className="text-lg font-normal leading-none text-white">
                      Amount
                    </p>
                  </th>
                  <th className="p-4 bg-black border-b border-slate-200">
                    <p className="text-lg font-normal leading-none text-white">
                      Status
                    </p>
                  </th>
                  <th className="w-56 p-4 bg-black border-b border-slate-200">
                    <p className="text-lg font-normal leading-none text-white">
                      Request
                    </p>
                  </th>
                 
                </tr>
              </thead>
              <tbody className="bg-gray-900">
                {singletopup
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="even:bg-gray-800">
                      <td className="py-4 pl-4 pr-3 text-lg font-medium text-gray-300 whitespace-nowrap sm:pl-3">
                        {item?.userto_id}
                      </td>
                      <td className="px-3 py-4 text-lg text-gray-300 whitespace-nowrap">
                        ${item?.amount}
                      </td>
                      <td className="px-3 py-4 text-lg text-gray-300 whitespace-nowrap">
                        {item?.status}
                      </td>
                      <td className="px-3 py-4 text-lg text-gray-300 whitespace-nowrap">
                        {item?.createdAT}
                      </td>
                      
               
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {modalOpen && (
          <Confirmation
            isClose={isClose}
            deletefunction={deleteTopup}
            id={deleteID}
          />
        )}
           { openModel && (
  <UserTopupModel openModel={openModel} modelClose={modelClose}/>
)} */}

      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <Loader isLoading={loading}/>
      <div className="p-4 m-3  bg-[#0b90c280]">
        <div className="flex-col items-start justify-between w-full mb-3 lg:flex sm:flex md:flex-row md:items-center lg:pl-3">
          <div className="">
            <h3 className="text-lg  font-semibold text-slate-100">
              Top-Up History
            </h3>
            <p className="text-lg text-slate-100">
              Overview of the Top-Up History.
            </p>
          </div>
          <div className="mt-3 md:mt-0  ">
            <div className="relative flex max-w-full gap-3 md:gap-5 md:max-w-lg">
              <div className="relative ">
                <input
                     className="w-full h-10 py-2 pl-3 text-lg transition duration-200 border rounded shadow-sm text-gray-100 bg-[#1a8ab280] pr-11 placeholder:text-slate-100  border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-100 focus:shadow-md"
                  placeholder="Search..."
                />
                <button
                  className="absolute flex items-center justify-center w-8 h-8 text-gray-100 rounded right-1 top-1"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setOpenModel(true)}
                className="px-3 py-2 text-base font-semibold text-center  rounded shadow-sm text-gray-100 bg-[#177b9f80] hover:bg-[#27596b80] hover:text-[#ffeded] focus:outline-none"
              >
                Re-Top-Up 
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full h-full mt-4 overflow-x-auto text-gray-300 shadow-md ">
          {loading ? (
            <Loader/>
          ) : (
            <table className="w-full min-w-full mt-2 text-left border table-auto text-gray-900">
              <thead className="text-white bg-black">
                <tr>
                  <th className="p-4 text-base  font-normal border-b border-slate-200">
                    Topup To
                  </th>
                  <th className="p-4 text-base  font-normal border-b border-slate-200">
                    Amount
                  </th>
                  <th className="p-4 text-base  font-normal border-b border-slate-200">
                    Status
                  </th>
                  <th className="w-56 p-4 text-base  font-normal border-b border-slate-200">
                    Request
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-100 bg-[#01415859]">
                {singletopup?.length > 0 ? (
                  singletopup
                    ?.slice()
                    .reverse()
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="text-gray-100 even:bg-[#7e66c5b3] even:text:white"
                      >
                        <td className="py-4 pl-4 pr-3 text-base font-medium whitespace-nowrap sm:pl-3">
                          {item?.userto_email}
                        </td>
                        <td className="px-3 py-4 text-base ">
                          ${item?.amount}
                        </td>
                        <td className="px-3 py-4 text-base ">
                          {item?.status}
                        </td>
                        <td className="px-3 py-4 text-base ">
                          {item?.createdAT}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 text-lg text-center text-gray-200 bg-[#4b1725ab]"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {modalOpen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deleteTopup}
          id={deleteID}
        />
      )}
      {openModel && (
        <UserTopupModel openModel={openModel} modelClose={modelClose} />
      )}
    </>
  );
}
