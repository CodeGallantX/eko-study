"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

interface DownloadModalProps {
  url: string;
  onClose: () => void;
}

export default function DownloadModal({ url, onClose }: DownloadModalProps) {
  const router = useRouter();

  const handleDownload = () => {
    if (confirm("Do you want to download this lecture note?")) {
      router.push(url);
    }
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        {/* Modal Content */}
        <h3 className="text-lg font-semibold text-center mb-4">
          Download Lecture Note
        </h3>
        <p className="text-gray-600 text-center mb-4">
          Click the button below to download your lecture note.
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2"
        >
          <FaDownload />
          Download
        </button>
      </div>
    </>
  );
}
