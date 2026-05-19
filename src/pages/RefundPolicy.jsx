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
              <p style={{marginBottom: '30px'}}>
                Welcome to Prompt Trade Fairs India Private Limited. This Refund & Cancellation Policy governs cancellations, refunds, taxes, and related terms applicable to exhibitors participating in exhibitions organized by Prompt Trade Fairs India Private Limited (“Company”, “Organizer”, “we”, “our”, or “us”).
              </p>
              <p style={{marginBottom: '40px'}}>
                By booking exhibition space or participating in any event organized by the Company, the exhibitor (“Exhibitor”, “you”, or “your”) agrees to the terms set forth below.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', marginBottom: '20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>1. Cancellation & Refund Policy</h2>
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '20px', marginBottom: '10px'}}>1.1 Cancellation by Exhibitor</h3>
              <p style={{marginBottom: '20px'}}>
                Any request for cancellation of stall booking or participation must be submitted in writing via email or official correspondence to the Organizer.
              </p>
              <p style={{marginBottom: '20px'}}>
                Refunds and cancellation charges shall be applicable as follows:
              </p>

              <table style={{width: '100%', marginBottom: '30px', background: '#f8f9fa', borderRadius: '15px', overflow: 'hidden', borderCollapse: 'collapse'}}>
                 <thead>
                    <tr style={{background: '#ED1C24', color: '#fff', textAlign: 'left'}}>
                       <th style={{padding: '15px 25px'}}>Cancellation Period Before Exhibition Date</th>
                       <th style={{padding: '15px 25px'}}>Cancellation Charges Payable by Exhibitor</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>Up to 60 days before the exhibition</td>
                       <td style={{padding: '15px 25px'}}>20% of the total booked amount</td>
                    </tr>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>Up to 45 days before the exhibition</td>
                       <td style={{padding: '15px 25px'}}>40% of the total booked amount</td>
                    </tr>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>Up to 30 days before the exhibition</td>
                       <td style={{padding: '15px 25px'}}>50% of the total booked amount</td>
                    </tr>
                    <tr style={{borderBottom: '1px solid #eee'}}>
                       <td style={{padding: '15px 25px'}}>Less than 29 days before the exhibition</td>
                       <td style={{padding: '15px 25px'}}>100% of the total booked amount</td>
                    </tr>
                 </tbody>
              </table>

              <p style={{marginBottom: '35px'}}>
                Any refund, where applicable, shall be processed after deduction of the applicable cancellation charges and administrative expenses.
              </p>

              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '25px', marginBottom: '10px'}}>1.2 Non-Transferability</h3>
              <p style={{marginBottom: '35px'}}>
                Stall bookings, participation rights, or allocated exhibition spaces shall not be transferred, assigned, sublicensed, or resold to any third party without prior written approval from the Organizer.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Taxes & Statutory Charges</h2>
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '20px', marginBottom: '10px'}}>2.1 Tax Liability</h3>
              <p style={{marginBottom: '20px'}}>
                All exhibitors shall be solely responsible for payment of any applicable taxes, duties, levies, or statutory charges arising in connection with their participation in the exhibition.
              </p>
              <p style={{marginBottom: '35px'}}>
                Unless expressly stated otherwise, all fees, charges, and quotations provided by the Organizer are exclusive of applicable Goods and Services Tax (GST) and other statutory taxes.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>3. Termination of Participation</h2>
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '20px', marginBottom: '10px'}}>3.1 Organizer’s Right to Terminate</h3>
              <p style={{marginBottom: '15px'}}>
                The Organizer reserves the right to suspend or terminate an Exhibitor’s participation, without liability or refund, in the event of:
              </p>
              <ul style={{paddingLeft: '20px', marginBottom: '20px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Breach of the exhibitor agreement or applicable terms and conditions;</li>
                <li style={{marginBottom: '8px'}}>Non-payment of dues within stipulated timelines;</li>
                <li style={{marginBottom: '8px'}}>Violation of exhibition rules, policies, or applicable laws;</li>
                <li style={{marginBottom: '8px'}}>Any conduct deemed detrimental to the reputation, safety, or operations of the exhibition.</li>
              </ul>
              <p style={{marginBottom: '35px'}}>
                The Organizer’s decision in such matters shall be final and binding.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>4. Modification of Terms</h2>
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '20px', marginBottom: '10px'}}>4.1 Changes to Refund Policy</h3>
              <p style={{marginBottom: '20px'}}>
                Prompt Trade Fairs India Private Limited reserves the right to amend, modify, or update this Refund & Cancellation Policy at any time without prior notice.
              </p>
              <p style={{marginBottom: '35px'}}>
                Any revised terms shall become effective upon publication on the Company’s official website or upon written communication to exhibitors.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>5. Force Majeure</h2>
              <p style={{marginBottom: '20px'}}>
                The Organizer shall not be held liable for cancellation, postponement, delay, or modification of any exhibition arising from events beyond reasonable control, including but not limited to natural disasters, government restrictions, pandemics, labor disputes, fire, war, terrorism, civil unrest, or other force majeure events.
              </p>
              <p style={{marginBottom: '35px'}}>
                In such circumstances, the Organizer reserves the right to reschedule the exhibition or adjust participation terms at its discretion.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>6. Contact Information</h2>
              <p style={{marginBottom: '25px'}}>
                For any questions, refund requests, or concerns regarding this Refund & Cancellation Policy, please contact:
              </p>

              <div className="legal-contact-box" style={{marginTop: '40px', background: '#f8f9fa', padding: '40px', borderRadius: '20px', borderLeft: '5px solid #ED1C24'}}>
                 <h4 style={{fontSize: '1.4rem', fontWeight: '800', marginBottom: '25px', color: '#111'}}>Prompt Trade Fairs India Private Limited</h4>
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
                     <span className="label">Email ID<span className="colon">:</span></span>
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

export default RefundPolicy;
