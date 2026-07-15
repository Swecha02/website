import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProductsPage from '@/pages/ProductsPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import QRLandingPage from '@/pages/QRLandingPage';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { trackPageVisit } from '@/lib/api';

// Admin pages pull in jsPDF/jspdf-autotable/chart libraries — code-split so
// public visitors never download that weight.
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

const AdminLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

// Layout component for public pages
const PublicLayout = ({ children, onGetQuoteClick }) => {
  return (
    <>
      <Header onGetQuoteClick={onGetQuoteClick} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
};

// Layout component for standalone pages (Admin, QR)
const StandaloneLayout = ({ children }) => {
  return (
    <main className="flex-1 min-h-screen">
      {children}
    </main>
  );
};

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState('');
  const location = useLocation();

  // Track page visits
  useEffect(() => {
    const trackVisit = async () => {
      trackPageVisit(location.pathname);
    };
    
    trackVisit();
  }, [location]);

  const openModal = (subject = 'General Quote') => {
    setQuoteSubject(subject);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin" element={
          <StandaloneLayout>
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminLogin />
            </Suspense>
          </StandaloneLayout>
        } />

        <Route path="/admin/login" element={
           <Navigate to="/admin" replace />
        } />

        <Route path="/admin/dashboard" element={
          <StandaloneLayout>
            <ProtectedAdminRoute>
              <Suspense fallback={<AdminLoadingFallback />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedAdminRoute>
          </StandaloneLayout>
        } />

        {/* QR Landing Page - No Header/Footer */}
        <Route path="/connect" element={
          <StandaloneLayout>
            <QRLandingPage />
          </StandaloneLayout>
        } />

        {/* Public Routes - With Header/Footer */}
        <Route path="*" element={
          <PublicLayout onGetQuoteClick={() => openModal()}>
            <Routes>
              <Route path="/" element={<HomePage onGetQuoteClick={openModal} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage onGetQuoteClick={openModal} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              {/* Catch all for public routes to redirect to home if not found, 
                  or you could add a NotFoundPage here */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PublicLayout>
        } />
      </Routes>
      
      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        subject={quoteSubject} 
      />
    </div>
  );
}

export default App;