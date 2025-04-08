import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { addTopup, clearErrors, clearMessage } from "../redux/topupSlice";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserPlanConfirmation({ isclose, plan, user_id }) {
  const [open, setOpen] = useState(true);
  const [amount, setAmount] = useState(plan?.min || 50);
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.alltopup);

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

  const isValidAmount =
    amount % 50 === 0 && amount >= plan?.min && amount <= plan?.max;

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (isValidAmount) {
      dispatch(
        addTopup({
          values: {
            id: plan?.id,
            userby_id: user_id,
            userto_id: user_id,
            amount: amount,
          },
        })
      );
      isclose();
    }
  };

  return (
    <Dialog open={open} onClose={isclose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden bg-[#0b91c296] rounded-lg text-gray-100  px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div className="flex items-center justify-center w-12 h-12 mx-auto  bg-green-100 rounded-full">
                <CheckIcon aria-hidden="true" className="w-6 h-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold leading-6">
                  Buy Plan?
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm">Are You Sure? Want to buy this Plan?</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveChanges}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-200">Enter Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={plan?.min}
                  max={plan?.max}
                  step="50"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 bg-[#0b91c296] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {!isValidAmount && (
                  <p className="mt-1 text-sm text-green-100">
                    Amount must be a multiple of 50 and between {plan?.min} and {plan?.max}
                  </p>
                )}
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={!isValidAmount}
                  className={`inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm sm:col-start-2 ${
                    isValidAmount
                      ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={isclose}
                  className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-100 bg-red-600 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:col-start-1 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
