import { Schema, model, Document } from 'mongoose';

export interface iUser extends Document {
    email: string,
    password: string,
    hash?: string,
    firstName?: string,
    lastName?: string,
}

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String, unique: true, trim: true, required: true, validate: {
            validator: function (value: string) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value); // Regex need to match with FE schema
            },
            message: "Please enter a valid email"
        },
    },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
        delete ret._id;
        delete ret.hash;
    }
});

export default model<iUser>('User', schema);