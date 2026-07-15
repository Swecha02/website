import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/home/HeroSection';
import ProductCategories from '@/components/home/ProductCategories';
import CustomerLogos from '@/components/home/CustomerLogos';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';

const HomePage = ({ onGetQuoteClick }) => {
  return (
    <>
      <Helmet>
        <title>Swecha Enterprises - Leading Physiotherapy & Rehabilitation Equipment Distributor</title>
        <meta name="description" content="Swecha Enterprises has supplied physiotherapy and rehabilitation equipment to hospitals and clinics across India since 2017. Get a quote for your facility." />
      </Helmet>
      <div>
        <HeroSection onGetQuoteClick={onGetQuoteClick} />
        <ProductCategories />
        <CustomerLogos />
        <WhyChooseUs />
        <CTASection onGetQuoteClick={onGetQuoteClick} />
      </div>
    </>
  );
};

export default HomePage;