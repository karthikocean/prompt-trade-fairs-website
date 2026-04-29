import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const Contact = () => {
  const regionalOffices = [
    {
      city: "Coimbatore",
      address: "54 D, 1st Floor, Jayavarthanavelu Nagar, Masakkalipalayam Road, Peelamedu, Coimbatore – 641004.",
      mobile: "091500 86485"
    },
    {
      city: "Madurai",
      address: "# 279, 1st, East Main Road, Anna Nagar, Madurai – 625020.",
      mobile: "078457 69319"
    },
    {
      city: "Erode",
      address: "Room No.204, 205-Second Floor, No.102/3, Chinna Sengodampalayam, Perundurai Main Road, Nachimuthu Complex (Above Union Bank of India), Erode – 638012.",
      mobile: "93620 50255"
    },
    {
      city: "Trichy",
      address: "No. 135, Ponnagar, Trichy – 620001. Landmark: Adjacent Swarna Vinayagar Temple.",
      mobile: "93620 50255"
    }
  ];

  return (
    <main className="contact-v3-main">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/contactusbanner.svg')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="v3-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span className="current">Contact Us</span></div>
              <h1 className="v3-hero-title">Connect With <span>Our Experts</span></h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MESSAGE & MAP SECTION (CENTERED HEADINGS) */}
      <section className="contact-form-v3" style={{ background: '#f8f9fa', padding: '60px 0' }}>
        <div className="container">
          <div className="premium-header-box centered" style={{ marginBottom: '40px' }}>
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">MESSAGE US</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Send Us a <span>Requirement</span></h2>
            <p style={{ marginTop: '20px', color: '#666', maxWidth: '700px', margin: '20px auto 0', fontSize: '1.1rem' }}>
              Ready to scale your business at our next event? Fill out the form below and one of our specialists will get back to you shortly.
            </p>
          </div>

          <div className="about-story-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '60px', alignItems: 'stretch' }}>
            <div className="story-content-left" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="map-frame-v3" style={{ flex: 1, borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #fff', height: '100%' }}>
                <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6366014496!2d80.203063!3d12.923164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d88669e4695%3A0xe54d86b72a6b0c2a!2sKamatchi%20Hospital!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, minHeight: '300px' }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
            <div className="contact-form-card" style={{ background: '#fff', padding: '25px', borderRadius: '30px', border: '1px solid #eee', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="form-header" style={{ marginBottom: '20px', textAlign: 'center' }}><span style={{ fontSize: '11px', letterSpacing: '2px', color: '#ED1C24', fontWeight: '800' }}>CONTACT FORM</span><h3 style={{ fontSize: '1.6rem', fontWeight: '900', marginTop: '10px' }}>Get in Touch</h3></div>
              <EnquiryForm title="" isSimplified={true} customClass="contact-enquiry-form" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. HEAD OFFICE SECTION (CENTERED HEADING) */}
      <section className="contact-info-v3" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="premium-header-box centered" style={{ marginBottom: '60px' }}>
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">MAIN HUB</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Our <span>Head Office</span></h2>
          </div>

          <div className="v3-initiatives-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              {
                title: "Physical Address",
                desc: "2nd Floor, 324, Prompt Tower, Ram Nagar South Extension, 12th Street, Kamatchi Hospital, Chennai, Tamil Nadu – 600100",
                icon: "fa-map-marker-alt",
                label: "LOCATE US"
              },
              {
                title: "Call Support",
                desc: "Phone: +91 44 4214 2483\nMobile: +91 93913 91162\nMobile: +91 99410 08371",
                icon: "fa-phone-alt",
                label: "TALK TO US"
              },
              {
                title: "Email Inquiry",
                desc: "project2@prompttradefairs.com\nprompttradefairs@gmail.com",
                icon: "fa-envelope-open-text",
                label: "WRITE TO US"
              }
            ].map((item, idx) => (
              <motion.div key={idx} className="v3-initiative-card" whileHover={{ y: -10 }} style={{ minHeight: '320px' }}>
                <div className="v3-card-border"></div>
                <div className="v3-card-content">
                  <div className="card-top"><div className="card-icon" style={{ color: '#ED1C24', fontSize: '1.8rem' }}><i className={`fas ${item.icon}`}></i></div></div>
                  <div className="card-line" style={{ height: '2px', background: '#ED1C24', width: '30px', margin: '20px 0' }}></div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{item.desc}</p>
                </div>
                <span className="v3-card-bottom-text" style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '10px', fontWeight: '800', opacity: '0.3', letterSpacing: '2px' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGIONAL OFFICES GRID SECTION (4 CARDS PER ROW) */}
      <section className="regional-offices-v3" style={{ padding: '60px 0', background: '#fcfcfc', borderTop: '1px solid #f0f0f0' }}>
        <div className="container">
          <div className="premium-header-box centered" style={{ marginBottom: '40px' }}>
            <div className="header-accent-row"><div className="header-accent-line"></div><span className="header-accent-tag">NETWORK</span><div className="header-accent-line"></div></div>
            <h2 className="header-main-title">Regional <span>Offices</span></h2>
          </div>

          <div className="regional-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginTop: '60px' }}>
            {regionalOffices.map((office, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} style={{ background: '#fff', padding: '35px', borderRadius: '25px', border: '1px solid #eee', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '100px', color: '#ED1C24', opacity: '0.04', fontWeight: '900', zIndex: '0' }}><i className="fas fa-building"></i></div>
                <div style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
    </main>
  );
};

export default Contact;
