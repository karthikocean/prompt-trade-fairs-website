import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createContactEnquiry } from '../api/common.api';
import toast from 'react-hot-toast';


const Contact = () => {
  const regionalOffices = [
    {
      // city: "Coimbatore",
      // address: "54 D, 1st Floor, Jayavarthanve...",
      // mobile: "+91 91500 86485"
    },
    {
      // city: "Madurai",
      // address: "# 279, 1st, East Main Road, Anna Nagar, Madurai – 625020.",
      // mobile: "+91 78457 69319"
    },
    {
      // city: "Erode",
      // address: "Room No.204, 205-Second Floor, No.102/3, ...",
      // mobile: "+91 93620 50255"
    }
  ];

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", isAuthorized: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      // Only allow letters and spaces
      if (value !== "" && !/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
    }

    if (name === "phone") {
      // Only allow digits and max 10 characters
      if (value !== "" && !/^\d*$/.test(value)) {
        return;
      }
      if (value.length > 10) {
        return;
      }
    }

    const val = type === "checkbox" ? checked : value;

    setFormData(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.isAuthorized) {
      newErrors.isAuthorized = "Please check this box to authorize contact.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createContactEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message.trim() || "No message provided."
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", isAuthorized: false });
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-v3-main">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/aboutusbanner.png')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container" style={{ overflow: "hidden" }}>
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Contact Us</span></div>
              <h1 className="v3-hero-title">Connect With <span>Our Experts</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MESSAGE & MAP SECTION (CENTERED HEADINGS) */}
      <section
        className="contact-form-v3"
        style={{ background: "#f8f9fa", padding: "60px 0" }}
      >
        <div className="container">
          <div
            className="premium-header-box centered"
            style={{ marginBottom: "40px" }}
          >
            <div className="header-accent-row">
              <div className="header-accent-line"></div>
              <span
                className="header-accent-tag"
                style={{
                  color: "#ED1C24",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  fontSize: "13.5px",
                }}
              >
                MESSAGE US
              </span>
              <div className="header-accent-line"></div>
            </div>

            <h2 className="header-main-title" style={{ fontSize: "2rem" }}>
              Send us a Requirement
            </h2>

            <p
              style={{
                marginTop: "20px",
                maxWidth: "700px",
                margin: "20px auto 0",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Ready to scale your business at our next event? Fill out the form
              below and one of our specialists will get back to you shortly.
            </p>
          </div>

          <div
            className="about-story-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
              gap: "30px",
              alignItems: "stretch",
            }}
          >
            {/* MAP */}
            <div
              className="story-content-left"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                className="map-container"
                style={{
                  height: "100%",
                  flex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginTop: "20px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  // Removed fixed height, added flex:1 for equal height
                }}
              >
                <iframe
                  title="Prompt Trade Fairs Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3429612453842!2d80.2036651748409!3d12.949892487363483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526640c18ace93%3A0x8985bc973dfc2262!2sPrompt%20Trade%20Fairs%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1781759792753!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    flex: 1,
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Prompt+Trade+Fairs+India+Private+Limited/@12.9498925,80.2036652,17z"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "12px",
                  color: "#ED1C24",
                  fontWeight: "700",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                <i className="fas fa-external-link-alt" style={{ fontSize: "12px" }}></i>
                Open in Google Maps
              </a>
            </div>

            {/* FORM */}
            <div
              className="contact-form-card"
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "30px",
                border: "1px solid #eee",
                // height: "550px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                // Removed fixed height, added flex:1 for equal height
              }}
            >
              <div
                className="form-header"
                style={{
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    color: "#ED1C24",
                    fontWeight: "800",
                  }}
                >
                  CONTACT FORM
                </span>

                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "900",
                    marginTop: "10px",
                  }}
                >
                  Get in Touch
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flexGrow: 1,
                  textAlign: "left",
                }}
              >
                {/* Name */}
                <div className="form-group">
                  <label>Name *</label>

                  <div style={{ position: "relative" }}>
                    <i
                      className="fas fa-user"
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#ED1C24",
                        zIndex: 1
                      }}
                    />

                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "48px",
                        paddingLeft: "45px",
                        border: errors.name
                          ? "1px solid #ED1C24"
                          : "1px solid #ddd",
                        borderRadius: "8px"
                      }}
                    />
                  </div>

                  {errors.name && (
                    <span
                      style={{
                        color: "#ED1C24",
                        fontSize: "12px",
                        marginTop: "5px",
                        display: "block"
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label
                    style={{
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#111",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    Email
                  </label>

                  <div style={{ position: "relative" }}>
                    <i
                      className="fas fa-envelope"
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#ED1C24",
                        zIndex: 1,
                      }}
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "48px",
                        paddingLeft: "45px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label
                    style={{
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#111",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    Phone *
                  </label>

                  <div style={{ position: "relative" }}>
                    <i
                      className="fas fa-phone-alt"
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#ED1C24",
                        zIndex: 1,
                      }}
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "48px",
                        paddingLeft: "45px",
                        border: errors.phone ? "1px solid #ED1C24" : "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <span
                      style={{
                        color: "#ED1C24",
                        fontSize: "12px",
                        marginTop: "5px",
                        display: "block"
                      }}
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>

                <label style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#111",
                  display: "block",
                  textAlign: "left",
                }}>Message</label>
                <div style={{ position: "relative" }}>
                  <i
                    className="fas fa-comment"
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "20px",
                      color: "#ED1C24",
                      fontSize: "16px",
                      lineHeight: "1",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "15px 15px 15px 45px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "16px",
                      lineHeight: "24px",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Authorization Checkbox */}
                <div style={{ marginTop: "10px", marginBottom: "5px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "13px",
                      color: "#444",
                      lineHeight: "1.5",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="isAuthorized"
                      checked={formData.isAuthorized}
                      onChange={handleChange}
                      style={{
                        marginTop: "3px",
                        width: "18px",
                        height: "18px",
                        accentColor: "#ED1C24",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    />
                    <span>
                      I authorise Prompt Trade Fairs India Private Limited &amp; its representatives to contact me with updates and notifications via Email/SMS/RCS/WhatsApp/Call. This will override DND/NDNC. <span style={{ color: "#ED1C24", fontWeight: "bold" }}>*</span>
                    </span>
                  </label>
                  {errors.isAuthorized && (
                    <span
                      style={{
                        color: "#ED1C24",
                        fontSize: "12px",
                        marginTop: "6px",
                        display: "block",
                        textAlign: "left",
                      }}
                    >
                      {errors.isAuthorized}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    alignSelf: "center",
                    padding: "14px 35px",
                    background: "#ED1C24",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HEAD OFFICE SECTION (CENTERED HEADING) */}
      <section className="contact-info-v3" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="premium-header-box centered" style={{ marginBottom: '60px' }}>
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">MAIN HUB</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Our Head Office</h2>
          </div>

          <div className="v3-initiatives-grid">
            {[
              {
                title: "Corporate Office",
                desc: "Prompt Tower, Plot No : 324, Ram Nagar South Extn 12th Street, Off Radial Road, Pallikaranai, Chennai - 600 100.",
                icon: "fa-map-marker-alt",
                // label: "LOCATE US"
              },
              {
                title: "Call Support",
                desc: "+91 95436 68094\n+91 93913 91162\n+91 78457 69348",
                icon: "fa-phone-alt",
                // label: "TALK TO US"
              },
              {
                title: "Email Inquiry",
                desc: "prompttradefairs@gmail.com\nproject2@prompttradefairs.com",
                icon: "fa-envelope-open-text",
                // label: "WRITE TO US"
              }
            ].map((item, idx) => (
              <motion.div key={idx} className="v3-initiative-card" whileHover={window.innerWidth > 991 ? { y: -10 } : {}} style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
                <div className="v3-card-border"></div>
                <div className="v3-card-content">
                  <div className="card-top" style={{ display: 'flex', justifyContent: 'center' }}><div className="card-icon" style={{ color: '#ED1C24', fontSize: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><i className={`fas ${item.icon}`}></i></div></div>
                  <div className="card-line" style={{ height: '2px', background: '#ED1C24', width: '30px', margin: '20px auto' }}></div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px' }}>{item.title}</h3>
                  <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{item.desc}</p>
                </div>
                <span className="v3-card-bottom-text" style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '10px', fontWeight: '800', opacity: '0.3', letterSpacing: '2px' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGIONAL OFFICES GRID SECTION - COMMENTED OUT
      <section className="regional-offices-v3" style={{ padding: '60px 0', background: '#fcfcfc', borderTop: '1px solid #f0f0f0' }}>
        <div className="container">
          <div className="premium-header-box centered" style={{ marginBottom: '40px' }}>
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">NETWORK</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Regional <span>Offices</span></h2>
          </div>
          <div className="regional-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '60px' }}>
            {regionalOffices.map((office, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} style={{ background: '#fff', padding: '35px', borderRadius: '25px', border: '1px solid #eee', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '100px', color: '#ED1C24', opacity: '0.04', fontWeight: '900', zIndex: '0' }}><i className="fas fa-building"></i></div>
                <div style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>

                  <h3 style={{ color: '#ED1C24', fontSize: '1.3rem', fontWeight: '900', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>{office.city}</h3>
                  <div style={{ width: '30px', height: '3px', background: '#ED1C24', marginBottom: '20px' }}></div>
                  <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>{office.address}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#111', fontWeight: '800', fontSize: '0.95rem', whiteSpace: 'nowrap', lineHeight: '1.2', marginTop: 'auto' }}>
                    <i className="fas fa-phone-alt" style={{ color: '#ED1C24' }}></i>
                    <span>{office.mobile}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}
    </main>
  );
};

export default Contact;
