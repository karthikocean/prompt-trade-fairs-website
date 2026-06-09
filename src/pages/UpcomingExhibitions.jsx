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

  // if (loading) {
  //   return (
  //     <div style={{ padding: '200px 0', textAlign: 'center' }}>
  //       <div
  //         className="loader"
  //         style={{
  //           border: '4px solid #f3f3f3',
  //           borderTop: '4px solid #ED1C24',
  //           borderRadius: '50%',
  //           width: '40px',
  //           height: '40px',
  //           animation: 'spin 1s linear infinite',
  //           margin: '0 auto'
  //         }}
  //       ></div>
  //       <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibitions...</p>
  //       <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  //     </div>
  //   );
  // }

  return (
    <main className="upcoming-v3-main">

      {/* HERO */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/expobanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">Present Exhibitions</span>
              </div>
              <h1 className="v3-hero-title">Present <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="upcoming-grid-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span
                className="header-accent-tag"
                style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}
              >
                Present Exhibitions
              </span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111', fontSize: '2rem' }}>
              Book Your Expo
            </h2>
          </div>

          {expos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '20px' }}>
              <i className="fas fa-briefcase" style={{ fontSize: '3rem', color: '#eee', marginBottom: '20px' }}></i>
              <h3 style={{ fontWeight: '800', color: '#111' }}>No Present Expo Available.</h3>
            </div>
          ) : (
            <div
              className="row expo-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}
            >
              {expos.slice(0, visibleCount).map((expo) => (
                <div
                  key={expo._id}
                  className="expo-card mb-4"
                  onClick={() => setSelectedExpo(expo)}
                  style={{ borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                >
                  <div style={{ width: '100%', height: '380px', overflow: 'hidden' }}>
                    <img
                      src={getImageUrl(expo.expoImage)}
                      alt={expo.expoName}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', lineHeight: '1.3', marginBottom: '15px' }}>
                      {expo.expoName}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'rgb(17,17,17)', fontWeight: '700', fontSize: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="far fa-calendar-alt" style={{ color: '#ED1C24' }}></i> {formatDate(expo.startDate)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fas fa-clock" style={{ color: '#ED1C24' }}></i> {expo.startTime} - {expo.endTime}
                        </span>
                      </div>
                      <span style={{ gap: '8px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {expo.venue}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showLoadMore && (
            <div className="present-expo-btn" style={{ textAlign: 'center', marginTop: '40px' }}>
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

      {/* EXPO DETAIL MODAL */}
      <AnimatePresence>
        {selectedExpo && (
          <motion.div
            className="media-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExpo(null)}
          >
            <motion.div
              className="modal-premium-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-v3">
                <h2 className="modal-title-v3">{selectedExpo.expoName}</h2>
                <div className="modal-close-v3" onClick={() => setSelectedExpo(null)}>
                  <i className="fas fa-times"></i>
                </div>
              </div>

              <div className="modal-body-v3">
                <div className="modal-main-grid">
                  <div className="modal-image-wrapper" style={{ height: 'auto', borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                      src={getImageUrl(selectedExpo.expoImage)}
                      alt="Expo"
                      style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
                    />
                  </div>

                  <div className="modal-details-col">
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

                  <a
                    href={selectedExpo.layoutImage ? getImageUrl(selectedExpo.layoutImage) : undefined}
                    target={selectedExpo.layoutImage ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="modal-btn-secondary"
                    style={!selectedExpo.layoutImage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    <i className="fas fa-download"></i> Layout
                  </a>

                  <a
                    href={selectedExpo.brochure ? getImageUrl(selectedExpo.brochure) : undefined}
                    target={selectedExpo.brochure ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="modal-btn-secondary"
                    style={!selectedExpo.brochure ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
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

      {/* ENQUIRY MODAL */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <motion.div
            className="media-modal-overlay dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEnquiryModalOpen(false)}
          >
            <motion.div
              className="register-modal-form"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
  @media (min-width: 769px) {
    .expo-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 991px) and (min-width: 769px) {
    .expo-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .expo-grid {
      grid-template-columns: 1fr !important;
    }
  }

  /* Tablet modal enhancements */
  @media (min-width: 769px) and (max-width: 1024px) {
    .media-modal-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-premium-card {
      width: 90%;
      max-width: 800px;
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      border-radius: 16px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .modal-image-wrapper {
      height: auto;
      max-height: 400px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-image-wrapper img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
    .modal-details-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 10px 0;
    }
    .modal-details-col .detail-item-lite {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      justify-content: center;
    }
    .modal-details-col .detail-icon i {
      font-size: 1.2rem;
      color: var(--primary-color);
    }
    .modal-details-col .detail-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .modal-details-col .detail-label {
      font-weight: 600;
      color: var(--text-muted);
      margin: 0;
    }
    .modal-details-col .detail-value {
      font-weight: 700;
      color: var(--text-color);
      margin: 0;
    }
    .modal-stats-container {
      grid-column: 1 / -1;
      padding-top: 20px;
      border-top: 1px solid var(--glass-border);
    }
    .modal-stats-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .stat-unit {
      text-align: center;
    }
    .modal-actions-v3 {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
      margin-top: 20px;
    }
    .modal-actions-v3 a,
    .modal-actions-v3 button {
      width: 100%;
      justify-content: center;
      padding: 12px;
      border-radius: 10px;
      font-weight: 600;
      transition: var(--transition-speed);
    }
  }
`}</style>

    </main>
  );
};

export default UpcomingExhibitions;