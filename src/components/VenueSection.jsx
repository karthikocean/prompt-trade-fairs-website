import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./EnquiryForm";

const venues = [
  {
    id: 1,
    name: "BUILD & ARCH EXPO",
    date: "12 - 14 MAY 2026",
    location: "CODISSIA, COIMBATORE",
    img: "/expos/build-expo.png"
  },
  {
    id: 2,
    name: "FOOD & CATERING EXPO",
    date: "22 - 24 JUNE 2026",
    location: "HITEX, HYDERABAD",
    img: "/expos/food-expo.png"
  },
  {
    id: 3,
    name: "FURNITURE & LIFESTYLE",
    date: "05 - 07 JULY 2026",
    location: "BIEC, BENGALURU",
    img: "/expos/furniture-home.png"
  },
  {
    id: 4,
    name: "GEMS & JEWELLRY EXPO",
    date: "18 - 20 AUG 2026",
    location: "CHENNAI TRADE CENTRE",
    img: "/expos/gems-expo.png"
  },
  {
    id: 5,
    name: "PROPERTY & REAL ESTATE",
    date: "10 - 12 SEPT 2026",
    location: "EMPIRE HALL, MUMBAI",
    img: "/expos/property-expo.png"
  }
];

const VenueSection = () => {
  const [activeVenue, setActiveVenue] = useState(venues[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="venue-section-new">
      {/* BACKGROUND DECOR */}
      <div className="venue-bg-image-overlay"></div>
      
      <div className="container">
        {/* CENTERED HEADER ABOVE GRID */}
        <div className="premium-header-box centered">
          <div className="header-accent-row">
            <div className="header-accent-line"></div>
            <span className="header-accent-tag">EXHIBITION PARTNERS</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Global Partner <span>Venues</span></h2>
        </div>

        {/* HEADER AREA (FILTER DROPDOWNS) */}
        <div className="venue-header-row">
           <div className="venue-header-content">
              {/* REMOVED LOCAL HEADER */}
           </div>
           
           <div className="venue-filter-dropdowns">
              <div className="v-dropdown">
                 <label>State :</label>
                 <select>
                    <option>Tamil Nadu</option>
                    <option>Telangana</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                 </select>
              </div>
              <div className="v-dropdown">
                 <label>City :</label>
                 <select>
                    <option>Coimbatore</option>
                    <option>Hyderabad</option>
                    <option>Bengaluru</option>
                    <option>Chennai</option>
                 </select>
              </div>
           </div>
        </div>

        {/* MAIN GRID */}
        <div className="venue-main-layout">
           {/* LEFT LIST (5 CARDS) */}
           <div className="venue-list-scroll">
              {venues.map((v) => (
                <div 
                  key={v.id} 
                  className={`venue-info-card ${activeVenue.id === v.id ? "active" : ""}`}
                  onClick={() => setActiveVenue(v)}
                >
                   <div className="card-thumb">
                      <img src={v.img} alt={v.name} />
                   </div>
                   <div className="card-details">
                      <h4>{v.name}</h4>
                      <div className="card-meta">
                         <span><i className="far fa-calendar-alt"></i> {v.date}</span>
                         <span><i className="fas fa-map-marker-alt"></i> {v.location}</span>
                      </div>
                   </div>
                   {activeVenue.id === v.id && <div className="indicator-line"></div>}
                </div>
              ))}
           </div>

           {/* RIGHT PREVIEW */}
           <div className="venue-preview-zone">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeVenue.id}
                  className="v-preview-box"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                   <img src={activeVenue.img} alt={activeVenue.name} />
                   <div className="v-preview-overlay"></div>
                   
                   <div className="preview-cta">
                      <button className="register-now-btn" onClick={() => setIsModalOpen(true)}>
                         REGISTER NOW <i className="fas fa-arrow-right"></i>
                      </button>
                   </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      {isModalOpen && (
        <div className="expo-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="expo-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <div className="modal-form-wrapper">
               <EnquiryForm title="Venue Partner Registration" />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default VenueSection;
