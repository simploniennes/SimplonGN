const express = require('express');
const router = express.Router();
const faqController = require('../controleurs/controleur');

router.get('/', faqController.getAllFAQ);
router.post('/', faqController.ajouterFAQ);
router.put('/:id', faqController.modifierFAQ);
router.delete('/:id', faqController.supprimerFAQ);

module.exports = router;
