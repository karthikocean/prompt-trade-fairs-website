import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Arun Kumar",
    role: "CEO, BuildSpace Solutions",
    img: "businessman1.svg",
    text: "CNI constant support throughout the Build Expo 2024 was exceptional. The quality of business visitors surpassed our expectations, leading to several high-value contracts.",
    rating: 5,
  },
  {
    name: "Meera Deshmukh",
    role: "Director, Global Interior Expo",
    img: "businesswomen2.svg",
    text: "The professionalism and platform provided by Prompt Trade Fairs is unmatched. They truly understand the pulse of the market and deliver target-oriented exhibitions.",
    rating: 5,
  },
  {
    name: "Sanjay Raghavan",
    role: "Marketing Head, Elite Real Estate",
    img: "businessman2.svg",
    text: "We have been participating in their Property Expos for over 5 years. Each event is better managed than the last. Highly recommended for business expansion.",
    rating: 4,
  },
  {
    name: "Priya Sundaram",
    role: "Founder, Luxe Living",
    img: "businesswomen1.svg",
    text: "A perfect platform for furniture brands. The footfall was consistent and we were able to showcase our premium collections to the right audience.",
    rating: 5,
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);

  const getItem = (offset) => {
    return testimonials[(index + offset + testimonials.length) % testimonials.length];
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fa-star ${i < rating ? "fas" : "far"}`} style={{ color: "#FFB800", fontSize: "12px", marginRight: "3px" }}></i>
    ));
  };

  return (
    <section className="testimonials-section-lite">
      <div className="container">
        {/* CENTERED HEADER */}
        <div className="premium-header-box centered">
          <div className="header-accent-row">
            <div className="header-accent-line"></div>
            <span className="header-accent-tag">TESTIMONIALS</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Trusted Client <span>Voices</span></h2>
        </div>

        <div className="testimonial-container-main">
          {/* NAVIGATION LEFT */}
          <button className="nav-arrow left" onClick={prev} aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="testimonial-grid-display-premium">
            {[-1, 0, 1].map((offset) => {
              const item = getItem(offset);
              const isActive = offset === 0;
              return (
                <div key={`${index}-${offset}`} className={`modern-testimonial-card ${isActive ? "active" : "side"}`}>
                   {/* CARD HEADER: User Image & Bio */}
                   <div className="card-header-bio">
                      <div className="bio-avatar-square">
                         <img src={item.img} alt={item.name} />
                      </div>
                      <div className="bio-info-box">
                         <h4 className="bio-name">{item.name}</h4>
                         <p className="bio-role">{item.role}</p>
                      </div>
                   </div>

                   {/* CARD BODY: Rating & Text */}
                   <div className="card-body-content">
                      <div className="testimonial-stars-lite">
                         {renderStars(item.rating)}
                      </div>
                      
                      <div className="quote-wrap-red">
                         <i className="fas fa-quote-left quote-mark start"></i>
                         <p className="testimonial-main-text">{item.text}</p>
                         <i className="fas fa-quote-right quote-mark end"></i>
                      </div>
                   </div>
                   
                   {/* HOVER ACCENT LINE */}
                   <div className="card-hover-line"></div>
                </div>
              );
            })}
          </div>

          {/* NAVIGATION RIGHT */}
          <button className="nav-arrow right" onClick={next} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* PAGINATION DOTS */}
        <div className="testimonial-dots-box">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
