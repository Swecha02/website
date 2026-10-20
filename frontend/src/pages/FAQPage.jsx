import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { faqSections, allFaqs } from '@/data/faqs';
import { categories } from '@/data/categories';

const SITE = 'https://swechaenterprises.com';
const url = `${SITE}/faq`;

// Marks up exactly the questions and answers visible on the page.
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url,
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: url },
    ],
  },
];

const FAQPage = ({ onGetQuoteClick }) => (
  <>
    <Helmet>
      <title>FAQ - Physiotherapy Equipment Buying, Demos, Delivery &amp; Service | Swecha Enterprises</title>
      <meta name="description" content="Answers for hospitals, rehab centres and physiotherapy clinics in Andhra Pradesh and Telangana: what equipment to buy, costs, demos, delivery times, warranty, AMC and service response." />
      <link rel="canonical" href={url} />
      <meta property="og:title" content="FAQ - Physiotherapy Equipment Buying, Demos, Delivery & Service | Swecha Enterprises" />
      <meta property="og:url" content={url} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>

    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-300 mb-6 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">FAQ</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200">
              Buying, demos, delivery and service for physiotherapy and rehabilitation equipment in Andhra Pradesh and Telangana.
            </p>
          </motion.div>
        </div>
      </section>

      {faqSections.map((section, i) => (
        <section key={section.title} className={`py-12 md:py-16 ${i % 2 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-primary mb-8">{section.title}</h2>
            <div className="space-y-8">
              {section.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{f.a}</p>
                  {f.showCategories && (
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <Link to={`/products/${c.slug}`} className="text-secondary font-semibold hover:underline">
                            {c.name} <ArrowRight className="inline w-4 h-4" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Have a question we haven&apos;t answered?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg"
              onClick={() => onGetQuoteClick('Question from FAQ page')}
            >
              Ask Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a href="tel:+919885839555">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg">
                <Phone className="mr-2 w-5 h-5" /> +91 98858 39555
              </Button>
            </a>
            <Link to="/connect">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg">
                Download Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default FAQPage;
