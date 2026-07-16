import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ onGetQuoteClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-sm">
          <a href="tel:+919885839555" className="flex items-center gap-2 hover:underline decoration-accent decoration-2 underline-offset-4 transition-all">
            <Phone className="w-4 h-4" />
            <span>Call Us</span> {/* Updated: Display only "Call Us" */}
          </a>
          <a href="mailto:contact@yourswecha.com" className="flex items-center gap-2 hover:underline decoration-accent decoration-2 underline-offset-4 transition-all">
            <Mail className="w-4 h-4" />
            <span>contact@yourswecha.com</span>
          </a>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/swecha-logo.webp" 
              alt="Swecha Enterprises Logo" 
              className="h-16 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors relative ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-secondary'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                  />
                )}
              </Link>
            ))}
            <Button onClick={onGetQuoteClick} className="bg-secondary hover:bg-secondary-hover text-white hover:text-primary">
              Get Quote
            </Button>
          </div>

          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-medium ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button onClick={() => { onGetQuoteClick(); setIsMenuOpen(false); }} className="w-full bg-secondary hover:bg-secondary-hover text-white hover:text-primary">
              Get Quote
            </Button>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;