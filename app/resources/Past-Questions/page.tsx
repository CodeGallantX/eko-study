"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfirmationModal from "@/components/ConfirmationModal";
import ResultModal from "@/components/ResultModal";
import Timer from "@/components/Timer";
import notes from "@/data/notes.json"; // List of courses

interface Course {
  id: string;
  name: string;
  code: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Result {
  total: number;
  attempted: number;
  correct: number;
  failed: number;
  ignored: number;
  percentage: string;
}

const courses: Course[] = notes;

const PastQuestions = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to load past questions dynamically
  const handleCourseSelect = async (courseCode: string) => {
    setLoading(true);
    setSelectedCourse(courseCode);

    try {
      const data = await import(`@/data/past-questions/${courseCode}.json`);
      setQuestions(data.default || []);
    } catch (error) {
      console.error(`Error loading past questions for ${courseCode}:`, error);
      setQuestions([]);
    }

    setLoading(false);
  };

  const startTest = () => {
    setShowConfirmation(false);
    setIsTestStarted(true);
    setUserAnswers({});
    setTimeLeft(900);
  };

  const submitTest = () => {
    setIsTestStarted(false);
    calculateScore();
  };

  const calculateScore = () => {
    let correct = 0;
    let attempted = 0;
    const total = questions.length;

    questions.forEach((q, index) => {
      if (userAnswers[index] !== undefined) {
        attempted++;
        if (userAnswers[index] === q.correctAnswer) {
          correct++;
        }
      }
    });

    const failed = attempted - correct;
    const ignored = total - attempted;
    const percentage = ((correct / total) * 100).toFixed(2);

    setResult({ total, attempted, correct, failed, ignored, percentage });
    setShowResult(true);
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  return (
    <>
      <Header />
      <div className="px-10 lg:px-20 py-20">
        <h1 className="text-2xl font-bold">Past Questions</h1>

        {/* Course Selection */}
        {!selectedCourse && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {courses.map((course) => (
              <div
                key={course.code}
                className="p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
                onClick={() => handleCourseSelect(course.code)}
              >
                {course.name}
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && <p className="mt-4 text-lg text-gray-500">Loading past questions...</p>}

        {/* Start Test Button */}
        {selectedCourse && !isTestStarted && !loading && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setShowConfirmation(true)}
          >
            Start Test
          </button>
        )}

        {/* Quiz Questions */}
        {isTestStarted && (
          <div>
            <Timer duration={timeLeft} onTimeUp={submitTest} />
            <div className="mt-4 space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <p className="font-semibold">{q.question}</p>
                  <div className="space-y-2 mt-2">
                    {q.options.map((option, i) => (
                      <button
                        key={i}
                        className={`block w-full px-4 py-2 border rounded-md ${
                          userAnswers[index] === option ? "bg-blue-300" : "bg-gray-100"
                        }`}
                        onClick={() => handleAnswerSelect(index, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={submitTest}
            >
              Submit Test
            </button>
          </div>
        )}

        {/* Results Modal */}
        {showResult && result && (
          <ResultModal result={result} onClose={() => setShowResult(false)} onReview={() => {}} />
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <ConfirmationModal onConfirm={startTest} onCancel={() => setShowConfirmation(false)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default PastQuestions;
