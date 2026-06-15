import React from 'react';

const Tarifs = () => {
  return (
    <section className="py-16 bg-white" id="tarifs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-black mb-4">
            Tarifs & Livraison
          </h2>
          <p className="text-gray-600 text-lg">
            Nos tarifs pour les pizzas Sénior et Méga
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card-bg p-8 rounded-2xl shadow-lg border-2 border-green-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">À Emporter</h3>
              <p className="text-sm text-gray-600">Venez récupérer votre commande</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="font-semibold text-gray-700">Pizza Sénior</span>
                <span className="text-2xl font-bold text-green-600">22,00 €</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="font-semibold text-gray-700">Pizza Méga</span>
                <span className="text-2xl font-bold text-green-600">27,00 €</span>
              </div>
            </div>
            <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-yellow-800 font-semibold">
                ⭐ Offre spéciale : 2 pizzas achetées = la 3ème offerte !
              </p>
            </div>
          </div>

          <div className="bg-card-bg p-8 rounded-2xl shadow-lg border-2 border-gray-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">En Livraison</h3>
              <p className="text-sm text-gray-600">Livraison à domicile</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="font-semibold text-gray-700">Pizza Sénior</span>
                <span className="text-2xl font-bold text-gray-700">28,00 €</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="font-semibold text-gray-700">Pizza Méga</span>
                <span className="text-2xl font-bold text-gray-700">36,00 €</span>
              </div>
            </div>
            <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800 font-semibold">
                🚗 Frais de livraison : 6,00 € (zone de livraison limitée)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h4 className="font-bold text-lg text-black mb-3 text-center">
              Zone de livraison
            </h4>
            <p className="text-gray-600 text-sm text-center">
              Nous livrons dans un rayon de 3 km autour de notre pizzeria à Rueil-Malmaison. 
              Pour toute question sur la livraison, n'hésitez pas à nous appeler au 01.47.49.49.04
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tarifs;
