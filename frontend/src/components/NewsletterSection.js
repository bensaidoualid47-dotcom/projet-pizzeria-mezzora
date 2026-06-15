import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://${window.location.hostname}:8001`;

const NewsletterSection = () => {
  const [form, setForm] = useState({ prenom: '', email: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'already' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await axios.post(`${BACKEND_URL}/api/newsletter/subscribe/`, form);
      if (res.data.status === 'already_subscribed') {
        setStatus('already');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-green-50 border-t border-green-100 py-14">
      <div className="container mx-auto px-4 max-w-2xl text-center">

        {/* Icône */}
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-2xl mb-5 shadow-md">
          <Mail className="w-7 h-7 text-white" />
        </div>

        {/* Titre */}
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
          Restez dans la boucle 🍕
        </h2>
        <p className="text-gray-500 text-sm lg:text-base mb-8">
          Offres exclusives, nouveautés, promos du week-end — inscrivez-vous, c'est gratuit.
        </p>

        {/* Formulaire */}
        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 text-green-700">
            <CheckCircle className="w-10 h-10" />
            <p className="font-bold text-lg">Vous êtes inscrit(e) !</p>
            <p className="text-sm text-gray-500">Un email de confirmation vous a été envoyé.</p>
          </div>
        ) : status === 'already' ? (
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <p className="font-bold text-lg">Vous êtes déjà inscrit(e) !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 transition"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 transition"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Envoi...' : "S'inscrire"}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-sm mt-3">Une erreur est survenue. Réessayez.</p>
        )}

        <p className="text-gray-400 text-xs mt-5">
          Pas de spam. Désinscription possible à tout moment.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
