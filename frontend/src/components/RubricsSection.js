import React, { useState, useEffect } from 'react';
import { ArrowRight, X, ShoppingBag, Truck, Zap, Star } from 'lucide-react';
import MenuSection from './MenuSection';
import FormulesMidi from './FormulesMidi';

const RubricsSection = ({ onRubricSelect, activeRubric, onCloseMenu }) => {
  const [activeCategory, setActiveCategory] = useState('pizzas-tomate');

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  useEffect(() => {
    if (activeRubric !== 'menu') return;
    const targetId = activeCategory || 'menu-content';
    const targetElement = document.getElementById(targetId) || document.getElementById('menu-content');
    if (!targetElement) return;

    const headerOffset = 240;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

    const scrollIntoPlace = () => window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    scrollIntoPlace();
    const timeoutId = window.setTimeout(scrollIntoPlace, 260);

    return () => window.clearTimeout(timeoutId);
  }, [activeCategory, activeRubric]);

  // Si une rubrique est active, on affiche son contenu directement
  if (activeRubric) {
    const showCategoryTabs = activeRubric === 'menu';
    
    return (
      <section className="bg-[#F8F9FA] min-h-screen" id="rubrics">
        {/* BARRE STICKY */}
        <div className="sticky top-[60px] lg:top-[72px] z-40 bg-white/80 backdrop-blur-md shadow-sm border-b transition-all duration-300">
          {/* Ligne 1: Navigation principale */}
          <div className="py-3 px-4">
            <div className="container mx-auto flex items-center justify-between">
              <button onClick={onCloseMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>

              <div className="flex gap-2 bg-gray-100 p-1 rounded-full overflow-x-auto scrollbar-hide max-w-full">
                <button 
                  onClick={() => onRubricSelect('menu')} 
                  className={`px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-bold transition-all whitespace-nowrap ${activeRubric === 'menu' ? 'bg-white shadow-md text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  🍕 Menu
                </button>
                <button 
                  onClick={() => onRubricSelect('offres-midi')} 
                  className={`px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-bold transition-all whitespace-nowrap ${activeRubric === 'offres-midi' ? 'bg-white shadow-md text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  ⏰ Formules
                </button>
              </div>
              <div className="w-6 lg:w-10"></div> 
            </div>
          </div>

          {/* Ligne 2: Onglets catégories (Cachée dans Offres et Formules) */}
          {showCategoryTabs && (
            <div className="py-3 px-2 overflow-x-auto border-t bg-white scrollbar-hide">
              <div className="flex gap-3 container mx-auto justify-start lg:justify-center min-w-max">
                {[
                  { id: 'pizzas-tomate', label: '🍅 Tomate' },
                  { id: 'pizzas-creme', label: '🧈 Crème' },
                  { id: 'pizzas-bbq', label: '🔥 BBQ' },
                  { id: 'calzones', label: '🥟 Calzones' },
                  { id: 'pates', label: '🍝 Pâtes' },
                  { id: 'paninis', label: '🥖 Paninis' },
                  { id: 'switch', label: '🍔 Switch' },
                  { id: 'texmex', label: '🌶️ Tex-Mex' },
                  { id: 'salades', label: '🥗 Salades' },
                  { id: 'desserts', label: '🍰 Desserts' },
                  { id: 'boissons', label: '🥤 Boissons' },
                ].map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => handleCategoryClick(cat.id)} 
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenu de la rubrique sélectionnée */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          
          {/* 1. Formules Midi */}
          {activeRubric === 'offres-midi' && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <FormulesMidi />
            </div>
          )}

          {/* 2. Offres */}
          {activeRubric === 'offres' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-black text-black mb-2 tracking-tight">NOS OFFRES</h2>
                <p className="text-gray-400 text-sm">Des avantages pensés pour toutes vos envies.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* OFFRE 1: 3ème OFFERTE */}
                <div className="relative bg-green-50 border-2 border-green-200 rounded-2xl p-6 lg:p-8 overflow-hidden col-span-1 md:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ShoppingBag className="text-green-600 w-4 h-4" />
                        <span className="text-green-700 text-xs font-bold uppercase tracking-widest">À emporter</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-2">
                        2 pizzas achetées
                      </h3>
                      <p className="text-green-700 font-black text-xl lg:text-2xl mb-3">= la 3ème offerte 🎉</p>
                      <p className="text-gray-600 text-xs">* Valable sur Senior et Méga. La moins chère est offerte. Non cumulable.</p>
                    </div>
                    <div className="flex-shrink-0 bg-green-600 text-white rounded-2xl px-8 py-6 text-center shadow-md">
                      <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">La 3ème</p>
                      <p className="text-4xl font-black">OFFERTE</p>
                    </div>
                  </div>
                </div>

                {/* OFFRE 2: TARIF DUO À EMPORTER */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingBag className="text-green-600 w-4 h-4" />
                    <span className="text-green-700 text-xs font-bold uppercase tracking-widest">À emporter</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-5">Tarif duo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                      <span className="text-sm font-semibold text-gray-600">2 Pizzas Senior</span>
                      <span className="text-2xl font-black text-gray-900">22 €</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                      <span className="text-sm font-semibold text-gray-600">2 Pizzas Méga</span>
                      <span className="text-2xl font-black text-gray-900">27 €</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">* Sauf Nordic et 1000 & 1 Nuits</p>
                </div>

                {/* OFFRE 3: EN LIVRAISON */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="text-green-600 w-4 h-4" />
                    <span className="text-green-700 text-xs font-bold uppercase tracking-widest">En livraison</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-5">Tarif duo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                      <span className="text-sm font-semibold text-gray-600">2 Pizzas Senior</span>
                      <span className="text-2xl font-black text-gray-900">28 €</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                      <span className="text-sm font-semibold text-gray-600">2 Pizzas Méga</span>
                      <span className="text-2xl font-black text-gray-900">36 €</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-600 text-white text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider">
                    🚀 Livraison gratuite dès 12 € le soir
                  </div>
                </div>

                {/* OFFRE 4: TAILLE SUPÉRIEURE */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm col-span-1 md:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="text-green-600 w-4 h-4" />
                        <span className="text-green-700 text-xs font-bold uppercase tracking-widest">À emporter uniquement</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">Upgrade de taille</h3>
                      <p className="text-gray-700 text-sm font-medium">Junior + 1 € → Senior &nbsp;|&nbsp; Senior + 1 € → Méga</p>
                    </div>
                    <div className="flex-shrink-0 bg-gray-900 text-white rounded-2xl px-10 py-5 text-center shadow-md">
                      <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-90">seulement</p>
                      <p className="text-4xl font-black">+ 1 €</p>
                      <p className="text-xs opacity-90 mt-1">par taille supérieure</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. Menu Pizzas/Produits */}
          {activeRubric === 'menu' && (
            <div id="menu-content">
              <MenuSection activeRubric={activeRubric} activeCategory={activeCategory} />
            </div>
          )}
        </div>
      </section>
    );
  }

  // Affichage par défaut (Grandes cartes)
  return (
    <section className="py-12 lg:py-20 bg-gray-50" id="rubrics">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-black mb-4 tracking-tight">
            Découvrez notre carte
          </h2>
          <p className="text-gray-500 text-base lg:text-lg">
            Menu, formules midi et offres exclusives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Mezzora MENU */}
          <button
            onClick={() => onRubricSelect('menu')}
            className="relative overflow-hidden rounded-[2rem] shadow-xl transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl group h-[400px] lg:h-[500px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            </div>
            
            <div className="relative h-full flex flex-col justify-end p-6 lg:p-10 text-white">
              <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-6 mx-auto shadow-lg border border-white/30">
                  <span className="text-3xl lg:text-4xl">🍕</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-black mb-2 text-center tracking-tight">
                  Mezzora<br />MENU
                </h3>
                <div className="flex justify-center mt-6 lg:mt-8">
                  <span className="bg-green-600 text-white px-6 py-3 rounded-full text-xs lg:text-sm font-bold inline-flex items-center gap-2 uppercase tracking-wide">
                    Découvrir <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Mezzora OFFRES MIDI */}
          <button
            onClick={() => onRubricSelect('offres-midi')}
            className="relative overflow-hidden rounded-[2rem] shadow-xl transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl group h-[400px] lg:h-[500px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            </div>
            
            <div className="relative h-full flex flex-col justify-end p-6 lg:p-10 text-white">
              <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-6 mx-auto shadow-lg border border-white/30">
                  <span className="text-3xl lg:text-4xl">⏰</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-black mb-2 text-center tracking-tight">
                  Mezzora<br />OFFRES MIDI
                </h3>
                <div className="flex justify-center mt-6 lg:mt-8">
                  <span className="bg-yellow-500 text-black px-6 py-3 rounded-full text-xs lg:text-sm font-bold inline-flex items-center gap-2 uppercase tracking-wide">
                    Découvrir <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                </div>
              </div>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
};

export default RubricsSection;