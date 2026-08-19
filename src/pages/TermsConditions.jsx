import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
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
                <Link to="/">Home</Link> <span>/</span> <span className="current">Terms &amp; Conditions</span>
              </div>
              <h1 className="v3-hero-title">Terms &amp; <span>Conditions</span></h1>
              <p className="v3-hero-subtitle" style={{color: '#fff', opacity: '0.8', maxWidth: '600px', marginTop: '15px'}}>
                Prompt Trade Fairs (India) Private Limited
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="legal-content-section" style={{padding: '100px 0', background: '#fff'}}>
        <div className="container">
           <div className="legal-doc-wrap" style={{lineHeight: '1.8', color: '#444'}}>
              
              <p style={{fontSize: '1.05rem', marginBottom: '35px', background: '#fdf2f2', padding: '20px 25px', borderRadius: '12px', borderLeft: '4px solid #ED1C24'}}>
                Welcome to the website of <strong>Prompt Trade Fairs (India) Private Limited</strong> (“Prompt Trade Fairs”, “we”, “us” or “our”). By accessing or using <a href="https://www.prompttradefairs.com" target="_blank" rel="noopener noreferrer" style={{color: '#ED1C24', fontWeight: '600'}}>www.prompttradefairs.com</a>, you agree to comply with and be bound by the following Terms &amp; Conditions.
              </p>

              {/* 1. Use of Website */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                1. Use of Website
              </h2>
              <p style={{marginBottom: '15px'}}>
                This website provides information about our exhibitions, trade fairs, events, exhibitor participation, stall bookings and related services.
              </p>
              <p style={{marginBottom: '30px'}}>
                You agree to use this website only for lawful purposes and must not misuse, copy, modify, reproduce or distribute any website content without our prior written permission.
              </p>

              {/* 2. Event & Exhibition Information */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                2. Event &amp; Exhibition Information
              </h2>
              <p style={{marginBottom: '15px'}}>
                We make reasonable efforts to ensure that event details, dates, venues, timings, participation fees and other information published on the website are accurate.
              </p>
              <p style={{marginBottom: '30px'}}>
                However, Prompt Trade Fairs reserves the right to modify, postpone, reschedule or cancel an event, venue, schedule or programme due to operational, regulatory, safety, venue or circumstances beyond our reasonable control.
              </p>

              {/* 3. Registration & Stall Booking */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                3. Registration &amp; Stall Booking
              </h2>
              <p style={{marginBottom: '15px'}}>
                Submitting an enquiry or registration form does not guarantee event participation or stall allocation.
              </p>
              <p style={{marginBottom: '15px'}}>
                Participation and stall booking are subject to availability, acceptance by Prompt Trade Fairs, completion of required documentation and receipt of applicable payments.
              </p>
              <p style={{marginBottom: '30px'}}>
                Stall allocation shall be determined by Prompt Trade Fairs and may be changed where reasonably required.
              </p>

              {/* 4. Payments */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                4. Payments
              </h2>
              <p style={{marginBottom: '15px'}}>
                All payments must be made according to the payment schedule communicated for the respective exhibition or service.
              </p>
              <p style={{marginBottom: '15px'}}>
                Applicable taxes, including GST, shall be charged wherever applicable.
              </p>
              <p style={{marginBottom: '30px'}}>
                Failure to make payments within the specified timeline may result in cancellation or suspension of participation, subject to the applicable event terms.
              </p>

              {/* 5. Cancellation & Refund */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                5. Cancellation &amp; Refund
              </h2>
              <p style={{marginBottom: '15px'}}>
                Cancellation and refund requests will be governed by the <Link to="/refund-policy" style={{color: '#ED1C24', fontWeight: '700', textDecoration: 'underline'}}>Refund &amp; Cancellation Policy</Link> and the specific terms applicable to the respective event.
              </p>
              <p style={{marginBottom: '30px'}}>
                Event-specific agreements or written commercial terms may contain additional cancellation and refund conditions.
              </p>

              {/* 6. Exhibitor Responsibility */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                6. Exhibitor Responsibility
              </h2>
              <p style={{marginBottom: '15px'}}>
                Exhibitors are responsible for the accuracy of the information and documents submitted by them and for complying with all applicable laws, licences, permissions, venue rules and exhibition guidelines.
              </p>
              <p style={{marginBottom: '15px'}}>
                Prompt Trade Fairs is not responsible for the quality, legality, authenticity or performance of products or services displayed by exhibitors.
              </p>
              <p style={{marginBottom: '30px'}}>
                Any transaction between exhibitors and visitors shall be solely between the respective parties.
              </p>

              {/* 7. Intellectual Property */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                7. Intellectual Property
              </h2>
              <p style={{marginBottom: '15px'}}>
                All content on this website, including text, logos, photographs, graphics, videos, designs, event names and other materials, is owned by or licensed to Prompt Trade Fairs and is protected by applicable intellectual property laws.
              </p>
              <p style={{marginBottom: '30px'}}>
                Unauthorised copying, reproduction, distribution or commercial use is prohibited.
              </p>

              {/* 8. Photography & Promotion */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                8. Photography &amp; Promotion
              </h2>
              <p style={{marginBottom: '30px'}}>
                Photography and videography may be carried out during our exhibitions and events. Such photographs and recordings may be used for event documentation, promotional activities, websites, social media and other marketing purposes.
              </p>

              {/* 9. Third-Party Links */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                9. Third-Party Links
              </h2>
              <p style={{marginBottom: '30px'}}>
                Our website may contain links to third-party websites or services. Prompt Trade Fairs is not responsible for the content, availability, security or privacy practices of such third-party websites.
              </p>

              {/* 10. Limitation of Liability */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                10. Limitation of Liability
              </h2>
              <p style={{marginBottom: '30px'}}>
                Prompt Trade Fairs shall not be liable for indirect, incidental or consequential losses arising from the use of this website, participation in an event, actions of third parties, technical interruptions or circumstances beyond our reasonable control.
              </p>

              {/* 11. Force Majeure */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                11. Force Majeure
              </h2>
              <p style={{marginBottom: '30px'}}>
                Prompt Trade Fairs shall not be responsible for any delay, postponement, cancellation or failure to perform its obligations caused by circumstances beyond its reasonable control, including natural disasters, government restrictions, pandemics, strikes, venue issues, accidents, war, civil unrest or other unforeseen events.
              </p>

              {/* 12. Privacy */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                12. Privacy
              </h2>
              <p style={{marginBottom: '30px'}}>
                Your use of this website is also subject to our <Link to="/privacy-policy" style={{color: '#ED1C24', fontWeight: '700', textDecoration: 'underline'}}>Privacy Policy</Link>, which explains how we collect, use and protect personal information.
              </p>

              {/* 13. Changes to Terms */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                13. Changes to Terms
              </h2>
              <p style={{marginBottom: '30px'}}>
                Prompt Trade Fairs reserves the right to update these Terms &amp; Conditions at any time. Updated terms will be published on this website and will become effective upon publication.
              </p>

              {/* 14. Governing Law */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                14. Governing Law
              </h2>
              <p style={{marginBottom: '30px'}}>
                These Terms &amp; Conditions shall be governed by the laws of <strong>India</strong>. Subject to applicable law, courts in <strong>Chennai, Tamil Nadu</strong> shall have jurisdiction over disputes arising in connection with these Terms &amp; Conditions or our services.
              </p>

              {/* 15. Contact Us */}
              <h2 style={{fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: '30px 0 15px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '6px'}}>
                15. Contact Us
              </h2>
              
              <div style={{background: '#f8f9fa', padding: '30px', borderRadius: '20px', border: '1px solid #eee', marginTop: '15px'}}>
                 <h4 style={{fontSize: '1.3rem', fontWeight: '800', marginBottom: '15px', color: '#111'}}>
                   Prompt Trade Fairs (India) Private Limited
                 </h4>
                 <p style={{marginBottom: '15px', lineHeight: '1.6'}}>
                   2nd Floor, 324, Prompt Tower,<br />
                   Ram Nagar South Extension, 12th Street,<br />
                   Kamatchi Hospital, Chennai – 600100, Tamil Nadu, India.
                 </p>
                 <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd'}}>
                    <p style={{margin: 0}}>
                      <strong>Website:</strong> <a href="https://www.prompttradefairs.com" target="_blank" rel="noopener noreferrer" style={{color: '#ED1C24', textDecoration: 'none'}}>www.prompttradefairs.com</a>
                    </p>
                    <p style={{margin: 0}}>
                      <strong>Contact Number:</strong> <a href="tel:+919543668094" style={{color: '#444', textDecoration: 'none'}}>+91 95436 68094</a>, <a href="tel:+919391391162" style={{color: '#444', textDecoration: 'none'}}>+91 93913 91162</a>, <a href="tel:+917845769348" style={{color: '#444', textDecoration: 'none'}}>+91 78457 69348</a>
                    </p>
                    <p style={{margin: 0}}>
                      <strong>Email:</strong> <a href="mailto:prompttradefairs@gmail.com" style={{color: '#ED1C24', textDecoration: 'none'}}>prompttradefairs@gmail.com</a>, <a href="mailto:project2@prompttradefairs.com" style={{color: '#ED1C24', textDecoration: 'none'}}>project2@prompttradefairs.com</a>
                    </p>
                 </div>
              </div>

           </div>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
