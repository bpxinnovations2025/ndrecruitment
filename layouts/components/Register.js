"use client"
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "@hooks/useAxios";
import swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Register = () => {
  const api = useAxios();
  const router = useRouter();
  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phonenumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[0-9\s\-\(\)]+$/, "Invalid phone number format"),
    password1: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    password2: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password1")], "Passwords must match"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phonenumber: "",
      password1: "",
      password2: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Prepare data for backend
        const registrationData = {
          email: values.email,
          first_name: values.firstName, // Map to backend field name
          last_name: values.lastName, // Map to backend field name
          phone_number: values.phonenumber, // Map to backend field name
          password1: values.password1,
          password2: values.password2,
        };

        console.log("Registration data:", registrationData);

        // TODO: Replace with your actual API call
        await api.post("api/register/", registrationData);

        // alert("Account created successfully!");

        swal.fire({
          title: "Account created successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "bottom-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        router.push("/login");

        resetForm();
      } catch (error) {
        console.error("Registration error:", error);

        swal.fire({
          title: error.message || "Registration failed. Please try again.",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "bottom-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">
          Start your journey to find the perfect job
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="First name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Last name"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              formik.touched.email && formik.errors.email
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phonenumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phonenumber"
            name="phonenumber"
            type="tel"
            autoComplete="tel"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              formik.touched.phonenumber && formik.errors.phonenumber
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {formik.touched.phonenumber && formik.errors.phonenumber && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.phonenumber}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password1"
            name="password1"
            type="password"
            autoComplete="new-password"
            value={formik.values.password1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              formik.touched.password1 && formik.errors.password1
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Create a strong password"
          />
          {formik.touched.password1 && formik.errors.password1 && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.password1}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="password2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="password2"
            name="password2"
            type="password"
            autoComplete="new-password"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              formik.touched.password2 && formik.errors.password2
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Confirm your password"
          />
          {formik.touched.password2 && formik.errors.password2 && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.password2}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formik.values.terms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-orange-600 hover:text-orange-500">
              Terms and Conditions
            </a>
          </label>
        </div>
        {formik.touched.terms && formik.errors.terms && (
          <p className="text-sm text-red-600">{formik.errors.terms}</p>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400 disabled:cursor-not-allowed transition duration-200"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
