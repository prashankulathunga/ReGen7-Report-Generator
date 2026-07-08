import { Router } from 'express';
import UserController from '../controller/UserController.js';

const router = Router();

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);

export default router;
