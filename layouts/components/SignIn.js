"use client";

import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "@hooks/useAxios";
import swal from "sweetalert2";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const api = useAxios();
  const { handleLogin } = useAuth();
  const router = useRouter();
  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Prepare data for backend
        const logInData = {
          email: values.email,

          password: values.password,
        };

        console.log("Login data:", logInData);

        // TODO: Replace with your actual API call
        const response = await api.post("api/login/", logInData);

        // alert("Account created successfully!");
        handleLogin(response.data, {
          access: response.data.tokens.access,
          refresh: response.data.tokens.refresh,
        });

        swal.fire({
          title: "Logged in successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "bottom-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });

        resetForm();

        const pendingJobId = localStorage.getItem("pending_job_application");
        if (pendingJobId) {
          localStorage.removeItem("pending_job_application");
          router.push("/jobs-and-careers"); // Redirect back to jobs page
          swal.fire({
            title: "Welcome back!",
            text: "You can now apply for the job.",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "bottom-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          router.push("/"); // Default redirect
        }
      } catch (error) {
        console.error("Login error:", error);

        swal.fire({
          title: error.message || "Login failed. Please try again.",
          icon: "error",
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
    <div className="bg-white shadow-lg rounded-lg p-8 w-full ">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
        <p className="text-gray-600">
          Start your journey to find the perfect job
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              formik.touched.password1 && formik.errors.password
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Enter Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400 disabled:cursor-not-allowed transition duration-200"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
