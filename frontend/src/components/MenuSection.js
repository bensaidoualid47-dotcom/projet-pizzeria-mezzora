import React, { useState } from 'react';
import {
  pizzasBaseTomate,
  pizzasBaseCreme,
  pizzasBaseBBQ,
  calzones,
  pates,
  texMex,
  sandwichs,
  salades,
  paninisClassiques,
  paninisGourmands,
  dessertsPatisseries,
  dessertsGlaces,
  boissons
} from '../data/menuData';
import { Award, X } from 'lucide-react';

const MenuSection = ({ activeRubric = 'menu', activeCategory = 'pizzas-tomate' }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  /* ── MODAL ── */
  const Modal = ({ item, onClose }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image grande */}
        {item.image && (
          <div className="w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden p-4">
            <img
              src={item.image}
              alt={item.name}
              className="max-w-full max-h-full object-contain drop-shadow-md"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        {/* Contenu */}
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {item.premium && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Award className="w-3 h-3" /> PREMIUM
            </span>
          )}

          <h2 className="text-2xl font-black text-black mb-2">{item.name}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {item.ingredients || item.description}
          </p>

          {/* Prix pizzas (junior/senior/mega) */}
          {item.junior && (
            <div className="flex gap-3">
              <div className="flex-1 text-center bg-gray-50 rounded-xl py-3">
                <p className="text-xs text-gray-500 mb-1">Junior</p>
                <p className="font-black text-green-600">{item.junior.toFixed(2)} €</p>
              </div>
              <div className="flex-1 text-center bg-gray-50 rounded-xl py-3">
                <p className="text-xs text-gray-500 mb-1">Senior</p>
                <p className="font-black text-green-600">{item.senior.toFixed(2)} €</p>
              </div>
              <div className="flex-1 text-center bg-gray-50 rounded-xl py-3">
                <p className="text-xs text-gray-500 mb-1">Méga</p>
                <p className="font-black text-green-600">{item.mega.toFixed(2)} €</p>
              </div>
            </div>
          )}

          {/* Prix simple */}
          {item.price && (
            <div className="text-right">
              <span className="text-3xl font-black text-green-600">{item.price.toFixed(2)} €</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const PizzaCard = ({ pizza }) => {
    return (
      <div
        className="menu-card bg-white rounded-xl shadow-lg ring-1 ring-gray-100 relative overflow-hidden cursor-pointer"
        onClick={() => setSelectedItem(pizza)}
      >
        {pizza.image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={pizza.image} 
              alt={pizza.name} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}
        <div className="p-5">
          {pizza.premium && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
              <Award className="w-3 h-3" />
              PREMIUM
            </div>
          )}
          <h3 className="text-xl font-bold text-black mb-2">{pizza.name}</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{pizza.ingredients}</p>

          <div className="border-t pt-4">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Nos tailles :</p>
            <div className="flex gap-2 justify-between">
              <div className="text-center flex-1 bg-gray-50 rounded-lg py-2">
                <p className="text-xs text-gray-500">Junior</p>
                <p className="font-bold text-green-600 text-sm">{pizza.junior.toFixed(2)}€</p>
              </div>
              <div className="text-center flex-1 bg-gray-50 rounded-lg py-2">
                <p className="text-xs text-gray-500">Senior</p>
                <p className="font-bold text-green-600 text-sm">{pizza.senior.toFixed(2)}€</p>
              </div>
              <div className="text-center flex-1 bg-gray-50 rounded-lg py-2">
                <p className="text-xs text-gray-500">Méga</p>
                <p className="font-bold text-green-600 text-sm">{pizza.mega.toFixed(2)}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SimpleItemCard = ({ item }) => (
    <div
      className="menu-card bg-white rounded-xl shadow-lg ring-1 ring-gray-100 overflow-hidden cursor-pointer"
      onClick={() => setSelectedItem(item)}
    >
      {item.image && (
        <div className="h-48 overflow-hidden bg-white flex items-center justify-center p-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      <div className="p-5 bg-white">
        <h3 className="text-xl font-bold text-black mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {item.description || item.ingredients}
        </p>
        <div className="flex items-center justify-end">
          <span className="text-2xl font-bold text-green-600">
            {item.price.toFixed(2)} €
          </span>
        </div>
      </div>
    </div>
  );

  const DrinkCard = ({ item }) => (
    <div
      className="bg-white rounded-lg p-4 flex items-center justify-between ring-1 ring-gray-100 hover:shadow-lg transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden cursor-pointer"
      onClick={() => setSelectedItem(item)}
    >
      <div className="flex flex-col z-10">
        <h3 className="text-base font-black text-gray-900 uppercase tracking-tight pr-2">{item.name}</h3>
        <span className="font-bold text-gray-800 mt-1 text-sm">{item.price.toFixed(2)} €</span>
      </div>
      {item.image && (
        <div className="flex-shrink-0 ml-2 flex items-center justify-center bg-white" style={{ width: '72px', height: '96px' }}>
          <img
            src={item.image}
            alt={item.name}
            className="drop-shadow-md"
            style={{ width: '72px', height: '96px', objectFit: 'contain' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
    <div className="bg-white py-6 scroll-mt-56">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Click & Collect description */}
        {activeRubric === 'offres' && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-xl shadow-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-center text-black mb-4">
                🎁 OFFRES SPÉCIALES CLICK & COLLECT
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-xl shadow-md border-2 border-red-400">
                  <h4 className="text-lg font-bold text-red-600 mb-2">🛍️ À EMPORTER</h4>
                  <div className="bg-red-50 p-3 rounded-lg mb-2">
                    <p className="font-bold text-red-700 text-sm">2 Pizzas Achetées = La 3ème OFFERTE !</p>
                    <p className="text-xs text-gray-500 italic">* Sauf Nordic & 1000 & 1 Nuits</p>
                  </div>
                  <p className="text-sm text-gray-700">• 2 Pizzas Senior → 22,00 €</p>
                  <p className="text-sm text-gray-700">• 2 Pizzas Méga → 27,00 €</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border-2 border-blue-400">
                  <h4 className="text-lg font-bold text-blue-600 mb-2">🚗 LIVRAISON</h4>
                  <p className="text-sm text-gray-700">• 2 Pizzas Senior → 28,00 €</p>
                  <p className="text-sm text-gray-700">• 2 Pizzas Méga → 36,00 €</p>
                  <div className="bg-yellow-100 p-2 rounded-lg mt-2">
                    <p className="text-xs text-yellow-800 font-semibold">🎁 Livraison GRATUITE dès 12€ le soir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenu selon la catégorie active */}
        {activeCategory === 'pizzas-tomate' && (
          <section id="pizzas-tomate" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Pizzas Base Tomate</h3>
              <p className="text-gray-600">Nos pizzas traditionnelles sur base de sauce tomate</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzasBaseTomate.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'pizzas-creme' && (
          <section id="pizzas-creme" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Pizzas Base Crème</h3>
              <p className="text-gray-600">Nos pizzas onctueuses sur base de crème fraîche</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzasBaseCreme.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'pizzas-bbq' && (
          <section id="pizzas-bbq" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Pizzas Base BBQ</h3>
              <p className="text-gray-600">Nos pizzas gourmandes sur base de sauce BBQ</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzasBaseBBQ.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'calzones' && (
          <section id="calzones" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Calzones</h3>
              <p className="text-gray-600">Nos pizzas pliées et garnies généreusement</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calzones.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'pates' && (
          <section id="pates" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Pâtes</h3>
              <p className="text-gray-600">Nos penne fraîches avec sauce au choix</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pates.map((item) => (
                <SimpleItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'paninis' && (
          <section id="paninis" className="scroll-mt-56">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">Paninis Classiques</h3>
              <p className="text-gray-600 mb-4">Nos paninis traditionnels</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paninisClassiques.map((item) => (
                  <SimpleItemCard key={item.id} item={item} />
                ))}
              </div>

              <h3 className="text-2xl font-bold text-black mb-2 mt-8">Paninis Gourmands</h3>
              <p className="text-gray-600 mb-4">Nos paninis spéciaux avec garnitures premium</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paninisGourmands.map((item) => (
                  <SimpleItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {activeCategory === 'texmex' && (
          <section id="texmex" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Tex-Mex</h3>
              <p className="text-gray-600">Nos spécialités croustillantes et savoureuses</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {texMex.map((item) => (
                <SimpleItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'switch' && (
          <section id="switch" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Switch</h3>
              <p className="text-gray-600">Notre spécialité Switch</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sandwichs.map((item) => (
                <SimpleItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'salades' && (
          <section id="salades" className="scroll-mt-56">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-2">Salades</h3>
              <p className="text-gray-600">Nos grandes salades fraîches et complètes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salades.map((item) => (
                <SimpleItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === 'desserts' && (
          <section id="desserts" className="scroll-mt-56">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">Pâtisseries & Douceurs</h3>
              <p className="text-gray-600 mb-4">Nos desserts </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {dessertsPatisseries.map((item) => (
                  <SimpleItemCard key={item.id} item={item} />
                ))}
              </div>

              <h3 className="text-2xl font-bold text-black mb-2 mt-8">Glaces Ben & Jerry's</h3>
              <p className="text-gray-600 mb-4">Petits pots 100ml et grands pots 465ml</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dessertsGlaces.map((item) => (
                  <SimpleItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {activeCategory === 'boissons' && (
          <section id="boissons" className="scroll-mt-56">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">Boissons</h3>
              <p className="text-gray-600">Nos boissons pour accompagner votre repas</p>
            </div>

            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Canettes & Bouteilles 33cl</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {boissons.filter(item => item.price <= 2.5).map((item) => (
                <DrinkCard key={item.id} item={item} />
              ))}
            </div>

            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Grandes Bouteilles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {boissons.filter(item => item.price > 2.5).map((item) => (
                <DrinkCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>

    {/* MODAL PRODUIT */}
    {selectedItem && (
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    )}
    </>
  );
};

export default MenuSection;