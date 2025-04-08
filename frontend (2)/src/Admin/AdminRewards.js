import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import Loader from "../BaseFile/comman/Loader";
import { TbBinaryTree } from "react-icons/tb";
import { Dialog } from '@headlessui/react';
import {
  getAllRewards,
  clearErrors,
  clearMessage,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AdminRewards() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { allrewards, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  const [allUser, setAllUser] = useState(allrewards);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(10);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getAllRewards());
    setAllUser(allrewards);

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
  }, [dispatch, error, message, clearErrors, clearMessage]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setAllUser(
      allrewards?.filter((p) => p.username?.toLowerCase().includes(searchTerm))
    );
    setSearchQuery(e.target.value);
  };

  const totalPages = Math.ceil((searchQuery ? allUser : allrewards)?.length / itemsPerPage);
  const currentUsers = (searchQuery ? allUser : allrewards)?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    // dispatch(submitFormData(formData));
  };

  return (
    <div className="p-4 my-5 lg:mx-3 sm:mx-3">
      <div className="flex justify-between items-center">
      <div className="">
        <label htmlFor="email" className="sr-only">
          Search
        </label>
        <input
          id="search"
          name="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          type="text"
          placeholder="search here . . ."
          className="block w-[50vh] px-2 py-2   rounded-sm border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
        />
      </div>
      <div>
      <button
        className="px-4 py-2 text-gray-100 bg-blue-700 rounded"
        onClick={() => setIsOpen(true)}
      >
        Achiver
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="flex fixed inset-0 justify-center items-center">
          <div className="p-6 w-full max-w-md text-gray-900 bg-blue-200 rounded-lg border border-gray-300">
            <h2 className="text-lg font-semibold">Achiver form</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-lg font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="block px-3 py-2 mt-1 w-full text-base text-gray-900 border border-white/50 placeholder:text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium">Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block p-2 mt-1 w-full text-base text-gray-900 bg-white border border-black/50"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-lg text-white bg-blue-800 rounded-md border s hover:bg-blue-900"
                  
                >
                 Submit
                </button>
              </div>
            </form>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      </Dialog>
    </div>
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}

      <div
        className={`flex justify-center ${
          loading ? "items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="flow-root mt-4 w-full text-gray-100 bg-black">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <table className="min-w-full border divide-y divide-gray-700">
                  <thead className="text-base leading-6 border-b border-white/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-4 font-normal text-center border border-white/50"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 font-normal text-center border border-white/50"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 font-normal text-center border border-white/50"
                      >
                        Reward
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 font-normal text-center border border-white/50 sm:table-cell"
                      >
                        Reward Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(searchQuery ? allUser : currentUsers)?.length > 0 ? ((searchQuery ? allUser : currentUsers)?.map((item, index) => (
                      <tr
                        key={index}
                        className="text-gray-100 transition-colors duration-200 even:bg-blue-200 even:text:white"
                      >
                        <td className="px-4 py-4 text-center border border-white/50">
                          <div className="flex gap-2 justify-center items-center">
                            {item?.username || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center border border-white/50">
                          <div className="flex gap-2 justify-center items-center">
                            {item?.email || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center border border-white/50">
                          <div className="flex gap-2 justify-center items-center">
                            {item?.reward || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center border border-white/50 sm:table-cell">
                          <div className="flex gap-2 justify-center items-center">
                            {item?.reward_level || "-"}
                          </div>
                        </td>
                      </tr>
                    ))):(
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-4 text-center text-gray-900 bg-blue-200 border border-white/50"
                        >
                          No data found
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

      {/* Pagination Controls */}
      <div className="flex justify-between p-4">
        <button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
          className="px-4 py-2 text-lg text-white bg-indigo-600 rounded"
        >
          Previous
        </button>
        <div className="text-lg text-white">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePagination("next")}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-lg text-white bg-indigo-600 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
