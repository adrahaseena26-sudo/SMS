import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import Facilities from './pages/public/Facilities';
import Faculty from './pages/public/Faculty';
import ContactUs from './pages/public/ContactUs';
import SchoolTimings from './pages/public/SchoolTimings';
import TeachersEntry from './pages/public/TeachersEntry';
import StudentsEntry from './pages/public/StudentsEntry';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeachersManagement from './pages/admin/TeachersManagement';
import StudentsManagement from './pages/admin/StudentsManagement';
import TimetableManagement from './pages/admin/TimetableManagement';
import AttendanceTracking from './pages/admin/AttendanceTracking';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <HomePage />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <AboutPage />
            </>
          } />
          <Route path="/facilities" element={
            <>
              <Navbar />
              <Facilities />
            </>
          } />
          <Route path="/faculty" element={
            <>
              <Navbar />
              <Faculty />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <ContactUs />
            </>
          } />
          <Route path="/school-timings" element={
            <>
              <Navbar />
              <SchoolTimings />
            </>
          } />
          <Route path="/teachers-entry" element={
            <>
              <Navbar />
              <TeachersEntry />
            </>
          } />
          <Route path="/students-entry" element={
            <>
              <Navbar />
              <StudentsEntry />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers" element={
            <ProtectedRoute>
              <TeachersManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute>
              <StudentsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/timetable" element={
            <ProtectedRoute>
              <TimetableManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/attendance" element={
            <ProtectedRoute>
              <AttendanceTracking />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;