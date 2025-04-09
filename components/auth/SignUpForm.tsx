// components/auth/SignUpForm.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2, Circle } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';
import { AuthLayout } from './AuthLayout';

const colleges = {
  'College of Engineering': ['Architecture', 'Electrical Engineering', 'Mechatronics', 'Computer Engineering'],
  'College of Sciences': ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Statistics'],
  'College of Environmental': ['Art & Design', 'Urban Planning'],
  'College of Business': ['Banking & Finance', 'Marketing', 'Accounting'],
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  college: string;
  department: string;
  password: string;
  agreeTerms: boolean;
}

export const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+234',
    gender: '',
    college: '',
    department: '',
    password: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone || formData.phone.length < 11) newErrors.phone = 'Valid phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.college) newErrors.college = 'College is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        router.push('/dashboard');
      }, 1500);
    }
  };

  return (
    <AuthLayout
      illustrationSrc="/signup-illustration.jpg"
      illustrationAlt="Team collaboration illustration"
    >
      {/* Form header */}
      <div className="bg-gray-900 px-8 py-6">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="mt-2 text-gray-300">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Form content */}
      <div className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400`}
                placeholder="John"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400`}
              placeholder="+234 800 000 0000"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
              College
            </label>
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.college ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
            >
              <option value="">Select College</option>
              {Object.keys(colleges).map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
            {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college}</p>}
          </div>

          {formData.college && (
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
              >
                <option value="">Select Department</option>
                {colleges[formData.college as keyof typeof colleges].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setPasswordVisible(!passwordVisible)}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, agreeTerms: !formData.agreeTerms })}
                className="focus:outline-none"
              >
                {formData.agreeTerms ? (
                  <CheckCircle2 className="text-green-500" size={20} />
                ) : (
                  <Circle className="text-gray-400" size={20} />
                )}
              </button>
            </div>
            <div className="ml-3">
              <label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="text-green-600 hover:text-green-500 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                  Privacy Policy
                </Link>
              </label>
              {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
              isSubmitting ? 'bg-green-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};