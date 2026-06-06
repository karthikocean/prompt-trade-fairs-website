import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { getBanners } from "../api/common.api";
import { getImageUrl } from "../config/apiClient";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBanners();
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const apiBanners = res.data.data.map((banner) => ({
            img: getImageUrl(banner.image),
            title: banner.title || "",
            desc: banner.description || banner.desc || "",
            btnText: banner.buttonText || banner.btn_text || "Learn More",
            link: banner.link || banner.url || "/",
          }));
          setSlides(apiBanners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.img;
    });
  }, [slides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length, currentIndex]);

  if (loading) {
    return (
      <section className="hero hero--loading">
        <div className="hero-loader">
          <div className="hero-loader__spinner"></div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="hero">
      {/* SLIDER */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          className="hero-slide"
          style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.2, ease: "linear" }}
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

            <Link to="/upcoming-exhibitions">
              <motion.button
                className="hero-btn"
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
      {/* <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div> */}

      <style>{`

      .hero-btn {
  background: #ED1C24;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  background: #c9171e;
  transform: translateY(-2px);
}
  
        .hero--loading {
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
        }
        .hero-loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-loader__spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(255,255,255,0.15);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .hero {
    height: 100svh !important;
    min-height: 100svh !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }

  .hero-slide {
    position: relative;
    width: 100%;
    height: 100svh !important;
    min-height: 100svh !important;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 20px !important;

    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .hero-content {
    width: 100%;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center !important;

    padding: 0 !important;
    margin: 0 auto !important;

    position: relative;
    z-index: 2;
  }

  .hero-content h1 {
    font-size: 32px !important;
    line-height: 1.2;
    margin-bottom: 15px;
    text-align: center;
  }

  .hero-content p {
    font-size: 15px !important;
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: center;
  }

  .hero-content button {
    margin: 0 auto;
  }

  /* Hide dots completely */
  .slider-dots,
  .hero-dots {
    display: none !important;
  }

  /* Hide arrows if present */
  .hero-arrows {
    display: none !important;
  }

        }
      `}</style>
    </section>
  );
};

export default Hero;