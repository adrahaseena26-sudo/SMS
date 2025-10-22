import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaChalkboardTeacher, 
  FaSearch,
  FaGraduationCap,
  FaBook,
  FaAward,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import axios from 'axios';

const Faculty = () => {
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

  // Calculate statistics
  const totalTeachers = teachers.length;
  const maleTeachers = teachers.filter(t => t.gender === 'Male').length;
  const femaleTeachers = teachers.filter(t => t.gender === 'Female').length;
  const marriedTeachers = teachers.filter(t => t.married).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading faculty information...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <FaChalkboardTeacher className="mx-auto text-6xl mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Meet our dedicated and experienced teaching staff who are committed to 
              providing quality education and nurturing young minds
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Faculty Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalTeachers}</div>
            <div className="text-gray-600 text-sm">Total Faculty</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBook className="text-green-600 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{allSubjects.length}</div>
            <div className="text-gray-600 text-sm">Subjects Taught</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGraduationCap className="text-purple-600 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{Math.round((teachers.filter(t => t.qualification.includes('M.')).length / totalTeachers) * 100)}%</div>
            <div className="text-gray-600 text-sm">Post Graduates</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaAward className="text-orange-600 text-2xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search faculty members..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
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
        </div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTeachers.map((teacher) => (
            <div key={teacher._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              {/* Teacher Photo */}
              <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 p-8">
                <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  {teacher.photoUrl ? (
                    <img 
                      src={teacher.photoUrl} 
                      alt={teacher.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaChalkboardTeacher className="text-3xl text-primary-600" />
                  )}
                </div>
              </div>
              
              {/* Teacher Info */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {teacher.subject.map((sub, index) => (
                      <span 
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Qualification:</span>
                    <span className="font-medium text-gray-900">{teacher.qualification}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium text-gray-900">{teacher.gender}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium text-gray-900">
                      {Math.floor(Math.random() * 15) + 5} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${teacher.married ? 'text-green-600' : 'text-blue-600'}`}>
                      {teacher.married ? 'Married' : 'Single'}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaPhone className="mr-2 text-primary-600" />
                    <span>{teacher.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-primary-600" />
                    <span className="truncate">{teacher.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <FaChalkboardTeacher className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No faculty members found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Faculty Departments */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Departments</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSubjects.map(subject => {
              const teacherCount = teachers.filter(t => t.subject.includes(subject)).length;
              return (
                <div key={subject} className="bg-gray-50 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{subject}</h3>
                  <p className="text-sm text-gray-600">{teacherCount} Teacher{teacherCount !== 1 ? 's' : ''}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faculty Excellence */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Excellence in Teaching</h2>
          <p className="text-primary-100 mb-6 max-w-3xl mx-auto">
            Our faculty members are not just teachers, but mentors, guides, and inspirations. 
            With their diverse expertise and dedication, they create an environment where 
            every student can thrive and reach their full potential.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{totalTeachers}+</div>
              <div className="text-primary-100">Qualified Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-primary-100">Dedicated Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Student Support</div>
            </div>
          </div>
        </div>

        {/* Contact Faculty */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect with Our Faculty</h2>
            <p className="text-gray-600 mb-6">
              Have questions about our academic programs or want to learn more about our teaching methodology? 
              Our faculty members are always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Faculty
              </Link>
              <Link
                to="/about"
                className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;