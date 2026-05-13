import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import { getUpcomingExpos } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';

const PreviousExhibitions = () => {
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [pastVisibleCount, setPastVisibleCount] = useState(6);
  const [activeTab, setActiveTab] = useState('photos');
  const [isSimplified, setIsSimplified] = useState(false);
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await getUpcomingExpos();
        if (res.data && Array.isArray(res.data.data)) {
          setExpos(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching upcoming expos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpos();
  }, []);

  const formatDate = (start, end) => {
    if (!start) return "";
    const s = new Date(start);
    const e = new Date(end);
    const options = { month: 'short', day: 'numeric' };
    const year = s.getFullYear();
    if (start === end) return `${s.toLocaleDateString(undefined, options)}, ${year}`;
    return `${s.toLocaleDateString(undefined, options)} - ${e.toLocaleDateString(undefined, options)}, ${year}`;
  };

  const handlePastLoadMore = () => setPastVisibleCount(prev => prev + 3);

  const openInterestedForm = (expo) => {
    // Map API data back to simplified format for modal if needed
    const mappedExpo = {
      _id: expo._id,
      expoName: expo.expoName
    };
    setSelectedExpo(mappedExpo);
    setIsSimplified(true);
    setIsEnquiryModalOpen(true);
  };

  return (
    <main className="previous-v3-main">
      {/* HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/expobanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Future Exhibitions</span></div>
              <h1 className="v3-hero-title">Future <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPOS GRID - MATCHING UPCOMING STYLE */}
      <section className="past-expos-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">Future Exhibitions</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Upcoming <span>Opportunities</span></h2>
          </div>

          {loading ? (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
              <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
              <p style={{ marginTop: '20px', color: '#666' }}>Loading upcoming exhibitions...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <>
              <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '30px', marginTop: '60px' }}>
                {expos.slice(0, pastVisibleCount).map(item => (
                  <motion.div
                    key={item._id} whileHover={{ y: -8 }}
                    className="modern-gallery-card expo-card"
                    style={{
                      background: '#fff',
                      borderRadius: '20px',
                      border: '1px solid #eee',
                      overflow: 'hidden',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s'
                    }}
                  >
                    {/* IMAGE AREA */}
                    <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                      <img src={getImageUrl(item.expoImage)} alt={item.expoName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      {/* TITLE & META PILLS ROW */}
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'rgb(17, 17, 17)', margin: 0 }}>
                          {item.expoName}
                        </h3>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ background: '#f3f4f6', padding: '5px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: '700', color: 'rgb(17, 17, 17)' }}>
                            <i className="far fa-calendar-alt" style={{ color: '#ED1C24' }}></i> {formatDate(item.startDate, item.endDate)}
                          </div>
                          <div style={{ background: '#f3f4f6', padding: '5px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: '700', color: 'rgb(17, 17, 17)' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.venue}
                          </div>
                        </div>
                      </div>

                      <p style={{ color: 'rgb(17, 17, 17)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '25px', opacity: 0.8 }}>
                        {item.products?.length > 0 
                          ? `Discover ${item.products.slice(0, 3).map(p => p.productName).join(', ')} and more at ${item.venue}.`
                          : `Join us at ${item.expoName} for a premier networking experience in ${item.venue}.`}
                      </p>

                      <div style={{ marginTop: 'auto' }}>
                        <button
                          onClick={() => openInterestedForm(item)}
                          style={{
                            width: '100%',
                            background: '#ED1C24',
                            color: '#fff',
                            border: 'none',
                            padding: '14px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: '0.3s',
                            boxShadow: '0 6px 15px rgba(237,28,36,0.2)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          Interested <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {expos.length > pastVisibleCount && (
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                  <button
                    onClick={handlePastLoadMore}
                    className="premium-load-btn"
                    style={{ padding: '12px 50px', borderRadius: '50px', background: '#fff', color: '#ED1C24', border: '2px solid #ED1C24', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', textTransform: 'uppercase', transition: '0.3s' }}
                    onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
                  >
                    View More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>



      {/* ENQUIRY FORM MODAL */}
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
                isSimplified={isSimplified}
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

export default PreviousExhibitions;
