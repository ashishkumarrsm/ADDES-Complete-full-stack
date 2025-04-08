import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import Loader from "../BaseFile/comman/Loader";
import { getAllDepositeByid } from "../redux/depositeSlice";
import { getAllWithdrawalByid } from "../redux/withdrawalSlice";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
const statuses = {
  pending: "text-green-700 bg-green-50 ring-green-600/20",
  complete: "text-gray-600 bg-gray-50 ring-gray-500/10",
  inprogress: "text-red-700 bg-red-50 ring-red-600/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function UserTransaction() {
  const dispatch = useDispatch();
  const { singleDeposite, loading, error, message } = useSelector(
    (state) => state.alldeposite
  );
  const { singleWithdrawal } = useSelector((state) => state.allwithdrawal);

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.id) {
      dispatch(getAllDepositeByid(auth?.id));
      dispatch(getAllWithdrawalByid(auth?.id));
    }
  }, [auth?.id]);
  let combinedArray = [];

  const depositsWithType =
    singleDeposite?.map((deposit) => ({ ...deposit, type: "deposit" })) || [];
  const withdrawalsWithType =
    singleWithdrawal?.map((withdrawal) => ({
      ...withdrawal,
      type: "withdrawal",
    })) || [];

  if (withdrawalsWithType.length > 0) {
    combinedArray = [...depositsWithType, ...withdrawalsWithType];
    combinedArray.sort((a, b) => new Date(a.createdAT) - new Date(b.createdAT));
  }

  return (
    <>
      {loading ? (
        <Loader isLoading={loading}/>
      ) : (
        <div className="w-full ">
          <div className="relative overflow-x-auto rounded-sm">
            <table className="min-w-full divide-y border border-white/50 divide-[#7d7df7]">
              <thead className="sticky top-0 text-gray-100  bg-black ">
                <tr className="py-2">
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 px-3 text-left text-base font-medium  border-b border-gray-300"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-base font-medium  border-b border-gray-300"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-base font-medium  border-b border-gray-300"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-base font-medium  border-b border-gray-300"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-base font-medium  border-b border-gray-300"
                  >
                    Accept At
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-base font-medium  border-b border-gray-300"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-200 bg-[#01415859]">
              {combinedArray?.length > 0 ? (
                combinedArray
                  ?.slice(-8)
                  .reverse()
                  .map((transaction) => (
                    <tr key={transaction.id} className=" even:bg-[#51530ec4] even:text:white">
                      <td className="px-2 py-3 text-lg whitespace-nowrap">
                        {transaction.id}
                      </td>
                      <td className="px-2 py-2 text-lg whitespace-nowrap">
                        {new Date(transaction.createdAT).toLocaleDateString()}{" "}
                        {new Date(transaction.createdAT).toLocaleTimeString()}
                      </td>
                      <td className="px-2 py-2 text-lg whitespace-nowrap">
                        {transaction.type}
                      </td>
                      <td className="px-2 py-2 text-lg whitespace-nowrap">
                        $ {transaction.amount}
                      </td>
                      <td className="px-2 py-2 text-lg whitespace-nowrap">
                        {transaction.acceptat || " - - "}
                      </td>
                      <td className="px-2 py-2 text-lg whitespace-nowrap">
                        {transaction.status === "complete" ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ) : transaction.status === "pending" ? (
                          <ClockIcon className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 text-lg text-center text-white bg-[#4b1725ab] "
                      >
                        No data available
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
