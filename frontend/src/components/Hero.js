import React, { useState } from 'react';
import { Droplet, Carrot, Beef, X, Phone } from 'lucide-react'; // Icônes similaires à ta capture

const Hero = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleOrderClick = () => {
    setShowOrderModal(true);
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+33147494904';
  };

  const handleFlipDish = () => {
    window.open('https://my.flipdish.com/pizzamezzora', '_blank');
  };

  return (
    <>
      <style>{`
        .hero-wrap {
          position: relative;
          width: 100%;
          height: 100dvh;
          min-height: 600px;
          overflow: hidden;
          background-color: #111;
        }

        @media (max-width: 768px) {
          .hero-wrap {
            height: 100dvh; /* Safari iOS : prendre toute la hauteur visible */
            min-height: 450px;
          }
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-color: #111;
          background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%),
                      url('/images/mario-hero.svg') center center / cover no-repeat;
        }

        @media (max-width: 768px) {
          .hero-bg {
            background-color: #111;
            background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.65) 100%),
                        url('/images/mario-hero.svg') center center / cover no-repeat;
          }
        }

        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between; 
          padding-top: 15vh; 
          padding-bottom: 17vh;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .hero-content {
            padding-top: 8vh;
            padding-bottom: 7vh;
          }
        }

        .hero-top-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          width: 100%;
        }

        /* ✍️ TEXTE D'ACCROCHE */
        .hero-hook-container {
          text-align: center;
          color: #fff;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1.1;
          text-shadow: 2px 2px 15px rgba(0,0,0,0.8);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
        }

        /* 🌟 LES 3 ICÔNES RONDES */
        .hero-features {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .hero-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .hero-feature-icon {
          width: 65px;
          height: 65px;
          border: 2px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .hero-feature-text {
          color: #fff;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          text-align: center;
          line-height: 1.2;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.8);
        }

        /* 🍕 BOUTON ANIMÉ */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 36px;
          border: 4px solid transparent;
          font-size: 0.95rem;
          background-color: #e53e3e; 
          border-radius: 100px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          animation: float 3s ease-in-out infinite;
        }

        .animated-button svg {
          position: absolute;
          width: 24px;
          fill: #fff;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 { right: 16px; }
        .animated-button .arr-2 { left: -25%; }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #fd8a26;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
          box-shadow: 0 0 0 12px transparent;
          border-radius: 12px;
        }

        .animated-button:hover .arr-1 { right: -25%; }
        .animated-button:hover .arr-2 { left: 16px; }
        .animated-button:hover .text { transform: translateX(12px); }
        .animated-button:hover .circle {
          width: 350px;
          height: 350px;
          opacity: 1;
        }

        /* 📍 BARRE INFOS */
        .hero-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }

        .hero-info-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px 20px;
          color: rgba(255,255,255,0.82);
          font-size: 0.78rem;
          font-weight: 600;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.9);
          letter-spacing: 0.03em;
        }

        .hero-info-sep {
          color: rgba(255,255,255,0.35);
        }

        @media (max-width: 768px) {
          .hero-info-bar {
            font-size: 0.72rem;
            gap: 4px 12px;
          }
          .hero-info-sep {
            display: none;
          }
        }

        /* 📱 MODAL DE COMMANDE */
        .order-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .order-modal {
          background: #fff;
          border-radius: 16px;
          padding: 32px 24px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          animation: slideUp 0.3s ease-in-out;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .order-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .order-modal-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #111;
        }

        .order-modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .order-modal-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-btn {
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .order-btn-call {
          background-color: #e53e3e;
          color: #fff;
        }

        .order-btn-call:hover {
          background-color: #c42e2e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 62, 62, 0.3);
        }

        .order-btn-flipdish {
          background-color: #f5f5f5;
          color: #111;
          border: 2px solid #e53e3e;
        }

        .order-btn-flipdish:hover {
          background-color: #efefef;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="hero-wrap">
        <div className="hero-bg" />
        
        <div className="hero-content">
          
          {/* SECTION HAUT : Titre + Icônes */}
          <div className="hero-top-section">
            <div className="hero-hook-container">
              <h1 className="hero-title">MEZZORA<br/>Pizza</h1>
            </div>

            {/* TES 3 ICÔNES */}
            <div className="hero-features">
              <div className="hero-feature">
                <div className="hero-feature-icon">
                  <Droplet color="#fff" size={28} />
                </div>
                <span className="hero-feature-text">Pâte<br/>Fraîche</span>
              </div>
              
              <div className="hero-feature">
                <div className="hero-feature-icon">
                  <Carrot color="#fff" size={28} />
                </div>
                <span className="hero-feature-text">Légumes<br/>Frais</span>
              </div>

              <div className="hero-feature">
                <div className="hero-feature-icon">
                  <Beef color="#fff" size={28} />
                </div>
                <span className="hero-feature-text">Viande<br/>Fraîche</span>
              </div>
            </div>
          </div>

          {/* SECTION BAS : Bouton + Infos */}
          <div className="hero-bottom">
            <button className="animated-button" onClick={handleOrderClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
                <span className="text">Commander en ligne</span>
                <span className="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
            </button>

          </div>

        </div>
      </div>

      {/* MODAL DE COMMANDE */}
      {showOrderModal && (
        <div className="order-modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h2 className="order-modal-title">Commander</h2>
              <button className="order-modal-close" onClick={() => setShowOrderModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="order-modal-buttons">
              <button className="order-btn order-btn-call" onClick={handleCallNow}>
                <Phone size={20} />
                Appeler maintenant
              </button>
              <button className="order-btn order-btn-flipdish" onClick={handleFlipDish}>
                Flipdish - Commander en ligne
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;