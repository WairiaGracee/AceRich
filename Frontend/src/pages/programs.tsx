import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hero1 from '../assets/hero1.jpg';
import Footer from '../components/footer';
import { getCourses, subscribeNewsletter } from '../services/api';
import type { CourseListItem } from '../services/api';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [graduateIndex, setGraduateIndex] = useState(0);
  const [diplomaIndex, setDiplomaIndex] = useState(0);
  const [housekeepingIndex, setHousekeepingIndex] = useState(0);

  // ── API state ──────────────────────────────────────────────
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Newsletter state ───────────────────────────────────────
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // ── Fetch courses from backend ─────────────────────────────
  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(() => setError('Failed to load courses. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  // ── Filter by category ─────────────────────────────────────
  const computerCourses     = courses.filter(c => c.category_name === 'Computer');
  const cateringCourses     = courses.filter(c => c.category_name === 'Catering');
  const beautyCourses       = courses.filter(c => c.category_name === 'Hair & Beauty');
  const housekeepingCourses = courses.filter(c => c.category_name === 'Housekeeping');

  // ── Newsletter submit ──────────────────────────────────────
  const handleSubscribe = async () => {
    if (!newsletterEmail) return;
    try {
      const res = await subscribeNewsletter(newsletterEmail);
      setNewsletterMsg(res.message);
      setNewsletterEmail('');
    } catch (err: unknown) {
      setNewsletterMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const itemsPerView = 4;

  const handleCarouselNav = (
    courses: CourseListItem[],
    index: number,
    direction: 'next' | 'prev'
  ) => {
    const maxIndex = Math.max(0, courses.length - itemsPerView);
    if (direction === 'next') return index < maxIndex ? index + 1 : 0;
    return index > 0 ? index - 1 : maxIndex;
  };

  const renderCourseSection = (
    courses: CourseListItem[],
    currentIndex: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    title: string,
    subtitle: string,
    description: string
  ) => {
    const maxIndex = Math.max(0, courses.length - itemsPerView);
    const visibleCourses = courses.slice(currentIndex, currentIndex + itemsPerView);

    return (
      <section className="py-12 sm:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-blueMain mb-2">
            {title} <span className="text-indigoDye">{subtitle}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base">{description}</p>
        </div>

        {/* Empty state */}
        {courses.length === 0 && !loading && (
          <p className="text-gray-400 text-sm">No courses available yet.</p>
        )}

        {/* Course Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/programs/${course.id}`)}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden h-52 sm:h-64">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-full shadow">
                      View details →
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={() => setIndex(handleCarouselNav(courses, currentIndex, 'prev'))}
                className="absolute -left-4 sm:-left-6 top-1/3 -translate-y-1/2 bg-orange-800 hover:bg-orange-900 text-white rounded-full p-2.5 transition-colors duration-300 shadow-lg hidden lg:flex items-center justify-center z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => setIndex(handleCarouselNav(courses, currentIndex, 'next'))}
                className="absolute -right-4 sm:-right-6 top-1/3 -translate-y-1/2 bg-orange-800 hover:bg-orange-900 text-white rounded-full p-2.5 transition-colors duration-300 shadow-lg hidden lg:flex items-center justify-center z-10"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Mobile nav */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-3 mt-5 lg:hidden">
              <button
                onClick={() => setIndex(handleCarouselNav(courses, currentIndex, 'prev'))}
                className="bg-orange-800 hover:bg-orange-900 text-white rounded-full p-2 transition-colors shadow"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setIndex(handleCarouselNav(courses, currentIndex, 'next'))}
                className="bg-orange-800 hover:bg-orange-900 text-white rounded-full p-2 transition-colors shadow"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Pagination Dots */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-emerald-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  // ── Loading & error states ─────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center relative min-h-[280px] flex items-center"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-50 mb-4 leading-tight">
            Available Programs
          </h1>
          <p className="text-base sm:text-xl text-gray-300 mb-6">
            Empowering learners with quality education and expert guidance
          </p>
          <div className="flex justify-center gap-2 text-emerald-100 text-sm">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Programs</span>
          </div>
        </div>
      </section>

      {/* ── Course Sections ── */}
      {renderCourseSection(
        computerCourses, featuredIndex, setFeaturedIndex,
        'Computer', 'Courses',
        "Build essential and advanced digital skills for today's workplace."
      )}
      {renderCourseSection(
        cateringCourses, graduateIndex, setGraduateIndex,
        'Catering', 'Courses',
        'Professional culinary training from foundational cooking to specialized techniques.'
      )}
      {renderCourseSection(
        beautyCourses, diplomaIndex, setDiplomaIndex,
        'Hair & Beauty', 'Courses',
        'Industry-ready training across cosmetology, therapy, hairdressing, and more.'
      )}
      {renderCourseSection(
        housekeepingCourses, housekeepingIndex, setHousekeepingIndex,
        'Housekeeping', 'Courses',
        'Hotel and hospitality operations training for a career in the service industry.'
      )}

      {/* ── Newsletter ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-4 text-sm">Get the latest news and updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          {newsletterMsg && (
            <p className="text-sm text-green-600 mt-3">{newsletterMsg}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;