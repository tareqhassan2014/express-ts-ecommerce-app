import 'dotenv/config';
import fs from 'fs';
import mongoose from 'mongoose';
import ProductModel from '../resources/product/product.model';

const port = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI!;

const connectDB = async () => {
    try {
        const { MONGO_USER, MONGO_PASS } = process.env;
        await mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.x1vlg.mongodb.net/ECommerce?retryWrites=true&w=majority`
        );
        console.log('database connect successfully');
    } catch (error: any) {
        console.log(error.message);
    }
};

connectDB();

// Read json File
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/products.JSON`, 'utf-8')
);

// Import data into data base

const importData = async () => {
    try {
        await ProductModel.create(tours);
        console.log('data successfully loaded!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

// Delete all data from collection

const deleteData = async () => {
    try {
        await ProductModel.deleteMany();
        console.log('data successfully deleted!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
// deleteData();
// importData();
