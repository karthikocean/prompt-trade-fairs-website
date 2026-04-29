import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const PreviousExhibitions = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [pastVisibleCount, setPastVisibleCount] = useState(3);
  const [galleryVisibleCount, setGalleryVisibleCount] = useState(3);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const pastExpos = [
    {
      id: 1, title: "Property Festival 2025: Premium Venue", date: "JAN 12-14, 2025",
      location: "Coimbatore, India", shortDesc: "Record-breaking real estate networking.",
      longDesc: "Contrary to popular belief...", img: "/webbannerg1.jpg", status: "COMPLETED", type: 'photo'
    },
    {
      id: 2, title: "Grand Furniture Expo 2024: Chennai Edition", date: "NOV 05-07, 2024",
      location: "Chennai, India", shortDesc: "India's largest furniture trade gathering.",
      longDesc: "Detailed furniture highlights...", img: "/webpropg1.jpg", status: "SUCCESS", type: 'photo'
    },
    {
      id: 3, title: "Build Expo 2024: Industry Success Storey", date: "OCT 12-14, 2024",
      location: "Hyderabad, India", shortDesc: "Mega construction expo with 500+ exhibitors.",
      longDesc: "Detailed build expo summary...", img: "/webbannerbuild.jpg", status: "RECORD", type: 'photo'
    },
    { id: 4, title: "Smart Home & Automation Meet 2024", date: "SEP 20-22, 2024", location: "Bengaluru", shortDesc: "Smart tech event.", longDesc: "Smart home highlights...", img: "/webbannerg1.jpg", status: "COMPLETED", type: 'photo' },
    { id: 5, title: "Regional Business Meet 2024: Pondicherry", date: "AUG 15, 2024", location: "Pondicherry", shortDesc: "B2B local meetup.", longDesc: "Detailed regional summary...", img: "/team.png", status: "COMPLETED", type: 'photo' },
    { id: 6, title: "International Trade Fair: Logistics Edition", date: "JUL 12-14, 2024", location: "Mumbai", shortDesc: "Logistics industry gathering.", longDesc: "Logistics show highlights...", img: "/webbannerbuild.jpg", status: "SUCCESS", type: 'photo' }
  ];

  const galleryData = {
    photos: [
      { id: 101, title: "Inaugural Ceremony: Build Expo 2024", date: "2024", location: "Hyderabad", shortDesc: "Grand opening highlights.", longDesc: "Detailed opening summary...", img: "/webbannerbuild.jpg", type: 'photo' },
      { id: 102, title: "Exhibitor Interaction: Furniture Expo", date: "2024", location: "Chennai", shortDesc: "Business networking.", longDesc: "Detailed interaction summary...", img: "/webpropg1.jpg", type: 'photo' },
      { id: 103, title: "Property Festival: Home Finder Summit", date: "2024", location: "Coimbatore", shortDesc: "Real estate highlights.", longDesc: "Detailed festival summary...", img: "/webbannerg1.jpg", type: 'photo' },
      { id: 104, title: "Industry Leaders Gala 2024", date: "2024", location: "Madurai", shortDesc: "Networking night.", longDesc: "Gala highlights...", img: "/webbannerg1.jpg", type: 'photo' }
    ],
    videos: [
      { id: 201, title: "Mega Expo 2024: Official Aftermovie", date: "2024", location: "Coimbatore", shortDesc: "Cinematic highlights.", longDesc: "Watch the energy and success of the 2024 season...", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: 'video' }
    ]
  };

  const handlePastLoadMore = () => setPastVisibleCount(prev => prev + 3);
  const handleGalleryLoadMore = () => setGalleryVisibleCount(prev => prev + 3);

  const currentGalleryItems = activeTab === 'photos' ? galleryData.photos : galleryData.videos;

  return (
    <main className="previous-v3-main">
      {/* HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/expobanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Previous Exhibitions</span></div>
              <h1 className="v3-hero-title">Previous <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPOS GRID */}
      <section className="past-expos-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">SUCCESS JOURNEY</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">A Legacy of <span>Successful Expos</span></h2>
          </div>
          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px', marginTop: '60px' }}>
            {pastExpos.slice(0, pastVisibleCount).map(item => (
              <motion.div key={item.id} className="modern-gallery-card expo-card" onClick={() => setSelectedMedia(item)} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div className="modern-card-inner">
                  <div className="modern-card-img" style={{ height: '220px', position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                    <div className="status-badge" style={{ position: 'absolute', top: '15px', right: '15px', background: '#ED1C24', color: '#fff', padding: '6px 15px', fontSize: '12px', fontWeight: '800', borderRadius: '50px', zIndex: '5' }}>{item.status}</div>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="modern-card-content" style={{ padding: '20px 0 0', background: '#fff' }}>
                    <div className="modern-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ED1C24', fontWeight: '600', fontSize: '13.5px', marginBottom: '12px' }}>
                      <i className="far fa-calendar-alt"></i> {item.date}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '12px', textAlign: 'left' }}>{item.title}</h3>
                    <p style={{
                      color: '#555', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '15px', textAlign: 'left',
                      display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>{item.shortDesc}</p>
                    {item.location && (
                      <p style={{ color: '#777', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {pastVisibleCount < pastExpos.length && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button onClick={handlePastLoadMore} className="premium-load-btn">View More Past</button>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY INTERFACE */}
      <section className="past-gallery-v3" style={{ padding: '120px 0', background: '#fff' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <h2 className="header-main-title">Visual <span>Archives</span></h2>
          </div>
          <div className="gallery-tabs-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0' }}>
            <button className={`gallery-tab-btn ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => { setActiveTab('photos'); setGalleryVisibleCount(3); }} style={{ padding: '12px 35px', borderRadius: '50px', border: 'none', background: activeTab === 'photos' ? '#ED1C24' : '#f8f9fa', color: activeTab === 'photos' ? '#fff' : '#111', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fas fa-camera"></i> Photos</button>
            <button className={`gallery-tab-btn ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => { setActiveTab('videos'); setGalleryVisibleCount(3); }} style={{ padding: '12px 35px', borderRadius: '50px', border: 'none', background: activeTab === 'videos' ? '#ED1C24' : '#f8f9fa', color: activeTab === 'videos' ? '#fff' : '#111', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fas fa-play-circle"></i> Videos</button>
          </div>
          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
            {currentGalleryItems.slice(0, galleryVisibleCount).map(item => (
              <motion.div key={item.id} className="modern-gallery-card" onClick={() => setSelectedMedia(item)} 
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div className="modern-card-inner">
                  <div className="modern-card-img" style={{ height: '220px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}>
                    {item.type === 'photo' ? (
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <i className="fas fa-play-circle" style={{ fontSize: '3rem', color: '#ED1C24' }}></i>
                    )}
                  </div>
                  <div className="modern-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ED1C24', fontWeight: '600', fontSize: '13.5px', marginTop: '20px', marginBottom: '12px' }}>
                    <i className="far fa-calendar-alt"></i> Year: {item.date}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '12px', textAlign: 'left' }}>{item.title}</h3>
                  <p style={{
                    color: '#555', fontSize: '14.5px', lineHeight: '1.6', textAlign: 'left',
                    display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>{item.shortDesc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {galleryVisibleCount < currentGalleryItems.length && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button onClick={handleGalleryLoadMore} className="premium-load-btn">More Highlights</button>
            </div>
          )}
        </div>
      </section>

      {/* REFINED POPUP MODAL */}
      {/* 3. PREMIUM POPUP MODAL — MATCHING UPCOMING EXPO LAYOUT */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="media-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
          >
            <motion.div
              className="modal-premium-card"
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '900px', width: '95%', background: '#fff',
                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                maxHeight: '95vh', overflow: 'hidden',
                borderRadius: '12px', position: 'relative',
                display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr'
              }}
            >
              {/* ── CLOSE BUTTON ── */}
              <div
                onClick={() => setSelectedMedia(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 100, transition: 'background 0.2s'
                }}
              >
                <i className="fas fa-times" style={{ color: '#444', fontSize: '0.8rem' }}></i>
              </div>

              {/* ── LEFT: IMAGE/VIDEO PANEL ── */}
              <div className="modal-media-left" style={{ position: 'relative', minHeight: '520px', background: '#000', overflow: 'hidden' }}>
                {selectedMedia.type === 'photo' ? (
                  <img src={selectedMedia.img} alt="Expo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                ) : (
                  <iframe width="100%" height="100%" src={selectedMedia.url + "?autoplay=1"} frameBorder="0" allowFullScreen style={{ position: 'absolute', top: 0, left: 0 }}></iframe>
                )}
              </div>

              {/* ── RIGHT: CONTENT PANEL ── */}
              <div
                className="modal-meta-right"
                style={{
                  padding: '40px 40px',
                  display: 'flex', flexDirection: 'column', gap: '25px',
                  overflowY: 'auto', background: '#fff'
                }}
              >
                {/* Title block */}
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#ED1C24', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 7px' }}>
                    TRADE EVENT
                  </p>
                  <h2 style={{ color: '#111', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.25', letterSpacing: '-0.3px', margin: 0 }}>
                    {selectedMedia.title}
                  </h2>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: '#f0f0f0' }} />

                {/* Info rows with icon tiles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Date */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(237,28,36,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <i className="far fa-calendar-alt" style={{ color: '#ED1C24', fontSize: '0.95rem' }}></i>
                    </div>
                    <div style={{ paddingTop: '2px' }}>
                      <p style={{ fontSize: '11px', letterSpacing: '1.2px', color: '#999', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 4px' }}>Date</p>
                      <p style={{ color: '#111', fontSize: '15px', fontWeight: '700', margin: 0 }}>{selectedMedia.date}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(237,28,36,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', fontSize: '0.95rem' }}></i>
                    </div>
                    <div style={{ paddingTop: '2px' }}>
                      <p style={{ fontSize: '11px', letterSpacing: '1.2px', color: '#999', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 4px' }}>Location</p>
                      <p style={{ color: '#111', fontSize: '15px', fontWeight: '700', margin: 0 }}>{selectedMedia.location}</p>
                    </div>
                  </div>

                  {/* About Expo */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(237,28,36,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <i className="fas fa-info" style={{ color: '#ED1C24', fontSize: '0.95rem' }}></i>
                    </div>
                    <div style={{ paddingTop: '2px' }}>
                      <p style={{ fontSize: '11px', letterSpacing: '1.2px', color: '#999', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 4px' }}>About Expo</p>
                      <p style={{ color: '#444', fontSize: '15px', fontWeight: '500', lineHeight: '1.5', margin: 0 }}>{selectedMedia.shortDesc}</p>
                    </div>
                  </div>

                  {/* Extra descriptive text if needed */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginTop: '10px' }}>
                     <p style={{ color: '#555', fontSize: '14.5px', fontWeight: '400', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>{selectedMedia.longDesc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PreviousExhibitions;
