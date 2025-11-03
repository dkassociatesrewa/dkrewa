
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';
import { Search, ArrowLeft, Clock, DollarSign, CheckCircle, Sparkles, Wrench, GraduationCap, Heart, Briefcase, Palette, Settings, HelpCircle } from 'lucide-react';
import { RequestQuoteForm } from '@/components/RequestQuoteForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const iconMap = {
  cleaning_housekeeping: <Sparkles />,
  repair_maintenance: <Wrench />,
  teaching_training: <GraduationCap />,
  personal_assistance: <Heart />,
  creative_crafting: <Palette />,
  office_support: <Briefcase />,
  specialized_services: <Settings />,
  default: <HelpCircle />
};

const ServicesPage = () => {
  const { servicesData } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all' 
    ? servicesData 
    : servicesData.filter(cat => cat.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Our Services - D K Associates</title>
        <meta name="description" content="Explore our comprehensive range of professional services including cleaning, repairs, teaching, and more." />
      </Helmet>

      <div className="min-h-screen">
        <nav className="glass-effect sticky top-0 z-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Back to Home</span>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </nav>

        <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Services</h1>
              <p className="text-xl text-gray-600 mb-6">Professional solutions for all your needs</p>
              
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  className="pl-12 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="md:hidden mb-8">
              <select 
                onChange={(e) => setSelectedCategory(e.target.value)} 
                className="w-full p-3 rounded-lg border"
                value={selectedCategory}
              >
                <option value="all">All Services</option>
                {servicesData.map(category => (
                  <option key={category.category} value={category.category}>{category.categoryName}</option>
                ))}
              </select>
            </div>

            <div className="hidden md:flex justify-center mb-8">
              <div className="glass-effect p-2 rounded-full flex flex-wrap justify-center gap-2">
                <Button variant={selectedCategory === 'all' ? 'default' : 'ghost'} onClick={() => setSelectedCategory('all')} className="rounded-full">All</Button>
                {servicesData.map(category => (
                  <Button 
                    key={category.category} 
                    variant={selectedCategory === category.category ? 'default' : 'ghost'} 
                    onClick={() => setSelectedCategory(category.category)}
                    className="rounded-full flex items-center gap-2"
                    title={category.categoryName}
                  >
                    {iconMap[category.category] || iconMap.default}
                    <span className="hidden lg:inline">{category.categoryName}</span>
                  </Button>
                ))}
              </div>
            </div>

            {filteredServices.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl text-blue-600">{iconMap[category.category] || iconMap.default}</span>
                  {category.categoryName}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services
                    .filter(service => 
                      searchQuery === '' || 
                      service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      service.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((service) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col"
                      >
                        <h3 className="text-xl font-bold mb-3">{service.serviceName}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span>Starting from ₹{service.basePrice}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>~{service.estimatedDuration} mins</span>
                          </div>
                        </div>

                        {service.subServices && service.subServices.length > 0 && (
                          <div className="mb-4">
                            <ul className="space-y-1">
                              {service.subServices.slice(0, 3).map((sub, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full mt-auto bg-gradient-to-r from-blue-600 to-indigo-600">
                              Request Quote
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                              <DialogTitle>Request a Quote</DialogTitle>
                            </DialogHeader>
                            <RequestQuoteForm service={service} servicesData={servicesData} />
                          </DialogContent>
                        </Dialog>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
