import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: 'ABOUT', to: '/about' },
    { label: 'PROGRAMS', to: '/programs' },
    { label: 'ADMISSIONS', to: '/admissions' },
    { label: 'BLOG', to: '/blog' },
    { label: 'CONTACT', to: '/contact' }
  ];

  return (
    <nav className="bg-blueMain shadow-sm fixed top-0 left-0 z-50 w-screen rounded-b-md">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-gray-50 font-Boldonse">AceRich</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}  // <-- changed from href to to
                className="text-sm font-medium text-gray-50 hover:text-orange-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded-lg transition-colors">
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <button className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;