import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onNavigate={() => {}} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-black mb-6">Cookies</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier déposé sur votre appareil lors de votre navigation sur un site internet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Cookies utilisés</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Cookies techniques : nécessaires au bon fonctionnement du site.</li>
              <li>Cookies de performance : anonymes, ils aident à mesurer l'audience et à améliorer le site.</li>
              <li>Cookies de préférences : pour mémoriser vos choix de navigation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Consentement</h2>
            <p>
              En poursuivant votre navigation sur ce site, vous acceptez l'utilisation des cookies conformément à cette politique.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Gestion des cookies</h2>
            <p>
              Vous pouvez à tout moment gérer ou supprimer les cookies via les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p>
              Pour toute question relative aux cookies, contactez-nous à mezzora92500@gmail.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;
