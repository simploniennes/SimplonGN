import mongoose from 'mongoose';

const formationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  duree: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
});

const Formation = mongoose.model('Formation', formationSchema);

export default Formation;