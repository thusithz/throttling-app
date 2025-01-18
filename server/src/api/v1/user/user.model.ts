import { Schema, model } from 'mongoose';
import { IUser } from './interfaces/IUser';

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator: function (value: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value); // Regex need to match with FE schema
      },
      message: 'Please enter a valid email',
    },
  },
  hash: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
    delete ret.hash;
  },
});

export default model<IUser>('User', schema);
