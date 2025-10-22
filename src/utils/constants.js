export const CLASSES = ['STD1', 'STD2', 'STD3', 'STD4', 'STD5', 'STD6', 'STD7', 'STD8', 'STD9', 'STD10'];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const GENDERS = ['Male', 'Female', 'Other'];

export const ATTENDANCE_STATUS = [
  { value: 'present', label: 'Present', color: 'green' },
  { value: 'absent', label: 'Absent', color: 'red' },
  { value: 'leave', label: 'Leave', color: 'yellow' }
];

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'History',
  'Geography',
  'Computer Science',
  'Physical Education',
  'Art',
  'Music'
];

export const QUALIFICATIONS = [
  'B.Ed',
  'M.Ed',
  'B.A',
  'M.A',
  'B.Sc',
  'M.Sc',
  'B.Com',
  'M.Com',
  'BCA',
  'MCA',
  'B.Tech',
  'M.Tech',
  'PhD'
];

export const TIME_SLOTS = [
  '9:00-10:00',
  '10:00-11:00',
  '11:00-11:30',
  '11:30-12:30',
  '12:30-13:30',
  '13:30-14:30',
  '14:30-15:00',
  '15:00-16:00'
];

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  FACILITIES: '/facilities',
  FACULTY: '/faculty',
  CONTACT: '/contact',
  SCHOOL_TIMINGS: '/school-timings',
  TEACHERS_ENTRY: '/teachers-entry',
  STUDENTS_ENTRY: '/students-entry',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_TEACHERS: '/admin/teachers',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_TIMETABLE: '/admin/timetable',
  ADMIN_ATTENDANCE: '/admin/attendance'
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  TEACHERS: '/teachers',
  STUDENTS: '/students',
  TIMETABLE: '/timetable',
  ATTENDANCE: '/attendance',
  SCHOOL_META: '/schoolmeta',
  UPLOAD: '/upload'
};