import { Router } from 'express';
import ProjectController from '../controller/ProjectController.js';
import Middleware from '../middleware/Middleware.js';

const router = Router();

// Apply middleware to all routes
const verify = Middleware.verifyToken;

router.post('/create-project', verify, ProjectController.createProject);
router.get('/get-project-id/:id', verify, ProjectController.getProjectsByUserId);
router.put('/update-project/:id', verify, ProjectController.updateProject);
router.delete('/delete-project/:id', verify, ProjectController.deleteProject);

export default router;
