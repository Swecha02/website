import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Loader2, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitContact } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Saves to Postgres and sends the email notification server-side
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        message: formData.message
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting Swecha Enterprises. We'll get back to you shortly.",
        className: "bg-green-50 border-green-200"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again or call us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Swecha Enterprises | Get a Quote</title>
        <meta name="description" content="Contact Swecha Enterprises for physiotherapy equipment quotes, service inquiries, or general questions. We are here to help with all your rehabilitation needs." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Header */}
        <section className="bg-primary text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Get in Touch
            </motion.h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Have questions about our equipment? Need a custom quote? We're here to assist you.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 -mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-secondary"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-secondary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">Mon-Sat from 9am to 7pm</p>
                    <a href="tel:+919885839555" className="text-primary font-semibold hover:underline">+91 9885839555</a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">For quotes and general inquiries</p>
                    <a href="mailto:contact.swechaenterprises@gmail.com" className="text-primary font-semibold hover:underline break-all">contact@yourswecha.com</a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-secondary"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-secondary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Registered Office</h3>
                    <p className="text-gray-600">
                      11-3-664/238/A/29, Sajeevapuram, Parsigutta,<br />
                      Hyderabad, Telangana, India - 500061
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* New Distribution Center Address */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Distribution Center</h3>
                    <p className="text-gray-600">
                      Plot No.34, Ayyanna Industrial Park,<br />
                      Prashanth Nagar, IDA Kukatpally,<br />
                      Hyderabad, Telangana - 500072
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                      placeholder="John Doe" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="organization" className="text-sm font-medium text-gray-700">Organization / Clinic</label>
                    <input 
                      type="text" 
                      id="organization" 
                      name="organization" 
                      value={formData.organization} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                      placeholder="Hospital or Clinic Name" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                      placeholder="john@example.com" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900"
                      placeholder="+91 00000 00000" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">How can we help you? *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-gray-900"
                    placeholder="Tell us about your requirements or questions..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-secondary hover:bg-secondary-hover text-white hover:text-primary px-8 py-6 text-lg h-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <div className="bg-gray-200 rounded-xl h-[450px] w-full flex items-center justify-center relative overflow-hidden border border-gray-200 shadow-md">
              <iframe 
                src="https://maps.google.com/maps?q=11-3-664/238/A/29,+Sajeevapuram,+Parsigutta,+Hyderabad,+Telangana+500061&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Swecha Enterprises Location"
              ></iframe>
               
               <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-primary">Swecha Enterprises</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    11-3-664/238/A/29, Sajeevapuram, Parsigutta,<br />
                    Hyderabad, Telangana - 500061
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;