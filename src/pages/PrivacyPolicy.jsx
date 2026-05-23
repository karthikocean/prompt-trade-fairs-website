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
              <p style={{fontSize: '1.1rem', fontWeight: '700', color: '#ED1C24', marginBottom: '30px'}}>Effective Date: May 19, 2026</p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', marginBottom: '20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>1. Introduction</h2>
              <p style={{marginBottom: '20px'}}>
                Prompt Trade Fairs India Private Limited (“Company”, “we”, “our”, or “us”) is committed to protecting the privacy and confidentiality of personal information collected from attendees, exhibitors, sponsors, partners, and other participants (“Participants”) in connection with our trade fairs, exhibitions, conferences, and related events (“Events”).
              </p>
              <p style={{marginBottom: '20px'}}>
                This Privacy Policy describes the manner in which we collect, use, store, process, disclose, and protect personal information in accordance with applicable laws and regulations.
              </p>
              <p style={{marginBottom: '30px'}}>
                By registering for, attending, participating in, or otherwise engaging with our Events, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Information We Collect</h2>
              
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.1 Personal Information</h3>
              <p style={{marginBottom: '15px'}}>We may collect and process the following categories of personal information:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Full name</li>
                <li style={{marginBottom: '8px'}}>Mobile number</li>
                <li style={{marginBottom: '8px'}}>Email address</li>
                <li style={{marginBottom: '8px'}}>Residential or business address</li>
                <li style={{marginBottom: '8px'}}>Company/organization name</li>
                <li style={{marginBottom: '8px'}}>Designation or professional title</li>
                <li style={{marginBottom: '8px'}}>Identification details provided during registration</li>
                <li style={{marginBottom: '8px'}}>Photographs, audio recordings, and video recordings captured during the Event</li>
              </ul>

              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#ED1C24', marginTop: '30px'}}>2.2 Event-Related Information</h3>
              <p style={{marginBottom: '15px'}}>We may additionally collect:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Booth allocation and exhibitor details</li>
                <li style={{marginBottom: '8px'}}>Session attendance records</li>
                <li style={{marginBottom: '8px'}}>Visitor interactions and networking preferences</li>
                <li style={{marginBottom: '8px'}}>Event participation history</li>
                <li style={{marginBottom: '8px'}}>Feedback, surveys, and responses</li>
                <li style={{marginBottom: '8px'}}>Website and digital engagement data</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>3. Methods of Collection</h2>
              <p style={{marginBottom: '15px'}}>The Company may collect information through the following means:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Direct registration forms (online or offline)</li>
                <li style={{marginBottom: '8px'}}>Event entry badges and scanning systems</li>
                <li style={{marginBottom: '8px'}}>Communication via email, telephone, or website</li>
                <li style={{marginBottom: '8px'}}>Interactions with exhibitors, sponsors, or partners</li>
                <li style={{marginBottom: '8px'}}>CCTV systems and event photography/videography</li>
                <li style={{marginBottom: '8px'}}>Digital platforms, mobile applications, and social media channels associated with the Event</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>4. Purpose of Processing Information</h2>
              <p style={{marginBottom: '15px'}}>The personal information collected may be used for the following lawful purposes:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Event registration, verification, and administration</li>
                <li style={{marginBottom: '8px'}}>Communication relating to Event schedules, updates, and services</li>
                <li style={{marginBottom: '8px'}}>Facilitating networking opportunities between Participants</li>
                <li style={{marginBottom: '8px'}}>Managing exhibitor and sponsor relationships</li>
                <li style={{marginBottom: '8px'}}>Providing customer support and responding to inquiries</li>
                <li style={{marginBottom: '8px'}}>Conducting analytics, research, and improving Event experiences</li>
                <li style={{marginBottom: '8px'}}>Marketing, promotional, and advertising activities</li>
                <li style={{marginBottom: '8px'}}>Sending newsletters, future Event invitations, and business communications</li>
                <li style={{marginBottom: '8px'}}>Compliance with legal and regulatory obligations</li>
                <li style={{marginBottom: '8px'}}>Ensuring safety, security, and fraud prevention</li>
              </ul>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>5. Disclosure and Sharing of Information</h2>
              <p style={{marginBottom: '15px'}}>We may disclose or share personal information with:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Exhibitors, sponsors, business partners, and affiliates for legitimate business and networking purposes</li>
                <li style={{marginBottom: '8px'}}>Third-party service providers assisting in Event management, logistics, payment processing, marketing, IT support, or security</li>
                <li style={{marginBottom: '8px'}}>Government authorities, law enforcement agencies, regulators, or courts where required by applicable law</li>
                <li style={{marginBottom: '8px'}}>Professional advisors including legal, accounting, or auditing entities</li>
              </ul>
              <p style={{marginBottom: '30px'}}>
                All such disclosures shall be made only to the extent necessary and subject to reasonable confidentiality obligations where applicable.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>6. Photography, Videography, and Media Consent</h2>
              <p style={{marginBottom: '15px'}}>
                Participants acknowledge and agree that photographs, audio recordings, and video footage may be captured during the Event for documentation, promotional, advertising, archival, and commercial purposes.
              </p>
              <p style={{marginBottom: '15px'}}>Such content may be published on:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Company websites</li>
                <li style={{marginBottom: '8px'}}>Social media platforms</li>
                <li style={{marginBottom: '8px'}}>Promotional materials</li>
                <li style={{marginBottom: '8px'}}>Newsletters and brochures</li>
                <li style={{marginBottom: '8px'}}>Press releases and media publications</li>
              </ul>
              <p style={{marginBottom: '30px'}}>
                Participants who do not consent to being photographed or recorded must notify the Company in writing prior to the commencement of the Event. While reasonable efforts will be made to accommodate such requests, the Company cannot guarantee exclusion from all incidental captures in public areas of the Event venue.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>7. Data Security</h2>
              <p style={{marginBottom: '20px'}}>
                The Company implements reasonable technical, administrative, and organizational safeguards to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.
              </p>
              <p style={{marginBottom: '30px'}}>
                However, while we strive to protect personal data, no method of transmission over the internet or electronic storage is completely secure. Accordingly, the Company does not guarantee absolute security of information.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>8. Data Retention</h2>
              <p style={{marginBottom: '20px'}}>
                Personal information shall be retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce agreements.
              </p>
              <p style={{marginBottom: '30px'}}>
                Upon expiry of the applicable retention period, information may be securely deleted, anonymized, or archived in accordance with applicable laws.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>9. Participant Rights</h2>
              <p style={{marginBottom: '15px'}}>Subject to applicable laws, Participants may have the right to:</p>
              <ul style={{paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square'}}>
                <li style={{marginBottom: '8px'}}>Request access to personal information</li>
                <li style={{marginBottom: '8px'}}>Request correction or updating of inaccurate information</li>
                <li style={{marginBottom: '8px'}}>Withdraw consent for certain processing activities</li>
                <li style={{marginBottom: '8px'}}>Request deletion of personal data, where legally permissible</li>
                <li style={{marginBottom: '8px'}}>Opt out of marketing communications</li>
              </ul>
              <p style={{marginBottom: '30px'}}>
                Requests may be submitted using the contact details provided below.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>10. Cookies and Digital Technologies</h2>
              <p style={{marginBottom: '30px'}}>
                Our website and digital platforms may use cookies, analytics tools, and similar technologies to enhance user experience, analyze website traffic, and improve services. Users may modify browser settings to refuse cookies; however, certain functionalities may become unavailable.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>11. Third-Party Links</h2>
              <p style={{marginBottom: '20px'}}>
                Our website or Event materials may contain links to third-party websites or services. The Company shall not be responsible for the privacy practices, policies, or content of such external websites.
              </p>
              <p style={{marginBottom: '30px'}}>
                Participants are encouraged to review the privacy policies of third-party platforms before providing personal information.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>12. Consent</h2>
              <p style={{marginBottom: '30px'}}>
                By attending or participating in any Event organized by Prompt Trade Fairs India Private Limited, Participants expressly consent to the collection, processing, storage, use, and disclosure of their personal information in accordance with this Privacy Policy.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>13. Amendments to this Privacy Policy</h2>
              <p style={{marginBottom: '20px'}}>
                The Company reserves the right to amend, modify, or update this Privacy Policy at any time without prior notice. Updated versions shall be published on the Company’s official website with the revised effective date.
              </p>
              <p style={{marginBottom: '30px'}}>
                Continued participation in our Events following such updates shall constitute acceptance of the revised Privacy Policy.
              </p>

              <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#111', margin: '50px 0 20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>14. Contact Information</h2>
              <p style={{marginBottom: '35px'}}>
                For any questions, requests, or concerns regarding this Privacy Policy or the handling of personal information, please contact:
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

export default PrivacyPolicy;
