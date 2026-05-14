import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { getPastExpos } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';
import toast from 'react-hot-toast';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Events = () => {
  const navigate = useNavigate();
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setVisibleCount(3);
    }
  }, []);

  useEffect(() => {
    const fetchPastExpos = async () => {
      try {
        const response = await getPastExpos();
        if (response.data && response.data.data) {
          setExpos(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching past expos:", error);
        toast.error("Failed to load past exhibitions");
      } finally {
        setLoading(false);
      }
    };
    fetchPastExpos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const showLoadMore = expos.length > visibleCount;

  if (loading) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading event highlights...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main className="events-v3-main">
      {/* 1. HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/eventbanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">Events</span>
              </div>
              <h1 className="v3-hero-title">Our Calendar of <span>Major Events</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. GALLERY SECTION */}
      <section className="events-gallery-v3" style={{ padding: '100px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">VISUAL JOURNEY</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Moments & Highlights</h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px', marginTop: '40px' }}>
            <AnimatePresence mode="popLayout">
              {expos.slice(0, visibleCount).map((item) => (
                <motion.div
                  layout
                  key={item._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="modern-gallery-card" onClick={() => navigate(`/event/${item._id}`)}
                  style={{ cursor: 'pointer', background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', transition: '0.3s' }}
                  whileHover={{ y: -10 }}
                >
                  <div className="modern-card-inner">
                    <div className="modern-card-img" style={{ position: 'relative', overflow: 'hidden', height: '220px', borderRadius: '10px' }}>
                      <img src={getImageUrl(item.expoImage)} alt={item.expoName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className="modern-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ED1C24', fontWeight: '700', fontSize: '13px', marginTop: '20px', marginBottom: '10px' }}>
                      <i className="far fa-calendar-alt"></i> {formatDate(item.startDate)}
                    </div>

                    <h3 className="modern-card-title" style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111', lineHeight: '1.4', marginBottom: '10px' }}>
                      {item.expoName}
                    </h3>

                    <p className="modern-card-desc" style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      Experience the highlights of {item.expoName} held at {item.venue}. A premier networking event featuring industry leaders.
                    </p>

                    <div className="modern-card-link" style={{ marginTop: '20px', color: '#ED1C24', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      View Highlights <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {showLoadMore && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                onClick={handleLoadMore}
                className="premium-load-btn"
              >
                View More Events
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;
