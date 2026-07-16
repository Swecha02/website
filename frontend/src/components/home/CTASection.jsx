import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = ({ onGetQuoteClick }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-secondary to-secondary/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Upgrade Your Equipment?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Talk to our team about equipment for your hospital, clinic, or rehab center
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => onGetQuoteClick('General Quote')}
            >
              Request a Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.location.href = 'tel:+919885839555'}
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;