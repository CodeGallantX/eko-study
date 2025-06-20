"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";
import Preloader from "@/components/shared/Preloader";
import Header from "@/components/shared/Header";
import Banner from "@/components/shared/Banner";
import DownloadModal from "@/components/notes/DownloadModal";
import Footer from "@/components/shared/Footer";
// import { supabase } from '@/lib/supabase';

interface Course {
  id: number;
  title: string;
  code: string;
  college: string;
  department: string;
  semester: string;
  level: string;
  url: string;
}

interface ClientComponentProps {
  courses: Course[];
  colleges: string[];
}

export default function ClientComponent({ courses, colleges }: ClientComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ college: "", department: "", semester: "", level: "" });
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [selectedNote, setSelectedNote] = useState<{ url: string; fileName: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadMoreRef = useRef(null);

  const departments = [...new Set(
    courses.filter((c) => !filters.college || c.college === filters.college).map((c) => c.department)
  )];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCourses((prev) => prev + 6);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "college" ? { department: "" } : {}),
    }));
  };
  
  const filteredCourses = courses.filter((course) => {
    const regex = new RegExp(searchQuery, "i");
    return (
      (regex.test(course.title) ||
        regex.test(course.college) ||
        regex.test(course.department) ||
        regex.test(course.code) ||
        regex.test(course.level)) &&
      (!filters.college || course.college === filters.college) &&
      (!filters.department || course.department === filters.department) &&
      (!filters.semester || course.semester === filters.semester) &&
      (!filters.level || course.level === filters.level)
    );
  });

  const page = {
    title: "Notes",
    breadcrumb: [
      {
        name: "Notes",
        path: "notes"
      }
    ]
  };

  const openModal = (url: string, fileName: string) => {
    setSelectedNote({ url, fileName });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Preloader />
      <Header />
      <Banner page={page} />
      <div className="px-6 xl:px-24 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <fieldset className="relative flex items-center justify-start">
            <FaMagnifyingGlass className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border pl-10 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green"
            />
          </fieldset>
          <select
            className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green"
            value={filters.college}
            onChange={(e) => handleFilterChange("college", e.target.value)}
          >
            <option value="">All Colleges</option>
            {colleges.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
          <select
            className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green"
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            disabled={!filters.college}
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select
            className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green"
            value={filters.semester}
            onChange={(e) => handleFilterChange("semester", e.target.value)}
          >
            <option value="">All Semesters</option>
            {['1st', '2nd'].map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
          <select
            className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green"
            value={filters.level}
            onChange={(e) => handleFilterChange("level", e.target.value)}
          >
            <option value="">All Levels</option>
            {[100, 200, 300, 400, 500].map((level) => (
              <option key={level} value={level}>
                {level} Level
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-2xl font-semibold text-left mt-14">Notes available</h1>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 pt-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.slice(0, visibleCourses).map((course) => (
              <motion.div
                key={`${course.id}-${course.code}`}
                className="bg-white hover:bg-green rounded-md p-3 border border-gray-500/50 flex flex-row items-center justify-between group cursor-pointer transition-all duration-200 ease-in-out"
                onClick={() => openModal(course.url, `${course.code}_${course.title}.pdf`)}
              >
                <div>
                  <h2 className="text-base lg:text-lg font-semibold group-hover:text-white">{course.title}</h2>
                  <p className="text-gray-600 group-hover:text-gray-100 text-sm lg:text-base">{course.code}</p>
                </div>
                <FaChevronRight className="text-gray-500/50 group-hover:text-white -translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No matching notes found.</p>
          )}
        </motion.div>

        {visibleCourses < filteredCourses.length && (
          <div ref={loadMoreRef} className="mt-6 text-center text-gray-500">
            Loading more notes...
          </div>
        )}
      </div>
      
      {selectedNote && (
        <DownloadModal
          url={selectedNote.url}
          fileName={selectedNote.fileName}
          onClose={closeModal}
          isOpen={isModalOpen}
        />
      )}
      <Footer />
    </>
  );
}