import mongoose from 'mongoose';
import { beforeAll, beforeEach, afterEach, afterAll } from '@jest/globals';

mongoose.set('strictQuery', true); // Use strictQuery instead

mongoose.Promise = Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running'))
        return;
      console.log(error.message);
    }
  }
}

export default {
  setupDB(databaseName: string, runSaveMiddleware = false) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `mongodb://0.0.0.0:27017/${databaseName}`;
      await mongoose.connect(url);
    });

    beforeEach(async () => {
      // TODO DB seeding need to introduce
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
