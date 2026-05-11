import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <main className="legal-page-v3">
      {/* PREMIUM HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/site-banner.png')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">Privacy Policy</span>
              </div>
              <h1 className="v3-hero-title">Privacy <span>Policy</span></h1>
              <p className="v3-hero-subtitle" style={{color: '#fff', opacity: '0.8', maxWidth: '600px', marginTop: '15px'}}>
                Your privacy is our priority. This document outlines how we protect and handle your information at Prompt Trade Fairs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="legal-content-section" style={{padding: '100px 0', background: '#fff'}}>
        <div className="container" style={{maxWidth: '900px'}}>
           <div className="legal-doc-wrap" style={{lineHeight: '1.8', color: '#444'}}>
              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', marginBottom: '30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>1. Introduction</h2>
              <p style={{marginBottom: '30px'}}>
                Welcome to <strong>Prompt Trade Fairs India Private Limited</strong>. This Privacy Policy outlines how we collect, use, disclose, and protect personal information during our trade fair events and through our digital platforms.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Information We Collect</h2>
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.1 Personal Information:</h3>
              <p style={{marginBottom: '10px'}}>We may collect the following personal information from attendees, exhibitors, and participants:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px'}}>
                <li>Full name and Job title.</li>
                <li>Contact information (email address, phone number).</li>
                <li>Company and organization details.</li>
                <li>Photographs or video recordings captured during the event.</li>
              </ul>

              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.2 Additional Information:</h3>
              <p style={{marginBottom: '30px'}}>We may also collect information related to booth locations, session attendance, and specific event preferences.</p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>3. Use of Information</h2>
              <p style={{marginBottom: '10px'}}>We use the collected information for various purposes, including but not limited to:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px'}}>
                <li>Event registration and communication.</li>
                <li>Providing access to trade fair services and resources.</li>
                <li>Analyzing attendance patterns for event improvement.</li>
                <li>Promoting future trade fair events and industrial networking opportunities.</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>4. Photography and Videography</h2>
              <p style={{marginBottom: '30px'}}>
                Photographs and video recordings may be taken during the event for promotional and marketing purposes. Participants who do not wish to be included should notify the event organizers in writing before the event starts.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>5. Security & Contact</h2>
              <p style={{marginBottom: '30px'}}>
                We implement reasonable security measures to protect participant information from unauthorized access, disclosure, or alteration.
              </p>

              <div className="legal-contact-box" style={{marginTop: '80px', background: '#f8f9fa', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #ED1C24'}}>
                 <h4 style={{fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px'}}>Contact Us Regarding Privacy</h4>
                 <p style={{margin: '5px 0'}}><strong>Website:</strong> www.prompttradefairs.com</p>
                 <p style={{margin: '5px 0'}}><strong>Contact Number:</strong> +91 95436 58094</p>
                 <p style={{margin: '5px 0'}}><strong>Email ID:</strong> mktg@prompttradefairs.com</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
