import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { QRCode } from "react-qrcode";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import {
  addQrLink,
  getQrLink,
  deleteQrLink,
  clearErrors,
  clearMessage,
} from "../redux/qrSlice";
import { useQRCode } from "react-qrcode";

import { AiFillDelete } from "react-icons/ai";
import Loader from "../BaseFile/comman/Loader";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import AdminQRModel from "./AdminQRModel";
const AdminQrLink = () => {
  const dispatch = useDispatch();
  const { qr, loading, message, error } = useSelector((state) => state.qr);
  const [qrLink, setQrLink] = useState("");
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(null);

  useEffect(() => {
    dispatch(getQrLink());
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
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="p-4 my-5 lg:mx-3 sm:mx-3">
        <div className="flex justify-between items-center mb-4 w-full">
          <div>
            <h3 className="text-lg font-semibold t">Pyemnt Settings Detail</h3>
            <p className="text-lg">Overview of the Deposite History.</p>
          </div>
          <div className="ml-3">
            <div className="flex relative gap-3 items-center w-full max-w-sm">
              <div className="relative">
                <input
                  className="py-2 pr-11 pl-3 w-full h-10 text-lg text-gray-900 rounded border shadow-sm transition duration-200 placeholder:text-slate-900 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 focus:shadow-md"
                  placeholder="Search for..."
                />
                <button
                  className="flex absolute top-1 right-1 items-center px-2 my-auto w-8 h-8 rounded"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-8 h-8 text-slate-900"
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
                className="block py-2 text-gray-900 bg-blue-200 rounded-sm sm:w-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Payment settings
              </button>
            </div>
          </div>
        </div>

        <div className={`${loading ? "items-center h-[260px]" : "h-full"}`}>
          {loading ? (
            <Loader />
          ) : (
            <div className="py-6">
              <div className="flow-root">
                <div className="overflow-x-auto">
                  <div className="inline-block py-2 min-w-full align-middle">
                    <h2 className="text-lg font-semibold">QR Link History</h2>
                    <table className="overflow-hidden min-w-full divide-y divide-gray-700">
                      <thead className="px-3 py-2 text-sm leading-6 text-left text-gray-100 bg-black border border-b">
                        <tr>
                          <th
                            scope="col"
                            className="hidden px-3 py-2 font-medium sm:table-cell"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-2 font-medium sm:table-cell"
                          >
                            USDT BEP20
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-2 font-medium sm:table-cell"
                          >
                            USDT TRC20
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 font-medium text-left"
                          >
                            Created_At
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-2 font-medium text-left sm:table-cell"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="px-3 py-2 text-base text-left text-gray-900 bg-blue-200 divide-y divide-white/5">
                        <tr className="text-gray-900 even:bg-blue-200">
                          <td className="hidden px-3 py-2 sm:table-cell">
                            <div className="font-mono leading-6">{qr?.id}</div>
                          </td>
                          <td className="hidden px-3 py-2 sm:table-cell">
                            <div className="font-mono leading-6">
                              ${qr?.BEB20}
                            </div>
                          </td>
                          <td className="hidden px-3 py-2 sm:table-cell">
                            <div className="font-mono leading-6">
                              ${qr?.TRC20}
                            </div>
                          </td>
                          <td className="hidden px-3 py-2 sm:table-cell">
                            <div className="px-2 py-1 text-xs font-medium rounded-md ring-1 ring-inset bg-gray-700/40 ring-white/10">
                              {qr?.createdAT}
                            </div>
                          </td>
                          <td className="px-3 py-2 leading-6 text-left sm:table-cell">
                            <div className="flex space-x-4">
                              <AiFillDelete
                                className="w-4 h-4 text-red-400 cursor-pointer"
                                onClick={() => handleDelete(qr?.id)}
                                title="Delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {modalOpen && (
          <Confirmation
            isClose={isClose}
            deletefunction={deleteQrLink}
            id={deleteID}
          />
        )}
        {openModel && (
          <AdminQRModel openModel={openModel} modelClose={modelClose} />
        )}
      </div>
    </>
  );
};

export default AdminQrLink;
