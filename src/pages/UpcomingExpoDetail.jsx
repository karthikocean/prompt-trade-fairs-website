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

const UpcomingExpoDetail = () => {
  const { slug } = useParams();
  const [expo, setExpo] = useState(null);
  const [loading, setLoading] = useState(true);

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
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
      <div className="container" style={{ padding: '80px 0' }}>
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

                <div className="expo-features-grid-full">
                  <div className="feature-block">
                    <div className="feature-icon-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="feature-text-box">
                      <span className="feature-label">Venue Location</span>
                      <strong className="feature-value">{expo.venue}</strong>
                    </div>
                  </div>

                  <div className="feature-block">
                    <div className="feature-icon-box">
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    <div className="feature-text-box">
                      <span className="feature-label">Duration</span>
                      <strong className="feature-value">{formatDate(expo.startDate)} - {formatDate(expo.endDate)}</strong>
                    </div>
                  </div>

                  <div className="feature-block">
                    <div className="feature-icon-box">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="feature-text-box">
                      <span className="feature-label">Timings</span>
                      <strong className="feature-value">{expo.startTime} - {expo.endTime}</strong>
                    </div>
                  </div>

                  {/* {expo.stats && (
                    <div className="feature-block">
                      <div className="feature-icon-box" style={{ color: '#22c55e', background: '#f0fdf4' }}>
                        <i className="fas fa-th"></i>
                      </div>
                      <div className="feature-text-box">
                        <span className="feature-label">Available Stalls</span>
                        <strong className="feature-value" style={{ color: '#22c55e' }}>{expo.stats.stallAvailable} Stalls</strong>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>

              <div className="expo-downloads-row">
                <a
                  href={expo.layoutImage ? getImageUrl(expo.layoutImage) : undefined}
                  target={expo.layoutImage ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="download-btn-v3"
                  style={!expo.layoutImage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  <i className="fas fa-download"></i> Layout
                </a>

                <a
                  href={expo.brochure ? getImageUrl(expo.brochure) : undefined}
                  target={expo.brochure ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="download-btn-v3"
                  style={!expo.brochure ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  <i className="fas fa-download"></i> Brochure
                </a>
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
          gap: 30px;
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
          font-size: 1.1rem;
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
          .expo-detail-split-row {
            grid-template-columns: 1fr;
          }
          
          .expo-banner-container-full {
            height: auto;
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
          }
          
          .expo-info-body-full {
            padding: 30px;
          }
        }
      `}</style>
    </main>
  );
};

export default UpcomingExpoDetail;
