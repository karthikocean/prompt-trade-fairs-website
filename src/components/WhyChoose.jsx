import React from 'react';

const WhyChoose = () => {
  return (
    <section className="why-choose-section">
      <div className="container">
        {/* CENTERED HEADER */}
        <div className="premium-header-box centered">
          <div className="header-accent-row">
            <div className="header-accent-line"></div>
            <span className="header-accent-tag">WHY US</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Smart Expo <span>Solutions</span></h2>
        </div>

        <div className="why-choose-grid">
          {/* Left: Image with accent frames */}
          <div className="why-choose-image-box">
             <div className="accent-frame red"></div>
             <div className="accent-frame blue"></div>
             <img src="/team.png" alt="Prompt Trade Fairs Team" className="main-image shadow-premium" />
             <div className="experience-badge animate-bounce-slow">
               <span className="years">20+</span>
               <span className="text">Years of <br /> Excellence</span>
             </div>
          </div>

          {/* Right: Content */}
          <div className="why-choose-content">
            <p className="main-desc">
              Founded in 2002, Prompt Trade Fairs India Private Limited has emerged as one of the most reputed and outstanding Exhibition Organizers in India. Led by a team of professionals who have organized over 125 Exhibitions for more than two decades.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon-new">
                   <i className="fas fa-check-double"></i>
                </div>
                <div className="feature-text">
                  <h3>Meticulous Planning</h3>
                  <p>Each exhibition is a custom-oriented project, irrespective of size and budget, ensuring flawless delivery standards through meticulus planning.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-new">
                   <i className="fas fa-check-double"></i>
                </div>
                <div className="feature-text">
                  <h3>Proven Expertise</h3>
                  <p>In reality, we have gained a record of more than 10,000 satisfied customers both from India as well as overseas, maintaining high standards of quality.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-new">
                   <i className="fas fa-check-double"></i>
                </div>
                <div className="feature-text">
                  <h3>Strong Visitor Base</h3>
                  <p>Our exhibitions ensure the best business for exhibitors through a strong base of registered visitors in each location, maximizing promotional opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
