import React, { useState } from 'react';
import { ChevronDown, Check, Clock, FileText, Users } from 'lucide-react';
import Footer from '../components/footer';
import { submitApplication } from '../services/api';

const AdmissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eligibility' | 'requirements' | 'timeline'>(
    'eligibility'
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    qualification: '',
    institution: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await submitApplication({
        full_name:     formData.fullName,
        email:         formData.email,
        phone:         formData.phone,
        program:       formData.program,
        qualification: formData.qualification,
        institution:   formData.institution,
      });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          program: '',
          qualification: '',
          institution: '',
        });
        setFormSubmitted(false);
      }, 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const programs = [
    { value: '', label: 'Select a Program' },
    { value: 'computer', label: 'Computer Packages' },
    { value: 'catering', label: 'Catering' },
    { value: 'baking', label: 'Baking & Pastry' },
    { value: 'beauty', label: 'Beauty Therapy / Cosmetology' },
    { value: 'hairdressing', label: 'Hairdressing' },
    { value: 'barbering', label: 'Barbering' },
    { value: 'housekeeping', label: 'Housekeeping & Front Office' },
  ];

  const qualifications = [
    { value: '', label: 'Select Qualification' },
    { value: 'kcse', label: 'KCSE Certificate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'other', label: 'Other' },
  ];

  const faqs = [
    {
      question: 'What are the eligibility criteria for admission?',
      answer:
        'Candidates must have completed their KCSE or equivalent qualification. Some programs may have specific subject requirements. Please check individual program pages for details.',
    },
    {
      question: 'What is the application deadline?',
      answer:
        'Applications are accepted on a rolling basis throughout the year. Early application is recommended as seats are limited.',
    },
    {
      question: 'How long is the admission process?',
      answer:
        'The admission process typically takes 2–4 weeks from application to final decision. You will receive updates via email and SMS at every stage.',
    },
    {
      question: 'What documents do I need to submit?',
      answer:
        'Required documents include: academic transcripts, national ID or birth certificate, and a passport-size photo. A full list will be provided after shortlisting.',
    },
    {
      question: 'Are there fee payment plans available?',
      answer:
        'Yes, we offer flexible fee payment plans to suit different needs. Contact our admissions office to discuss the options available for your chosen program.',
    },
    {
      question: 'Can I apply for multiple programs?',
      answer:
        'Yes, you may apply for up to 3 different programs. Please submit separate applications for each program you wish to apply for.',
    },
  ];

  const timeline = [
    {
      month: 'January',
      title: 'Application Opening',
      description: 'Online and in-person applications open. Candidates can start submitting.',
    },
    {
      month: 'March',
      title: 'Application Review',
      description: 'Applications reviewed and shortlisted candidates are notified.',
    },
    {
      month: 'April',
      title: 'Assessment',
      description: 'Eligible candidates complete a brief practical or interview assessment.',
    },
    {
      month: 'May',
      title: 'Results & Counselling',
      description: 'Results announced. Successful candidates are invited for enrolment counselling.',
    },
    {
      month: 'June',
      title: 'Admission Confirmation',
      description: 'Final seat allocation and admission confirmation with fee payment.',
    },
    {
      month: 'July',
      title: 'Classes Begin',
      description: 'Academic session commences for the new intake.',
    },
  ];

  const requirements = [
    { icon: '📄', title: 'Application Form', description: 'Completed application with all required details' },
    { icon: '🎓', title: 'Academic Records', description: 'KCSE certificate or equivalent qualification' },
    { icon: '🪪', title: 'Identity Proof', description: 'National ID, Birth Certificate, or Passport' },
    { icon: '📸', title: 'Photograph', description: 'Recent passport-size photograph' },
    { icon: '📝', title: 'Birth Certificate', description: 'Original or certified copy' },
    { icon: '✍️', title: 'Personal Statement', description: 'Brief statement of purpose (optional)' },
    { icon: '🏠', title: 'Address Proof', description: 'Utility bill or any official address document' },
    { icon: '👨‍💼', title: 'Recommendation', description: 'Letter of recommendation (optional)' },
  ];

  const eligibilityItems = [
    { icon: <Check size={18} />, text: 'KCSE certificate (mean grade D+ or above)' },
    { icon: <Check size={18} />, text: 'Age 16 years and above' },
    { icon: <Check size={18} />, text: 'Basic literacy in English or Swahili' },
    { icon: <Check size={18} />, text: 'Physical fitness for practical-based programs' },
    { icon: <Check size={18} />, text: 'Completed application form with supporting documents' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <div
        className="relative h-56 sm:h-72 md:h-80 bg-cover bg-center flex items-end justify-center pb-10 pt-16"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=400&fit=crop&auto=format&q=75)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">Admissions</h1>
          <div className="flex justify-center gap-2 text-base sm:text-lg">
            <a href="/" className="px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
              Home
            </a>
            <span className="py-1">/</span>
            <span className="px-3 py-1">Admissions</span>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Join Our Institution</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
            Begin your journey towards a rewarding career. We welcome applications from motivated
            students who are passionate about learning and personal growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 sm:mb-16">
          {[
            { value: '5000+', label: 'Active Students',  bg: 'from-blue-50 to-blue-100',     color: 'text-blue-600' },
            { value: '15+',   label: 'Programs Offered', bg: 'from-purple-50 to-purple-100', color: 'text-purple-600' },
            { value: '95%',   label: 'Placement Rate',   bg: 'from-green-50 to-green-100',   color: 'text-green-600' },
            { value: '15+',   label: 'Years Experience', bg: 'from-orange-50 to-orange-100', color: 'text-orange-600' },
          ].map(({ value, label, bg, color }) => (
            <div key={label} className={`bg-gradient-to-br ${bg} p-5 sm:p-8 rounded-lg text-center`}>
              <div className={`text-3xl sm:text-4xl font-bold ${color} mb-1`}>{value}</div>
              <p className="text-gray-700 font-medium text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 rounded-lg p-5 sm:p-8 mb-12 sm:mb-16">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-1 px-1">
            {(['eligibility', 'requirements', 'timeline'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab === 'eligibility' ? 'Eligibility' : tab === 'requirements' ? 'Requirements' : 'Timeline'}
              </button>
            ))}
          </div>

          {/* Eligibility Tab */}
          {activeTab === 'eligibility' && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {eligibilityItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 mt-0.5">
                      {item.icon}
                    </div>
                    <p className="text-gray-700 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements Tab */}
          {activeTab === 'requirements' && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {requirements.map((req, i) => (
                  <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 text-center">
                    <div className="text-3xl mb-3">{req.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">{req.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{req.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Admission Timeline</h3>
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 bg-white p-4 sm:p-5 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-16 sm:w-20 text-center">
                      <div className="bg-blue-600 text-white text-xs font-bold py-1.5 px-2 rounded-lg">
                        {item.month}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mb-12 sm:mb-16">

          {/* Info side */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Fill out the form to start your application. Our admissions team will review it and
              contact you within 2–3 business days.
            </p>
            <div className="space-y-6">
              {[
                {
                  Icon: FileText,
                  title: 'Quick Application',
                  detail: 'Takes only 5 minutes to complete the basic application.',
                },
                {
                  Icon: Clock,
                  title: 'Fast Response',
                  detail: 'Get an admission decision within 2–4 weeks of applying.',
                },
                {
                  Icon: Users,
                  title: 'Expert Guidance',
                  detail: 'Dedicated counselors to guide you through every step.',
                },
              ].map(({ Icon, title, detail }) => (
                <div key={title} className="flex gap-4">
                  <Icon className="text-blue-600 flex-shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5 text-sm">{title}</h3>
                    <p className="text-gray-600 text-sm">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Application Form</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {[
                { type: 'text', name: 'fullName',  placeholder: 'Full Name*' },
                { type: 'email', name: 'email',    placeholder: 'Email Address*' },
                { type: 'tel',  name: 'phone',     placeholder: 'Phone Number*' },
              ].map(({ type, name, placeholder }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
                />
              ))}

              {[
                { name: 'program',       options: programs },
                { name: 'qualification', options: qualifications },
              ].map(({ name, options }) => (
                <select
                  key={name}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
                >
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ))}

              <input
                type="text"
                name="institution"
                placeholder="Last School/College Name*"
                value={formData.institution}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
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
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-colors text-sm"
              >
                {submitting ? 'Submitting...' : formSubmitted ? 'Application Submitted!' : 'Submit Application'}
              </button>
            </form>

            {/* Success message */}
            {formSubmitted && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700 text-center text-sm">
                ✓ Thank you! We received your application. Check your email for next steps.
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center gap-3 text-left"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-blue-600 flex-shrink-0 transition-transform duration-200 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-5 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdmissionsPage;