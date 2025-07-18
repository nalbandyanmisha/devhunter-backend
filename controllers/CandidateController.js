import { Candidate } from '../models/Candidate.js';
const createCandidate = async (req, res) => {
  try {
    const { count } = req.body;
    if (!count || isNaN(count) || count <= 0) {
      return res.status(400).json({ error: 'Invalid count parameter' });
    }

    const candidates = generateCandidates(count); // Generate candidates
    console.log(candidates);
    await Candidate.insertMany(candidates); // Insert candidates into the database
    res.status(201).json({ message: 'Candidates created successfully', candidates });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateCandidates = function(count) {
  const candidates = [];
  const schemaPaths = Candidate.schema.paths;
  const techLanguages = Candidate.schema.path('techLanguages').caster.enumValues;
  const experiences = Candidate.schema.path('experience').enumValues;
  const positions = Candidate.schema.path('position').enumValues;

  for (let i = 0; i < count; i++) {
    const techLanguagesList = getRandomElements(techLanguages, Math.floor(Math.random() * techLanguages.length) + 1);
    console.log("techLanguagesList:", techLanguagesList);
    candidates.push({
      "firstName": `Zarzand`,
      "lastName": `Zarzandyan`,
      "techLanguages": getRandomElements(techLanguages, Math.floor(Math.random() * techLanguages.length) + 1),
      "experience": experiences[Math.floor(Math.random() * experiences.length)],
      "position": positions[Math.floor(Math.random() * positions.length)],
      "salaryRange": {
        min: Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000,
        max: Math.floor(Math.random() * (200000 - 100001 + 1)) + 100001,
      },
      "createdAt": new Date(),
    });
  }

  return candidates;

}

const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export {createCandidate, getCandidates};
