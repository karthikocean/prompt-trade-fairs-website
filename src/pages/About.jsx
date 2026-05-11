import React from 'react';
import { useInView, useSpring, useTransform, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Counter = ({ value, suffix = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30
  });
  
  const display = useTransform(spring, (current) => {
    const num = Math.floor(current);
    if (num >= 1000000) return (num / 1000000).toFixed(0) + "M" + suffix;
    if (num >= 1000) return (num / 1000).toFixed(0) + "K" + suffix;
    return num.toLocaleString() + suffix;
  });

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref} className="stat-v3-num">{display}</motion.span>;
};

const About = () => {
  return (
    <main className="about-v3-main">
      {/* 1. REFERENCE STYLE HERO - UNIQUE BANNER */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/aboutusbanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">About Us</span>
              </div>
              <h1 className="v3-hero-title">About Us</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT TEXT & BULLETS */}
      <section className="about-v3-intro">
        <div className="container">
          <div className="about-v3-grid">
            <motion.div 
               className="intro-left"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <div className="premium-header-box">
                <div className="header-accent-row">
                  <div className="header-accent-line"></div>
                  <span className="header-accent-tag">EMPROWERING BUSINESSES</span>
                </div>
                <h2 className="header-main-title">Prompt Trade Fairs <span>India Pvt Ltd</span></h2>
              </div>
              
              <div className="intro-bullets">
                 <div className="bullet-item">
                    <div className="bullet-icon"><i className="fas fa-check-double"></i></div>
                    <p>Globally Empowering Industry Standards</p>
                 </div>
                 <div className="bullet-item">
                    <div className="bullet-icon"><i className="fas fa-check-double"></i></div>
                    <p>Connecting Buyers with Leading Manufacturers</p>
                 </div>
                 <div className="bullet-item">
                    <div className="bullet-icon"><i className="fas fa-check-double"></i></div>
                    <p>Organizing 125+ Successful Exhibitions</p>
                 </div>
              </div>
              <p className="intro-p">
                Established in 2002, Prompt Trade Fairs India Private Limited has emerged as one of the most reputed and outstanding Exhibition Organizers in India. Led by a team of professionals who have organized over 125 Exhibitions for more than two decades, we have our footprints across the country.
              </p>
              <p className="intro-p">
                We organize more than 15 exhibitions a year in various categories including Property Fair, Building & Construction Expo, Interior Design Expo, and Consumer Fairs.
              </p>
            </motion.div>

            <motion.div 
               className="intro-right"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
            >
               <div className="why-choose-image-box" style={{minWidth: '100%'}}>
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/team.png" alt="About Team" className="main-image" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. NUMBERED INITIATIVE CARDS (REFERENCE STYLE) */}
      <section className="v3-initiatives-section">
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row centered">
              <div className="header-accent-line"></div>
              <span className="header-accent-tag">OUR VALUES</span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title">Our <span>Core Values</span></h2>
          </div>
          <div className="v3-initiatives-grid">
            {[
              { num: "01", title: "Customer Centricity", icon: "fa-user-friends", desc: "Placing our exhibitors and visitors at the center of every event we host to ensure satisfaction.", bottom: "CLIENT FOCUS" },
              { num: "02", title: "Scale & Growth", icon: "fa-chart-line", desc: "Driving measurable growth for your business through high-energy exhibition platforms.", bottom: "BUSINESS GROWTH" },
              { num: "03", title: "Innovation", icon: "fa-lightbulb", desc: "Constantly evolving our formats to stay ahead of world-class exhibition standards.", bottom: "MODERN STANDARDS" }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="v3-initiative-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="v3-card-border"></div>
                <div className="v3-card-content">
                  <div className="card-top">
                     <div className="card-icon"><i className={`fas ${item.icon}`}></i></div>
                     <span className="card-num">{item.num}</span>
                  </div>
                  <div className="card-line"></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="v3-card-bottom-text">{item.bottom}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROUNDED STATS CONTAINER (REFERENCE STYLE) */}
      <section className="v3-stats-section">
        <div className="container">
          <div className="v3-stats-wrapper">
             <div className="v3-stat-item">
                <Counter value={5000} suffix="+" />
                <span className="stat-v3-label">SATISFIED EXHIBITORS</span>
             </div>
             <div className="v3-stat-item">
                <Counter value={1000000} suffix="+" />
                <span className="stat-v3-label">PROFESSIONAL VISITORS</span>
             </div>
             <div className="v3-stat-item">
                <Counter value={125} suffix="+" />
                <span className="stat-v3-label">COMPLETED EVENTS</span>
             </div>
             <div className="v3-stat-item">
                <Counter value={22} suffix="+" />
                <span className="stat-v3-label">YEARS IN INDUSTRY</span>
             </div>
          </div>
        </div>
      </section>
      
    </main>
  );
};

export default About;
