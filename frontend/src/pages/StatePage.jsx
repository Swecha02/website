import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';
import { states } from '@/data/states';

const SITE = 'https://swechaenterprises.com';

const StatePage = ({ slug, onGetQuoteClick }) => {
  const s = states[slug];
  const other = states[s.other];
  const url = `${SITE}/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Physiotherapy & rehabilitation equipment supply in ${s.name}`,
    serviceType: 'Physiotherapy and rehabilitation equipment distribution',
    url,
    provider: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Swecha Enterprises', url: SITE, telephone: '+91-9885839555' },
    areaServed: [{ '@type': 'State', name: s.name }, ...s.cities.map((c) => ({ '@type': 'City', name: c }))],
  };

  return (
    <>
      <Helmet>
        <title>{s.title}</title>
        <meta name="description" content={s.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={s.title} />
        <meta property="og:description" content={s.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Physiotherapy &amp; Rehabilitation Equipment in {s.name}
              </h1>
              <p className="text-xl text-gray-200">One point of contact, start to finish.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">{s.intro}</p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We handle regional sales, first-line service, accessory repair, training and escalation locally, backed by
              Monarc&apos;s import and national service network — so your team deals with one company from the first
              enquiry to the last service call.
            </p>
            {s.customers && (
              <p className="text-lg text-gray-700 leading-relaxed">
                Facilities we supply in {s.name} include {s.customers}.
              </p>
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Equipment we supply in {s.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((c) => (
                <div key={c.slug} className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    <Link to={`/products/${c.slug}`} className="hover:underline">{c.name}</Link>
                  </h3>
                  <p className="text-gray-700">{c.items.map((i) => i.name).join(', ')}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8">
              <Link to="/products" className="text-primary font-semibold hover:underline">
                See the full product range <ArrowRight className="inline w-4 h-4" />
              </Link>
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-primary mb-6">Cities and districts we serve in {s.name}</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {s.cities.map((c) => (
                <li key={c} className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-secondary shrink-0" /> {c}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-6">
              Not on the list? We cover all of {s.name} — and{' '}
              <Link to={`/${s.other}`} className="text-primary font-semibold hover:underline">{other.name}</Link> too.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Planning a physiotherapy or rehab setup in {s.name}?
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg"
                onClick={() => onGetQuoteClick(`Quote — ${s.name}`)}
              >
                Request a Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <a href="tel:+919885839555">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg">
                  <Phone className="mr-2 w-5 h-5" /> +91 98858 39555
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StatePage;
