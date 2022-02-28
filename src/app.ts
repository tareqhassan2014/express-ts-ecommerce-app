import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import connectMongodb from './database/database';
import { notFound } from './middleware/error';
import authRoute from './resources/auth/user.router';
import productRoute from './resources/product/product.router';

class App {
    public express: Application;

    constructor(public port: number, private uri: string) {
        this.express = express();
        connectMongodb();
        this.initializeDataBaseConnection(this.uri);
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

    private async initializeDataBaseConnection(uri: string): Promise<void> {
        try {
            await mongoose.connect(uri);
            console.log('database connected successfully');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    private initializeControllers() {
        this.express.use('/api/v1/product', productRoute);
        this.express.use('/api/v1/auth', authRoute);
        this.express.all('*', notFound);
    }

    public listen(): void {
        this.express.listen(this.port, () =>
            console.log(`server is running http://localhost:${this.port}/`)
        );
    }
}

export default App;
