import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaClock, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook, 
  FaFlask, 
  FaDesktop, 
  FaDumbbell, 
  FaTheaterMasks,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaGraduationCap,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';
import axios from 'axios';

const HomePage = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const fetchSchoolData = async () => {
    try {
      const response = await axios.get('/api/schoolmeta');
      if (response.data.success) {
        setSchoolData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    {
      title: 'School Timings',
      description: 'View daily schedule and class timings',
      icon: FaClock,
      path: '/school-timings',
      color: 'bg-blue-500'
    },
    {
      title: 'Student Entry',
      description: 'View student information and records',
      icon: FaUserGraduate,
      path: '/students-entry',
      color: 'bg-green-500'
    },
    {
      title: 'Teachers Entry',
      description: 'View faculty information and details',
      icon: FaChalkboardTeacher,
      path: '/teachers-entry',
      color: 'bg-purple-500'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with us for any inquiries',
      icon: FaPhone,
      path: '/contact',
      color: 'bg-orange-500'
    }
  ];

  const facilityIcons = {
    'Smart Classrooms': FaDesktop,
    'Science Laboratory': FaFlask,
    'Computer Lab': FaDesktop,
    'Library': FaBook,
    'Sports Complex': FaDumbbell,
    'Auditorium': FaTheaterMasks
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to {schoolData?.schoolName || 'ABC School'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Nurturing Excellence in Education Since 1990
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admin/login"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Admin Portal
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-lg text-gray-600">Access important information quickly</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow group"
                >
                  <div className={`${link.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Our School</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {schoolData?.schoolName} is committed to providing quality education and fostering 
              the holistic development of our students through innovative teaching methods and 
              comprehensive learning experiences.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Founder */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {schoolData?.founder?.imageUrl ? (
                  <img 
                    src={schoolData.founder.imageUrl} 
                    alt={schoolData.founder.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUserGraduate className="text-4xl text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {schoolData?.founder?.name || 'Founder'}
              </h3>
              <p className="text-sm text-primary-600 mb-3">Founder</p>
              <p className="text-gray-600 text-sm">
                {schoolData?.founder?.details || 'Visionary leader and founder of our institution.'}
              </p>
            </div>

            {/* Principal */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {schoolData?.principal?.imageUrl ? (
                  <img 
                    src={schoolData.principal.imageUrl} 
                    alt={schoolData.principal.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaChalkboardTeacher className="text-4xl text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {schoolData?.principal?.name || 'Principal'}
              </h3>
              <p className="text-sm text-primary-600 mb-3">Principal</p>
              <p className="text-gray-600 text-sm">
                {schoolData?.principal?.details || 'Leading our academic excellence and student development.'}
              </p>
            </div>

            {/* Headmaster */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {schoolData?.headmaster?.imageUrl ? (
                  <img 
                    src={schoolData.headmaster.imageUrl} 
                    alt={schoolData.headmaster.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUserGraduate className="text-4xl text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {schoolData?.headmaster?.name || 'Headmaster'}
              </h3>
              <p className="text-sm text-primary-600 mb-3">Headmaster</p>
              <p className="text-gray-600 text-sm">
                {schoolData?.headmaster?.details || 'Ensuring discipline and quality education for all students.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Facilities</h2>
            <p className="text-lg text-gray-600">
              State-of-the-art facilities to support comprehensive learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolData?.facilities?.map((facility, index) => {
              const IconComponent = facilityIcons[facility.name] || FaBook;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      <IconComponent className="text-primary-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                  </div>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* School Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="h-8 w-8 text-primary-400 mr-3" />
                <h3 className="text-xl font-bold">{schoolData?.schoolName || 'ABC School'}</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Nurturing excellence in education and building future leaders through 
                comprehensive learning and character development.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/facilities" className="text-gray-400 hover:text-white transition-colors">
                    Our Facilities
                  </Link>
                </li>
                <li>
                  <Link to="/teachers-entry" className="text-gray-400 hover:text-white transition-colors">
                    Faculty
                  </Link>
                </li>
                <li>
                  <Link to="/students-entry" className="text-gray-400 hover:text-white transition-colors">
                    Students
                  </Link>
                </li>
                <li>
                  <Link to="/school-timings" className="text-gray-400 hover:text-white transition-colors">
                    School Timings
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">
                    {schoolData?.contactInfo?.address || '123 Education Street, Knowledge City, Karnataka - 560001'}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-primary-400 mr-3 flex-shrink-0" />
                  <a 
                    href={`tel:${schoolData?.contactInfo?.phone || '9876543210'}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {schoolData?.contactInfo?.phone || '9876543210'}
                  </a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-400 mr-3 flex-shrink-0" />
                  <a 
                    href={`mailto:${schoolData?.contactInfo?.email || 'info@abcschool.edu'}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {schoolData?.contactInfo?.email || 'info@abcschool.edu'}
                  </a>
                </div>
                {schoolData?.contactInfo?.website && (
                  <div className="flex items-center">
                    <FaGlobe className="text-primary-400 mr-3 flex-shrink-0" />
                    <a 
                      href={schoolData.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {schoolData.contactInfo.website}
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link
                  to="/contact"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors inline-block"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* School Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-4">School Hours</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-white font-medium">Morning Session</p>
                  <p className="text-gray-400 text-sm">9:00 AM - 12:30 PM</p>
                </div>
                <div>
                  <p className="text-white font-medium">Afternoon Session</p>
                  <p className="text-gray-400 text-sm">1:30 PM - 4:00 PM</p>
                </div>
                <div>
                  <p className="text-white font-medium">Office Hours</p>
                  <p className="text-gray-400 text-sm">8:30 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="text-white font-medium">Saturday</p>
                  <p className="text-gray-400 text-sm">9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  © 2024 {schoolData?.schoolName || 'ABC School'}. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Established 1990 | Excellence in Education
                </p>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
                <Link to="/facilities" className="text-gray-400 hover:text-white transition-colors">
                  Campus Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;