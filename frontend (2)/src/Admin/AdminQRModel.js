import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { addQrLink, clearErrors, clearMessage } from "../redux/qrSlice";

export default function AdminQRModel({ openModel, modelClose }) {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.qr);
  const [values, setValues] = useState({});

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (form.checkValidity()) {
      console.log(values);
      dispatch(addQrLink({ values }));
      modelClose();
    } else {
      form.reportValidity();
    }
  };

  return (
    <>
      <Dialog open={openModel} onClose={modelClose} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-75"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative p-3 bg-[#0b90c280] rounded-md  text-left text-gray-100 transition-all transform border  w-full sm:max-w-md"
            >
              <div className="max-w-2xl mx-auto bg-[#0b91c298] shadow-lg rounded-lg relative">
                <div className=" flex items-center px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-100">
                    Payment Setting Form
                  </h2>
                  <button onClick={modelClose} className="group ">
                    <div class="group flex  cursor-pointer items-center justify-center bg-black/50   h-[60px] w-[60px] rounded-full absolute -top-8 -right-8">
                      <div class="space-y-2">
                        <span class="block h-1 w-10 origin-center rounded-full bg-slate-100 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                        <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSaveChanges}
                  className="px-6 py-6 space-y-6"
                >
                  {/* USDT BEP20 Section */}
                  <div>
                    {/* <h3 className="text-base font-semibold  text-gray-100 mb-2">
                      USDT BEP20
                    </h3> */}
                    <label
                      htmlFor="BEB20"
                      className="block text-sm font-medium  text-gray-100"
                    >
                      USDT BEP20
                    </label>
                    <input
                      type="text"
                      id="BEB20"
                      name="BEB20"
                       placeholder="BEP20 QR Link"
                      value={values.BEB20}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 placeholder:text-gray-400 border rounded-md shadow-sm text-gray-100 bg-[#0b91c2b0] focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* USDT TRC20 Section */}
                  <div>
                    {/* <h3 className="text-base font-semibold text-gray-100 mb-2">
                      USDT TRC20
                    </h3> */}
                    <label
                      htmlFor="TRC20"
                      className="block text-sm font-medium  text-gray-100"
                    >
                      USDT TRC20
                    </label>
                    <input
                      type="text"
                      id="TRC20"
                      name="TRC20"
                      placeholder="TRC20 QR Link"
                      value={values.TRC20}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border placeholder:text-gray-400 rounded-md bg-[#0b91c2b0] shadow-sm text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={modelClose}
                      className="px-4 py-2 text-gray-200 border border-white/50 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-indigo-600 rounded-md border border-white/50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {loading ? <Spinner /> : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
