import {Router} from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);

export default router;