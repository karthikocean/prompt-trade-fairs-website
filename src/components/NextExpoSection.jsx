import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./EnquiryForm";
import { getPresentExpos } from "../api/common.api";
import { getImageUrl } from "../config/apiClient";
import toast from "react-hot-toast";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const NextExpoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const response = await getPresentExpos();
        if (response.data && response.data.data) {
          setExpos(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching present expos:", error);
        // toast.error("Failed to load ongoing exhibitions");
      } finally {
        setLoading(false);
      }
    };
    fetchExpos();
  }, []);

  const currentExpo = expos[currentIndex];

  const nextExpo = () => setCurrentIndex((p) => (p + 1) % expos.length);
  const prevExpo = () => setCurrentIndex((p) => (p - 1 + expos.length) % expos.length);

  if (loading) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibitions...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (expos.length === 0) {
    return null; // Or show a placeholder
  }

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
                  <img src={getImageUrl(currentExpo.expoImage)} alt={currentExpo.expoName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="next-expo-content-right">
            <div className="present-expo-card-v2">
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '25px', borderLeft: '5px solid #ED1C24', paddingLeft: '15px' }}>
                {currentExpo.expoName}
              </h3>
              
              <div className="details-grid-v2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  {currentExpo.eventManager?.profileImage ? (
                    <img src={getImageUrl(currentExpo.eventManager.profileImage)} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ED1C24' }} alt="manager" />
                  ) : (
                    <i className="fas fa-user-tie" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  )}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Manager</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.eventManager?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Location</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.venue}</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-calendar-check" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Duration</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{formatDate(currentExpo.startDate)} - {formatDate(currentExpo.endDate)}</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <i className="fas fa-clock" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Timings</label>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{currentExpo.startTime} - {currentExpo.endTime}</p>
                  </div>
                </div>

                {currentExpo.stats && (
                  <div className="detail-item-v2" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', gridColumn: 'span 2' }}>
                    <i className="fas fa-chart-pie" style={{ color: '#ED1C24', background: 'rgba(237, 28, 36, 0.05)', padding: '10px', borderRadius: '8px' }}></i>
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Stalls Available</label>
                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#2ecc71' }}>{currentExpo.stats.stallAvailable}</p>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Stalls Booked</label>
                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#ED1C24' }}>{currentExpo.stats.stallBooked}</p>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Visitors Registered</label>
                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#3498db' }}>{currentExpo.stats.visitorBooked}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '35px', fontSize: '1rem' }}>
                Experience South India's premier trade event at {currentExpo.venue}. Join industry leaders and explore the latest innovations in {currentExpo.products?.map(p => p.productName).join(', ') || "various sectors"}.
              </p>

              <div className="present-expo-actions" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a href={getImageUrl(currentExpo.layoutImage)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: '#f3f4f6', color: '#374151' }}>
                  <i className="fas fa-download"></i> Layout
                </a>
                <a href={getImageUrl(currentExpo.brochure)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: '#f3f4f6', color: '#374151' }}>
                  <i className="fas fa-download"></i> Brochure
                </a>
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
