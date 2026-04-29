import React, { useState, useEffect } from "react";
import logo from "../assets/images/prompt_official_stacked.png";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
              src={isScrolled ? "/promt orignal.png" : "/prompt-logo-NEW.png"}
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

          {/* DROPDOWN - EXHIBITIONS */}
          <div className="dropdown" onMouseEnter={() => setActiveDropdown('exhibitions')} onMouseLeave={() => setActiveDropdown(null)}>
            <div className={`dropdown-toggle ${(window.location.pathname.startsWith('/exhibitions')) ? 'active' : ''}`}>
              Exhibitions <i className="fas fa-chevron-down"></i>
            </div>

            <div className={`dropdown-menu ${activeDropdown === 'exhibitions' ? "show" : ""}`}>
              <NavLink to="/upcoming-exhibitions" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Upcoming Exhibitions
              </NavLink>
              <NavLink to="/previous-exhibitions" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Previous Exhibitions
              </NavLink>
            </div>
          </div>

          <NavLink to="/events" onClick={() => setIsMenuOpen(false)}>
            Events
          </NavLink>

          {/* DROPDOWN - OUR GROUPS */}
          <div className="dropdown" onMouseEnter={() => setActiveDropdown('groups')} onMouseLeave={() => setActiveDropdown(null)}>
            <div className="dropdown-toggle">
              Our Groups <i className="fas fa-chevron-down"></i>
            </div>
            <div className={`dropdown-menu ${activeDropdown === 'groups' ? "show" : ""}`}>
              <a href="https://promptpublications.com/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Publication
              </a>
              <a href="https://promptdigimart.com/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                Digi Mart
              </a>
              <a href="https://cnibusinessforum.com/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
                CNI Business Forum
              </a>
              <a href="https://cnifoundation.org/" target="_blank" rel="noopener noreferrer" onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}>
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

          <NavLink to="/contact" className="contact-btn" onClick={() => setIsMenuOpen(false)}>
            Contact Us
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
