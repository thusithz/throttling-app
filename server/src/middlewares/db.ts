import mongoose from 'mongoose';

import User from '../api/v1/user/user.model';

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGODB_URL || '', connectionOptions);
}

mongoose.Promise = global.Promise;

// process.on('SIGINT', mongoose.disconnect);

export default {
  User,
};
