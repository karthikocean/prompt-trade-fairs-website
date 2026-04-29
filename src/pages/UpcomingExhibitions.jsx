import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

import CountdownTimer from '../components/CountdownTimer';
import { FiStar, FiMessageSquare, FiInfo, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';


const UpcomingExhibitions = () => {
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const upcomingData = [
    {
      id: 1, title: "Build Expo 2026: The Mega Construction Fair", date: "15, 16, 17 May 2026",
      targetDate: "2026-05-15T09:00:00",
      bookingClosingDate: "May 01, 2026",
      status: "Available",
      stallPrice: "₹15,000 / sq.m",
      location: "Codissia, Coimbatore", shortDesc: "The biggest construction and interior expo.",
      longDesc: "Detailed construction expo highlights...", img: "/expo1.jpg",
      reviews: [
        { id: 1, user: "Exhibitor A", rating: 5, comment: "Great organization and visitor quality!" },
        { id: 2, user: "Visitor B", rating: 4, comment: "Massive scale, very impressive." }
      ]
    },
    {
      id: 2, title: "Property Festival 2026: Real Estate Expo", date: "22, 23, 24 May 2026",
      targetDate: "2026-05-22T09:00:00",
      bookingClosingDate: "May 10, 2026",
      status: "Blocked",
      stallPrice: "₹20,000 / sq.m",
      location: "CTC, Chennai", shortDesc: "India's top property developers.",
      longDesc: "Detailed real estate festival highlights...", img: "/webpropg1.jpg",
      reviews: []
    },
    {
      id: 3, title: "Furniture & Home Decor Expo 2026", date: "05, 06, 07 June 2026",
      targetDate: "2026-06-05T09:00:00",
      bookingClosingDate: "May 25, 2026",
      status: "Booked",
      stallPrice: "₹12,000 / sq.m",
      location: "KTPO, Bengaluru", shortDesc: "Modern home innovations.",
      longDesc: "Detailed home decor highlights...", img: "/webbannerg1.jpg",
      reviews: []
    },
    { id: 4, title: "Architecture & Design Summit 2026", date: "12, 13, 14 June 2026", targetDate: "2026-06-12T00:00:00", bookingClosingDate: "June 01, 2026", status: "Available", stallPrice: "₹18,000 / sq.m", location: "Hyderabad", shortDesc: "Design trends.", longDesc: "Summit highlights...", img: "/webbannerbuild.jpg", reviews: [] },
    { id: 5, title: "Smart Home & Automation Expo", date: "20, 21 June 2026", targetDate: "2026-06-20T00:00:00", bookingClosingDate: "June 10, 2026", status: "Available", stallPrice: "₹15,000 / sq.m", location: "Bengaluru", shortDesc: "Automation trends.", longDesc: "Automation expo highlights...", img: "/webbannerg1.jpg", reviews: [] },
    { id: 6, title: "Mega Property Show: Luxury Edition", date: "28, 29 June 2026", targetDate: "2026-06-28T00:00:00", bookingClosingDate: "June 15, 2026", status: "Available", stallPrice: "₹25,000 / sq.m", location: "Mumbai", shortDesc: "Luxury properties.", longDesc: "Luxury show highlights...", img: "/webpropg1.jpg", reviews: [] }
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const showLoadMore = visibleCount < upcomingData.length;

  const statusColor = (status) => {
    if (status === 'Available') return '#10b981';
    if (status === 'Blocked') return '#f59e0b';
    return '#ef4444';
  };

  const statusBg = (status) => {
    if (status === 'Available') return 'rgba(16,185,129,0.08)';
    if (status === 'Blocked') return 'rgba(245,158,11,0.08)';
    return 'rgba(239,68,68,0.08)';
  };

  const statusBorder = (status) => {
    if (status === 'Available') return 'rgba(16,185,129,0.3)';
    if (status === 'Blocked') return 'rgba(245,158,11,0.3)';
    return 'rgba(239,68,68,0.3)';
  };

  return (
    <main className="upcoming-v3-main">

      {/* 1. HERO SECTION — unchanged */}
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

      {/* 2. GRID SECTION — unchanged */}
      <section className="upcoming-grid-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">FUTURE EVENTS</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Book Your <span>Calendar</span></h2>
            <p style={{ color: '#666', marginTop: '-10px' }}>Exhibitors can view live booking status and closing dates.</p>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '40px', marginTop: '60px' }}>
            {upcomingData.slice(0, visibleCount).map(item => (
              <motion.div
                key={item.id} whileHover={{ y: -5 }}
                className="modern-gallery-card expo-card"
                onClick={() => setSelectedExpo(item)}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', cursor: 'pointer', position: 'relative' }}
              >
                <div style={{
                  position: 'absolute', top: '35px', right: '35px', zIndex: 10,
                  background: statusColor(item.status),
                  color: '#fff', padding: '5px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase'
                }}>
                  {item.status}
                </div>

                <div className="modern-card-inner">
                  <div className="expo-img" style={{ height: '220px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="expo-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ED1C24', fontWeight: '600', fontSize: '13.5px', marginTop: '20px', marginBottom: '12px' }}>
                    <i className="far fa-calendar-alt"></i> {item.date}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '12px', textAlign: 'left' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '14.5px', lineHeight: '1.6', textAlign: 'left', marginBottom: '15px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.shortDesc}
                  </p>
                  <p style={{ color: '#777', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'capitalize' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.location}
                  </p>
                  <div style={{ marginTop: '15px', padding: '10px 0', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>Booking Closes: <span style={{ color: '#ED1C24', fontWeight: '700' }}>{item.bookingClosingDate}</span></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showLoadMore && (
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
              <button onClick={handleLoadMore} className="premium-load-btn">
                View More Upcoming
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. PREMIUM POPUP MODAL — improved design */}
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
                maxWidth: '900px', width: '95%', background: '#fff',
                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                maxHeight: '95vh', overflow: 'hidden',
                borderRadius: '12px', position: 'relative',
                display: 'grid', gridTemplateColumns: '1fr 1fr'
              }}
            >

              {/* ── CLOSE BUTTON ── */}
              <div
                onClick={() => setSelectedExpo(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 100, transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.25)'}
              >
                <i className="fas fa-times" style={{ color: '#fff', fontSize: '0.8rem' }}></i>
              </div>

              {/* ── LEFT: IMAGE PANEL ── */}
              <div className="modal-media-left" style={{ position: 'relative', minHeight: '520px', overflow: 'hidden' }}>
                <img
                  src={selectedExpo.img} alt="Expo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)'
                }} />

                {/* Removed bottom info from image as requested */}
              </div>

              {/* ── RIGHT: CONTENT PANEL ── */}
              <div
                className="modal-meta-right"
                style={{
                  padding: '36px 32px 32px',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  overflowY: 'auto', background: '#fff'
                }}
              >

                {/* Title block */}
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#ED1C24', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 7px' }}>
                    Construction &amp; Interior
                  </p>
                  <h2 style={{ color: '#111', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.25', letterSpacing: '-0.3px', margin: 0 }}>
                    {selectedExpo.title}
                  </h2>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: '#f0f0f0' }} />

                {/* Info rows with icon tiles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  {/* Date */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(237,28,36,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <i className="far fa-calendar-alt" style={{ color: '#ED1C24', fontSize: '0.85rem' }}></i>
                    </div>
                    <div style={{ paddingTop: '1px' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#aaa', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 2px' }}>Date</p>
                      <p style={{ color: '#111', fontSize: '14px', fontWeight: '600', margin: 0 }}>{selectedExpo.date}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(237,28,36,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', fontSize: '0.85rem' }}></i>
                    </div>
                    <div style={{ paddingTop: '1px' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#aaa', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 2px' }}>Location</p>
                      <p style={{ color: '#111', fontSize: '14px', fontWeight: '600', margin: 0 }}>{selectedExpo.location}</p>
                    </div>
                  </div>

                  {/* About */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(237,28,36,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <i className="fas fa-info-circle" style={{ color: '#ED1C24', fontSize: '0.85rem' }}></i>
                    </div>
                    <div style={{ paddingTop: '1px' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#aaa', textTransform: 'uppercase', fontWeight: '700', margin: '0 0 2px' }}>About Expo</p>
                      <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{selectedExpo.shortDesc}</p>
                    </div>
                  </div>

                </div>

                {/* Price Card — Premium Redesign */}
                <div style={{
                  background: 'linear-gradient(135deg, #fff 0%, #fffefe 100%)',
                  border: '1px solid rgba(237,28,36,0.08)',
                  borderRadius: '12px', padding: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#999', textTransform: 'uppercase', fontWeight: '800', margin: '0 0 6px' }}>Stall Price</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ED1C24', margin: 0, letterSpacing: '-0.5px' }}>{selectedExpo.stallPrice.split(' ')[0]}</p>
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>/ sq.m</span>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end'
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: statusBg(selectedExpo.status),
                      border: `1px solid ${statusBorder(selectedExpo.status)}`,
                      borderRadius: '50px', padding: '6px 14px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor(selectedExpo.status), display: 'inline-block', boxShadow: `0 0 8px ${statusColor(selectedExpo.status)}` }} />
                      <span style={{ fontSize: '11px', fontWeight: '800', color: statusColor(selectedExpo.status), textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {selectedExpo.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Countdown — Visual Improvement */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '20px',
                  padding: '18px 24px',
                  background: '#fcfcfc',
                  border: '1px dashed #e5e5e5',
                  borderRadius: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <i className="far fa-clock" style={{ color: '#ED1C24', fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                      Starts In:
                    </span>
                  </div>
                  <CountdownTimer targetDate={selectedExpo.targetDate} />
                </div>

                {/* Book CTA */}
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  style={{
                    padding: '18px',
                    background: '#ED1C24', color: '#fff', border: 'none',
                    fontWeight: '900', fontSize: '14px', letterSpacing: '2px',
                    cursor: 'pointer', borderRadius: '10px', textTransform: 'uppercase',
                    boxShadow: '0 10px 30px rgba(237,28,36,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'translateY(-3px)'; 
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(237,28,36,0.35)'; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(237,28,36,0.25)'; 
                  }}
                >
                  BOOK ENQUIRY <i className="fas fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. ENQUIRY FORM MODAL — unchanged */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <motion.div
            className="media-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsEnquiryModalOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.85)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)', overflow: 'hidden' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '600px', width: '100%', maxHeight: '95vh', overflow: 'hidden', borderRadius: '30px', position: 'relative', background: '#fff', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{ position: 'absolute', top: '20px', right: '20px', width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, transition: '0.3s' }}
                onClick={() => setIsEnquiryModalOpen(false)}
              >
                <i className="fas fa-times" style={{ color: '#111', fontSize: '1.1rem' }}></i>
              </div>

              <div className="modal-sticky-header" style={{ padding: '40px 40px 5px', background: '#fff' }}>
                <div className="expo-brief-info" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: '800', color: '#222' }}>
                    <i className="fas fa-calendar-alt" style={{ color: '#ED1C24', fontSize: '1.3rem' }}></i> <span>{selectedExpo.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: '800', color: '#222' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', fontSize: '1.3rem' }}></i> <span>{selectedExpo.location}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '20px 40px 40px', overflowY: 'auto', flex: 1, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <EnquiryForm
                  isExpoRegistration={false}
                  title=""
                  expoInfo={selectedExpo}
                  customClass="home-register-form"
                  isSimplified={false}
                  buttonText="SUBMIT"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default UpcomingExhibitions;