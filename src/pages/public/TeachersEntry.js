import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaArrowLeft, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const TeachersEntry = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      if (response.data.success) {
        setTeachers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || teacher.subject.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const allSubjects = [...new Set(teachers.flatMap(teacher => teacher.subject))];

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
            <FaChalkboardTeacher className="mx-auto text-4xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Faculty</h1>
            <p className="text-lg text-gray-600">Meet our dedicated teaching staff</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="input w-full"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {teacher.photoUrl ? (
                    <img 
                      src={teacher.photoUrl} 
                      alt={teacher.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaChalkboardTeacher className="text-2xl text-gray-400" />
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{teacher.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {teacher.subject.join(', ')}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Qualification:</span> {teacher.qualification}</p>
                    <p><span className="font-medium">Gender:</span> {teacher.gender}</p>
                    <p><span className="font-medium">Phone:</span> {teacher.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <FaChalkboardTeacher className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersEntry;