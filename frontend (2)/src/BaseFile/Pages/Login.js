import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../comman/ErrorAlert";
import SuccessAlret from "../comman/SuccessAlert";
import { loginUser, clearErrors } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../comman/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Header from "../../CoreFile/Header";
import Footer from "../../CoreFile/Footer";
import {
  sendForgotLink,
  clearMessage,
  clearErrors as clrerr,
} from "../../redux/forgotSlice";
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, auth } = useSelector((state) => state.auth);
  const {
    loading: load,
    message,
    error: Err,
  } = useSelector((state) => state.forgot);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (Err) {
      const timer = setTimeout(() => {
        dispatch(clrerr());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (auth) {
      navigate(`/${auth?.role}/dashboard`);
    }
  }, [error, dispatch, auth, message, Err]);

  const handleForgotPass = () => {
    if (formik.values.email == "") {
      alert("enter email");
    }
    const forgotData = { email: formik.values.email, role: "user" };
    console.log(forgotData);
    dispatch(sendForgotLink(forgotData));
  };
  console.log(Err);
  return (
    <>
      <Header />
      {/* <div className="flex relative justify-center items-center pt-20 pb-6 min-h-screen"> */}
        {/* Background Image */}
        <div
        className="flex relative justify-end items-center pt-28 pb-8 min-h-screen bg-center bg-cover"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/3d-rendering-money-tree_23-2151575474.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Form Container */}
        <div className="relative p-8 mx-3 w-full max-w-md text-gray-200 bg-opacity-10 rounded-lg shadow-lg bg-gray-800/50 sm:mx-0">
          <div className="mx-auto w-full max-w-sm">
            {/* Logo */}
            <div className="flex justify-between items-center text-center">
              <div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight leading-9 text-left">
                  Login
                </h2>
                <p className="mt-2 text-center =">Have an account?</p>
              </div>
              
            </div>

            {/* Form */}
            <div className="mt-8">
              <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                  <label htmlFor="email" className="block text-base">
                    Email or Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter email......"
                      required
                      className="block relative px-4 py-2 w-full bg-opacity-10 rounded-full border border-gray-400 backdrop-blur-lg bg-gray-800/50 focus:outline-none sm:text-lg"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-xs tracking-widest text-left text-red-500">
                      {formik.errors.email}*
                    </p>
                  )}
                </div>

                <div className="relative w-full">
                  <label
                    htmlFor="password"
                    className="block text-base"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPass ? "text" : "password"}
                      placeholder="Password...."
                      required
                      className="block relative px-4 py-2 w-full bg-opacity-10 rounded-full border border-gray-400 backdrop-blur-lg bg-gray-800/50 focus:outline-none sm:text-base"
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-2 top-[53px] transform -translate-y-1/2 pr-3 flex items-center text-white cursor-pointer"
                    >
                      {showPass ? (
                        <FaRegEyeSlash className="text-gray-200" />
                      ) : (
                        <FaRegEye className="text-gray-200" />
                      )}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-2 text-xs tracking-widest text-left text-red-500">
                      {formik.errors.password}*
                    </p>
                  )}
                </div>

                {error && <ErrorAlert error={error} />}
                {Err && <ErrorAlert error={Err} />}
                {message && <SuccessAlret message={message} />}
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded form-checkbox" />
                    <span className="ml-2">Remember Me</span>
                  </label>
                  <span
                    onClick={() => handleForgotPass()}
                    className="text-base cursor-pointer"
                  >
                    Forgot Password
                  </span>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`w-full uppercase tracking-widest justify-center rounded-full ${
                      loading ? "bg-green-500" : "bg-green-500"
                    } px-6 py-2 text-base font-medium leading-6 text-white shadow-sm hover:bg-green-600 focus:outline-none`}
                  >
                    {loading || load ? <Spinner /> : "Sign In"}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-base text-center">
                Not a member?{" "}
                <Link
                  to="/registration"
                  className="font-semibold leading-6 text-blue-500 hover:text-blue-600 hover:underline"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </div>
        </div>
      {/* </div> */}
      <Footer />
    </>
  );
}
























// import React, { useState, useEffect } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import ErrorAlert from "../comman/ErrorAlert";
// import { loginAdmin, clearErrors } from "../../redux/authSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../comman/Spinner";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";
// import Header from "../../CoreFile/Header";
// import Footer from "../../CoreFile/Footer";

// export default function Login() {
//   const [showPass, setShowPass] = useState(false);
//   const { loading, error, admin } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Incorrect email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       dispatch(loginAdmin(values));
//     },
//   });

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors());
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     if (admin) {
//       navigate(`/admin/dashboard`);
//     }
//   }, [error, dispatch, admin, navigate]);

//   return (
//     <>
//       <Header />

//       <div
//         className="flex justify-center items-center p-4 h-screen bg-center bg-cover"
//         style={{
//           backgroundImage:
//             "url('https://img.freepik.com/free-photo/blue-low-poly-background_1048-13185.jpg')",
//         }}
//       >
//         <div className="overflow-hidden w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
//           {/* Header with background image */}
//           <div
//             className="relative h-72 bg-center bg-cover hover:scale-105"
//             style={{
//               backgroundImage:
//                 "url('https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7873.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid')",
//               backgroundPosition: "center top",
//             }}
//           >
//             <div className="flex absolute inset-0 justify-center items-center bg-black/30"></div>
//           </div>

//           {/* Form */}
//           <div className="p-8">
//             <form className="space-y-6" onSubmit={formik.handleSubmit}>
//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-2xl text-white">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="p-2 w-full bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg placeholder:text-gray-900"
//                   required
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="text-xs text-red-500">{formik.errors.email}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="password" className="text-2xl text-white">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPass ? "text" : "password"}
//                     placeholder="Enter password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="p-2 w-full bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg placeholder:text-gray-900"
//                     required
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute inset-y-0 right-0 pr-3 text-gray-600 cursor-pointer"
//                   >
//                     {showPass ? (
//                       <FaRegEyeSlash className="w-8 h-9 text-gray-900" />
//                     ) : (
//                       <FaRegEye className="w-8 h-9 text-gray-900" />
//                     )}
//                   </span>
//                 </div>
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="text-xs text-red-500">{formik.errors.password}</p>
//                 )}
//               </div>

//               {error && <ErrorAlert error={error} />}

//               <button
//                 type="submit"
//                 className={`py-2 w-full font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
//               >
//                 {loading ? <Spinner /> : "Login"}
//               </button>
//             </form>

//             <p className="mt-4 text-lg text-center text-white">
//               Not a member?{" "}
//               <Link
//                 to="/"
//                 className="font-semibold text-blue-500 hover:text-blue-500 hover:underline"
//               >
//                 User Login Here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }
























// import React, { useState, useEffect } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import ErrorAlert from "../comman/ErrorAlert";
// import SuccessAlert from "../comman/SuccessAlert"; // Corrected typo from SuccessAlret
// import { loginAdmin, clearErrors } from "../../redux/authSlice";
// import {
//   sendForgotLink,
//   clearMessage,
//   clearErrors as clrerr,
// } from "../../redux/forgotSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../comman/Spinner";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";
// import Header from "../../CoreFile/Header";
// import Footer from "../../CoreFile/Footer";

// export default function Login() {
//   const [showPass, setShowPass] = useState(false);
//   const { loading, error, admin } = useSelector((state) => state.auth);
//   const {
//     loading: load,
//     message,
//     error: Err,
//   } = useSelector((state) => state.forgot);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Form initial values
//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   // Validation schema (adapted to admin's email requirement)
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Incorrect email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async (values) => {
//       dispatch(loginAdmin(values));
//     },
//   });

//   // Forgot Password handler
//   const handleForgotPass = () => {
//     if (formik.values.email === "") {
//       formik.setErrors({ email: "Email is required for password recovery" });
//       return;
//     }
//     const forgotData = { email: formik.values.email, role: "admin" };
//     dispatch(sendForgotLink(forgotData));
//   };

//   // Effect to handle errors, messages, and navigation
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         dispatch(clearErrors());
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     if (Err) {
//       const timer = setTimeout(() => {
//         dispatch(clrerr());
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     if (message) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessage());
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//     if (admin) {
//       navigate(`/admin/dashboard`);
//     }
//   }, [error, Err, message, dispatch, admin, navigate]);

//   return (
//     <>
//       <Header />

//       <div
//         className="flex justify-center items-center p-4 h-screen bg-center bg-cover"
//         style={{
//           backgroundImage:
//             "url('https://img.freepik.com/free-photo/blue-low-poly-background_1048-13185.jpg')",
//         }}
//       >
//         <div className="overflow-hidden w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
//           {/* Header with background image */}
//           <div
//             className="relative h-72 bg-center bg-cover hover:scale-105"
//             style={{
//               backgroundImage:
//                 "url('https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7873.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid')",
//               backgroundPosition: "center top",
//             }}
//           >
//             <div className="flex absolute inset-0 justify-center items-center bg-black/30"></div>
//           </div>

//           {/* Form */}
//           <div className="p-8">
//             <form className="space-y-6" onSubmit={formik.handleSubmit}>
//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-2xl text-white">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   type="text"
//                   className="p-2 w-full bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg placeholder:text-gray-900"
//                   required
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="text-xs text-red-500">{formik.errors.email}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="password" className="text-2xl text-white">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPass ? "text" : "password"}
//                     placeholder="Enter password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="p-2 w-full bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg placeholder:text-gray-900"
//                     required
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute inset-y-0 right-0 pr-3 text-gray-600 cursor-pointer"
//                   >
//                     {showPass ? (
//                       <FaRegEyeSlash className="w-8 h-9 text-gray-900" />
//                     ) : (
//                       <FaRegEye className="w-8 h-9 text-gray-900" />
//                     )}
//                   </span>
//                 </div>
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="text-xs text-red-500">
//                     {formik.errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Remember Me and Forgot Password */}
//               <div className="flex justify-between items-center">
//                 <label className="flex items-center text-white">
//                   <input
//                     type="checkbox"
//                     className="text-green-500 rounded form-checkbox"
//                   />
//                   <span className="ml-2">Remember Me</span>
//                 </label>
//                 <span
//                   onClick={() => handleForgotPass()}
//                   className="text-sm text-white cursor-pointer hover:underline"
//                 >
//                   Forgot Password?
//                 </span>
//               </div>

//               {/* Alerts for errors and success messages */}
//               {error && <ErrorAlert error={error} />}
//               {Err && <ErrorAlert error={Err} />}
//               {message && <SuccessAlert message={message} />}

//               <button
//                 type="submit"
//                 className="py-2 w-full font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               >
//                 {loading || load ? <Spinner /> : "Sign In"}
//               </button>
//             </form>
// {/* 
//             <p className="mt-4 text-lg text-center text-white">
//               Not a member?{" "}
//               <Link
//                 to="/"
//                 className="font-semibold text-blue-500 hover:text-blue-600 hover:underline"
//               >
//                 User Login Here
//               </Link>
//             </p> */}

//             <p className="mt-4 text-lg text-center text-white">
//                 Not a member?{" "}
//                 <Link
//                   to="/registration"
//                   className="font-semibold leading-6 text-blue-500 hover:text-blue-600 hover:underline"
//                 >
//                   Register Here
//                 </Link>
//               </p>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }