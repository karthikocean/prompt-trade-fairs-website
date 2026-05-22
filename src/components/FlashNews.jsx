import React, { useState, useEffect } from 'react';
import { getFlashNews } from '../api/flashNews';
import { getImageUrl } from '../config/apiClient';

const FlashNews = () => {
  const [loading, setLoading] = useState(true);
  const [flashNews, setFlashNews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Show modal only once per session
  useEffect(() => {
    const shown = sessionStorage.getItem('flashNewsShown');
    if (!shown) {
      setIsOpen(true);
      sessionStorage.setItem('flashNewsShown', 'true');
    }
  }, []);

  // Fetch flash news on component mount
  useEffect(() => {
    const fetchFlashNews = async () => {
      try {
        console.log('Fetching flash news...');
        const response = await getFlashNews();
        if (response?.data?.data) {
          setFlashNews(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching flash news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlashNews();
  }, []);

  // Lock background scroll and close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const imageUrl = getImageUrl(flashNews.map(item => item.image)[0]);

  const openInNewTab = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flashnews-overlay" onClick={closeModal}>
      <div className="flashnews-modal" onClick={e => e.stopPropagation()}>
        <button className="flashnews-close" onClick={closeModal} aria-label="Close">&times;</button>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Featured"
            className="flashnews-image"
            onClick={openInNewTab}
          />
        )}
      </div>
      <style jsx>{`
        .flashnews-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-out forwards;
        }
        .flashnews-modal {
          position: relative;
          background: transparent; /* removed white box */
          padding: 0; /* no extra white space */
          width: fit-content;
          max-width: 95vw;
          max-height: 92vh;
          overflow: hidden;
          animation: scaleIn 0.35s ease-out forwards;
        }
        .flashnews-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          background: #fff; /* solid white */
          border: none;
          border-radius: 50%;
          color: #e53935; /* red X */
          font-size: 20px;
          font-weight: 600;
          line-height: 1;
          padding: 0;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: background 0.2s ease, transform 0.15s ease;
          z-index: 10;
        }
        .flashnews-close:hover {
          background: #f5f5f5; /* light gray on hover */
          transform: scale(1.08);
        }
        .flashnews-image {
          width: 100%;
          height: auto;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 18px;
          display: block;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 768px) {
          .flashnews-close { width: 26px; height: 26px; font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
};

export default FlashNews;
