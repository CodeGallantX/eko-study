"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// import Header from "@/components/Header"
import ConfirmationModal from "@/components/ConfirmationModal";
import ResultModal from "@/components/ResultModal";
import Timer from "@/components/Timer";
import courses from "@/data/notes.json"

// // const courses = [
// //   { id: "cs101", name: "Computer Science 101" },
// //   { id: "math101", name: "Mathematics 101" },
// //   { id: "chem101", name: "Chemistry 101" },
// ];

const PastQuestions = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`/data/${selectedCourse}.json`)
        .then((res) => res.json())
        .then((data) => setQuestions(data.questions))
        .catch((err) => console.error("Failed to load questions", err));
    }
  }, [selectedCourse]);

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
    
    questions.forEach((q, index) => {
      if (userAnswers[index] !== undefined) {
        attempted++;
        if (userAnswers[index] === q.correctAnswer) {
          correct++;
        }
      }
    });

    const total = questions.length;
    const failed = attempted - correct;
    const ignored = total - attempted;
    const percentage = ((correct / total) * 100).toFixed(2);

    setResult({ total, attempted, correct, failed, ignored, percentage });
    setShowResult(true);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  return (
    <>
      <Header />
    <div className="px-10 lg:px-20 py-20">
      <h1 className="text-2xl font-bold">Past Questions</h1>
      {!selectedCourse && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {courses.map((course) => (
            <div
              key={course.code}
              className="p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
              onClick={() => setSelectedCourse(course.code)}
            >
              {course.name}
            </div>
          ))}
        </div>
      )}
      {selectedCourse && !isTestStarted && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setShowConfirmation(true)}
        >
          Start Test
        </button>
      )}
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
      {showResult && (
        <ResultModal result={result} onClose={() => setShowResult(false)} onReview={() => {}} />
      )}
      {showConfirmation && (
        <ConfirmationModal onConfirm={startTest} onCancel={() => setShowConfirmation(false)} />
      )}
    </div>
      <Footer />
    </>
  );
};

export default PastQuestions;
