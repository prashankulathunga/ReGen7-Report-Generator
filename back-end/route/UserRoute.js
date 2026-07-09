import { Router } from 'express';
import UserController from '../controller/UserController.js';
import Middleware from '../middleware/Middleware.js';

const router = Router();

// Apply middleware to all routes
const verify = Middleware.verifyToken;

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.get('/get-user', verify, UserController.getUser);

export default router;
