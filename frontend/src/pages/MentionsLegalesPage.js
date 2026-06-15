import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MentionsLegalesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onNavigate={() => {}} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-black mb-6">Mentions légales</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Éditeur du site</h2>
            <p className="mb-2">Le site mezzorapizza.fr est édité par :</p>
            <p className="mb-2 font-semibold">Mezzora Pizza</p>
            <p className="mb-2">4-6 Avenue du Président Georges Pompidou</p>
            <p className="mb-2">92500 Rueil-Malmaison</p>
            <p className="mb-2">Téléphone : 01.47.49.49.04</p>
            <p className="mb-2">Email : mezzora92500@gmail.com</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Directeur de la publication</h2>
            <p>Le directeur de la publication est responsable du contenu éditorial du site.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Hébergement</h2>
            <p className="mb-2">Le site est hébergé par l'opérateur du service d'hébergement retenu par Mezzora Pizza.</p>
            <p className="mb-2">Adresse de l’hébergeur : Voir le contrat d’hébergement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur ce site (textes, images, logos, chartes graphiques, icônes, etc.) sont protégés par les lois françaises et internationales sur la propriété intellectuelle.
            </p>
            <p className="mt-2">
              Toute reproduction, représentation, modification ou utilisation partielle ou totale sans autorisation préalable est strictement interdite.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegalesPage;
