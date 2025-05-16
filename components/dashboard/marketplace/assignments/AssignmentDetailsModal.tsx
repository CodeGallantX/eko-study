// Placeholder components for modals (will be implemented later)
import React from 'react';

interface Task {
  type: 'text' | 'image';
  content: string; // Text content or image URL
}

interface Assignment {
  title: string;
  dueDate: string; // Or Date type
  course: string;
  tasks: Task[];
}

interface AssignmentDetailsModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentDetailsModal: React.FC<AssignmentDetailsModalProps> = ({ assignment, onClose, isOpen }) => {
    if (!isOpen) return null;
    // Basic structure, will be expanded with assignment details and responsiveness
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Assignment Details</h2>
          {/* Display assignment details here */}
          <p>Course: {assignment.course}</p>
          <p>Due Date: {assignment.dueDate}</p>
          {/* Add tasks, download button etc. */}
          <div>
            <h3>Tasks:</h3>
            <ul>
              {assignment.tasks.map((task, index) => (
                <li key={index}>{task.content} - ({task.type})</li> // Basic display, will add download later
              ))}
            </ul>
          </div>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    );
  };
  

  
  