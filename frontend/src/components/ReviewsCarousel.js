import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

// Vrais avis Google - Mezzora Pizza Rueil-Malmaison
const avisClients = [
  {
    id: 7,
    name: 'Mbacke D.',
    rating: 5,
    date: 'Mai 2026',
    comment: 'Cuisine, service, livraison… just perfect 🤌✅ Je suis satisfait et fidélisé 👍',
  },
  {
    id: 8,
    name: 'Ludovic G.',
    rating: 5,
    date: 'Avril 2026',
    comment: 'Toujours au top... un vrai plaisir de manger les pizzas Mezzora !',
  },
  {
    id: 1,
    name: 'Rachid O.',
    rating: 5,
    date: 'Juin 2025',
    comment: 'Très bonnes pizzas, ça fait plus de 20 ans que je suis client... et ils sont toujours là. Il y a une raison !',
  },
  {
    id: 2,
    name: 'Delhya C.',
    rating: 5,
    date: 'Septembre 2025',
    comment: 'Le gérant très accueillant, blagueur, les pizzas trop bonnes — 3 pizzas, 3 bases différentes mais même plaisir pour les 3. Je valide fort, et je recommande.',
  },
  {
    id: 3,
    name: 'Oualid E.',
    rating: 5,
    date: 'Mai 2025',
    comment: 'Franchement, une des meilleures pizzas que j\'ai mangées ! Produits frais, pâte top, rien à dire. Allez-y les yeux fermés !',
  },
  {
    id: 4,
    name: 'Éric L.',
    rating: 5,
    date: 'Février 2025',
    comment: 'Les pizzas sont délicieuses, avec une pâte préparée sur place. Et l\'accueil toujours souriant. Ça fait plaisir.',
  },
  {
    id: 5,
    name: 'Stecy I.',
    rating: 5,
    date: 'Janvier 2025',
    comment: 'Accueil agréable, personnel tellement gentil. J\'ai l\'habitude de commander et je ne suis jamais — mais au grand jamais — déçu. Je recommande vivement.',
  },
  {
    id: 6,
    name: 'Christian E.',
    rating: 5,
    date: 'Juin 2025',
    comment: 'Endroit convivial, chaleureux et agréable. Les pâtes à la carbonara et les pâtes à la napolitaine étaient excellentes à souhait.',
  },
];

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % avisClients.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-primary-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-black mb-4">
            Avis de nos clients
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez ce que nos clients pensent de Mezzora Pizza
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex gap-1">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-yellow-500">4.5</span>
            <span className="text-gray-600">sur Google (218 avis)</span>
          </div>
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 min-h-[280px]">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-green-200 opacity-50" />
            
            <div className="relative z-10">
              <div className="flex gap-1 mb-4 justify-center">
                {renderStars(avisClients[currentIndex].rating)}
              </div>

              <p className="text-gray-800 text-lg leading-relaxed mb-6 text-center italic">
                "{avisClients[currentIndex].comment}"
              </p>

              <div className="text-center">
                <p className="font-bold text-black text-lg">
                  {avisClients[currentIndex].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {avisClients[currentIndex].date}
                </p>
              </div>
            </div>

            <Quote className="absolute bottom-6 right-6 w-12 h-12 text-green-200 opacity-50 rotate-180" />
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {avisClients.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-green-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Voir l'avis ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.google.com/maps/place/MEZZORA+pizza/@48.8735939,2.1867286,16z/data=!3m2!4b1!5s0x47e664a75afcbfbf:0x75a13945fd042a2e!4m6!3m5!1s0x47e664a75adfd36d:0x63b4903468693a1c!8m2!3d48.8735904!4d2.1893035!16s%2Fg%2F1tgb6njv?entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Voir tous les avis sur Google
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
