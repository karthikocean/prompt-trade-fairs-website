import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { getPastExposGrouped } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';
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

const LogoMarquee = ({ logos }) => {
  if (!logos || logos.length === 0) return null;
  const displayLogos = logos.length < 8
    ? [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]
    : [...logos, ...logos];

  return (
    <div className="brand-logo-scroller" style={{ overflow: 'hidden', padding: '20px 0', background: '#fff', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', margin: '20px 0 60px 0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
      <div className="marquee-track" style={{ display: 'flex', gap: '30px', width: 'max-content', animation: 'brandMarquee 25s linear infinite' }}>
        {displayLogos.map((logo, idx) => (
          <div key={idx} className="brand-logo-item" style={{ height: '70px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
            <img src={getImageUrl(logo.image)} alt={logo.companyName || 'client-logo'} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes brandMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const BrandCarousel = ({ expos, navigate }) => {
  const scrollRef = useRef(null);
  const showArrows = expos.length > 3;

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="carousel-arrow left shadow"
          style={{
            position: 'absolute',
            left: '-25px',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ED1C24',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#ED1C24'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ED1C24'; }}
        >
          <i className="fas fa-chevron-left" style={{ fontSize: '18px' }}></i>
        </button>
      )}

      <div
        className="custom-scroll-container"
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: showArrows ? 'hidden' : 'visible',
          scrollBehavior: 'smooth',
          width: '100%',
          padding: '10px 0'
        }}
      >
        {expos.map((expo) => (
          <div
            key={expo._id}
            className="expo-card"
            onClick={() => navigate(`/event/${expo._id}`)}
            style={{
              flex: '0 0 calc(33.333% - 14px)',
              borderRadius: '12px',
              background: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: '0.3s'
            }}
          >
            <div style={{ width: '100%', height: '380px', overflow: 'hidden', background: '#f8f9fa', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={getImageUrl((expo.gallery && expo.gallery.find(item => item.type === 'Image')?.url) || expo.expoImage)}
                alt={expo.expoName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              {/* <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111', lineHeight: '1.4', minHeight: '56px', display: 'flex', alignItems: 'flex-start', margin: '0 0 12px 0' }}>
                {expo.expoName}
              </h3> */}
              <div className='expo-content-mobile' style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: '700', fontSize: '14.5px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <i className="far fa-calendar-alt" style={{ color: '#ED1C24' }}></i>
                  <span>{formatDateRange(expo.startDate, expo.endDate)}</span>
                </span>
                <span style={{ color: '#ccc' }}>|</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i>
                  <span>{expo.venue}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showArrows && (
        <button
          onClick={scrollRight}
          className="carousel-arrow right shadow"
          style={{
            position: 'absolute',
            right: '-25px',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ED1C24',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#ED1C24'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ED1C24'; }}
        >
          <i className="fas fa-chevron-right" style={{ fontSize: '18px' }}></i>
        </button>
      )}
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const [groupedExpos, setGroupedExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleBrands, setVisibleBrands] = useState(3);

  useEffect(() => {
    const fetchGroupedPastExpos = async () => {
      try {
        const response = await getPastExposGrouped();
        if (response.data && response.data.data) {
          setGroupedExpos(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching past expos:", error);
        toast.error("Failed to load past exhibitions");
      } finally {
        setLoading(false);
      }
    };
    fetchGroupedPastExpos();
  }, []);

  return (
    <main className="events-v3-main">
      {/* 1. HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/aboutusbanner.png')" }}>
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

      {/* 2. GROUPED GALLERY SECTION */}
      <section className="events-gallery-v3" style={{ padding: '50px 0', background: '#f8f9fa' }}>
        <div className="container">
          {/* <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>
                VISUAL JOURNEY
              </span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title" style={{ fontSize: "2.5rem", fontWeight: "900" }}>Moments & Highlights</h2>
          </div> */}

          {loading ? (
            <div style={{ padding: '50px 0', textAlign: 'center' }}>
              <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
              <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibitions calendar...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : groupedExpos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '20px', marginTop: '40px' }}>
              <i className="fas fa-calendar-alt" style={{ fontSize: '3rem', color: '#eee', marginBottom: '20px' }}></i>
              <h3 style={{ fontWeight: '800', color: '#111' }}>No past events found.</h3>
            </div>
          ) : (
            <>
              {groupedExpos.slice(0, visibleBrands).map((group) => (
                <div key={group._id} className="brand-group-section" style={{ marginTop: '60px' }}>
                  {/* Brand Group Header */}
                  <div className="premium-header-box centered" style={{ marginBottom: '35px' }}>
                    <div className="header-accent-row">
                      <div className="header-accent-line"></div>
                      <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '12px' }}>
                        EXHIBITION CATEGORY
                      </span>
                      <div className="header-accent-line"></div>
                    </div>
                    <h3 className="header-main-title" style={{ fontSize: "1.75rem", fontWeight: "800", color: "#111" }}>
                      {group.name}
                    </h3>
                  </div>

                  {/* Horizontal Scroll / Carousel Grid */}
                  <BrandCarousel expos={group.expos} navigate={navigate} />

                  {/* Brand Logos Scrolling Marquee */}
                  <LogoMarquee logos={group.logos} />
                </div>
              ))}

              {groupedExpos.length > visibleBrands && (
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                  <button
                    onClick={() => setVisibleBrands(prev => prev + 3)}
                    className="premium-load-btn"
                    style={{ padding: '12px 50px', borderRadius: '50px', background: '#fff', color: '#ED1C24', border: '2px solid #ED1C24', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', textTransform: 'uppercase', transition: '0.3s' }}
                    onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
                  >
                    View More Categories
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .custom-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .custom-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 991px) {
          .expo-card {
            flex: 0 0 calc(50% - 10px) !important;
          }
        }
        @media (max-width: 768px) {
          .expo-card {
            flex: 0 0 85% !important;
          }
          .custom-scroll-container {
            overflow-x: auto !important;
          }
          .carousel-arrow {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Events;
