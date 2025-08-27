import { Router } from 'express';
import { createFormation, getAllFormations, getFormationById, updateFormation, deleteFormation } from '../controllers/formationsController.js';

const router = Router();

// Routes CRUD
router.post('/', createFormation);
router.get('/', getAllFormations);
router.get('/:id', getFormationById);
router.put('/:id', updateFormation);
router.delete('/:id', deleteFormation);

export default router;