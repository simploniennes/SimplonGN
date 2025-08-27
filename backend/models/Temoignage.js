import mongoose from 'mongoose';

const temoignageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Le nom est requis"],
    trim: true
  },
  profession: {
    type: String,
    trim: true,
    default: "Anonyme"
  },
  messages: {
    type: String,
    required: [true, "Le message est requis"],
    trim: true
  },
  approuve: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Temoignage = mongoose.model('Temoignage', temoignageSchema);

export default Temoignage;
