import mongoose from 'mongoose';
import User from '../api/v1/user/user.model';

const connectionOptions = {
  useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URL || '', connectionOptions);

mongoose.Promise = global.Promise;

export default {
    User,
};
