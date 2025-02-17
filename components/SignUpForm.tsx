'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, CheckCircle, Circle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const colleges = {
  'College of Engineering': ['Architecture', 'Electrical and Electronics Engineering', 'Mechatronics Engineering', 'Computer Engineering'],
  'College of Basic Sciences': ['Mathematics', "Computer Science", 'Industrial Mathematics', 'Physics with electronics', 'Chemistry', "Industrial Chemistry", "Statistics"],
  'College of Environmental and Design': ['Art & Design', 'Marketing', 'Finance'],
  'College of Business Administration': ['Banking and Finance', 'Marketing'],
};

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  gender: string;
  college: string;
  dept: string;
  password: string;
  agree: boolean;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    tel: '+234',
    gender: '',
    college: '',
    dept: '',
    password: '',
    agree: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center min-h-screen p-10 bg-gray-100'>
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='hidden lg:block w-1/2'>
        <Image src='/illustration.jpg' alt='Sign Up Illustration' width={500} height={500} className='mx-auto' />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='w-full lg:w-1/2 max-w-ld bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-4xl font-bold text-center text-green'>Create Account</h1>
        <p className='text-center mt-2'>Already have an account? <Link href='/auth/signin' className='text-green hover:text-yellow transition'>Sign in</Link></p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
          <div className='flex gap-4'>
            <input className='border p-2 w-full rounded outline-none focus:ring-2 focus:ring-green' type='text' name='firstname' placeholder='First Name' value={formData.firstname} onChange={handleChange} required />
            <input className='border p-2 w-full rounded outline-none focus:ring-2 focus:ring-green' type='text' name='lastname' placeholder='Last Name' value={formData.lastname} onChange={handleChange} required />
          </div>

          <input className='border p-2 rounded focus:ring-2 outline-none focus:ring-green' type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
          <input className='border p-2 rounded focus:ring-2 outline-none focus:ring-green' type='tel' name='tel' placeholder='Phone Number' value={formData.tel} onChange={handleChange} required />

          <div className='relative'>
            <input className='border p-2 rounded focus:ring-2 outline-none focus:ring-green w-full pr-10' type={passwordVisible ? 'text' : 'password'} name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
            <button type='button' className='absolute inset-y-0 right-3 flex items-center' onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select name='gender' value={formData.gender} onChange={handleChange} className='border p-2 rounded outline-none focus:ring-2 focus:ring-green' required>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>

          <select name='college' value={formData.college} onChange={handleChange} className='border p-2 rounded outline-none focus:ring-2 focus:ring-green' required>
            <option value=''>Select College</option>
            {Object.keys(colleges).map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>

          {formData.college && (
            <motion.select
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              className="border p-2 rounded outline-none focus:ring-2 focus:ring-green"
              required
            >
              <option value="">Select Department</option>
              {(colleges[formData.college as keyof typeof colleges] || []).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </motion.select>
          )}

          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setFormData({ ...formData, agree: !formData.agree })}>
            {formData.agree ? <CheckCircle className='text-green' size={24} /> : <Circle className='text-green' size={24} />}
            <label htmlFor='agree' className='cursor-pointer'>I agree to the terms and conditions</label>
          </div>

          <button className='mt-4 w-full bg-green hover:bg-yellow transition text-white py-3 rounded flex items-center justify-center' type='submit' disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className='animate-spin mr-2' size={20} /> : null}
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupForm;