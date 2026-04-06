import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Menu, X } from 'lucide-react';

// Types
interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  level: 'Featured' | 'Graduate' | 'Diploma';
}

interface CourseSection {
  title: string;
  subtitle: string;
  description: string;
  courses: Course[];
  level: 'Featured' | 'Graduate' | 'Diploma';
}

// Course Card Component
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      {/* Badge */}
      <div className="relative overflow-hidden h-64">
        <div className="absolute top-4 left-4 z-10 bg-emerald-600 text-white px-3 py-1 rounded text-sm font-semibold">
          {course.category}
        </div>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {course.description}
        </p>
      </div>
    </div>
  );
};

// Carousel Section Component
const CourseCarouselSection: React.FC<{ section: CourseSection }> = ({ section }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.ceil(section.courses.length - itemsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const visibleCourses = section.courses.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const getAccentColor = () => {
    switch (section.level) {
      case 'Graduate':
        return 'text-emerald-600';
      case 'Diploma':
        return 'text-emerald-600';
      default:
        return 'text-emerald-600';
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          {section.title}{' '}
          <span className={`${getAccentColor()}`}>{section.subtitle}</span>
        </h2>
        <p className="text-gray-600 max-w-2xl">
          {section.description}
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute -left-6 top-1/3 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 transition-colors duration-300 shadow-lg hidden lg:flex items-center justify-center z-10"
          aria-label="Previous courses"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-6 top-1/3 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 transition-colors duration-300 shadow-lg hidden lg:flex items-center justify-center z-10"
          aria-label="Next courses"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-emerald-600 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Header Component
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2 px-4 flex justify-between items-center text-sm">
        <div className="flex gap-6">
          <span>📞 +88 0588 447 369</span>
          <span>✉️ education@email.com</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-emerald-100">Login</a>
          <a href="#" className="hover:text-emerald-100">Register</a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">GLAXDU</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li><a href="#" className="hover:text-emerald-600 transition-colors">HOME</a></li>
          <li><a href="#" className="hover:text-emerald-600 transition-colors">ABOUT</a></li>
          <li><a href="#" className="hover:text-emerald-600 transition-colors">SHOP</a></li>
          <li><a href="#" className="hover:text-emerald-600 transition-colors">PAGES</a></li>
          <li><a href="#" className="hover:text-emerald-600 transition-colors">COURSES</a></li>
          <li><a href="#" className="hover:text-emerald-600 transition-colors">BLOG</a></li>
          <li><a href="#" className="hover:text-emerald-600 transition-colors">CONTACT</a></li>
        </ul>

        {/* Right Side Items */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:text-emerald-600 transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 py-4 px-4 border-t border-gray-200">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li><a href="#" className="block hover:text-emerald-600">HOME</a></li>
            <li><a href="#" className="block hover:text-emerald-600">ABOUT</a></li>
            <li><a href="#" className="block hover:text-emerald-600">SHOP</a></li>
            <li><a href="#" className="block hover:text-emerald-600">PAGES</a></li>
            <li><a href="#" className="block hover:text-emerald-600">COURSES</a></li>
            <li><a href="#" className="block hover:text-emerald-600">BLOG</a></li>
            <li><a href="#" className="block hover:text-emerald-600">CONTACT</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <div className="relative h-64 md:h-80 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Course Grid</h1>
        <p className="text-lg text-emerald-50 max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
        
        {/* Breadcrumb */}
        <div className="flex gap-2 mt-8 text-emerald-100">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <span className="text-white">Course Grid</span>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">ABOUT US</h3>
            <p className="text-gray-400 text-sm mb-4">
              Digital outfit provider. Educational multi-exam preparation for institutes side matter.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>📧 education@email.com</span>
              <span>📞 +88 0588 447 369</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">QUICK LINK</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-bold mb-4">COURSES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Under Graduate Programmes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Graduate Programmes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Online Courses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Others Programmes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Short Courses</a></li>
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-lg font-bold mb-4">GALLERY</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-700 aspect-square rounded hover:bg-gray-600 transition-colors cursor-pointer"></div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">NEWS LETTER</h3>
            <p className="text-gray-400 text-sm mb-4">
              Ourself hulls parabolic. Educational multi exam promotion hands sides matter.
            </p>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 mb-3 focus:outline-none focus:border-emerald-600"
            />
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition-colors">
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; 2024 GLAXDU. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy & Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Condition of Use</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-600 transition-colors">f</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">𝕏</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">in</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">▶</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Courses Page Component
const CoursesPage: React.FC = () => {
  // Sample course data
  const coursesData: CourseSection[] = [
    {
      title: 'Course',
      subtitle: 'Grid',
      description: 'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      level: 'Featured',
      courses: [
        {
          id: '1',
          title: 'Fashion & Technology',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Featured',
        },
        {
          id: '2',
          title: 'Apparel Manufacturing',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Featured',
        },
        {
          id: '3',
          title: 'Apparel Manufacturing',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Featured',
        },
        {
          id: '4',
          title: 'Graphic Design & Multimedia',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Featured',
        },
      ],
    },
    {
      title: 'Graduate',
      subtitle: 'Courses',
      description: 'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      level: 'Graduate',
      courses: [
        {
          id: '5',
          title: 'Apparel Manufacturing',
          category: 'Advanced Coding On',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Graduate',
        },
        {
          id: '6',
          title: 'Graphic Design & Multimedia',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Graduate',
        },
        {
          id: '7',
          title: 'Computer Engineering',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Graduate',
        },
        {
          id: '8',
          title: 'Fashion & Technology',
          category: 'Post Graduation Digital',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Graduate',
        },
      ],
    },
    {
      title: 'Diploma',
      subtitle: 'Courses',
      description: 'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      level: 'Diploma',
      courses: [
        {
          id: '9',
          title: 'Apparel Manufacturing',
          category: 'Advanced Coding On',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Diploma',
        },
        {
          id: '10',
          title: 'Graphic Design & Multimedia',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Diploma',
        },
        {
          id: '11',
          title: 'Computer Engineering',
          category: 'Featured Courses',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Diploma',
        },
        {
          id: '12',
          title: 'Fashion & Technology',
          category: 'Post Graduation Digital',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
          description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
          level: 'Diploma',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      {/* Course Sections */}
      {coursesData.map((section) => (
        <CourseCarouselSection key={section.level} section={section} />
      ))}

      {/* Brands Section */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-12 flex-wrap">
          {['AQUA', 'STEM', 'Water', 'AQUA', 'AQUA'].map((brand, i) => (
            <div key={i} className="text-gray-400 text-lg font-semibold opacity-70 hover:opacity-100 transition-opacity">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;