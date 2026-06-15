import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CGVPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onNavigate={() => {}} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-black mb-6">Conditions Générales de Vente</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Champ d’application</h2>
            <p>
              Les présentes conditions générales de vente (CGV) régissent toutes les commandes passées via le site mezzorapizza.fr.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Produits</h2>
            <p>
              Les produits proposés sont des pizzas, paninis, salades, plats de pâtes, desserts, boissons et autres spécialités indiquées sur le site.
            </p>
            <p className="mt-2">
              Les photographies ont une valeur indicative et ne sauraient engager la responsabilité de Mezzora Pizza.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Prix</h2>
            <p>
              Les prix indiqués sont en euros et incluent toutes les taxes applicables. Les frais de livraison peuvent s’appliquer en fonction des conditions choisies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Commande</h2>
            <p>
              La commande est validée une fois le paiement effectué et la confirmation reçue. Mezzora Pizza se réserve le droit de refuser toute commande pour des raisons légitimes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Paiement</h2>
            <p>
              Le paiement se fait en ligne ou par téléphone selon les moyens proposés. La commande est garantie après validation du paiement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Retrait et livraison</h2>
            <p>
              Les commandes à emporter sont retirées au restaurant à l’adresse indiquée. Les livraisons sont effectuées selon la zone de desserte et les conditions affichées sur le site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Responsabilité</h2>
            <p>
              Mezzora Pizza met en œuvre tous les moyens raisonnables pour assurer la disponibilité du service et la qualité des produits. La responsabilité ne saurait être engagée en cas d’événement extérieur indépendant de sa volonté.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Droit de rétractation</h2>
            <p>
              Conformément à la réglementation en vigueur, le droit de rétractation ne s’applique pas aux produits périssables ou préparés sur mesure, notamment les plats cuisinés et pizzas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Litiges</h2>
            <p>
              En cas de litige, la langue de référence est le français. Les tribunaux compétents seront ceux du ressort du siège social de Mezzora Pizza.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGVPage;
