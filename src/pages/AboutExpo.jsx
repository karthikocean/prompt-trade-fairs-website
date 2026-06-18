import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutExpo = () => {
  const highlights = [
    {
      title: "Proven Expertise",
      desc: "Prompt Trade Fairs brings with it the rich experience of organizing over 1002 exhibitions across diverse industries, including 69 successful and exclusive editions dedicated to the Building & Construction Industry."
    },
    {
      title: "South India’s Largest Dedicated Platform",
      desc: "ABI EXPO-2026 is South India’s largest and most focused exhibition for the Building & Construction Industry, bringing together the entire ecosystem under one roof."
    },
    {
      title: "Comprehensive Industry Coverage",
      desc: "The Expo is thoughtfully designed to include Building Materials, Construction Technologies, Interior Design, Home Décor, Architecture, and Allied Services, making it a complete platform for the industry."
    },
    {
      title: "Inspiration Meets Innovation",
      desc: "ABI EXPO-2026 enables visitors to experience creativity, innovation, and technical expertise, offering inspirational and individualistic perspectives for modern living spaces."
    },
    {
      title: "Showcase of Unique Building Techniques",
      desc: "The exhibition will highlight advanced and cost-effective building techniques, presented in an informative and engaging manner to educate and inspire visitors."
    },
    {
      title: "Ideal Platform for Home Builders & Buyers",
      desc: "A perfect destination for individuals planning to construct or upgrade their dream homes, offering access to the latest designs, materials, and technologies at competitive prices."
    },
    {
      title: "Business & Networking Opportunities",
      desc: "ABI EXPO-2026 serves as a powerful business platform for builders, architects, contractors, developers, interior designers, and industry professionals to explore trade opportunities and expand their business networks."
    },
    {
      title: "Influencing Design & Aesthetics",
      desc: "The exhibition plays a significant role in shaping the aesthetic sensibilities of visitors by presenting contemporary trends, innovative designs, and functional solutions."
    }
  ];

  const exhibitors = [
    "Artifacts", "Artificial Flowers", "Candles & Candle Stands", "Crystal Products Fragrances", "Glassware",
    "Interior Furnishings Kitchenware", "Lamps & Lighting", "Paintings", "Photo Frames", "Porcelain Products",
    "Table Decorations", "Vases", "Wall Clocks Alabaster Ware Aluminum Ware", "Animal Figures", "Antique Reproductions",
    "Artistic Stoneware", "Work Articles Bone China Handicrafts", "Brassware", "Bronze Figures", "Cane/Bamboo Items",
    "Ceramics", "Copperware", "Decorative Boxes", "Decorative Objects", "Earthen Ware", "Enamel Ware", "EPNS Ware",
    "Ethnic Goods", "Figurines", "Fireplace Accessories", "Furniture", "Frames Mirror/Picture/Photo", "Gift Products",
    "Goblets", "Handmade Paper Items", "Home Furnishings", "Horne drafts", "Household Decorative Products",
    "Iron Crafts", "Jute Bags & Accessories", "Lace Products", "Lacquer Ware", "Marble-Alabaster & Crafted Stones",
    "Novelties Oriental Crafts", "Paper Mache", "Porcelain Ornaments", "Potpourri", "Pottery Sandalwood Articles Sculptures",
    "Shell‐Coral Gifts", "Soapstone Carvings", "Terracotta Pottery", "Wall Hangings", "Wire Ware", "Wooden Gifts",
    "Wrought Iron Ware"
  ];

  const visitors = [
    "Architects & Interior Designers", "Interior Decorators & Furnishers", "Opinion Leaders & Consultants",
    "Real Estate Developers/Managers", "Foreign Mission & Consul Generals", "Policy and Decision Makers",
    "Foreign Companies seeking Joint Ventures", "Trade Delegations from Various Countries",
    "Top Executives and Professionals from Local Industry", "Dealers of Furniture Accessories and Hardwares",
    "Hi-Rise Building Contractors", "Officials of Trade Associations", "Forestry Industry Officials Wood & Timber Dealers",
    "Furniture", "Hardware Door Handles", "Knobs Suppliers", "Furniture Manufacturers and Dealers"
  ];

  return (
    <main className="legal-page-v3">
      {/* HERO SECTION */}
      <section className="about-v3-hero" style={{ backgroundImage: "url('/aboutusbanner.png')" }}>
        <div className="v3-hero-overlay-dark"></div>
        <div className="container v3-hero-container">
          <div className="v3-hero-content">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
            >
              <div className="v3-breadcrumb">
                <Link to="/">Home</Link> <span>/</span> <span className="current">About the Expo</span>
              </div>
              <h1 className="v3-hero-title">About <span>the Expo</span></h1>
              <p className="v3-hero-subtitle" style={{color: '#fff', opacity: '0.8', maxWidth: '600px', marginTop: '15px'}}>
                ABI Expo 2026 - South India's Premier Construction & Design Trade Fair
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="legal-content-section" style={{padding: '100px 0', background: '#fff'}}>
        <div className="container">
           <div className="legal-doc-wrap" style={{lineHeight: '1.8', color: '#444'}}>
              
              {/* SECTION 1: Expo Profile */}
              <div className="about-expo-doc-section">
                <h2 style={{fontSize: '1.8rem', fontWeight: '800', color: '#111', marginBottom: '20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>1. Expo Profile</h2>
                <p style={{marginBottom: '20px', fontSize: '1.05rem', fontWeight: 'bold', color: '#ED1C24'}}>Dear Exhibitors,</p>
                <p style={{marginBottom: '20px'}}>
                  We are delighted to welcome you to <strong>ABI Expo 2026</strong>, an exclusive exhibition organized by <strong>Prompt Trade Fairs (I) Pvt. Ltd.</strong>, a pioneer in professional exhibition management and a trusted leader in the industry.
                </p>
                <p style={{marginBottom: '20px'}}>
                  Established in 2002 with a strong commitment to excellence, Prompt Trade Fairs has grown into one of India's most respected exhibition organizers. Over the years, we have earned recognition for creating dynamic business platforms that connect exhibitors with quality buyers, decision-makers, and industry professionals from across India and abroad.
                </p>
                <p style={{marginBottom: '20px'}}>
                  <strong>ABI Expo 2026</strong> is designed to provide exhibitors with maximum visibility, meaningful business interactions, and long-term growth opportunities. Through our proven expertise, strategic promotional activities, and extensive industry outreach, we are confident that your participation will lead to valuable networking opportunities, enhanced brand recognition, and significant business expansion.
                </p>
                <p style={{marginBottom: '0'}}>
                  We look forward to your active participation and assure you of our complete support in making your experience at ABI Expo 2026 productive, seamless, and rewarding.
                </p>
              </div>

              {/* SECTION 2: Exhibition Highlights */}
              <div className="about-expo-doc-section">
                <h2 style={{fontSize: '1.8rem', fontWeight: '800', color: '#111', marginBottom: '20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>2. Exhibition Highlights</h2>
                <ul style={{paddingLeft: '20px', marginBottom: '0', listStyleType: 'square'}}>
                  {highlights.map((item, idx) => (
                    <li key={idx} style={{marginBottom: '15px'}}>
                      <strong>{item.title}</strong>: {item.desc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECTION 3: Exhibitor Profile */}
              <div className="about-expo-doc-section">
                <h2 style={{fontSize: '1.8rem', fontWeight: '800', color: '#111', marginBottom: '20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>3. Exhibitor Profile</h2>
                <p style={{marginBottom: '20px'}}>
                  ABI Expo features a wide-ranging, comprehensive showcase of products, materials, designs, and services representing the following business sectors:
                </p>
                <ul className="profile-column-list" style={{paddingLeft: '20px', marginBottom: '0', listStyleType: 'square'}}>
                  {exhibitors.map((item, idx) => (
                    <li key={idx}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECTION 4: Visitor Profile */}
              <div className="about-expo-doc-section">
                <h2 style={{fontSize: '1.8rem', fontWeight: '800', color: '#111', marginBottom: '20px', borderBottom: '2px solid #ED1C24', display: 'inline-block', paddingBottom: '10px'}}>4. Visitor Profile</h2>
                <p style={{marginBottom: '20px'}}>
                  The exhibition attracts a highly targeted audience of trade visitors, developers, and industry professionals, including:
                </p>
                <ul className="profile-column-list" style={{paddingLeft: '20px', marginBottom: '0', listStyleType: 'square'}}>
                  {visitors.map((item, idx) => (
                    <li key={idx}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

           </div>
        </div>
      </section>

      <style>{`
        .profile-column-list {
          column-count: 3;
          column-gap: 40px;
        }
        .profile-column-list li {
          break-inside: avoid-column;
          margin-bottom: 10px;
        }
        .profile-column-list li::marker {
          color: #ED1C24;
        }
        @media (max-width: 991px) {
          .profile-column-list {
            column-count: 2;
            column-gap: 30px;
          }
          .about-expo-doc-section {
            margin-bottom: 25px;
          }
          .about-expo-doc-section:last-child {
            margin-bottom: 0;
          }
        }
        @media (min-width: 992px) {
          .about-expo-doc-section {
            margin-bottom: 35px;
          }
          .about-expo-doc-section:last-child {
            margin-bottom: 0;
          }
        }
        @media (max-width: 576px) {
          .profile-column-list {
            column-count: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default AboutExpo;
