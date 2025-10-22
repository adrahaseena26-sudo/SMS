import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaArrowLeft, FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import AddStudentModal from '../../components/AddStudentModal';

const StudentsEntry = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const classes = ['STD1', 'STD2', 'STD3', 'STD4', 'STD5', 'STD6', 'STD7', 'STD8', 'STD9', 'STD10'];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
    setShowAddModal(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === '' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <FaUserGraduate className="mx-auto text-4xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Students</h1>
            <p className="text-lg text-gray-600">Student directory and information</p>
          </div>
        </div>

        {/* Search, Filter and Add Button */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex-1 grid md:grid-cols-2 gap-4 w-full">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="input w-full"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <FaPlus className="text-sm" />
              Add Student
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {student.photoUrl ? (
                    <img 
                      src={student.photoUrl} 
                      alt={student.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUserGraduate className="text-2xl text-gray-400" />
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{student.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">Class {student.class}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Gender:</span> {student.gender}</p>
                    <p><span className="font-medium">Phone:</span> {student.phoneNumber}</p>
                    <p><span className="font-medium">Date of Birth:</span> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <FaUserGraduate className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Class Statistics */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Class Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {classes.map(cls => {
              const classCount = students.filter(s => s.class === cls).length;
              return (
                <div key={cls} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{classCount}</div>
                  <div className="text-sm text-gray-600">{cls}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <AddStudentModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onStudentAdded={handleStudentAdded}
          />
        )}
      </div>
    </div>
  );
};

export default StudentsEntry;