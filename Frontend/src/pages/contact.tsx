import React, { useState } from 'react';
import { Menu, X, ShoppingCart, MapPin, Mail, Phone, Search, Send } from 'lucide-react';
import Footer from '../components/footer';

const ContactPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ==================== HERO SECTION ==================== */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <div className="flex justify-center gap-2 text-lg">
            <a href="#" className="px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Home
            </a>
            <span className="py-2">/</span>
            <span className="px-4 py-2">Contact Us</span>
          </div>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              We look forward to
            </h2>
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              hearing from you!
            </h2>

            {/* Underline decoration */}
            <div className="w-16 h-1 bg-orange-900 rounded mb-8"></div>

            {/* Contact Info Cards */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigoDye rounded-full flex items-center justify-center text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">Rivarori Near SmartHome SuperMarket (Opp. Meaty Meat Hotel)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigoDye rounded-full flex items-center justify-center text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Email Address</h3>
                  <p className="text-gray-600">acerichcollege@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigoDye rounded-full flex items-center justify-center text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Phone Number</h3>
                  <p className="text-gray-600">+254725021368</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
            <p className="text-gray-600 mb-8">Feel free to contact us, we don't spam your email</p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject*"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message*"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-orange-800 hover:bg-orange-900 text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                {formSubmitted ? 'Message Sent!' : 'Send Message'}
                <Send size={18} />
              </button>
            </form>

            {formSubmitted && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700">
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== MAP SECTION ==================== */}
      <div className="w-full h-80 bg-gray-200 my-16 relative overflow-hidden rounded-lg">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9109657589033!2d36.777393473584794!3d-1.2219623355563025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f19c1f949ec81%3A0xbc80cdbf94254816!2sAce%20Rich%20College!5e0!3m2!1sen!2ske!4v1775469849791!5m2!1sen!2ske"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

        <Footer/>
    </div>
  );
};

export default ContactPage;