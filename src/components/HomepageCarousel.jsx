
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const HomepageCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from('carousel_slides')
        .select('*')
        .eq('is_enabled', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching slides:', error);
      } else {
        setSlides(data);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <div className="relative h-[60vh] flex items-center justify-center bg-gray-200">
        <Spinner />
      </div>
    );
  }

  if (slides.length === 0) {
    return null; // Don't render anything if no slides are enabled
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentIndex].image_url})` }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slides[currentIndex].heading}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl max-w-2xl mx-auto"
              >
                {slides[currentIndex].subtext}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 hover:text-white"
            onClick={prevSlide}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 hover:text-white"
            onClick={nextSlide}
          >
            <ArrowRight />
          </Button>
        </>
      )}
    </section>
  );
};

export default HomepageCarousel;
