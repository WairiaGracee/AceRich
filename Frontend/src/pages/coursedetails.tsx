import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../components/footer';
import { getCourseById } from '../services/api';
import type { CourseDetail } from '../services/api';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseId) {
      getCourseById(courseId)
        .then(setCourse)
        .catch(() => setError('Course not found.'))
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  // ── Loading state ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Loading course...</p>
      </div>
    );
  }

  // ── Error / not found state ────────────────────────────────
  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/programs')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-indigoDye py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${course.image_url})` }}
        />
        <div className="relative max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/programs" className="hover:text-white transition-colors">Programs</Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {course.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-6">{course.description}</p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              {course.level_display}
            </span>
            <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {course.duration}
            </span>
            <span className="px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {course.category_name}
            </span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left — course content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Overview */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course overview</h2>
            <p className="text-gray-600 leading-relaxed">{course.overview}</p>
          </div>

          {/* What you'll learn */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.what_you_learn.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Course modules</h2>
            <ul className="divide-y divide-gray-100">
              {course.modules.map((mod, i) => (
                <li key={mod.id} className="flex items-start gap-4 py-3">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-600 text-sm leading-relaxed">{mod.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm sticky top-6">
            <img
              src={course.image_url}
              alt={course.title}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 space-y-3">
              {[
                { label: 'Duration', value: course.duration },
                { label: 'Level',    value: course.level_display },
                { label: 'Mode',     value: course.mode_display },
                { label: 'Intake',   value: course.intake },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}

              <button
                onClick={() => navigate('/admissions')}
                className="w-full mt-4 px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200 text-base"
              >
                Apply / Register Now
              </button>

              <p className="text-center text-xs text-gray-400 mt-2">
                Questions?{' '}
                <Link to="/contact" className="text-orange-600 hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;