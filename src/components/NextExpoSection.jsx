import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./EnquiryForm";
import CountdownTimer from "./CountdownTimer";


const expoImages = [
  "/expos/build-expo.png",
  "/expos/food-expo.png",
  "/expos/property-expo.png",
  "/expos/healthcare-expo.png"
];

const NextExpoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % expoImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImg = () => setCurrentImgIndex((p) => (p + 1) % expoImages.length);
  const prevImg = () => setCurrentImgIndex((p) => (p - 1 + expoImages.length) % expoImages.length);

  return (
    <section className="next-expo-section">
      <div className="container">
        {/* CENTERED HEADER ABOVE GRID */}
        <div className="premium-header-box centered">
          <div className="header-accent-row">
            <div className="header-accent-line"></div>
            <span className="header-accent-tag">NEXT EVENT</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Mega Expo <span>Launch</span></h2>
        </div>

        <div className="next-expo-grid">

          {/* LEFT: GALLERY CAROUSEL */}
          <div className="next-expo-gallery">
            <div className="gallery-main-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  className="gallery-slider"
                  key={currentImgIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                >
                  <img src={expoImages[currentImgIndex]} alt="Exhibition Gallery" />
                </motion.div>
              </AnimatePresence>

              {/* MANUAL ARROWS */}
              <div className="gallery-nav-arrows">
                <button className="g-nav-btn prev" onClick={prevImg}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="g-nav-btn next" onClick={nextImg}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="gallery-dots">
              {expoImages.map((_, i) => (
                <span
                  key={i}
                  className={`g-dot ${i === currentImgIndex ? "active" : ""}`}
                  onClick={() => setCurrentImgIndex(i)}
                ></span>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="next-expo-content-right">

            <div className="expo-details-grid-lite">
              <div className="detail-item-lite">
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <h4>MARCH 20-22, 2026</h4>
                  <p>Save the date for the premier industry event</p>
                </div>
              </div>

              <div className="detail-item-lite">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>CODISSIA TRADE FAIR COMPLEX</h4>
                  <p>Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div style={{ margin: '20px 0' }}>
              <p style={{ fontSize: '1rem', fontWeight: '700', color: '#111', marginBottom: '10px' }}>Register Before It Starts:</p>
              <CountdownTimer targetDate="2026-03-20T09:00:00" />
            </div>

            <p className="expo-promo-text-lite">

              Secure your spot today to connect with 1000+ exhibitors and
              thousands of high-quality business visitors. Don't miss out on
              the biggest opportunity of the year.
            </p>

            <div className="cta-left">
              <button className="register-trigger-btn" onClick={() => setIsModalOpen(true)}>
                Register Now <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* REGISTRATION MODAL */}
      {isModalOpen && (
        <div className="expo-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="expo-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <div className="modal-form-wrapper">
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={{
                  name: "Mega Expo 2026",
                  date: "March 20-22, 2026",
                  location: "CODISSIA Complex, Coimbatore"
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NextExpoSection;
