// components/PastQuestionPage.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCheck, FaTimes } from "react-icons/fa";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Timer from "@/components/Timer";
import ResultModal from "@/components/ResultModal";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Question {
  questionText: string;
  options: { [key: string]: string };
  correctAnswer: string;
  explanation: string;
}

interface PastQuestionPageProps {
  courseCode: string;
  questions: Question[];
}

export default function PastQuestionPage({ courseCode, questions }: PastQuestionPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    setShowExplanation(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmationModal(false);
    setShowResultModal(true);
  };

  const calculateResult = () => {
    const totalQuestions = questions.length;
    const attempted = Object.keys(selectedAnswers).length;
    const correct = Object.entries(selectedAnswers).filter(
      ([index, answer]) => questions[Number(index)].correctAnswer === answer
    ).length;
    const failed = attempted - correct;
    const ignored = totalQuestions - attempted;

    return {
      totalQuestions,
      attempted,
      correct,
      failed,
      ignored,
      percentage: ((correct / totalQuestions) * 100).toFixed(2),
    };
  };

  return (
    <>
      <Header />
      <Banner page={{ title: `Past Questions - ${courseCode}`, breadcrumb: [] }} />
      <div className="px-6 xl:px-24 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{courseCode} Past Questions</h1>
          <Timer duration={45 * 60} onTimeUp={() => setShowConfirmationModal(true)} />
        </div>

        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="bg-white rounded-md p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1}: {currentQuestion.questionText}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-md cursor-pointer ${
                  selectedAnswer === key
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswerSelect(key)}
              >
                <span className="font-semibold">{key}:</span> {value}
              </motion.div>
            ))}
          </div>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-md"
            >
              <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}
          <div className="flex justify-between items-center mt-6">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={handlePreviousQuestion}
            >
              <FaChevronLeft /> Previous
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setShowExplanation((prev) => !prev)}
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={handleNextQuestion}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleConfirmSubmit}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}

      {showResultModal && (
        <ResultModal
          result={calculateResult()}
          onClose={() => setShowResultModal(false)}
          onReview={() => setShowResultModal(false)}
        />
      )}
    </>
  );
}