import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Clock, Building2, BookOpen, ArrowRight } from 'lucide-react';
import Footer from './footer';
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import about1 from '../assets/about1.jpg';
import cosmetology from '../assets/cosmetology.jpg';
import hairdressing from '../assets/hairdressing.jpg';
import hot from '../assets/hot.jpg';
import catering from '../assets/catering.jpg';
import compPackages from '../assets/compPackages.jpg';
import packagesAdvanced from '../assets/packagesAdvanced.jpg';
import baking from '../assets/baking.jpg';
import { Link } from 'react-router-dom';

const heroImages = [hero1, hero2, hero3];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Preload hero images on mount so slides are ready before they appear
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ── */}
      {/*
        Instead of swapping backgroundImage (forces full repaint),
        we stack all images and toggle opacity — GPU-composited, no layout recalc.
      */}
      <section className="relative min-h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: idx === currentImageIndex ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-blue-700/50" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75 w-3'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl w-full">
          <h1 className=" py-1 text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to AceRich College
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Empowering skills for a brighter future — practical training across catering, beauty, computing and more.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/admissions"
              className="px-5 py-2 sm:px-7 sm:py-3 bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-5 py-2 sm:px-7 sm:py-3 bg-white/90 text-orange-700 hover:bg-white font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── About Us Section ── */}
      <section className="py-16 sm:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Us</h2>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="w-full rounded-lg overflow-hidden max-h-96">
              <img
                src={about1}
                alt="AceRich College students"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a leading vocational institution dedicated to shaping the careers of tomorrow. Our curriculum is designed to foster practical skills and professional growth.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Established over a decade ago, AceRich College has been at the forefront of skills-based education. With state-of-the-art facilities and experienced trainers, we provide a learning environment that nurtures talent and builds confidence.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { Icon: Users, label: '5000+ Students', sub: 'Learning with us' },
                  { Icon: Clock, label: '15 Years', sub: 'of Experience' },
                  { Icon: Building2, label: 'Best Facilities', sub: 'Modern & Advanced' },
                  { Icon: BookOpen, label: 'Expert Faculty', sub: 'Highly Qualified' },
                ].map(({ Icon, label, sub }) => (
                  <div key={label} className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Icon className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-600">{sub}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
              >
                Explore More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-4 text-sm">Get the latest news and updates delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
              />
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admissions / Programs Grid ── */}
      <section className="py-16 sm:py-20 px-4 md:px-8 bg-indigoDye">
        <div className="max-w-6xl mx-auto text-center text-white mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Admissions Now Open</h2>
          <p className="text-base sm:text-lg text-green-50 mb-8">
            Join us for an enriching learning experience across all programs.
          </p>
          <Link
            to="/admissions"
            className="inline-block px-8 py-3 bg-white text-orange-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
          >
            Apply Now
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { img: catering, title: 'Catering' },
              { img: baking, title: 'Baking & Pastry' },
              { img: hot, title: 'Hot Kitchen' },
              { img: compPackages, title: 'Computer Packages' },
              { img: packagesAdvanced, title: 'Packages Advanced' },
              { img: compPackages, title: 'Operations Computer' },
              { img: cosmetology, title: 'Cosmetology' },
              { img: hairdressing, title: 'Hairdressing' },
            ].map((program, idx) => (
              <Link
                key={idx}
                to="/programs"
                className="relative h-36 sm:h-40 rounded-lg overflow-hidden group cursor-pointer block"
              >
                <img
                  src={program.img}
                  alt={program.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-end p-3 transition-all">
                  <p className="text-white font-semibold text-sm leading-snug">{program.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/programs"
              className="text-white hover:text-green-100 font-semibold inline-flex items-center gap-2"
            >
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Fun Facts ── */}
      <section className="py-16 sm:py-20 px-4 md:px-8 bg-aliceBlue">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigoDye mb-12">Fun Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '24', label: 'Active Courses' },
              { number: '30', label: 'Expert Instructors' },
              { number: '24', label: 'Awards' },
              { number: '20', label: 'Years Journey' },
            ].map((fact, idx) => (
              <div key={idx} className="text-indigoDye">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{fact.number}</div>
                <p className="text-orange-800 text-sm sm:text-base">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog & Events ── */}
      <section className="py-16 sm:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12">
            {/* Blog */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our Blog</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm">Latest insights and updates from our institution</p>
              <div className="space-y-5">
                {[
                  { title: 'Building a great team', date: 'April 3, 2024' },
                  { title: 'Latest updates in tech', date: 'April 2, 2024' },
                ].map((post, idx) => (
                  <div key={idx} className="pb-5 border-b border-gray-200 last:border-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-orange-600 cursor-pointer mb-1 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white font-semibold rounded-lg transition-colors text-sm">
                View All Posts
              </button>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm">Be part of our exciting upcoming events</p>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=75"
                  alt="Annual Sports Meet"
                  loading="lazy"
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    Annual Sports Meet 2024
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Join us for our biggest sports event featuring various competitions and activities.
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-orange-700 hover:bg-orange-800 text-white font-semibold rounded transition-colors text-sm">
                      Register
                    </button>
                    <button className="flex-1 px-4 py-2 border-2 border-orange-700 text-orange-700 hover:bg-orange-50 font-semibold rounded transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;