import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./EnquiryForm";

const presentExpos = [
  {
    name: "Build Expo 2024",
    manager: "Mr. Karthik Krishnan",
    location: "Chennai Trade Centre, Chennai",
    startDate: "May 15, 2024",
    endDate: "May 17, 2024",
    startTime: "10:00 AM",
    endTime: "07:00 PM",
    img: "/expos/build-expo.png",
    description: "South India's largest building materials and construction technology exhibition."
  },
  {
    name: "Food & Hospitality Expo 2024",
    manager: "Ms. Priya Sharma",
    location: "CODISSIA Complex, Coimbatore",
    startDate: "June 10, 2024",
    endDate: "June 12, 2024",
    startTime: "09:30 AM",
    endTime: "06:30 PM",
    img: "/expos/food-expo.png",
    description: "A premier platform for food processing, hospitality and catering innovations."
  },
  {
    name: "Furniture & Lifestyle Expo 2024",
    manager: "Mr. Suresh Kumar",
    location: "BIEC, Bengaluru",
    startDate: "July 05, 2024",
    endDate: "July 08, 2024",
    startTime: "10:00 AM",
    endTime: "08:00 PM",
    img: "/expos/property-expo.png",
    description: "Showcasing premium furniture, interior decor and luxury lifestyle products."
  }
];

const NextExpoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentExpo = presentExpos[currentIndex];

  const nextExpo = () => setCurrentIndex((p) => (p + 1) % presentExpos.length);
  const prevExpo = () => setCurrentIndex((p) => (p - 1 + presentExpos.length) % presentExpos.length);

  return (
    <section className="next-expo-section" style={{ padding: '80px 0', background: '#fff', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="premium-header-box centered" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
            <div className="header-accent-line" style={{ height: '1px', width: '30px', background: '#ED1C24' }}></div>
            <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '0.8rem' }}>Present Expo</span>
            <div className="header-accent-line" style={{ height: '1px', width: '30px', background: '#ED1C24' }}></div>
          </div>
          <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a' }}>
            Ongoing Business Exhibition
          </h2>
        </div>

        {/* EXTERNAL NAVIGATION ARROWS */}
        <button 
          className="external-nav-btn prev" 
          onClick={prevExpo} 
          style={{ position: 'absolute', top: '55%', left: '-60px', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '3rem', color: '#ED1C24', zIndex: 10, transition: '0.3s' }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="external-nav-btn next" 
          onClick={nextExpo} 
          style={{ position: 'absolute', top: '55%', right: '-60px', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '3rem', color: '#ED1C24', zIndex: 10, transition: '0.3s' }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="next-expo-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }}>
          {/* LEFT: GALLERY CAROUSEL */}
          <div className="next-expo-gallery">
            <div className="gallery-main-wrapper" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{ height: '380px' }}
                >
                  <img src={currentExpo.img} alt={currentExpo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: EXPO DETAILS */}
          <div className="next-expo-content-right">
            <div className="present-expo-card-v2">
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '25px', borderLeft: '5px solid #ED1C24', paddingLeft: '15px' }}>
                {currentExpo.name}
              </h3>
              
              <div className="details-grid-v2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-user-tie" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Manager</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.manager}</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Location</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.location}</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-calendar-check" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Duration</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.startDate} - {currentExpo.endDate}</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-clock" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Timings</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.startTime} - {currentExpo.endTime}</p>
                  </div>
                </div>
              </div>

              <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '35px', fontSize: '1rem' }}>
                {currentExpo.description}
              </p>

              <div className="present-expo-actions" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button style={{ padding: '12px 25px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: '#f3f4f6', color: '#374151' }}>
                  <i className="fas fa-th-large"></i> Layout
                </button>
                <button style={{ padding: '12px 25px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: '#f3f4f6', color: '#374151' }}>
                  <i className="fas fa-file-pdf"></i> Brochure
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  style={{ padding: '12px 30px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: '#ED1C24', color: '#fff', flexGrow: 1, justifyContent: 'center', boxShadow: '0 4px 15px rgba(237, 28, 36, 0.3)' }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="expo-modal-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="expo-modal-container" 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{ maxWidth: '850px', width: '95%', background: 'transparent', position: 'relative' }} 
              onClick={(e) => e.stopPropagation()}
            >
              {/* REMOVED EXTRA CLOSE BUTTON AND WHITE BACKGROUND AREA */}
              <EnquiryForm 
                isExpoRegistration={true} 
                expoInfo={currentExpo}
                onClose={() => setIsModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1200px) {
          .external-nav-btn {
            display: none;
          }
        }
        @media (max-width: 992px) {
          .next-expo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NextExpoSection;
