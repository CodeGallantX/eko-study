"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

const colleges = {
  'College of Engineering': ['Architecture', 'Mechanical Engineering', 'Electrical Engineering', 'Mechatronics Engineering'],
  'College of Basic Sciences': ['Mathematics', "Computer Science", 'Industrial Mathematics', 'Physics with electronics', 'Chemistry', "Industrial Chemistry", "Statistics"],
  'College of Arts and Design': ['Accounting', 'Marketing', 'Finance']
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    college: "",
    department: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "college" ? { department: "" } : {}),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.college) newErrors.college = "College is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      router.push("/login");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col px-6 py-14 pt-20">
      <ChevronLeft
        className="absolute left-4 top-4 p-2 bg-gray-100 rounded-full text-gray-500 cursor-pointer"
        size={40}
        onClick={() => router.push("/")}
      />
      <h1 className="text-2xl font-bold text-black text-left">
        Register To Start Your Journey
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-8">
        {[{ label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
          { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email address" }
        ].map(({ label, name, type, placeholder }) => (
          <fieldset key={name} className="flex flex-col">
            <label htmlFor={name} className="text-black">{label}</label>
            <input
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-600 outline-none focus:border-green"
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              required
            />
            {errors[name] && <small className="text-red-500">{errors[name]}</small>}
          </fieldset>
        ))}

        <fieldset className="flex flex-col">
          <label htmlFor="password" className="text-black">Password</label>
          <div className="relative">
            <input
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-600 outline-none focus:border-green pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <small className="text-red-500">{errors.password}</small>}
        </fieldset>

        <fieldset className="flex flex-col">
          <label htmlFor="college" className="text-black">College</label>
          <select
            className="w-full border p-3 rounded-lg bg-gray-100 outline-none text-gray-600 focus:border-green"
            name="college"
            id="college"
            value={formData.college}
            onChange={handleChange}
            required
          >
            <option value="">Select College</option>
            {Object.keys(colleges).map((college) => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
          {errors.college && <small className="text-red-500">{errors.college}</small>}
        </fieldset>

        <fieldset className="flex flex-col">
          <label htmlFor="department" className="text-black">Department</label>
          <select
            className="w-full border p-3 rounded-lg bg-gray-100 outline-none text-gray-600 focus:border-green"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            required
            disabled={!formData.college}
          >
            <option value="">Select Department</option>
            {formData.college && colleges[formData.college].map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <small className="text-red-500">{errors.department}</small>}
        </fieldset>

        <button className="w-full bg-green text-white py-3 rounded-lg mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
