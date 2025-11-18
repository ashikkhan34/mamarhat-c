"use client";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const PartnerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    reset()
  };

  return (
    <div
      className=" flex justify-center items-center p-5 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/vxZ96sDf/Rectangle-200.png)",
      }}
    >
      <div className="bg-gray-100/20 backdrop-blur-sm rounded-xl p-8 md:p-10 w-full max-w-2xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-3">
          To Become Our Partner And Boost Your Revenue
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 font-medium">
          Complete The Form Below !
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-[#6CB80078]/80 p-12"
        >
          {/* Outlet Name */}
          <div>
            <label
              htmlFor="outletName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Outlet Name*
            </label>
            <input
              id="outletName"
              type="text"
              placeholder="Enter your outlet name"
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-100/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.outletName ? "border-red-500" : "border-gray-300"
              }`}
              {...register("outletName", {
                required: "Outlet name is required",
              })}
            />
            {errors.outletName && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.outletName.message}
              </span>
            )}
          </div>

          {/* Name Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name*
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className={`w-full px-4 py-3 bg-gray-100/20 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name*
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className={`w-full px-4 py-3 bg-gray-100/20 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={`w-full bg-gray-100/20 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mobile Number*
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                className={`w-full bg-gray-100/20 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]{10,}$/,
                    message: "Please enter a valid mobile number",
                  },
                })}
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.mobile.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Business Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Business Address*
              </label>
              <textarea
                id="address"
                placeholder="Enter your business address"
                rows="3"
                className={`w-full px-4 bg-gray-100/20 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-y min-h-[80px] ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                {...register("address", {
                  required: "Business address is required",
                })}
              />
              {errors.address && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Outlet Image */}
            <div>
              <label
                htmlFor="outletImage"
                className="block text-sm font-semibold  text-gray-700 mb-2"
              >
                Outlet Image (Each image size max 2Mb)*
              </label>
              <input
                id="outletImage"
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-100/20 cursor-pointer hover:border-blue-400"
                {...register("outletImage", {
                  required: "Outlet image is required",
                  validate: {
                    fileSize: (files) => {
                      if (files.length > 0) {
                        const fileSize = files[0].size / 1024 / 1024; // Convert to MB
                        return (
                          fileSize <= 2 || "File size must be less than 2MB"
                        );
                      }
                      return true;
                    },
                  },
                })}
              />
              {errors.outletImage && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.outletImage.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-200/50 hover:bg-blue-600/20 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;
