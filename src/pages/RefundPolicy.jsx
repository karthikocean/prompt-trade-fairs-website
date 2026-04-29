import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
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
                <Link to="/">Home</Link> <span>/</span> <span className="current">Refund Policy</span>
              </div>
              <h1 className="v3-hero-title">Refund <span>Policy</span></h1>
              <p className="v3-hero-subtitle" style={{color: '#fff', opacity: '0.8', maxWidth: '600px', marginTop: '15px'}}>
                Rules and regulations regarding cancellations and financial refunds for Prompt Trade Fairs India Private Limited.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="legal-content-section" style={{padding: '100px 0', background: '#fff'}}>
        <div className="container" style={{maxWidth: '900px'}}>
           <div className="legal-doc-wrap" style={{lineHeight: '1.8', color: '#444'}}>
              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', marginBottom: '30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>1. Cancellation and Refunds</h2>
              <p style={{marginBottom: '20px'}}>
                Exhibitors who wish to cancel their participation must notify in writing. The cancellation policy, including any applicable refund provisions, is outlined in the exhibitor agreement.
              </p>

              <table style={{width: '100%', marginBottom: '30px', background: '#f8f9fa', borderRadius: '15px', overflow: 'hidden', borderCollapse: 'collapse'}}>
                 <thead>
                    <tr style={{background: '#ED1C24', color: '#fff', textAlign: 'left'}}>
                       <th style={{padding: '15px 25px'}}>Duration (Days before Exhibition)</th>
                       <th style={{padding: '15px 25px'}}>Cancellation Charge</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>Up to 29 Days</td>
                       <td style={{padding: '15px 25px'}}>100% of booked amount</td>
                    </tr>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>30 to 44 Days</td>
                       <td style={{padding: '15px 25px'}}>50% of booked amount</td>
                    </tr>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>45 to 59 Days</td>
                       <td style={{padding: '15px 25px'}}>40% of booked amount</td>
                    </tr>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>Before 60 Days</td>
                       <td style={{padding: '15px 25px'}}>20% of booked amount</td>
                    </tr>
                 </tbody>
              </table>

              <p style={{marginBottom: '30px'}}>Stall booking cannot be transferred to a third party without permission from the organizer in writing.</p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '60px 0 30px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Taxes & Termination</h2>
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.1 Tax Responsibility:</h3>
              <p style={{marginBottom: '20px'}}>Exhibitors are responsible for any applicable taxes related to their participation in Prompt Trade Fairs Exhibitions. All fees quoted are exclusive of taxes unless otherwise specified.</p>

              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.2 Termination:</h3>
              <p style={{marginBottom: '20px'}}>Prompt Trade Fairs India Private Limited reserves the right to terminate an exhibitor's participation if there is a material breach of the exhibitor agreement or contract.</p>

              <div className="legal-contact-box" style={{marginTop: '80px', background: '#f8f9fa', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #ED1C24'}}>
                 <h4 style={{fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px'}}>Contact Us Regarding Refunds</h4>
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

export default RefundPolicy;
