import React, { useState } from 'react';
import { Github, ExternalLink, Filter, Calendar, User } from 'lucide-react';

const Projets = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'web', name: 'Développement Web' },
    { id: 'mobile', name: 'Applications Mobiles' },
    { id: 'data', name: 'Data Science' },
    { id: 'design', name: 'UI/UX Design' }
  ];

  const projets = [
    {
      id: 1,
      title: 'E-Commerce Guinée',
      category: 'web',
      description: 'Plateforme de commerce électronique pour promouvoir les produits locaux guinéens.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      author: 'Mamadou Diallo',
      date: 'Mars 2024',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 2,
      title: 'GeoGuinée Mobile',
      category: 'mobile',
      description: 'Application mobile de géolocalisation des services publics en Guinée.',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'Firebase', 'Google Maps API'],
      author: 'Fatoumata Camara',
      date: 'Février 2024',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 3,
      title: 'Analyse Climat Guinée',
      category: 'data',
      description: 'Tableau de bord interactif pour analyser les données climatiques de la Guinée.',
      image: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
      author: 'Alpha Baldé',
      date: 'Janvier 2024',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 4,
      title: 'EduPlatform UI',
      category: 'design',
      description: 'Interface utilisateur moderne pour une plateforme éducative en ligne.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Figma', 'Adobe XD', 'Principle'],
      author: 'Aissatou Bah',
      date: 'Avril 2024',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Santé Connect',
      category: 'web',
      description: 'Système de gestion des rendez-vous médicaux en ligne.',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      author: 'Ibrahima Sow',
      date: 'Mars 2024',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Transport Tracker',
      category: 'mobile',
      description: 'Application de suivi en temps réel des transports en commun à Conakry.',
      image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Flutter', 'Node.js', 'Socket.io'],
      author: 'Mariama Keita',
      date: 'Février 2024',
      github: '#',
      demo: '#',
      featured: true
    }
  ];

  const filteredProjets = selectedFilter === 'all' 
    ? projets 
    : projets.filter(projet => projet.category === selectedFilter);

  const featuredProjets = projets.filter(projet => projet.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projets des Apprenants</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les réalisations exceptionnelles de nos apprenants qui transforment leurs idées en solutions numériques
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Projets à la une</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjets.map((projet) => (
              <div key={projet.id} className="group relative">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={projet.image}
                      alt={projet.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-amber">⭐ À la une</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{projet.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{projet.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{projet.author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{projet.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {projet.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={projet.github}
                        className="flex items-center justify-center flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                      <a
                        href={projet.demo}
                        className="flex items-center justify-center flex-1 btn btn-primary py-2 px-4 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Démo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjets.map((projet) => (
            <div key={projet.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={projet.image}
                  alt={projet.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{projet.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{projet.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{projet.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{projet.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projet.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={projet.github}
                    className="flex items-center justify-center flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                  <a
                    href={projet.demo}
                    className="flex items-center justify-center flex-1 btn btn-primary py-2 px-4 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Démo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Project CTA */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-red-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Vous avez un projet à partager ?</h2>
          <p className="text-red-100 mb-6 text-lg">
            Présentez votre travail à la communauté et inspirez d'autres apprenants
          </p>
          <button className="btn btn-light text-red-600 px-8 py-3 font-semibold">
            Soumettre un projet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projets;