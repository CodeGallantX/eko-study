"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

interface FormData {
  name: string;
  email: string;
  password: string;
  agree: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.agree) newErrors.agree = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted successfully:", formData);
        setIsSubmitting(false);
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <FaChevronLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-2">
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-deepGreen hover:text-green font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                label: "Full name",
                name: "name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                label: "Email address",
                name: "email",
                type: "email",
                placeholder: "you@example.com",
              },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof FormData] as string}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green focus:border-transparent transition-all`}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green focus:border-transparent transition-all pr-12`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="appearance-none h-4 w-4 text-deepGreen checked:ring-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="agree"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-deepGreen hover:text-green font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-deepGreen hover:text-green font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.agree && (
                  <p className="mt-1 text-sm text-red-600">{errors.agree}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green transition-colors ${
                isSubmitting
                  ? "bg-deepGreen"
                  : "bg-deepGreen hover:bg-green-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <ImSpinner8 className="animate-spin mr-2" size={16} />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;