'use client';

import React, { useState } from 'react';
import { AssignmentDetailsModal } from '@/components/dashboard/marketplace/assignments/AssignmentDetailsModal';
import { UploadAssignmentModal } from '@/components/dashboard/marketplace/assignments/UploadAssignmentModal';

// Define types in a central location (could be in a types.ts file)
type Task = {
  type: 'text' | 'image';
  content: string;
};

type Assignment = {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  tasks: Task[];
};

export default function AssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Updated placeholder assignment data with tasks
  const assignments: Assignment[] = [
    { 
      id: 1, 
      course: 'MATH 101', 
      title: 'Homework 1', 
      dueDate: '2023-10-27',
      tasks: [
        { type: 'text', content: 'Solve all problems in chapter 2' },
        { type: 'image', content: 'https://example.com/math-problems.png' }
      ]
    },
    { 
      id: 2, 
      course: 'PHYS 201', 
      title: 'Lab Report', 
      dueDate: '2023-11-03',
      tasks: [
        { type: 'text', content: 'Write a 3-page report on the experiment' },
        { type: 'image', content: 'https://example.com/lab-results.jpg' }
      ]
    },
  ];

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assignments Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map(assignment => (
          <div 
            key={assignment.id} 
            className="border p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleViewAssignment(assignment)}
          >
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <p className="text-gray-600">Course: {assignment.course}</p>
            <p className="text-gray-600">Due: {assignment.dueDate}</p>
            <p className="text-sm text-gray-500 mt-2">
              {assignment.tasks.length} task{assignment.tasks.length !== 1 ? 's' : ''}
            </p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setIsUploadModalOpen(true)} 
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Upload Assignment/Answer
      </button>

      <AssignmentDetailsModal
        assignment={selectedAssignment}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <UploadAssignmentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}