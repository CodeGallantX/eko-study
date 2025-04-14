// components/ConfirmationModal.tsx
"use client";
import { motion } from "framer-motion";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({ onConfirm, onCancel }: ConfirmationModalProps) {
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
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to submit?</h2>
        <p className="text-gray-600 mb-6">You will not be able to change your answers after submission.</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={onConfirm}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 