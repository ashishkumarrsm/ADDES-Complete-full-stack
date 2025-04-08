

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

// export default function AdminLogin() {
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
//         className="flex pt-20 bg-black"
//         style={{
//           backgroundImage: `url('/backadmin.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",

//         }}
//       >
//         <div className="flex flex-col flex-1 my-10 justify-center6">
//           <div className="px-8 py-12 mx-auto w-full max-w-md bg-black bg-opacity-50 rounded-md">

//             <div className="flex justify-between items-center mb-8 text-center">
//               <div>
//                 <h2 className="text-3xl font-bold tracking-tight leading-9 text-left text-green-500">
//                 Admin Login
//                 </h2>
//               </div>
//               <Link to="/">
//                 <div className="flex justify-center items-center w-28 shadow-lg shadow-blue-600">
//                   <img
//                     alt="Earn4u Logo"
//                     src="/"
//                     className="w-auto"
//                   />
//                 </div>
//               </Link>
//             </div>

//             <div className="mt-10">
//               <form className="space-y-4" onSubmit={formik.handleSubmit}>
//                 <div className="w-full">
//                   <label
//                     htmlFor="email"
//                     className="block text-lg font-medium leading-6 text-gray-100"
//                   >
//                     Email
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       id="email"
//                       name="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       type="email"
//                       required
//                       className="block px-4 py-1.5 w-full text-gray-100 bg-white bg-opacity-10 rounded-md border-0 ring-1 ring-inset ring-gray-300 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
//                     />
//                   </div>
//                   {formik.touched.email && formik.errors.email && (
//                     <p className="mt-2 text-xs tracking-widest text-red-500">
//                       {formik.errors.email}*
//                     </p>
//                   )}
//                 </div>

//                 <div className="w-full">
//                   <div className="flex justify-between items-center">
//                     <label
//                       htmlFor="password"
//                       className="block text-lg font-medium leading-6 text-gray-100"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative mt-2">
//                     <input
//                       id="password"
//                       name="password"
//                       value={formik.values.password}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       type={showPass ? "text" : "password"}
//                       autoComplete="current-password"
//                       required
//                       className="block px-4 py-1.5 w-full text-gray-100 bg-white bg-opacity-10 rounded-md border-0 ring-1 ring-inset ring-gray-300 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
//                     />
//                     <span
//                       onClick={() => setShowPass(!showPass)}
//                       className="flex absolute inset-y-0 right-0 items-center pr-3 text-lg leading-5 text-gray-600 cursor-pointer"
//                     >
//                       {showPass ? (
//                         <FaRegEyeSlash className="w-6 h-6 text-gray-200" />
//                       ) : (
//                         <FaRegEye className="w-6 h-6 text-gray-200" />
//                       )}
//                     </span>
//                   </div>
//                   {formik.touched.password && formik.errors.password && (
//                     <p className="mt-2 text-xs tracking-widest text-red-500">
//                       {formik.errors.password}*
//                     </p>
//                   )}
//                 </div>

//                 {error && <ErrorAlert error={error} />}

//                 <div>
//                   <button
//                     type="submit"
//                     className={`flex w-full justify-center rounded ${
//                       loading ? "bg-green-500" : "bg-green-600"
//                     } px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus:ring-2 focus:ring-green-600`}
//                   >
//                     {loading ? <Spinner /> : "Login"}
//                   </button>
//                 </div>
//               </form>

//               <p className="mt-4 text-lg text-center text-gray-100">
//                 Not a member?{" "}
//                 <Link
//                   to="/"
//                   className="font-semibold text-blue-500 hover:text-blue-500 hover:underline"
//                 >
//                   User Login Here
//                 </Link>
//               </p>
//             </div>
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
// import { loginAdmin, clearErrors } from "../../redux/authSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../comman/Spinner";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";
// import Header from "../../CoreFile/Header";
// import Footer from "../../CoreFile/Footer";

// export default function AdminLogin() {
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

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

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
//             <form className="space-y-6">
//               <div className="space-y-2">
//                 <label htmlFor="username" className="text-2xl text-white">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   placeholder="Enter username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="p-2 w-full rounded-md border-gray-300 placeholder:text-gray-900"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="password" className="text-2xl text-white">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="p-2 w-full rounded-md border-gray-300 placeholder:text-gray-900"
//                 />
//               </div>

//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 text-green-600 rounded border-gray-300"
//                   />
//                   <label htmlFor="remember" className="text-sm text-white">
//                     Remember me
//                   </label>
//                 </div>

//                 <a
//                   href="#"
//                   className="text-sm text-white hover:text-white/50"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="py-2 w-full font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }



















import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../comman/ErrorAlert";
import { loginAdmin, clearErrors } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../comman/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Header from "../../CoreFile/Header";
import Footer from "../../CoreFile/Footer";

export default function   AdminLogin() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(loginAdmin(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (admin) {
      navigate(`/admin/dashboard`);
    }
  }, [error, dispatch, admin, navigate]);

  return (
    <>
      <Header />

      <div
        className="flex justify-center items-center p-4 h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/blue-low-poly-background_1048-13185.jpg')",
        }}
      >
        <div className="overflow-hidden w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
          {/* Header with background image */}
          <div
            className="relative h-72 bg-center bg-cover hover:scale-105"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7873.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid')",
              backgroundPosition: "center top",
            }}
          >
            <div className="flex absolute inset-0 justify-center items-center bg-black/30"></div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-2xl text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-2 w-full bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg placeholder:text-gray-900"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-2xl text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="p-2 w-full bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg placeholder:text-gray-900"
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 text-gray-600 cursor-pointer"
                  >
                    {showPass ? (
                      <FaRegEyeSlash className="w-8 h-9 text-gray-900" />
                    ) : (
                      <FaRegEye className="w-8 h-9 text-gray-900" />
                    )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500">{formik.errors.password}</p>
                )}
              </div>

              {error && <ErrorAlert error={error} />}

              <button
                type="submit"
                className={`py-2 w-full font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </form>

            <p className="mt-4 text-lg text-center text-white">
              Not a member?{" "}
              <Link
                to="/"
                className="font-semibold text-blue-500 hover:text-blue-500 hover:underline"
              >
                User Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
