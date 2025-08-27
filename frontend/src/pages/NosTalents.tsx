import React, { useMemo, useState } from 'react';
import { Linkedin, Github, FileText, MapPin, Briefcase, GraduationCap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

type Talent = {
  id: number;
  name: string;
  role: string;
  location: string;
  category: 'dev' | 'data' | 'marketing' | 'design';
  cohort: number;
  skills: string[];
  avatar: string;
  linkedin?: string;
  github?: string;
  cv?: string;
};

const NosTalents: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Talent['category']>('all');
  const [selectedCohort, setSelectedCohort] = useState<'all' | number>('all');
  const [query, setQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Tous les métiers' },
    { id: 'dev', name: 'Développement' },
    { id: 'data', name: 'Data' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' }
  ] as const;

  const cohorts = [2023, 2024, 2025];

  const talents: Talent[] = [
    {
      id: 1,
      name: 'Mamadou Diallo',
      role: 'Développeur Frontend',
      location: 'Conakry, Guinée',
      category: 'dev',
      cohort: 2024,
      skills: ['React', 'TypeScript', 'Tailwind', 'API REST'],
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: '#',
      github: '#',
      cv: '#'
    },
    {
      id: 2,
      name: 'Fatoumata Camara',
      role: 'Data Analyst',
      location: 'Conakry, Guinée',
      category: 'data',
      cohort: 2025,
      skills: ['Python', 'Pandas', 'SQL', 'Tableau'],
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: '#',
      cv: '#'
    },
    {
      id: 3,
      name: 'Ibrahima Sow',
      role: 'UI/UX Designer',
      location: 'Labé, Guinée',
      category: 'design',
      cohort: 2024,
      skills: ['Figma', 'Wireframing', 'Prototypage'],
      avatar: 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: '#',
      cv: '#'
    },
    {
      id: 4,
      name: 'Aissatou Bah',
      role: 'Market. Digital',
      location: 'Kindia, Guinée',
      category: 'marketing',
      cohort: 2023,
      skills: ['SEO', 'Content', 'Facebook Ads', 'Analytics'],
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: '#',
      cv: '#'
    },
    {
      id: 5,
      name: 'Alpha Baldé',
      role: 'Développeur Backend',
      location: 'Conakry, Guinée',
      category: 'dev',
      cohort: 2025,
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: '#',
      github: '#'
    }
  ];

  const filteredTalents = useMemo(() => {
    return talents.filter(t => {
      const categoryOk = selectedCategory === 'all' || t.category === selectedCategory;
      const cohortOk = selectedCohort === 'all' || t.cohort === selectedCohort;
      const queryOk = query.trim() === '' || (
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.role.toLowerCase().includes(query.toLowerCase()) ||
        t.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
      );
      return categoryOk && cohortOk && queryOk;
    });
  }, [talents, selectedCategory, selectedCohort, query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="section-title mb-2">Nos Talents</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Découvrez les talents formés par Simplon Guinée et recrutez des profils opérationnels.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Rechercher un nom, un rôle, une compétence..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Toutes les cohortes</option>
                {cohorts.map(y => (
                  <option key={y} value={y}>Cohorte {y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Talents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalents.map(t => (
            <div key={t.id} className="card card-hover overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover mr-3" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-600">{t.role}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> {t.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
                  <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {t.category.toUpperCase()}</span>
                  <span className="inline-flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> Cohorte {t.cohort}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {t.skills.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md font-medium">{s}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {t.linkedin && (
                      <a href={t.linkedin} className="inline-flex items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {t.github && (
                      <a href={t.github} className="inline-flex items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700" aria-label="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {t.cv && (
                      <a href={t.cv} className="inline-flex items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700" aria-label="CV">
                        <FileText className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <button className="btn btn-secondary px-4 py-2 text-sm">Contacter</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Entreprises */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-red-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Vous êtes une entreprise ?</h2>
          <p className="text-red-100 mb-6">Accédez à nos talents opérationnels et recrutez les profils adaptés à vos besoins.</p>
          <Link to="/entreprises" className="btn btn-light text-red-600 px-8 py-3 font-semibold">Recruter nos talents</Link>
        </div>
      </div>
    </div>
  );
};

export default NosTalents;
