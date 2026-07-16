import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, MessageCircle, Phone, Globe, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CatalogueDownloadModal from '@/components/CatalogueDownloadModal';
import { useAnalytics } from '@/hooks/useAnalytics';

const QRLandingPage = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const { trackPageVisit, trackButtonClick } = useAnalytics();

  useEffect(() => {
    trackPageVisit('QR Landing Page');
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleDownloadClick = () => {
    trackButtonClick('View 2026 Premium Catalogue (PDF)');
    setIsDownloadModalOpen(true);
  };

  const handleWhatsAppClick = () => {
    trackButtonClick('Book a Free Demo / Get Quote');
  };

  const handleWebsiteClick = () => {
    trackButtonClick('Visit Official Website');
  };
  
  const handleCallClick = () => {
    trackButtonClick('Call Us Directly');
  };

  const handlePersonalChatClick = () => {
    trackButtonClick('Chat with Rajesh (Personal)');
  };

  return (
    <>
      <Helmet>
        <title>Connect - Swecha Enterprises</title>
        <meta name="description" content="Trusted Partner for Physiotherapy & Rehab Equipment in Telangana & Andra Pradesh. Download catalogue or contact us." />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Subtle Background Pattern - Medical Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>
        
        {/* Soft Radial Gradient for Premium Feel */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>

        <motion.div 
          className="w-full max-w-md z-10 flex flex-col items-center text-center space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo Section */}
          <motion.div variants={itemVariants} className="w-full flex justify-center pt-8">
            <img 
              src="/images/swecha-logo.webp" 
              alt="Swecha Enterprises" 
              className="h-28 w-auto object-contain drop-shadow-sm"
            />
          </motion.div>

          {/* Header Section */}
          <motion.div variants={itemVariants} className="space-y-4 max-w-xs mx-auto">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight leading-tight">
                Empowering Recovery
              </h1>
              <p className="text-xl text-secondary font-medium mt-1">
                Enhancing Life
              </p>
            </div>
            
            <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full"></div>

            <p className="text-sm text-gray-500 font-medium leading-relaxed px-2">
              Trusted Partner for Physiotherapy & Rehab Equipment in Telangana & Andra Pradesh
            </p>
          </motion.div>

          {/* Actions Section */}
          <motion.div variants={itemVariants} className="w-full space-y-4">
            <Button
              onClick={handleDownloadClick}
              className="w-full h-[4.5rem] text-base md:text-lg font-semibold bg-primary hover:bg-primary-hover text-white hover:text-primary rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
            >
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                <Download className="w-6 h-6" />
              </div>
              <span>View 2026 Premium Catalogue (PDF)</span>
            </Button>

            <a 
              href="https://wa.me/919885839555?text=Hi,%20I%20would%20like%20to%20book%20a%20demo%20or%20get%20a%20quote." 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
              onClick={handleWhatsAppClick}
            >
              <Button
                className="w-full h-[4.5rem] text-base md:text-lg font-semibold bg-secondary hover:bg-secondary-hover text-white hover:text-primary rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span>Book a Free Demo / Get Quote</span> {/* Updated: Removed phone number text */}
              </Button>
            </a>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link 
                to="/"
                className="block w-full"
                onClick={handleWebsiteClick}
              >
                <Button
                  variant="secondary"
                  className="w-full h-14 text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  Visit Official Website
                </Button>
              </Link>

              <a 
                href="tel:+919885839555"
                className="block w-full"
                onClick={handleCallClick}
              >
                <Button
                  variant="outline"
                  className="w-full h-14 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gray-600" />
                  Call Us Directly
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Personal Connect Section */}
          <motion.div variants={itemVariants} className="w-full pt-4">
             <a 
               href="https://wa.me/919885839555?text=Hi%20Rajesh,%20I%20need%20some%20quick%20help."
               target="_blank" 
               rel="noopener noreferrer"
               onClick={handlePersonalChatClick}
               className="block group"
             >
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border border-blue-100 shadow-sm flex items-center gap-4 group-hover:shadow-md transition-all">
                  <div className="bg-white p-2.5 rounded-full shadow-sm text-secondary group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Personal Support</p>
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                      Need quick help? Chat with Rajesh directly
                      <span className="text-secondary group-hover:translate-x-1 transition-transform">→</span>
                    </p>
                  </div>
                </div>
             </a>
          </motion.div>

          {/* Footer Section */}
          <motion.footer variants={itemVariants} className="pt-8 pb-4">
            <p className="text-xs text-gray-400 font-medium">
              © 2026 Swecha Enterprises. All rights reserved.
            </p>
          </motion.footer>
        </motion.div>
      </div>

      <CatalogueDownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />
    </>
  );
};

export default QRLandingPage;