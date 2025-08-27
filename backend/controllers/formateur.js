import Formateur from "../models/formateur.model.js";

export const creer = async (req, res) => {
  console.log("req.file:", req.file);
  try {
    const { nom, poste, bio } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const formateur = new Formateur({ nom, poste, bio, photo });
    await formateur.save();
    res.status(201).json(formateur);
  } catch (err) {
    console.error("Erreur création formateur :", err);
    res.status(400).json({ error: "Erreur création formateur" });
  }
};

export const lister = async (req, res) => {
  try {
    const formateurs = await Formateur.find();
    res.json(formateurs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const detail = async (req, res) => {
  const formateur = await Formateur.findById(req.params.id);
  if (!formateur) return res.status(404).json({ error: "Introuvable" });
  res.json(formateur);
};

export const modifier = async (req, res) => {
  const { nom, poste, bio } = req.body;
  const photo = req.file ? req.file.path : undefined;
  const updateData = { nom, poste, bio };
  if (photo) updateData.photo = photo;

  const updated = await Formateur.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  res.json(updated);
};

export const supprimer = async (req, res) => {
  await Formateur.findByIdAndDelete(req.params.id);
  res.json({ message: "Formateur supprimé" });
};
