import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaChalkboardTeacher, 
  FaCalendarAlt, 
  FaClipboardCheck,
  FaUserGraduate,
  FaClock,
  FaChartLine,
  FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    todayAttendance: [],
    totalPresent: 0,
    totalAbsent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [studentsRes, teachersRes, attendanceRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/teachers'),
        axios.get('/api/attendance/today')
      ]);

      let totalPresent = 0;
      let totalAbsent = 0;

      if (attendanceRes.data.success) {
        attendanceRes.data.data.forEach(classData => {
          totalPresent += classData.present;
          totalAbsent += classData.absent;
        });
      }

      setStats({
        totalStudents: studentsRes.data.total || studentsRes.data.count || 0,
        totalTeachers: teachersRes.data.total || teachersRes.data.count || 0,
        todayAttendance: attendanceRes.data.data || [],
        totalPresent,
        totalAbsent
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Manage Teachers',
      description: 'Add, edit, or view teacher information',
      icon: FaChalkboardTeacher,
      path: '/admin/teachers',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Students',
      description: 'Add, edit, or view student records',
      icon: FaUserGraduate,
      path: '/admin/students',
      color: 'bg-green-500'
    },
    {
      title: 'Timetable',
      description: 'Create and manage class timetables',
      icon: FaCalendarAlt,
      path: '/admin/timetable',
      color: 'bg-purple-500'
    },
    {
      title: 'Attendance',
      description: 'Mark and track student attendance',
      icon: FaClipboardCheck,
      path: '/admin/attendance',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {admin?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="text-gray-600 hover:text-gray-900"
              >
                View Site
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <FaUserGraduate className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaChalkboardTeacher className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTeachers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaClipboardCheck className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalPresent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <FaUsers className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Absent Today</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalAbsent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
                >
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Today's Attendance Summary */}
        {stats.todayAttendance.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Today's Attendance Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.todayAttendance.map((classData, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{classData.class}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Present:</span>
                        <span className="text-green-600 font-medium">{classData.present}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Absent:</span>
                        <span className="text-red-600 font-medium">{classData.absent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Leave:</span>
                        <span className="text-yellow-600 font-medium">{classData.leave || 0}</span>
                      </div>
                      <div className="flex justify-between border-t pt-1">
                        <span className="text-gray-600">Total Students:</span>
                        <span className="font-medium">{classData.totalStudents}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;