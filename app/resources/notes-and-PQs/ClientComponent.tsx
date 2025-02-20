"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
// import DownloadModal from "@/components/DownloadModal";
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
        regex.test(course.code) ||
        regex.test(course.level)) &&
      (!filters.college || course.college === filters.college) &&
      (!filters.department || course.department === filters.department) &&
      (!filters.level || course.level === filters.level)
    );
  });

  // const getIcon = (fileType) => {
  //   switch (fileType) {
  //     case "pdf":
  //       return <FaFilePdf className="text-gray-500 text-xl" />;
  //     case "docx":
  //       return <FaFileWord className="text-gray-500 text-xl" />;
  //     case "ppt":
  //       return <FaFilePowerpoint className="text-gray-500 text-xl" />;
  //     default:
  //       return <FaBook className="text-gray-500 text-xl" />;
  //   }
  // };

  // Banner Details
  const page = {
    title: "Notes",
    breadcrumb: [
      {
        name: "Notes",
        path: "notes"
      }
    ]
  }
  const router = useRouter();

  const handleClick = ({url}) => {
    confirm("Do you want to download this lecture note?")
    router.push(url)
  }

  return (
    <>
      <Preloader />
      <Header />
      <Banner page={page} />
      <div className="px-6 xl:px-24 py-10">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Search Box */}
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
          {/* College Filter */}
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

          {/* Department Filter (Disabled if no college selected) */}
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

          {/* Level Filter */}
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

        {/* Notes List with Animations */}
        <h1 className="text-2xl font-semibold text-left mt-14">Notes available</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.slice(0, visibleCourses).map((course) => (
              <motion.div
                key={course.id}
                className="bg-white hover:bg-green rounded-md p-3 border border-gray-500/50 flex flex-row items-center justify-between group cursor-pointer transition-all duration-300 ease-in-out"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h2 className="text-base lg:text-lg font-semibold group-hover:text-white transition-all duration-300 ease-in-out">{course.title}</h2>
                  <p className="text-gray-600 group-hover:text-gray-100 transition-all duration-300 ease-in-out text-sm lg:text-base">
                    {course.code}
                  </p>
                </div>

                {/* <ul className="mt-3">
                  {course.notes.map((note) => (
                    <li key={note.id} className="flex items-center gap-2">
                      {getIcon(note.type)}
                      <a href={note.url} className="text-blue-600 underline">
                        {note.title}
                      </a>
                    </li>
                  ))}
                </ul> */}

                <FaChevronRight className="text-gray-500/50 group-hover:text-white -translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
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
      {/* <DownloadModal url={courses.url} /> */}
      <Footer />
    </>
  );
}
