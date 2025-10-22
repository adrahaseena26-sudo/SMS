import React, { useState, useEffect } from 'react';
import { FaClock, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SchoolTimings = () => {
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimings();
  }, []);

  const fetchTimings = async () => {
    try {
      const response = await axios.get('/api/schoolmeta/timings');
      if (response.data.success) {
        setTimings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching timings:', error);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <FaClock className="mx-auto text-4xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">School Timings</h1>
            <p className="text-lg text-gray-600">Daily schedule and class timings</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Morning Session */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Morning Session
            </h2>
            <div className="space-y-4">
              {timings?.morning?.map((period, index) => (
                <div 
                  key={index}
                  className={`flex justify-between items-center p-4 rounded-lg ${
                    period.type === 'break' 
                      ? 'bg-orange-50 border-l-4 border-orange-400' 
                      : 'bg-blue-50 border-l-4 border-blue-400'
                  }`}
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{period.period}</h3>
                    {period.type === 'break' && (
                      <span className="text-sm text-orange-600">Break Time</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-700">
                      {period.startTime} - {period.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Afternoon Session */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Afternoon Session
            </h2>
            <div className="space-y-4">
              {timings?.afternoon?.map((period, index) => (
                <div 
                  key={index}
                  className={`flex justify-between items-center p-4 rounded-lg ${
                    period.type === 'break' 
                      ? 'bg-orange-50 border-l-4 border-orange-400' 
                      : 'bg-green-50 border-l-4 border-green-400'
                  }`}
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{period.period}</h3>
                    {period.type === 'break' && (
                      <span className="text-sm text-orange-600">Break Time</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-700">
                      {period.startTime} - {period.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              Students should arrive 15 minutes before the first period
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              Late arrivals must report to the office before entering class
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              Break times are strictly observed for student safety
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              School gates close 30 minutes after the last period
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchoolTimings;