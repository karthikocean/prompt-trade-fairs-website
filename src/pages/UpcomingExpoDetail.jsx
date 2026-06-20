import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPresentExpos } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';
import EnquiryForm from '../components/EnquiryForm';
import toast from 'react-hot-toast';

const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

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

const UpcomingExpoDetail = () => {
  const { slug } = useParams();
  const [expo, setExpo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('registration-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getPresentExpos();
        if (response.data && response.data.data) {
          const foundExpo = response.data.data.find(e => slugify(e.expoName) === slug);
          setExpo(foundExpo || null);
        }
      } catch (error) {
        console.error("Error fetching expo details:", error);
        toast.error("Failed to load exhibition details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibition details...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!expo) {
    return (
      <div style={{ padding: '150px 0', textAlign: 'center' }}>
        <h2>Exhibition Not Found</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>The exhibition you are looking for might have ended or is unavailable.</p>
        <Link to="/upcoming-exhibitions" style={{ color: '#ED1C24', fontWeight: '700' }}>Back to Exhibitions</Link>
      </div>
    );
  }

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
                <Link to="/">Home</Link> <span>/</span> <Link to="/upcoming-exhibitions">Current Exhibitions</Link> <span>/</span> <span className="current">{expo.expoName}</span>
              </div>
              <div className="v3-hero-title-row">
                <h1 className="v3-hero-title" style={{ margin: 0 }}>Exhibition <span>Details</span></h1>
                <button
                  onClick={scrollToForm}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '50px',
                    background: '#ED1C24',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 6px 15px rgba(237, 28, 36, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Register Now <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <div className="container expo-detail-container">
        {/* BACK BUTTON */}
        <div style={{ marginBottom: '35px' }}>
          <Link to="/upcoming-exhibitions" className="v3-back-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ED1C24',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: '1rem',
            transition: '0.3s'
          }}>
            <i className="fas fa-arrow-left"></i> Back to Exhibitions
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
                src={getImageUrl(expo.expoImage)}
                alt={expo.expoName}
                className="expo-banner-image-full"
              />
            </div>

            <div className="expo-info-body-full">
              <div>
                <h1 className="expo-details-title">{expo.expoName}</h1>

                <div className="expo-features-grid-full" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '15px' : '20px', marginTop: '30px' }}>
                  {/* 1. Date Block */}
                  <div className="feature-block" style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
                    <div style={{ background: '#fff', minWidth: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                      <i className="fas fa-calendar-alt" style={{ color: '#E31E24', fontSize: isMobile ? '1.1rem' : '1.4rem' }}></i>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '14.5px' : '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                        {formatDateRange(expo.startDate, expo.endDate)}
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
                        {expo.venue}
                      </h4>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>Event Location</p>
                    </div>
                  </div>

                  {/* 3. Expo Timing */}
                  <div className="feature-block" style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
                    <div style={{ background: '#fff', minWidth: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                      <span style={{ background: '#ED1C24', width: isMobile ? '26px' : '34px', height: isMobile ? '26px' : '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-clock" style={{ color: '#fff', fontSize: isMobile ? '0.85rem' : '1.05rem' }}></i>
                      </span>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '14.5px' : '16px', fontWeight: '800', color: '#0a192f', textTransform: 'uppercase' }}>
                        {expo.startTime} - {expo.endTime}
                      </h4>
                      <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>Expo Timing</p>
                    </div>
                  </div>

                  {/* 4. Website (if present) */}
                  {expo.websiteLink && (
                    <div className="feature-block" style={{ display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center' }}>
                      <div style={{ background: '#fff', minWidth: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: isMobile ? '10px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                        <i className="fas fa-globe" style={{ color: '#E31E24', fontSize: isMobile ? '1.1rem' : '1.4rem' }}></i>
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '14.5px' : '16px', fontWeight: '800', color: '#0a192f', textTransform: 'lowercase', wordBreak: 'break-all' }}>
                          <a
                            href={expo.websiteLink.startsWith('http://') || expo.websiteLink.startsWith('https://') ? expo.websiteLink : `https://${expo.websiteLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }}
                            onMouseEnter={(e) => e.target.style.color = '#ED1C24'}
                            onMouseLeave={(e) => e.target.style.color = 'inherit'}
                          >
                            {expo.websiteLink}
                          </a>
                        </h4>
                        <p style={{ margin: 0, fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#666' }}>Website</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="expo-downloads-row">
                <div className="present-expo-actions">
                  <Link
                    to={`/about-expo/${slug}`}
                    className="expo-action-link about-expo-btn"
                  >
                    <i className="fas fa-info-circle"></i> About the Expo
                  </Link>
                  <a
                    href={expo.layoutImage ? getImageUrl(expo.layoutImage) : undefined}
                    target={expo.layoutImage ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="expo-action-link layout-btn"
                    style={!expo.layoutImage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    <i className="fas fa-download"></i> Layout
                  </a>
                  <a
                    href={expo.brochure ? getImageUrl(expo.brochure) : undefined}
                    target={expo.brochure ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="expo-action-link brochure-btn"
                    style={!expo.brochure ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    <i className="fas fa-download"></i> Brochure
                  </a>
                  {/* <button
                    onClick={scrollToForm}
                    className="register-btn-main"
                  >
                    Register Now <i className="fas fa-arrow-right"></i>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM: REGISTER NOW FORM */}
        <div id="registration-form-section" className="expo-form-section-container" style={{ marginTop: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="expo-form-card"
          >
            <div className="expo-form-heading">
              <h2>Register / Book Stall</h2>
              <p>Fill out the form below to book a stall or register as a visitor.</p>
            </div>
            <div className="expo-form-body-wrapper">
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={expo}
                hideHeader={true}
                onClose={() => { }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .v3-hero-title-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

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
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #f1f5f9;
        }

        .expo-banner-image-full {
          width: 100%;
          height: auto;
          display: block;
        }

        .expo-info-body-full {
          padding: 50px;
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

        .expo-downloads-row {
          display: flex;
          gap: 15px;
          border-top: 1px solid #f1f5f9;
          padding-top: 30px;
        }

        .download-btn-v3 {
          flex: 1;
          justify-content: center;
          padding: 12px 25px;
          border-radius: 10px;
          background: #f1f5f9;
          color: #334155;
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: 0.3s;
          border: 1px solid #e2e8f0;
          cursor: pointer;
        }

        .download-btn-v3:hover {
          background: #e2e8f0;
        }

        .expo-form-section-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .expo-form-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          width: 100%;
          max-width: 900px;
        }

        .expo-form-heading {
          padding: 30px 30px 10px 30px;
          background: #fff;
        }

        .expo-form-heading h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 8px;
        }

        .expo-form-heading p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .expo-form-body-wrapper {
          padding: 0 30px 30px 30px;
          width: 100%;
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
          
          .expo-info-body-full {
            padding: 35px;
          }
        }

        @media (max-width: 768px) {
          .desktop-only-row {
            display: none !important;
          }

          .mobile-only-row {
            display: flex !important;
          }

          .v3-hero-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

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

          .expo-form-heading {
            padding: 20px 20px 5px 20px !important;
          }

          .expo-form-heading h2 {
            font-size: 1.3rem !important;
          }

          .expo-form-body-wrapper {
            padding: 0 20px 20px 20px !important;
          }

          .expo-form-section-container {
            margin-top: 35px !important;
          }
        }

        @media (max-width: 480px) {
          .expo-detail-container {
            padding: 30px 0;
          }
        }
      `}</style>
    </main>
  );
};

export default UpcomingExpoDetail;
