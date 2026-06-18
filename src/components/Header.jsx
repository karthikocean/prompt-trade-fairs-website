import React, { useState, useEffect } from "react";
import logo from "../assets/images/prompt_official_stacked.png";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* LOGO */}
        <div className="nav-logo">
          <Link to="/">
            <img
              src={
                isScrolled || window.innerWidth <= 991
                  ? "/logooooooooooo.png"
                  : "/prompt-logo-NEW.png"
              }
              alt="Prompt Logo"
            />
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </NavLink>

          {/* <NavLink to="/about-expo" onClick={() => setIsMenuOpen(false)}>
            About the Expo
          </NavLink> */}

          <NavLink to="/upcoming-exhibitions" onClick={() => setIsMenuOpen(false)}>
            Current Expo
          </NavLink>

          {/* DROPDOWN - EXHIBITIONS */}
          {/* <div 
            className="dropdown" 
            onMouseEnter={() => setActiveDropdown('exhibitions')} 
            onMouseLeave={() => setActiveDropdown(null)}
            onClick={(e) => {
              if (window.innerWidth <= 992) {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'exhibitions' ? null : 'exhibitions');
              }
            }}
          >
            <div className={`dropdown-toggle ${(window.location.pathname.startsWith('/exhibitions')) ? 'active' : ''}`}>
              Exhibitions <i className="fas fa-chevron-down"></i>
            </div>

            <div className={`dropdown-menu ${activeDropdown === 'exhibitions' ? "show" : ""}`}>
              <NavLink to="/upcoming-exhibitions" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Current Exhibitions
              </NavLink>
              <NavLink to="/previous-exhibitions" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Upcoming Exhibitions
              </NavLink>
            </div>
          </div> */}

          {/* <NavLink to="/events" onClick={() => setIsMenuOpen(false)}>
            Events
          </NavLink> */}

          {/* DROPDOWN - OUR GROUPS */}
          <div
            className="dropdown"
            onMouseEnter={() => setActiveDropdown('groups')}
            onMouseLeave={() => setActiveDropdown(null)}
            onClick={(e) => {
              if (window.innerWidth <= 992) {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'groups' ? null : 'groups');
              }
            }}
          >
            <div className="dropdown-toggle">
              <span>Our Groups</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className={`dropdown-menu ${activeDropdown === 'groups' ? "show" : ""}`}>
              <a href="https://www.buildersline.in" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Publication
              </a>
              <a href="https://promptdigimart.com/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Digi Mart
              </a>
              <a href="https://cnibusinessforum.com/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                CNI Business Forum
              </a>
              <a href="https://cnifoundation.in/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                CNI Foundation
              </a>
            </div>
          </div>

          <NavLink to="/careers" onClick={() => setIsMenuOpen(false)}>
            Careers
          </NavLink>
          <NavLink to="/to-export" onClick={() => setIsMenuOpen(false)}>
            To Exhibit
          </NavLink>
          {/* <NavLink to="/register-now" style={{ fontWeight: '800', color: '#ED1C24', marginLeft: '15px' }} onClick={() => setIsMenuOpen(false)}>
            Register Now
          </NavLink> */}
          <NavLink to="/contact" className="contact-btn" onClick={() => setIsMenuOpen(false)}>
            <span style={{ color: 'white' }}>Contact Us</span>
          </NavLink>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
