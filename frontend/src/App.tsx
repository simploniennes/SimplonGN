import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Formations from './pages/Formations';
import Projets from './pages/Projets';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NosTalents from './pages/NosTalents';
import { Apropos, Actualites, Candidater, Entreprises, FAQ, MentionsLegales, PolitiqueConfidentialite, ConditionsGenerales, Alumni } from './pages/AdditionalPages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/nos-talents" element={<NosTalents />} />
          <Route path="/a-propos" element={<Apropos />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/candidater" element={<Candidater />} />
          <Route path="/entreprises" element={<Entreprises />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions" element={<ConditionsGenerales />} />
          <Route path="/alumni" element={<Alumni />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;