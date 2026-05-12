import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { getBanners } from "../api/common.api";
import { getImageUrl } from "../config/apiClient";

const Hero = () => {
  const [slides, setSlides] = useState([
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
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBanners();
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const apiBanners = res.data.data;
          const updatedSlides = slides.map((slide, index) => {
            // Use API image if available for this index, otherwise fallback to static
            if (apiBanners[index]) {
              return { ...slide, img: getImageUrl(apiBanners[index].image) };
            }
            return slide;
          });
          setSlides(updatedSlides);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="overlay"></div>

          {/* TEXT CONTENT */}
          <div className="hero-content">
            <motion.h1
              key={`h1-${currentIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              key={`p-${currentIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {slides[currentIndex].desc}
            </motion.p>

            <Link to={slides[currentIndex].link}>
              <motion.button
                key={`btn-${currentIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {slides[currentIndex].btnText}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ARROWS */}
      <button className="nav-arrow left" onClick={prevSlide} style={{ left: '30px' }}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="nav-arrow right" onClick={nextSlide} style={{ right: '30px' }}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* DOTS */}
      <div className="slider-dots" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', marginTop: 0 }}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;