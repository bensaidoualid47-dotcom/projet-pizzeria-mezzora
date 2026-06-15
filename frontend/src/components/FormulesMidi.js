import React from 'react';
import { formulesMidi } from '../data/menuData';
import { Clock, CheckCircle2 } from 'lucide-react';

const FormulesMidi = () => {
  return (
    <section className="py-10 lg:py-16 bg-white" id="formules">
      <div className="container mx-auto px-4">

        {/* EN-TÊTE */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-5 py-2 rounded-full mb-4">
            <Clock className="w-4 h-4 text-green-700" />
            <span className="text-green-700 font-bold tracking-wide uppercase text-xs">Du lundi au samedi</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            FORMULES MIDI
          </h2>
          <p className="text-gray-400 text-sm lg:text-base">
            De 11h00 à 14h30 — La pause déjeuner parfaite
          </p>
        </div>

        {/* GRILLE DES FORMULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {formulesMidi.map((formule) => (
            <div
              key={formule.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Badge UNIQUE */}
              {formule.id === 'pizza-sandwich' && (
                <div className="bg-green-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                  ✦ UNIQUE
                </div>
              )}

              {/* IMAGE */}
              <div className="w-full h-40 overflow-hidden bg-gray-50">
                <img
                  src={formule.image}
                  alt={formule.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* CONTENU */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-black text-gray-900 mb-1 leading-tight">
                    {formule.name}
                  </h3>
                  <p className="text-gray-700 text-xs leading-relaxed mb-3">
                    {formule.description}
                  </p>
                  {formule.exclusions && (
                    <p className="text-xs text-gray-600 italic bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                      {formule.exclusions}
                    </p>
                  )}
                </div>

                {/* PRIX */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end">
                  <span className="text-2xl font-black text-gray-900">
                    {formule.price.toFixed(2)}<span className="text-base text-green-600 ml-1">€</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BLOC ENGAGEMENTS */}
        <div className="mt-12 lg:mt-16 max-w-4xl mx-auto">
          <div className="bg-green-50 border-2 border-green-200 p-6 lg:p-10 rounded-2xl">
            <h4 className="font-black text-lg lg:text-xl text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              NOS ENGAGEMENTS FRAÎCHEUR
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
                <span className="text-green-600 font-black text-lg mb-2 block">01.</span>
                <span className="text-sm text-gray-700 leading-relaxed">100% Pâte fraîche préparée chaque jour dans nos locaux</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
                <span className="text-green-600 font-black text-lg mb-2 block">02.</span>
                <span className="text-sm text-gray-700 leading-relaxed">Légumes frais sélectionnés rigoureusement au quotidien</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
                <span className="text-green-600 font-black text-lg mb-2 block">03.</span>
                <span className="text-sm text-gray-700 leading-relaxed">Viande fraîche de haute qualité garantie pour chaque recette</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FormulesMidi;
