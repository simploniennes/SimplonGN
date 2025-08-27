import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Users, BookOpen, Mail, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/', icon: Code },
    { name: 'Formations', href: '/formations', icon: BookOpen },
    { name: 'Nos Talents', href: '/nos-talents', icon: Users },
    { name: 'Projets', href: '/projets', icon: Briefcase },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-red-600 text-white">
        <div className="container py-1 text-[10px] sm:text-xs font-semibold">
          <div className="hidden md:flex items-center justify-between">
            <span className="tracking-widest">IN CODE WE TRUST</span>
            <div className="flex items-center gap-4">
              <a href="https://simplon.co" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">simplon.co</a>
              <span className="opacity-50">•</span>
              <a href="https://simplonfoundation.org" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">Fondation</a>
              <span className="opacity-50">•</span>
              <Link to="/actualites" className="opacity-90 hover:opacity-100">Actualités</Link>
              <span className="opacity-50">•</span>
              <Link to="/contact" className="opacity-90 hover:opacity-100">Contact</Link>
            </div>
          </div>
          <div className="flex md:hidden items-center justify-center">
            <span className="tracking-widest">IN CODE WE TRUST</span>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-lg">
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Simplon Guinée</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-2 py-2 text-sm font-semibold uppercase tracking-wide border-b-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-gray-900 border-red-600'
                    : 'text-gray-700 border-transparent hover:text-gray-900 hover:border-red-600'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/candidater"
              className="btn btn-primary px-4 py-2 text-sm"
            >
              Candidater
            </Link>
            <Link
              to="/login"
              className="btn btn-outline px-4 py-2 text-sm"
            >
              Connexion
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/candidater"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left btn btn-primary px-3 py-2 text-base"
              >
                Candidater
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left btn btn-outline px-3 py-2 text-base"
              >
                Connexion
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    </header>
  );
};

export default Navbar;