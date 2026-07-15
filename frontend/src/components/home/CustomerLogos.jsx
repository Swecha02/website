import React from 'react';
import { motion } from 'framer-motion';

const CustomerLogos = () => {
  const logos = [
    { 
      src: '/images/logo-sandhya-age-care.webp', 
      alt: 'Sandhya Age Care Foundation Logo',
    },
    { 
      src: '/images/logo-aig-hospitals.webp', 
      alt: 'AIG Hospitals Logo',
    },
    { 
      src: '/images/logo-continental-hospitals.webp', 
      alt: 'Continental Hospitals Logo',
    },
    { 
      src: '/images/logo-dakshinrehab.webp', 
      alt: 'DakshinRehab Logo',
    },
    {
      src: '/images/logo-vitanova.webp',
      alt: 'Vitanova Logo',
    },
    {
      src: '/images/logo-mallikamba.webp',
      alt: 'Mallikamba Institute of Mentally Handicapped & AD, Hanumakonda Logo',
    }
  ];

  // Duplicate logos multiple times to ensure seamless looping on wider screens
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]; 

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Trusted by Leading Healthcare Institutions
        </h2>

        <div className="relative overflow-hidden w-full">
          {/* Gradient masks for smooth fade effect at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 md:gap-24 items-center px-4"
              animate={{
                x: "-50%",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              }}
              style={{ width: "fit-content" }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 h-20 md:h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto object-contain max-w-[180px] md:max-w-[220px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;