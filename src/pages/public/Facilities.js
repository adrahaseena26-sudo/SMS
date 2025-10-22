import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaBook, 
  FaFlask, 
  FaDesktop, 
  FaDumbbell, 
  FaTheaterMasks,
  FaChalkboard,
  FaMicroscope,
  FaBasketballBall,
  FaMusic
} from 'react-icons/fa';
import axios from 'axios';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('/api/schoolmeta');
      if (response.data.success) {
        setFacilities(response.data.data.facilities || []);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const facilityIcons = {
    'Smart Classrooms': FaChalkboard,
    'Science Laboratory': FaFlask,
    'Computer Lab': FaDesktop,
    'Library': FaBook,
    'Sports Complex': FaDumbbell,
    'Auditorium': FaTheaterMasks
  };

  const facilityColors = {
    'Smart Classrooms': 'from-blue-500 to-blue-600',
    'Science Laboratory': 'from-green-500 to-green-600',
    'Computer Lab': 'from-purple-500 to-purple-600',
    'Library': 'from-orange-500 to-orange-600',
    'Sports Complex': 'from-red-500 to-red-600',
    'Auditorium': 'from-pink-500 to-pink-600'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading facilities...</span>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              State-of-the-art facilities designed to provide the best learning environment 
              and support comprehensive education for all our students
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const IconComponent = facilityIcons[facility.name] || FaBook;
            const gradientColor = facilityColors[facility.name] || 'from-gray-500 to-gray-600';
            
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Facility Image/Icon Header */}
                <div className={`bg-gradient-to-r ${gradientColor} p-8 text-center`}>
                  {facility.imageUrl ? (
                    <img 
                      src={facility.imageUrl} 
                      alt={facility.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <IconComponent className="text-white text-5xl mx-auto group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>

                {/* Facility Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                {/* Facility Features (if any) */}
                <div className="px-6 pb-6">
                  <div className="border-t pt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Available for all students
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Facilities Matter</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our world-class facilities are designed to enhance learning experiences and 
              provide students with the tools they need to excel in their academic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMicroscope className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Equipment</h3>
              <p className="text-gray-600 text-sm">
                Latest technology and equipment to support hands-on learning and practical experience.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBasketballBall className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Holistic Development</h3>
              <p className="text-gray-600 text-sm">
                Facilities that support not just academic growth but also physical, cultural, and social development.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMusic className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creative Spaces</h3>
              <p className="text-gray-600 text-sm">
                Dedicated spaces for arts, music, and creative expression to nurture talent and creativity.
              </p>
            </div>
          </div>
        </div>

        {/* Facility Usage Guidelines */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Facility Usage Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  All facilities are available during school hours
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Proper supervision required for laboratory use
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Sports complex available for physical education classes
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Library resources can be borrowed with student ID
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety & Maintenance</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Regular maintenance ensures optimal functionality
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Safety protocols strictly followed in all areas
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Equipment handling training provided to students
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Emergency procedures clearly displayed
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact for More Information */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Visit Our Facilities?</h2>
            <p className="text-gray-600 mb-6">
              Schedule a visit to see our world-class facilities in person and learn more about 
              how they support our educational programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/"
                className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;