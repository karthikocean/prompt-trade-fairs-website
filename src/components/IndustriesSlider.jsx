import React, { useState } from "react";

const upcomingExpos = [
  {
    title: "Build Expo 2025",
    meta: "Building materials, construction tech, interior solutions & smart home innovations.",
    date: "Aug 14–16, 2025",
    location: "Chennai Trade Centre",
    badge: "Construction",
    img: "/expos/build-expo.png",
  },
  {
    title: "Property Expo 2025",
    meta: "Residential & commercial real estate, plots, investment opportunities & home loans.",
    date: "Sep 5–7, 2025",
    location: "CODISSIA, Coimbatore",
    badge: "Real Estate",
    img: "/expos/property-expo.png",
  },
  {
    title: "Furniture Home Products Expo",
    meta: "Premium furniture brands, modular kitchens, décor & smart home accessories.",
    date: "Oct 10–12, 2025",
    location: "Chennai Trade Centre",
    badge: "Furniture",
    img: "/expos/furniture-home.png",
  },
  {
    title: "Furniture Lifestyle Expo",
    meta: "Luxury living, designer interiors, lifestyle brands & exclusive home collections.",
    date: "Nov 20–22, 2025",
    location: "BIEC, Bengaluru",
    badge: "Lifestyle",
    img: "/expos/furniture-lifestyle.png",
  },
  {
    title: "Food & Hospitality Expo",
    meta: "F&B brands, restaurant tech, catering equipment & hospitality service innovations.",
    date: "Dec 6–8, 2025",
    location: "Chennai Trade Centre",
    badge: "Food & Bev",
    img: "/expos/food-expo.png",
  },
  {
    title: "Gems & Jewellery Expo",
    meta: "Fine jewellery, diamond collections, gemstones & artisan craftsmanship showcases.",
    date: "Jan 17–19, 2026",
    location: "CODISSIA, Coimbatore",
    badge: "Jewellery",
    img: "/expos/gems-expo.png",
  },
  {
    title: "Cosmetics & Beauty Expo",
    meta: "Skincare, cosmetics, wellness brands, salon equipment & beauty technology.",
    date: "Feb 7–9, 2026",
    location: "Chennai Trade Centre",
    badge: "Beauty",
    img: "/expos/beauty-expo.png",
  },
  {
    title: "Healthcare & Pharma Expo",
    meta: "Medical devices, pharmaceuticals, diagnostics, wellness & healthcare innovations.",
    date: "Mar 14–16, 2026",
    location: "BIEC, Bengaluru",
    badge: "Healthcare",
    img: "/expos/healthcare-expo.png",
  },
];

const previousExpos = [
  {
    title: "Build Expo 2024",
    special: "🏆 Most Influential B2B Platform of the Year. Attracted 250+ Tier-1 construction giants.",
    badge: "Milestone",
    img: "/expos/past-build.png",
  },
  {
    title: "Property Expo 2024",
    special: "🏠 Record Breaking 450+ On-Spot Bookings. Connected 15,000+ potential homeowners.",
    badge: "Success",
    img: "/expos/past-property.png",
  },
  {
    title: "Furniture Lifestyle 2024",
    special: "🛋️ Largest Interior Collections Showcase in South India. Featured 120+ luxury brands.",
    badge: "Design",
    img: "/expos/past-furniture.png",
  },
  {
    title: "Food & Hospitality 2024",
    special: "🥘 Global Networking Hub. Facilitated \$20M+ in cross-border food tech partnerships.",
    badge: "Global",
    img: "/expos/food-expo.png",
  },
  {
    title: "Gems & Jewellery 2024",
    special: "💎 18-Carat Masterclass Sessions. Showcased the largest cluster of artisan entrepreneurs.",
    badge: "Artistry",
    img: "/expos/gems-expo.png",
  },
  {
    title: "Health & Beauty 2024",
    special: "💄 2024's Best Beauty Launchpad. Hosted the debut of 15+ international organic brands.",
    badge: "Innovation",
    img: "/expos/beauty-expo.png",
  },
];

const CalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="3" width="14" height="11" rx="2" stroke="white" strokeWidth="1.4" />
    <path d="M5 1v3M11 1v3M1 7h14" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg width="11" height="12" viewBox="0 0 14 18" fill="none" aria-hidden="true">
    <path
      d="M7 1C4.239 1 2 3.239 2 6c0 3.75 5 11 5 11s5-7.25 5-11c0-2.761-2.239-5-5-5z"
      stroke="white"
      strokeWidth="1.4"
    />
    <circle cx="7" cy="6" r="1.8" stroke="white" strokeWidth="1.4" />
  </svg>
);

const PER_PAGE = 4;

const currentExpos = [
  {
    title: "Gems & Jewellery Expo 2024",
    meta: "Live exhibition featuring 500+ premium jewellery brands and bridal collections.",
    date: "March 18–22, 2024",
    location: "Chennai Trade Centre",
    badge: "Live Now",
    img: "/expos/gems-expo.png",
  },
  {
    title: "Build Expo 2024 - Live",
    meta: "Ongoing construction and architecture summit. 300+ exhibitors showcasing smart tech.",
    date: "March 20–23, 2024",
    location: "CODISSIA, Coimbatore",
    badge: "Active",
    img: "/expos/past-build.png",
  },
  {
    title: "Healthcare Summit 2024",
    meta: "Live medical innovations and diagnostics showcase. Top doctors and pharma giants present.",
    date: "March 19–21, 2024",
    location: "BIEC, Bengaluru",
    badge: "Happening",
    img: "/expos/healthcare-expo.png",
  },
  {
    title: "Food Tech Expo 2024",
    meta: "Ongoing exhibition of food processing tech and international culinary brands.",
    date: "March 20–22, 2024",
    location: "Chennai Trade Centre",
    badge: "Premium Venue",
    img: "/expos/food-expo.png",
  },
];

const IndustriesSlider = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [page, setPage] = useState(0);

  const currentData =
    activeTab === "current" ? currentExpos :
      activeTab === "upcoming" ? upcomingExpos :
        previousExpos;

  const totalPages = Math.ceil(currentData.length / PER_PAGE);
  const items = currentData.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0); // Reset page on tab change
  };

  return (
    <section className="expo-section">
      <div className="container">
        {/* CENTERED HEADER ABOVE TABS */}
        <div className="premium-header-box centered">
          <div className="header-accent-row">
            <div className="header-accent-line"></div>
            <span className="header-accent-tag">OUR EXPOS</span>
            <div className="header-accent-line"></div>
          </div>
          <h2 className="header-main-title">Explore All <span>Events</span></h2>
        </div>

        {/* HEADER TABS */}
        <div className="expo-tab-header-original">
          <h2
            className={`expo-heading-original ${activeTab === "current" ? "active" : ""}`}
            onClick={() => handleTabChange("current")}
          >
            Current Expo
          </h2>
          <h2
            className={`expo-heading-original ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => handleTabChange("upcoming")}
          >
            Upcoming Expo
          </h2>
          <h2
            className={`expo-heading-original ${activeTab === "previous" ? "active" : ""}`}
            onClick={() => handleTabChange("previous")}
          >
            Previous Expo
          </h2>
        </div>

        {/* RELATIVE WRAPPER FOR ARROWS */}
        <div className="expo-slider-container">
          <button className="expo-nav-btn prev" onClick={prev} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button className="expo-nav-btn next" onClick={next} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* GRID — 4 cards */}
          <div className="expo-grid">
            {items.map((expo, i) => (
              <div className="expo-card" key={`${activeTab}-${i}`}>
                <img src={expo.img} alt={expo.title} loading="lazy" />

                {/* OVERLAY — light default, dark on hover */}
                <div className="expo-overlay" />

                {/* BADGE — always visible */}
                <span className="expo-badge">{expo.badge}</span>

                {/* BODY */}
                <div className="expo-body">
                  {/* TITLE — always visible */}
                  <h3 className="expo-title">{expo.title}</h3>

                  {/* REVEAL — only on hover */}
                  <div className="expo-reveal">
                    {activeTab === "upcoming" || activeTab === "current" ? (
                      <>
                        <p className="expo-meta">{expo.meta}</p>
                        <div className="expo-info">
                          <div className="expo-info-row">
                            <CalIcon />
                            <span>{expo.date}</span>
                          </div>
                          <div className="expo-info-row">
                            <PinIcon />
                            <span>{expo.location}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="expo-meta special-thing">{expo.special}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        {totalPages > 1 && (
          <div className="expo-dots">
            {Array.from({ length: totalPages }, (_, i) => (
              <span
                key={i}
                className={`expo-dot ${i === page ? "active" : ""}`}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default IndustriesSlider;