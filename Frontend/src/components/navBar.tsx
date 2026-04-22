import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: 'ABOUT', to: '/about' },
    { label: 'PROGRAMS', to: '/programs' },
    { label: 'ADMISSIONS', to: '/admissions' },
    { label: 'CONTACT', to: '/contact' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="bg-blueMain shadow-sm fixed top-0 left-0 z-50 w-full rounded-b-md">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-gray-50 font-Boldonse tracking-wide">
            AceRich
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? 'text-orange-400'
                    : 'text-gray-50 hover:text-orange-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
<div className="hidden md:flex items-center gap-3">
  {user ? (
    <>
      <span className="text-gray-300 text-sm">
        Hi, {user.first_name}
      </span>
      <Link
        to={user.is_admin ? '/admin-dashboard' : '/student/dashboard'}
        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors text-sm"
      >
        Dashboard
      </Link>
      <button
        onClick={logout}
        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-sm"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="px-4 py-2 text-gray-200 hover:text-white font-medium text-sm transition-colors"
      >
        Login
      </Link>
      <Link
        to="/admissions"
        className="px-6 py-2 bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded-lg transition-colors"
      >
        Apply Now
      </Link>
    </>
  )}
</div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-50" />
            ) : (
              <Menu className="w-6 h-6 text-gray-50" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-blue-700">
            <div className="flex flex-col gap-1 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                    isActive(item.to)
                      ? 'bg-blue-800 text-orange-400'
                      : 'text-gray-100 hover:bg-blue-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full px-4 py-2.5 bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded-lg transition-colors text-center text-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;