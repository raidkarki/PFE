// /server/routes/coreRoutes.js
import express from 'express';
import  createAndDeployManifests from '../services/coreController.js';


const router = express.Router();

router.post('/deploy', createAndDeployManifests);

export default router;
