"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaBook } from "react-icons/fa";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function ClientComponent({ courses, colleges }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ college: "", department: "", level: "" });
  const [visibleCourses, setVisibleCourses] = useState(6);
  const loadMoreRef = useRef(null);

  // Get departments dynamically based on selected college
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "college" ? { department: "" } : {}), // Reset department if college changes
    }));
  };

  // **Filtering & Searching Logic**
  const filteredCourses = courses.filter((course) => {
    const regex = new RegExp(searchQuery, "i");
    return (
      (regex.test(course.title) ||
        regex.test(course.college) ||
        regex.test(course.department) ||
        regex.test(course.level)) &&
      (!filters.college || course.college === filters.college) &&
      (!filters.department || course.department === filters.department) &&
      (!filters.level || course.level === filters.level)
    );
  });

  const getIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-xl" />;
      case "docx":
        return <FaFileWord className="text-blue-500 text-xl" />;
      case "ppt":
        return <FaFilePowerpoint className="text-orange-500 text-xl" />;
      default:
        return <FaBook className="text-gray-500 text-xl" />;
    }
  };

  const page = {
    title: "Notes",
    breadcrumb: [
      { name: "Notes",
        path: "notes"
      }
    ]
  }

  return (
    <>
    <Preloader />
    <Header />
    <Banner page={page} />
    <div className="min-h-screen px-6 xl:px-24 py-10 bg-gray-">

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search for a course or note..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-green"
      />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* College Filter */}
        <select
          className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-green"
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

        {/* Department Filter (Disabled if no college selected) */}
        <select
          className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-green"
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

        {/* Level Filter */}
        <select
          className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-green"
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

      {/* Notes List with Animations */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.slice(0, visibleCourses).map((course) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-lg p-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600 text-sm">
                {course.department} - {course.level} Level
              </p>

              <ul className="mt-3">
                {course.notes.map((note) => (
                  <li key={note.id} className="flex items-center gap-2">
                    {getIcon(note.type)}
                    <a href={note.url} className="text-blue-600 underline">
                      {note.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No matching notes found.</p>
        )}
      </motion.div>

      {/* Infinite Scroll Load More */}
      {visibleCourses < filteredCourses.length && (
        <div ref={loadMoreRef} className="mt-6 text-center text-gray-500">
          Loading more notes...
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}
