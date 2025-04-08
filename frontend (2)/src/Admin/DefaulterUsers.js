import { useState, useEffect } from "react";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { RiLoginCircleFill } from "react-icons/ri";
import Loader from "../BaseFile/comman/Loader";
import { getAllNonUsers,clearErrors,clearMessage } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SendRewardNotiModel from "./SendRewardNotiModel";

export default function DefaulterUsers() {
  const dispatch = useDispatch();
  const { allnonusers, loading ,error,message} = useSelector((state) => state.allusers);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllNonUsers());
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


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
  };
  const handleNoti = (id) => {
    setUserId(id);
  };
  const isClose = () => {
    setUserId(null);
  };

  return (
    <div className="p-4">
      <div className="pt-5">
        <label htmlFor="email" className="sr-only">
          Search using email
        </label>
        <input
          id="search"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          type="text"
          placeholder="search here . . ."
          className="block px-2 py-2 w-full text-gray-900 rounded-md border-0 ring-1 ring-inset ring-gray-300 shadow-sm md:max-w-sm placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
        />
      </div>
     
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}

      <div className={` ${loading ? "items-center h-[560px]" : "h-full"}`}>
        {loading ? (
          <Loader />
        ) : (
          <div className="flow-root mt-4">
            <div className="overflow-x-auto">
              <div className="py-2">
                <table className="w-full border border-gray-700 divide-y divide-gray-700">
                  <thead className="text-base leading-6 text-gray-100 bg-black border-b border-white/10">
                    <tr>
                      <th className="px-2 ml-4 font-medium text-left text-white border border-gray-700">
                        S.No
                      </th>
                      <th className="px-2 ml-4 font-medium text-left text-white border border-gray-700">
                        E-mail
                      </th>
                      <th className="px-2 py-4 font-medium text-center text-white border border-gray-700">
                        Username
                      </th>
                      <th className="px-2 py-4 font-medium text-center text-white border border-gray-700">
                        Fullname
                      </th>
                      <th className="px-2 py-4 font-medium text-center text-white border border-gray-700">
                       Title
                      </th>
                      <th className="px-2 py-4 font-medium text-center text-white border border-gray-700">
                        Amount
                      </th>
                      <th className="px-2 py-4 font-medium text-center text-white border border-gray-700">
                        Created at
                      </th>
                      <th className="px-2 py-4 font-medium text-center text-white border border-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allnonusers?.length > 0 ? (
                      allnonusers?.map((item, index) => (
                      <tr
                        key={index}
                        className="text-gray-100 transition-colors duration-200 even:bg-blue-200 even:text:white"
                      >
                         <td className="px-4 py-4 text-center text-white border border-gray-700">
                          <div className="text-base text-gray-400">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="gap-x-4 justify-center tems-center">
                            <div className="w-full text-base font-medium leading-6 text-white truncate">
                              {item?.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="gap-x-4 justify-center tems-center">
                            <div className="w-full text-base font-medium leading-6 text-white truncate">
                              {item?.username}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="gap-x-4 justify-center tems-center">
                            <div className="w-full text-base font-medium leading-6 text-white truncate">
                              {item?.fullname}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="gap-x-4 justify-center tems-center">
                            <div className="w-full text-base font-medium leading-6 text-white truncate">
                              {item?.title || "NA"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="gap-x-4 justify-center tems-center">
                            <div className="w-full text-base font-medium leading-6 text-white truncate">
                              {item?.amount || "NA"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="gap-x-4 justify-center tems-center">
                            <div className="w-full text-base font-medium leading-6 text-white truncate">
                              {(item?.created_at)?.slice(0,10) || "NA"}
                            </div>
                          </div>
                        </td>
                       
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          <div className="flex justify-center items-center space-x-2">
                            <button onClick={() => handleNoti(item.id)}>
                              <RiLoginCircleFill />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))) : (
                      <tr>
                        <td className="px-4 py-6 text-center text-gray-900 bg-blue-200 border border-gray-400">
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

    
      {userId && (
        <SendRewardNotiModel
          userId={userId}
          isClose={isClose}
        />
      )}

    
    </div>
  );
}
