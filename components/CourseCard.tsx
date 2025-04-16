import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar, FiUsers } from "react-icons/fi";

interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  progress: number;
  rating: number;
  students: number;
  isDarkMode: boolean;
}

export default function CourseCard({ 
  title, 
  instructor, 
  image, 
  progress, 
  rating, 
  students, 
  isDarkMode 
}: CourseCardProps) {
  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-md transition-all duration-300`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-40">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          width={400}
          height={160}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-white'}`}>
            {title}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {instructor}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <FiStar className={`h-4 w-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} mr-1`} />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {rating}
            </span>
          </div>
          
          <div className="flex items-center">
            <FiUsers className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`} />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {students}
            </span>
          </div>
        </div>
        
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green h-1.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
