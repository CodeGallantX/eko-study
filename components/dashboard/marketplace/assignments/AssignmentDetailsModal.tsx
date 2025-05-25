import React from 'react';

interface Task {
  type: 'text' | 'image';
  content: string;
}

interface Assignment {
  title: string;
  dueDate: string;
  course: string;
  tasks: Task[];
}

interface AssignmentDetailsModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentDetailsModal: React.FC<AssignmentDetailsModalProps> = ({ 
  assignment, 
  onClose, 
  isOpen 
}) => {
  if (!isOpen || !assignment) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assignment-details-title"
    >
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
        <h2 id="assignment-details-title" className="text-xl font-bold mb-4">
          Assignment Details
        </h2>
        
        <div className="space-y-2 mb-4">
          <p>
            <span className="font-medium">Course:</span> {assignment.course}
          </p>
          <p>
            <span className="font-medium">Due Date:</span> {assignment.dueDate}
          </p>
          <p>
            <span className="font-medium">Title:</span> {assignment.title}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Tasks:</h3>
          <ul className="space-y-2">
            {assignment.tasks.map((task, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">
                  {task.type === 'image' ? '🖼️' : '📝'}
                </span>
                <div>
                  {task.type === 'image' ? (
                    <a 
                      href={task.content} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Image
                    </a>
                  ) : (
                    <p>{task.content}</p>
                  )}
                  <span className="text-xs text-gray-500 ml-1">
                    ({task.type})
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Close assignment details"
        >
          Close
        </button>
      </div>
    </div>
  );
};