import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import RubricsSection from '../components/RubricsSection';
import ContactForm from '../components/ContactForm';
import ReviewsCarousel from '../components/ReviewsCarousel';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';

const HomePage = () => {
  const [activeRubric, setActiveRubric] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      return;
    }

    const { action, rubric } = location.state;

    if (action === 'home') {
      setActiveRubric(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }

    if (action === 'contact') {
      setActiveRubric(null);
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    if (action === 'rubric' && rubric) {
      setActiveRubric(rubric);
      setTimeout(() => {
        document.getElementById('rubrics')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  const handleRubricSelect = (rubric) => {
    // Si on clique sur la même rubrique, on la ferme
    if (activeRubric === rubric) {
      setActiveRubric(null);
    } else {
      setActiveRubric(rubric);
    }
    // Scroll vers la section rubriques
    if (rubric) {
      setTimeout(() => {
        document.getElementById('rubrics')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleCloseMenu = () => {
    setActiveRubric(null);
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleRubricSelect} />
      <main className="pt-20">
        <Hero />
        <RubricsSection 
          onRubricSelect={handleRubricSelect}
          activeRubric={activeRubric}
          onCloseMenu={handleCloseMenu}
        />
        <ReviewsCarousel />
        <ContactForm />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
