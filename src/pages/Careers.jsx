import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCareers, applyForJob, uploadFile } from '../api/common.api';
import toast from 'react-hot-toast';

const JobApplicationModal = ({ isOpen, onClose, job }) => {
  const [loading, setLoading] = useState(false);
  const initialFormState = {
    fullName: '',
    fatherOrHusbandName: '',
    dob: '',
    gender: '',
    mobileNo: '',
    email: '',
    qualification: '',
    experience: '',
    expectedSalary: '',
    resume: null
  };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.mobileNo) {
      newErrors.mobileNo = "Contact Number is required";
    } else if (formData.mobileNo.length !== 10) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Address is invalid";
    }
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.expectedSalary.trim()) newErrors.expectedSalary = "Expected Salary is required";
    if (!formData.fatherOrHusbandName.trim()) newErrors.fatherOrHusbandName = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation Handlers
  const handleNameChange = (e, field) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleNumberChange = (e, field, maxLength) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      if (!maxLength || value.length <= maxLength) {
        setFormData({ ...formData, [field]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.", {
        style: {
          border: '1px solid #ED1C24',
          padding: '16px',
          color: '#ED1C24',
          fontWeight: 'bold'
        },
        iconTheme: {
          primary: '#ED1C24',
          secondary: '#FFFAEE',
        },
      });
      return;
    }

    setLoading(true);
    try {
      let resumePath = '';

      // 1. Upload Resume if selected
      if (formData.resume) {
        const uploadRes = await uploadFile(formData.resume, 'resume');
        if (uploadRes.data && uploadRes.data.success) {
          resumePath = uploadRes.data.data.path;
        } else {
          throw new Error("Resume upload failed");
        }
      }

      // 2. Submit Application
      const payload = {
        careerId: job._id,
        fullName: formData.fullName,
        fatherOrHusbandName: formData.fatherOrHusbandName,
        dob: formData.dob,
        gender: formData.gender,
        mobileNo: formData.mobileNo,
        email: formData.email,
        qualification: formData.qualification,
        experience: formData.experience,
        expectedSalary: formData.expectedSalary,
        resume: resumePath
      };

      await applyForJob(payload);
      toast.success("Application Submitted Successfully!");

      // Reset and Close
      setFormData(initialFormState);
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.response?.data?.message || "Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
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
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
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
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'min-content',
              margin: 'auto'
            }}
          >
            {/* COMPACT RED HEADER */}
            <div style={{ background: '#ED1C24', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Job Application
              </h2>
              <div
                onClick={onClose}
                style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                <i className="fas fa-times" style={{ color: '#fff', fontSize: '14px' }}></i>
              </div>
            </div>

            <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div className="custom-scrollbar" style={{ padding: '30px 40px', overflowY: 'auto', flex: 1 }}>
                <div className="job-modal-header" style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111', margin: 0 }}>Apply for {job?.jobRole}</h3>
                  <p style={{ color: '#666', marginTop: '5px', fontSize: '14px' }}>Please fill in the details below to submit your application.</p>
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  <div className="job-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Candidate Full Name <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.fullName ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.fullName}
                        onChange={(e) => handleNameChange(e, 'fullName')}
                      />
                      {errors.fullName && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                    </div>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Fathers / Husband Name <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.fatherOrHusbandName ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.fatherOrHusbandName}
                        onChange={(e) => handleNameChange(e, 'fatherOrHusbandName')}
                      />
                      {errors.fatherOrHusbandName && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.fatherOrHusbandName}</span>}
                    </div>
                  </div>

                  <div className="job-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Date of Birth <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="date"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.dob ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      />
                      {errors.dob && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.dob}</span>}
                    </div>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Gender <span style={{ color: '#ED1C24' }}>*</span></label>
                      <select
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.gender ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.gender}</span>}
                    </div>
                  </div>

                  <div className="job-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Contact No <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.mobileNo ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.mobileNo}
                        onChange={(e) => handleNumberChange(e, 'mobileNo', 10)}
                      />
                      {errors.mobileNo && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.mobileNo}</span>}
                    </div>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Email <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="email"
                        placeholder="Email address"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.email ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group-v3">
                    <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Qualification <span style={{ color: '#ED1C24' }}>*</span></label>
                    <input
                      type="text"
                      placeholder="Your highest degree"
                      style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.qualification ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    />
                    {errors.qualification && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.qualification}</span>}
                  </div>

                  <div className="job-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Experience <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="text"
                        placeholder="Years of experience"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.experience ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.experience}
                        onChange={(e) => handleNumberChange(e, 'experience')}
                      />
                      {errors.experience && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.experience}</span>}
                    </div>
                    <div className="form-group-v3">
                      <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Expected Salary <span style={{ color: '#ED1C24' }}>*</span></label>
                      <input
                        type="text"
                        placeholder="Expected CTC"
                        style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: errors.expectedSalary ? '1.5px solid #ED1C24' : '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                        value={formData.expectedSalary}
                        onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      />
                      {errors.expectedSalary && <span style={{ color: '#ED1C24', fontSize: '11px', fontWeight: '600', marginTop: '4px', display: 'block' }}>{errors.expectedSalary}</span>}
                    </div>
                  </div>

                  <div className="form-group-v3">
                    <label style={{ display: 'block', fontWeight: '700', color: '#111', marginBottom: '8px', fontSize: '14px' }}>Upload Resume (Optional)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ width: '100%', padding: '10px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', background: '#f9f9f9', fontSize: '14px' }}
                      onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                    />
                    <p style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '20px 40px', background: '#fff', borderTop: '1px solid #eee', display: 'flex', gap: '15px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '15px',
                    borderRadius: '12px',
                    border: 'none',
                    background: loading ? '#ccc' : '#ED1C24',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: '0.3s',
                    boxShadow: loading ? 'none' : '0 8px 20px rgba(237, 28, 36, 0.3)'
                  }}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getCareers();
        if (res.data && Array.isArray(res.data.data)) {
          setJobs(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
        job={selectedJob}
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
              <div className="premium-header-box culture-header">
                <div className="header-accent-row">
                  <div className="header-accent-line"></div>
                  <span className="header-accent-tag">OUR CULTURE</span>
                </div>
                <h2 className="header-main-title">Work at the <span>Heart of Innovation</span></h2>
              </div>
              <div className="culture-text-content">
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
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="loader" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #ED1C24', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                <p style={{ marginTop: '20px', color: '#666' }}>Loading career opportunities...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '20px' }}>
                <i className="fas fa-briefcase" style={{ fontSize: '3rem', color: '#eee', marginBottom: '20px' }}></i>
                <h3 style={{ color: '#666' }}>No current openings available.</h3>
                <p style={{ color: '#999' }}>Check back later or send us your resume at info@prompttradefairs.com</p>
              </div>
            ) : (
              jobs.slice(0, visibleCount).map((job, idx) => (
                <motion.div
                  key={job._id || idx}
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
                  <div className="job-info-left" style={{ flex: '1.2' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: 0 }}>{job.jobRole}</h3>
                  </div>

                  <div className="job-info-center" style={{ flex: '2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px' }}>
                    <p style={{ margin: '0', color: '#444', fontSize: '14px', fontWeight: '600' }}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#ED1C24', width: '20px' }}></i>
                      <span style={{ color: '#888', fontWeight: '500', marginRight: '5px' }}>Location:</span> {job.location}
                    </p>
                    <p style={{ margin: '0', color: '#444', fontSize: '14px', fontWeight: '600' }}>
                      <i className="fas fa-clock" style={{ color: '#ED1C24', width: '20px' }}></i>
                      <span style={{ color: '#888', fontWeight: '500', marginRight: '5px' }}>Type:</span> {job.employmentType}
                    </p>
                    <p style={{ margin: '0', color: '#444', fontSize: '14px', fontWeight: '600' }}>
                      <i className="fas fa-building" style={{ color: '#ED1C24', width: '20px' }}></i>
                      <span style={{ color: '#888', fontWeight: '500', marginRight: '5px' }}>Mode:</span> {job.workMode}
                    </p>
                    <p style={{ margin: '0', color: '#444', fontSize: '14px', fontWeight: '600' }}>
                      <i className="fas fa-history" style={{ color: '#ED1C24', width: '20px' }}></i>
                      <span style={{ color: '#888', fontWeight: '500', marginRight: '5px' }}>Exp:</span> {job.experience}
                    </p>
                    <p style={{ margin: '0', color: '#444', fontSize: '14px', fontWeight: '600' }}>
                      <i className="fas fa-wallet" style={{ color: '#ED1C24', width: '20px' }}></i>
                      <span style={{ color: '#888', fontWeight: '500', marginRight: '5px' }}>Salary:</span> ₹{job.salary}
                    </p>
                    <p style={{ margin: '0', color: '#444', fontSize: '14px', fontWeight: '600' }}>
                      <i className="fas fa-users" style={{ color: '#ED1C24', width: '20px' }}></i>
                      <span style={{ color: '#888', fontWeight: '500', marginRight: '5px' }}>Openings:</span> {job.openings}
                    </p>
                  </div>

                  <div className="job-info-right" style={{ flex: '0.8', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="apply-btn-premium"
                      onClick={() => handleApplyClick(job)}
                      style={{
                        padding: '15px 35px',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#ED1C24',
                        color: '#fff',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 20px rgba(237, 28, 36, 0.2)',
                        fontSize: '15px'
                      }}
                    >
                      Apply <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                    </button>
                  </div>
                </motion.div>
              ))
            )}

            {jobs.length > visibleCount && (
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="premium-load-btn"
                  style={{
                    padding: '12px 50px',
                    borderRadius: '50px',
                    background: '#fff',
                    color: '#ED1C24',
                    border: '2px solid #ED1C24',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: '0.3s'
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#ED1C24'; e.target.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#ED1C24'; }}
                >
                  View More Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </main>
  );
};

export default Careers;

