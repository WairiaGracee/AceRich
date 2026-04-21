import React, { useState } from 'react';
import {
  Award,
  Users,
  BookOpen,
  Zap,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Clock, Building2 } from 'lucide-react';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import hero1 from '../assets/hero1.jpg';
import about1 from '../assets/about1.jpg';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: string;
}

interface TestimonialCard {
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
}

const AboutPage: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featureCards: FeatureCard[] = [
    {
      icon: <Award className="w-8 h-8 text-orange-800" />,
      title: 'Certification',
      description: 'Get recognized with industry-standard certificates upon completion.',
      count: '15K+ Certified',
    },
    {
      icon: <Users className="w-8 h-8 text-orange-800" />,
      title: 'Graduates',
      description: 'Join thousands of successful learners advancing their careers.',
      count: '50K+ Graduates',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-orange-800" />,
      title: 'Brilliant Lecturers',
      description: 'Learn from experienced professionals and industry experts.',
      count: '200+ Instructors',
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-800" />,
      title: 'Modern Learning',
      description: 'Experience interactive, hands-on learning with real-world projects.',
      count: 'Practical Focus',
    },
  ];

  const stats = [
    { value: '24', label: 'Active Courses', icon: <Award className="w-6 h-6" /> },
    { value: '30', label: 'Expert Instructors', icon: <Users className="w-6 h-6" /> },
    { value: '24', label: 'Awards', icon: <Award className="w-6 h-6" /> },
    { value: '96%', label: 'Satisfaction Rate', icon: <Star className="w-6 h-6" /> },
  ];

  const testimonials: TestimonialCard[] = [
    {
      name: 'John Smith',
      role: 'Chef – Crave Restaurant',
      rating: 4.8,
      review: 'AceRich transformed my career. The courses are comprehensive and the instructors are incredibly knowledgeable.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    {
      name: 'Sarah Johnson',
      role: 'Nail Tech – Shine Spark Nails',
      rating: 5,
      review: 'Best investment in my professional development. The practical projects helped me land my dream job.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Mike Chen',
      role: 'IT Support Specialist',
      rating: 4.9,
      review: 'The curriculum is up-to-date and the community support is amazing. Highly recommended!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
  ];

  return (
    <div>
      <NavBar />

      {/* ── Hero ── */}
      <section
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center relative min-h-[280px] flex items-center"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-50 mb-4 leading-tight">
            About AceRich
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Empowering learners with quality education and expert guidance
          </p>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="py-16 sm:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="w-full rounded-lg overflow-hidden max-h-96">
              <img
                src={about1}
                alt="AceRich College"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a leading vocational institution dedicated to shaping the careers of tomorrow. Our curriculum is designed to foster practical skills, critical thinking, and professional growth.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Established over a decade ago, AceRich College has been at the forefront of skills-based education. With modern facilities and experienced trainers, we provide a learning environment that nurtures talent and builds confidence.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our hands-on approach combines theoretical knowledge with practical training to develop well-rounded professionals ready for the job market.
              </p>

              <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                <p className="text-xs font-semibold text-orange-800 uppercase tracking-wide">
                  {card.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At AceRich College, we combine academic excellence, industry-relevant skills, and a supportive learning environment to equip students with the knowledge and confidence needed to succeed.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Experienced Trainers',
                  'Practical Hands-On Skills',
                  'Affordable Fees',
                  'Flexible Study Hours',
                  'Job Placement Support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <button className="px-6 py-3 rounded-lg bg-orange-800 hover:bg-orange-900 text-white font-semibold transition-colors">
                Explore Programs
              </button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=75"
                  alt="Learning experience"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating badge — hidden on very small screens to avoid overflow */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-800">
                <p className="text-sm font-semibold text-gray-900">Experience Better</p>
                <p className="text-xs text-gray-600">Updated daily learning paths</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900 to-orange-800 rounded-2xl p-6 sm:p-8 text-white text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-3 opacity-90">{stat.icon}</div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-1">{stat.value}</h3>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-blue-800 font-semibold text-sm mb-1 uppercase tracking-wider">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What People Say About AceRich
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border cursor-pointer ${
                  activeTestimonial === index ? 'border-orange-300' : 'border-gray-100'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full bg-gray-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(testimonial.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-1">
                    {testimonial.rating}
                  </span>
                </div>

                <p className="text-gray-600 text-sm italic leading-relaxed">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog & Events ── */}
      <section className="py-16 sm:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our Blog</h2>
              <p className="text-gray-600 mb-6 text-sm">Latest insights and updates from our institution</p>
              <div className="space-y-5">
                {[
                  { title: 'Building a great team', date: 'April 3, 2024' },
                  { title: 'Latest updates in tech', date: 'April 2, 2024' },
                ].map((post, idx) => (
                  <div key={idx} className="pb-5 border-b border-gray-200 last:border-0">
                    <h3 className="text-base font-semibold text-gray-900 hover:text-orange-600 cursor-pointer mb-1 transition-colors">
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

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600 mb-6 text-sm">Be part of our exciting upcoming events</p>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=75"
                  alt="Annual Sports Meet"
                  loading="lazy"
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
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

export default AboutPage;