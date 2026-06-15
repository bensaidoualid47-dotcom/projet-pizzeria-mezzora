import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mezzora Pizza</h3>
            <p className="text-gray-400 mb-4">
              28 ans de passion pour la pizza artisanale à Rueil-Malmaison
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61590614259982" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mezzorapizza" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Horaires d'ouverture</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Lundi - Samedi</p>
                  <p>11h00 - 14h30</p>
                  <p>18h00 - 22h30</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Dimanche</p>
                  <p>18h00 - 22h30</p>
                  <p className="text-xs italic">(fermé le midi)</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <a 
                href="tel:0147494904" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>01.47.49.49.04</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>
                  4-6 Avenue du Président Georges Pompidou<br />
                  92500 Rueil-Malmaison
                </p>
              </div>
              <a 
                href="mailto:contact@mezzorapizza.fr" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>mezzora92500@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; 2026 Mezzora Pizza. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/mentions-legales" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/cgv" className="hover:text-white transition-colors">
                CGV
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <Link to="/allergenes" className="hover:text-white transition-colors">
                Allergènes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
