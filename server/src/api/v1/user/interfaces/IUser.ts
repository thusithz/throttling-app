import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  hash?: string;
  firstName?: string;
  lastName?: string;
}
