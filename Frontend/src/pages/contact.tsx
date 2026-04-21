import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import Footer from '../components/footer';
import { submitContactForm } from '../services/api';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await submitContactForm({
        full_name: formData.fullName,
        email:     formData.email,
        subject:   formData.subject,
        message:   formData.message,
      });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ fullName: '', email: '', subject: '', message: '' });
        setFormSubmitted(false);
      }, 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <div
        className="relative h-56 sm:h-72 md:h-80 bg-cover bg-center flex items-end justify-center pb-10 pt-16"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop&auto=format&q=75)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">Contact Us</h1>
          <div className="flex justify-center gap-2 text-base sm:text-lg">
            <a href="/" className="px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
              Home
            </a>
            <span className="py-1">/</span>
            <span className="px-3 py-1">Contact Us</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">

          {/* Left – Contact Info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              We look forward to<br />hearing from you!
            </h2>
            <div className="w-16 h-1 bg-orange-900 rounded mb-8" />

            <div className="space-y-7">
              {[
                {
                  Icon: MapPin,
                  title: 'Address',
                  detail: 'Rivarori Near SmartHome SuperMarket (Opp. Meaty Meat Hotel)',
                },
                {
                  Icon: Mail,
                  title: 'Email Address',
                  detail: 'acerichcollege@gmail.com',
                },
                {
                  Icon: Phone,
                  title: 'Phone Number',
                  detail: '+254 725 021 368',
                },
              ].map(({ Icon, title, detail }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-blueMain rounded-full flex items-center justify-center text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Contact Form */}
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Get in Touch</h3>
            <p className="text-gray-600 mb-6 text-sm">Feel free to contact us, we don't spam your email</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject*"
                value={formData.subject}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
              />
              <textarea
                name="message"
                placeholder="Your Message*"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none text-sm"
              />

              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-600 text-sm">
                  ✕ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-orange-800 hover:bg-orange-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {submitting ? 'Sending...' : formSubmitted ? 'Message Sent!' : 'Send Message'}
                <Send size={16} />
              </button>
            </form>

            {/* Success message */}
            {formSubmitted && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700 text-sm">
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Map ── */}
      <div className="w-full h-64 sm:h-80 my-10 sm:my-16 overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          title="AceRich College Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9109657589033!2d36.777393473584794!3d-1.2219623355563025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f19c1f949ec81%3A0xbc80cdbf94254816!2sAce%20Rich%20College!5e0!3m2!1sen!2ske!4v1775469849791!5m2!1sen!2ske"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;