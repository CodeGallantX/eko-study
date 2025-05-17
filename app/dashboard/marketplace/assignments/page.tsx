'use client';

import React, { useState } from 'react';
import { AssignmentDetailsModal } from '@/components/dashboard/marketplace/assignments/AssignmentDetailsModal';
import { UploadAssignmentModal } from '@/components/dashboard/marketplace/assignments/UploadAssignmentModal';

type Assignment = {
  id: number;
  course: string;
  title: string;
  dueDate: string;
};

export default function AssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Placeholder assignment data
  const assignments: Assignment[] = [
    { id: 1, course: 'MATH 101', title: 'Homework 1', dueDate: '2023-10-27' },
    { id: 2, course: 'PHYS 201', title: 'Lab Report', dueDate: '2023-11-03' },
  ];

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assignments Marketplace</h1>

      {/* Section to display assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="border p-4 rounded-lg cursor-pointer" onClick={() => handleViewAssignment(assignment)}>
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <p className="text-gray-600">Due Date: {assignment.dueDate}</p>
          </div>
        ))}
      </div>

      {/* Button to open upload modal */}
      <button onClick={() => setIsUploadModalOpen(true)} className="mt-6 px-4 py-2 bg-green-500 text-white rounded">
        Upload Assignment/Answer
      </button>

      {/* Assignment Details Modal */}
      <AssignmentDetailsModal
        assignment={selectedAssignment}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Upload Assignment Modal */}
      <UploadAssignmentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}