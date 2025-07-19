import { Candidate } from '../models/Candidate.js';
const createCandidate = async (req, res) => {
  try {
    const candidates = req.body;
    console.log('Received candidates:', candidates);

    if (!Array.isArray(candidates) || candidates.length === 0) {
      return res.status(400).json({ error: 'Request body must be a non-empty array of candidates' });
    }

    await Candidate.insertMany(candidates);

    res.status(201).json({ message: 'Candidates created successfully', insertedCount: candidates.length });
  } catch (error) {
    console.error('Error inserting candidates:', error);
    res.status(500).json({ error: error.message });
  }};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMatchedCandidates = async (req, res) => {

  const {
    position,
    languages,
    experience,
    minSalary = 0,
    maxSalary = Infinity,
  } = req.query;

  const toArray = (val) => (Array.isArray(val) ? val : val ? [val] : []);

  const positionArray = toArray(position);
  const languageArray = toArray(languages);
  const experienceArray = toArray(experience);
  try {
    const query = {
      $or: [
        positionArray.length && { position: { $in: positionArray } },
        languageArray.length && { languages: { $in: languageArray } },
        experienceArray.length && { experience: { $in: experienceArray } },
      ].filter(Boolean),
      'salaryRange.min': { $lte: Number(maxSalary) },
      'salaryRange.max': { $gte: Number(minSalary) },
    };

    const candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (err) {
    console.error('Failed to match candidates:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {createCandidate, getCandidates, getMatchedCandidates };
