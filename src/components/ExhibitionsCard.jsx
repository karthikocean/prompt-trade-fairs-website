import React, { useEffect, useState } from "react";

const StatsSection = () => {
  const [expoCount, setExpoCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  // Counter animation
  useEffect(() => {
    let expo = 0;
    let visitor = 0;

    const interval = setInterval(() => {
      let isExpoDone = false;
      let isVisitorDone = false;

      if (expo < 900000) {
        if (expo < 890000) {
          expo += 25000; // Counts up rapidly to 890K
          if (expo > 890000) expo = 890000;
        } else {
          expo += 1000; // Increments slowly and smoothly by 1K from 890K to 900K
        }
        setExpoCount(expo);
      } else {
        isExpoDone = true;
      }

      if (visitor < 50000) {
        visitor += 1100; // Counts up to 50000 in alignment with expo steps
        setVisitorCount(visitor);
      } else {
        isVisitorDone = true;
      }

      if (isExpoDone && isVisitorDone) {
        clearInterval(interval);
      }
    }, 30); // 30ms interval for clear, visible transitions in the UI

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num;
  };


  return (
    <section className="expo-card-section">
      <div className="container">
        {/* CENTERED HEADER */}
        <div className="premium-header-box centered">
          <div className="header-accent-row">
            <div className="header-accent-line"></div>
            <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>ABOUT US</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Connecting Business Growth</h2>
        </div>

        <div className="stats-container">
          {/* LEFT CONTENT */}
          <div className="stats-content-main">
            <p style={{ color: '#111', fontSize: '16px', lineHeight: '1.8', textAlign: 'justify', marginBottom: '20px' }}>
              PROMPT Trade Fairs is a trusted platform dedicated to connecting businesses with the right audience across India. With 25+ years of industry experience, we specialize in organizing impactful exhibitions that help brands grow, network, and expand their market presence.
            </p>
            <p style={{ color: '#111', fontSize: '16px', lineHeight: '1.8', textAlign: 'justify', marginBottom: '35px' }}>
              Our events bring together industry leaders, innovators, and professionals under one roof, creating opportunities for meaningful collaborations and business success.
            </p>

            {/* COUNTERS */}
            <div className="stats-box">
              <div className="stat-item">
                <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ED1C24', marginBottom: '5px' }}>{formatNumber(expoCount)}+</h3>
                <p style={{ color: '#111', fontWeight: '700', fontSize: '16px' }}>Exhibitions Organized</p>
              </div>

              <div className="stat-item">
                <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ED1C24', marginBottom: '5px' }}>{formatNumber(visitorCount)}+</h3>
                <p style={{ color: '#111', fontWeight: '700', fontSize: '16px' }}>Visitors Connected</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGES — NEW PREMIUM STYLE */}
          <div className="why-choose-image-box">
            <div className="accent-frame red"></div>
            <div className="accent-frame blue"></div>
            <img src="/promtbuilding.jpeg" alt="Exhibition Impact" className="main-image shadow-premium" />
            {/* <div className="experience-badge animate-bounce-slow"> */}
            {/* <span className="years">1200+</span> */}
            {/* <span className="text">Exhibitions <br /> Organized</span> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
