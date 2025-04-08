import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getUser, clearErrors, clearMessage } from "../redux/userSlice";
import { getTreeData } from "../redux/referralSlice";
// import { getTreeData } from "../redux/referralSlice";
import { getctoListByid } from "../redux/ctoSlice";
export const UserSalaryDetails = () => {
  const dispatch = useDispatch();
  const { singleuser, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  console.log(singleuser)

  const { auth } = useSelector((state) => state.auth);
  //   const { treeData } = useSelector((state) => state.referralTree);
  useEffect(() => {
    // if (auth?.id) {
    //   dispatch(getUser(auth?.id));
    //   dispatch(getTreeData(auth?.refferal_code));
    // }

    dispatch(getUser());
    // if (error) {
    //   const errorInterval = setInterval(() => {
    //     dispatch(clearErrors());
    //   }, 3000);
    //   return () => clearInterval(errorInterval);
    // }
    // if (message) {
    //   const messageInterval = setInterval(() => {
    //     dispatch(clearMessage());
    //   }, 3000);
    //   return () => clearInterval(messageInterval);
    // }
  }, [dispatch, error, message, clearErrors, clearMessage]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border table-auto min-w-max text-gray-100">
          <thead className="text-gray-100 bg-black">
            <tr>
              <th className="p-4 border-b border-slate-200 ">Id</th>
              <th className="p-4 border-b border-slate-200 ">Username</th>
              <th className="p-4 border-b border-slate-200 ">Salary Start</th>
              <th className="p-4 border-b border-slate-200 ">Month Salary</th>
              <th className="p-4 border-b border-slate-200 ">Salary level</th>
              <th className="p-4 border-b border-slate-200 ">Total Salary</th>
            </tr>
          </thead>
          <tbody className="text-gray-100 bg-[#01415859]">
           
                <tr
                  className="text-gray-100 even:bg-[#51530ec4] even:text:white"
                >
                  <td className="py-4 pl-4 pr-3 text-base font-medium whitespace-nowrap sm:pl-3">
                    {singleuser?.id}
                  </td>
                  <td className="py-4 pl-4 pr-3 text-base font-medium whitespace-nowrap sm:pl-3">
                    {singleuser?.username}
                  </td>
                  <td className="px-3 py-4 text-base capitalize whitespace-nowrap">
                    {singleuser?.salary_start || 0}
                  </td>
                  <td className="py-4 pl-4 pr-3 text-base font-medium whitespace-nowrap sm:pl-3">
                    {singleuser?.month_salary || 0}
                  </td>
                  <td className="py-4 pl-4 pr-3 text-base font-medium whitespace-nowrap sm:pl-3">
                    {singleuser?.salary_level || 0}
                  </td>
                  <td className="px-3 py-4 text-base whitespace-nowrap">
                    {singleuser?.total_salary}
                  </td>
                </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
};
