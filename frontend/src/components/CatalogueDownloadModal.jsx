import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { submitCatalogueDownload } from '@/lib/api';

const countryCodes = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'USA' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  { code: '+86', name: 'China' },
  { code: '+81', name: 'Japan' },
  { code: '+33', name: 'France' },
  { code: '+49', name: 'Germany' },
  { code: '+39', name: 'Italy' },
  { code: '+34', name: 'Spain' },
  { code: '+55', name: 'Brazil' },
  { code: '+27', name: 'South Africa' },
  { code: '+234', name: 'Nigeria' },
  { code: '+60', name: 'Malaysia' },
  { code: '+65', name: 'Singapore' },
  { code: '+62', name: 'Indonesia' },
];

const CatalogueDownloadModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation (Strictly 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Saves to Postgres and sends the admin email notification server-side.
      // Email failures don't block the download - see backend/mailer.js.
      await submitCatalogueDownload({
        name: formData.name,
        email: formData.email,
        country_code: formData.countryCode,
        mobile_number: formData.mobileNumber
      });

      toast({
        title: "Details Received",
        description: "Thanks! Starting your download now.",
        className: "bg-green-600 text-white border-none"
      });

      // Trigger Download
      // Simulating a file download since we don't have a real PDF file URL yet.
      // In production, replace `href` with actual PDF URL.
      const link = document.createElement('a');
      link.href = '#'; // Placeholder for real PDF URL
      link.setAttribute('download', 'Swecha_Enterprises_Catalogue_2026.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Success Feedback (Main)
      toast({
        title: "Download Started!",
        description: "The 2026 Catalogue is being downloaded to your device.",
        className: "bg-primary text-white border-none"
      });
      
      // 6. Reset and Close
      setFormData({ 
        name: '', 
        email: '', 
        countryCode: '+91', 
        mobileNumber: '' 
      });
      onClose();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was a problem processing your request. Please try again."
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
          className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-2xl font-bold mb-1">Download Catalogue</h2>
              <p className="text-blue-100 text-sm">Please fill in your details to get the 2026 edition.</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${
                      errors.name 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${
                      errors.email 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number Group */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Dropdown */}
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-[140px] px-2 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} {country.name}
                        </option>
                      ))}
                    </select>

                    {/* Mobile Input */}
                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) => {
                          // Allow only numbers
                          const val = e.target.value;
                          if (val === '' || /^\d+$/.test(val)) {
                            handleChange(e);
                          }
                        }}
                        maxLength={10}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${
                          errors.mobileNumber 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                            : 'border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit"
                    className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download Now
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    Your information is secure and will not be shared.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CatalogueDownloadModal;