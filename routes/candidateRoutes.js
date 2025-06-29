import express from 'express';
import { createCandidate, getCandidates } from '../controllers/CandidateController.js';

const router = express.Router();

router.post('/generate-candidates', createCandidate);
router.get('/candidates', getCandidates);

export { router };

