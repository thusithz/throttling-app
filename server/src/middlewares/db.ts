import mongoose from 'mongoose';
import User from '../api/v1/user/user.model';
import logger from './logger';

const connectDB = async () => {
  try {
    const mongoURL =
      process.env.MONGODB_URL ?? 'mongodb://0.0.0.0:27017/throttling';
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

if (mongoose.connection.readyState === 0) {
  connectDB();
}

mongoose.Promise = global.Promise;

export default {
  User,
};
