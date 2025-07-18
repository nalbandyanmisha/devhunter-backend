import { mongoose } from 'mongoose';

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  techLanguages: {
    type: [String],
    enum: ['CSS', 'JavaScript', 'Python', 'NodeJS', 'ReactJS', 'NextJS', 'C++'],
    required: true,
  },
  experience: {
    type: String,
    enum: ['Junior', 'Mid Level', 'Senior', 'Principal', 'Architect'],
    required: true,
  },
  position: {
    type: String,
    enum: ['Full Stack', 'Front End', 'Back End', 'DB Engineer'],
    required: true,
  },
  salaryRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema)

export { Candidate }
