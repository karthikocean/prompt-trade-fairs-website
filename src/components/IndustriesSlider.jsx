import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./EnquiryForm";
import { getUpcomingExpos } from "../api/common.api";
import { getImageUrl } from "../config/apiClient";

const formatDate = (start, end) => {
  if (!start) return "";
  const s = new Date(start);
  const e = new Date(end);
  const options = { month: 'short', day: 'numeric' };
  const year = s.getFullYear();
  if (start === end) return `${s.toLocaleDateString(undefined, options)}, ${year}`;
  return `${s.toLocaleDateString(undefined, options)} - ${e.toLocaleDateString(undefined, options)}, ${year}`;
};


const IndustriesSlider = () => {
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const [upcomingRes, presentRes] = await Promise.all([
          getUpcomingExpos(),
          getPresentExpos()
        ]);

        let combinedData = [];
        if (upcomingRes.data && Array.isArray(upcomingRes.data.data)) {
          combinedData = [...upcomingRes.data.data];
        }
        if (presentRes.data && Array.isArray(presentRes.data.data)) {
          // Add present expos that are not already in the list
          const presentExpos = presentRes.data.data.filter(pe => !combinedData.some(ue => ue._id === pe._id));
          combinedData = [...combinedData, ...presentExpos];
        }

        // Sort by start date
        combinedData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        const mapped = combinedData.map(item => ({
          _id: item._id,
          expoName: item.expoName, 
          title: item.expoName,
          meta: item.products?.length > 0 
            ? `${item.products.slice(0, 3).map(p => p.productName).join(", ")} & more.`
            : `Explore the latest innovations in ${item.category?.name || 'various industries'}.`,
          date: formatDate(item.startDate, item.endDate),
          location: item.venue,
          manager: item.eventManager?.name || "N/A",
          categoryName: item.category?.name || "Trade Fair",
          badge: item.category?.name || "Trade Fair",
          img: getImageUrl(item.expoImage),
          layout: item.layoutImage ? getImageUrl(item.layoutImage) : null,
          brochure: item.brochure ? getImageUrl(item.brochure) : null
        }));
        setExpos(mapped);
      } catch (error) {
        console.error("Error fetching expos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpos();
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibitions...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (expos.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(expos.length / itemsPerPage);
  const items = expos.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  const openRegisterModal = (expo) => {
    setSelectedExpo(expo);
    setIsModalOpen(true);
  };

  return (
    <section className="expo-section" style={{ padding: '80px 0', background: '#f9fafb' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="premium-header-box centered" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
            <div className="header-accent-line" style={{ height: '1px', width: '30px', background: '#ED1C24' }}></div>
            <span className="header-accent-tag" style={{ color: '#ED1C24', fontWeight: '700', letterSpacing: '2px', fontSize: '13.5px' }}>Future Expo</span>
            <div className="header-accent-line" style={{ height: '1px', width: '30px', background: '#ED1C24' }}></div>
          </div>
          <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a' }}>
            Discover Future Trade Exhibition
          </h2>
        </div>

        <div className="expo-slider-container" style={{ position: 'relative' }}>
          {/* EXTERNAL CHEVRON ARROWS - ONLY IF > itemsPerPage EXPOS */}
          {expos.length > itemsPerPage && (
            <>
              {page > 0 && (
                <button
                  className="nav-arrow left"
                  onClick={prev}
                  aria-label="Previous Page"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}
              {page < totalPages - 1 && (
                <button
                  className="nav-arrow right"
                  onClick={next}
                  aria-label="Next Page"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </>
          )}

          <div className="expo-grid-v2" style={{ 
            display: 'grid', 
            gridTemplateColumns: itemsPerPage === 1 ? '1fr' : '1fr 1fr', 
            gap: '30px',
            maxWidth: itemsPerPage === 1 ? '550px' : '100%',
            margin: '0 auto'
          }}>
            {items.map((expo, i) => (
              <div className="expo-card-v2" key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div className="expo-card-img-wrapper" style={{ position: 'relative', height: '280px' }}>
                  <img src={expo.img} alt={expo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '30px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px' }}>{expo.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#111' }}>
                        <i className="fas fa-calendar-alt" style={{ color: '#ED1C24', fontSize: '1.1rem' }}></i>
                        <span style={{ fontWeight: '800' }}>{expo.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#111' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', fontSize: '1.1rem' }}></i>
                        <span style={{ fontWeight: '800' }}>{expo.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#111' }}>
                        <i className="fas fa-user-tie" style={{ color: '#ED1C24', fontSize: '1.1rem' }}></i>
                        <span style={{ fontWeight: '800' }}>{expo.manager}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#111' }}>
                        <i className="fas fa-tags" style={{ color: '#ED1C24', fontSize: '1.1rem' }}></i>
                        <span style={{ fontWeight: '800' }}>{expo.categoryName}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>{expo.meta}</p>

                  {/* ACTION BUTTONS (Task 8) */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    {expo.layout && (
                      <a href={expo.layout} target="_blank" rel="noopener noreferrer" style={smallBtnStyle}>
                        <i className="fas fa-map"></i> Layout
                      </a>
                    )}
                    {expo.brochure && (
                      <a href={expo.brochure} target="_blank" rel="noopener noreferrer" style={smallBtnStyle}>
                        <i className="fas fa-file-download"></i> Brochure
                      </a>
                    )}
                  </div>

                  {/* RED INTERESTED BUTTON */}
                  <button
                    onClick={() => openRegisterModal(expo)}
                    style={{
                      width: '100%', padding: '15px', background: '#ED1C24', color: '#fff',
                      border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      marginTop: 'auto', transition: '0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'brightness(0.9)'}
                    onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
                  >
                    Interested <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        {totalPages > 1 && (
          <div className="slider-dots">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`slider-dot ${i === page ? "active" : ""}`}
                onClick={() => setPage(i)}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* REGISTRATION MODAL WITH SIMPLIFIED FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '500px', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
            >
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={selectedExpo}
                onClose={() => setIsModalOpen(false)}
                isSimplified={true} // ONLY NAME, PHONE, EMAIL
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1300px) {
          button[onClick] { left: -30px !important; right: -30px !important; font-size: 2.5rem !important; }
        }
        @media (max-width: 1100px) {
          button[onClick] { display: none !important; }
        }
        @media (max-width: 992px) {
          .expo-grid-v2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const smallBtnStyle = {
  flex: 1,
  padding: '10px',
  background: '#f1f5f9',
  color: '#475569',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: '700',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  border: '1px solid #e2e8f0',
  transition: '0.2s'
};

export default IndustriesSlider;