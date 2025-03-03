"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes, FaQuestionCircle } from "react-icons/fa";

interface Question {
  questionText: string;
  options: { [key: string]: string };
  correctAnswer: string;
  explanation: string;
}

interface PastQuestionsProps {
  courseID: string;
  onClose: () => void;
}

const PastQuestions = ({ courseID, onClose }: PastQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [results, setResults] = useState({ attempted: 0, correct: 0, ignored: 0 });
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!courseID) {
        console.error("Error: courseID is undefined");
        return;
      }

      try {
        const data = await import(`@/data/past-questions/${courseID}.json`);
        setQuestions(data.default?.questions || []);
      } catch (error) {
        console.error(`Failed to load questions for ${courseID}:`, error);
        setQuestions([]); // Prevents undefined errors
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [courseID]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => Math.max(prev - 1, 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswerSelect = (option: string) => {
    if (!questions[currentIndex]) return;
    setSelectedAnswer(option);
    const isCorrect = option === questions[currentIndex].correctAnswer;
    setResults((prev) => ({
      ...prev,
      attempted: prev.attempted + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
    }));
  };

  const handleNext = () => {
    if (questions.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (questions.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    if (results.attempted > 0) setShowResults(true);
  };

  if (loading) return <div className="text-center text-gray-600">Loading questions...</div>;
  if (questions.length === 0) return <div className="text-center text-red-500">No questions available for {courseID}.</div>;

  return (
    <AnimatePresence>
      {!showResults ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Past Questions - {courseID}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <p className="text-lg font-semibold">Question {currentIndex + 1} of {questions.length}</p>
            <p className="text-gray-700">{questions[currentIndex]?.questionText}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(questions[currentIndex]?.options || {}).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(key)}
                  className={`p-4 rounded-lg border ${
                    selectedAnswer === key ? "bg-green text-white" : "bg-beige text-gray-700"
                  }`}
                >
                  {key}: {value}
                </button>
              ))}
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center text-green hover:text-deepGreen"
              >
                <FaChevronLeft className="mr-2" /> Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="flex items-center text-green hover:text-deepGreen"
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setShowExplanation(!showExplanation)} className="text-yellow hover:text-deepGreen">
                <FaQuestionCircle className="mr-2" /> {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green text-white px-4 py-2 rounded-lg hover:bg-deepGreen"
                disabled={results.attempted === 0}
              >
                Submit
              </button>
            </div>
            {showExplanation && (
              <div className="mt-4 p-4 bg-beige rounded-lg">
                <p>{questions[currentIndex]?.explanation}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-4">
          <h2 className="text-xl font-bold">Results</h2>
          <p>Attempted: {results.attempted}</p>
          <p>Correct: {results.correct}</p>
          <p>Ignored: {questions.length - results.attempted}</p>
          <button onClick={onClose} className="mt-4 bg-green text-white px-4 py-2 rounded-lg hover:bg-deepGreen">
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PastQuestions;
