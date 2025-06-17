import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, User } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Barbers', path: '/barbers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="YugenCuts Logo"
              className="h-10 w-auto object-contain"
            />
             <span className="text-xl font-bold text-gray-900 tracking-tight">
              YugenCuts
            </span>
          </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group ${
                  location.pathname === item.path ? 'text-black font-semibold' : ''
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`https://wa.me/628119462018?text=${encodeURIComponent(
                `Terima kasih telah menghubungi Yugen info.

Untuk booking, Silahkan isi format:
Nama : 
Tgl : 
Jam : 
Barberman :

Buka setiap hari : 11.00-23.00
Jum'at : 14.00-23.00
🙏🙏`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-black text-sm font-medium text-black bg-white hover:bg-black hover:text-white transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </a>

            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-black">
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-black"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-gray-700 hover:text-black font-medium py-2 transition-colors duration-200 ${
                    location.pathname === item.path ? 'text-black font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="https://wa.me/628119462018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-700 hover:text-black py-2 transition-colors duration-200"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
