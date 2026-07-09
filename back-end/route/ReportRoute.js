import { Router } from 'express';
import ReportController from '../controller/ReportController.js';
import Middleware from '../middleware/Middleware.js';

const router = Router();

// Apply middleware to all routes
const verify = Middleware.verifyToken;

router.post('/create-report', verify, ReportController.createReport);
router.get('/all-report', verify, ReportController.getAllReports);
router.get('/get-report-id/:id', verify, ReportController.getReportsByUserId);
router.put('/update-report/:id', verify, ReportController.updateReport);
router.delete('/delete-report/:id', verify, ReportController.deleteReport);

export default router;
