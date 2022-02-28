import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const env = process.env.NODE_ENV;
let dbUrl = '';

const connectMongodb = () => {
    switch (env) {
        case 'development': {
            return (dbUrl = process.env.MONGODB_DEV_URI as string);
        }
        case 'test': {
            return (dbUrl = process.env.MONGODB_TEST_URI as string);
        }
        case 'production': {
            return (dbUrl = process.env.MONGODB_URI as string);
        }
        case '': {
            console.log('Mongo url not set in env file');
            throw new Error('Mongo url not set in env file');
        }
        default:
            break;
    }
    console.log('env' + env);

    mongoose.connect(dbUrl, (error) => {
        if (error) {
            console.log(`FAILED to connect using mongoose. ${error}`);
        } else {
            console.log(`Connected to DB server. ( ${process.env.NODE_ENV} )`);
        }
    });
};

export default connectMongodb;
