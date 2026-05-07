import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Events = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const allEvents = [
    { id: 1, title: "Build Expo 2024 Highlights", date: "15-May-2024", location: "Chennai, India", shortDesc: "South India's largest building materials and construction technology exhibition.", img: "/webbannerbuild.jpg", type: 'photo' },
    { id: 2, title: "Property Festival Highlights", date: "16-May-2024", location: "Madurai, India", shortDesc: "Premium real estate networking event connecting builders and buyers.", img: "/webpropg1.jpg", type: 'photo' },
    { id: 3, title: "Furniture & Home Products Expo", date: "17-May-2024", location: "Coimbatore, India", shortDesc: "Showcasing modern interiors, modular kitchens, and premium furniture.", img: "/webbannerg1.jpg", type: 'photo' },
    { id: 4, title: "Regional Business Meet 2024", date: "18-May-2024", location: "Chennai", shortDesc: "Focused B2B networking for small and medium enterprises.", img: "/team.png", type: 'photo' },
    { id: 101, title: "Grand Opening Ceremony 2024", date: "15-May-2024", location: "Virtual Event", shortDesc: "Cinematic highlights of the mega launch and industry keynote.", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: 'video', img: "/webbannerbuild.jpg" },
    { id: 5, title: "Industry Leaders Summit", date: "20-May-2024", location: "Bangalore", shortDesc: "Executive gala featuring leadership talks and strategic insights.", img: "/webbannerbuild.jpg", type: 'photo' }
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const showLoadMore = visibleCount < allEvents.length;

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

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

      {/* 2. GALLERY SECTION (UNIFIED VIEW - NO FILTERS) */}
      <section className="events-gallery-v3" style={{ padding: '100px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">VISUAL JOURNEY</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Moments & Highlights</h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px', marginTop: '40px' }}>
            <AnimatePresence mode="popLayout">
              {allEvents.slice(0, visibleCount).map((item) => (
                <motion.div
                  layout
                  key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="modern-gallery-card" onClick={() => handleCardClick(item.id)}
                  style={{ cursor: 'pointer', background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', transition: '0.3s' }}
                  whileHover={{ y: -10 }}
                >
                  <div className="modern-card-inner">
                    <div className="modern-card-img" style={{ position: 'relative', overflow: 'hidden', height: '220px', borderRadius: '10px' }}>
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {item.type === 'video' && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                           <i className="fas fa-play-circle" style={{ fontSize: '3.5rem', color: '#fff', opacity: '0.9' }}></i>
                        </div>
                      )}
                    </div>

                    <div className="modern-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ED1C24', fontWeight: '700', fontSize: '13px', marginTop: '20px', marginBottom: '10px' }}>
                      <i className="far fa-calendar-alt"></i> {item.date}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111', lineHeight: '1.4', marginBottom: '10px' }}>
                      {item.title}
                    </h3>

                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.shortDesc}
                    </p>
                    
                    <div style={{ marginTop: '20px', color: '#ED1C24', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      View Details <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
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
                style={{ padding: '12px 50px', borderRadius: '50px', background: '#fff', color: '#ED1C24', border: '2px solid #ED1C24', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', textTransform: 'uppercase' }}
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
