import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const products = [
  {
    category: 'Therapeutic Modalities',
    image: '/images/category-therapeutic-modalities.webp',
    items: [
      'Combination therapy devices (ultrasound & electrotherapy)',
      'Shockwave therapy',
      'Low power laser devices',
      'High-power laser devices',
      'Tecar therapy',
      'Lymphedema Pump',
      'TENS Units',
      'Diathermy'
    ],
  },
  {
    category: 'Exercise Therapy',
    image: '/images/category-exercise-therapy.webp',
    items: ['Resistance Training Equipment', 'Functional Movement Systems', 'Therapeutic Exercise Bikes', 'Pulleys & Weights'],
  },
  {
    category: 'Treatment Tables',
    image: '/images/category-treatment-tables.webp',
    items: ['Electric Hi-Lo Tables', 'Manual Therapy Tables', 'Bobath Table', 'Examination Couches', 'Traction Tables', 'Tilt Tables'],
  },
  {
    category: 'Hydrotherapy',
    image: '/images/category-hydrotherapy.webp',
    items: ['Whirlpool Tubs', 'Aquatic Therapy Pools', 'Underwater Treadmills', 'Hydrotherapy Jets', 'Contrast Baths'],
  },
  {
    category: 'Interactive Fitness Equipment',
    image: '/images/category-interactive-fitness.webp',
    items: ['Smart Treadmills', 'Virtual Reality Rehab Systems', 'Gamified Exercise Platforms', 'Digital Training Bikes'],
  },
  {
    category: 'Kinesiotherapy',
    image: '/images/category-kinesiotherapy.webp',
    items: ['CPM Machines', 'Suspension Therapy Systems', 'Gait Trainers', 'Balance Boards', 'Therapy Ladders'],
  },
  {
    category: 'Contrast Therapy (Hot & Cold)',
    image: '/images/category-contrast-therapy.webp',
    items: ['Hot Pack Units', 'Cold Therapy Systems', 'Paraffin Wax Baths', 'Cryotherapy Devices', 'Contrast Bath Units'],
  },
  {
    category: 'Advanced Robotic Systems',
    image: '/images/category-robotic-systems.webp',
    isLarge: true, // New property to identify the robotic systems icon
    items: ['Robotic Exoskeletons', 'Robot-Assisted Gait Trainers', 'Upper Limb Robotic Devices', 'Sensor-Based Feedback Systems'],
  },
];

const ProductsPage = ({ onGetQuoteClick }) => {

  const handleInquiry = (category) => {
    onGetQuoteClick(`Quote for ${category}`);
  };

  return (
    <>
      <Helmet>
        <title>Products - Swecha Enterprises | Physiotherapy Equipment Catalog</title>
        <meta name="description" content="Browse our comprehensive range of physiotherapy and rehabilitation equipment including exercise machines, treatment tables, therapeutic modalities, and more." />
      </Helmet>

      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
              <p className="text-xl text-gray-200">
                Comprehensive range of physiotherapy and rehabilitation equipment for every need
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="h-40 bg-white p-6 flex items-center justify-center border-b border-gray-100">
                    <div className={`flex items-center justify-center ${product.isLarge ? 'w-36 h-36' : 'w-28 h-28'}`}>
                      <img
                        src={product.image}
                        alt={product.category}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {product.category}
                    </h3>
                    
                    <ul className="space-y-2 mb-6">
                      {product.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-secondary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full mt-auto bg-secondary hover:bg-secondary/90 text-white"
                      onClick={() => handleInquiry(product.category)}
                    >
                      Request Information
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                We offer a wide range of specialized equipment beyond what's listed here. Contact us to discuss your specific requirements.
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => onGetQuoteClick('Specialized Equipment Inquiry')}
              >
                Contact Our Experts
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsPage;