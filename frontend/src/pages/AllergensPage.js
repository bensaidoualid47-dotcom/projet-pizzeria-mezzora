import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const allergens = [
  {
    id: 1,
    emoji: '🌾',
    name: 'Gluten',
    description: 'Céréales contenant du gluten : blé, seigle, orge, avoine, épeautre, kamut.',
    present: true,
  },
  {
    id: 2,
    emoji: '🦞',
    name: 'Crustacés',
    description: 'Crevettes, homard, crabe, langoustine et produits dérivés.',
    present: false,
  },
  {
    id: 3,
    emoji: '🥚',
    name: 'Œufs',
    description: 'Œufs et produits à base d\'œufs.',
    present: true,
  },
  {
    id: 4,
    emoji: '🐟',
    name: 'Poissons',
    description: 'Poissons et produits à base de poissons.',
    present: true,
  },
  {
    id: 5,
    emoji: '🥜',
    name: 'Arachides',
    description: 'Cacahuètes et produits à base d\'arachides.',
    present: false,
  },
  {
    id: 6,
    emoji: '🫘',
    name: 'Soja',
    description: 'Soja et produits à base de soja.',
    present: false,
  },
  {
    id: 7,
    emoji: '🥛',
    name: 'Lait',
    description: 'Lait et produits laitiers (lactose inclus) : mozzarella, crème fraîche, fromages.',
    present: true,
  },
  {
    id: 8,
    emoji: '🌰',
    name: 'Fruits à coque',
    description: 'Amandes, noisettes, noix, noix de cajou, pistaches, noix de macadamia, etc.',
    present: true,
  },
  {
    id: 9,
    emoji: '🥬',
    name: 'Céleri',
    description: 'Céleri et produits à base de céleri.',
    present: false,
  },
  {
    id: 10,
    emoji: '🌿',
    name: 'Moutarde',
    description: 'Moutarde et produits à base de moutarde.',
    present: false,
  },
  {
    id: 11,
    emoji: '🌱',
    name: 'Sésame',
    description: 'Graines de sésame et produits à base de sésame.',
    present: true,
  },
  {
    id: 12,
    emoji: '🍷',
    name: 'Sulfites',
    description: 'Dioxyde de soufre et sulfites à des concentrations > 10 mg/kg ou 10 mg/L.',
    present: false,
  },
  {
    id: 13,
    emoji: '🌸',
    name: 'Lupin',
    description: 'Lupin et produits à base de lupin.',
    present: false,
  },
  {
    id: 14,
    emoji: '🦑',
    name: 'Mollusques',
    description: 'Mollusques et produits à base de mollusques.',
    present: false,
  },
];

const AllergensPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Retour */}
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          {/* Titre */}
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              Informations Allergènes
            </h1>
            <p className="text-gray-500 text-sm lg:text-base">
              Conformément au règlement européen UE n°1169/2011, Mezzora Pizza vous informe de la présence des 14 allergènes majeurs dans ses produits.
            </p>
          </div>

          {/* Grille allergènes */}
          <h2 className="text-xl font-black text-gray-900 mb-5">Les 14 allergènes réglementaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {allergens.map((allergen) => (
              <div
                key={allergen.id}
                className={`bg-white rounded-2xl p-5 border-2 flex items-start gap-4 ${
                  allergen.present
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-gray-100'
                }`}
              >
                <span className="text-3xl flex-shrink-0">{allergen.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-gray-900">{allergen.name}</h3>
                    {allergen.present ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2 py-0.5 rounded-full">
                        Présent
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                        Absent
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{allergen.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note légale */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <h2 className="font-black text-gray-900 mb-3">Note sur nos produits</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">•</span> Notre pâte à pizza est fabriquée avec de la <strong>farine de blé (gluten)</strong>.</li>
              <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">•</span> La <strong>mozzarella et les fromages</strong> sont présents dans la majorité de nos pizzas (lait).</li>
              <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">•</span> Certaines pizzas contiennent des <strong>œufs</strong> (Cow-Boy, Carbonara, Soufflée…).</li>
              <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">•</span> Notre pizza <strong>Nordic et les pâtes saumon</strong> contiennent du poisson.</li>
              <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">•</span> La pizza <strong>1000 & 1 Nuits</strong> contient des fruits à coque (amandes effilées).</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h2 className="font-black text-gray-900 mb-2">Une allergie spécifique ?</h2>
            <p className="text-gray-600 text-sm mb-4">
              Pour toute question sur la composition d'un plat ou pour un régime alimentaire particulier, n'hésitez pas à nous contacter directement avant de commander.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0147494904"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition"
              >
                <Phone className="w-4 h-4" />
                01.47.49.49.04
              </a>
              <a
                href="mailto:mezzora92500@gmail.com"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition"
              >
                <Mail className="w-4 h-4" />
                mezzora92500@gmail.com
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllergensPage;
