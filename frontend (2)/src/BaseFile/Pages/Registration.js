// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Spinner from "../comman/Spinner";
// import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice";
// import ErrorAlert from "../comman/ErrorAlert";
// import SuccessAlert from "../comman/SuccessAlert";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Header from "../../CoreFile/Header";
// import Footer from "../../CoreFile/Footer";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// export default function Registration() {
//   const [referralCode, setReferralCode] = useState(null);
//   const query = useQuery();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
// const { loading, error, message, auth } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const referral = query.get("referral");
//     if (referral) {
//       setReferralCode(referral);
//     }
//     if (auth) {
//       navigate(`/${auth?.role}/dashboard`);
//     }
//   }, [query, auth]);

//   const [showPass, setShowPass] = useState(false);

//   const initialValues = {
//     fullname: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     referralBy: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Incorrect email").required("Email is required"),
//     fullname: Yup.string().required("fullname is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm password is required"),
//     phone: Yup.number().required("Phone is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       if (referralCode) {
//         values.referralBy = referralCode;
//       }
//       dispatch(signupUser(values));
//     },
//   });

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors());
//       }, 10000);
//       return () => clearTimeout(timer);
//     }
//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//       }, 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, dispatch, message]);

//   return (
//     <>
//       <Header />
//       <div
//         className="flex relative justify-center items-center pt-28 pb-8 min-h-screen bg-center bg-cover"
//         style={{
//           backgroundImage: `url(https://img.freepik.com/free-photo/3d-rendering-money-tree_23-2151575474.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid)`,
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-80"></div>
//         <div className="flex flex-col justify-center items-center p-6">
//         <div className="grid overflow-hidden gap-y-8 items-center w-full max-w-7xl rounded-md shadow-lg md:grid-cols-2 bg-white/10">
//             <div className="flex relative flex-col justify-center w-full h-full bg-opacity-10 bg-green-600/50">
//               <div className="mx-auto space-y-6 max-w-md text-white">
//               <div className="mb-4 text-center">
//                 <div>
//                   <h2 className="text-3xl font-bold tracking-tight leading-9 text-left">
//                  Register 
//                   </h2>
//                 </div>
//               </div>
//                 <div>
//                   <h4 className="text-base font-semibold">Create Your Account</h4>
//                   <p className="mt-2 text-sm text-gray-200">
//                     Welcome! Get started by creating your account.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-base font-semibold">Simple & Secure</h4>
//                   <p className="mt-2 text-sm text-gray-200">
//                     Our process is secure and privacy-focused.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-base font-semibold">Agree to Terms</h4>
//                   <p className="mt-2 text-sm text-gray-200">
//                     Accept the terms & conditions during registration.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-base font-semibold">Agree to Terms</h4>
//                   <p className="mt-2 text-sm text-gray-200">
//                     Accept the terms & conditions during registration.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="relative p-8 mx-3 w-full max-w-lg text-gray-200 bg-opacity-10 rounded-r-lg shadow-lg backdrop-blur-lg bg-gray-800/50 sm:mx-0">

//               <form className="space-y-6" onSubmit={formik.handleSubmit}>
//                 <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//                   <div className="w-full">
//                     <label
//                       htmlFor="email"
//                       className="block text-base font-medium"
//                     >
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       required
//                       placeholder="Enter Email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className="block px-4 py-2 mt-2 w-full text-base placeholder-gray-200 bg-gray-700 bg-opacity-10 rounded-md border border-gray-500 backdrop-blur-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                       <p className="mt-2 text-xs text-red-500">
//                         {formik.errors.email}
//                       </p>
//                     )}
//                   </div>
//                   <div className="w-full">
//                     <label
//                       htmlFor="fullname"
//                       className="block text-base font-medium"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       id="fullname"
//                       name="fullname"
//                       type="text"
//                       required
//                       placeholder="Enter fullname"
//                       value={formik.values.fullname}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className="block px-4 py-2 mt-2 w-full text-base placeholder-gray-200 bg-gray-700 bg-opacity-10 rounded-md border border-gray-500 backdrop-blur-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {formik.touched.fullname && formik.errors.fullname && (
//                       <p className="mt-2 text-xs text-red-500">
//                         {formik.errors.fullname}
//                       </p>
//                     )}
//                   </div>

//                 </div>

//                 <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//                   <div className="w-full">
//                     <label
//                       htmlFor="password"
//                       className="block text-base font-medium"
//                     >
//                       Password
//                     </label>
//                     <div className="relative mt-2">
//                       <input
//                         id="password"
//                         name="password"
//                         placeholder="Enter password"
//                         type={showPass ? "text" : "password"}
//                         required
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="block px-4 py-2 w-full text-base placeholder-gray-200 bg-gray-700 bg-opacity-10 rounded-md border border-gray-500 backdrop-blur-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
//                       />
//                       <span
//                         onClick={() => setShowPass(!showPass)}
//                         className="absolute top-3 right-4 text-gray-300 cursor-pointer"
//                       >
//                         {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
//                       </span>
//                     </div>
//                     {formik.touched.password && formik.errors.password && (
//                       <p className="mt-2 text-xs text-red-500">
//                         {formik.errors.password}
//                       </p>
//                     )}
//                   </div>
//                   <div className="w-full">
//                     <label
//                       htmlFor="confirmPassword"
//                       className="block text-base font-medium"
//                     >
//                       Confirm Password
//                     </label>
//                     <div className="relative mt-2">
//                       <input
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         placeholder="Confirm Password"
//                         type={showPass ? "text" : "password"}
//                         required
//                         value={formik.values.confirmPassword}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="block px-4 py-2 w-full text-base placeholder-gray-200 bg-gray-700 bg-opacity-10 rounded-md border border-gray-500 backdrop-blur-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                     {formik.touched.confirmPassword &&
//                       formik.errors.confirmPassword && (
//                         <p className="mt-2 text-xs text-red-500">
//                           {formik.errors.confirmPassword}
//                         </p>
//                       )}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//                 <div className="w-full">
//                     <label
//                       htmlFor="username"
//                       className="block text-base font-medium"
//                     >
//                       Phone
//                     </label>
//                     <input
//                       id="phone"
//                       name="phone"
//                       type="number"
//                       placeholder="Enter Phone"
//                       required
//                       value={formik.values.phone}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className="block px-4 py-2 mt-2 w-full text-base placeholder-gray-200 bg-gray-700 bg-opacity-10 rounded-md border border-gray-500 backdrop-blur-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {formik.touched.phone && formik.errors.phone && (
//                       <p className="mt-2 text-xs text-red-500">
//                         {formik.errors.phone}
//                       </p>
//                     )}
//                   </div>
//                 <div>
// <label
//   htmlFor="referralBy"
//   className="block text-base font-medium"
// >
//   Referral Code
// </label>
// <input
//   id="referralBy"
//   name="referralBy"
//   placeholder="Enter Referral Code"
//   type="text"
//   required
//   value={referralCode || formik.values.referralBy}
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
//   className="block px-4 py-2 mt-2 w-full text-base placeholder-gray-200 bg-gray-700 bg-opacity-10 rounded-md border border-gray-500 backdrop-blur-lg focus:ring focus:ring-amber-500 focus:border-amber-500"
//   disabled={!!referralCode}
// />
//                 </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 w-full text-base text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring focus:ring-green-500 focus:ring-opacity-50"
//                   disabled={loading}
//                 >
//                   {loading ? <Spinner /> : "Sign Up"}
//                 </button>
//               </form>

              // <p className="mt-6 text-center">
              //   Already a member?{" "}
              //   <Link
              //     to="/user/login"
              //     className="font-medium hover:text-green-600 hover:underline"
              //   >
              //     Login Here
              //   </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       {/* Error and Success Alerts */}
//       {error && <ErrorAlert error={error} />}
//       {message && <SuccessAlert message={message} />}
//     </>
//   );
// }








































// "use client"

// import { useState } from "react"
// import Header from "../../CoreFile/Header"
// import Footer from "../../CoreFile/Footer"

// export default function Registration() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     username: "",
//     password: "",
//     repeatPassword: "",
//     agreeToTerms: false,
//   })

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("Form submitted:", formData)
//   }

//   return (
//     <>

//       <Header />
//       <div className="h-[80px]"></div>
//       <div className="flex w-full">
//         {/* Left side - Image with purple overlay */}
//         <div className="hidden relative md:block md:w-1/2">
//           <div
//             className="absolute inset-0 bg-black/30"
//             style={{
//               backgroundImage: "url('https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundBlendMode: "multiply",
//             }}
//           ></div>
//         </div>

//         {/* Right side - Form */}
//         <div className="flex flex-col justify-center p-8 w-full bg-white/50 md:w-1/2 md:p-12">
//           <div className="mx-auto w-full max-w-md">
//             <h1 className="mb-8 text-3xl font-bold uppercase">registration</h1>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="fullName" className="block mb-1 text-2xl font-bold text-white">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   placeholder="Name..."
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg round focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block mb-1 text-2xl font-bold text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Email address..."
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg round focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="username" className="block mb-1 text-2xl font-bold text-white">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="Username..."
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg round focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block mb-1 text-2xl font-bold text-white">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="••••••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg round focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//               </div>




//               <div>
//                 <label htmlFor="repeatPassword" className="block mb-1 text-2xl font-bold text-white">
//                   Repeat Password
//                 </label>
//                 <input
//                   type="password"
//                   id="repeatPassword"
//                   name="repeatPassword"
//                   placeholder="••••••••••••"
//                   value={formData.repeatPassword}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg round focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="agreeToTerms"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
//                 />
//                 <label htmlFor="agreeToTerms" className="block ml-2 text-sm text-white">
//                   I agree to the{" "}
//                   <a href="#" className="text-purple-600 hover:underline">
//                     Terms of Use
//                   </a>
//                 </label>
//               </div>

//               <div className="flex justify-between items-center pt-4">
//                 <button
//                   type="submit"
//                   className="px-8 py-2 text-white bg-gradient-to-r from-blue-500 rounded-full transition-opacity to-white/50 hover:opacity-90 hover:from-white/50 hover:to-blue-500"
//                 >
//                   Sign Up
//                 </button>
//                 <a href="#" className="text-gray-600 hover:text-gray-800">
//                   Sign In →
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

// <Footer/>

//     </>
//   )
// }

















































// "use client";

// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Spinner from "../comman/Spinner";
// import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice";
// import ErrorAlert from "../comman/ErrorAlert";
// import SuccessAlert from "../comman/SuccessAlert";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Header from "../../CoreFile/Header";
// import Footer from "../../CoreFile/Footer";

// export default function Registration() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, message, auth } = useSelector((state) => state.auth);

//   const [referralCode, setReferralCode] = useState(null);
//   const [showPass, setShowPass] = useState(false);

//   const initialValues = {
//     fullname: "",
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     referralBy: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     fullname: Yup.string().required("Full name is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm password is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       if (referralCode) {
//         values.referralBy = referralCode;
//       }
//       dispatch(signupUser(values));
//     },
//   });

//   useEffect(() => {
//     if (auth) {
//       navigate(`/${auth?.role}/dashboard`);
//     }
//     if (error) {
//       setTimeout(() => {
//         dispatch(clearErrors());
//       }, 5000);
//     }
//     if (message) {
//       setTimeout(() => {
//         dispatch(clearMessage());
//       }, 5000);
//     }
//   }, [auth, error, message]);

//   return (
//     <>
//       <Header />
//       <div className="h-[80px]"></div>
//       <div className="flex w-full">
//         {/* Left side - Image */}
//         <div className="hidden relative md:block md:w-1/2">
//           <div
//             className="absolute inset-0 bg-black/30"
//             style={{
//               backgroundImage:
//                 "url('https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundBlendMode: "multiply",
//             }}
//           ></div>
//         </div>

//         {/* Right side - Form */}
//         <div className="flex flex-col justify-center px-8 w-full bg-black/20 md:w-1/2 md:px-12">
      
//           <div className="p-5 my-4 bg-white bg-opacity-20 rounded-lg border-b border-gray-500 shadow-lg backdrop-filter backdrop-blur-lg">
//           <div className="mx-auto max-w-2xl">
//             <h2 className="mb-8 text-3xl font-bold text-white uppercase">Registration</h2>

//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="fullname" className="block mb-1 text-2xl font-bold text-white">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="fullname"
//                   name="fullname"
//                   placeholder="Name..."
//                   value={formik.values.fullname}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//                 {formik.touched.fullname && formik.errors.fullname && (
//                   <p className="mt-2 text-xs text-red-500">{formik.errors.fullname}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="email" className="block mb-1 text-2xl font-bold text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Email address..."
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="mt-2 text-xs text-red-500">{formik.errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="username" className="block mb-1 text-2xl font-bold text-white">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="Username..."
//                   value={formik.values.username}
//                   onChange={formik.handleChange}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block mb-1 text-2xl font-bold text-white">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="••••••••••••"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="mt-2 text-xs text-red-500">{formik.errors.password}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block mb-1 text-2xl font-bold text-white">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   placeholder="••••••••••••"
//                   value={formik.values.confirmPassword}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                 />
//                 {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                   <p className="mt-2 text-xs text-red-500">{formik.errors.confirmPassword}</p>
//                 )}
//               </div>


//               <div>
//                 <label
//                   htmlFor="referralBy"
//                   className="block mb-1 text-2xl font-bold text-white"
//                 >
//                   Referral Code
//                 </label>
//                 <input
//                   id="referralBy"
//                   name="referralBy"
//                   placeholder="Enter Referral Code"
//                   type="text"
//                   required
//                   value={referralCode || formik.values.referralBy}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
//                   disabled={!!referralCode}
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="agreeToTerms"
//                   name="agreeToTerms"
//                   className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
//                 />
//                 <label htmlFor="agreeToTerms" className="block ml-2 text-sm text-white">
//                   I agree to the{" "}
//                   <a href="#" className="font-bold text-blue-400 hover:underline">
//                     Terms of Use
//                   </a>
//                 </label>
//               </div>

//               <div className="flex justify-between items-center pt-4">
//                 {/* <button
//                   type="submit"
//                   className="px-8 py-2 text-white bg-gradient-to-r from-blue-500 rounded-full transition-opacity to-white/50 hover:opacity-90 hover:from-white/50 hover:to-blue-500"
//                 >
//                   Sign Up
//                 </button> */}


//                 <button
//                  type="submit"
//                   className="px-8 py-2 text-white bg-gradient-to-r from-blue-500 rounded-full transition-opacity to-white/50 hover:opacity-90 hover:from-white/50 hover:to-blue-500"
//                   disabled={loading}
//                 >
//                   {loading ? <Spinner /> : "Sign Up"}
//                 </button>
              
//                 <Link
//                   to="/user/login"
//                   className="font-medium text-blue-400 hover:text-blue-600 hover:underline"
//                 >
//                   Login Here
//                 </Link>
                
//               </div>
//             </form>
//           </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }












import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import necessary components
import Spinner from "../comman/Spinner";
import ErrorAlert from "../comman/ErrorAlert";
import SuccessAlert from "../comman/SuccessAlert";
import Header from "../../CoreFile/Header";
import Footer from "../../CoreFile/Footer";

// Import icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Import Redux actions
import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice";

// Custom hook to get URL query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const { loading, error, message, auth } = useSelector((state) => state.auth);

  const [referralCode, setReferralCode] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Effect to handle referral code and authentication
  useEffect(() => {
    const referral = query.get("referral");
    if (referral) {
      setReferralCode(referral);
    }
    
    if (auth) {
      navigate(`/${auth?.role}/dashboard`);
    }
    
    // Error and message clearing
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [query, auth, error, message, dispatch, navigate]);

  // Initial form values
  const initialValues = {
    fullname: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralBy: "",
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    fullname: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!termsAgreed) {
        alert("Please agree to the Terms of Use");
        return;
      }

      if (referralCode) {
        values.referralBy = referralCode;
      }
      
      dispatch(signupUser(values));
    },
  });

  return (
    <>
      <Header />
        <div className="h-[75px]"></div>
      <div className="flex w-full">

        {/* Left Side - Background Image */}
        <div className="hidden relative md:block md:w-1/2">
          <div
            className="absolute inset-0 bg-black/30"
            style={{
              backgroundImage: `url('https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "multiply",
            }}
          />
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex flex-col justify-center px-8 w-full bg-black md:w-1/2 md:px-12">
          <div className="p-5 my-4 bg-white bg-opacity-20 rounded-lg border-b border-gray-500 shadow-lg backdrop-filter backdrop-blur-lg">
            <div className="mx-auto max-w-2xl">
              <h2 className="inline-block mb-8 text-3xl font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-blue-600 to-white/50">
                Registration
              </h2>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullname" className="block mb-1 text-2xl font-bold text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Name..."
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                  />
                  {formik.touched.fullname && formik.errors.fullname && (
                    <p className="mt-2 text-xs text-red-500">{formik.errors.fullname}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-1 text-2xl font-bold text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address..."
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-xs text-red-500">{formik.errors.email}</p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block mb-1 text-2xl font-bold text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username..."
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="mt-2 text-xs text-red-500">{formik.errors.username}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block mb-1 text-2xl font-bold text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone number..."
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-2 text-xs text-red-500">{formik.errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block mb-1 text-2xl font-bold text-white">
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
                      className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute top-3 right-4 text-gray-300 cursor-pointer"
                    >
                      {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-2 text-xs text-red-500">{formik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block mb-1 text-2xl font-bold text-white">
                    Confirm Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••••••"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="mt-2 text-xs text-red-500">{formik.errors.confirmPassword}</p>
                  )}
                </div>

                {/* Referral Code */}
                <div>
                  <label
                    htmlFor="referralBy"
                    className="block mb-1 text-2xl font-bold text-white"
                  >
                    Referral Code
                  </label>
                  <input
                    id="referralBy"
                    name="referralBy"
                    placeholder="Enter Referral Code"
                    type="text"
                    value={referralCode || formik.values.referralBy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-opacity-20 rounded-lg border-b border-gray-300 shadow-lg backdrop-filter backdrop-blur-lg focus:border-purple-500 focus:outline-none placeholder:text-gray-950 bg-white/50"
                    disabled={!!referralCode}
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={termsAgreed}
                    onChange={() => setTermsAgreed(!termsAgreed)}
                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <label htmlFor="agreeToTerms" className="block ml-2 text-sm text-white">
                    I agree to the{" "}
                    <a href="#" className="font-bold text-blue-400 hover:underline">
                      Terms of Use
                    </a>
                  </label>
                </div>

                {/* Submit and Login Link */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="submit"
                    className="px-8 py-2 text-white bg-gradient-to-r from-blue-500 rounded-full transition-opacity to-white/50 hover:opacity-90 hover:from-white/50 hover:to-blue-500"
                    disabled={loading || !termsAgreed}
                  >
                    {loading ? <Spinner /> : "Sign Up"}
                  </button>
                
                  <Link
                    to="/user/login"
                    className="font-medium text-blue-400 hover:text-blue-600 hover:underline"
                  >
                    Login Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Error and Success Alerts */}
      {error && <ErrorAlert error={error} />}
      {message && <SuccessAlert message={message} />}
    </>
  );
}