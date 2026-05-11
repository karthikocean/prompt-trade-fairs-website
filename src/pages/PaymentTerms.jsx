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
                Guidelines and obligations regarding financial transactions with Prompt Trade Fairs India Private Limited.
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
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>1.1 Exhibitor Fees:</h3>
              <p style={{marginBottom: '20px'}}>By participating in Prompt Exhibition, exhibitors agree to pay the designated fees outlined in the exhibitor agreement or contract.</p>

              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>1.2 Payment Schedule:</h3>
              <ul style={{paddingLeft: '20px', marginBottom: '30px'}}>
                <li>Payment for exhibitor fees shall be made according to the following schedule:</li>
                <li>The contract form must be accompanied with minimum 50% payment of stall charges as advance payment.</li>
                <li>Balance payment for stall, charges for additional furniture, spotlights or other facilities must be paid in full before the start of the exhibition.</li>
                <li>Possession of stalls will be given only if stall charges have been paid in full.</li>
                <li>All payments must be made by DD/Crossed Cheque in favour of <strong>Prompt Trade Fairs (India) Pvt Ltd</strong> Payable at Chennai.</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Additional Costs</h2>
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.1 Additional Services:</h3>
              <p style={{marginBottom: '20px'}}>
                Any additional services requested by exhibitors beyond the standard booth package may result in additional fees. These fees will be communicated to exhibitors and agreed upon before the provision of additional services.
              </p>

              <div className="legal-contact-box" style={{marginTop: '80px', background: '#f8f9fa', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #ED1C24'}}>
                 <h4 style={{fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px'}}>Need Assistance?</h4>
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

export default PaymentTerms;
