import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-col brand">
          <Link to="/">
            <img src="/favicon.png" alt="Prompt Logo" className="footer-logo" />
          </Link>

          <p>
            Prompt Trade Fairs India Pvt Ltd organizes exhibitions across India,
            providing the perfect platform to grow your business.
          </p>

          <div className="socials">
            <a href="https://www.instagram.com/exhibitions_prompt/?igshid=YmMyMTA2M2Y%3D">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/prompttradefairs">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/tradefairs2013">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com/@promptexpo123">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.linkedin.com/company/prompt-trade-fairs-india-pvt-ltd">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/"><i className="fas fa-chevron-right"></i>Home</Link></li>
            <li><Link to="/about"><i className="fas fa-chevron-right"></i>About Us</Link></li>
            <li><Link to="/our-groups"><i className="fas fa-chevron-right"></i>Our Groups</Link></li>
            <li><Link to="/careers"><i className="fas fa-chevron-right"></i>Careers</Link></li>
            <li><Link to="/to-export"><i className="fas fa-chevron-right"></i>To Exhibit</Link></li>
            <li><Link to="/contact"><i className="fas fa-chevron-right"></i>Contact Us</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><Link to="/events"><i className="fas fa-chevron-right"></i>Upcoming Exhibitions</Link></li>
            <li><Link to="/events"><i className="fas fa-chevron-right"></i>Previous Exhibitions</Link></li>
            <li><Link to="/events"><i className="fas fa-chevron-right"></i>Events</Link></li>
            <li><Link to="/payment-terms"><i className="fas fa-chevron-right"></i>Payment Terms</Link></li>
            <li><Link to="/privacy-policy"><i className="fas fa-chevron-right"></i>Privacy Policy</Link></li>
            <li><Link to="/refund-policy"><i className="fas fa-chevron-right"></i>Refund Policy</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact</h3>

          <p>
            <i className="fas fa-map-marker-alt"></i>
            Prompt Tower, Plot No: 324, Ram Nagar South 12th Extension,
            Off Radial Road, Near Kamakshi Hospital,
            Pallikaranai, Chennai - 600 100, India.
          </p>

          <p>
            <i className="fas fa-envelope"></i>
            project2@prompttradefairs.com<br />
            prompttradefairs@gmail.com
          </p>

          <p>
            <i className="fas fa-phone-alt"></i>
            Phone: +91 44 4214 2483<br />
            Mobile: 93913 91162, 99410 08371
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2026 Prompt Trade Fairs. All Rights Reserved.</p>

          <p>
            Developed & Maintained By{" "}
            <a href="https://www.oceansoftwares.com/">
              <span>Ocean Softwares</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
