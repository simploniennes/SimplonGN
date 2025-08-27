import React from 'react';
import { Code, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Mission */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Simplon Guinée</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              École du numérique gratuite et inclusive, au service des talents et de l’emploi en Guinée.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-400"><Mail className="w-4 h-4 mr-2" /> contact@simplon-guinee.org</li>
              <li className="flex items-center text-gray-400"><Phone className="w-4 h-4 mr-2" /> +224 123 456 789</li>
              <li className="flex items-center text-gray-400"><MapPin className="w-4 h-4 mr-2" /> Kaloum, Conakry</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
              <li><Link to="/formations" className="text-gray-300 hover:text-white">Formations</Link></li>
              <li><Link to="/nos-talents" className="text-gray-300 hover:text-white">Nos Talents</Link></li>
              <li><Link to="/projets" className="text-gray-300 hover:text-white">Projets</Link></li>
              <li><Link to="/actualites" className="text-gray-300 hover:text-white">Actualités</Link></li>
              <li><Link to="/a-propos" className="text-gray-300 hover:text-white">À propos</Link></li>
              <li><Link to="/entreprises" className="text-gray-300 hover:text-white">Entreprises</Link></li>
              <li><Link to="/candidater" className="text-gray-300 hover:text-white">Candidater</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Trainings */}
          <div>
            <h3 className="text-white font-semibold mb-4">Formations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/formations" className="text-gray-300 hover:text-white">Développement Web</Link></li>
              <li><Link to="/formations" className="text-gray-300 hover:text-white">Data Science</Link></li>
              <li><Link to="/formations" className="text-gray-300 hover:text-white">Marketing Digital</Link></li>
              <li><Link to="/formations" className="text-gray-300 hover:text-white">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-4">Restez connectés</h3>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex items-center px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </a>
              <a href="#" className="inline-flex items-center px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-200">
                <Github className="w-4 h-4 mr-2" /> GitHub <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {year} Simplon Guinée. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/mentions-legales" className="text-gray-300 hover:text-white">Mentions légales</Link>
            <span className="text-gray-600">•</span>
            <Link to="/confidentialite" className="text-gray-300 hover:text-white">Confidentialité</Link>
            <span className="text-gray-600">•</span>
            <Link to="/conditions" className="text-gray-300 hover:text-white">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
