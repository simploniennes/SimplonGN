import Temoignage from '../models/Temoignage.js';
import mongoose from 'mongoose';

/**
 * @desc    Ajouter un témoignage
 * @route   POST /api/v1/temoignages
 * @access  Public
 */
export const ajouterTemoignage = async (req, res) => {
  const { nom, profession, messages } = req.body;

  if (!nom || !messages) {
    return res.status(400).json({ erreur: "Le nom et le message sont obligatoires." });
  }

  try {
    const temoignage = new Temoignage({ nom, profession, messages });
    await temoignage.save();
    res.status(201).json({ message: "Témoignage ajouté avec succès !" });
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

/**
 * @desc    Lister les témoignages approuvés
 * @route   GET /api/v1/temoignages
 * @access  Public
 */
export const listerTemoignages = async (req, res) => {
  try {
    const temoignages = await Temoignage.find({ approuve: true }).sort({ date: -1 });
    res.status(200).json(temoignages);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

//  Valider un témoignage (admin)
exports.validerTemoignage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ erreur: "ID invalide" });
  }

  try {
    const temoignage = await Temoignage.findByIdAndUpdate(
      req.params.id,
      { approuve: true },
      { new: true }
    );

    if (!temoignage) {
      return res.status(404).json({ erreur: "Témoignage introuvable" });
    }

    res.status(200).json({ message: "Témoignage validé", temoignage });

  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

