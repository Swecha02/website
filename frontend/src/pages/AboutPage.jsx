import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Users, TrendingUp, Heart, Phone } from 'lucide-react';
const AboutPage = () => {
  return <>
      <Helmet>
        <title>About Us - Swecha Enterprises | Since 2017</title>
        <meta name="description" content="Swecha Enterprises is the exclusive distributor of physiotherapy and rehabilitation equipment for Andhra Pradesh and Telangana since 2017, in partnership with Monarc Distribution Network." />
        <link rel="canonical" href="https://swechaenterprises.com/about" />
      </Helmet>

      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Swecha Enterprises</h1>
              <p className="text-xl text-gray-200">
                Exclusive distributor of physiotherapy and rehabilitation equipment for Andhra Pradesh and Telangana since 2017
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="text-4xl font-bold text-primary mb-6">Our Journey</h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">Founded in 2017, Swecha Enterprises set out with a clear goal: to be a dependable source of physiotherapy and rehabilitation equipment for Andhra Pradesh and Telangana's hospitals and clinics.</p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">Swecha (స్వేచ్ఛ) means freedom — and the name wasn't picked for how it sounds. It came from watching people, often women, who never got the freedom to grow on their own terms. That idea is why this company carries the name it does.</p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">Over nine years, that focus has grown into specialized knowledge of the sector. We're the exclusive distributor for Andhra Pradesh and Telangana, backed by Monarc Distribution Network's two decades of sales, distribution, and national service experience.</p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, we supply everything from treatment tables to robotic rehabilitation systems to facilities including AIG Hospitals, Continental Hospitals, and DakshinRehab.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="relative">
                <img alt="Swecha Enterprises team and facility" className="rounded-2xl shadow-2xl w-full" src="/images/about-team-facility.webp" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To equip hospitals and rehab centers across Andhra Pradesh and Telangana with reliable physiotherapy and rehabilitation equipment — from therapeutic modalities to advanced robotic systems — so their teams can focus on patient care, not equipment downtime.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} whileHover={{ y: -8, transition: { duration: 0.3, delay: 0 } }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be Andhra Pradesh and Telangana's most trusted physiotherapy and rehabilitation equipment distributor — known for continuity, not just catalog size.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[{
              icon: Phone,
              title: 'One Point of Contact',
              description: 'From quotation to installation to service, you call one team, not two. No handoffs, no chasing.'
            }, {
              icon: Award,
              title: 'Quality Excellence',
              description: 'We stand behind every product we distribute — no shortcuts on what goes into a clinic'
            }, {
              icon: Heart,
              title: 'Customer First',
              description: 'We work with your team to match equipment to your facility’s specific needs'
            }, {
              icon: TrendingUp,
              title: 'Continuous Innovation',
              description: 'From robotic gait trainers to VR-based rehab systems, we bring new technology into our catalog as it proves itself in the field'
            }].map((value, index) => {
              const Icon = value.icon;
              return <motion.div key={index} initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.6,
                delay: index * 0.1
              }} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>;
            })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="max-w-4xl mx-auto text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl font-bold mb-6">Partnership with Monarc Distribution Network</h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                Monarc Distribution Network brings two decades of sales, distribution, and national service experience in the healthcare space. As their exclusive distributor for Andhra Pradesh and Telangana, we combine that backing with local, first-line service and training for hospitals and clinics in our territory.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>;
};
export default AboutPage;