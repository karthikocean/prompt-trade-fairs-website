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
  const [showAll, setShowAll] = React.useState(false);
  const segments = [
    { name: "Property Expo", icon: "fa-building" },
    { name: "Build Expo", icon: "fa-tools" },
    { name: "ABI Expo (Architecture, Building, Interior)", icon: "fa-couch" },
    { name: "Furniture & Home Products Expo", icon: "fa-egg" },
    { name: "Electronics & Furniture Expo", icon: "fa-hard-hat" },
    { name: "Jewellery Expo", icon: "fa-pencil-ruler" },
    { name: "India Poultry Show", icon: "fa-gem" },
    { name: "India Diary Show", icon: "fa-cow" },
    { name: "India Livestock Show", icon: "fa-graduation-cap" },
    { name: "Education Fair", icon: "fa-shopping-bag" }
  ];

  const cities = [
    "Chennai", "Bengaluru", "Hyderabad", "Ahmedabad",
    "Coimbatore", "Salem", "Vijayawada", "Visakhapatnam",
    "Warangal", "Rajahmundry"
  ];

  return (
    <main className="about-v3-main">
      {/* 1. HERO SECTION */}
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
              <h1 className="v3-hero-title">About <span>Us</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE SUMMARY SECTION */}
      <section className="about-v3-intro" style={{ padding: '100px 0 60px', background: '#fff' }}>
        <div className="container">
          <div className="about-v3-grid">
            <div className="v3-intro-header-col">
              <motion.div
                className="v3-intro-header"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '10px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontWeight: '800', color: '#ED1C24', letterSpacing: '1px' }}>BUSINESS EXCELLENCE</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111' }}>
                    Prompt Trade Fairs India Pvt. Ltd
                  </h2>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#555', marginTop: '10px', lineHeight: '1.4' }}>
                    Creating Exceptional Platforms for Business Success
                  </h4>
                </div>
              </motion.div>
            </div>

            <div className="v3-intro-image-col">
              <motion.div
                className="v3-intro-image"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="why-choose-image-box">
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/promtbuilding.jpeg" alt="Exhibition Impact" className="main-image shadow-premium" />
                </div>
              </motion.div>
            </div>

            <div className="v3-intro-content-col">
              <motion.div
                className="v3-intro-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8' }}
              >
                <p className="intro-p" style={{ marginBottom: '20px', textAlign: 'justify' }}>
                  Prompt Trade Fairs India Pvt. Ltd. is a leading Exhibition Organiser in India with over 25 years of excellence in organizing highly successful trade fairs, Business Expos, and Consumer Exhibitions across the country. Known for professionalism, innovation, and quality event management, PROMPT has become one of the most trusted names in the Indian exhibition industry.
                </p>
                <p className="intro-p" style={{ marginBottom: '20px', textAlign: 'justify' }}>
                  With a strong commitment to delivering business growth opportunities, PROMPT provides exhibitors with the ideal platform to showcase products, launch brands, connect with buyers, and generate valuable business leads. Managed by a dedicated team of industry specialists, every exhibition is strategically planned to meet the evolving needs of exhibitors and target audiences.
                </p>
                <p className="intro-p" style={{ marginBottom: '30px', textAlign: 'justify' }}>
                  PROMPT has successfully organized more than 900+ exhibitions across diverse industry sectors, making it one of the most sought-after trade fair companies in South India and rapidly expanding across the rest of India.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPECIALIZED SEGMENTS SECTION */}
      <section className="v3-segments-section">
        <div className="container">
          <div className="premium-header-box centered" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="header-accent-row centered" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div className="header-accent-line" style={{ width: '30px', height: '2px', background: '#ED1C24' }}></div>
              <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>INDUSTRY DIVERSIFICATION</span>
              <div className="header-accent-line" style={{ width: '30px', height: '2px', background: '#ED1C24' }}></div>
            </div>
            <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111' }}>
              Specialized Exhibition Segments
            </h2>
            <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '600px', margin: '15px auto 0', lineHeight: '1.6', textAlign: 'center' }}>
              Every exhibition organized by PROMPT is designed to create maximum business exposure,
              high visitor engagement, and excellent networking opportunities for exhibitors and brands.
            </p>
          </div>

          <div className="v3-segments-grid">
            {(showAll ? segments : segments.slice(0, 6)).map((item, idx) => (
              <motion.div
                key={idx}
                className="v3-segment-card"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
              >
                <div className="card-border-accent"></div>
                <div className="card-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 style={{ textAlign: 'center', marginTop: '20px' }}>{item.name}</h3>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                background: '#ED1C24',
                color: '#fff',
                border: 'none',
                padding: '14px 35px',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(237, 28, 36, 0.2)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#d61820';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(237, 28, 36, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ED1C24';
                e.target.style.transform = 'none';
                e.target.style.boxShadow = '0 8px 25px rgba(237, 28, 36, 0.2)';
              }}
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
              <i className={`fas ${showAll ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
          </div>
        </div>
      </section>

      {/* 4. STRONG PRESENCE (PAN-INDIA MAP & CITIES) */}
      <section className="v3-presence-section">
        <div className="container">
          <div className="presence-grid">
            <div className="presence-header-col">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '10px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>PAN-INDIA NETWORK</span>
                  </div>

                  <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111' }}>
                    Strong Presence Across India
                  </h2>
                </div>
              </motion.div>
            </div>

            <div className="presence-image-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div className="why-choose-image-box">
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/exact_india_map_image.png" alt="Exhibition Presence India Map" className="main-image shadow-premium" />
                </div>
              </motion.div>
            </div>

            <div className="presence-content-col">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginTop: '-80px' }}
              >
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify', marginTop: 0 }}>
                  PROMPT has successfully organized exhibitions in major business cities including Chennai, Bengaluru, Hyderabad, Ahmedabad, Coimbatore, Salem, Vijayawada, Visakhapatnam, Warangal, Rajahmundry, and many other key locations across India.
                </p>
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '30px', textAlign: 'justify' }}>
                  With a strong database of registered visitors and industry professionals in every region, PROMPT exhibitions consistently attract quality footfall and deliver outstanding business opportunities for exhibitors.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXCELLENCE IN MANAGEMENT SECTION */}
      <section className="v3-management-section">
        <div className="container">
          <div className="management-grid">
            <div className="management-header-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '10px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>END-TO-END SUPPORT</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111', lineHeight: '1.2' }}>
                    Excellence in Exhibition Management
                  </h2>
                </div>
              </motion.div>
            </div>

            <div className="management-image-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="why-choose-image-box">
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/about_img.jpg" alt="Exhibition Management Excellence" className="main-image shadow-premium" onError={(e) => { e.target.src = '/team.png'; }} />
                </div>
              </motion.div>
            </div>

            <div className="management-content-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
                  Every PROMPT exhibition is conceptualized with detailed planning, innovative marketing strategies, and extensive promotions across digital media, print advertising, outdoor campaigns, and branding platforms. The company focuses on delivering seamless event execution and exceptional customer service, making every exhibition a valuable experience for exhibitors and visitors alike.
                </p>
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', textAlign: 'justify' }}>
                  As a complete exhibition solutions provider, PROMPT offers end-to-end support for trade fairs, expos, and business events, ensuring operational excellence at every stage. Its commitment to professionalism, quality, and business success has positioned PROMPT as one of the leading trade fair and exhibition organizers in India.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROUNDED STATS SECTION (COUNTER UPDATED) */}
      {/* <section className="v3-stats-section" style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="v3-stats-wrapper" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', padding: '40px', background: '#ED1C24', borderRadius: '30px', color: '#fff', boxShadow: '0 20px 45px rgba(237, 28, 36, 0.15)' }}>
             <div className="v3-stat-item" style={{ textAlign: 'center', flex: '1 1 200px' }}>
                <Counter value={5000} suffix="+" />
                <span className="stat-v3-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', marginTop: '10px', letterSpacing: '1px', opacity: 0.85 }}>HAPPY EXHIBITORS</span>
             </div>
             <div className="v3-stat-item" style={{ textAlign: 'center', flex: '1 1 200px' }}>
                <Counter value={1000000} suffix="+" />
                <span className="stat-v3-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', marginTop: '10px', letterSpacing: '1px', opacity: 0.85 }}>QUALITY FOOTFALL</span>
             </div>
             <div className="v3-stat-item" style={{ textAlign: 'center', flex: '1 1 200px' }}>
                <Counter value={900} suffix="+" />
                <span className="stat-v3-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', marginTop: '10px', letterSpacing: '1px', opacity: 0.85 }}>COMPLETED EXHIBITIONS</span>
             </div>
             <div className="v3-stat-item" style={{ textAlign: 'center', flex: '1 1 200px' }}>
                <Counter value={25} suffix="+" />
                <span className="stat-v3-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', marginTop: '10px', letterSpacing: '1px', opacity: 0.85 }}>YEARS OF EXCELLENCE</span>
             </div>
          </div>
        </div>
      </section> */}

    </main>
  );
};

export default About;
