import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../BaseFile/comman/Loader";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { getQrLink } from "../redux/qrSlice";
import { AiFillDelete } from "react-icons/ai";
import {
  getAllDepositeByid,
  deleteDeposite,
  clearErrors,
  clearMessage,
} from "../redux/depositeSlice";
import UserDepositeModel from "./UserDepositeModel";
import WalletConnection from "./WalletConnection";
// import USDTransactions from "./UserUSDTransacations";

const UserDepostie = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { singleDeposite, loading, error, message } = useSelector(
    (state) => state.alldeposite
  );
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(getQrLink());
    dispatch(getAllDepositeByid(auth?.id));
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
  }, [dispatch, error, message, auth?.id]);

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
  const handleImageClick = (imageName) => {
    setPreviewImage(`/uploads/${imageName}`);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  return (
    <>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="my-5 ">
      <WalletConnection />
        {/* <div className="flex-col items-center justify-between w-full mt-8 mb-3 lg:flex sm:flex sm:flex-row ">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-200">
              Deposit History
            </h3>
            <p className="text-sm text-gray-300">
              Overview of the Deposit History.
            </p>
          </div>
          <div className="w-full lg:ml-3 sm:ml-3 sm:w-auto">
            <div className="relative flex max-w-full gap-2 sm:gap-5 sm:max-w-sm">
              <div className="relative flex-grow">
                <input
                  className="w-full h-10 py-2 pl-3 text-sm transition duration-200 border rounded shadow-sm bg-blue-900/50 pr-11 placeholder:text-slate-400 text-slate-200 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 focus:shadow-md"
                  placeholder="Search for invoice..."
                />
                <button
                  className="absolute flex items-center w-8 h-8 px-2 my-auto bg-blue-900 rounded right-1 top-1"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-300"
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
          </div>
        
        </div> */}
     
      
{/*       
        <div className="relative flex flex-col w-full h-full py-1 mb-4 text-gray-300 rounded-lg shadow-md bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border table-auto min-w-max bg-blue-900/50">
                <thead>
                  <tr>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Email
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Amount
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Currency
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Status
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Recipt
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Hash
                      </p>
                    </th>
                    <th className="p-2 border-b md:p-4 border-slate-200 ">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Request
                      </p>
                    </th>
                    <th className="w-16 p-2 border-b md:p-4 border-slate-200">
                      <p className="text-xs font-normal leading-none text-white md:text-sm">
                        Accept
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-green-900/50">
                  {singleDeposite?.length > 0 ? (
                    singleDeposite
                      ?.slice()
                      .reverse()
                      .map((item, index) => (
                        <tr
                          key={index}
                          className="text-gray-300 even:bg-red-900/50 even:text:white"
                        >
                          <td className="py-2 pl-4 pr-3 text-xs font-medium text-gray-300 whitespace-nowrap md:py-4 md:text-sm sm:pl-3">
                            {item?.email}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            ${item?.amount}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            {item?.currency}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            {item?.status}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            <div className="flex items-center space-x-2">
                              {item?.image_name && (
                                <button
                                  onClick={() =>
                                    handleImageClick(item?.image_name)
                                  }
                                  className="text-blue-400 hover:underline"
                                >
                                  {item?.image_name?.slice(0, 10)}
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            {item?.hash}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            {item?.createdAT
                              ? new Date(item?.createdAT).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap md:py-4 md:text-sm">
                            {item?.acceptat
                              ? new Date(item?.acceptat).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-4 text-sm text-center text-gray-400 bg-red-900/50"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div> */}
      </div>

      {previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="object-contain max-w-full max-h-screen"
            />
            <button
              onClick={handleClosePreview}
              className="absolute p-2 text-xl text-white bg-black rounded-full top-2 right-2"
            >
              ×  
            </button>
          </div>
        </div>
      )}

   
      {modalOpen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deleteDeposite}
          id={deleteID}
        />
      )}

      {openModel && (
        <UserDepositeModel openModel={openModel} modelClose={modelClose} />
      )}
    </>
  );
};

export default UserDepostie;
