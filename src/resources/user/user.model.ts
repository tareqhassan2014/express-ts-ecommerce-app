import { model, Schema } from 'mongoose';
import IUser from './user.interface';

const UserModel = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: [true, 'a user must have a email'],
            unique: [true, 'Email can not be same'],
        },
        password: {
            type: String,
            required: [true, 'a user must have a password'],
        },
        img: String,
    },
    {
        timestamps: true,
    }
);

export default model<IUser>('User', UserModel);
