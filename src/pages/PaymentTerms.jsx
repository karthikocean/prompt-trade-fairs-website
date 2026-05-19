import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PaymentTerms = () => {
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
                <Link to="/">Home</Link> <span>/</span> <span className="current">Payment Terms</span>
              </div>
              <h1 className="v3-hero-title">Payment <span>Terms</span></h1>
              <p className="v3-hero-subtitle" style={{color: '#fff', opacity: '0.8', maxWidth: '600px', marginTop: '15px'}}>
                Prompt Trade Fairs (India) Private Limited
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="legal-content-section" style={{padding: '100px 0', background: '#fff'}}>
        <div className="container" style={{maxWidth: '900px'}}>
           <div className="legal-doc-wrap" style={{lineHeight: '1.8', color: '#444'}}>
             

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', marginBottom: '30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>1. Payment Obligations</h2>
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>1.1 Exhibitor Participation Charges</h3>
              <p style={{marginBottom: '20px'}}>
                By participating in exhibitions organized by Prompt Trade Fairs India Private Limited, exhibitors agree to pay all applicable participation and stall charges as specified in the official Exhibitor Agreement or Contract Form.
              </p>

              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>1.2 Payment Schedule</h3>
              <ul style={{paddingLeft: '20px', marginBottom: '30px'}}>
                <li style={{marginBottom: '10px'}}>A minimum advance payment of 50% of the total stall charges must accompany the duly completed Contract Form at the time of booking confirmation.</li>
                <li style={{marginBottom: '10px'}}>The remaining balance towards stall charges, along with charges for additional facilities such as furniture, spotlights, electrical fittings, branding, or any other requested services, must be paid in full prior to the commencement of the exhibition.</li>
                <li style={{marginBottom: '10px'}}>Possession and allotment of exhibition stalls will be granted only upon receipt of full payment.</li>
                <li style={{marginBottom: '10px'}}>All payments must be made through Demand Draft or Bank Transfer (IMPS, UPI, NEFT) in favour of <strong>Prompt Trade Fairs (India) Pvt. Ltd.</strong>, payable at Chennai.</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Additional Charges</h2>
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.1 Additional Services and Facilities</h3>
              <p style={{marginBottom: '20px'}}>
                Any additional services or facilities requested by exhibitors beyond the standard stall package may attract supplementary charges.
              </p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px'}}>
                <li style={{marginBottom: '10px'}}>Applicable charges will be communicated in advance.</li>
                <li style={{marginBottom: '10px'}}>Services will be provided only upon confirmation and acceptance of the additional charges by the exhibitor.</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>3. Contact Information</h2>
              <p style={{marginBottom: '20px'}}>
                For any clarification or assistance regarding payment terms, please contact:
              </p>

              <div className="legal-contact-box" style={{marginTop: '40px', background: '#f8f9fa', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #ED1C24'}}>
                 <h4 style={{fontSize: '1.4rem', fontWeight: '800', marginBottom: '25px', color: '#111'}}>Need Assistance?</h4>
                 <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                   <div className="legal-contact-item">
                     <span className="label">Website<span className="colon">:</span></span>
                     <a href="https://www.prompttradefairs.com" target="_blank" rel="noopener noreferrer" className="value">www.prompttradefairs.com</a>
                   </div>
                   <div className="legal-contact-item">
                     <span className="label">Contact Number<span className="colon">:</span></span>
                     <a href="tel:+919543668094" className="value">+91 95436 68094</a>
                   </div>
                   <div className="legal-contact-item">
                     <span className="label">Email<span className="colon">:</span></span>
                     <a href="mailto:mktg@prompttradefairs.com" className="value">mktg@prompttradefairs.com</a>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentTerms;
