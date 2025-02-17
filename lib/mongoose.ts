import mongoose from 'mongoose';

// Read MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined in the .env file');
}

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }

  // Connect to MongoDB using the URI from the .env file
  await mongoose.connect(MONGODB_URI);
};

export default connectToDatabase;