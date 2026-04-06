import React, { useState } from 'react';
import {
  Award,
  Users,
  BookOpen,
  Zap,
  PlayCircle,
  Star,
  CheckCircle,
  Target,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { ChevronRight, Clock, Building2} from 'lucide-react';
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
      title: 'Ring Along AI',
      description: 'Experience interactive learning powered by advanced AI technology.',
      count: 'AI-Enhanced',
    },
  ];

  const stats = [
    { value: '24', label: 'Active Courses', icon: <Award /> },
    { value: '30', label: 'Expert Instructors', icon: <Users /> },
    { value: '24', label: 'Awards', icon: <Award /> },
    { value: '96%', label: 'Satisfaction Rate', icon: <Star /> },
  ];

  const testimonials: TestimonialCard[] = [
    {
      name: 'John Smith',
      role: 'Chef - Crave Restaurant',
      rating: 4.8,
      review: 'AceRich transformed my career. The courses are comprehensive and the instructors are incredibly knowledgeable.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    {
      name: 'Sarah Johnson',
      role: 'Nail tech - Shine Spark Nails',
      rating: 5,
      review: 'Best investment in my professional development. The practical projects helped me land my dream job.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Mike Chen',
      role: 'Data Scientist',
      rating: 4.9,
      review: 'The curriculum is up-to-date and the community support is amazing. Highly recommended!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
  ];


  return (
    <div>
        <NavBar/>
      {/* Hero Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${hero1})`}}
          >
            <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-4xl mx-auto text-center pt-5">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-50 mb-6 leading-tight">
            About AceRich
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empowering learners worldwide with quality education and expert guidance
          </p>
          <button className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-900 to-orange-800 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Learn More
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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

              <div className="grid grid-cols-2 gap-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                <p className="text-xs font-semibold text-orange-800 uppercase tracking-wide">
                  {card.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose us
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At AceRich College, we combine academic excellence, industry-relevant skills, and a supportive learning environment to equip students with the knowledge and confidence needed to succeed in today’s competitive world.
                We have advantages like:
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Experienced Trainers' },
                  { title: 'Practical Hands On Skills'},
                  { title: 'Affordable Fees'},
                  { title: 'Flexible Study Hours'},
                  { title: 'Job Placement Support'},
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 px-6 py-3 rounded-lg bg-orange-800 text-white font-semibold hover:bg-blue-700 transition-colors">
                Explore Programs
              </button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Learning experience"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-800">
                <p className="text-sm font-semibold text-gray-900">Experience Better</p>
                <p className="text-xs text-gray-600">Updated daily learning paths</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900 to-orange-800 rounded-2xl p-8 text-white text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4 opacity-90">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-blue-800 font-semibold mb-2">TESTIMONIALS</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              People's Say About Our AceRich
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer"
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
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
                  <span className="text-sm font-semibold text-gray-700 ml-2">
                    {testimonial.rating}
                  </span>
                </div>

                <p className="text-gray-600 italic">{testimonial.review}</p>
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

export default AboutPage;