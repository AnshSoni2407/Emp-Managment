import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingEmployee = location.state?.employee || null;

  // initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
      status: "Active",
    },
  });

  // 🔹  Prefill form if editing
   useEffect(() => {
    if (existingEmployee) {
      Object.keys(existingEmployee).forEach((key) =>
        setValue(key, existingEmployee[key])
      );
    }
  }, [existingEmployee]);

  // 🔹 Handle submit (add or update)
  const onSubmit = async (data) => {
    try {
      if (existingEmployee) {
        await axios.put(
          `http://localhost:8081/employees/${existingEmployee.id}`,
          data
        );
        alert("✅ Employee Updated Successfully!");
      } else {
        await axios.post("http://localhost:8081/employees", data);
        alert("✅ Employee Added Successfully!");
      }
      navigate("/view");
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex justify-center items-center py-10 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-100"
        >
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 border-b pb-4">
            {existingEmployee ? "Edit Employee" : "Add New Employee"}
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Only letters allowed",
                  },
                })}
                placeholder="Enter name"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Designation */}
            <div>
              <label className="block text-gray-700 mb-1">Designation</label>
              <input
                {...register("designation", {
                  required: "Designation is required",
                })}
                placeholder="Enter designation"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.designation.message}
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                {...register("salary", {
                  required: "Salary is required",
                  min: { value: 1000, message: "Minimum salary 1000" },
                })}
                placeholder="Enter salary"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 mb-1">Department</label>
              <select
                {...register("department", {
                  required: "Department is required",
                })}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option>HR</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-1">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded-xl text-lg font-medium hover:bg-green-900 transition-all duration-300"
            >
              {existingEmployee ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
