const fs = require('fs');

const filePath = 'c:\\Users\\DELL\\Desktop\\vicky\\prompt-trade-fairs-website\\src\\pages\\About.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF
content = content.replace(/\r\n/g, '\n');

// 1. Fix Section 2 container closing
const oldSec2End = `            <div className="v3-intro-content-col">
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
          </div>
      </section>`;

const newSec2End = `            <div className="v3-intro-content-col">
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
          </div>
        </div>
      </section>`;

// 2. Fix Section 4 container closing
const oldSec4End = `            <div className="presence-content-col">
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
          </div>
      </section>`;

const newSec4End = `            <div className="presence-content-col">
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
          </div>
        </div>
      </section>`;

// 3. Fix Section 5 container closing
const oldSec5End = `            <div className="management-content-col">
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
          </div>
      </section>`;

const newSec5End = `            <div className="management-content-col">
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
          </div>
        </div>
      </section>`;

function replaceBlock(oldStr, newStr) {
    const cleanOld = oldStr.split('\n').map(l => l.trim()).filter(Boolean);
    const contentLines = content.split('\n');
    let startIdx = -1;
    
    for (let i = 0; i < contentLines.length; i++) {
        if (contentLines[i].trim() === cleanOld[0]) {
            let match = true;
            for (let j = 1; j < cleanOld.length; j++) {
                if (i + j >= contentLines.length || contentLines[i+j].trim() !== cleanOld[j]) {
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
        contentLines.splice(startIdx, cleanOld.length, newStr);
        content = contentLines.join('\n');
        return true;
    }
    return false;
}

const res2 = replaceBlock(oldSec2End, newSec2End);
console.log("Res 2 success:", res2);

const res4 = replaceBlock(oldSec4End, newSec4End);
console.log("Res 4 success:", res4);

const res5 = replaceBlock(oldSec5End, newSec5End);
console.log("Res 5 success:", res5);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Completed adding container divs!");
