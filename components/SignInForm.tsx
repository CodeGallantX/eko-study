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
    <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-full absolute top-0 left-0 h-full"
      >
        <Image src="/illustration.jpg" alt="Study" layout="fill" objectFit="cover" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="z-10 absolute top-20 right-10 w-full lg:w-1/2 max-w-lg bg-gray-900/50 backdrop-blur-xl border-2 border-gray-300 hover:border-green shadow-lg rounded-2xl p-8 transition-all duration-300 ease-in-out"
      >
        <h1 className="text-4xl font-bold text-center text-white">Sign In</h1>
        <p className="text-center mt-2 text-gray-300">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-green hover:text-yellow transition">Sign up</Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input 
            className="bg-transparent border border-gray-300 p-3 rounded-lg text-white placeholder-gray-400 outline-none focus:border-2 focus:border-green transition" 
            type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required 
          />

          <div className="relative">
            <input 
              className="bg-transparent border border-gray-300 p-3 rounded-lg text-white placeholder-gray-400 outline-none focus:border-2 focus:border-green transition w-full pr-10" 
              type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white transition" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end items-center">
            <Link href="/forgot-password" className="text-sm text-green hover:text-yellow transition">Forgot Password?</Link>
          </div>

          <button 
            className="w-full bg-green hover:bg-yellow transition text-gray-900 py-3 rounded-lg flex items-center justify-center font-semibold" 
            type="submit" disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin mr-2" size={20} />}
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="flex items-center my-2">
            <hr className="w-full border-gray-500" />
            <span className="px-4 text-gray-400">or</span>
            <hr className="w-full border-gray-500" />
          </div>

          <button 
            className="text-white flex items-center justify-center gap-3 border border-gray-400 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaGoogle size={20} /> Continue with Google
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SigninForm;