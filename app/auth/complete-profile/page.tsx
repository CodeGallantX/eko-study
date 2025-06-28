'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {AnimatePresence} from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface CollegeDepartmentMap {
  [key: string]: string[];
}

const collegeDepartments: CollegeDepartmentMap = {
  "College of Agriculture": [
    "Agricultural Economics & Farm Management",
    "Crop Production",
    "Agricultural Extension & Rural Development",
    "Horticulture & Landscape Management",
    "Animal Production",
    "Aquaculture & Fisheries Management"
  ],
  "College of Engineering and Technology": [
    "Computer Engineering",
    "Civil and Construction Engineering",
    "Electrical & Electronics Engineering",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Agricultural Engineering",
    "Chemical Engineering",
    "Biotechnology & Food Technology"
  ],
  "College of Environmental Design and Technology": [
    "Architecture",
    "Estate Management and Valuation",
    "Quantity Surveying",
    "Urban and Regional Planning",
    "Art and Industrial Design",
    "Building Technology"
  ],
  "College of Basic Sciences": [
    "Industrial Chemistry",
    "Chemistry",
    "Mathematics",
    "Industrial Mathematics",
    "Statistics",
    "Microbiology",
    "Botany",
    "Zoology",
    "Physics with Electronics",
    "Computer Science"
  ],
  "College of Applied Social Sciences": [
    "Economic Science (Economics)",
    "Mass Communication Science & Technology",
    "Accounting",
    "Actuarial Science",
    "Banking & Finance",
    "Marketing",
    "Office and Information Technology",
    "Business Administration",
    "Insurance",
    "Tourism & Hospitality Management"
  ]
};

export default function CompleteProfile() {
  const router = useRouter();
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('college, department')
          .eq('id', user.id)
          .single();

        if (profile?.college && profile?.department) {
          router.push('/dashboard');
        }
      } else {
        router.push('/auth/signin');
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (college && collegeDepartments[college]) {
      setAvailableDepartments(collegeDepartments[college]);
      setDepartment('');
    } else {
      setAvailableDepartments([]);
    }
  }, [college]);

  const handleSubmit = async () => {
    if (!college || !department) {
      toast({
        title: 'Incomplete Information',
        description: 'Please select your college and department',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error(authError?.message || 'No user found');
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          college,
          department,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (error) throw error;

      setShowSuccess(true);
      
      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Profile completion error:', error);
      toast({
        title: 'Profile Update Failed',
        description: error instanceof Error ? error.message : 'There was an error updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deepGreen dark:text-green">
            Complete Your Profile
          </h1>
          {userEmail && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {userEmail}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              College
            </label>
            <Select value={college} onValueChange={setCollege}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(collegeDepartments).map(college => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <Select 
              value={department} 
              onValueChange={setDepartment}
              disabled={!college}
            >
              <SelectTrigger className="h-11">
                <SelectValue 
                  placeholder={college ? "Select your department" : "Select college first"} 
                />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full mt-4"
            disabled={isSubmitting || !college || !department}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : 'Complete Profile'}
          </Button>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg mx-4"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 rounded-full bg-green-100 dark:bg-green-900/30 p-3"
                >
                  <CheckCircle2 className="h-8 w-8 text-green-500 dark:text-green-400" />
                </motion.div>

                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Updated!
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Your profile has been completed successfully. Redirecting to dashboard...
                </p>

                <div className="flex items-center justify-center w-full py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Redirecting...
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}