import React, { useState, useEffect } from "react";
import "./Testimonials.css";

const videos = [
  { id: "G9MkoVxABck", url: "https://youtube.com/shorts/G9MkoVxABck" },
  { id: "ebWVHciHjSY", url: "https://youtube.com/shorts/ebWVHciHjSY" },
  { id: "u2G4VmK416E", url: "https://youtube.com/shorts/u2G4VmK416E" },
  { id: "ZOYGA3Qab-8", url: "https://youtube.com/shorts/ZOYGA3Qab-8" },
  { id: "r-yRVy3ynog", url: "https://youtube.com/shorts/r-yRVy3ynog" },
  { id: "kDbJ0pz-nL0", url: "https://youtube.com/shorts/kDbJ0pz-nL0" },
  { id: "c_-Yr-ZLt4k", url: "https://youtube.com/shorts/c_-Yr-ZLt4k" },
  { id: "qUNzyjqiE8E", url: "https://youtube.com/shorts/qUNzyjqiE8E" },
  { id: "3HHbCXJousU", url: "https://youtube.com/shorts/3HHbCXJousU" },
  { id: "OGBnYJhsh_4", url: "https://youtube.com/shorts/OGBnYJhsh_4" },
  { id: "__sxUfcWOmk", url: "https://youtube.com/shorts/__sxUfcWOmk" },
  { id: "P1Q4NUPWbqg", url: "https://youtube.com/shorts/P1Q4NUPWbqg" },
  { id: "kTeg4LF1QJQ", url: "https://youtube.com/shorts/kTeg4LF1QJQ" },
  { id: "zo7rFnUYolM", url: "https://youtube.com/shorts/zo7rFnUYolM" },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const next = () => setIndex((prev) => Math.min(prev + 1, videos.length - 1));

  const getItem = (offset) => {
    return videos[(index + offset + videos.length) % videos.length];
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
          <h2 className="header-main-title">
            Trusted Client <span>Voices</span>
          </h2>
        </div>

        <div className="testimonial-container-main">
          {/* LEFT ARROW */}
          {index > 0 && (
            <button
              className="nav-arrow left"
              onClick={prev}
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          {/* CARDS */}
          <div className="testimonial-grid-display-premium">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const item = getItem(offset);
              if (!item) return null;
              const absOffset = Math.abs(offset);
              const cardClass = absOffset === 0 ? "active" : absOffset === 1 ? "side-1" : "side-2";

              return (
                <div
                  key={`${index}-${offset}`}
                  className={`video-testimonial-card ${cardClass}`}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card-link"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`}
                      alt="YouTube Shorts thumbnail"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;
                      }}
                    />
                  </a>
                </div>
              );
            })}
          </div>

          {/* RIGHT ARROW */}
          {index < videos.length - 1 && (
            <button
              className="nav-arrow right"
              onClick={next}
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>

        {/* DOTS */}
        <div className="slider-dots">
          {videos.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonial;