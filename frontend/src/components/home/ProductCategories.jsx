import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    image: '/images/category-therapeutic-modalities.webp',
    title: 'Therapeutic Modalities',
    description: 'Ultrasound, TENS, laser therapy, and electrotherapy',
  },
  {
    image: '/images/category-exercise-therapy.webp',
    title: 'Exercise Therapy',
    description: 'Resistance training and functional movement equipment',
  },
  {
    image: '/images/category-treatment-tables.webp',
    title: 'Treatment Tables',
    description: 'Adjustable tables for optimal patient positioning',
  },
  {
    image: '/images/category-hydrotherapy.webp',
    title: 'Hydrotherapy',
    description: 'Whirlpool tubs and aquatic therapy systems',
  },
  {
    image: '/images/category-interactive-fitness.webp',
    title: 'Interactive Fitness Equipment',
    description: 'Smart treadmills, bikes, and digital training systems',
  },
  {
    image: '/images/category-kinesiotherapy.webp',
    title: 'Kinesiotherapy',
    description: 'Movement therapy and rehabilitation tools',
  },
  {
    image: '/images/category-contrast-therapy.webp',
    title: 'Contrast Therapy (Hot & Cold)',
    description: 'Hot packs, cold therapy, and contrast bath systems',
  },
  {
    image: '/images/category-robotic-systems.webp',
    title: 'Advanced Robotic Systems',
    description: 'Robotic-assisted therapy and rehabilitation technology',
    isLarge: true,
  },
];

const ProductCategories = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 340;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Product Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive range of physiotherapy and rehabilitation equipment for every need
          </p>
        </motion.div>

        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-6 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100 transform hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-6 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100 transform hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4 scroll-smooth"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-center"
              >
                <div 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden h-full cursor-pointer hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 transform hover:-translate-y-2"
                  onClick={() => navigate('/products')}
                >
                  <div className="h-48 bg-white p-8 flex items-center justify-center relative overflow-hidden border-b border-gray-100">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className={`relative z-10 flex items-center justify-center ${category.isLarge ? 'w-40 h-40' : 'w-32 h-32'}`}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2 hover:text-secondary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center text-secondary font-semibold text-sm hover:gap-2 transition-all">
                      <span>Explore Products</span>
                      <motion.svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 4 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The scrollbar-hide styles are now integrated into global CSS or via a TailwindCSS plugin. */}
        {/* Removed <style jsx> block to fix ESLint error. */}
      </div>
    </section>
  );
};

export default ProductCategories;