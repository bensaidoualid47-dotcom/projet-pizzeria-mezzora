import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PolitiqueConfidentialitePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onNavigate={() => {}} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-black mb-6">Politique de confidentialité</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Collecte des données</h2>
            <p>
              Nous collectons uniquement les données nécessaires à la gestion des commandes, la facturation, et la communication avec nos clients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Données collectées</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Nom et prénom</li>
              <li>Adresse de livraison</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Informations de commande</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Utilisation des données</h2>
            <p>
              Les données sont utilisées pour traiter les commandes, contacter le client en cas de besoin, et améliorer notre service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Durée de conservation</h2>
            <p>
              Les données sont conservées pendant la durée nécessaire à la gestion de la commande et conformément aux obligations légales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Partage des données</h2>
            <p>
              Aucune donnée personnelle n'est vendue à des tiers. Les informations peuvent être partagées avec nos prestataires techniques et de livraison uniquement dans le cadre du traitement de la commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Droits des utilisateurs</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p>
              Pour toute demande relative à vos données personnelles, contactez-nous à mezzora92500@gmail.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialitePage;
