const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\DELL\\Desktop\\vicky\\prompt-trade-fairs-website\\src\\pages\\About.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF
content = content.replace(/\r\n/g, '\n');

// Let's print out what splits we find
const sections = [
  '{/* 2. CORPORATE SUMMARY SECTION */}',
  '{/* 3. SPECIALIZED SEGMENTS SECTION */}',
  '{/* 4. STRONG PRESENCE (PAN-INDIA MAP & CITIES) */}',
  '{/* 5. EXCELLENCE IN MANAGEMENT SECTION */}',
  '{/* 6. ROUNDED STATS SECTION (COUNTER UPDATED) */}'
];

let parts = [];
let lastIdx = 0;

for (const sec of sections) {
    const idx = content.indexOf(sec);
    if (idx === -1) {
        console.error("Could not find section comment:", sec);
        process.exit(1);
    }
    parts.push(content.substring(lastIdx, idx));
    lastIdx = idx;
}
parts.push(content.substring(lastIdx));

console.log("Successfully split the file into", parts.length, "parts!");

// Parts indices:
// parts[0]: Before Section 2 (Header, Intro page styling, etc.)
// parts[1]: Section 2 (starts with '{/* 2. CORPORATE SUMMARY SECTION %}')
// parts[2]: Section 3 (starts with '{/* 3. SPECIALIZED SEGMENTS SECTION %}')
// parts[3]: Section 4 (starts with '{/* 4. STRONG PRESENCE %}')
// parts[4]: Section 5 (starts with '{/* 5. EXCELLENCE IN MANAGEMENT SECTION %}')
// parts[5]: Section 6 and beyond

// Let's modify parts[1] (Section 2)
let sec2Content = parts[1];
const newSec2Grid = `<div className="about-v3-grid">
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

// Replace about-v3-grid in sec2Content
sec2Content = sec2Content.replace(/<div className="about-v3-grid"[\s\S]*?<\/div>\s*<\/div>/, newSec2Grid);
parts[1] = sec2Content;
console.log("Updated Section 2!");

// Let's modify parts[3] (Section 4)
let sec4Content = parts[3];
const newSec4Grid = `<div className="presence-grid">
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

sec4Content = sec4Content.replace(/<div className="presence-grid">[\s\S]*?<\/div>\s*<\/div>/, newSec4Grid);
parts[3] = sec4Content;
console.log("Updated Section 4!");

// Let's modify parts[4] (Section 5)
let sec5Content = parts[4];
const newSec5Grid = `<div className="management-grid">
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

sec5Content = sec5Content.replace(/<div className="management-grid">[\s\S]*?<\/div>\s*<\/div>/, newSec5Grid);
parts[4] = sec5Content;
console.log("Updated Section 5!");

// Reassemble and write back
const output = parts.join('');
fs.writeFileSync(filePath, output, 'utf8');
console.log("Reassembled and wrote file successfully!");
