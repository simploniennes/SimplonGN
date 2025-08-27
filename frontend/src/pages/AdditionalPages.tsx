import React from 'react';
import { 
  Users, BookOpen, Rocket, Globe, ArrowRight, Shield, FileText,
  HelpCircle, Briefcase, Mail, Building2, Newspaper, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Apropos: React.FC = () => {
  const valeurs = [
    { title: 'Inclusion', desc: 'Des formations gratuites et accessibles à tous', icon: Users },
    { title: 'Pédagogie active', desc: 'Apprendre par la pratique et les projets', icon: BookOpen },
    { title: 'Impact', desc: 'Insertion professionnelle et développement local', icon: Rocket },
  ];

  const engagements = [
    'Accompagner la transformation digitale en Guinée',
    'Réduire la fracture numérique par la formation',
    'Favoriser l’employabilité des talents',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <header className="text-center mb-12">
          <h1 className="section-title mb-4">À propos de Simplon Guinée</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Une école du numérique inclusive, pour les métiers de demain et l’emploi en Guinée.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {valeurs.map((v, i) => (
            <div key={i} className="card p-6">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Notre Vision</h2>
            <p className="text-gray-700 mb-6">
              Nous révélons et accompagnons les talents numériques guinéens, au service de l’innovation,
              de l’emploi et du développement socio-économique.
            </p>
            <ul className="space-y-3">
              {engagements.map((e, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-gray-900 to-red-700 rounded-2xl p-8 text-white">
            <Globe className="w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
            <p className="text-red-100">
              Former gratuitement aux compétences numériques clés, promouvoir l’inclusion et faciliter l’insertion professionnelle.
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link to="/contact" className="btn btn-primary px-8 py-4">Nous contacter</Link>
        </div>
      </div>
    </div>
  );
};

export const Actualites: React.FC = () => {
  const posts = [
    { title: 'Lancement de la cohorte 2025', date: '15 Sept. 2025', cat: 'Communiqué',
      img: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Ouverture des candidatures pour la nouvelle promotion Dév. Web et Data.' },
    { title: 'Partenariat pour l’inclusion', date: '28 Août 2025', cat: 'Partenariat',
      img: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Un accord pour soutenir l’employabilité des jeunes en Guinée.' },
    { title: 'Demo Day: projets', date: '12 Août 2025', cat: 'Événement',
      img: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Présentation des projets de fin de formation de la promo Dev Web.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="section-title mb-2">Actualités</h1>
            <p className="section-subtitle">La vie de Simplon Guinée</p>
          </div>
          <Link to="/contact" className="btn btn-outline px-5 py-3">Proposer un article</Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <article key={i} className="card card-hover overflow-hidden">
              <div className="h-44 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-red">{p.date}</span>
                  <span className="badge badge-green">{p.cat}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{p.excerpt}</p>
                <Link to="#" className="text-red-600 font-semibold inline-flex items-center">
                  Lire <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Candidater: React.FC = () => {
  const steps = [
    { title: 'Inscription en ligne', desc: 'Remplissez le formulaire et choisissez votre formation', icon: FileText },
    { title: 'Tests & motivation', desc: 'Évaluation de votre motivation et prérequis', icon: HelpCircle },
    { title: 'Entretien', desc: 'Échange avec l’équipe pédagogique', icon: Users },
    { title: 'Intégration', desc: 'Bienvenue dans la promotion !', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <header className="text-center mb-12">
          <h1 className="section-title mb-4">Candidater</h1>
          <p className="section-subtitle max-w-3xl mx-auto">Rejoignez une formation Simplon Guinée</p>
        </header>
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </section>
        <div className="text-center">
          <Link to="/contact" className="btn btn-primary px-8 py-4">Commencer ma candidature</Link>
        </div>
      </div>
    </div>
  );
};

export const Entreprises: React.FC = () => {
  const offres = [
    { title: 'Recruter nos talents', desc: 'Accédez à un vivier d’apprenants formés aux technologies clés', icon: Briefcase },
    { title: 'Co-construire des projets', desc: 'Construisons ensemble des solutions utiles aux enjeux locaux', icon: Building2 },
    { title: 'Interventions & ateliers', desc: 'Sensibilisation, ateliers, montée en compétences de vos équipes', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <header className="text-center mb-12">
          <h1 className="section-title mb-4">Entreprises & Partenaires</h1>
          <p className="section-subtitle max-w-3xl mx-auto">Construisons des parcours d’impact</p>
        </header>
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {offres.map((o, i) => (
            <div key={i} className="card p-6">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <o.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{o.title}</h3>
              <p className="text-gray-600">{o.desc}</p>
            </div>
          ))}
        </section>
        <div className="text-center">
          <Link to="/contact" className="btn btn-outline px-8 py-4">Nous écrire <Mail className="w-4 h-4 ml-2" /></Link>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    { q: 'Les formations sont-elles gratuites ?', a: 'Oui, financées par nos partenaires et l’engagement social de Simplon.' },
    { q: 'Quel niveau est requis ?', a: 'Ouvert à tous; motivation et engagement sont essentiels.' },
    { q: 'Comment candidater ?', a: 'Rendez-vous sur la page Candidater et suivez les étapes.' },
  ];
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="section-title mb-8 text-center">Foire Aux Questions</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <div key={i} className="card p-6">
              <h3 className="font-bold text-gray-900 mb-2">{f.q}</h3>
              <p className="text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MentionsLegales: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container">
      <h1 className="section-title mb-6">Mentions légales</h1>
      <div className="card p-6">
        <p className="text-gray-700 mb-4"><strong>Éditeur :</strong> Simplon Guinée</p>
        <p className="text-gray-700 mb-4"><strong>Directeur de publication :</strong> Direction Simplon Guinée</p>
        <p className="text-gray-700 mb-4"><strong>Hébergement :</strong> Fournisseur d’hébergement</p>
        <p className="text-gray-700">Ces informations sont fournies à titre indicatif et seront mises à jour.</p>
      </div>
    </div>
  </div>
);

export const PolitiqueConfidentialite: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container">
      <h1 className="section-title mb-6">Politique de confidentialité</h1>
      <div className="card p-6">
        <p className="text-gray-700 mb-4">
          Nous attachons une grande importance à la protection de vos données. Cette page décrit l’utilisation et la conservation des données collectées.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Finalités du traitement</li>
          <li>Durée de conservation</li>
          <li>Vos droits (accès, rectification, suppression)</li>
        </ul>
      </div>
    </div>
  </div>
);

export const ConditionsGenerales: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container">
      <h1 className="section-title mb-6">Conditions générales d’utilisation</h1>
      <div className="card p-6">
        <p className="text-gray-700 mb-4">
          L’accès et l’utilisation du site impliquent l’acceptation pleine et entière des présentes conditions générales.
        </p>
        <p className="text-gray-700">Ces informations seront détaillées et mises à jour prochainement.</p>
      </div>
    </div>
  </div>
);

export const Alumni: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container">
      <div className="text-center mb-10">
        <h1 className="section-title mb-2">Réseau Alumni</h1>
        <p className="section-subtitle">Rejoignez la communauté des anciens de Simplon Guinée</p>
      </div>
      <div className="card p-6">
        <p className="text-gray-700">Espace dédié aux parcours, opportunités et événements du réseau.</p>
      </div>
    </div>
  </div>
);
