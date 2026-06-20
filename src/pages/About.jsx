import React from 'react';
import { useInView, useSpring, useTransform, motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getGallery } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';

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

  // Editions Modal State
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeExpoName, setActiveExpoName] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('all');

  const brandExpoImages = import.meta.glob(
    '/src/assets/images/Our_Brand_Expo/*.{png,jpg,jpeg,webp}',
    {
      eager: true,
      query: '?url',
      import: 'default',
    }
  );

  const segments = Object.entries(brandExpoImages).map(([path, src]) => {
    const fileName = path.split('/').pop().replace(/\.[^/.]+$/, '');
    return {
      name: fileName,
      link: src,
    };
  });

  // ── Gallery fetch ──
  const [galleryItems, setGalleryItems] = React.useState([]);
  const [galleryLoading, setGalleryLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchGallery = async () => {
      setGalleryLoading(true);
      try {
        const res = await getGallery();
        const data = res.data?.data || res.data || [];
        setGalleryItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Error fetching gallery:', e);
      } finally {
        setGalleryLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const openEditionsModal = (expoName) => {
    setActiveExpoName(expoName);
    setSelectedYear('all');
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  // Match gallery images by expo name (fuzzy match against expoId.expoName or category or title)
  const matchedImages = React.useMemo(() => {
    if (!activeExpoName || galleryItems.length === 0) return [];
    const keyword = activeExpoName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return galleryItems.filter(img => {
      const fields = [
        img.expoId?.expoName || '',
        img.category || '',
        img.title || '',
        img.expoName || '',
        img.name || '',
      ];
      return fields.some(f => {
        const norm = f.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!norm) return false;
        return norm.includes(keyword) || keyword.includes(norm.substring(0, Math.min(norm.length, 6)));
      });
    });
  }, [activeExpoName, galleryItems]);

  // Extract unique years from matched images (from createdAt or date field)
  const availableYears = React.useMemo(() => {
    const years = new Set();
    matchedImages.forEach(img => {
      const dateStr = img.createdAt || img.date || img.year;
      if (dateStr) {
        const yr = new Date(dateStr).getFullYear();
        if (!isNaN(yr)) years.add(yr);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [matchedImages]);

  // Apply year filter on matched images
  const filteredImages = React.useMemo(() => {
    if (selectedYear === 'all') return matchedImages;
    return matchedImages.filter(img => {
      const dateStr = img.createdAt || img.date || img.year;
      if (!dateStr) return false;
      return new Date(dateStr).getFullYear() === Number(selectedYear);
    });
  }, [matchedImages, selectedYear]);

  const getGalleryImageSrc = (item) => {
    const imagePath = item?.image || item?.galleryImage || item?.imageUrl || item?.url || item?.file;
    return getImageUrl(imagePath);
  };

  const cities = [
    "Chennai", "Bengaluru", "Hyderabad", "Ahmedabad",
    "Coimbatore", "Salem", "Vijayawada", "Visakhapatnam",
    "Warangal", "Rajahmundry"
  ];

  return (
    <main className="about-v3-main">
      {/* 1. HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/aboutusbanner.png')" }}>
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
                    <div className="header-accent-line"></div>
                    <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>BUSINESS EXCELLENCE</span>
                  </div>
                  <h2 className="header-main-title company-title" style={{ fontWeight: '800', color: '#111' }}>
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
                <p className="intro-p" style={{ marginBottom: '20px', textAlign: 'justify', fontSize: "16px" }}>
                  Prompt Trade Fairs India Pvt. Ltd. is a leading Exhibition Organiser in India with over 25 years of excellence in organizing highly successful Trade Fairs, Business Expos, and Consumer Exhibitions across the country. Known for professionalism, innovation and quality event management, PROMPT has become one of the most trusted names in the Indian exhibition industry.
                </p>
                <p className="intro-p" style={{ marginBottom: '20px', textAlign: 'justify', fontSize: "16px" }}>
                  With a strong commitment to delivering business growth opportunities, PROMPT provides exhibitors with the ideal platform to showcase products, launch brands, connect with buyers and generate valuable business leads. Managed by a dedicated team of industry specialists, every exhibition is strategically planned to meet the evolving needs of exhibitors and target audiences.
                </p>
                <p className="intro-p" style={{ marginBottom: '30px', textAlign: 'justify', fontSize: "16px" }}>
                  PROMPT has successfully organized more than 900+ exhibitions across diverse industry sectors,Industrial Sector, Build Expo, ABI Expo (Architecture, Building, Interior Expo) Property Expo, Poultry Expo, Jewellery Expo, Beauty & Salon Spa Expo, Print Expo, India Diary Show, India Livestock Show, Furniture & Home Products Expo, Furniture & Electronics Expo, Furniture & Lifestyle Expo, making it one of the most sought-after trade fair companies in South India and rapidly expanding across rest of India.
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
              <div className="header-accent-line"></div>
              <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>INDUSTRY DIVERSIFICATION</span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111' }}>
              Specialized Exhibition Segments
            </h2>
            <p style={{ fontSize: '16px', maxWidth: '600px', margin: '15px auto 0', lineHeight: '1.6', textAlign: 'center' }}>
              Every exhibition organized by PROMPT is designed to create maximum business exposure,
              high visitor engagement, and excellent networking opportunities for exhibitors and brands.
            </p>
          </div>

          {(() => {
            const visibleItems = showAll ? segments : segments.slice(0, 8);

            return (
              <div
                className="v3-segments-grid"
                style={{
                  display: 'grid',
                  gap: '28px',
                }}
              >
                {visibleItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="v3-segment-card"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => openEditionsModal(item.name)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 8) * 0.05 }}
                  >
                    <div className="card-border-accent"></div>
                    <div className="card-image" style={{ margin: 0, height: '100%', minHeight: '120px' }}>
                      <img src={item.link} alt={item.name} />
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })()}

          <div className="about-v3-intro-btn" style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                background: '#ED1C24',
                color: '#fff',
                border: 'none',
                padding: '4px 25px',
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
            <div className="presence-text-col">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '15px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div className="header-accent-line"></div>
                    <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>PAN-INDIA NETWORK</span>
                  </div>

                  <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111', margin: '0' }}>
                    Strong Presence Across India
                  </h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify', marginTop: 0 }}>
                  PROMPT has successfully organized exhibitions in major business cities including Chennai, Bengaluru, Hyderabad, Ahmedabad, Coimbatore, Salem, Vijayawada, Visakhapatnam, Warangal, Rajahmundry, and many other key locations across India.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '0', textAlign: 'justify' }}>
                  With a strong database of registered visitors and industry professionals in every region, PROMPT exhibitions consistently attract quality footfall and deliver outstanding business opportunities for exhibitors.
                </p>
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
          </div>
        </div>
      </section>

      {/* 5. EXCELLENCE IN MANAGEMENT SECTION */}
      <section className="v3-management-section">
        <div className="container">
          <div className="management-grid">
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

            <div className="management-text-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '15px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <div className="header-accent-line"></div>
                    <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>END-TO-END SUPPORT</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontWeight: '800', color: '#111', margin: '0', lineHeight: '1.2' }}>
                    Excellence in Exhibition Management
                  </h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify', marginTop: 0 }}>
                  Every PROMPT exhibition is conceptualized with detailed planning, innovative marketing strategies, and extensive promotions across digital media, print advertising, outdoor campaigns and branding platforms. The company focuses on delivering seamless event execution and exceptional customer service, making every exhibition a valuable experience for exhibitors and visitors alike.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '0', textAlign: 'justify' }}>
                  As a complete exhibition solutions provider, PROMPT offers end-to-end support for Trade Fairs, Expos and Business Events, ensuring operational excellence at every stage. Its commitment to professionalism, quality, and business success has positioned PROMPT as one of the leading Trade Fair and exhibition organizers in India.
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

      {/* ── EDITIONS MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="editions-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="editions-modal"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="editions-modal-header">
                <div>
                  <span className="editions-modal-tag">PAST EDITIONS</span>
                  <h2 className="editions-modal-title">{activeExpoName}</h2>
                </div>
                <button className="editions-modal-close" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Year Filter Chips */}
              {!galleryLoading && availableYears.length > 0 && (
                <div className="editions-year-filters">
                  <button
                    className={`year-chip ${selectedYear === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedYear('all')}
                  >
                    All Years
                  </button>
                  {availableYears.map(yr => (
                    <button
                      key={yr}
                      className={`year-chip ${selectedYear === yr ? 'active' : ''}`}
                      onClick={() => setSelectedYear(yr)}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Body */}
              <div className="editions-modal-body">
                {galleryLoading ? (
                  <div className="editions-loading">
                    <div className="editions-spinner"></div>
                    <p>Loading editions...</p>
                  </div>
                ) : filteredImages.length === 0 ? (
                  <div className="editions-empty">
                    <i className="fas fa-calendar-times"></i>
                    <p>No past editions found{selectedYear !== 'all' ? ` for ${selectedYear}` : ''}.</p>
                  </div>
                ) : (
                  <div className="editions-cards-grid">
                    {filteredImages.map((item, idx) => {
                      const imageSrc = getGalleryImageSrc(item);
                      const title = item.title || item.expoId?.expoName || item.expoName || activeExpoName;
                      const venue = item.venue || item.expoId?.venue;
                      const dateStr = item.createdAt || item.date || item.year;
                      const year = dateStr ? new Date(dateStr).getFullYear() : null;

                      return (
                        <motion.div
                          key={item._id || idx}
                          className="editions-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {imageSrc && (
                            <div className="editions-card-img">
                              <img src={imageSrc} alt={title} />
                            </div>
                          )}
                          <div className="editions-card-body">
                            <h4>{title}</h4>
                            {year && !isNaN(year) && (
                              <div className="editions-card-meta">
                                <span><i className="far fa-calendar-alt"></i> {year}</span>
                              </div>
                            )}
                            {venue && (
                              <div className="editions-card-meta">
                                <span><i className="fas fa-map-marker-alt"></i> {venue}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default About;
