import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const RegisterNow = () => {
  return (
    <main className="register-page-v3" style={{ background: '#f8f9fa', paddingTop: '80px' }}>
      <section className="about-v3-hero" style={{ backgroundImage: "url('/site-banner.png')", minHeight: '300px' }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container" style={{ paddingTop: '80px' }}>
          <div className="v3-hero-content">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">Register Now</span>
              </div>
              <h1 className="v3-hero-title">Space Booking <span>Enquiry</span></h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '20px 0 0', fontSize: '1.1rem' }}>
                Join the league of successful exhibitors. Book your space today and scale your business with Prompt Trade Fairs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111', marginBottom: '30px' }}>
                Why Exhibit <br /><span style={{ color: '#ED1C24' }}>With Us?</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {[
                  { title: "Targeted Audience", desc: "Reach thousands of qualified B2B and B2C buyers.", icon: "fa-users" },
                  { title: "Brand Authority", desc: "Position your brand alongside industry leaders.", icon: "fa-award" },
                  { title: "High ROI", desc: "Cost-effective marketing with immediate sales opportunities.", icon: "fa-chart-line" }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fcf2f2', color: '#ED1C24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 5px', fontWeight: '800', fontSize: '1.1rem' }}>{item.title}</h4>
                      <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '50px', padding: '30px', background: '#ED1C24', borderRadius: '20px', color: '#fff' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>Need Assistance?</h3>
                <p style={{ margin: '15px 0 25px', opacity: '0.9' }}>Our support team is available 24/7 to help you with the booking process.</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <a href="tel:+914442142483" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>
                    <i className="fas fa-phone-alt"></i> +91 44 4214 2483
                  </a>
                  <a href="mailto:project2@prompttradefairs.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>
                    <i className="fas fa-envelope"></i> Email Us
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ background: '#fff', padding: '10px', borderRadius: '25px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}
            >
              <EnquiryForm hideHeader={true} customClass="full-page-register" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterNow;
