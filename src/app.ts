import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import postRoute from './resources/post/post.router';
import productRoute from './resources/product/product.router';

class App {
    public express: Application;

    constructor(public port: number) {
        this.express = express();
        this.port = port;

        this.initializeDataBaseConnection();
        this.initializeMiddleWare();
        this.initializeControllers();
    }

    private initializeMiddleWare(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private async initializeDataBaseConnection(): Promise<void> {
        try {
            const { MONGO_USER, MONGO_PASS } = process.env;
            await mongoose.connect(
                `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.x1vlg.mongodb.net/ECommerce?retryWrites=true&w=majority`
            );
            console.log('database connected successfully');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    private initializeControllers() {
        this.express.use('/api/v1/post', postRoute);
        this.express.use('/api/v1/product', productRoute);
    }

    public listen(): void {
        this.express.listen(this.port, () =>
            console.log(`server is running http://localhost:${this.port}/`)
        );
    }
}

export default App;
