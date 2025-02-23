"use client";
import { useState } from "react"
import Preloader from "@/components/Preloader"
import Header from "@/components/Header"
import Banner from "@/components/Banner"
import Footer from "@/components/Footer"
import coursesVideos from "@/data/notes.json"

type Course = {
  id: number;
  name: string;
  code: string;
  description: string;
  lecturers: string;
  departments: string[];
  lessons: number;
  youtubeLinks: string[];
  outline: string[];
};

const courses: Course[] = coursesVideos

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const page = {
    title: "Courses",
    breadcrumb: [
      {
        name: "Courses",
        path: "/courses",
      }
    ]
  }

  return (
    <>
      <Preloader />
      <div>
        <Header />
        <Banner page={page} />
        <div className="py-10 px-6 lg:px-20">

          {!selectedCourse ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-deepGreen p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition bg-white hover:bg-opacity-90 "
                  onClick={() => setSelectedCourse(course)}
                >
                  <h2 className="text-xl font-bold text-gray-800">{course.name} [{course.code}]</h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <p className="text-gray-500 mt-1 font-semibold">Instructor: {course.lecturers}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white">
              <button
                className="mb-4 px-6 py-2 rounded bg-green text-white font-bold hover:bg-opacity-80 transition"
                onClick={() => setSelectedCourse(null)}
              >
                Back to Courses
              </button>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCourse.name} [{selectedCourse.code}]</h2>
                  <p className="text-gray-600 mb-4 mt-2 text-lg">{selectedCourse.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-gray-700">
                      <p><strong>Lecturers:</strong> {selectedCourse.lecturers}</p>
                      <p><strong>Lessons:</strong> {selectedCourse.lessons}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-6 text-gray-900">Course Outline</h3>
                  <ul className="list-disc ml-6 text-gray-700 mt-2">
                    {selectedCourse.outline.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mt-6 text-gray-900">Video Lessons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {selectedCourse.youtubeLinks.map((link, index) => (
                      <iframe
                        key={index}
                        className="w-full h-64 rounded-lg shadow-md"
                        src={link}
                        title={`Video ${index + 1}`}
                        allowFullScreen
                      ></iframe>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  )
}