import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./EnquiryForm";

const futureExpos = [
  {
    title: "Build Expo 2024",
    meta: "Building materials, construction tech, interior solutions & smart home innovations.",
    date: "Aug 14–16, 2024",
    location: "Chennai",
    badge: "Construction",
    img: "/expos/build-expo.png",
  },
  {
    title: "Property Expo 2024",
    meta: "Residential & commercial real estate, plots, investment opportunities & home loans.",
    date: "Sep 5–7, 2024",
    location: "Coimbatore",
    badge: "Real Estate",
    img: "/expos/property-expo.png",
  },
  {
    title: "Furniture Home Products Expo 2024",
    meta: "Premium furniture brands, modular kitchens, décor & smart home accessories.",
    date: "Oct 10–12, 2024",
    location: "Chennai",
    badge: "Furniture",
    img: "/expos/furniture-home.png",
  },
  {
    title: "Furniture Lifestyle Expo 2024",
    meta: "Luxury living, designer interiors, lifestyle brands & exclusive home collections.",
    date: "Nov 20–22, 2024",
    location: "Bengaluru",
    badge: "Lifestyle",
    img: "/expos/furniture-lifestyle.png",
  }
];

const CalIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="3" width="14" height="11" rx="2" stroke="#ED1C24" strokeWidth="1.4" />
    <path d="M5 1v3M11 1v3M1 7h14" stroke="#ED1C24" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 18" fill="none" aria-hidden="true">
    <path
      d="M7 1C4.239 1 2 3.239 2 6c0 3.75 5 11 5 11s5-7.25 5-11c0-2.761-2.239-5-5-5z"
      stroke="#ED1C24"
      strokeWidth="1.4"
    />
    <circle cx="7" cy="6" r="1.8" stroke="#ED1C24" strokeWidth="1.4" />
  </svg>
);

const PER_PAGE = 2;

const IndustriesSlider = () => {
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpo, setSelectedExpo] = useState(null);

  const totalPages = Math.ceil(futureExpos.length / PER_PAGE);
  const items = futureExpos.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const openRegisterModal = (expo) => {
    setSelectedExpo(expo);
    setIsModalOpen(true);
  };

  return (
    <section className="expo-section" style={{ padding: '80px 0', background: '#f9fafb' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="premium-header-box centered" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
            <div className="header-accent-line" style={{ height: '1px', width: '30px', background: '#ED1C24' }}></div>
            <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '0.8rem' }}>Future Expo</span>
            <div className="header-accent-line" style={{ height: '1px', width: '30px', background: '#ED1C24' }}></div>
          </div>
          <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a' }}>
            Discover Future Trade Exhibition
          </h2>
        </div>

        <div className="expo-slider-container" style={{ position: 'relative' }}>
          {/* EXTERNAL CHEVRON ARROWS */}
          <button
            onClick={prev}
            style={{
              position: 'absolute', top: '50%', left: '-60px', transform: 'translateY(-50%)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '3.5rem', color: '#ED1C24', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: '0.3s'
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={next}
            style={{
              position: 'absolute', top: '50%', right: '-60px', transform: 'translateY(-50%)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '3.5rem', color: '#ED1C24', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: '0.3s'
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="expo-grid-v2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {items.map((expo, i) => (
              <div className="expo-card-v2" key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '280px' }}>
                  <img src={expo.img} alt={expo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{expo.title}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#444', background: '#f3f4f6', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                        <CalIcon />
                        <span style={{ fontWeight: '700' }}>{expo.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#444', background: '#f3f4f6', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                        <PinIcon />
                        <span style={{ fontWeight: '700' }}>{expo.location}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>{expo.meta}</p>

                  {/* RED INTERESTED BUTTON */}
                  <button
                    onClick={() => openRegisterModal(expo)}
                    style={{
                      width: '100%', padding: '15px', background: '#ED1C24', color: '#fff',
                      border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      marginTop: 'auto', transition: '0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'brightness(0.9)'}
                    onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
                  >
                    Interested <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <span
                key={i}
                onClick={() => setPage(i)}
                style={{ width: '12px', height: '12px', borderRadius: '50%', background: i === page ? '#ED1C24' : '#ddd', cursor: 'pointer', transition: '0.3s' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* REGISTRATION MODAL WITH SIMPLIFIED FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '500px', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
            >
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={selectedExpo}
                onClose={() => setIsModalOpen(false)}
                isSimplified={true} // ONLY NAME, PHONE, EMAIL
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1300px) {
          button[onClick] { left: -30px !important; right: -30px !important; font-size: 2.5rem !important; }
        }
        @media (max-width: 1100px) {
          button[onClick] { display: none !important; }
        }
        @media (max-width: 992px) {
          .expo-grid-v2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default IndustriesSlider;