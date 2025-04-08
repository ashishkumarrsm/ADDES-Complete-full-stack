import React, { useState } from "react";

const UserKyc = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        idType: "",
        idNumber: "",
        idFile: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("KYC Form Submitted!");
        console.log(formData);
    };

    return (
        <>

            <div
                className="flex justify-end items-center py-10 bg-center bg-cover"
                style={{
                    backgroundImage: "url('https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595831.jpg?uid=R90634854&ga=GA1.1.1673403856.1719407260&semt=ais_hybrid&w=740')",
                }}
            >
                {/* Overlay for better visibility */}

                <div className="p-7 mx-4 rounded-md border bg-white/50">
                    {/* Form Container */}
                    <div className="relative p-8 w-full max-w-2xl rounded-lg shadow-lg bg-white/70">
                        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">🔍 KYC Update Form</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your address"
                                />
                            </div>

                            {/* City, State, Zip */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                        className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                        placeholder="ZIP Code"
                                    />
                                </div>
                            </div>

                            {/* ID Type & ID Number */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">ID Type</label>
                                    <select
                                        name="idType"
                                        value={formData.idType}
                                        onChange={handleChange}
                                        required
                                        className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select ID Type</option>
                                        <option value="Passport">Passport</option>
                                        <option value="Aadhar">Aadhar</option>
                                        <option value="Driving License">Driving License</option>
                                        <option value="Voter ID">Voter ID</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">ID Number</label>
                                    <input
                                        type="text"
                                        name="idNumber"
                                        value={formData.idNumber}
                                        onChange={handleChange}
                                        required
                                        className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter ID Number"
                                    />
                                </div>
                            </div>

                            {/* Upload ID Document */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Upload ID Document</label>
                                <input
                                    type="file"
                                    name="idFile"
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="py-3 w-full font-bold text-white bg-blue-600 rounded-md transition-all hover:bg-blue-700"
                            >
                                Submit KYC Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>



        </>
    );
};

export default UserKyc;
