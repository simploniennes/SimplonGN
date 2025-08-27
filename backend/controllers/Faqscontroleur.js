import FAQ from '../models/model.js';

/**
 * @desc    Récupérer toutes les FAQ
 * @route   GET /api/v1/faqs
 * @access  Public
 */
export const getAllFAQ = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @desc    Ajouter une nouvelle FAQ
 * @route   POST /api/v1/faqs
 * @access  Privé/Admin
 */
export const ajouterFAQ = async (req, res) => {
    const { question, reponse } = req.body;
    try {
        const newFAQ = new FAQ({ question, reponse });
        await newFAQ.save();
        res.status(201).json(newFAQ);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @desc    Supprimer une FAQ
 * @route   DELETE /api/v1/faqs/:id
 * @access  Privé/Admin
 */
export const supprimerFAQ = async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'FAQ supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @desc    Mettre à jour une FAQ
 * @route   PUT /api/v1/faqs/:id
 * @access  Privé/Admin
 */
export const modifierFAQ = async (req, res) => {
    try {
        const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedFAQ);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
