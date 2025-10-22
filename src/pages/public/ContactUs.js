import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe,
  FaClock,
  FaUser,
  FaComment,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    try {
      // Simulate form submission (you can integrate with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading contact information...</span>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Get in touch with us for any inquiries, admissions, or information about our school
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            
            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
                  <FaMapMarkerAlt className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    {schoolData?.contactInfo?.address || '123 Education Street, Knowledge City, Karnataka - 560001'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                  <FaPhone className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    {schoolData?.contactInfo?.phone || '9876543210'}
                  </p>
                  <p className="text-sm text-gray-500">Available during school hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">
                    {schoolData?.contactInfo?.email || 'info@abcschool.edu'}
                  </p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              {schoolData?.contactInfo?.website && (
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaGlobe className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Website</h3>
                    <p className="text-gray-600">{schoolData.contactInfo.website}</p>
                  </div>
                </div>
              )}
            </div>

            {/* School Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <FaClock className="text-orange-600 text-xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">School Hours</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Morning Session</span>
                  <span className="text-gray-600">9:00 AM - 12:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Afternoon Session</span>
                  <span className="text-gray-600">1:30 PM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Office Hours</span>
                  <span className="text-gray-600">8:30 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Saturday</span>
                  <span className="text-gray-600">9:00 AM - 1:00 PM</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="input pl-10 w-full"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="input pl-10 w-full"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input pl-10 w-full"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="input w-full"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="general">General Information</option>
                      <option value="academic">Academic Programs</option>
                      <option value="facilities">Facilities</option>
                      <option value="transport">Transportation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="input pl-10 w-full resize-none"
                      placeholder="Enter your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Find Us</h2>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  {schoolData?.contactInfo?.address || '123 Education Street, Knowledge City, Karnataka - 560001'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
            <FaPhone className="text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-blue-100 mb-4">Speak directly with our staff</p>
            <a 
              href={`tel:${schoolData?.contactInfo?.phone || '9876543210'}`}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {schoolData?.contactInfo?.phone || '9876543210'}
            </a>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
            <FaEnvelope className="text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-green-100 mb-4">Send us your questions</p>
            <a 
              href={`mailto:${schoolData?.contactInfo?.email || 'info@abcschool.edu'}`}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Send Email
            </a>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center">
            <FaMapMarkerAlt className="text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-purple-100 mb-4">Come see our campus</p>
            <Link
              to="/facilities"
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Facilities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;