import { model, Schema } from 'mongoose';
import IProduct from './product.interface';

const ProductModel = new Schema(
    {
        category: { type: String, required: true },
        name: String,
        seller: String,
        wholePrice: String,
        priceFraction: String,
        stock: Number,
        star: Number,
        starCount: Number,
        img: String,
        url: String,
        features: [Object] || [],
        price: { type: Number, required: true },
        shipping: Number,
    },
    {
        timestamps: true,
    }
);

export default model<IProduct>('Product', ProductModel);
