import React from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  BarChart3,
  PlusCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Apprenants actifs',
      value: '127',
      change: '+12%',
      changeType: 'increase',
      icon: Users
    },
    {
      title: 'Formations en cours',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: BookOpen
    },
    {
      title: 'Projets terminés',
      value: '45',
      change: '+8',
      changeType: 'increase',
      icon: Award
    },
    {
      title: 'Taux de réussite',
      value: '89%',
      change: '+5%',
      changeType: 'increase',
      icon: TrendingUp
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'new_student',
      message: 'Nouveau apprenant inscrit : Mamadou Diallo',
      time: 'Il y a 2 heures'
    },
    {
      id: 2,
      type: 'project_completed',
      message: 'Projet E-Commerce terminé par Fatoumata Camara',
      time: 'Il y a 4 heures'
    },
    {
      id: 3,
      type: 'formation_started',
      message: 'Formation Data Science démarrée',
      time: 'Il y a 1 jour'
    },
    {
      id: 4,
      type: 'certification',
      message: '3 nouveaux certifiés en développement web',
      time: 'Il y a 2 jours'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Présentation projets - Promo Dev Web',
      date: '2024-04-15',
      time: '14:00'
    },
    {
      id: 2,
      title: 'Workshop React Native',
      date: '2024-04-18',
      time: '09:00'
    },
    {
      id: 3,
      title: 'Conférence IA et Machine Learning',
      date: '2024-04-20',
      time: '10:00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue dans votre espace d'administration Simplon Guinée</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} ce mois
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-xl">
                  <stat.icon className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Activités récentes</h2>
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Voir tout
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actions rapides</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <PlusCircle className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-900">Nouvel apprenant</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <BookOpen className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-900">Nouvelle formation</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <BarChart3 className="w-8 h-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-yellow-900">Rapport</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-900">Messages</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Événements à venir</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date} à {event.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium">
                Voir le calendrier complet
              </button>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance mensuelle</h2>
              <div className="h-40 bg-gradient-to-r from-red-50 to-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Graphique de performance</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">+15%</p>
                  <p className="text-sm text-gray-600">Inscriptions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">92%</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;