

"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { loginAdmin, clearErrors } from "../../redux/authSlice"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formFocus, setFormFocus] = useState("")
  const [loginAttempted, setLoginAttempted] = useState(false)
  const { loading, error, admin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoginAttempted(true)
      dispatch(loginAdmin(values))
    },
  })

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
      return () => clearTimeout(timer)
    }
    if (admin) {
      navigate(`/admin/dashboard`)
    }
  }, [error, dispatch, admin, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://img.freepik.com/premium-photo/businessman-analyzing-india-economy-data-futuristic-touchscreen-interface_641010-65186.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_country_boost&w=740')] bg-cover bg-no-repeat bg-center">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Background & Info */}
        <div className="w-full md:w-1/2 bg-cover bg-center relative hidden md:block"
          style={{
            backgroundImage: "url('https://img.freepik.com/premium-photo/businessman-analyzing-india-economy-data-futuristic-touchscreen-interface_641010-65186.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_country_boost&w=740')",
          }}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm"></div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center p-12 z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Admin Control Center</h1>
              <p className="text-white/80 mb-8">
                Secure access to your administrative dashboard with enhanced controls and analytics tools.
              </p>
              
              <div className="space-y-4">
                {[
                  "Complete system oversight",
                  "User management & permissions",
                  "Real-time analytics dashboard",
                  "Security audit logging"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-8 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
              <p className="text-gray-500 mt-1">Sign in to access your dashboard</p>
            </div>
            
            {/* Status Messages */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start">
                <AlertCircle className="h-5 w-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loginAttempted && !error && loading && (
              <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-start">
                <div className="h-5 w-5 mr-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying your credentials...</span>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    } shadow-sm transition duration-200`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    } shadow-sm transition duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Signing in</span>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Sign in to Dashboard</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Not an administrator?{" "}
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Return to user login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}