import { model, Schema } from 'mongoose';
import IPost from './post.interface';

const PostModel = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IPost>('Post', PostModel);
