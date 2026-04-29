import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ResigterForm from '../components/ResigterForm';

const ToExhibit = () => {
  const benefits = [
    { title: "Direct Sales", desc: "Interact face-to-face with buyers and close deals on the floor.", icon: "fa-shopping-cart", num: "01", status: "SALES" },
    { title: "Brand Exposure", desc: "Showcase your products to thousands of industry-specific visitors.", icon: "fa-bullhorn", num: "02", status: "VISIBILITY" },
    { title: "Lead Generation", desc: "Build a high-quality database of qualified leads for long-term growth.", icon: "fa-users", num: "03", status: "LEADS" }
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

      {/* 2. EXHIBITOR BENEFITS SECTION (SPICY RAT STYLE) - NO CHANGE REQUESTED */}
      <section className="v3-initiatives-section" style={{ background: '#fff', padding: '120px 0' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span className="header-accent-tag">EXHIBITOR BENEFITS</span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title">Maximize Your <span>Business Potential</span></h2>
          </div>

          <div className="v3-initiatives-grid" style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                className="v3-initiative-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="v3-card-border"></div>
                <div className="v3-card-content">
                  <div className="card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="card-icon" style={{ fontSize: '2rem', color: '#ED1C24' }}><i className={`fas ${item.icon}`}></i></div>
                    <span className="card-num" style={{ fontSize: '3rem', opacity: '0.1', fontWeight: '900' }}>{item.num}</span>
                  </div>
                  <div className="card-line" style={{ height: '2px', background: '#ED1C24', width: '40px', margin: '20px 0' }}></div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px', color: '#111' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
                <span className="v3-card-bottom-text" style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '10px', letterSpacing: '2px', fontWeight: '800', opacity: '0.3' }}>{item.status}</span>
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
            <h2 className="header-main-title">What's Covered in Your <span>Exhibition Plot?</span></h2>
            <p style={{ maxWidth: '800px', margin: '25px auto 0', color: '#666', fontSize: '1.1rem', lineHeight: '1.8' }}>
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
                  gap: '15px'
                }}
              >
                <div className="cov-icon-box" style={{ width: '60px', height: '60px', background: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111' }}>{item.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default ToExhibit;
