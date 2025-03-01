"use client";
import { useEffect } from "react";
import { saveAs } from "file-saver"; // Import file-saver library
import { FaDownload } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

interface DownloadModalProps {
  url: string;
  fileName: string; // Add fileName prop
  onClose: () => void;
}

export default function DownloadModal({ url, fileName, onClose }: DownloadModalProps) {
  const handleDownload = () => {
    // Trigger download using file-saver
    saveAs(url, fileName);
    onClose(); // Close the modal after download
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md lg:max-w-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <h3 className="text-lg font-semibold text-center mb-4">
          Download Lecture Note
        </h3>
        <p className="text-gray-600 text-center mb-4">
          Do you want to download <strong>{fileName}</strong>?
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-green text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2"
        >
          <FaDownload />
          Download
        </button>
      </div>
    </>
  );
}