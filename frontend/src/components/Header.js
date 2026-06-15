import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Menu, X, MapPin } from 'lucide-react';

const Header = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (rubric) => {
    if (location.pathname === '/') {
      if (onNavigate) {
        onNavigate(rubric);
      }
    } else {
      navigate('/', { state: { action: 'rubric', rubric } });
    }
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (onNavigate) {
        onNavigate(null);
      }
    } else {
      navigate('/', { state: { action: 'home' } });
    }
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    if (location.pathname === '/') {
      scrollToSection('contact');
    } else {
      navigate('/', { state: { action: 'contact' } });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Accueil', action: handleHomeClick },
    { label: 'Formules', action: () => handleNavClick('offres-midi') },
    { label: 'Menu', action: () => handleNavClick('menu') },
    { label: 'Offres', action: () => handleNavClick('offres') },
    { label: 'Contact', action: handleContactClick },
    { label: 'Itinéraire', href: 'https://maps.google.com/?q=Mezzora+Pizza', external: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center"
            onClick={handleHomeClick}
          >
            <img
              src="/images/logo-mezzora.png"
              alt="Mezzora Pizza"
              className="h-14 md:h-16 w-auto"
            />
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors flex items-center gap-1"
                >
                  {link.label === 'Itinéraire' && <MapPin className="w-4 h-4" />}
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                >
                  {link.label}
                </button>
              )
            ))}
            
            {/* BOUTON DESKTOP EN NOIR PREMIUM */}
            <a
              href="tel:0147494904"
              className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Appeler
            </a>
          </nav>

          {/* Mobile: Menu burger */}
          <div className="flex items-center gap-3 lg:hidden">
            
            {/* BOUTON MOBILE EN NOIR PREMIUM */}
            <a
              href="tel:0147494904"
              className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg transition-all"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 font-semibold py-2 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label === 'Itinéraire' && <MapPin className="w-4 h-4" />}
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="text-gray-700 hover:text-gray-900 font-semibold py-2 text-left"
                  >
                    {link.label}
                  </button>
                )
              ))}
              
              {/* LIEN TÉLÉPHONE MENU MOBILE EN NOIR */}
              <a 
                href="tel:0147494904"
                className="flex items-center gap-2 text-gray-900 font-bold py-2"
              >
                <Phone className="w-4 h-4" />
                01.47.49.49.04
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;