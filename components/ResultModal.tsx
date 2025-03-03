// components/ResultModal.tsx
"use client";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ResultModalProps {
  result: {
    totalQuestions: number;
    attempted: number;
    correct: number;
    failed: number;
    ignored: number;
    percentage: string;
  };
  onClose: () => void;
  onReview: () => void;
}

export default function ResultModal({ result, onClose, onReview }: ResultModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-md p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Your Results</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total Questions:</span>
            <span>{result.totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span>Attempted:</span>
            <span>{result.attempted}</span>
          </div>
          <div className="flex justify-between">
            <span>Correct:</span>
            <span className="text-green-500">{result.correct}</span>
          </div>
          <div className="flex justify-between">
            <span>Failed:</span>
            <span className="text-red-500">{result.failed}</span>
          </div>
          <div className="flex justify-between">
            <span>Ignored:</span>
            <span>{result.ignored}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Percentage:</span>
            <span>{result.percentage}%</span>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={onReview}
          >
            Review Answers
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 