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
        <meta name="description" content="Swecha Enterprises is the exclusive distributor of physiotherapy and rehabilitation equipment for Andhra Pradesh and Telangana since 2017. One point of contact, start to finish. Get a quote for your facility." />
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