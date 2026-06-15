import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'mezzora_cookie_consent';
const POSTHOG_KEY = 'phc_CBKGuJKsMLkQZi4nTqDeEa6dd7T8Hd9oA4EtW9zpjii6';
const POSTHOG_HOST = 'https://us.i.posthog.com';

const loadPostHog = () => {
  if (window.posthog?.__loaded) return;
  !(function (t, e) {
    var o, n, p, r;
    e.__SV || ((window.posthog = e), (e._i = []), (e.init = function (i, s, a) {
      function g(t, e) { var o = e.split('.'); 2 == o.length && ((t = t[o[0]]), (e = o[1])); t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; }
      ((p = t.createElement('script')).type = 'text/javascript'), (p.crossOrigin = 'anonymous'), (p.async = !0),
        (p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js'),
        (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
      var u = e;
      void 0 !== a ? (u = e[a] = []) : (a = 'posthog');
      u.people = u.people || []; u.toString = function (t) { var e = 'posthog'; return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e; };
      u.people.toString = function () { return u.toString(1) + '.people (stub)'; };
      o = 'init capture identify reset get_distinct_id getGroups get_session_id opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing'.split(' ');
      for (n = 0; n < o.length; n++) g(u, o[n]);
      e._i.push([i, s, a]);
    }), (e.__SV = 1));
  })(document, window.posthog || []);
  window.posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    session_recording: { recordCrossOriginIframes: true, capturePerformance: false },
  });
};

const CookieConsentBanner = () => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(COOKIE_KEY);
    if (savedConsent) {
      setConsent(savedConsent);
      if (savedConsent === 'accepted') loadPostHog();
    }
  }, []);

  const handleConsent = (value) => {
    window.localStorage.setItem(COOKIE_KEY, value);
    setConsent(value);
    if (value === 'accepted') loadPostHog();
  };

  if (consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="max-w-3xl text-gray-900">
          <p className="text-sm sm:text-base">
            Ce site utilise des cookies techniques et analytiques pour améliorer votre expérience.
            Vous pouvez accepter ou refuser leur utilisation. Plus d'informations dans la page{' '}
            <a href="/cookies" className="text-green-700 underline">Cookies</a>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
          >
            Accepter
          </button>
          <button
            onClick={() => handleConsent('refused')}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
