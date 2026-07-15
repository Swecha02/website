import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { submitQuote } from '@/lib/api';

const QuoteModal = ({ isOpen, onClose, subject }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    subject: '',
  });

  useEffect(() => {
    if (subject) {
      setFormData(prev => ({ ...prev, subject }));
    }
  }, [subject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Saves to Postgres (server prepends the subject) and sends the email notification
      await submitQuote({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        message: formData.message,
        subject: formData.subject
      });

      toast({
        title: "Quote Request Sent!",
        description: "Thank you! Our team will get back to you shortly with a quote.",
        className: "bg-green-50 border-green-200"
      });
      
      setFormData({ name: '', email: '', phone: '', organization: '', message: '', subject: '' });
      onClose();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "There was a problem sending your quote request. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">Request a Quote</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="hidden"
                  name="subject"
                  value={formData.subject}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization / Clinic
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                    placeholder="Hospital or Clinic Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all resize-none"
                    placeholder={`Tell us about your requirements...`}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Request
                      <Send className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;