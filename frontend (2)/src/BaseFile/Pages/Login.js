"use client"

import { useState, useEffect } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import ErrorAlert from "../comman/ErrorAlert"
import SuccessAlret from "../comman/SuccessAlert"
import { loginUser, clearErrors } from "../../redux/authSlice"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../comman/Spinner"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import Header from "../../CoreFile/Header"
import Footer from "../../CoreFile/Footer"
import { sendForgotLink, clearMessage, clearErrors as clrerr } from "../../redux/forgotSlice"

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const { loading, error, auth } = useSelector((state) => state.auth)
  const { loading: load, message, error: Err } = useSelector((state) => state.forgot)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or username is required"),
    password: Yup.string().required("Password is required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(loginUser(values))
    },
  })

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
      return () => clearTimeout(timer)
    }
    if (Err) {
      const timer = setTimeout(() => {
        dispatch(clrerr())
      }, 2000)
      return () => clearTimeout(timer)
    }
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage())
      }, 2000)
      return () => clearTimeout(timer)
    }
    if (auth) {
      navigate(`/${auth?.role}/dashboard`)
    }
  }, [error, dispatch, auth, message, Err])

  const handleForgotPass = () => {
    if (formik.values.email === "") {
      alert("Please enter your email")
      return
    }
    const forgotData = { email: formik.values.email, role: "user" }
    dispatch(sendForgotLink(forgotData))
  }

  return (
    <>
      <Header />
      <div className="min-h-screen  flex items-center justify-center p-4 bg-[url('https://img.freepik.com/premium-photo/businessman-analyzing-india-economy-data-futuristic-touchscreen-interface_641010-65186.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_country_boost&w=740')] bg-no-repeat bg-cover bg-center">
        <div className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-2xl">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 text-purple-400/50 relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 opacity-90"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white z-10">
              <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
              <p className="text-lg text-center mb-8">
                Log in to your account to access your personalized dashboard and manage your investments.
              </p>
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <div className="space-y-3 w-full">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-white"></div>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-white"></div>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 bg-white/50 p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
              <p className="text-gray-800 mt-2">Please enter your credentials to continue</p>
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                  Email or Username
                </label>
                <input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Enter your email or username"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
                  >
                    {showPass ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                )}
              </div>

              {/* Error and success messages */}
              {error && <ErrorAlert error={error} />}
              {Err && <ErrorAlert error={Err} />}
              {message && <SuccessAlret message={message} />}

              {/* Remember me and forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleForgotPass}
                  className="text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 font-medium"
                  disabled={loading || load}
                >
                  {loading || load ? <Spinner /> : "Sign In"}
                </button>
              </div>
            </form>

            {/* Register link */}
            <div className="mt-8 text-center">
              <p className="text-gray-800">
                Don't have an account?{" "}
                <Link to="/registration" className="font-medium text-purple-400 hover:text-teal-800">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
