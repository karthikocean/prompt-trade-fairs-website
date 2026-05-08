import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const PreviousExhibitions = () => {
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [pastVisibleCount, setPastVisibleCount] = useState(4);
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
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Future Exhibitions</span></div>
              <h1 className="v3-hero-title">Future <span>Exhibitions</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPOS GRID - MATCHING UPCOMING STYLE */}
      <section className="past-expos-v3" style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">Future Exhibitions</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">A Legacy of <span>Successful Expos</span></h2>
          </div>

          <div className="modern-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '30px', marginTop: '60px' }}>
            {pastExpos.slice(0, pastVisibleCount).map(item => (
              <motion.div
                key={item.id} whileHover={{ y: -8 }}
                className="modern-gallery-card expo-card"
                onClick={() => openInterestedForm(item)}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  border: '1px solid #eee',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s'
                }}
              >
                {/* IMAGE AREA */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* TITLE & META PILLS ROW */}
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'rgb(17, 17, 17)', margin: 0 }}>
                      {item.title}
                    </h3>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ background: '#f3f4f6', padding: '5px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: '700', color: 'rgb(17, 17, 17)' }}>
                        <i className="far fa-calendar-alt" style={{ color: '#ED1C24' }}></i> {item.date}
                      </div>
                      <div style={{ background: '#f3f4f6', padding: '5px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: '700', color: 'rgb(17, 17, 17)' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24' }}></i> {item.location}
                      </div>
                    </div>
                  </div>

                  <p style={{ color: 'rgb(17, 17, 17)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '25px', opacity: 0.8 }}>
                    {item.shortDesc}
                  </p>

                  <div style={{ marginTop: 'auto' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); openInterestedForm(item); }}
                      style={{
                        width: '100%',
                        background: '#ED1C24',
                        color: '#fff',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: '0.3s',
                        boxShadow: '0 6px 15px rgba(237,28,36,0.2)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      Interested <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {pastExpos.length > pastVisibleCount && (
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
              <button
                onClick={handlePastLoadMore}
                className="premium-load-btn"
                style={{ padding: '12px 50px', borderRadius: '50px', background: '#fff', color: '#ED1C24', border: '2px solid #ED1C24', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', textTransform: 'uppercase', transition: '0.3s' }}
                onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>



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
