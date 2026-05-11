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
      id: 1, title: "Build Expo 2026: The Mega Construction Fair",
      manager: "Mr. Karthik Krishnan",
      duration: "May 15 - 17, 2026",
      timings: "10:00 AM - 07:00 PM",
      targetDate: "2026-05-15T09:00:00",
      bookingClosingDate: "May 01, 2026",
      status: "Available",
      availableStalls: 45,
      bookedStalls: 15,
      location: "Codissia, Coimbatore",
      shortDesc: "South India's largest building materials and construction technology exhibition.",
      longDesc: "South India's largest building materials and construction technology exhibition. Join industry leaders, architects, and builders for three days of networking and innovation.",
      img: "/expo1.jpg"
    },
    {
      id: 2, title: "Property Festival 2026: Real Estate Expo",
      manager: "Ms. Priya Sharma",
      duration: "May 22 - 24, 2026",
      timings: "09:30 AM - 06:30 PM",
      targetDate: "2026-05-22T09:00:00",
      bookingClosingDate: "May 10, 2026",
      status: "Blocked",
      availableStalls: 20,
      bookedStalls: 40,
      location: "CTC, Chennai",
      shortDesc: "India's top property developers connecting with homebuyers.",
      longDesc: "India's top property developers connecting with homebuyers. Discover premium properties and investment opportunities in the heart of Chennai.",
      img: "/webpropg1.jpg"
    },
    {
      id: 3, title: "Furniture & Home Decor Expo 2026",
      manager: "Mr. Suresh Kumar",
      duration: "June 05 - 07, 2026",
      timings: "10:00 AM - 08:00 PM",
      targetDate: "2026-06-05T09:00:00",
      bookingClosingDate: "May 25, 2026",
      status: "Booked",
      availableStalls: 0,
      bookedStalls: 60,
      location: "KTPO, Bengaluru",
      shortDesc: "Showcasing modern interiors, modular kitchens, and decor.",
      longDesc: "Showcasing modern interiors, modular kitchens, and decor. A must-visit event for homeowners and interior designers looking for the latest trends.",
      img: "/webbannerg1.jpg"
    },
    {
      id: 4, title: "Architecture & Design Summit 2026",
      manager: "Mr. Ramesh Babu",
      duration: "June 12 - 14, 2026",
      timings: "10:00 AM - 07:00 PM",
      targetDate: "2026-06-12T00:00:00",
      bookingClosingDate: "June 01, 2026",
      status: "Available",
      availableStalls: 35,
      bookedStalls: 25,
      location: "Hitex, Hyderabad",
      shortDesc: "Design trends and architectural marvels summit.",
      longDesc: "Exploring design trends and architectural marvels. This summit brings together the best minds in architecture and design from across the country.",
      img: "/webbannerbuild.jpg"
    },
    {
      id: 5, title: "Smart Home & Automation Expo",
      manager: "Mr. Vijay Anand",
      duration: "June 20 - 21, 2026",
      timings: "09:00 AM - 06:00 PM",
      targetDate: "2026-06-20T00:00:00",
      bookingClosingDate: "June 10, 2026",
      status: "Available",
      availableStalls: 50,
      bookedStalls: 10,
      location: "Manpho, Bengaluru",
      shortDesc: "Automation trends and smart living exhibition.",
      longDesc: "Experience the future of living with automation trends and smart home technologies. Discover how to make your home more efficient and connected.",
      img: "/webbannerg1.jpg"
    },
    {
      id: 6, title: "Mega Property Show: Luxury Edition",
      manager: "Mr. Sanjay Gupta",
      duration: "June 28 - 29, 2026",
      timings: "10:00 AM - 08:00 PM",
      targetDate: "2026-06-28T00:00:00",
      bookingClosingDate: "June 15, 2026",
      status: "Available",
      availableStalls: 15,
      bookedStalls: 45,
      location: "NESCO, Mumbai",
      shortDesc: "Luxury properties and premium investment options.",
      longDesc: "An exclusive showcase of luxury properties and premium investment options. Perfect for high-net-worth individuals and serious real estate investors.",
      img: "/webpropg1.jpg"
    }
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  const showLoadMore = upcomingData.length > visibleCount;

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
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Present Exhibitions</span></div>
              <h1 className="v3-hero-title">Present <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="upcoming-grid-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">Present Exhibitions</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Book Your Expo</h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '30px', marginTop: '60px' }}>
            {upcomingData.slice(0, visibleCount).map(item => (
              <motion.div
                key={item.id} whileHover={{ y: -8 }}
                className="modern-gallery-card expo-card"
                onClick={() => setSelectedExpo(item)}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
              >
                <div className="modern-card-inner">
                  <div className="expo-img" style={{ height: '260px', overflow: 'hidden', borderRadius: '12px' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 0 0' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', color: 'rgb(17, 17, 17)', fontWeight: '700', fontSize: '13px', marginBottom: '15px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fas fa-user-tie" style={{ color: '#ED1C24' }}></i> {item.manager}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="far fa-calendar-alt" style={{ color: '#ED1C24' }}></i> {item.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.location}</span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', lineHeight: '1.3', marginBottom: '0' }}>
                      {item.title}
                    </h3>
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
                View More
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
                maxWidth: '850px', width: '100%', background: '#fff',
                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                maxHeight: '98vh', overflowY: 'auto',
                borderRadius: '16px', position: 'relative',
                display: 'flex', flexDirection: 'column', overflow: 'hidden'
              }}
            >
              {/* COMPACT RED HEADER */}
              <div style={{ background: '#ED1C24', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {selectedExpo.title}
                </h2>
                <div
                  onClick={() => setSelectedExpo(null)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <i className="fas fa-times" style={{ color: '#fff', fontSize: '14px' }}></i>
                </div>
              </div>

              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* MIDDLE ROW: IMAGE & DETAILS */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '25px', alignItems: 'center' }}>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', height: '180px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
                    <img src={selectedExpo.img} alt="Expo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div className="modal-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="fas fa-user-tie" style={{ fontSize: '14px' }}></i></div>
                      <div><p style={{ fontSize: '10px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Manager</p><p style={{ fontWeight: '800', margin: 0, fontSize: '0.9rem' }}>{selectedExpo.manager}</p></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="fas fa-map-marker-alt" style={{ fontSize: '14px' }}></i></div>
                      <div><p style={{ fontSize: '10px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Location</p><p style={{ fontWeight: '800', margin: 0, fontSize: '0.9rem' }}>{selectedExpo.location}</p></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="fas fa-calendar-check" style={{ fontSize: '14px' }}></i></div>
                      <div><p style={{ fontSize: '10px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Duration</p><p style={{ fontWeight: '800', margin: 0, fontSize: '0.9rem' }}>{selectedExpo.duration}</p></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="fas fa-clock" style={{ fontSize: '14px' }}></i></div>
                      <div><p style={{ fontSize: '10px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Timings</p><p style={{ fontWeight: '800', margin: 0, fontSize: '0.9rem' }}>{selectedExpo.timings}</p></div>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION & AVAILABILITY SECTION */}
                <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <p style={{ color: '#555', fontSize: '13.5px', lineHeight: '1.6', margin: 0, textAlign: 'center' }}>{selectedExpo.longDesc}</p>

                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#999', margin: '0 0 3px', textTransform: 'uppercase', fontWeight: '800' }}>Available Stalls:</p>
                      <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#10b981', margin: 0 }}>{selectedExpo.availableStalls}</p>
                    </div>
                    <div style={{ width: '1px', height: '30px', background: '#ddd' }}></div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#999', margin: '0 0 3px', textTransform: 'uppercase', fontWeight: '800' }}>Booked Stalls:</p>
                      <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ED1C24', margin: 0 }}>{selectedExpo.bookedStalls}</p>
                    </div>
                  </div>
                </div>

                {/* BUTTONS AT BOTTOM */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '12px' }}>
                  <button style={{ padding: '12px', background: '#f4f6f9', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1a2b4a', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                    <i className="fas fa-download"></i> Layout
                  </button>
                  <button style={{ padding: '12px', background: '#f4f6f9', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1a2b4a', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                    <i className="fas fa-download"></i> Brochure
                  </button>
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    style={{ padding: '12px', background: '#ED1C24', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '800', fontSize: '13px', cursor: 'pointer', boxShadow: '0 6px 15px rgba(237,28,36,0.2)', textTransform: 'uppercase' }}
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