import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const JobApplicationModal = ({ isOpen, onClose, jobTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    guardianName: '',
    dob: '',
    gender: '',
    contactNo: '',
    email: '',
    qualification: '',
    experience: '',
    expectedSalary: '',
    appliedFor: jobTitle || ''
  });

  useEffect(() => {
    if (jobTitle) {
      setFormData(prev => ({ ...prev, appliedFor: jobTitle }));
    }
  }, [jobTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Application submitted successfully!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="job-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            padding: '20px'
          }}
        >
          <motion.div
            className="job-modal-container"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '650px',
              borderRadius: '24px',
              padding: '30px 40px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <i className="fas fa-times"></i>
            </button>

            <div style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#ED1C24', margin: 0 }}>Careers</h2>
              <p style={{ color: '#666', marginTop: '5px', fontSize: '15px' }}>Apply for <strong>{jobTitle}</strong></p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Candidate Full Name <span style={{ color: '#ED1C24' }}>*</span></label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Fathers / Husband Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Date of Birth <span style={{ color: '#ED1C24' }}>*</span></label>
                  <input
                    required
                    type="date"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Gender <span style={{ color: '#ED1C24' }}>*</span></label>
                  <select
                    required
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Contact No <span style={{ color: '#ED1C24' }}>*</span></label>
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.contactNo}
                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                  />
                </div>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Email <span style={{ color: '#ED1C24' }}>*</span></label>
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-v3">
                <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Qualification <span style={{ color: '#ED1C24' }}>*</span></label>
                <input
                  required
                  type="text"
                  placeholder="Your highest degree"
                  style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Experience</label>
                  <input
                    type="text"
                    placeholder="Years of experience"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>
                <div className="form-group-v3">
                  <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Expected Salary</label>
                  <input
                    type="text"
                    placeholder="Expected CTC"
                    style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '15px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ED1C24',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: '0.3s',
                  boxShadow: '0 8px 20px rgba(237, 28, 36, 0.3)'
                }}
              >
                Submit Application
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    { title: "Event Specialist", location: "Chennai, India", type: "Full-Time", code: "PRO-EVT-01" },
    { title: "Partnership Manager", location: "Coimbatore, India", type: "Full-Time", code: "PRO-PRT-02" },
    { title: "Marketing Executive", location: "Madurai, India", type: "Full-Time", code: "PRO-MKT-03" }
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="careers-v3-main">
      <JobApplicationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        jobTitle={selectedJob?.title} 
      />
      {/* 1. PREMIUM HERO SECTION (ABOUT US STYLE) */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/contactusbanner.svg')" }}>
        <div className="v3-hero-overlay"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">Careers</span>
              </div>
              <h1 className="v3-hero-title">Build Your Career <span>With PROMPT</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CULTURE SECTION */}
      <section className="careers-about-culture" style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="about-story-grid">
            <div className="story-content-left">
              <div className="premium-header-box">
                <div className="header-accent-row">
                  <div className="header-accent-line"></div>
                  <span className="header-accent-tag">OUR CULTURE</span>
                </div>
                <h2 className="header-main-title">Work at the <span>Heart of Innovation</span></h2>
              </div>
              <p className="story-p-large">
                At PROMPT, we believe that our people are our greatest asset. We foster a culture of creativity, collaboration, and continuous learning.
              </p>
              <p className="story-p-muted">
                Whether you're an experienced professional or a fresh graduate, we offer an environment that rewards hard work and provides a platform to lead and innovate within the exhibition industry.
              </p>

              <div className="milestones-row">
                <div className="milestone-box">
                  <span className="milestone-num">100+</span>
                  <span className="milestone-label">Team Members</span>
                </div>
                <div className="milestone-box">
                  <span className="milestone-num">5+</span>
                  <span className="milestone-label">State-wide Offices</span>
                </div>
              </div>
            </div>

            <div className="story-image-right">
              <div className="image-frame-premium">
                <img src="/team.png" alt="Team Culture" className="main-story-img" style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                <div className="accent-box-top"></div>
                <div className="accent-box-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURRENT OPENINGS */}
      <section className="current-openings-section" style={{ background: '#f8f9fb', padding: '120px 0' }}>
        <div className="container">
          <div className="premium-header-box centered">
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span className="header-accent-tag">OPPORTUNITIES</span>
              <div className="header-accent-line"></div>
            </div>
            <h2 className="header-main-title">Current <span>Openings</span></h2>
          </div>

          <div className="openings-list-premium" style={{ marginTop: '60px' }}>
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                className="job-card-modern"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  background: '#fff',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <div className="job-info-left" style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', marginBottom: '5px' }}>{job.title}</h3>
                  <span className="job-id" style={{ color: '#ED1C24', fontWeight: '700', fontSize: '13px' }}>Ref: {job.code}</span>
                </div>
                <div className="job-info-center" style={{ flex: '1', display: 'flex', gap: '30px' }}>
                  <p style={{ margin: '0', color: '#666', fontSize: '15px' }}><i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', marginRight: '8px' }}></i> {job.location}</p>
                  <p style={{ margin: '0', color: '#666', fontSize: '15px' }}><i className="fas fa-briefcase" style={{ color: '#ED1C24', marginRight: '8px' }}></i> {job.type}</p>
                </div>
                <div className="job-info-right">
                  <button 
                    className="apply-btn-premium" 
                    onClick={() => handleApplyClick(job)}
                    style={{
                      padding: '12px 25px',
                      borderRadius: '50px',
                      border: 'none',
                      background: '#ED1C24',
                      color: '#fff',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Apply Now <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default Careers;
