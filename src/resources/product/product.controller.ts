import { Request, Response } from 'express';
import ProductModel from './product.model';

const getAllProduct = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ status: 'success', data: products });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const getProductByID = async (req: Request, res: Response) => {
    try {
        const Products = await ProductModel.findById(req.params.id);
        res.status(200).json({ status: 'success', data: Products });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const Products = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'success', data: Products });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const Products = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).json({ status: 'success', data: Products });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const createProduct = async (req: Request, res: Response) => {
    try {
        const Products = await ProductModel.create(req.body);
        res.status(201).json({ status: 'success', data: Products });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

export {
    getAllProduct,
    createProduct,
    getProductByID,
    updateProduct,
    deleteProduct,
};
