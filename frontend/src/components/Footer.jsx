import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="/images/swecha-logo.webp"
              alt="Swecha Enterprises"
              className="h-16 w-auto mb-4 bg-white p-2 rounded"
              loading="lazy"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              Supplying physiotherapy and rehabilitation equipment to hospitals and clinics across India since 2017.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Quick Links</span>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-sm text-gray-300 hover:text-secondary transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Contact Info</span>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-accent" />
                <span>11-3-664/238/A/29, Sajeevapuram, Parsigutta, Hyderabad, Telangana, India - 500061</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href="tel:+919885839555" className="hover:text-secondary transition-colors">+91 9885839555</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href="mailto:contact@yourswecha.com" className="hover:text-secondary transition-colors">contact@yourswecha.com</a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Follow Us</span>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1DHtDMggcz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Swecha Enterprises on Facebook" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://in.linkedin.com/company/swecha-enterprises" target="_blank" rel="noopener noreferrer" aria-label="Swecha Enterprises on LinkedIn" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Swecha Enterprises. All rights reserved. | Powered by Monarc Distribution Network
          </p>
          <p className="text-xs text-gray-400 mt-2">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;