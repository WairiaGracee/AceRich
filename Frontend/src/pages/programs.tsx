import React, { useState } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import hero1 from '../assets/hero1.jpg';
import Footer from '../components/footer';

interface Course {
  id: string;
  title: string;
  image: string;
  description: string;
}

const CoursesPage: React.FC = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [graduateIndex, setGraduateIndex] = useState(0);
  const [diplomaIndex, setDiplomaIndex] = useState(0);

  // Sample course data
  const computerCourses: Course[] = [
    {
      id: '1',
      title: 'Operations Computer',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '2',
      title: 'Packages Advanced',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '3',
      title: 'Computer Packages',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
  ];

  const cateringCourses: Course[] = [
    {
      id: '5',
      title: 'Catering',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '6',
      title: 'Baking & Pastry',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '7',
      title: 'Hot Kitchen',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '8',
      title: 'Barista',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    }
  ];

  const beautyCourses: Course[] = [
    {
      id: '9',
      title: 'Cosmetology',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '10',
      title: 'Beauty Therapy',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '11',
      title: 'Hairdressing',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '12',
      title: 'Nail Technology',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '13',
      title: 'Barbering',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
  ];
    const housekeepingCourses: Course[] = [
    {
      id: '14',
      title: 'Housekeeping & Laundry Front Office',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      description: 'Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    }
  ];

  const itemsPerView = 4;
  const handleCarouselNav = (courses: Course[], index: number, direction: 'next' | 'prev') => {
    const maxIndex = Math.ceil(courses.length - itemsPerView);
    if (direction === 'next') {
      return index < maxIndex ? index + 1 : 0;
    } else {
      return index > 0 ? index - 1 : maxIndex;
    }
  };

  const renderCourseSection = (
    courses: Course[],
    currentIndex: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    title: string,
    subtitle: string,
    description: string
  ) => {
    const maxIndex = Math.ceil(courses.length - itemsPerView);
    const visibleCourses = courses.slice(currentIndex, currentIndex + itemsPerView);

    return (
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-blueMain mb-2">
            {title} <span className="text-indigoDye">{subtitle}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl">{description}</p>
        </div>

        {/* Course Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden h-64">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setIndex(handleCarouselNav(courses, currentIndex, 'prev'))}
            className="absolute -left-6 top-1/3 -translate-y-1/2 bg-orange-800 hover:bg-orange-900 text-white rounded-full p-3 transition-colors duration-300 shadow-lg hidden lg:flex items-center justify-center z-10"
            aria-label="Previous courses"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => setIndex(handleCarouselNav(courses, currentIndex, 'next'))}
            className="absolute -right-6 top-1/3 -translate-y-1/2 bg-orange-800 hover:bg-orange-900 text-white rounded-full p-3 transition-colors duration-300 shadow-lg hidden lg:flex items-center justify-center z-10"
            aria-label="Next courses"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-emerald-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== HERO SECTION ==================== */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${hero1})`}}
          >
            <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-4xl mx-auto text-center pt-5">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-50 mb-6 leading-tight">
            Available Programs
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empowering learners worldwide with quality education and expert guidance
          </p>
          <div className="w-full flex justify-center gap-2 mt-8 text-emerald-100">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Course Grid</span>
          </div>
        </div>
      </section>

      {/* ==================== COURSE SECTIONS ==================== */}
      {renderCourseSection(
        computerCourses,
        featuredIndex,
        setFeaturedIndex,
        'Computer',
        'Courses',
        'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      )}

      {renderCourseSection(
        cateringCourses,
        graduateIndex,
        setGraduateIndex,
        'Catering',
        'Courses',
        'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      )}

      {renderCourseSection(
        beautyCourses,
        diplomaIndex,
        setDiplomaIndex,
        'Hair & Beauty',
        'Courses',
        'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      )}

      {renderCourseSection(
        housekeepingCourses,
        diplomaIndex,
        setDiplomaIndex,
        'Housekeeping',
        'Courses',
        'Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
      )}

                {/* Newsletter */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Updated with Newsletter</h3>
            <p className="text-gray-600 mb-4">Get the latest news and updates delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>

      <Footer/>
    </div>
  );
};

export default CoursesPage;