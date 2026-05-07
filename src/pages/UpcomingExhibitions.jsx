import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import CountdownTimer from '../components/CountdownTimer';

const UpcomingExhibitions = () => {
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const upcomingData = [
    {
      id: 1, title: "Build Expo 2026: The Mega Construction Fair", date: "15, 16, 17 May 2026",
      targetDate: "2026-05-15T09:00:00",
      bookingClosingDate: "May 01, 2026",
      status: "Available",
      stallPrice: "₹15,000 / sq.m",
      location: "Codissia, Coimbatore", shortDesc: "The biggest construction and interior expo.",
      longDesc: "Detailed construction expo highlights...", img: "/expo1.jpg"
    },
    {
      id: 2, title: "Property Festival 2026: Real Estate Expo", date: "22, 23, 24 May 2026",
      targetDate: "2026-05-22T09:00:00",
      bookingClosingDate: "May 10, 2026",
      status: "Blocked",
      stallPrice: "₹20,000 / sq.m",
      location: "CTC, Chennai", shortDesc: "India's top property developers.",
      longDesc: "Detailed real estate festival highlights...", img: "/webpropg1.jpg"
    },
    {
      id: 3, title: "Furniture & Home Decor Expo 2026", date: "05, 06, 07 June 2026",
      targetDate: "2026-06-05T09:00:00",
      bookingClosingDate: "May 25, 2026",
      status: "Booked",
      stallPrice: "₹12,000 / sq.m",
      location: "KTPO, Bengaluru", shortDesc: "Modern home innovations.",
      longDesc: "Detailed home decor highlights...", img: "/webbannerg1.jpg"
    },
    { 
      id: 4, title: "Architecture & Design Summit 2026", date: "12, 13, 14 June 2026", 
      targetDate: "2026-06-12T00:00:00", bookingClosingDate: "June 01, 2026", status: "Available", 
      stallPrice: "₹18,000 / sq.m", location: "Hyderabad", shortDesc: "Design trends and architectural marvels.", 
      longDesc: "Summit highlights...", img: "/webbannerbuild.jpg" 
    },
    { 
      id: 5, title: "Smart Home & Automation Expo", date: "20, 21 June 2026", 
      targetDate: "2026-06-20T00:00:00", bookingClosingDate: "June 10, 2026", status: "Available", 
      stallPrice: "₹15,000 / sq.m", location: "Bengaluru", shortDesc: "Automation trends and smart living.", 
      longDesc: "Automation expo highlights...", img: "/webbannerg1.jpg" 
    },
    { 
      id: 6, title: "Mega Property Show: Luxury Edition", date: "28, 29 June 2026", 
      targetDate: "2026-06-28T00:00:00", bookingClosingDate: "June 15, 2026", status: "Available", 
      stallPrice: "₹25,000 / sq.m", location: "Mumbai", shortDesc: "Luxury properties and premium investments.", 
      longDesc: "Luxury show highlights...", img: "/webpropg1.jpg" 
    }
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  const showLoadMore = visibleCount < upcomingData.length;

  const statusColor = (status) => {
    if (status === 'Available') return '#10b981';
    if (status === 'Blocked') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <main className="upcoming-v3-main">
      <section className="about-v3-hero" style={{ backgroundImage: "url('/expobanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Upcoming Exhibitions</span></div>
              <h1 className="v3-hero-title">Upcoming <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="upcoming-grid-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">FUTURE EVENTS</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Book Your Calendar</h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '30px', marginTop: '60px' }}>
            {upcomingData.slice(0, visibleCount).map(item => (
              <motion.div
                key={item.id} whileHover={{ y: -8 }}
                className="modern-gallery-card expo-card"
                onClick={() => setSelectedExpo(item)}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  position: 'absolute', top: '35px', right: '35px', zIndex: 10,
                  background: statusColor(item.status),
                  color: '#fff', padding: '6px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase'
                }}>
                  {item.status}
                </div>

                <div className="modern-card-inner">
                  <div className="expo-img" style={{ height: '260px', overflow: 'hidden', borderRadius: '12px' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 0 0' }}>
                    <div className="expo-meta" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ED1C24', fontWeight: '700', fontSize: '14px', marginBottom: '15px' }}>
                      <i className="far fa-calendar-alt"></i> {item.date}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', lineHeight: '1.3', marginBottom: '15px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                      {item.shortDesc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
                       <span style={{ color: '#777', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.location}
                      </span>
                      <span style={{ fontSize: '12px', color: '#888', fontWeight: '600' }}>Closes: <span style={{ color: '#ED1C24' }}>{item.bookingClosingDate}</span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showLoadMore && (
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
              {/* PILL STYLE LOAD MORE BUTTON */}
              <button 
                onClick={handleLoadMore} 
                className="premium-load-btn" 
                style={{ 
                  padding: '12px 50px', 
                  borderRadius: '50px', 
                  background: '#fff', 
                  color: '#ED1C24', 
                  border: '2px solid #ED1C24', 
                  fontWeight: '800', 
                  fontSize: '1rem', 
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
              >
                View More Upcoming
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedExpo && (
          <motion.div
            className="media-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedExpo(null)}
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
                maxWidth: '950px', width: '100%', background: '#fff',
                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                maxHeight: '95vh', overflow: 'hidden',
                borderRadius: '16px', position: 'relative',
                display: 'grid', gridTemplateColumns: '1.1fr 1fr'
              }}
            >
              <div
                onClick={() => setSelectedExpo(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100 }}
              >
                <i className="fas fa-times" style={{ color: '#111' }}></i>
              </div>

              <div className="modal-media-left" style={{ position: 'relative', minHeight: '550px' }}>
                <img src={selectedExpo.img} alt="Expo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
              </div>

              <div className="modal-meta-right" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px', overflowY: 'auto' }}>
                <div>
                  <h2 style={{ color: '#111', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '10px' }}>{selectedExpo.title}</h2>
                  <div style={{ height: '3px', width: '50px', background: '#ED1C24' }}></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="far fa-calendar-alt"></i></div>
                    <div><p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase' }}>Date</p><p style={{ fontWeight: '700', margin: 0 }}>{selectedExpo.date}</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="fas fa-map-marker-alt"></i></div>
                    <div><p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase' }}>Location</p><p style={{ fontWeight: '700', margin: 0 }}>{selectedExpo.location}</p></div>
                  </div>
                </div>

                <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>
                   <p style={{ fontSize: '11px', color: '#999', margin: '0 0 10px', textTransform: 'uppercase', fontWeight: '800' }}>Starts In</p>
                   <CountdownTimer targetDate={selectedExpo.targetDate} />
                </div>

                {/* TRIPLE BUTTON INTERFACE */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '10px' }}>
                  <button style={{ padding: '15px', background: '#f4f6f9', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1a2b4a', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                    <i className="fas fa-th-large"></i> Layout
                  </button>
                  <button style={{ padding: '15px', background: '#f4f6f9', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1a2b4a', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                    <i className="fas fa-file-pdf"></i> Brochure
                  </button>
                  <button 
                    onClick={() => setIsEnquiryModalOpen(true)}
                    style={{ padding: '15px', background: '#ED1C24', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(237,28,36,0.2)' }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEnquiryModalOpen && (
          <motion.div
            className="media-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsEnquiryModalOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '650px', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
            >
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={selectedExpo}
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

export default UpcomingExhibitions;