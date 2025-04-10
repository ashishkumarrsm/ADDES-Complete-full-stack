import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/20/solid";
import { FiCheckCircle, FiGrid, FiList } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

// Import components
import Loader from "../BaseFile/comman/Loader";
import Spinner from "../BaseFile/comman/Spinner";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import UserPlanConfirmation from "./UserPlanConfirmation";
import UserEntryFeeConfirmation from "./UserEntryFeeConfirmation";

// Import Redux actions
import { getAllPlans } from "../redux/planSlice";
import { getUser } from "../redux/userSlice";
import { clearErrors, clearMessage } from "../redux/depositeSlice";

export default function UserPlan() {
  const dispatch = useDispatch();
  const { allplans, loading } = useSelector((state) => state.allplans);
  const { error, message } = useSelector((state) => state.alltopup);
  const { auth } = useSelector((state) => state.auth);
  const { singleuser } = useSelector((state) => state.allusers);

  const [planConfirm, setPlanConfirm] = useState(false);
  const [plan, setPlan] = useState();
  const [entryPlanModel, setEntryPlanModel] = useState(false);
  const [activeView, setActiveView] = useState("cards"); // "cards" or "table"
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Effect for window resize tracking
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-switch to card view on small screens
  useEffect(() => {
    if (screenWidth < 768 && activeView === "table") {
      setActiveView("cards");
    }
  }, [screenWidth, activeView]);

  useEffect(() => {
    dispatch(getAllPlans());
    if (auth?.id) {
      dispatch(getUser(auth.id));
    }
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
  }, [dispatch, auth?.id, error, message]);

  function handleBuyPlan(plan) {
    setPlan(plan);
    setPlanConfirm(true);
  }

  function isclose() {
    setPlan(null);
    setPlanConfirm(false);
    setEntryPlanModel(false);
  }

  function handleEntryPlan() {
    setEntryPlanModel(true);
  }

  // Prepare plans for display
  const getFormattedPlans = () => {
    if (singleuser?.entry_fees === 0) {
      return allplans?.filter(item => item.name === "entry");
    } else {
      return allplans?.filter(item => item.name !== "entry");
    }
  };

  const renderPlanCards = () => {
    const plansToShow = getFormattedPlans();
    
    if (!plansToShow || plansToShow.length === 0) {
      return <p className="text-center py-6">No plans available</p>;
    }

    return (
      <div className="w-full px-4 sm:px-6 py-8 mx-auto">
        {/* For mobile: Cards in a vertical list with pagination */}
        <div className="md:hidden">
          <Swiper
            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {plansToShow.map((plan, index) => (
              <SwiperSlide key={plan.id || index} className="pb-12">
                {renderSingleCard(plan, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* For desktop: 3D card effect */}
        <div className="hidden md:block max-w-md mx-auto lg:max-w-xl">
          <Swiper
            effect="cards"
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectCards, Autoplay]}
            className="mySwiper"
          >
            {plansToShow.map((plan, index) => (
              <SwiperSlide key={plan.id || index}>
                {renderSingleCard(plan, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  const renderSingleCard = (plan, index) => {
    return (
      <div className="flex flex-col bg-white text-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-500">
        {/* Plan Badge */}
        <div className="bg-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wider py-2 text-center">
          {plan.name}
        </div>

        {/* Image */}
        <div className="w-full flex items-center justify-center p-6 bg-gradient-to-r from-indigo-100 to-indigo-200">
          <img
            src={`https://themaxpro.com/userauth/assets/images/pattern/${index + 1}.png`}
            alt={plan.name}
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Text Content */}
        <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
          <div>
            {/* Price */}
            <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2 text-center">{plan.description}</div>

            {/* Benefits */}
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <li className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm md:text-base">
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <span>{plan.ROI_day} ROI Overall</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm md:text-base">
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <span>{plan.Sponser_bonus}% Sponsor Bonus</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm md:text-base">
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Participants must be at least 18 years old</span>
              </li>
            </ul>
          </div>

          {/* Button */}
          <button 
            onClick={() => plan.name === "entry" ? handleEntryPlan() : handleBuyPlan(plan)}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl text-sm sm:text-base font-semibold transition-all duration-300"
          >
            {loading ? <Spinner /> : `Buy ${plan.name} Plan`}
          </button>
        </div>
      </div>
    );
  };

  const renderPlanTable = () => {
    const plansToShow = getFormattedPlans();

    return (
      <div className="w-full px-4 sm:px-6 mx-auto overflow-x-auto">
        <div className="isolate p-2 sm:p-5">
          <table className="min-w-full border shadow-xl">
            <thead className="bg-blue-500 py-1">
              <tr className="text-white border-b border-gray-300">
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                  Plan Name
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                  Package Price
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                  ROI & Bonus
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold w-[150px] sm:w-[250px]">
                  T&C
                </th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900 bg-white">
              {plansToShow?.map((plan) => (
                <tr
                  key={plan?.id}
                  className="text-gray-900 even:bg-gray-300/50 even:text-gray-900 text-xs sm:text-sm border-b border-gray-400 transition duration-300"
                >
                  <td className="px-2 sm:px-6 py-3 sm:py-4 capitalize font-semibold">
                    {plan?.name}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    {plan?.description}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <CheckIcon className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">{plan?.ROI_day} ROI</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <CheckIcon className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">{plan?.Sponser_bonus}% Bonus</span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm w-[150px] sm:w-[250px]">
                    Participants must be at least 18 years old
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    <button
                      onClick={() => plan.name === "entry" ? handleEntryPlan() : handleBuyPlan(plan)}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-indigo-300 border border-indigo-200 rounded-md hover:bg-indigo-900 hover:text-white transition"
                    >
                      {loading ? <Spinner /> : "Buy Plan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      
      <div className="bg-gray-300/50  py-4">
        {/* Section Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Available Plans</h2>
          <p className="text-sm sm:text-base text-white mt-1">Select the plan that best suits your investment strategy</p>
        </div>
        
        {/* Toggle View Buttons - Show only on tablet and larger */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex justify-end">
          <div className="bg-white rounded-lg shadow-md inline-flex">
            <button 
              onClick={() => setActiveView("cards")} 
              className={`px-3 py-2 rounded-l-lg flex items-center gap-1 ${activeView === "cards" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}
            >
              <FiGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Card View</span>
            </button>
            <button 
              onClick={() => setActiveView("table")} 
              className={`px-3 py-2 rounded-r-lg flex items-center gap-1 ${
                activeView === "table" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
              } ${screenWidth < 768 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={screenWidth < 768}
            >
              <FiList className="h-4 w-4" />
              <span className="hidden sm:inline">Table View</span>
            </button>
          </div>
        </div>

        {/* Content based on active view */}
        <div className="transition-all duration-300">
          {activeView === "cards" || screenWidth < 768 ? renderPlanCards() : renderPlanTable()}
        </div>
      </div>

      {/* Plan Confirmation and Entry Fee Modals */}
      {planConfirm && <UserPlanConfirmation isclose={isclose} plan={plan} />}
      {entryPlanModel && <UserEntryFeeConfirmation isclose={isclose} />}
    </>
  );
}