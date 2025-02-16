"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaSpinner } from "react-icons/fa6";
import Link from "next/link";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Login successful:", formData);
        setIsSubmitting(false);
        router.push("/dashboard"); // Redirect to dashboard
      }, 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col px-6 py-14 pt-20">
      <ChevronLeft
        className="absolute left-4 top-4 p-2 bg-gray-100 rounded-full text-gray-500 cursor-pointer"
        size={40}
        onClick={() => router.push("/")}
      />

      <h1 className="text-2xl font-bold text-black">Sign In To Your Account</h1>
      <p className="text-gray-600 mt-2">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-green hover:text-yellow-500 transition">Sign up</Link>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6">
        {/* Email Input */}
        <fieldset className="flex flex-col">
          <label htmlFor="email" className="text-black">Email Address</label>
          <input
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-600 outline-none focus:border-green-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </fieldset>

        {/* Password Input */}
        <fieldset className="flex flex-col">
          <label htmlFor="password" className="text-black">Password</label>
          <div className="relative">
            <input
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-600 outline-none focus:border-green-500 pr-10"
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

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-green hover:text-yellow-500 transition">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-green hover:bg-yellow transition text-white py-3 rounded-lg flex items-center justify-center"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" size={20} /> Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="w-full border-gray-300" />
        <span className="px-4 text-gray-500">or</span>
        <hr className="w-full border-gray-300" />
      </div>

      {/* Third-Party Logins */}
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 border p-3 rounded-lg hover:bg-gray-100 transition">
          <FaGoogle size={20} /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;