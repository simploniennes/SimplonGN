import React from 'react';
import { 
  ArrowRight, Code, Users, Award, Globe, BookOpen, Rocket,
  Building2, Newspaper, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { icon: Users, label: 'Apprenants formés', value: '500+' },
    { icon: Award, label: 'Projets réalisés', value: '150+' },
    { icon: Globe, label: 'Partenaires', value: '25+' },
    { icon: BookOpen, label: 'Formations', value: '8' },
  ];

  const formations = [
    {
      title: 'Développement Web',
      description: 'Formation complète en développement frontend et backend',
      duration: '7 mois',
      level: 'Débutant à Avancé',
    },
    {
      title: 'Data Science',
      description: 'Analyse de données et intelligence artificielle',
      duration: '6 mois',
      level: 'Intermédiaire',
    },
    {
      title: 'Marketing Digital',
      description: 'Stratégies digitales et réseaux sociaux',
      duration: '4 mois',
      level: 'Débutant',
    }
  ];

  const partenaires = [
    { name: 'Ministère de l’Emploi', type: 'Institution' },
    { name: 'AFD', type: 'Institution' },
    { name: 'Orange', type: 'Entreprise' },
    { name: 'Microsoft', type: 'Entreprise' },
    { name: 'Agence Universitaire', type: 'Institution' },
    { name: 'UNICEF', type: 'ONG' },
  ];

  const actualites = [
    {
      title: 'Lancement de la nouvelle cohorte Dev Web',
      excerpt: 'La prochaine promotion de développeurs web démarre bientôt à Conakry.',
      image: 'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '12 Sept. 2025'
    },
    {
      title: 'Demo Day: Projets Data Science',
      excerpt: 'Nos apprenants présentent leurs projets autour des données publiques guinéennes.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '03 Sept. 2025'
    },
    {
      title: 'Signature d’un nouveau partenariat',
      excerpt: 'Un partenariat stratégique pour l’inclusion numérique en Guinée.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '27 Août 2025'
    }
  ];

  const temoignages = [
    {
      name: 'Mamadou Diallo',
      role: 'Apprenant - Dév. Web',
      quote: 'La formation m’a permis d’obtenir mon premier emploi dans la tech en Guinée.',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Fatoumata Camara',
      role: 'Apprenante - Data',
      quote: 'Une pédagogie active et des projets concrets qui changent la donne.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Ibrahima Sow',
      role: 'Formateur',
      quote: 'Nous accompagnons des talents motivés vers des carrières durables.',
      avatar: 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-gray-900 text-white">
        <div className="container py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white mb-4">
                <Building2 className="w-4 h-4 mr-2" /> Simplon Guinée • École du numérique inclusive
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Formations gratuites aux métiers du numérique en Guinée
              </h1>
              <p className="text-lg md:text-xl mb-8 text-red-100 leading-relaxed">
                Rejoignez une communauté d'apprenants motivés pour transformer la Guinée grâce au numérique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/formations" className="btn btn-light text-red-600 px-8 py-4 hover:bg-gray-100 group">
                  Découvrir nos formations
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Nous contacter
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-r from-red-400 to-rose-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <Code className="w-24 h-24 text-white mb-4" />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Inclusion</h3>
                      <p className="text-red-100">Technologie • Emploi • Impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 mb-4 group-hover:shadow-lg transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                À propos de
                <span className="text-red-600"> Simplon Guinée</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Simplon Guinée est une école du numérique gratuite et inclusive qui forme aux métiers 
                techniques du digital les profils les plus éloignés de l'emploi et les moins 
                représentés dans le secteur du numérique.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700">Formation gratuite et certifiante</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700">Pédagogie active et projets concrets</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700">Accompagnement vers l'emploi</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-gray-900 to-red-700 rounded-2xl p-8 text-white">
                <Rocket className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
                <p className="text-red-100 leading-relaxed">
                  Révéler les talents numériques en Guinée et contribuer à la transformation 
                  digitale du pays en formant des développeurs, data scientists et experts 
                  du marketing digital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Nos Formations</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Des parcours intensifs et pratiques pour maîtriser les technologies d'aujourd'hui et de demain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <div key={index} className="group">
                <div className="card card-hover overflow-hidden">
                  <div className="h-1.5 bg-red-600"></div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{formation.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{formation.description}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Durée</span>
                        <span className="text-sm font-semibold text-gray-900">{formation.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Niveau</span>
                        <span className="text-sm font-semibold text-gray-900">{formation.level}</span>
                      </div>
                    </div>
                    <button className="w-full btn btn-secondary py-3 font-medium">
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/formations" className="btn btn-primary px-8 py-4 font-semibold group">
              Voir toutes les formations
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partenaires Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Nos Partenaires</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Ils soutiennent l’inclusion et l’emploi via le numérique en Guinée
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partenaires.map((p, i) => (
              <div key={i} className="card p-4 text-center border-dashed">
                <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500">{p.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actualités Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title mb-2">Actualités</h2>
              <p className="section-subtitle">La vie de Simplon Guinée</p>
            </div>
            <Link to="/projets" className="btn btn-outline px-5 py-3">Voir plus</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((actu, i) => (
              <article key={i} className="card card-hover overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src={actu.image} alt={actu.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="badge badge-red mb-3">{actu.date}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{actu.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{actu.excerpt}</p>
                  <Link to="/projets" className="text-red-600 font-semibold inline-flex items-center">
                    Lire l’article <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Témoignages</h2>
            <p className="section-subtitle max-w-3xl mx-auto">Paroles d’apprenants et de formateurs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temoignages.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Quote className="w-4 h-4 text-red-600 mr-2 mt-1" />
                  <p className="text-gray-700">{t.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-red-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à changer votre vie ?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Rejoignez la prochaine promotion et commencez votre parcours dans le numérique
          </p>
          <Link to="/contact" className="btn btn-light px-8 py-4 text-lg group">
            Postuler maintenant
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;