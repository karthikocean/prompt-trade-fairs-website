import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const slides = [
    {
      img: "/banner1.svg",
      title: "Upcoming Exhibitions 2026",
      desc: "Connect with industry leaders at our next world-class trade fairs and expos.",
      btnText: "View Exhibitions",
      link: "/upcoming-exhibitions"
    },
    {
      img: "/banner2.svg",
      title: "Exclusive Business Events",
      desc: "Stay ahead with our curated calendar of B2B summits and networking events.",
      btnText: "Explore Events",
      link: "/events"
    },
    {
      img: "/banner3.svg",
      title: "Success Stories: Previous Expos",
      desc: "Glance through our record-breaking exhibitions and successful business partnerships.",
      btnText: "View History",
      link: "/previous-exhibitions"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="hero">
      {/* SLIDER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="hero-slide"
          style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          <div className="overlay"></div>

          {/* TEXT CONTENT */}
          <div className="hero-content">
            <motion.h1
              key={`h1-${currentIndex}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              key={`p-${currentIndex}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {slides[currentIndex].desc}
            </motion.p>

            <Link to={slides[currentIndex].link}>
              <motion.button
                key={`btn-${currentIndex}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {slides[currentIndex].btnText}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ARROWS */}
      <div className="hero-arrows">
        <span onClick={prevSlide}>❮</span>
        <span onClick={nextSlide}>❯</span>
      </div>

      {/* DOTS */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;