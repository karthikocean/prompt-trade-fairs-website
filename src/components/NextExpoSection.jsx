import React, { useState, useEffect } from "react";
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
const formatDateRange = (start, end) => {
  if (!start) return "";
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : startDate;
  const month = startDate.toLocaleString(undefined, { month: 'long' });
  const year = startDate.getFullYear();
  const dayStart = startDate.getDate();
  const dayEnd = endDate.getDate();
  const days = dayStart === dayEnd ? `${dayStart}` : Array.from({ length: dayEnd - dayStart + 1 }, (_, i) => dayStart + i).join(', ');
  return `${days} ${month}-${year}`;
};

const NextExpoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  // Auto slide every 5 seconds
  useEffect(() => {
    if (expos.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === expos.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [expos.length, isHovered]);

  const currentExpo = expos[currentIndex];
  // Reset loader when switching to a new expo image
  React.useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  const nextExpo = () => setCurrentIndex((prev) => prev === expos.length - 1 ? 0 : prev + 1);
  const prevExpo = () => setCurrentIndex((prev) => prev === 0 ? expos.length - 1 : prev - 1);

  // if (loading) {
  //   return (
  //     <div style={{ padding: '100px 0', textAlign: 'center' }}>
  //       <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
  //       <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibitions...</p>
  //       <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  //     </div>
  //   );
  // }

  if (expos.length === 0) {
    return null; // Or show a placeholder
  }

  return (
    <section className="next-expo-section" style={{ padding: '80px 0', background: '#fff', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="premium-header-box centered" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
            <div className="header-accent-line"></div>
            <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>Present Expo
            </span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title" style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a1a' }}>
            Ongoing Business Exhibition
          </h2>
        </div>

        {/* EXTERNAL NAVIGATION ARROWS - ONLY IF > 1 EXPO */}
        {expos.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                className="nav-arrow left"
                onClick={prevExpo}
                aria-label="Previous Expo"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )}
            {currentIndex < expos.length - 1 && (
              <button
                className="nav-arrow right"
                onClick={nextExpo}
                aria-label="Next Expo"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </>
        )}

        <div
          className="next-expo-grid"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '50px',
            alignItems: 'center'
          }}
        >
          {/* LEFT: GALLERY CAROUSEL */}
          <div className="next-expo-gallery">
            {/* Loader shown while the expo image is loading */}
            {!imageLoaded && (
              <div className="image-loader">
                <div className="loader"></div>
              </div>
            )}
            <div
              className="gallery-main-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow:
                  "0 15px 35px rgba(0,0,0,0.12), 0 30px 70px rgba(0,0,0,0.18)",
                cursor: 'pointer'
              }}
            >
              <motion.img
                key={currentIndex}
                src={getImageUrl(currentExpo.expoImage)}
                alt={currentExpo.expoName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          <div className="next-expo-content-right">
            <div className="present-expo-card-v2">
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '25px', borderLeft: '5px solid #ED1C24', paddingLeft: '15px' }}>
                {currentExpo.expoName}
              </h3>

              <div className="details-grid-v2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px', marginBottom: '30px' }}>
                <div className="detail-item-v2" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: '#fff', minWidth: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                    <i className="fas fa-calendar-alt" style={{ color: '#E31E24', fontSize: '1.4rem' }}></i>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                      {formatDateRange(currentExpo.startDate, currentExpo.endDate)}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Exhibition Duration</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: '#fff', minWidth: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#E31E24', fontSize: '1.4rem' }}></i>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                      {currentExpo.venue}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Event Location</p>
                  </div>
                </div>

                <div className="detail-item-v2" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: '#fff', minWidth: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                    <i className="fas fa-clock" style={{ color: '#E31E24', fontSize: '1.4rem' }}></i>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                      {currentExpo.startTime} - {currentExpo.endTime}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Expo Timing</p>
                  </div>
                </div>

                {currentExpo.stats && (
                  <div className="detail-item-v2" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ background: '#fff', minWidth: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                      <i className="fas fa-chart-pie" style={{ color: '#E31E24', fontSize: '1.4rem' }}></i>
                    </div>
                    <div className="stats-row-mobile" style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Available</label>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#2ecc71' }}>{currentExpo.stats.stallAvailable}</p>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Booked</label>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#E31E24' }}>{currentExpo.stats.stallBooked}</p>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', color: '#999', marginBottom: '3px' }}>Visitors</label>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#3498db' }}>{currentExpo.stats.visitorBooked}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '35px', fontSize: '1rem' }}>
                Experience South India's premier trade event at {currentExpo.venue}. Join industry leaders and explore the latest innovations in {currentExpo.products?.map(p => p.productName).join(', ') || "various sectors"}.
              </p> */}

              <div className="present-expo-actions">
                <a
                  href={currentExpo.layoutImage ? getImageUrl(currentExpo.layoutImage) : undefined}
                  target={currentExpo.layoutImage ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="expo-action-link layout-btn"
                  style={!currentExpo.layoutImage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  <i className="fas fa-download"></i> Layout
                </a>
                <a
                  href={currentExpo.brochure ? getImageUrl(currentExpo.brochure) : undefined}
                  target={currentExpo.brochure ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="expo-action-link brochure-btn"
                  style={!currentExpo.brochure ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  <i className="fas fa-download"></i> Brochure
                </a>
                <button
                  onClick={() => {
                    setSelectedExpo(currentExpo);
                    setIsModalOpen(true);
                  }}
                  className="register-btn-main"
                >
                  Register Now <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DOTS */}
        {expos.length > 1 && (
          <div className="slider-dots">
            {expos.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        )}
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
                expoInfo={selectedExpo}
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedExpo(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
  .next-expo-section {
    overflow-x: hidden;
  }

  @media (max-width: 1200px) {
    .external-nav-btn {
      display: none;
    }
  }

  @media (max-width: 992px) {
    .next-expo-grid {
      grid-template-columns: 1fr !important;
      gap: 30px !important;
    }
    .gallery-main-wrapper {
      height: 250px !important;
    }
    .gallery-main-wrapper > div {
      height: 250px !important;
    }
    .next-expo-content-right h3 {
      font-size: 1.8rem !important;
      text-align: center;
    }
    .details-grid-v2 {
      grid-template-columns: 1fr !important;
      gap: 15px !important;
    }
    .present-expo-actions {
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      justify-content: space-between !important;
      gap: 8px !important;
    }
    .present-expo-actions a,
    .present-expo-actions button {
      padding: 10px 12px !important;
      font-size: 0.8rem !important;
      flex: 1 !important;
    }
  }

  @media (max-width: 768px) {

  .stats-row-mobile {
    width: 100%;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    flex-wrap: nowrap !important;
    gap: 10px !important;
  }

  .stats-row-mobile > div {
    flex: 1;
    text-align: center;
  }

/* Align stats cards equally on mobile/tablet */
@media (max-width: 991px) {
  .stats-row-mobile {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    align-items: start;
    justify-items: center;
  }
  .stats-row-mobile > div {
    text-align: left !important;
  }
    
}

@media (max-width: 768px) {
  .stats-row-mobile {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    align-items: start;
    justify-items: center;
  }
}

    .next-expo-section {
      padding: 50px 20px !important;
    }
    .header-main-title {
      font-size: clamp(28px, 7vw, 42px) !important;
      line-height: 1.2 !important;
      text-align: center !important;
    }
    
    .header-accent-row {
      gap: 4px !important;
    }

    .header-accent-line {
      width: 35px !important;
      flex-shrink: 0;
    }

  .header-accent-tag {
    margin: 0 !important;
    padding: 0 !important;
  }
    .present-expo-actions {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
  }

  // .layout-btn,
  // .brochure-btn {
  //   flex: 1 1 calc(50% - 5px) !important;
  //   width: calc(50% - 5px) !important;
  // }

  .present-expo-actions {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
  }

  .present-expo-actions .expo-action-link,
  .present-expo-actions .register-btn-main {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;

    height: 64px !important;
    box-sizing: border-box !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

    .details-grid-v2 {
      gap: 15px !important;
    }
    .next-expo-content-right p {
      max-width: 100% !important;
      font-size: 15px !important;
      line-height: 1.7 !important;
    }
    .gallery-main-wrapper {
      height: 100% !important;
      display: flex;
    }
    .gallery-main-wrapper > div {
      flex: 1 !important;
      height: 100% !important;
    }
    .gallery-main-wrapper img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      display: block !important;
      margin-bottom: 0 !important;
    }
  }
`}</style>
    </section>
  );
};

export default NextExpoSection;
