import mongoose from 'mongoose';
import config from './config.js';

// Configuration de Mongoose
mongoose.set('strictQuery', true);

/**
 * Établit une connexion à la base de données MongoDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const { uri, options } = config.database;
    
    // Configuration des événements de connexion
    mongoose.connection.on('connected', () => {
      console.log(`✅ Connecté à MongoDB sur ${mongoose.connection.host}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Erreur de connexion MongoDB:', err.message);
      if (config.nodeEnv === 'production') process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('ℹ️  Déconnecté de MongoDB');
    });

    // Gestion de la fermeture propre de l'application
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Connexion MongoDB fermée - Arrêt de l\'application');
      process.exit(0);
    });

    // Connexion à la base de données
    await mongoose.connect(uri, options);
    
    console.log(`📊 Base de données connectée: ${mongoose.connection.name}`);
    
    // En développement, on active le mode debug de Mongoose
    if (config.nodeEnv === 'development') {
      mongoose.set('debug', true);
    }
    
  } catch (error) {
    console.error('❌ Échec de la connexion à MongoDB:', error.message);
    
    // En production, on tente de se reconnecter automatiquement
    if (config.nodeEnv === 'production') {
      console.log('🔄 Tentative de reconnexion dans 5 secondes...');
      setTimeout(connectDB, 5000);
    } else {
      // En développement, on laisse l'application démarrer sans connexion
      console.warn('⚠️  Mode dév: L\'application continue sans connexion à la base de données');
    }
  }
};

export default connectDB;
