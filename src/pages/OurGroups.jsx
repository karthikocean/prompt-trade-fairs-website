import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OurGroups = () => {
  const groups = [
    {
      title: "Real Estate",
      desc: "Comprehensive property shows connecting buyers with leading developers, builders, and financial institutions.",
      icon: "fa-home",
      image: "/webpropg1.jpg",
      tag: "PROMPT PROPERTY"
    },
    {
       title: "Interior Design",
       desc: "Showcasing modern interiors, furniture, and home decor innovations from top brands and designers.",
       icon: "fa-couch",
       image: "/webbannerg1.jpg",
       tag: "PROMPT FURNITURE"
    },
    {
       title: "Healthcare",
       desc: "Exhibitions dedicated to medical technologies, wellness products, and hospital infrastructure.",
       icon: "fa-heartbeat",
       image: "/team.png",
       tag: "PROMPT MEDICAL"
    },
    {
       title: "Industrial Tools",
       desc: "Heavy machinery, tools, and industrial equipment exhibitions for manufacturing and engineering sectors.",
       icon: "fa-tools",
       image: "/webbannerbuild.jpg",
       tag: "PROMPT INDUSTRIAL"
    }
  ];

  return (
    <main className="our-groups-v3-main">
      {/* 1. PREMIUM HERO SECTION */}
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
                <Link to="/">Home</Link> <span>/</span> <span className="current">Our Groups</span>
              </div>
              <h1 className="v3-hero-title">Diversified <span>Sector Expertise</span></h1>
              <p className="v3-hero-subtitle" style={{color: '#fff', opacity: '0.8', maxWidth: '600px', marginTop: '15px'}}>
                Explore our specialized exhibition divisions that operate at the intersection of industry innovation and market demand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. GROUPS GRID */}
      <section className="groups-grid-v3" style={{padding: '100px 0', background: '#f8f9fa'}}>
        <div className="container">
          <div className="premium-header-box centered">
             <div className="header-accent-row">
                <div className="header-accent-line"></div>
                <span className="header-accent-tag">OUR SPECIALIZATIONS</span>
                <div className="header-accent-line"></div>
             </div>
             <h2 className="header-main-title">Leading the Way in <span>Every Sector</span></h2>
          </div>

          <div className="v3-groups-grid" style={{marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '40px'}}>
            {groups.map((group, idx) => (
              <motion.div 
                key={idx} 
                className="group-card-v3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{background: '#fff', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', cursor: 'pointer'}}
              >
                <div className="group-img-wrap" style={{position: 'relative', height: '250px', overflow: 'hidden'}}>
                  <img src={group.image} alt={group.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  <div className="group-tag-overlay" style={{position: 'absolute', top: '20px', left: '20px', background: '#ED1C24', color: '#fff', padding: '5px 15px', borderRadius: '50px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px'}}>
                    {group.tag}
                  </div>
                </div>
                <div className="group-body" style={{padding: '40px 40px 50px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                    <div className="group-icon-circle" style={{width: '50px', height: '50px', background: 'rgba(237, 28, 36, 0.1)', color: '#ED1C24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '1.2rem'}}>
                      <i className={`fas ${group.icon}`}></i>
                    </div>
                    <h3 style={{fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px', color: '#111'}}>{group.title}</h3>
                    <p style={{ 
                        color: '#666', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '20px',
                        display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' 
                    }}>{group.desc}</p>
                  </div>
                  <div>
                    <button style={{ 
                        background: 'transparent', border: '2px solid #ED1C24', color: '#ED1C24', 
                        padding: '10px 25px', borderRadius: '50px', fontWeight: '800', fontSize: '13px', 
                        transition: 'all 0.3s ease', cursor: 'pointer' 
                    }}>ENQUIRE NOW</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="sector-cta" style={{padding: '100px 0', background: '#fff', textAlign: 'center'}}>
         <div className="container">
            <h2 style={{fontSize: '2.5rem', fontWeight: '900', color: '#111'}}>Partner With a <span>Pro-Sector Group</span></h2>
            <p style={{maxWidth: '700px', margin: '20px auto', color: '#666', fontSize: '18px'}}>Whether you want to exhibit or visit, our specialized desks are here to provide tailored assistance for your industry needs.</p>
            <div style={{marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
               <Link to="/to-export" className="v3-btn-primary" style={{padding: '15px 40px', background: '#ED1C24', color: '#fff', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', transition: 'all 0.3s ease'}}>BECOME AN EXHIBITOR</Link>
               <Link to="/contact" className="v3-btn-secondary" style={{padding: '15px 40px', border: '2px solid #ED1C24', color: '#ED1C24', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', transition: 'all 0.3s ease'}}>ENQUIRE MORE</Link>
            </div>
         </div>
      </section>
    </main>
  );
};

export default OurGroups;
