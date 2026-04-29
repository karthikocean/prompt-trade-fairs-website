import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Events = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const galleryData = {
    photos: [
      {
        id: 1,
        title: "Building The Future: Build Expo 2026 Highlights",
        date: "15-May-2026",
        location: "Chennai, India",
        shortDesc: "Major construction & furniture exhibition highlights.",
        longDesc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        img: "/webbannerbuild.jpg",
        type: 'photo'
      },
      {
        id: 2,
        title: "Property Festival: Connect with Buyers Across India",
        date: "16-May-2026",
        location: "Madurai, India",
        shortDesc: "Premium real estate networking event.",
        longDesc: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet...', comes from a line in section 1.10.32. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
        img: "/webpropg1.jpg",
        type: 'photo'
      },
      {
        id: 3,
        title: "Furniture & Home Products Expo: Design Trends",
        date: "17-May-2026",
        location: "Coimbatore, India",
        shortDesc: "Showcasing modern interiors & furniture.",
        longDesc: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
        img: "/webbannerg1.jpg",
        type: 'photo'
      },
      { id: 4, title: "Regional Business Meet: Chennai Edition", date: "18-May-2026", location: "Chennai", shortDesc: "B2B networking.", longDesc: "Detailed business networking summary...", img: "/team.png", type: 'photo' },
      { id: 5, title: "Industry Leaders Summit", date: "20-May-2026", location: "Bangalore", shortDesc: "Leadership gala.", longDesc: "Leadership summit highlights...", img: "/webbannerbuild.jpg", type: 'photo' },
      { id: 6, title: "Innovations in Interior Design Showcase", date: "25-May-2026", location: "Madurai", shortDesc: "Design trends.", longDesc: "Interior design showcase details...", img: "/webbannerg1.jpg", type: 'photo' }
    ],
    videos: [
      {
        id: 1,
        title: "Grand Opening Ceremony Highlights 2026",
        date: "15-May-2026",
        location: "Virtual Event",
        shortDesc: "Cinematic highlights of the mega launch.",
        longDesc: "Experience the grand opening ceremony of PROMPT Expo 2026. A cinematic journey through the inauguration, lighting of the lamp, and high-impact industry addresses that set the stage for India's biggest trade show.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: 'video'
      },
      { id: 2, title: "Exhibitor Experience", date: "16-May-2026", location: "On-site", shortDesc: "Exhibitor testimonials.", longDesc: "Interviews with leading builders and manufacturers...", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: 'video' }
    ]
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const currentItems = activeTab === 'photos' ? galleryData.photos : galleryData.videos;
  const showLoadMore = visibleCount < currentItems.length;

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
            <h2 className="header-main-title">Moments & <span>Highlights</span></h2>
          </div>

          <div className="gallery-tabs-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
            <button className={`gallery-tab-btn ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => handleTabChange('photos')} style={{ padding: '12px 30px', borderRadius: '50px', border: 'none', background: activeTab === 'photos' ? '#ED1C24' : '#fff', color: activeTab === 'photos' ? '#fff' : '#111', fontWeight: '700', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-camera"></i> Photos
            </button>
            <button className={`gallery-tab-btn ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => handleTabChange('videos')} style={{ padding: '12px 30px', borderRadius: '50px', border: 'none', background: activeTab === 'videos' ? '#ED1C24' : '#fff', color: activeTab === 'videos' ? '#fff' : '#111', fontWeight: '700', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-play-circle"></i> Videos
            </button>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
            {currentItems.slice(0, visibleCount).map((item) => (
              <motion.div
                key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="modern-gallery-card" onClick={() => setSelectedMedia(item)}
                style={{ cursor: 'pointer', background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
              >
                <div className="modern-card-inner">
                  <div className="modern-card-img" style={{ position: 'relative', overflow: 'hidden', height: '220px', borderRadius: '8px' }}>
                    {item.type === 'photo' ? (
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-play-circle" style={{ fontSize: '3rem', color: '#ED1C24' }}></i>
                      </div>
                    )}
                  </div>

                  <div className="modern-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ED1C24', fontWeight: '600', fontSize: '13.5px', marginTop: '20px', marginBottom: '12px' }}>
                    <i className="far fa-calendar-alt"></i> {item.date}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '12px', textAlign: 'left' }}>
                    {item.title}
                  </h3>

                  <p style={{ color: '#555', fontSize: '14.5px', lineHeight: '1.6', textAlign: 'left', margin: 0, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.shortDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {showLoadMore && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                onClick={handleLoadMore}
                className="premium-load-btn"
              >
                View More Events              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. REFINED POPUP MODAL (SCREENSHOT STYLE) */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="media-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
          >
            <div style={{ position: 'absolute', top: '20px', right: '20px', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}><i className="fas fa-times"></i></div>

            <motion.div
              className="modal-premium-card"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '900px', width: '100%', background: '#fff', borderRadius: '0', padding: '40px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto'
              }}
            >
              <h2 style={{ color: '#ED1C24', fontSize: '2.2rem', fontWeight: '900', textAlign: 'center', marginBottom: '40px' }}>{selectedMedia.title}</h2>

              <div className="modal-top-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', marginBottom: '40px' }}>
                <div className="modal-media-left" style={{ borderRadius: '10px', overflow: 'hidden', background: '#000', height: '320px' }}>
                  {selectedMedia.type === 'photo' ? (
                    <img src={selectedMedia.img} alt="Expo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <iframe width="100%" height="100%" src={selectedMedia.url + "?autoplay=1"} frameBorder="0" allowFullScreen></iframe>
                  )}
                </div>
                <div className="modal-meta-right" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p style={{ fontSize: '1.4rem' }}>
                    <strong style={{ color: '#ED1C24', fontWeight: '600' }}><i className="far fa-calendar-alt" style={{ marginRight: '10px' }}></i>date :</strong> <span style={{ fontWeight: '500', color: '#111' }}>{selectedMedia.date}</span>
                  </p>
                  <p style={{ fontSize: '1.4rem' }}>
                    <strong style={{ color: '#ED1C24', fontWeight: '600' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '10px' }}></i>location:</strong> <span style={{ fontWeight: '500', color: '#111' }}>{selectedMedia.location}</span>
                  </p>
                  <p style={{ fontSize: '1.4rem', lineHeight: '1.4' }}>
                    <strong style={{ color: '#ED1C24', fontWeight: '600' }}><i className="fas fa-info-circle" style={{ marginRight: '10px' }}></i>description:</strong> <span style={{ fontWeight: '500', color: '#111' }}>{selectedMedia.shortDesc}</span>
                  </p>
                </div>
              </div>

              <div className="modal-long-desc" style={{ marginTop: '40px' }}>
                <p style={{ fontSize: '1.4rem', color: '#333', lineHeight: '1.6', textAlign: 'justify' }}>
                  {selectedMedia.longDesc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Events;
