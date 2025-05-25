'use client';

import React, { useState, useCallback } from 'react';

import  { AssignmentDetailsModal } from '@/components/dashboard/marketplace/assignments/AssignmentDetailsModal';

import { UploadAssignmentModal }  from '@/components/dashboard/marketplace/assignments/UploadAssignmentModal'

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
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: 1, 
      course: 'MATH 101', 
      title: 'Homework 1', 
      dueDate: '2023-10-27',
      tasks: [
        { type: 'text', content: 'Solve all problems in chapter 2' },
        { type: 'image', content: '/math-problems.png' }
      ]
    },
    { 
      id: 2, 
      course: 'PHYS 201', 
      title: 'Lab Report', 
      dueDate: '2023-11-03',
      tasks: [
        { type: 'text', content: 'Write a 3-page report on the experiment' },
        { type: 'image', content: '/lab-results.jpg' }
      ]
    },
  ]);

  const handleViewAssignment = useCallback((assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailsModalOpen(true);
  }, []);

  const handleUpload = useCallback(async (uploadData: {
    courseCode: string;
    title: string;
    dueDate: string;
    department: string;
    description: string;
    file?: File;
  }) => {
    // In a real app, you would upload to your backend here
    console.log('Uploading assignment:', uploadData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new assignment for demo purposes
    const newAssignment: Assignment = {
      id: assignments.length + 1,
      title: uploadData.title,
      course: uploadData.courseCode,
      dueDate: uploadData.dueDate,
      tasks: [
        { type: 'text', content: uploadData.description }
      ]
    };

    setAssignments(prev => [...prev, newAssignment]);
    setIsUploadModalOpen(false);
  }, [assignments.length]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assignments Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
        {assignments.map(assignment => (
          <article 
            key={assignment.id}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleViewAssignment(assignment)}
            aria-labelledby={`assignment-${assignment.id}-title`}
            tabIndex={0}
            role="listitem"
          >
            <h2 id={`assignment-${assignment.id}-title`} className="text-lg font-semibold">
              {assignment.title}
            </h2>
            <p className="text-gray-600">Course: {assignment.course}</p>
            <p className="text-gray-600">Due: {assignment.dueDate}</p>
            <p className="text-sm text-gray-500 mt-2">
              {assignment.tasks.length} task{assignment.tasks.length !== 1 ? 's' : ''}
            </p>
          </article>
        ))}
      </div>

      <button 
        onClick={() => setIsUploadModalOpen(true)} 
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Upload new assignment"
      >
        Upload Assignment/Answer
      </button>

      {isDetailsModalOpen && selectedAssignment && (
        <AssignmentDetailsModal
          assignment={selectedAssignment}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      {isUploadModalOpen && (
        <UploadAssignmentModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}