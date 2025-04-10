
// "use client"

// import { useState, useEffect } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { useFormik } from "formik"
// import * as Yup from "yup"

// // Import necessary components
// import Spinner from "../comman/Spinner"
// import ErrorAlert from "../comman/ErrorAlert"
// import SuccessAlert from "../comman/SuccessAlert"
// import Header from "../../CoreFile/Header"
// import Footer from "../../CoreFile/Footer"

// // Import icons
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

// // Import Redux actions
// import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice"

// // Custom hook to get URL query parameters
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search)
// }

// export default function Registration() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const query = useQuery()

//   const { loading, error, message, auth } = useSelector((state) => state.auth)

//   const [referralCode, setReferralCode] = useState(null)
//   const [showPass, setShowPass] = useState(false)
//   const [termsAgreed, setTermsAgreed] = useState(false)

//   // Effect to handle referral code and authentication
//   useEffect(() => {
//     const referral = query.get("referral")
//     if (referral) {
//       setReferralCode(referral)
//     }

//     if (auth) {
//       navigate(`/${auth?.role}/dashboard`)
//     }

//     // Error and message clearing
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors())
//       }, 5000)
//       return () => clearTimeout(timer)
//     }

//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage())
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [query, auth, error, message, dispatch, navigate])

//   // Initial form values
//   const initialValues = {
//     fullname: "",
//     email: "",
//     username: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     referralBy: "",
//   }

//   // Validation schema
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     fullname: Yup.string().required("Full name is required").min(2, "Full name must be at least 2 characters"),
//     username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
//     phone: Yup.string()
//       .required("Phone number is required")
//       .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//         "Password must include uppercase, lowercase, number, and special character",
//       )
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm password is required"),
//   })

//   // Formik form handling
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async (values) => {
//       if (!termsAgreed) {
//         alert("Please agree to the Terms of Use")
//         return
//       }

//       if (referralCode) {
//         values.referralBy = referralCode
//       }

//       dispatch(signupUser(values))
//     },
//   })

//   return (
//     <>
//       <Header />
//       <div className="h-[75px]"></div>
//       <div className="flex min-h-screen bg-gradient-to-b from-slate-900 to-black">
//         {/* Left Side - Illustration */}
//         <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8">
//           <div className="relative h-[600px] w-[600px]">
//             {/* Blue circle background */}
//             <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20"></div>

//             {/* Decorative elements */}
//             <div className="absolute left-[10%] top-[10%] text-gray-400">✕</div>
//             <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full border border-blue-500"></div>
//             <div className="absolute bottom-[15%] right-[15%] text-gray-400">✕</div>

//             {/* Dashed circle */}
//             <div className="absolute left-[20%] top-[30%] h-[150px] w-[150px] rounded-full border-2 border-dashed border-blue-500/50"></div>

//             {/* Form illustration */}
//             <div className="absolute right-[15%] top-[15%] h-[250px] w-[200px] rotate-6 rounded-lg border-2 border-blue-600 bg-blue-400/80">
//               {/* User icon */}
//               <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-white">
//                 <div className="h-8 w-8 rounded-full border-2 border-blue-500"></div>
//               </div>
//               {/* Form lines */}
//               <div className="mx-auto mt-6 h-4 w-3/4 rounded-md bg-gray-200"></div>
//               <div className="mx-auto mt-4 h-4 w-3/4 rounded-md bg-gray-200"></div>
//               <div className="mx-auto mt-4 h-4 w-3/4 rounded-md bg-gray-200"></div>
//             </div>

//             {/* Paper airplane */}
//             <div className="absolute left-[30%] top-[40%] h-10 w-10 rotate-[-30deg] transform text-white">
//               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M21.75 1.5C21.55 1.5 21.35 1.55 21.2 1.65L2.73 12.4C2.28 12.65 2.03 13.15 2.13 13.65C2.23 14.15 2.63 14.5 3.13 14.55L10.5 15.5V20.5C10.5 21.05 10.95 21.5 11.5 21.5C11.85 21.5 12.15 21.3 12.3 21L14.55 16.5L19.2 17.25C19.25 17.25 19.3 17.25 19.35 17.25C19.8 17.25 20.2 17 20.35 16.55C20.5 16.15 20.45 15.7 20.15 15.35L12.85 2.9C12.6 2.6 12.15 2.45 11.75 2.5C11.35 2.55 11 2.85 10.9 3.2L9 9.5L3.5 12.5L21.85 2.15C22.15 1.95 22.3 1.6 22.25 1.25C22.2 0.9 21.95 0.65 21.6 0.55C21.65 0.55 21.7 0.5 21.75 0.5V1.5Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             </div>

//             {/* Person with laptop */}
//             <div className="absolute bottom-[15%] left-[20%]">
//               <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <ellipse cx="90" cy="120" rx="50" ry="30" fill="#3B82F6" />
//                 <path
//                   d="M70 80C70 80 65 100 70 120C75 140 90 140 90 140C90 140 105 140 110 120C115 100 110 80 110 80"
//                   stroke="white"
//                   strokeWidth="3"
//                 />
//                 <path d="M75 140L70 160M105 140L110 160" stroke="white" strokeWidth="2" />
//                 <rect x="70" y="160" width="10" height="5" rx="2" fill="white" />
//                 <rect x="100" y="160" width="10" height="5" rx="2" fill="white" />
//                 <path
//                   d="M90 80C100 80 105 70 105 60C105 50 100 40 90 40C80 40 75 50 75 60C75 70 80 80 90 80Z"
//                   fill="white"
//                 />
//                 <path d="M75 60C75 60 70 80 90 80C110 80 105 60 105 60" stroke="#3B82F6" strokeWidth="2" />
//                 <path d="M70 100L110 100L120 120L60 120L70 100Z" fill="#111827" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center px-4 py-8 md:px-8">
//           <div className="w-full max-w-md">
//             <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
//                 REGISTRATION
//               </h2>

//               <form onSubmit={formik.handleSubmit} className="space-y-5">
//                 {/* Full Name */}
//                 <div>
//                   <label htmlFor="fullname" className="block text-sm font-medium text-blue-300 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="fullname"
//                     name="fullname"
//                     placeholder="Name..."
//                     value={formik.values.fullname}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                   />
//                   {formik.touched.fullname && formik.errors.fullname && (
//                     <p className="mt-1 text-xs text-red-400">{formik.errors.fullname}</p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Email address..."
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                   />
//                   {formik.touched.email && formik.errors.email && (
//                     <p className="mt-1 text-xs text-red-400">{formik.errors.email}</p>
//                   )}
//                 </div>

//                 {/* Username */}
//                 <div>
//                   <label htmlFor="username" className="block text-sm font-medium text-blue-300 mb-1">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     placeholder="Username..."
//                     value={formik.values.username}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                   />
//                   {formik.touched.username && formik.errors.username && (
//                     <p className="mt-1 text-xs text-red-400">{formik.errors.username}</p>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-blue-300 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="Phone number..."
//                     value={formik.values.phone}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                   />
//                   {formik.touched.phone && formik.errors.phone && (
//                     <p className="mt-1 text-xs text-red-400">{formik.errors.phone}</p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-blue-300 mb-1">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPass ? "text" : "password"}
//                       id="password"
//                       name="password"
//                       placeholder="••••••••••••"
//                       value={formik.values.password}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPass(!showPass)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                     >
//                       {showPass ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
//                     </button>
//                   </div>
//                   {formik.touched.password && formik.errors.password && (
//                     <p className="mt-1 text-xs text-red-400">{formik.errors.password}</p>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-300 mb-1">
//                     Confirm Password
//                   </label>
//                   <input
//                     type={showPass ? "text" : "password"}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     placeholder="••••••••••••"
//                     value={formik.values.confirmPassword}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                   />
//                   {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                     <p className="mt-1 text-xs text-red-400">{formik.errors.confirmPassword}</p>
//                   )}
//                 </div>

//                 {/* Referral Code */}
//                 <div>
//                   <label htmlFor="referralBy" className="block text-sm font-medium text-blue-300 mb-1">
//                     Referral Code
//                   </label>
//                   <input
//                     id="referralBy"
//                     name="referralBy"
//                     placeholder="Enter Referral Code"
//                     type="text"
//                     value={referralCode || formik.values.referralBy}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all"
//                     disabled={!!referralCode}
//                   />
//                 </div>

//                 {/* Terms Agreement */}
//                 <div className="flex items-center mt-4">
//                   <input
//                     type="checkbox"
//                     id="agreeToTerms"
//                     name="agreeToTerms"
//                     checked={termsAgreed}
//                     onChange={() => setTermsAgreed(!termsAgreed)}
//                     className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
//                     I agree to the{" "}
//                     <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
//                       Terms of Use
//                     </a>
//                   </label>
//                 </div>

//                 {/* Submit Button and Login Link */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
//                   <button
//                     type="submit"
//                     disabled={loading || !termsAgreed}
//                     className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? <Spinner /> : "Sign Up"}
//                   </button>

//                   <Link
//                     to="/user/login"
//                     className="text-blue-400 hover:text-blue-300 text-sm hover:underline transition-colors"
//                   >
//                     Login Here
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* Error and Success Alerts */}
//       {error && <ErrorAlert error={error} />}
//       {message && <SuccessAlert message={message} />}
//     </>
//   )
// }













"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"

// Import necessary components
import Spinner from "../comman/Spinner"
import ErrorAlert from "../comman/ErrorAlert"
import SuccessAlert from "../comman/SuccessAlert"
import Header from "../../CoreFile/Header"
import Footer from "../../CoreFile/Footer"

// Import icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

// Import Redux actions
import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice"

// Custom hook to get URL query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export default function Registration() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()

  const { loading, error, message, auth } = useSelector((state) => state.auth)

  const [referralCode, setReferralCode] = useState(null)
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)

  // Effect to handle referral code and authentication
  useEffect(() => {
    const referral = query.get("referral")
    if (referral) {
      setReferralCode(referral)
    }

    if (auth) {
      navigate(`/${auth?.role}/dashboard`)
    }

    // Error and message clearing
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors())
      }, 5000)
      return () => clearTimeout(timer)
    }

    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [query, auth, error, message, dispatch, navigate])

  // Initial form values
  const initialValues = {
    fullname: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralBy: "",
  }

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    fullname: Yup.string().required("Full name is required").min(2, "Full name must be at least 2 characters"),
    username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character",
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })

  // Formik form handling
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!termsAgreed) {
        alert("Please agree to the Terms of Use")
        return
      }

      if (referralCode) {
        values.referralBy = referralCode
      }

      dispatch(signupUser(values))
    },
  })

  return (
    <>
      <Header />
      <div className="h-[75px]"></div>

      {/* Main container with background image */}
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/uptrend-market-strategies-insights-navigating-maximize-gains-minimize-risks_960330-11481.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid&w=740')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-4xl">
          {/* Glass card container */}
          <div className="backdrop-blur-md bg-black/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Left side - Branding */}
              <div className="md:w-2/5 bg-blue-900 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white mb-2">Join our community</h2>
                  <p className="text-blue-200 mb-8">
                    Create an account to get started with our platform and unlock all features.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-white">Access to premium features</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-white">Personalized dashboard</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-white">24/7 customer support</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-blue-200">Already have an account?</p>
                  <Link
                    to="/user/login"
                    className="block mt-2 text-white font-medium hover:text-blue-300 transition-colors"
                  >
                    Sign in here →
                  </Link>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="md:w-3/5 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Create Account</h2>
                  <p className="text-gray-300 mt-2">Fill in your details to get started</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="John Doe"
                      value={formik.values.fullname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                    />
                    {formik.touched.fullname && formik.errors.fullname && (
                      <p className="mt-1 text-xs text-red-400">{formik.errors.fullname}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-xs text-red-400">{formik.errors.email}</p>
                    )}
                  </div>

                  {/* Username and Phone in same row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Username */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                      />
                      {formik.touched.username && formik.errors.username && (
                        <p className="mt-1 text-xs text-red-400">{formik.errors.username}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="1234567890"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="mt-1 text-xs text-red-400">{formik.errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Password and Confirm Password in same row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="••••••••••••"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPass ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                        </button>
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <p className="mt-1 text-xs text-red-400">{formik.errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="••••••••••••"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showConfirmPass ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                        </button>
                      </div>
                      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-400">{formik.errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Referral Code */}
                  <div>
                    <label htmlFor="referralBy" className="block text-sm font-medium text-gray-300 mb-1">
                      Referral Code <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      id="referralBy"
                      name="referralBy"
                      placeholder="Enter Referral Code"
                      type="text"
                      value={referralCode || formik.values.referralBy}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                      disabled={!!referralCode}
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={termsAgreed}
                      onChange={() => setTermsAgreed(!termsAgreed)}
                      className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
                      I agree to the{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
                        Terms of Use
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !termsAgreed}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Spinner /> : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Error and Success Alerts */}
      {error && <ErrorAlert error={error} />}
      {message && <SuccessAlert message={message} />}
    </>
  )
}
