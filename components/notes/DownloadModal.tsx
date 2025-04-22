"use client";
import { useEffect, useState, useCallback } from "react";
import { FaDownload, FaCheckCircle, FaTimes } from "react-icons/fa";

interface DownloadModalProps {
  url: string;
  fileName: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function DownloadModal({ url, fileName, onClose, isOpen }: DownloadModalProps) {
  const [showAlert, setShowAlert] = useState(false);

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      
      // Append to body, click, and cleanup in a safe way
      if (document.body) {
        document.body.appendChild(link);
        link.click();
        // Use setTimeout to ensure the click event has time to process
        setTimeout(() => {
          if (document.body && link.parentNode === document.body) {
            document.body.removeChild(link);
          }
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
      }

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [url, fileName]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Trigger download when modal opens
  useEffect(() => {
    if (isOpen) {
      handleDownload();
    }
  }, [isOpen, handleDownload]);

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md lg:max-w-lg">
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 text-gray-600 hover:text-black" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <h3 className="text-lg font-semibold text-center mb-4">Download Lecture Note</h3>
        <p className="text-gray-600 text-center mb-4">
          Your download for <strong>{fileName}</strong> has started.
        </p>
      </div>

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
          <FaCheckCircle size={20} />
          <span>
            <FaDownload className="mr-1 inline-block" />
            Download completed: {fileName}
          </span>
          <button 
            className="ml-4 text-white hover:text-gray-200" 
            onClick={() => setShowAlert(false)}
            aria-label="Close alert"
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
