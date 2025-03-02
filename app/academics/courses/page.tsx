"use client";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import VideoCarousel from "@/components/CourseVideos";
import PastQuestions from "@/components/PastQuestions";
import coursesVideos from "@/data/notes.json";
import { FaChevronLeft } from "react-icons/fa6"

// Define Course Type
interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  lecturers: string;
  departments: string[];
  lessons: number;
  youtubeLinks: string[];
  outline: string[];
}

const courses: Course[] = coursesVideos;

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [showPastQuestions, setShowPastQuestions] = useState(false);

  const uniqueDepartments: string[] = Array.from(
    new Set(courses.flatMap((course) => course.departments))
  );

  const page = selectedCourse
    ? {
      title: selectedCourse.name,
      breadcrumb: [
        { name: "Courses", path: "/courses" },
        { name: selectedCourse.name, path: "#" },
      ],
    }
    : {
      title: "Courses",
      breadcrumb: [{ name: "Courses", path: "/academics/courses" }],
    };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterCourses(query, departmentFilter);
  };

  const handleDepartmentFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const department = e.target.value;
    setDepartmentFilter(department);
    filterCourses(searchQuery, department);
  };

  const filterCourses = (query: string, department: string) => {
    const regex = new RegExp(query, "i");
    setFilteredCourses(
      courses.filter(
        (course) =>
          (regex.test(course.name) ||
            regex.test(course.code) ||
            regex.test(course.lecturers)) &&
          (department === "" || course.departments.includes(department))
      )
    );
  };

  return (
    <>
      <Preloader />
      <div>
        <Header />
        <Banner page={page} />
        <div className="py-10 px-6 lg:px-20">
          {!selectedCourse ? (
            <>
              <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                />
                <select
                  value={departmentFilter}
                  onChange={handleDepartmentFilter}
                  className="w-full md:w-1/3 mt-4 md:mt-0 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="border border-deepGreen p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition bg-white hover:bg-opacity-90"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <h2 className="text-xl font-bold text-gray-800">
                        {course.name} [{course.code}]
                      </h2>
                      <p className="text-gray-600 mt-2">{course.description}</p>
                      {/* <p className="text-gray-500 mt-1 font-semibold">
                        Instructor: {course.lecturers}
                      </p> */}
                    </div>
                  ))
                ) : (
                  <p>No courses available</p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white">
              <button
                className="mb-4 px-6 py-2 rounded bg-green text-white font-bold hover:bg-opacity-80 transition"
                onClick={() => setSelectedCourse(null)}
              >
                <FaChevronLeft className="inline-block mr-1" />
                Back to Courses
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCourse.name} [{selectedCourse.code}]
                  </h2>
                  <p className="text-gray-600 mb-4 mt-2 text-lg">
                    {selectedCourse.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-gray-700">
                      <p>
                        <strong>Lecturers:</strong> {selectedCourse.lecturers}
                      </p>
                      <p>
                        <strong>Lessons:</strong> {selectedCourse.lessons}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-6 text-gray-900">
                    Course Outline
                  </h3>
                  <ul className="list-disc ml-6 text-gray-700 mt-2">
                    {selectedCourse.outline.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
                {selectedCourse && (
                  <>
                    {/* Button to open past questions */}
                    <button
                      onClick={() => setShowPastQuestions(true)}
                      className="bg-green text-white px-4 py-2 rounded-lg hover:bg-deepGreen"
                    >
                      Try Past Questions
                    </button>

                    {/* Render PastQuestions as a modal when showPastQuestions is true */}
                    {showPastQuestions && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <PastQuestions
                          courseID={String(selectedCourse?.id)} // Convert number to string
                          onClose={() => setShowPastQuestions(false)}
                        />


                      </div>
                    )}
                  </>
                )}

                <div>
                  <h3 className="text-xl font-bold mt-6 lg:mt-0 space-y-3 text-gray-900">
                    Video Lessons
                    <VideoCarousel videos={selectedCourse.youtubeLinks} />
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}


