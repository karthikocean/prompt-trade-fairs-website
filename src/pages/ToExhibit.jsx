import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ResigterForm from '../components/ResigterForm';

const ToExhibit = () => {
  const benefits = [
    { title: "Direct Sales", desc: "Interact face-to-face with buyers and close deals on the floor.", icon: "fa-shopping-cart" },
    { title: "Brand Exposure", desc: "Showcase your products to thousands of industry-specific visitors.", icon: "fa-bullhorn" },
    { title: "Lead Generation", desc: "Build a high-quality database of qualified leads for long-term growth.", icon: "fa-users" }
  ];

  const coverageItems = [
    { title: "Premium Stalls", desc: "Customizable shell scheme and raw space options with world-class design standards.", icon: "fa-store" },
    { title: "Omnichannel Marketing", desc: "Extensive promotion via Newspaper, Radio, Social Media, and Outdoor Hoardings.", icon: "fa-ad" },
    { title: "Targeted Audience", desc: "Direct access to pre-qualified B2B and B2C buyers from relevant industries.", icon: "fa-user-check" },
    { title: "Full Infrastructure", desc: "Continuous power supply, premium furniture packages, and technical assistance.", icon: "fa-plug" },
    { title: "Networking Hub", desc: "Exclusive exhibitor lounges and VIP matchmaking sessions for high-value deals.", icon: "fa-handshake" },
    { title: "Digital Visibility", desc: "Brand placement on our official website and event app reaching 1M+ users.", icon: "fa-globe" }
  ];

  return (
    <main className="to-exhibit-v3-main">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/site-banner.png')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">To Exhibit</span>
              </div>
              <h1 className="v3-hero-title">Elevate Your <span>Brand Authority</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. EXHIBITOR BENEFITS SECTION */}
      <section
        className="v3-initiatives-section"
        style={{ background: '#fff', padding: '50px 0' }}
      >
        <div className="container">

          <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>

              <span className="header-accent-tag">
                EXHIBITOR BENEFITS
              </span>

              <div className="header-accent-line"></div>
            </div>

            <h2 className="header-main-title">
              Maximize Your <span>Business Potential</span>
            </h2>
          </div>

          <div
            className="v3-initiatives-grid"
            style={{
              marginTop: '30px',
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '15px'
            }}
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                className="v3-initiative-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="v3-card-border"></div>
                <div className="v3-card-content" style={{
                  position: 'relative',
                  minHeight: '200px',
                  height: '200px',
                  margin: '0 auto',
                  padding: '15px 20px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <div className="card-top" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="card-icon" style={{ color: '#ED1C24', fontSize: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                  </div>
                  <div className="card-line" style={{ height: '2px', background: '#ED1C24', width: '30px', margin: '10px auto' }}></div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{item.desc}</p>
                </div>
                <span className="v3-card-bottom-text" style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#fff',
                  padding: '0 14px',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  marginBottom: '5px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  color: '#111'
                }}>
                  {item.num}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. NEW: EXHIBITION COVERAGE & ADVANTAGES SECTION */}
      <section className="coverage-v3-section" style={{ background: '#f8f9fa', padding: '120px 0' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span className="header-accent-tag">EXHIBITION COVERAGE</span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title" style={{ textAlign: 'center' }}>What's Covered in Your <span>Exhibition Plot?</span></h2>
            <p style={{ maxWidth: '800px', margin: '25px auto 0', color: '#666', fontSize: '16px', lineHeight: '1.8', textAlign: 'center' }}>
              We provide a comprehensive ecosystem designed for high-impact brand success.
              From infrastructure to international marketing, everything is managed by our expert team.
            </p>
          </div>

          <div className="coverage-grid" style={{ marginTop: '70px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
            {coverageItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="coverage-card-v3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div className="cov-icon-box" style={{ width: '60px', height: '60px', background: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111' }}>{item.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGISTRATION FORM SECTION */}
      <ResigterForm />
      <style>{`
        .v3-initiative-card .v3-card-bottom-text {
          background: #fff !important;
          color: #111 !important;
          opacity: 1 !important;
          visibility: visible !important;
          transition: all 0.3s ease;
        }
        .v3-initiative-card:hover .v3-card-bottom-text {
          background: #ED1C24 !important;
          color: #fff !important;
        }
      `}</style>
    </main>
  );
};
export default ToExhibit;
