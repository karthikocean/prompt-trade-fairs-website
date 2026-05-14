import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import { getPresentExpos } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';
import toast from 'react-hot-toast';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UpcomingExhibitions = () => {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const response = await getPresentExpos();
        if (response.data && response.data.data) {
          setExpos(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching expos:", error);
        toast.error("Failed to load exhibitions");
      } finally {
        setLoading(false);
      }
    };
    fetchExpos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  const showLoadMore = expos.length > visibleCount;

  if (loading) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibitions...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main className="upcoming-v3-main">
      <section className="about-v3-hero" style={{ backgroundImage: "url('/expobanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Present Exhibitions</span></div>
              <h1 className="v3-hero-title">Present <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="upcoming-grid-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">Present Exhibitions</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Book Your Expo</h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '30px', marginTop: '60px' }}>
            {expos.slice(0, visibleCount).map(item => (
              <motion.div
                key={item._id} whileHover={{ y: -8 }}
                className="modern-gallery-card expo-card"
                onClick={() => setSelectedExpo(item)}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
              >
                <div className="modern-card-inner">
                  <div className="expo-img" style={{ height: '260px', overflow: 'hidden', borderRadius: '12px' }}>
                    <img src={getImageUrl(item.expoImage)} alt={item.expoName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 0 0' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', color: 'rgb(17, 17, 17)', fontWeight: '700', fontSize: '13px', marginBottom: '15px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fas fa-user-tie" style={{ color: '#ED1C24' }}></i> {item.eventManager?.name || "N/A"}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="far fa-calendar-alt" style={{ color: '#ED1C24' }}></i> {formatDate(item.startDate)}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.venue}</span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', lineHeight: '1.3', marginBottom: '0' }}>
                      {item.expoName}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showLoadMore && (
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
              <button
                onClick={handleLoadMore}
                className="premium-load-btn"
                style={{
                  padding: '12px 50px',
                  borderRadius: '50px',
                  background: '#fff',
                  color: '#ED1C24',
                  border: '2px solid #ED1C24',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedExpo && (
          <motion.div
            className="media-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedExpo(null)}
          >
            <motion.div
              className="modal-premium-card"
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-v3">
                <h2 className="modal-title-v3">
                  {selectedExpo.expoName}
                </h2>
                <div
                  className="modal-close-v3"
                  onClick={() => setSelectedExpo(null)}
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>

              <div className="modal-body-v3">
                <div className="modal-main-grid">
                  <div className="modal-image-wrapper">
                    <img src={getImageUrl(selectedExpo.expoImage)} alt="Expo" />
                  </div>

                  <div className="modal-details-col">
                    <div className="detail-item-lite">
                      <div className="detail-icon"><i className="fas fa-user-tie"></i></div>
                      <div className="detail-text">
                        <p className="detail-label">Manager</p>
                        <p className="detail-value">{selectedExpo.eventManager?.name || "N/A"}</p>
                      </div>
                    </div>
                    <div className="detail-item-lite">
                      <div className="detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                      <div className="detail-text">
                        <p className="detail-label">Location</p>
                        <p className="detail-value">{selectedExpo.venue}</p>
                      </div>
                    </div>
                    <div className="detail-item-lite">
                      <div className="detail-icon"><i className="fas fa-calendar-check"></i></div>
                      <div className="detail-text">
                        <p className="detail-label">Duration</p>
                        <p className="detail-value">{formatDate(selectedExpo.startDate)} - {formatDate(selectedExpo.endDate)}</p>
                      </div>
                    </div>
                    <div className="detail-item-lite">
                      <div className="detail-icon"><i className="fas fa-clock"></i></div>
                      <div className="detail-text">
                        <p className="detail-label">Timings</p>
                        <p className="detail-value">{selectedExpo.startTime} - {selectedExpo.endTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-stats-container">
                  <p className="modal-description">
                    Join us for {selectedExpo.expoName} at {selectedExpo.venue}. Experience the premier trade event featuring the latest innovations.
                  </p>

                  <div className="modal-stats-row">
                    <div className="stat-unit">
                      <p className="stat-label">Available Stalls:</p>
                      <p className="stat-value available">{selectedExpo.stats?.stallAvailable || 0}</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-unit">
                      <p className="stat-label">Booked Stalls:</p>
                      <p className="stat-value booked">{selectedExpo.stats?.stallBooked || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-actions-v3">
                  <a href={getImageUrl(selectedExpo.layoutImage)} target="_blank" rel="noopener noreferrer" className="modal-btn-secondary">
                    <i className="fas fa-download"></i> Layout
                  </a>
                  <a href={getImageUrl(selectedExpo.brochure)} target="_blank" rel="noopener noreferrer" className="modal-btn-secondary">
                    <i className="fas fa-download"></i> Brochure
                  </a>
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="modal-btn-primary"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEnquiryModalOpen && (
          <motion.div
            className="media-modal-overlay dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsEnquiryModalOpen(false)}
          >
            <motion.div
              className="register-modal-form"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={selectedExpo}
                onClose={() => setIsEnquiryModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 992px) {
          .modern-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

const actionBtnStyle = {
  padding: '12px',
  background: '#f4f6f9',
  border: 'none',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  color: '#1a2b4a',
  fontWeight: '700',
  fontSize: '13px',
  cursor: 'pointer',
  textDecoration: 'none'
};

export default UpcomingExhibitions;