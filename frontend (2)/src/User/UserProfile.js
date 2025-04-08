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
    <>
      <div
        className={`${loading ? "h-[560px] items-center" : "h-full"} h-screen`}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {message && <SuccessAlert message={message} />}
            {error && <ErrorAlert error={error} />}
            <div className="relative z-10 max-w-7xl mx-auto lg:mt-10  mt-4 ">
              <div className=" text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div>
                    <div className="">
                      <div className="bg-white rounded-sm shadow-sm  border-b border-gray-300 p-6 flex items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-[#fafafa] overflow-hidden flex items-center justify-center relative">
                            <img
                              src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid"
                              alt="User avatar"
                              className="w-full h-full object-cover"
                            />
                            {/* <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                              <Edit className="w-3 h-3 text-white" />
                            </div> */}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-gray-800">
                              {" "}
                              {singleuser?.username}{" "}
                            </h2>
                            <span className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded text-white uppercase tracking-wide">
                              Free Agent
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            {singleuser?.fullname}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#fafafa] p-6 text-gray-800 rounded-sm shadow-md space-y-4">
                      {/* User Details Grid */}
                      {[
                        { label: "Last Login", value: singleuser?.last_login },
                        { label: "Created At", value: singleuser?.created_at },
                        { label: "Referred By", value: singleuser?.reffer_by },
                        {
                          label: "Activation Date",
                          value: singleuser?.activation_date,
                        },
                        {
                          label: "Updated Date",
                          value: singleuser?.updated_at,
                        },
                        {
                          label: "Referral Code",
                          value:
                            singleuser?.active_plan !== 0
                              ? "Referral code not active"
                              : singleuser?.refferal_code,
                        },
                        { label: "Total Team", value: singleuser?.total_team },
                      ].map(({ label, value }, index) => (
                        <div
                          key={index}
                          className="flex justify-between border-b border-gray-500 pb-2"
                        >
                          <span className="font-medium ">
                            {label}
                          </span>
                          <span className="">{value || "-"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Left Column - Form Section */}
                  <div className="bg-white p-6 rounded-sm shadow-md text-gray-800 lg:mb-0 mb-20">
                    <h3 className="text-2xl text-gray-800 font-semibold mb-4">
                      Update Details
                    </h3>

                    <div className="space-y-4">
                      {/* Bep 20 Input */}
                      <div>
                        <label className="block font-medium mb-1">Bep 20</label>
                        <input
                          name="bep20"
                          onChange={handleChange}
                          defaultValue={singleuser?.bep20}
                          className="w-full p-3 bg-[#f1f2f3] text-gray-800 rounded-sm border border-white-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter Bep 20 value"
                        />
                      </div>

                      {/* Email Input */}
                      <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                          name="email"
                          onChange={handleChange}
                          defaultValue={singleuser?.email}
                          className="w-full p-3 bg-[#f1f2f3] text-gray-800 rounded-sm border border-white-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter Email"
                        />
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block font-medium mb-1">Phone</label>
                        <input
                          name="phone"
                          onChange={handleChange}
                          defaultValue={singleuser?.phone}
                          className="w-full p-3 bg-[#f1f2f3] text-gray-800 rounded-sm border border-white-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter Phone Number"
                        />
                      </div>

                      {/* Update Button */}
                      <div className="flex justify-end pt-4">
                      <button   onClick={handleSaveChanges} className="relative mt-4 bg-gray-800 px-5 py-2 font-semibold text-white rounded-sm overflow-hidden group">
                    <span className="relative z-10"> Update</span>
                    <span className="absolute inset-0 w-0 bg-gray-900/70 transition-all duration-500 group-hover:w-full"></span>
                  </button> 
                      </div>
                    </div>
                  </div>

                  {/* Right Column - User Details */}
                 
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
