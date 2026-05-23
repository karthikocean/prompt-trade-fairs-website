import React, { useRef, useEffect, useState } from 'react';

const logos = [
  '/expo1.jpg',
  '/expo2.jpg',
  // '/expo3.jpg',
  // '/expo4.jpg',
  // '/expo5.jpg',
  // '/expo6.jpg',
  // '/next-expo.png',
  // '/impact.png',
];

const LogoMarquee = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [displayLogos, setDisplayLogos] = useState(logos);

  // Check overflow and decide if we need scrolling
  useEffect(() => {
    const checkOverflow = () => {
      if (!wrapperRef.current || !trackRef.current) return;
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      // If track width exceeds wrapper, enable scrolling and duplicate items
      if (trackWidth > wrapperWidth) {
        setShouldScroll(true);
        // Duplicate the logos for seamless loop
        setDisplayLogos([...logos, ...logos]);
      } else {
        setShouldScroll(false);
        setDisplayLogos(logos);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <section className="logo-marquee-section" style={{ padding: '80px 0', background: '#f5f5f5', textAlign: 'center' }}>
      <span className="marquee-subtitle" style={{ color: '#555', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Partners</span>
      <h2 className="marquee-title" style={{ fontSize: '2.5rem', fontWeight: '800', margin: '15px 0', color: '#1a1a1a' }}>Trusted By Leading Brands</h2>
      <div className="marquee-wrapper" ref={wrapperRef} style={{ overflow: 'hidden', position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
        <div
          className="marquee-track"
          ref={trackRef}
          style={{
            display: 'flex',
            justifyContent: shouldScroll ? 'flex-start' : 'center',
            animation: shouldScroll ? 'marquee 30s linear infinite' : 'none',
            willChange: 'transform',
          }}
        >
          {displayLogos.map((src, idx) => (
            <div
              key={idx}
              className="logo-card"
              style={{
                flex: '0 0 auto',
                flexShrink: 0,
                height: '246px',
                borderRadius: '16px',
                overflow: 'hidden',
                margin: '0 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src={src}
                alt={`logo-${idx}`}
                style={{
                  width: '100%',
                  height: '246px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .marquee-title { font-size: 2rem; }
          .logo-card { margin: 0 10px; }
          .logo-card img { height: 180px; }
        }
      `}</style>
    </section>
  );
};

export default LogoMarquee;
