import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPastExpoDetails } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';
import EnquiryForm from '../components/EnquiryForm';
import toast from 'react-hot-toast';

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

const EventDetail = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('Image'); // 'Image', 'Video', 'YouTube'
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getPastExpoDetails(id);
        if (response.data && response.data.data) {
          setEvent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching expo details:", error);
        toast.error("Failed to load exhibition details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibition details...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: '150px 0', textAlign: 'center' }}>
        <h2>Event Not Found</h2>
        <Link to="/events" style={{ color: '#ED1C24', fontWeight: '700' }}>Back to Events</Link>
      </div>
    );
  }

  const filteredGallery = event.gallery?.filter(item =>
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  return (
    <main className="upcoming-detail-v3" style={{ background: '#f8f9fa' }}>
      {/* HERO BANNER STYLE */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/aboutusbanner.png')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <Link to="/events">Events</Link> <span>/</span> <span className="current">{event.expoName}</span>
              </div>
              <div className="v3-hero-title-row">
                <h1 className="v3-hero-title" style={{ margin: 0 }}>Event <span>Details</span></h1>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container expo-detail-container">
        {/* BACK TO EVENTS BUTTON */}
        <div style={{ marginBottom: '35px' }}>
          <Link to="/events" className="v3-back-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ED1C24',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: '1rem',
            transition: '0.3s'
          }}>
            <i className="fas fa-arrow-left"></i> Back to Events
          </Link>
        </div>

        {/* TOP: EXPO DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="expo-main-card"
        >
          <div className="expo-detail-split-row">
            <div className="expo-banner-container-full">
              <img
                src={getImageUrl(event.expoImage)}
                alt={event.expoName}
                className="expo-banner-image-full"
              />
            </div>

            <div className="expo-info-body-full">
              <div>
                <h1 className="expo-details-title" style={{ margin: '0 0 10px 0' }}>{event.expoName}</h1>

                <div className="expo-features-grid-full" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '20px', marginTop: '30px' }}>
                  {/* 1. Date Block */}
                  <div className="feature-block" style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
                    <div style={{ background: '#fff', minWidth: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                      <i className="fas fa-calendar-alt" style={{ color: '#E31E24', fontSize: isMobile ? '1.1rem' : '1.4rem' }}></i>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '14.5px' : '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                        {formatDateRange(event.startDate, event.endDate)}
                      </h4>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>Exhibition Duration</p>
                    </div>
                  </div>

                  {/* 2. Venue Location */}
                  <div className="feature-block" style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
                    <div style={{ background: '#fff', minWidth: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#E31E24', fontSize: isMobile ? '1.1rem' : '1.4rem' }}></i>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '14.5px' : '16px', fontWeight: '800', color: '#0a192f', wordBreak: 'break-word' }}>
                        {event.venue}
                      </h4>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>Event Location</p>
                    </div>
                  </div>

                  {/* 3. Expo Timing */}
                  {event.startTime && event.endTime && (
                    <div className="feature-block" style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
                      <div style={{ background: '#fff', minWidth: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                        <span style={{ background: '#ED1C24', width: isMobile ? '26px' : '34px', height: isMobile ? '26px' : '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-clock" style={{ color: '#fff', fontSize: isMobile ? '0.85rem' : '1.05rem' }}></i>
                        </span>
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '14.5px' : '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                          {event.startTime} - {event.endTime}
                        </h4>
                        <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>Expo Timing</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
              {/* 
              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '12px' }}>About this Event</h4>
                <p style={{ color: '#555', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                  Experience the highlights of <strong>{event.expoName}</strong> held at <strong>{event.venue}</strong>.
                  {event.products?.length > 0 && ` Explore a wide range of products including ${event.products.map(p => p.productName).join(', ')}.`}
                </p>
              </div> */}

              <div className="expo-downloads-row" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <div className="present-expo-actions">
                  <Link
                    to={`/about-expo/${event.slug}`}
                    className="expo-action-link about-expo-btn"
                  >
                    <i className="fas fa-info-circle"></i> About the Expo
                  </Link>
                  <a
                    href={event.layoutImage ? getImageUrl(event.layoutImage) : undefined}
                    target={event.layoutImage ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="expo-action-link layout-btn"
                    style={!event.layoutImage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    <i className="fas fa-download"></i> Layout
                  </a>
                  <a
                    href={event.brochure ? getImageUrl(event.brochure) : undefined}
                    target={event.brochure ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="expo-action-link brochure-btn"
                    style={!event.brochure ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    <i className="fas fa-download"></i> Brochure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
                <EnquiryForm
                  isExpoRegistration={true}
                  expoInfo={event}
                  onClose={() => setIsModalOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GALLERY SECTION (WITH FILTER BUTTONS) */}
        <section className="detail-gallery-section" style={{ margin: '60px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>
              Event <span style={{ color: '#ED1C24' }}>Gallery</span>
            </h2>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveFilter('Image')}
                style={{
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'Image' ? 'none' : '1px solid #ddd',
                  background: activeFilter === 'Image' ? '#ED1C24' : '#fff', color: activeFilter === 'Image' ? '#fff' : '#111',
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s'
                }}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveFilter('Video')}
                style={{
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'Video' ? 'none' : '1px solid #ddd',
                  background: activeFilter === 'Video' ? '#ED1C24' : '#fff', color: activeFilter === 'Video' ? '#fff' : '#111',
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s'
                }}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveFilter('YouTube')}
                style={{
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'YouTube' ? 'none' : '1px solid #ddd',
                  background: activeFilter === 'YouTube' ? '#ED1C24' : '#fff', color: activeFilter === 'YouTube' ? '#fff' : '#111',
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s'
                }}
              >
                YouTube
              </button>
            </div>
          </div>

          <div style={{ minHeight: '300px' }}>
            {filteredGallery && filteredGallery.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                <AnimatePresence mode="popLayout">
                  {filteredGallery.map((item, idx) => (
                    <motion.div
                      key={`${item.url}-${idx}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', background: '#f8f9fa' }}
                    >
                      {item.type === 'YouTube' || item.type === 'Video' ? (
                        <div style={{ aspectRatio: '16/9' }}>
                          {item.type === 'YouTube' ? (
                            <iframe
                              width="100%"
                              height="100%"
                              src={item.url.includes('embed') ? item.url : item.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0]}
                              frameBorder="0"
                              allowFullScreen
                              title="YouTube Video"
                            ></iframe>
                          ) : (
                            <video width="100%" height="100%" controls style={{ objectFit: 'cover' }}>
                              <source src={getImageUrl(item.url)} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      ) : (
                        <img src={getImageUrl(item.url)} alt="Gallery" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '100px 0', background: '#f9fafb', borderRadius: '20px', border: '2px dashed #eee' }}
              >
                <i className={`fas ${activeFilter === 'Image' ? 'fa-camera' : (activeFilter === 'YouTube' ? 'fab fa-youtube' : 'fa-video')}`} style={{ fontSize: '3rem', color: '#ccc', marginBottom: '20px' }}></i>
                <h3 style={{ color: '#999', fontWeight: '700' }}>No {activeFilter === 'Image' ? 'Photos' : (activeFilter === 'YouTube' ? 'YouTube Videos' : 'Videos')} uploaded</h3>
              </motion.div>
            )}
          </div>
        </section>
        <style>{`
          .expo-detail-container {
            padding: 80px 0;
          }

          .expo-main-card {
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            border: 1px solid rgba(0,0,0,0.05);
            overflow: hidden;
          }

          .expo-detail-split-row {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            align-items: stretch;
          }

          .expo-banner-container-full {
            width: 100%;
            height: 480px;
            overflow: hidden;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #f1f5f9;
          }

          .expo-banner-image-full {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .expo-info-body-full {
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 15px;
          }

          .expo-details-title {
            font-size: 2.2rem;
            font-weight: 900;
            color: #111;
            margin-bottom: 10px;
            line-height: 1.2;
          }

          .expo-features-grid-full {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 30px;
          }

          .feature-block {
            display: flex;
            align-items: flex-start;
            gap: 20px;
          }

          .feature-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: #fff5f5;
            color: #ED1C24;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
          }

          .feature-text-box {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .feature-label {
            font-size: 0.85rem;
            color: #888;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .feature-value {
            font-size: 1rem;
            color: #111;
            font-weight: 700;
          }

          @media (max-width: 991px) {
            .expo-detail-container {
              padding: 50px 0;
            }

            .expo-detail-split-row {
              grid-template-columns: 1fr;
            }
            
            .expo-banner-container-full {
              height: auto;
              border-right: none;
              border-bottom: 1px solid #f1f5f9;
            }

            .expo-banner-image-full {
              height: auto;
              object-fit: contain;
            }
            
            .expo-info-body-full {
              padding: 35px;
            }
          }

          @media (max-width: 768px) {
            .expo-detail-container {
              padding: 40px 0;
            }

            .expo-info-body-full {
              padding: 24px !important;
              gap: 15px !important;
            }

            .expo-details-title {
              font-size: 1.7rem !important;
              margin-bottom: 8px !important;
            }

            .expo-features-grid-full {
              margin-top: 20px !important;
              gap: 15px !important;
            }

            .feature-block {
              gap: 12px !important;
            }

            .feature-icon-box {
              width: 40px !important;
              height: 40px !important;
              font-size: 1rem !important;
              border-radius: 10px !important;
            }

            .feature-text-box {
              gap: 2px !important;
            }

            .feature-value {
              font-size: 0.95rem !important;
            }

            .expo-downloads-row {
              padding-top: 20px !important;
              margin-top: 20px !important;
            }

            .present-expo-actions {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 10px !important;
              margin-top: 0 !important;
              width: 100% !important;
            }
            
            .present-expo-actions a,
            .present-expo-actions button,
            .present-expo-actions .register-btn-main {
              padding: 0 12px !important;
              font-size: 0.85rem !important;
              height: 48px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              min-width: 0 !important;
              white-space: nowrap !important;
              box-sizing: border-box !important;
              border-radius: 8px !important;
            }

            .present-expo-actions .about-expo-btn {
              grid-column: span 2 !important;
            }
          }

          @media (max-width: 480px) {
            .expo-detail-container {
              padding: 30px 0;
            }
          }
        `}</style>
      </div>
    </main>
  );
};

export default EventDetail;
