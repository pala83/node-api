import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { validate } from '../middlewares/validate.js';
import { productSchema, productUpdateSchema } from '../models/product.model.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', validate(productSchema), productController.create);
router.put('/:id', validate(productUpdateSchema), productController.update);
router.delete('/:id', productController.remove);

export default router;
