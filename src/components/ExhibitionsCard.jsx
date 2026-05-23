import React, { useEffect, useState } from "react";

const StatsSection = () => {
  const [expoCount, setExpoCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  // Counter animation
  useEffect(() => {
    let expo = 0;
    let visitor = 0;

    const interval = setInterval(() => {
      if (expo < 1200) {
        expo += 20;
        setExpoCount(expo);
      }

      if (visitor < 50000) {
        visitor += 500;
        setVisitorCount(visitor);
      }

      if (expo >= 1200 && visitor >= 50000) {
        clearInterval(interval);
      }
    }, 30);

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
            <span className="header-accent-tag">ABOUT US</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Connecting Business Growth</h2>
        </div>

        <div className="stats-container">
          {/* LEFT CONTENT */}
          <div className="stats-content-main">
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>
              PROMPT Trade Fairs is a trusted platform dedicated to connecting businesses with the right audience across India. With years of industry experience, we specialize in organizing impactful exhibitions that help brands grow, network, and expand their market presence.
            </p>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8', marginBottom: '35px', fontFamily: '"Inter", sans-serif' }}>
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
