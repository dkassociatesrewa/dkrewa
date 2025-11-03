
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Wrench, Heart, Sparkles, ArrowRight } from 'lucide-react';
import HomepageCarousel from '@/components/HomepageCarousel';

const LandingPage = () => {
  const features = [
    { icon: Briefcase, title: "Professional Services", desc: "Expert workforce for all your needs" },
    { icon: Users, title: "Trusted Workers", desc: "Verified and skilled professionals" },
    { icon: Wrench, title: "Quick Response", desc: "Fast and reliable service delivery" },
    { icon: Heart, title: "Customer First", desc: "Your satisfaction is our priority" }
  ];

  const stats = [
    { value: "500+", label: "Active Workers" },
    { value: "2000+", label: "Happy Clients" },
    { value: "50+", label: "Service Types" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <>
      <Helmet>
        <title>D K Associates - Workforce for Everyday Help</title>
        <meta name="description" content="Your trusted partner for professional workforce services including cleaning, repairs, teaching, and more." />
      </Helmet>

      <div className="min-h-screen">
        <nav className="glass-effect sticky top-0 z-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold gradient-text">D K Associates</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/services" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
                <Link to="/hiring" className="text-gray-700 hover:text-blue-600 transition">Careers</Link>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <HomepageCarousel />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-xl text-gray-600">Excellence in every service we provide</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect p-6 rounded-2xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers today</p>
              <Link to="/services">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Book a Service Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img alt="D K Associates Logo" class="h-12 w-12" src="https://images.unsplash.com/photo-1585065799297-ce07d1855c01" />
                  <span className="text-xl font-bold">D K Associates</span>
                </div>
                <p className="text-gray-400">Workforce for Everyday Help</p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
                  <li><Link to="/hiring" className="hover:text-white transition">Careers</Link></li>
                  <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Cleaning & Housekeeping</li>
                  <li>Repair & Maintenance</li>
                  <li>Teaching & Training</li>
                  <li>Event Management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: care@hidk.in</li>
                  <li>Phone: +91-6261624525</li>
                  <li>Support: 24/7 Available</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 D K Associates. All rights reserved. | www.hidk.in</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
