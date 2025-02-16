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
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      {/* Background Image */}
      <Image src="/study.jpg" alt="Study" layout="fill" objectFit="cover" className="absolute inset-0 w-full h-full -z-10 opacity-50" />

      {/* Glassmorphic Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/3 max-w-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg p-8 border border-white/20"
      >
        <h1 className="text-4xl font-bold text-center text-white">Sign In</h1>
        <p className="text-center mt-2 text-gray-200">
          Don&apos;t have an account? <Link href="/signup" className="text-yellow-400 hover:text-yellow-500 transition">Sign up</Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input className="border p-2 rounded bg-transparent text-white placeholder-gray-300 border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <div className="relative">
            <input className="border p-2 rounded bg-transparent text-white placeholder-gray-300 border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none w-full pr-10" type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="button" className="absolute inset-y-0 right-3 flex items-center text-white" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-300">
            <Link href="/forgot-password" className="hover:text-yellow-400 transition">Forgot Password?</Link>
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black py-3 rounded flex items-center justify-center font-bold" type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin mr-2" size={20} />}
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="flex items-center my-2 text-gray-300">
            <hr className="w-full border-gray-400" />
            <span className="px-4">or</span>
            <hr className="w-full border-gray-400" />
          </div>

          <button className="flex items-center justify-center gap-3 border border-white/30 p-2 rounded bg-transparent text-white hover:bg-white/20 transition">
            <FaGoogle size={20} /> Continue with Google
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SigninForm;
