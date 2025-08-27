import React, { useState } from 'react';
import { Clock, Users, Award, ChevronRight } from 'lucide-react';

const Formations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'dev', name: 'Développement' },
    { id: 'data', name: 'Data Science' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' }
  ];

  const formations = [
    {
      id: 1,
      title: 'Développeur Web Full Stack',
      category: 'dev',
      description: 'Formation complète pour devenir développeur web frontend et backend avec les technologies modernes.',
      duration: '7 mois',
      places: '25',
      level: 'Débutant',
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Inscription ouverte'
    },
    {
      id: 2,
      title: 'Data Scientist',
      category: 'data',
      description: 'Apprenez à analyser et interpréter les données pour prendre des décisions stratégiques.',
      duration: '6 mois',
      places: '20',
      level: 'Intermédiaire',
      technologies: ['Python', 'SQL', 'Machine Learning', 'Tableau', 'R'],
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Prochaine session'
    },
    {
      id: 3,
      title: 'Marketing Digital',
      category: 'marketing',
      description: 'Maîtrisez les stratégies digitales et les outils de marketing en ligne.',
      duration: '4 mois',
      places: '30',
      level: 'Débutant',
      technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Marketing'],
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Inscription ouverte'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      category: 'design',
      description: 'Créez des interfaces utilisateur attractives et intuitives.',
      duration: '5 mois',
      places: '20',
      level: 'Débutant',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Prochaine session'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      category: 'dev',
      description: 'Automatisez et optimisez les processus de développement et déploiement.',
      duration: '6 mois',
      places: '15',
      level: 'Avancé',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Bientôt disponible'
    },
    {
      id: 6,
      title: 'Cybersécurité',
      category: 'dev',
      description: 'Protégez les systèmes informatiques contre les cyberattaques.',
      duration: '8 mois',
      places: '18',
      level: 'Intermédiaire',
      technologies: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Risk Assessment'],
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Inscription ouverte'
    }
  ];

  const filteredFormations = selectedCategory === 'all' 
    ? formations 
    : formations.filter(formation => formation.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Inscription ouverte': return 'bg-green-100 text-green-800';
      case 'Prochaine session': return 'bg-blue-100 text-blue-800';
      case 'Bientôt disponible': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Formations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos parcours de formation intensifs conçus pour vous préparer aux métiers du numérique
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Formations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((formation) => (
            <div key={formation.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={formation.image}
                  alt={formation.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(formation.status)}`}>
                    {formation.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{formation.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{formation.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{formation.places} places</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{formation.level}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies enseignées :</h4>
                  <div className="flex flex-wrap gap-2">
                    {formation.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full btn btn-secondary py-3 font-medium flex items-center justify-center group">
                  En savoir plus
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-red-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Une question sur nos formations ?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Notre équipe pédagogique est là pour vous accompagner dans votre choix
          </p>
          <button className="btn btn-light text-red-600 px-8 py-3 font-semibold">
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formations;