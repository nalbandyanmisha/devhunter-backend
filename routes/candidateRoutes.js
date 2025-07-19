import express from 'express';
import { createCandidate, getCandidates, getMatchedCandidates } from '../controllers/CandidateController.js';

const router = express.Router();

router.post('/candidates', createCandidate);
router.get('/candidates', getCandidates);
router.get('/matching-candidates', getMatchedCandidates);

export { router };

