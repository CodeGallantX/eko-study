"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Header from "@/components/Header"
import Banner from "@/components/Banner"
import CourseCard from "@/components/CourseCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer"

export default function App() {
  
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filters, setFilters] = useState({ department: "", level: "" });
  
    useEffect(() => {
      fetch("../../data/notes.json") // Replace with actual API
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
          setFilteredCourses(data);
        });
    }, []);
  
    const handleFilterChange = (name: string, value: string) => {
      setFilters({ ...filters, [name]: value });
  
      const newFilteredCourses = courses.filter(
        (course) =>
          (!filters.department || course.department === filters.department) &&
          (!filters.level || course.level === filters.level)
      );
  
      setFilteredCourses(newFilteredCourses);
    };

  const page = {
      title: "Notes & Past Questions",
      breadcrumb: [
        {
          name: "Notes & Past Questions",
          path: "/notes-and-PQs",
        }
      ]
    }
  

  return (
    <div>
      <Header />
      <Banner page={page} />
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Course Notes
      </motion.h1>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            No courses found.
          </p>
        )}
      </div>
    </div>
      <Footer />
    </div>
  )
}
