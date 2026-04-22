import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import AboutPage from "./pages/about";
import NavBar from './components/navBar';
import CoursesPage from './pages/programs';
import ContactPage from './pages/contact';
import AdmissionsPage from './pages/admissions';
import CourseDetailPage from './pages/coursedetails';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
// import StudentDashboard from './pages/student/dashboard';
// import AdminDashboard from './pages/admin/dashboard';
// import AdminApplications from './pages/admin/applications';
// import AdminStudents from './pages/admin/students';
// import AdminMessages from './pages/admin/messages';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/"            element={<LandingPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/programs"    element={<CoursesPage />} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="/admissions"  element={<AdmissionsPage />} />
        <Route path="/programs/:courseId" element={<CourseDetailPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />

        {/* Student protected routes */}
        {/* <Route path="/student/dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } /> */}

        {/* Admin protected routes */}
        {/* <Route path="/admin-dashboard" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } /> */}
        {/* <Route path="/admin-dashboard/applications" element={
          <ProtectedRoute adminOnly>
            <AdminApplications />
          </ProtectedRoute>
        } /> */}
        {/* <Route path="/admin-dashboard/students" element={
          <ProtectedRoute adminOnly>
            <AdminStudents />
          </ProtectedRoute>
        } /> */}
        {/* <Route path="/admin-dashboard/messages" element={
          <ProtectedRoute adminOnly>
            <AdminMessages />
          </ProtectedRoute>
        } /> */}
      </Routes>
    </>
  );
}

export default App;

