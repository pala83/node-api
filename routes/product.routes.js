import {Router} from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.delete('/:id', productController.delete);
router.put('/:id', productController.update);

export default router;