import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaUserGraduate, 
  FaChalkboardTeacher,
  FaAward,
  FaHeart,
  FaLightbulb,
  FaUsers
} from 'react-icons/fa';
import axios from 'axios';

const AboutPage = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading...</span>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About {schoolData?.schoolName || 'ABC School'}</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Nurturing minds, building futures, and creating leaders of tomorrow through 
              excellence in education and holistic development
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 p-3 rounded-lg mr-4">
                <FaLightbulb className="text-primary-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To provide quality education that empowers students with knowledge, skills, and values 
              necessary to become responsible global citizens. We strive to create an inclusive 
              learning environment that fosters creativity, critical thinking, and character development.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaAward className="text-green-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To be a leading educational institution that inspires excellence, innovation, and 
              integrity in every student. We envision a future where our graduates contribute 
              meaningfully to society and lead positive change in their communities.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-lg text-gray-600">
              Meet the dedicated leaders who guide our educational mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {schoolData?.founder?.name || 'Dr. ABC Founder'}
              </h3>
              <p className="text-primary-600 font-medium mb-4">Founder & Chairman</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {schoolData?.founder?.details || 'Visionary educator and founder of our institution with decades of experience in educational leadership.'}
              </p>
            </div>

            {/* Principal */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {schoolData?.principal?.name || 'Mrs. XYZ Principal'}
              </h3>
              <p className="text-primary-600 font-medium mb-4">Principal</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {schoolData?.principal?.details || 'Experienced educational leader committed to academic excellence and student development.'}
              </p>
            </div>

            {/* Headmaster */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                {schoolData?.headmaster?.imageUrl ? (
                  <img 
                    src={schoolData.headmaster.imageUrl} 
                    alt={schoolData.headmaster.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUsers className="text-4xl text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {schoolData?.headmaster?.name || 'Mr. PQR Headmaster'}
              </h3>
              <p className="text-primary-600 font-medium mb-4">Headmaster</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {schoolData?.headmaster?.details || 'Dedicated administrator ensuring quality education and student welfare.'}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                Striving for the highest standards in education and personal development.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600 text-sm">
                Fostering empathy, kindness, and understanding in all our interactions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Embracing creativity and new approaches to learning and teaching.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                Building strong relationships and fostering a sense of belonging.
              </p>
            </div>
          </div>
        </div>

        {/* School History */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">
              A legacy of educational excellence spanning decades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">1990</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Foundation</h3>
              <p className="text-gray-600 text-sm">
                ABC School was established with a vision to provide quality education 
                and nurture young minds for a better future.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">2000+</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Students Graduated</h3>
              <p className="text-gray-600 text-sm">
                Over two thousand students have graduated from our institution, 
                going on to excel in various fields and contribute to society.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">30+</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Years of Excellence</h3>
              <p className="text-gray-600 text-sm">
                Three decades of commitment to educational excellence, 
                innovation, and student development.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Become part of our educational family and experience the difference 
              that quality education and caring community can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/facilities"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                View Facilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;