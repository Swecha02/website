import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const lastUpdated = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Swecha Enterprises</title>
        <meta name="description" content="Swecha Enterprises' Privacy Policy: how we collect, use, store, and protect information submitted through yourswecha.com." />
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-xl text-gray-200">Last Updated: {lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto prose-policy"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Swecha Enterprises ("Swecha," "we," "us," or "our") operates the website yourswecha.com (the "Site"). This Privacy Policy explains how we collect, use, store, and protect information when you visit our Site or submit an inquiry, in accordance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and applicable Indian law.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                By using this Site, you agree to the practices described in this Policy.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">1. Who We Are</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Swecha Enterprises is a distributor of physiotherapy and rehabilitation equipment, operating in partnership with Monarc Distribution Network.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Registered Address:</strong> 11-3-664/238/A/29, Sajeevapuram, Parsigutta, Hyderabad, Telangana – 500061
                <br />
                <strong>Email:</strong> contact@yourswecha.com
                <br />
                <strong>Phone:</strong> +91 9885839555
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
                <li>Submit the <strong>"Get a Quote"</strong> or <strong>"Send us a Message"</strong> form (Full Name, Organization/Clinic name, email address, phone number, and message content)</li>
                <li>Call or email us directly</li>
                <li>Otherwise correspond with us</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do <strong>not</strong> knowingly collect sensitive personal data (health records, financial information, government ID numbers) through this Site. We do not currently use analytics, advertising, or tracking cookies; if this changes, we will update this Policy and request consent where required.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information you provide solely to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
                <li>Respond to your quote requests and inquiries</li>
                <li>Provide product information, pricing, and follow-up communication</li>
                <li>Maintain records of business correspondence</li>
                <li>Improve our products and services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, rent, or trade your personal data to third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under the DPDP Act, we process your personal data based on your <strong>consent</strong>, given when you voluntarily submit a form on this Site, and for <strong>legitimate business purposes</strong> directly related to responding to your inquiry.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">5. Data Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
                <li><strong>Monarc Distribution Network</strong>, our business partner, where necessary to fulfil a quote or supply request</li>
                <li>Service providers who help us operate the Site (e.g., hosting and email delivery providers), solely to the extent needed to deliver those services</li>
                <li>Government or regulatory authorities, where required by law</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not share your data with third parties for their independent marketing use.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">6. Data Storage &amp; Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Data submitted through our forms is stored on our secured servers. We apply reasonable technical safeguards (encrypted transmission, access controls) to protect your information from unauthorized access, alteration, or disclosure. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain personal data submitted through this Site only as long as necessary to respond to your inquiry and maintain reasonable business records, after which it is deleted or anonymized, unless a longer retention period is required by law.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">8. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under the DPDP Act, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
                <li>Request confirmation of whether we hold your personal data, and access it</li>
                <li>Request correction or update of inaccurate or incomplete data</li>
                <li>Request erasure of your personal data, where it is no longer necessary for the purpose it was collected</li>
                <li>Withdraw consent at any time (this will not affect processing carried out before withdrawal)</li>
                <li>Register a complaint regarding how your data is handled</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                To exercise any of these rights, contact us at <a href="mailto:contact@yourswecha.com" className="text-primary font-semibold hover:underline">contact@yourswecha.com</a>. We will respond within a reasonable timeframe.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">9. Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Site currently does not use tracking or advertising cookies. It may use strictly necessary technical cookies required for basic site functionality. If we introduce analytics or marketing cookies in the future, we will display a cookie consent banner and update this section to describe what is collected and how you can manage your preferences.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Site is intended for business use by healthcare professionals, hospitals, and clinics. We do not knowingly collect data from individuals under 18.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect the most recent revision. Continued use of the Site after changes constitutes acceptance of the updated Policy.
              </p>

              <h2 className="text-2xl font-bold text-primary mt-12 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For any questions, concerns, or requests regarding this Privacy Policy or your personal data, contact:
              </p>
              <p className="text-gray-700 leading-relaxed mb-12">
                <strong>Swecha Enterprises</strong>
                <br />
                11-3-664/238/A/29, Sajeevapuram, Parsigutta, Hyderabad, Telangana – 500061
                <br />
                contact@yourswecha.com | +91 9885839555
              </p>

              <hr className="border-gray-200 mb-8" />

              <p className="text-sm text-gray-500 leading-relaxed italic">
                Note: This document is a general template designed to align with DPDP Act principles and covers the current data flows on yourswecha.com (contact/quote forms only). It is not a substitute for legal review. If Swecha adds analytics, e-commerce, payment processing, or third-party marketing tools in the future, this policy should be reviewed and updated accordingly — ideally by a lawyer familiar with Indian data protection law.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
