import express from 'express';
import { 
  getAllStands, 
  getStandById, 
  getStandsBySection,
  searchStands,
  updateStand
} from '../controllers/standController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAllStands);
router.get('/search', searchStands);
router.get('/section/:section', getStandsBySection);
router.get('/:id', getStandById);

// Rutas protegidas
router.put('/:id', authMiddleware, updateStand);

export default router;