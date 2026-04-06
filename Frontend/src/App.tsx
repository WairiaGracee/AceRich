import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import AboutPage from "./pages/about";
import NavBar from './components/navBar';
import CoursesPage from './pages/programs';

function App() {
  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/programs" element={<CoursesPage />} />
    </Routes>
    </>

  );
}

export default App;

