const fs = require('fs');

const filePath = 'c:\\Users\\DELL\\Desktop\\vicky\\prompt-trade-fairs-website\\src\\pages\\About.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF
content = content.replace(/\r\n/g, '\n');

// 1. Segment 2 replacement (Corporate Summary)
const oldSection2 = `<div className="about-v3-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center' }}>
            <div className="v3-intro-content-wrapper">
              <motion.div 
                 className="v3-intro-header"
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '30px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24', letterSpacing: '1px' }}>BUSINESS EXCELLENCE</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111' }}>
                    Prompt Trade Fairs <span>India Pvt. Ltd.</span>
                  </h2>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#555', marginTop: '10px', lineHeight: '1.4' }}>
                    Creating Exceptional Platforms for Business Success
                  </h4>
                </div>
              </motion.div>

              <motion.div 
                 className="v3-intro-text"
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8' }}
              >
                <p className="intro-p" style={{ marginBottom: '20px' }}>
                  Prompt Trade Fairs India Pvt. Ltd. is a leading Exhibition Organiser in India with over 25 years of excellence in organizing highly successful trade fairs, business expos, and consumer exhibitions across the country. Known for professionalism, innovation, and quality event management, PROMPT has become one of the most trusted names in the Indian exhibition industry.
                </p>
                <p className="intro-p" style={{ marginBottom: '20px' }}>
                  With a strong commitment to delivering business growth opportunities, PROMPT provides exhibitors with the ideal platform to showcase products, launch brands, connect with buyers, and generate valuable business leads. Managed by a dedicated team of industry specialists, every exhibition is strategically planned to meet the evolving needs of exhibitors and target audiences.
                </p>
                <p className="intro-p" style={{ marginBottom: '30px', color: '#111' }}>
                  PROMPT has successfully organized more than 900+ exhibitions across diverse industry sectors, making it one of the most sought-after trade fair companies in South India and rapidly expanding across the rest of India.
                </p>
              </motion.div>
            </div>

            <motion.div 
               className="v3-intro-image"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <div className="why-choose-image-box">
                <div className="accent-frame red"></div>
                <div className="accent-frame blue"></div>
                <img src="/promtbuilding.jpeg" alt="Exhibition Impact" className="main-image shadow-premium" />
                {/* <div className="experience-badge animate-bounce-slow"> */}
                  {/* <span className="years">1200+</span> */}
                  {/* <span className="text">Exhibitions <br /> Organized</span> */}
                {/* </div> */}
              </div>
            </motion.div>
          </div>`;

const newSection2 = `<div className="about-v3-grid">
            <div className="v3-intro-header-col">
              <motion.div 
                 className="v3-intro-header"
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                <div className="premium-header-box" style={{ marginBottom: '30px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24', letterSpacing: '1px' }}>BUSINESS EXCELLENCE</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111' }}>
                    Prompt Trade Fairs <span>India Pvt. Ltd.</span>
                  </h2>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#555', marginTop: '10px', lineHeight: '1.4' }}>
                    Creating Exceptional Platforms for Business Success
                  </h4>
                </div>
              </motion.div>
            </div>

            <div className="v3-intro-image-col">
              <motion.div 
                 className="v3-intro-image"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                <div className="why-choose-image-box">
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/promtbuilding.jpeg" alt="Exhibition Impact" className="main-image shadow-premium" />
                </div>
              </motion.div>
            </div>

            <div className="v3-intro-content-col">
              <motion.div 
                 className="v3-intro-text"
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8' }}
              >
                <p className="intro-p" style={{ marginBottom: '20px' }}>
                  Prompt Trade Fairs India Pvt. Ltd. is a leading Exhibition Organiser in India with over 25 years of excellence in organizing highly successful trade fairs, business expos, and consumer exhibitions across the country. Known for professionalism, innovation, and quality event management, PROMPT has become one of the most trusted names in the Indian exhibition industry.
                </p>
                <p className="intro-p" style={{ marginBottom: '20px' }}>
                  With a strong commitment to delivering business growth opportunities, PROMPT provides exhibitors with the ideal platform to showcase products, launch brands, connect with buyers, and generate valuable business leads. Managed by a dedicated team of industry specialists, every exhibition is strategically planned to meet the evolving needs of exhibitors and target audiences.
                </p>
                <p className="intro-p" style={{ marginBottom: '30px', color: '#111' }}>
                  PROMPT has successfully organized more than 900+ exhibitions across diverse industry sectors, making it one of the most sought-after trade fair companies in South India and rapidly expanding across the rest of India.
                </p>
              </motion.div>
            </div>
          </div>`;

// 2. Pan-India Network
const oldSection4 = `<div className="presence-grid">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
               <div className="premium-header-box" style={{ marginBottom: '30px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>PAN-INDIA NETWORK</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111' }}>
                    Strong Presence <span>Across India</span>
                  </h2>
               </div>
               <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                 PROMPT has successfully organized exhibitions in major business cities including Chennai, Bengaluru, Hyderabad, Ahmedabad, Coimbatore, Salem, Vijayawada, Visakhapatnam, Warangal, Rajahmundry, and many other key locations across India.
               </p>
               <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
                 With a strong database of registered visitors and industry professionals in every region, PROMPT exhibitions consistently attract quality footfall and deliver outstanding business opportunities for exhibitors.
               </p>
               {/* <div className="city-tags-container">
                  {cities.map((city, idx) => (
                    <span key={idx} className="city-tag">
                      {city}
                    </span>
                  ))}
               </div> */}
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               style={{ display: 'flex', justifyContent: 'center' }}
            >
               <div className="why-choose-image-box">
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/exact_india_map_image.png" alt="Exhibition Presence India Map" className="main-image shadow-premium" />
               </div>
            </motion.div>
          </div>`;

const newSection4 = `<div className="presence-grid">
            <div className="presence-header-col">
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                 <div className="premium-header-box" style={{ marginBottom: '30px' }}>
                    <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                      <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>PAN-INDIA NETWORK</span>
                    </div>
                    <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111' }}>
                      Strong Presence <span>Across India</span>
                    </h2>
                 </div>
              </motion.div>
            </div>

            <div className="presence-image-col">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 style={{ display: 'flex', justifyContent: 'center' }}
              >
                 <div className="why-choose-image-box">
                    <div className="accent-frame red"></div>
                    <div className="accent-frame blue"></div>
                    <img src="/exact_india_map_image.png" alt="Exhibition Presence India Map" className="main-image shadow-premium" />
                 </div>
              </motion.div>
            </div>

            <div className="presence-content-col">
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                 <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                   PROMPT has successfully organized exhibitions in major business cities including Chennai, Bengaluru, Hyderabad, Ahmedabad, Coimbatore, Salem, Vijayawada, Visakhapatnam, Warangal, Rajahmundry, and many other key locations across India.
                 </p>
                 <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
                   With a strong database of registered visitors and industry professionals in every region, PROMPT exhibitions consistently attract quality footfall and deliver outstanding business opportunities for exhibitors.
                 </p>
              </motion.div>
            </div>
          </div>`;

// 3. Exhibition Management
const oldSection5 = `<div className="management-grid">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
               <div className="why-choose-image-box">
                  <div className="accent-frame red"></div>
                  <div className="accent-frame blue"></div>
                  <img src="/about_img.jpg" alt="Exhibition Management Excellence" className="main-image shadow-premium" onError={(e) => { e.target.src = '/team.png'; }} />
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
            >
               <div className="premium-header-box" style={{ marginBottom: '30px' }}>
                  <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                    <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>END-TO-END SUPPORT</span>
                  </div>
                  <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111', lineHeight: '1.2' }}>
                    Excellence in <br /> Exhibition Management
                  </h2>
               </div>
               <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                 Every PROMPT exhibition is conceptualized with detailed planning, innovative marketing strategies, and extensive promotions across digital media, print advertising, outdoor campaigns, and branding platforms. The company focuses on delivering seamless event execution and exceptional customer service, making every exhibition a valuable experience for exhibitors and visitors alike.
               </p>
               <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8' }}>
                 As a complete exhibition solutions provider, PROMPT offers end-to-end support for trade fairs, expos, and business events, ensuring operational excellence at every stage. Its commitment to professionalism, quality, and business success has positioned PROMPT as one of the leading trade fair and exhibition organizers in India.
               </p>
            </motion.div>
          </div>`;

const newSection5 = `<div className="management-grid">
            <div className="management-header-col">
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
              >
                 <div className="premium-header-box" style={{ marginBottom: '30px' }}>
                    <div className="header-accent-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div className="header-accent-line" style={{ width: '40px', height: '2px', background: '#ED1C24' }}></div>
                      <span className="header-accent-tag" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ED1C24' }}>END-TO-END SUPPORT</span>
                    </div>
                    <h2 className="header-main-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111', lineHeight: '1.2' }}>
                      Excellence in <br /> Exhibition Management
                    </h2>
                 </div>
              </motion.div>
            </div>

            <div className="management-image-col">
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                 <div className="why-choose-image-box">
                    <div className="accent-frame red"></div>
                    <div className="accent-frame blue"></div>
                    <img src="/about_img.jpg" alt="Exhibition Management Excellence" className="main-image shadow-premium" onError={(e) => { e.target.src = '/team.png'; }} />
                 </div>
              </motion.div>
            </div>

            <div className="management-content-col">
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
              >
                 <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                   Every PROMPT exhibition is conceptualized with detailed planning, innovative marketing strategies, and extensive promotions across digital media, print advertising, outdoor campaigns, and branding platforms. The company focuses on delivering seamless event execution and exceptional customer service, making every exhibition a valuable experience for exhibitors and visitors alike.
                 </p>
                 <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8' }}>
                   As a complete exhibition solutions provider, PROMPT offers end-to-end support for trade fairs, expos, and business events, ensuring operational excellence at every stage. Its commitment to professionalism, quality, and business success has positioned PROMPT as one of the leading trade fair and exhibition organizers in India.
                 </p>
              </motion.div>
            </div>
          </div>`;

let finalContent = content;

function replaceSegment(oldStr, newStr) {
    const linesOld = oldStr.split('\n').map(l => l.trim()).filter(Boolean);
    const contentLines = finalContent.split('\n');
    const firstLine = linesOld[0];
    let startIdx = -1;
    
    for (let i = 0; i < contentLines.length; i++) {
        if (contentLines[i].trim() === firstLine) {
            let match = true;
            for (let j = 1; j < linesOld.length; j++) {
                if (i + j >= contentLines.length || contentLines[i+j].trim() !== linesOld[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                startIdx = i;
                break;
            }
        }
    }
    
    if (startIdx !== -1) {
        contentLines.splice(startIdx, linesOld.length, newStr);
        finalContent = contentLines.join('\n');
        return true;
    }
    return false;
}

const success2 = replaceSegment(oldSection2, newSection2);
console.log("Section 2 replacement success:", success2);

const success4 = replaceSegment(oldSection4, newSection4);
console.log("Section 4 replacement success:", success4);

const success5 = replaceSegment(oldSection5, newSection5);
console.log("Section 5 replacement success:", success5);

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log("Node script finished execution!");
