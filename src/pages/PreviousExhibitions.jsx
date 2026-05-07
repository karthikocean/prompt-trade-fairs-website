import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const PreviousExhibitions = () => {
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [pastVisibleCount, setPastVisibleCount] = useState(3);
  const [galleryVisibleCount, setGalleryVisibleCount] = useState(3);
  const [activeTab, setActiveTab] = useState('photos');
  const [isSimplified, setIsSimplified] = useState(false);

  const pastExpos = [
    {
      id: 1, title: "Property Festival 2025: Premium Venue", date: "JAN 12-14, 2025",
      location: "Coimbatore, India", shortDesc: "Record-breaking real estate networking.",
      longDesc: "Property Festival 2025 was a landmark event that connected premium builders with potential homebuyers. The event witnessed an unprecedented footfall and significant booking volumes, cementing its place as South India's premier property show.",
      img: "/webpropg1.jpg", status: "COMPLETED"
    },
    {
      id: 2, title: "Grand Furniture Expo 2024: Chennai Edition", date: "NOV 05-07, 2024",
      location: "Chennai, India", shortDesc: "India's largest furniture trade gathering.",
      longDesc: "The Grand Furniture Expo showcased the latest trends in interior design and modular furniture. Featuring exhibitors from across the globe, it provided a platform for business networking and direct-to-consumer sales.",
      img: "/expo1.jpg", status: "SUCCESS"
    },
    {
      id: 3, title: "Build Expo 2024: Industry Success Storey", date: "OCT 12-14, 2024",
      location: "Hyderabad, India", shortDesc: "Mega construction expo with 500+ exhibitors.",
      longDesc: "Build Expo 2024 brought together architects, builders, and material suppliers. The exhibition focused on sustainable construction technologies and innovative building materials that are shaping the future of urban infrastructure.",
      img: "/webbannerbuild.jpg", status: "RECORD"
    },
    { 
      id: 4, title: "Smart Home & Automation Meet 2024", date: "SEP 20-22, 2024", 
      location: "Bengaluru", shortDesc: "Next-gen automation trends.", 
      longDesc: "A focused gathering of tech leaders in the home automation space.",
      img: "/webbannerg1.jpg", status: "COMPLETED" 
    },
    { 
      id: 5, title: "Regional Business Meet 2024: Pondicherry", date: "AUG 15, 2024", 
      location: "Pondicherry", shortDesc: "B2B local networking.", 
      longDesc: "Strengthening local business ties in the Pondicherry region.",
      img: "/team.png", status: "COMPLETED" 
    },
    { 
      id: 6, title: "International Trade Fair: Logistics Edition", date: "JUL 12-14, 2024", 
      location: "Mumbai", shortDesc: "Supply chain and logistics gathering.", 
      longDesc: "Exploring the global logistics landscape and new-age supply chain solutions.",
      img: "/webbannerbuild.jpg", status: "SUCCESS" 
    }
  ];

  const galleryData = {
    photos: [
      { id: 101, title: "Inaugural Ceremony: Build Expo 2024", date: "2024", location: "Hyderabad", shortDesc: "Grand opening highlights.", img: "/webbannerbuild.jpg", type: 'photo' },
      { id: 102, title: "Exhibitor Interaction: Furniture Expo", date: "2024", location: "Chennai", shortDesc: "Business networking.", img: "/webpropg1.jpg", type: 'photo' },
      { id: 103, title: "Property Festival: Home Finder Summit", date: "2024", location: "Coimbatore", shortDesc: "Real estate highlights.", img: "/webbannerg1.jpg", type: 'photo' },
      { id: 104, title: "Industry Leaders Gala 2024", date: "2024", location: "Madurai", shortDesc: "Networking night.", img: "/webbannerg1.jpg", type: 'photo' }
    ],
    videos: [
      { id: 201, title: "Mega Expo 2024: Official Aftermovie", date: "2024", location: "Coimbatore", shortDesc: "Cinematic highlights.", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: 'video' }
    ]
  };

  const handlePastLoadMore = () => setPastVisibleCount(prev => prev + 3);
  const handleGalleryLoadMore = () => setGalleryVisibleCount(prev => prev + 3);

  const openInterestedForm = (expo) => {
    setSelectedExpo(expo);
    setIsSimplified(true);
    setIsEnquiryModalOpen(true);
  };

  const currentGalleryItems = activeTab === 'photos' ? galleryData.photos : galleryData.videos;

  return (
    <main className="previous-v3-main">
      {/* HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/expobanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Previous Exhibitions</span></div>
              <h1 className="v3-hero-title">Previous <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPOS GRID - MATCHING UPCOMING STYLE */}
      <section className="past-expos-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">SUCCESS JOURNEY</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">A Legacy of <span>Successful Expos</span></h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '30px', marginTop: '60px' }}>
            {pastExpos.slice(0, pastVisibleCount).map(item => (
              <motion.div
                key={item.id} whileHover={{ y: -8 }}
                className="modern-gallery-card expo-card"
                onClick={() => setSelectedExpo(item)}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  position: 'absolute', top: '35px', right: '35px', zIndex: 10,
                  background: '#ED1C24',
                  color: '#fff', padding: '6px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase'
                }}>
                  {item.status}
                </div>

                <div className="modern-card-inner">
                  <div className="expo-img" style={{ height: '260px', overflow: 'hidden', borderRadius: '12px' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 0 0' }}>
                    <div className="expo-meta" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ED1C24', fontWeight: '700', fontSize: '14px', marginBottom: '15px' }}>
                      <i className="far fa-calendar-alt"></i> {item.date}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', lineHeight: '1.3', marginBottom: '15px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                      {item.shortDesc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
                       <span style={{ color: '#777', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.location}
                      </span>
                      {/* ADDED INTERESTED BUTTON ON CARD */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); openInterestedForm(item); }}
                        style={{ background: '#ED1C24', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Interested
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {pastVisibleCount < pastExpos.length && (
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
              <button 
                onClick={handlePastLoadMore} 
                className="premium-load-btn"
                style={{ padding: '12px 50px', borderRadius: '50px', background: '#fff', color: '#ED1C24', border: '2px solid #ED1C24', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', textTransform: 'uppercase', transition: '0.3s' }}
                onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
              >
                View More Past
              </button>
            </div>
          )}
        </div>
      </section>

      {/* REFINED POPUP MODAL - MATCHING UPCOMING STYLE + 3 BUTTONS */}
      <AnimatePresence>
        {selectedExpo && (
          <motion.div
            className="media-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedExpo(null)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '950px', width: '100%', background: '#fff', boxShadow: '0 40px 80px rgba(0,0,0,0.12)', maxHeight: '95vh', overflow: 'hidden', borderRadius: '16px', position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}
            >
              <div onClick={() => setSelectedExpo(null)} style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100 }}><i className="fas fa-times" style={{ color: '#111' }}></i></div>

              <div className="modal-media-left" style={{ position: 'relative', minHeight: '550px' }}>
                <img src={selectedExpo.img} alt="Expo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
              </div>

              <div className="modal-meta-right" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px', overflowY: 'auto' }}>
                <div>
                  <h2 style={{ color: '#111', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '10px' }}>{selectedExpo.title}</h2>
                  <div style={{ height: '3px', width: '50px', background: '#ED1C24' }}></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="far fa-calendar-alt"></i></div>
                    <div><p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase' }}>Date</p><p style={{ fontWeight: '700', margin: 0 }}>{selectedExpo.date}</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}><i className="fas fa-map-marker-alt"></i></div>
                    <div><p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase' }}>Location</p><p style={{ fontWeight: '700', margin: 0 }}>{selectedExpo.location}</p></div>
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '10px', color: '#111' }}>About the Expo</h4>
                  <p style={{ color: '#555', fontSize: '14.5px', lineHeight: '1.6' }}>{selectedExpo.longDesc}</p>
                </div>

                {/* SINGLE INTERESTED BUTTON AS REQUESTED */}
                <button 
                   onClick={() => { setIsSimplified(true); setIsEnquiryModalOpen(true); }}
                   style={{ 
                     padding: '18px', 
                     background: '#ED1C24', 
                     color: '#fff', 
                     border: 'none', 
                     fontWeight: '800', 
                     borderRadius: '12px', 
                     cursor: 'pointer', 
                     textTransform: 'uppercase', 
                     fontSize: '15px',
                     boxShadow: '0 8px 25px rgba(237,28,36,0.25)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '10px'
                   }}
                >
                  Interested <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENQUIRY FORM MODAL */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <motion.div
            className="media-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsEnquiryModalOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '650px', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
            >
              <EnquiryForm
                isExpoRegistration={true}
                expoInfo={selectedExpo}
                isSimplified={isSimplified}
                onClose={() => setIsEnquiryModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 992px) {
          .modern-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

export default PreviousExhibitions;
