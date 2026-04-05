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



const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of hero images
  const heroImages = [hero1,hero2,hero3];

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000"
        style={{
          backgroundImage: `url('${heroImages[currentImageIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* 🔵 Blue Gradient Overlay (MAIN CHANGE) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-blue-700/50"></div>

        {/* Optional extra dark layer (for stronger contrast) */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all  ${
                idx === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to AceRich College
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded-lg transition-colors">
              Get Started
            </button>

            <button className="px-8 py-3 bg-aliceBlue text-orange-700 hover:bg-gray-100 font-semibold rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className='h-full w-full'>
                <img src={about1} alt="" className="w-full h-full object-cover" />
            </div>

            <div>
              <p className="text-gray-600 mb-12 max-w-2xl">
                We are a world-class educational institution dedicated to shaping the future leaders of tomorrow. Our curriculum is designed to foster innovation, critical thinking, and practical skills.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Established in 2010, Glaxdu has been at the forefront of educational excellence. With state-of-the-art facilities and an experienced faculty, we provide a learning environment that nurtures talent and builds character.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our holistic approach combines academic rigor with extracurricular activities to develop well-rounded individuals prepared for global challenges.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">5000+ Students</p>
                  <p className="text-sm text-gray-600">Learning with us</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">15 Years</p>
                  <p className="text-sm text-gray-600">of Experience</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Building2 className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Best Facilities</p>
                  <p className="text-sm text-gray-600">Modern & Advanced</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <BookOpen className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Expert Faculty</p>
                  <p className="text-sm text-gray-600">Highly Qualified</p>
                </div>
              </div>

              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                Explore More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

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
        </div>
      </section>

      {/* Admission Section */}
      <section className="py-20 px-4 md:px-8 bg-indigoDye">
        <div className="max-w-6xl mx-auto text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">Admission Going On</h2>
          <p className="text-lg text-green-50 mb-8">
            Join us for an enriching educational experience. Admissions are now open for all programs.
          </p>
          <button className="px-8 py-3 bg-white text-orange-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors">
            Apply Now
          </button>
        </div>

        {/* Image Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { img: catering, title: 'Catering' },
              { img: baking, title: 'Baking & Pastry' },
              { img: hot, title: 'Hot Kitchen' },
              { img: compPackages, title: 'Computer Packages' },
              { img: packagesAdvanced, title: 'Packages Advanced' },
              { img: compPackages, title: 'Operations Computer' },
              { img: cosmetology, title: 'Cosmetology' },
              { img: hairdressing, title: 'Hairdressing' }
            ].map((program, idx) => (
              <div key={idx} className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={program.img} 
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-end p-4 transition-all">
                  <p className="text-white font-semibold">{program.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="text-white hover:text-green-50 font-semibold flex items-center justify-center gap-2">
              View All Programs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 px-4 md:px-8 bg-aliceBlue">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigoDye mb-12">Fun Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '24', label: 'Active Courses' },
              { number: '30', label: 'Expert Instructors' },
              { number: '24', label: 'Awards' },
              { number: '20', label: 'Years Journey' }
            ].map((fact, idx) => (
              <div key={idx} className="text-indigoDye">
                <div className="text-5xl font-bold mb-2">{fact.number}</div>
                <p className="text-orange-800">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Events Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Blog */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Blog</h2>
              <p className="text-gray-600 mb-8">Latest insights and updates from our institution</p>
              
              <div className="space-y-6">
                {[
                  { title: 'Building a great team', date: 'April 3, 2024' },
                  { title: 'Latest updates in tech', date: 'April 2, 2024' }
                ].map((post, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-200 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                ))}
              </div>

              <button className="mt-6 px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white font-semibold rounded-lg transition-colors">
                View All Posts
              </button>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Up Coming Events</h2>
              <p className="text-gray-600 mb-8">Be part of our exciting upcoming events</p>
              
              <div className="bg-white rounded-lg overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Event"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Annual Sports Meet 2024
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Join us for our biggest sports event featuring various competitions and activities
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

     <Footer/>
    </div>
  );
};

export default LandingPage;