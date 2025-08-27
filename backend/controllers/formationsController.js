import Formation from '../models/Formations.js';

/**
 * @desc    Créer une nouvelle formation
 * @route   POST /api/v1/formations
 * @access  Privé/Admin
 */
export const createFormation = async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json(formation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc    Récupérer toutes les formations
 * @route   GET /api/v1/formations
 * @access  Public
 */
export const getAllFormations = async (req, res) => {
  const formations = await Formation.find();
  res.json(formations);
};

/**
 * @desc    Récupérer une formation par son ID
 * @route   GET /api/v1/formations/:id
 * @access  Public
 */
export const getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) return res.status(404).json({ message: "Non trouvé" });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Mettre à jour une formation
 * @route   PUT /api/v1/formations/:id
 * @access  Privé/Admin
 */
export const updateFormation = async (req, res) => {
  try {
    const updated = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc    Supprimer une formation
 * @route   DELETE /api/v1/formations/:id
 * @access  Privé/Admin
 */
export const deleteFormation = async (req, res) => {
  try {
    await Formation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Formation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};