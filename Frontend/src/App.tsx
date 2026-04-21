import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import AboutPage from "./pages/about";
import NavBar from './components/navBar';
import CoursesPage from './pages/programs';
import ContactPage from './pages/contact';
import AdmissionsPage from './pages/admissions';
import CourseDetailPage from './pages/coursedetails';

function App() {
  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/programs" element={<CoursesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admissions" element={<AdmissionsPage />} />
      <Route path="/programs/:courseId" element={<CourseDetailPage />} />
    </Routes>
    </>

  );
}

export default App;

