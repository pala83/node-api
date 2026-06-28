import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { validate } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/auth.js';
import { productSchema, productUpdateSchema } from '../models/product.model.js';

const router = Router();

// Lectura pública
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Mutaciones protegidas: requieren access token válido
router.post('/', authenticate, validate(productSchema), productController.create);
router.put('/:id', authenticate, validate(productUpdateSchema), productController.update);
router.delete('/:id', authenticate, productController.remove);

export default router;
