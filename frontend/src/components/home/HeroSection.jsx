import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ onGetQuoteClick }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Appended new images to the existing carousel images
  const images = [
    // Existing images
    { src: "/images/hero-knee-treatment.webp", alt: "Advanced physiotherapy knee treatment" },
    { src: "/images/hero-patient-lift.webp", alt: "Patient lift system with caregiver" },
    { src: "/images/hero-touchscreen-interface.webp", alt: "Touchscreen medical interface device" },
    { src: "/images/hero-movement-therapy-room.webp", alt: "Interactive movement therapy room" },
    { src: "/images/hero-robotic-gait-trainer.webp", alt: "Robotic gait training system" },
    // New uploaded images
    { src: "/images/hero-hydrotherapy-tub.webp", alt: "Hydrotherapy rehabilitation tub system" },
    { src: "/images/hero-suspension-cage.webp", alt: "Suspension therapy cage system" },
    { src: "/images/hero-hand-therapy-table.webp", alt: "Hand therapy and fine motor skills table" },
    { src: "/images/hero-driving-simulator.webp", alt: "Rehabilitation driving simulator" },
    { src: "/images/hero-patient-lift-hoist.webp", alt: "Mobile patient lift hoist" },
    { src: "/images/hero-electric-treatment-table.webp", alt: "Adjustable electric treatment table" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
      {/* Carousel Container */}
      <div className="absolute inset-0">

        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="w-full h-full object-cover"
              alt={images[currentImageIndex].alt}
              src={images[currentImageIndex].src}
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              // eslint-disable-next-line react/no-unknown-property -- React 18 doesn't recognize fetchPriority; lowercase is required for the attribute to reach the DOM
              fetchpriority={currentImageIndex === 0 ? 'high' : 'auto'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-white max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-balance">Empowering Recovery, Enhancing Life</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Supplying physiotherapy and rehabilitation equipment to hospitals and clinics across India since 2017.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => onGetQuoteClick('Hero Section Quote Request')}
          >
            Get a Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.location.href = 'tel:+919885839555'} // Added phone link to Contact Us button
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;