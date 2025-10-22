import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUserGraduate } from 'react-icons/fa';

const StudentsManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            to="/admin/dashboard" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center">
            <FaUserGraduate className="text-3xl text-primary-600 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
              <p className="text-gray-600">Manage student information and records</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FaUserGraduate className="mx-auto text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Students Management</h2>
          <p className="text-gray-600 mb-6">
            This page will contain full CRUD functionality for managing students including:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
            <li>• Add new students with form validation</li>
            <li>• View all students in a searchable table</li>
            <li>• Edit student information</li>
            <li>• Delete student records</li>
            <li>• Upload student photos</li>
            <li>• Filter by class and other criteria</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentsManagement;