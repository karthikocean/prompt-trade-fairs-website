import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPastExpoDetails } from '../api/common.api';
import { getImageUrl } from '../config/apiClient';
import EnquiryForm from '../components/EnquiryForm';
import toast from 'react-hot-toast';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EventDetail = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('Image'); // 'Image', 'Video', 'YouTube'
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getPastExpoDetails(id);
        if (response.data && response.data.data) {
          setEvent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching expo details:", error);
        toast.error("Failed to load exhibition details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center' }}>
        <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Loading exhibition details...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: '150px 0', textAlign: 'center' }}>
        <h2>Event Not Found</h2>
        <Link to="/events" style={{ color: '#ED1C24', fontWeight: '700' }}>Back to Events</Link>
      </div>
    );
  }

  const filteredGallery = event.gallery?.filter(item =>
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  return (
    <main className="event-detail-v3" style={{ background: '#fff', paddingTop: '80px' }}>

      <div className="container" style={{ marginTop: '30px' }}>
        {/* BACK TO EVENTS BUTTON */}
        <div style={{ marginBottom: '25px' }}>
          <Link to="/events" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ED1C24',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: '1rem',
            transition: '0.3s'
          }}>
            <i className="fas fa-arrow-left"></i> Back to Events
          </Link>
        </div>

        {/* MAIN TITLE AT TOP */}
        <h1 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#111', marginBottom: '40px', lineHeight: '1.1' }}>{event.expoName}</h1>


        {/* HERO SECTION - SPLIT VIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'stretch', marginBottom: '50px' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="detail-hero-media"
            style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', height: '100%' }}
          >
            <img src={getImageUrl(event.expoImage)} alt={event.expoName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="detail-hero-content"
          >
            <span style={{ background: '#ED1C24', color: '#fff', padding: '6px 18px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              EXHIBITION HIGHLIGHTS
            </span>


            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}>
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Event Duration</p>
                  <p style={{ fontWeight: '800', margin: 0, fontSize: '0.95rem' }}>{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}>
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Timings</p>
                  <p style={{ fontWeight: '800', margin: 0, fontSize: '0.95rem' }}>{event.startTime} - {event.endTime}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Venue Location</p>
                  <p style={{ fontWeight: '800', margin: 0, fontSize: '0.95rem' }}>{event.venue}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {event.eventManager?.profileImage ? (
                  <img src={getImageUrl(event.eventManager.profileImage)} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="manager" />
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fcf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ED1C24' }}>
                    <i className="fas fa-user-tie"></i>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '11px', color: '#999', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Manager</p>
                  <p style={{ fontWeight: '800', margin: 0, fontSize: '0.95rem' }}>{event.eventManager?.name || "N/A"}</p>
                </div>
              </div>
            </div>

            {event.stats && (
              <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '12px', display: 'flex', gap: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Available Stalls</label>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#22c55e' }}>{event.stats.stallAvailable}</span>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Booked Stalls</label>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ef4444' }}>{event.stats.stallBooked}</span>
                </div>
              </div>
            )}

            <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '15px' }}>About this Event</h4>
              <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1rem' }}>
                Join us for <strong>{event.expoName}</strong> at <strong>{event.venue}</strong>. 
                {event.products?.length > 0 && ` Explore a wide range of products including ${event.products.map(p => p.productName).join(', ')}.`}
              </p>

            </div>
          </motion.div>
        </div>

        {/* REGISTRATION MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="expo-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="expo-modal-container"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                style={{ maxWidth: '850px', width: '95%', background: 'transparent', position: 'relative' }}
                onClick={(e) => e.stopPropagation()}
              >
                <EnquiryForm
                  isExpoRegistration={true}
                  expoInfo={event}
                  onClose={() => setIsModalOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GALLERY SECTION (WITH FILTER BUTTONS) */}
        <section className="detail-gallery-section" style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>
              Event <span style={{ color: '#ED1C24' }}>Gallery</span>
            </h2>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveFilter('Image')}
                style={{
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'Image' ? 'none' : '1px solid #ddd',
                  background: activeFilter === 'Image' ? '#ED1C24' : '#fff', color: activeFilter === 'Image' ? '#fff' : '#111',
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s'
                }}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveFilter('Video')}
                style={{
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'Video' ? 'none' : '1px solid #ddd',
                  background: activeFilter === 'Video' ? '#ED1C24' : '#fff', color: activeFilter === 'Video' ? '#fff' : '#111',
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s'
                }}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveFilter('YouTube')}
                style={{
                  padding: '10px 25px', borderRadius: '50px', border: activeFilter === 'YouTube' ? 'none' : '1px solid #ddd',
                  background: activeFilter === 'YouTube' ? '#ED1C24' : '#fff', color: activeFilter === 'YouTube' ? '#fff' : '#111',
                  fontWeight: '700', cursor: 'pointer', transition: '0.3s'
                }}
              >
                YouTube
              </button>
            </div>
          </div>

          <div style={{ minHeight: '300px' }}>
            {filteredGallery && filteredGallery.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                <AnimatePresence mode="popLayout">
                  {filteredGallery.map((item, idx) => (
                    <motion.div
                      key={`${item.url}-${idx}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', background: '#f8f9fa' }}
                    >
                      {item.type === 'YouTube' || item.type === 'Video' ? (
                        <div style={{ aspectRatio: '16/9' }}>
                          {item.type === 'YouTube' ? (
                            <iframe 
                              width="100%" 
                              height="100%" 
                              src={item.url.includes('embed') ? item.url : item.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0]} 
                              frameBorder="0" 
                              allowFullScreen 
                              title="YouTube Video"
                            ></iframe>
                          ) : (
                            <video width="100%" height="100%" controls style={{ objectFit: 'cover' }}>
                              <source src={getImageUrl(item.url)} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      ) : (
                        <img src={getImageUrl(item.url)} alt="Gallery" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '100px 0', background: '#f9fafb', borderRadius: '20px', border: '2px dashed #eee' }}
              >
                <i className={`fas ${activeFilter === 'Image' ? 'fa-camera' : (activeFilter === 'YouTube' ? 'fab fa-youtube' : 'fa-video')}`} style={{ fontSize: '3rem', color: '#ccc', marginBottom: '20px' }}></i>
                <h3 style={{ color: '#999', fontWeight: '700' }}>No {activeFilter === 'Image' ? 'Photos' : (activeFilter === 'YouTube' ? 'YouTube Videos' : 'Videos')} uploaded</h3>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

const actionBtnStyle = {
  padding: '12px 25px',
  borderRadius: '8px',
  background: '#f1f5f9',
  color: '#334155',
  fontWeight: '700',
  fontSize: '0.9rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  transition: '0.3s',
  border: '1px solid #e2e8f0',
  cursor: 'pointer'
};

export default EventDetail;
