import React from 'react';

const MobileAppSection = () => {
  return (
    <section className="mobile-app-section">
      <div className="container">
        <div className="mobile-app-grid">
          {/* LEFT: CONTENT */}
          <div className="app-content-left">
            <div className="premium-header-box">
              <div className="header-accent-row">
                <div className="header-accent-line"></div>
                <span className="header-accent-tag">GET THE APP</span>
              </div>
              <h2 className="header-main-title">Business Growth <br /> <span>Anywhere</span></h2>
            </div>

            <p className="app-description">
              Stay connected with PROMPT Trade Fairs on the go. Get real-time updates, manage schedules, and network effortlessly through our mobile app.
            </p>

            <ul className="app-features-list">
              <li><i className="fas fa-check-circle"></i> Real-time Alerts</li>
              <li><i className="fas fa-check-circle"></i> Booth & Schedule Tracking</li>
              <li><i className="fas fa-check-circle"></i> Smart Networking</li>
              <li><i className="fas fa-check-circle"></i> Easy Registration</li>
            </ul>

            <div className="app-download-btns">
              <a href="#" className="download-btn">
                <img src="/playstore.png" alt="Get it on Google Play" />
              </a>
              <a href="#" className="download-btn">
                <img src="/appstore.png" alt="Download on the App Store" />
              </a>
            </div>
          </div>

          {/* RIGHT: MOCKUP */}
          <div className="app-mockup-right">
             <div className="mockup-container">
                <div className="mockup-circle-accent"></div>
                <div className="mockup-img-wrapper scale-in">
                  <img src="/mobile design screen.svg" alt="Prompt Mobile App Mockup" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
