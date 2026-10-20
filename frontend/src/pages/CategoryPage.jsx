import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, categoryBySlug } from '@/data/categories';

const SITE = 'https://swechaenterprises.com';

const CategoryPage = ({ onGetQuoteClick }) => {
  const { slug } = useParams();
  const c = categoryBySlug[slug];
  if (!c) return <Navigate to="/products" replace />;

  const url = `${SITE}/products/${c.slug}`;
  const title = `${c.title} | Swecha Enterprises`;
  const others = categories.filter((o) => o.slug !== c.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE}/products` },
        { '@type': 'ListItem', position: 3, name: c.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: c.title,
      description: c.description,
      url,
      provider: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Swecha Enterprises', url: SITE },
      about: { '@type': 'ItemList', itemListElement: c.items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name })) },
      areaServed: [{ '@type': 'State', name: 'Andhra Pradesh' }, { '@type': 'State', name: 'Telangana' }],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:url" content={url} />
        {c.hero && <meta property="og:image" content={`${SITE}${c.hero}`} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <nav aria-label="Breadcrumb" className="text-sm text-gray-300 mb-6 flex items-center gap-1 flex-wrap">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-white">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{c.name}</span>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.title}</h1>
              <p className="text-xl text-gray-200">
                Exclusive distributor for Andhra Pradesh and Telangana. One point of contact, start to finish.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-5 gap-10 items-center">
            <div className={c.hero ? 'md:col-span-3' : 'md:col-span-5'}>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{c.intro}</p>
              {c.installedAt && (
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We&apos;ve supplied {c.name.toLowerCase()} equipment to <strong>{c.installedAt}</strong>.
                </p>
              )}
              <p className="text-lg text-gray-700 leading-relaxed">
                Equipment comes with a 1-year manufacturer warranty, with AMC available. We assess your centre&apos;s need
                and budget, then give you a written quotation with no obligation.
              </p>
            </div>
            {c.hero && (
              <img src={c.hero} alt={c.name} className="md:col-span-2 rounded-2xl shadow-xl w-full" loading="lazy" />
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-primary mb-8">{c.name} we supply</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {c.items.map((it) => (
                <div key={it.name} className="bg-white rounded-xl shadow p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-primary mb-2">{it.name}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">{it.desc}</p>
                  <button
                    type="button"
                    className="text-secondary font-semibold text-left hover:underline"
                    onClick={() => onGetQuoteClick(`Quote for ${it.name}`)}
                  >
                    Request a quote <ArrowRight className="inline w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Talk to us about {c.name.toLowerCase()}</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white hover:text-primary font-semibold shadow-lg"
                onClick={() => onGetQuoteClick(`Quote for ${c.name}`)}
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-primary mb-6">Other equipment categories</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link to={`/products/${o.slug}`} className="text-primary font-semibold hover:underline">{o.name}</Link>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-6">
              Serving hospitals and clinics across{' '}
              <Link to="/andhra-pradesh" className="text-primary font-semibold hover:underline">Andhra Pradesh</Link> and{' '}
              <Link to="/telangana" className="text-primary font-semibold hover:underline">Telangana</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoryPage;
