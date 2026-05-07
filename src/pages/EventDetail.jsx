import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const allEvents = [
  { 
    id: 1, 
    title: "Build Expo 2026 Highlights", 
    date: "15-May-2026", 
    location: "Chennai, India", 
    shortDesc: "South India's largest building materials and construction technology exhibition.", 
    longDesc: "Build Expo 2026 was a landmark event that showcased the latest trends in construction technology, green building materials, and modern interior design. With over 300 exhibitors and 20,000+ visitors, it set new benchmarks for the industry.",
    img: "/webbannerbuild.jpg", 
    type: 'photo',
    gallery: [
      { type: 'photo', src: '/expo1.jpg' },
      { type: 'photo', src: '/webbannerbuild.jpg' },
      { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { type: 'photo', src: '/webbannerg1.jpg' }
    ]
  },
  { 
    id: 2, 
    title: "Property Festival Highlights", 
    date: "16-May-2026", 
    location: "Madurai, India", 
    shortDesc: "Premium real estate networking event connecting builders and buyers.", 
    longDesc: "The Property Festival brought together premium real estate developers and potential home buyers. From luxury villas to affordable apartments, the event offered something for everyone, backed by on-site financial assistance from major banks.",
    img: "/webpropg1.jpg", 
    type: 'photo',
    gallery: [
      { type: 'photo', src: '/webpropg1.jpg' },
      { type: 'photo', src: '/expo1.jpg' }
    ]
  },
  {
    id: 101,
    title: "Grand Opening Ceremony 2024",
    date: "15-May-2024",
    location: "Virtual Event",
    shortDesc: "Cinematic highlights of the mega launch and industry keynote.",
    longDesc: "Experience the grand opening that launched India's most ambitious trade fair circuit. This video captures the keynote speeches, the ribbon-cutting ceremony, and the high-energy atmosphere that defined the event's start.",
    img: "/webbannerbuild.jpg",
    type: 'video',
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    gallery: [
      { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'photo', 'video'
  
  const event = allEvents.find(e => e.id.toString() === id);

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
    <main className="event-detail-v3" style={{ background: '#fff', paddingTop: '120px' }}>
      <div className="container">
        {/* HEADER BREADCRUMB / SMALL TITLE */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ color: '#ED1C24', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px' }}>{event.title}</p>
        </div>

        {/* HERO SECTION - SPLIT VIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center', marginBottom: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="detail-hero-media"
            style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
          >
            {event.type === 'video' ? (
              <div style={{ aspectRatio: '16/9', background: '#000' }}>
                <iframe width="100%" height="100%" src={event.url} frameBorder="0" allowFullScreen></iframe>
              </div>
            ) : (
              <img src={event.img} alt={event.title} style={{ width: '100%', display: 'block' }} />
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="detail-hero-content"
          >
            <span style={{ background: '#ED1C24', color: '#fff', padding: '6px 18px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              PHOTO HIGHLIGHTS
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111', margin: '20px 0', lineHeight: '1.1' }}>{event.title}</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}>
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Event Date</p>
                  <p style={{ fontWeight: '800', margin: 0, fontSize: '1.1rem' }}>{event.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Venue Location</p>
                  <p style={{ fontWeight: '800', margin: 0, fontSize: '1.1rem' }}>{event.location}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '15px' }}>About this Event</h4>
              <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1rem' }}>{event.longDesc}</p>
            </div>
          </motion.div>
        </div>

        {/* GALLERY SECTION (WITH FILTER BUTTONS) */}
        <section className="detail-gallery-section" style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>
              Event <span style={{ color: '#ED1C24' }}>Gallery</span>
            </h2>
            
            {/* NEW FILTER BUTTONS: PHOTOS & VIDEOS */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setActiveFilter('all')}
                style={{ 
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'all' ? 'none' : '1px solid #ddd', 
                  background: activeFilter === 'all' ? '#ED1C24' : '#fff', color: activeFilter === 'all' ? '#fff' : '#111', 
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s' 
                }}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('photo')}
                style={{ 
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'photo' ? 'none' : '1px solid #ddd', 
                  background: activeFilter === 'photo' ? '#ED1C24' : '#fff', color: activeFilter === 'photo' ? '#fff' : '#111', 
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s' 
                }}
              >
                Photos
              </button>
              <button 
                onClick={() => setActiveFilter('video')}
                style={{ 
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'video' ? 'none' : '1px solid #ddd', 
                  background: activeFilter === 'video' ? '#ED1C24' : '#fff', color: activeFilter === 'video' ? '#fff' : '#111', 
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s' 
                }}
              >
                Videos
              </button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            <AnimatePresence mode="popLayout">
              {filteredGallery?.map((item, idx) => (
                <motion.div 
                  key={`${item.src}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', background: '#f8f9fa' }}
                >
                  {item.type === 'video' ? (
                    <div style={{ aspectRatio: '16/9' }}>
                      <iframe width="100%" height="100%" src={item.src} frameBorder="0" allowFullScreen></iframe>
                    </div>
                  ) : (
                    <img src={item.src} alt="Gallery" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventDetail;
