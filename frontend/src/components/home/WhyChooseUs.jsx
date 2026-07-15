import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Headphones, TrendingUp, CheckCircle, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Clinical-Grade Standards',
    description: 'Every product we distribute is sourced and vetted for daily clinical use',
  },
  {
    icon: Award,
    title: 'Advanced Rehab Technology',
    description: 'Robotic gait trainers, VR-based therapy, and smart treadmills alongside traditional equipment',
  },
  {
    icon: Headphones,
    title: 'Hands-On Support',
    description: 'Direct access to our team for installation, servicing, and spare parts',
  },
  {
    icon: TrendingUp,
    title: 'Industry Expertise',
    description: '9 years of specialized knowledge in medical equipment, since 2017',
  },
  {
    icon: CheckCircle,
    title: 'Hyderabad-Based Distribution',
    description: 'Warehouse and distribution center in IDA Kukatpally, serving facilities across India',
  },
  {
    icon: Users,
    title: 'Strong Network',
    description: 'Backed by Monarc Distribution Network with 20 years experience',
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Swecha Enterprises?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Nine years supplying hospitals and clinics across India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;