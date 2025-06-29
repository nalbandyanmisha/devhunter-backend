import mongoose from 'mongoose';

async function dbConnect() {
  await mongoose.connect('mongodb://mongo:27017/devHunter');
}

export { dbConnect };
