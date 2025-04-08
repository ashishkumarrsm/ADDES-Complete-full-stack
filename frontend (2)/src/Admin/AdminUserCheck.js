import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader"
import SuccessAlert from "../BaseFile/comman/SuccessAlert"
import ErrorAlert from "../BaseFile/comman/ErrorAlert"
import { getUser, updateUsers,clearErrors, clearMessage } from "../redux/userSlice";
export default function AdminUserCheck() {
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
      }
    )
    );
  };
  return (
    <>
      <div
        className={`${
          loading ? "items-center h-[560px]" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
          <div className="my-3 space-y-4">
          <div className="">
            <div className="">
              <div className="overflow-hidden mx-auto max-w-7xl text-gray-900 bg-white rounded-sm border border-gray-300 shadow-md shadow-gray-200">
              <h2 className="px-6 py-3 mb-2 text-xl font-semibold capitalize bg-gray-200">
                    {singleuser?.username} Detail
                  </h2>
                <div className="px-6 py-4">
                {message && <SuccessAlert message={message} />}
                {error && <ErrorAlert error={error} />}
                  
                  <div className="lg:flex lg:space-x-4">
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Last Login
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.last_login || " - "}
                      </div>
                    </div>
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Created At
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.created_at || " - "}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 lg:flex lg:space-x-4">
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">Verify At</div>
                      <div className="text-gray-900">
                        {singleuser?.verify_at || " - "}
                      </div>
                    </div>
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Updated At
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.updated_at || " - "}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 lg:flex lg:space-x-4">
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">Reffer By</div>
                      <div className="text-gray-900">
                        {singleuser?.reffer_by || " - "}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 lg:flex lg:space-x-4">

                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Activation Date
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.activation_date || " - "}
                      </div>
                    </div>
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Paid Member
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.paid_member || " - "}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 lg:flex lg:space-x-4">
                  <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        level_month / month
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.level_month || " - "}
                      </div>
                    </div> 
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        ROI/day
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.roi_day || " - "}
                      </div>
                    </div>
                    </div>


                  <div className="mt-2 lg:flex lg:space-x-4">
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Refferal Code
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.refferal_code || " - "}
                      </div>
                    </div>
                    
                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        Total Team
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.total_team || " - "}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 lg:flex lg:space-x-4">
                    

                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        BEP20 Address
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.bep20 || " - "}
                      </div>
                    </div>

                    <div className="flex gap-8 lg:w-1/2">
                      <div className="font-medium text-gray-900">
                        TRC20 Address
                      </div>
                      <div className="text-gray-900">
                        {singleuser?.trc20 || " - "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* <div className="h-[2px] bg-black w-full " /> */}
            <div className="mb-4">
              
              <div className="overflow-hidden mx-auto max-w-7xl bg-white rounded border border-gray-300 shadow">
              <h2 className="px-6 py-3 mb-2 text-xl font-semibold capitalize bg-gray-200">
                    Editable Details
                  </h2>
              {message && <SuccessAlert message={message} />}
              {error && <ErrorAlert error={error} />}
                <div className="px-6 py-4">
                 
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Role
                      </label>
                      <select
                        name="role"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.role}
                        onChange={handleChange}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Status
                      </label>
                      <select
                        name="status"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.status}
                        onChange={handleChange}
                      >
                        <option value="unblock">unblock</option>
                        <option value="block">Block</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Is Active
                      </label>
                      <select
                        name="is_active"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.is_active}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Roi Status
                      </label>
                      <select
                        name="roi_status"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.roi_status}
                        onChange={handleChange}
                      >
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        level status
                      </label>
                      <select
                        name="level_status"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.level_status}
                        onChange={handleChange}
                      >
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.address || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Business
                      </label>
                      <input
                        type="number"
                        name="business"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.business || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Business Balance
                      </label>
                      <input
                        type="number"
                        name="business_balance"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.business_balance || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.fullname || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Phone
                      </label>
                      <input
                        type="number"
                        name="phone"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.phone || ""}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Forming ROI Status
                      </label>
                      <input
                        type="number"
                        name="forming_roi_status"
                        className="block mt-1 w-full rounded-md shadow-sm border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.forming_roi_status || ""}
                        onChange={handleChange}
                      />
                    </div> */}
                    {/* <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        level_month Status
                      </label>
                      <input
                        type="number"
                        name="level_month_status"
                        className="block mt-1 w-full rounded-md shadow-sm border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.level_month_status || ""}
                        onChange={handleChange}
                      />
                    </div> */}
                    {/* <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Zero Pin
                      </label>
                      <input
                        type="number"
                        name="zero_pin"
                        className="block mt-1 w-full rounded-md shadow-sm border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.zero_pin}
                        onChange={handleChange}
                      />
                    </div> */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-black">
                        Refferal By
                      </label>
                      <input
                        type="text"
                        name="reffer_by"
                        className="block p-2 mt-1 w-full text-black rounded-md border shadow-sm bg-gray-200/50 border-white/50 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        defaultValue={singleuser?.reffer_by}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div className="h-[20px]">
              
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
}