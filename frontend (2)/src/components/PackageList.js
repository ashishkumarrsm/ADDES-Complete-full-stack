import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPackages, updatePackage } from '../redux/packageSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PackageList = () => {
  const dispatch = useDispatch();
  const { packages, loading, error } = useSelector((state) => state.packages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  const handleEditClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    min_investment: Yup.number().positive('Must be positive').required('Minimum investment is required'),
    max_investment: Yup.number().positive('Must be positive').nullable(),
    roi_percentage: Yup.number().positive('Must be positive').required('ROI percentage is required'),
    duration_in_days: Yup.number().positive('Must be positive').integer('Must be a whole number').required('Duration is required'),
    is_active: Yup.boolean()
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updatePackage({ id: selectedPackage.id, packageData: values }))
      .then(() => {
        closeModal();
        dispatch(getAllPackages());
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">📦</span> Investment Packages
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-px"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      pkg.is_active
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {pkg.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-600 mb-4">{pkg.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2 text-xl">💰</span>
                      <span>
                        <strong>Min Investment:</strong> ${pkg.min_investment.toLocaleString()}
                      </span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2 text-xl">💸</span>
                      <span>
                        <strong>Max Investment:</strong>{' '}
                        {pkg.max_investment ? `$${pkg.max_investment.toLocaleString()}` : 'Unlimited'}
                      </span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2 text-xl">📈</span>
                      <span>
                        <strong>ROI:</strong> {pkg.roi_percentage}%
                      </span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2 text-xl">⏳</span>
                      <span>
                        <strong>Duration:</strong> {pkg.duration_in_days} days
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">
                    Created: {new Date(pkg.created_at).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleEditClick(pkg)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Edit Package</h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <Formik
              initialValues={{
                title: selectedPackage.title,
                description: selectedPackage.description,
                min_investment: selectedPackage.min_investment,
                max_investment: selectedPackage.max_investment || '',
                roi_percentage: selectedPackage.roi_percentage,
                duration_in_days: selectedPackage.duration_in_days,
                is_active: selectedPackage.is_active
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Package Title
                      </label>
                      <Field 
                        name="title" 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Field 
                        name="description" 
                        as="textarea" 
                        rows="3" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="min_investment" className="block text-sm font-medium text-gray-700 mb-1">
                          Min Investment ($)
                        </label>
                        <Field 
                          name="min_investment" 
                          type="number" 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage name="min_investment" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <label htmlFor="max_investment" className="block text-sm font-medium text-gray-700 mb-1">
                          Max Investment ($)
                        </label>
                        <Field 
                          name="max_investment" 
                          type="number" 
                          placeholder="Leave empty for unlimited" 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage name="max_investment" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="roi_percentage" className="block text-sm font-medium text-gray-700 mb-1">
                          ROI Percentage (%)
                        </label>
                        <Field 
                          name="roi_percentage" 
                          type="number" 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage name="roi_percentage" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <label htmlFor="duration_in_days" className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (Days)
                        </label>
                        <Field 
                          name="duration_in_days" 
                          type="number" 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage name="duration_in_days" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Field 
                        name="is_active" 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                        Active Status
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>Save Changes</>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageList;