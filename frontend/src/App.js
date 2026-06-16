import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import CGVPage from "./pages/CGVPage";
import PolitiqueConfidentialitePage from "./pages/PolitiqueConfidentialitePage";
import CookiesPage from "./pages/CookiesPage";
import CookieConsentBanner from "./components/CookieConsentBanner";
import AllergensPage from "./pages/AllergensPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import NotificationPrompt from "./components/NotificationPrompt";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/cgv" element={<CGVPage />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/allergenes" element={<AllergensPage />} />
      </Routes>
      <CookieConsentBanner />
      <ScrollToTopButton />
      <NotificationPrompt />
    </BrowserRouter>
  );
}

export default App;