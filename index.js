import express from 'express';
import cors from 'cors';
import { dbConnect } from './config/db.js';
import { router as candidateRoutes } from './routes/candidateRoutes.js';

const app = express();
const port = 3001;

dbConnect();
app.use(cors());
app.use(express.json());
app.use('/api', candidateRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
    status: 'error'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 
