// "use client";

// import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
// import ConfirmationModal from "@/components/ConfirmationModal";
// import ResultModal from "@/components/ResultModal";
// import Timer from "@/components/Timer";
// import axios from "axios";

// interface Course {
//   course_code: string;
//   title: string;
// }

// interface Question {
//   question_number: number;
//   question: string;
//   options: { [key: string]: string };
//   correct_answer: string;
//   explanation: string;
// }

// interface Result {
//   totalQuestions: number;
//   attempted: number;
//   correct: number;
//   failed: number;
//   ignored: number;
//   percentage: string;
// }

// const courses: Course[] = [
//   { course_code: "CHM101", title: "Chemistry 101" },
//   { course_code: "PHY101", title: "Physics 101" },
//   { course_code: "YOR101", title: "Yoruba 101" },
//   { course_code: "MTH101", title: "Mathematics 101" },
//   { course_code: "COS101", title: "Computer Science 101" },
//   { course_code: "CSC103", title: "Computer Science 103" },
//   { course_code: "LIB101", title: "Library 101" },
// ];

// const PastQuestions = () => {
//   const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
//   const [isTestStarted, setIsTestStarted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(900);
//   const [showResult, setShowResult] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [result, setResult] = useState<Result | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (selectedCourse) {
//       const fetchQuestions = async () => {
//         setIsLoading(true);
//         try {
//           const response = await axios.get(
//             `http://127.0.0.1:8000/api/questions/courses/${selectedCourse}/`
//           );
//           setQuestions(response.data);
//         } catch (error) {
//           console.error("Error fetching questions:", error);
//           setQuestions([]);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchQuestions();
//     }
//   }, [selectedCourse]);

//   const startTest = () => {
//     setShowConfirmation(false);
//     setIsTestStarted(true);
//     setUserAnswers({});
//     setTimeLeft(900);
//   };

//   const submitTest = () => {
//     setIsTestStarted(false);
//     calculateScore();
//   };

//   const calculateScore = () => {
//     let correct = 0;
//     let attempted = 0;
//     const totalQuestions = questions.length;

//     questions.forEach((q) => {
//       if (userAnswers[q.question_number] !== undefined) {
//         attempted++;
//         if (userAnswers[q.question_number] === q.correct_answer) {
//           correct++;
//         }
//       }
//     });

//     const failed = attempted - correct;
//     const ignored = totalQuestions - attempted;
//     const percentage = ((correct / totalQuestions) * 100).toFixed(2);

//     setResult({ totalQuestions, attempted, correct, failed, ignored, percentage });
//     setShowResult(true);
//   };

//   const handleAnswerSelect = (questionNumber: number, answer: string) => {
//     setUserAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
//   };

//   return (
//     <>
//       <Header />
//       <div className="px-10 lg:px-20 py-20">
//         <h1 className="text-2xl font-bold">Past Questions</h1>
//         {!selectedCourse && (
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             {courses.map((course) => (
//               <div
//                 key={course.course_code}
//                 className="p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
//                 onClick={() => setSelectedCourse(course.course_code)}
//               >
//                 {course.title}
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedCourse && !isTestStarted && (
//           <div>
//             <button
//               className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg"
//               onClick={() => setSelectedCourse(null)}
//             >
//               Back to Courses
//             </button>
//             <button
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
//               onClick={() => setShowConfirmation(true)}
//             >
//               Start Test
//             </button>
//           </div>
//         )}

//         {isLoading && <div className="text-center mt-4">Loading...</div>}

//         {isTestStarted && (
//           <div>
//             <Timer duration={timeLeft} onTimeUp={submitTest} />
//             <div className="mt-4 space-y-4">
//               {questions.map((q) => (
//                 <div key={q.question_number} className="p-4 border rounded-md">
//                   <p className="font-semibold">{q.question}</p>
//                   <div className="space-y-2 mt-2">
//                     {Object.entries(q.options).map(([optionKey, optionValue]) => (
//                       <button
//                         key={optionKey}
//                         className={`block w-full px-4 py-2 border rounded-md ${
//                           userAnswers[q.question_number] === optionKey
//                             ? "bg-blue-300"
//                             : "bg-gray-100"
//                         }`}
//                         onClick={() =>
//                           handleAnswerSelect(q.question_number, optionKey)
//                         }
//                       >
//                         {optionValue}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
//               onClick={submitTest}
//             >
//               Submit Test
//             </button>
//           </div>
//         )}

//         {showResult && result && (
//           <ResultModal
//             result={result}
//             onClose={() => setShowResult(false)}
//             onReview={() => {}}
//           />
//         )}

//         {showConfirmation && (
//           <ConfirmationModal
//             onConfirm={startTest}
//             onCancel={() => setShowConfirmation(false)}
//           />
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PastQuestions;


export default function App () {
  return (
    <>
    <Header/>
    <div className="flex flex-col space-y-3 py-20 items-center justify-center px-10 lg:px-20">
    <h1 className="text-2xl">The page is currently being maintained. Check back later.</h1>
    <Link href="/" className="bg-green px-4 py-3 uppercase hover:bg-yellow transition-all duration-300 ease-in-out">Back to home</Link>
    </div>
    <Footer />
    </>
  )
}