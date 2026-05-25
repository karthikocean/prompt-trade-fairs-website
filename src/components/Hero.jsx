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
  }, [slides.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="hero">
      {/* SLIDER */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="hero-slide"
          style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="overlay"></div>

          {/* TEXT CONTENT */}
          <div
            className="hero-content"

          >
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

      {/* DOTS */}
      <div
        className="slider-dots"

      >
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? "active" : ""
              }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
        <style jsx>{`
          html,
          body,
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            width: 100%;
          }

          @media (max-width: 768px) {
            .hero {
              width: 100%;
              overflow: hidden;
              position: relative;
            }

            .hero-slide {
              width: 100%;
              min-height: 100svh;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 20px;
              box-sizing: border-box;
            }

            .hero-content {
              width: 100%;
              max-width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding-top: 120px;
              padding-bottom: 100px;
              position: relative;
              z-index: 2;
            }

            .hero-content h1 {
              font-size: clamp(42px, 8vw, 56px);
              line-height: 1.1;
              margin-bottom: 16px;
            }

            .hero-content p {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 24px;
            }

            .hero-content button {
              margin-bottom: 0;
            }

            .slider-dots {
              position: absolute;
              bottom: 25px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              z-index: 10;
            }
          }
        `}</style>
    </section>
  );
};

export default Hero;