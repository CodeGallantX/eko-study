import { motion } from "framer-motion";
import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/notes/${course.slug}`}>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{course.department}</p>
        </div>
      </motion.div>
    </Link>
  );
}
