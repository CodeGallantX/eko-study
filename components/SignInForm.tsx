'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FormData {
  email: string;
  password: string;
}

const SigninForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Left side - Illustration */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center p-12"
      >
        <div className="relative w-full h-full max-w-2xl">
          <Image 
            src="/illustration.jpg" 
            alt="Modern workspace illustration" 
            layout="fill" 
            objectFit="contain"
            className="opacity-90"
            priority
          />
        </div>
      </motion.div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Form header */}
          <div className="bg-gray-900 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-gray-300">
              Don't have an account?{' '}
              <Link 
                href="/auth/signup" 
                className="text-green-400 hover:text-green-300 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Form content */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all placeholder-gray-400 pr-12"
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
              </div>

              {/* Submit button */}
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
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social login */}
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <FaGoogle className="mr-3 text-red-500" size={18} />
                  Continue with Google
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-green-600 hover:text-green-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-green-600 hover:text-green-500">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninForm;