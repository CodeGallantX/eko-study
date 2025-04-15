'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PiGoogleLogoBold } from 'react-icons/pi';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUserData } from '@/lib/redux/features/userSlice';

export const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://ekustudy.onrender.com/users/createUser', {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.email.split('@')[0], // Using email username as default
        password: formData.password,
      });

      // Check if the response contains a userId
      if (response.data && response.data.userId) {
        // Extract first name from full name
        const firstName = formData.fullName.split(' ')[0];
        
        // Store first name in Redux
        dispatch(setUserData({ 
          firstName, 
          token: response.data.token || '' 
        }));
        
        toast({
          title: 'Account created successfully!',
          description: 'Please verify your email to continue.',
          duration: 3000,
        });
        
        // Redirect to verification page with userId
        router.push(`/auth/verify?userId=${response.data.userId}`);
      } else {
        throw new Error('User ID not found in response');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="p-5 sm:p-6 md:p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-deepGreen mb-2">Create an account</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-green hover:text-deepGreen font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="fullName" className="text-gray-700">Full name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-green focus:border-transparent transition-all"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-green focus:border-transparent transition-all"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="focus:ring-2 focus:ring-green focus:border-transparent transition-all pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-start space-x-3 pt-2"
          >
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeTerms: checked as boolean })
              }
              className="mt-0.5 border-gray-300 data-[state=checked]:bg-green data-[state=checked]:border-green"
            />
            <label
              htmlFor="agreeTerms"
              className="text-xs sm:text-sm text-gray-700 leading-snug"
            >
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-green hover:text-deepGreen font-medium transition-colors"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-green hover:text-deepGreen font-medium transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="pt-2"
          >
            <Button
              type="submit"
              className="w-full bg-green text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:bg-deepGreen"
              disabled={isSubmitting || !formData.agreeTerms}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span className="text-sm sm:text-base">Creating account...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Create account</span>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-xs sm:text-sm text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 transition-colors py-2.5 sm:py-3"
            type="button"
          >
            <PiGoogleLogoBold className="mr-2 text-red" size={18} />
            <span className="text-sm sm:text-base">Continue with Google</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};