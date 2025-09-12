
import mongoose from 'mongoose';
import { getEnvVar} from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
    `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`
    );
    mongoose.connection.on('connected', () =>
      console.log('MongoDB connected successfully')
    );
    mongoose.connection.on('error', (err) =>
      console.error('MongoDB connection error:', err)
    );
  } catch (e) {
    console.error('Error while setting up mongo connection', e);
    throw e;
  }
};