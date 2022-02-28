import { Request, Response } from 'express';
import ProductModel from './product.model';

class ProductController {
    async getAllProduct(req: Request, res: Response) {
        try {
            const queryObj = { ...req.query };
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete queryObj[el]);

            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(
                /\b(gte|gt|lte|lt)\b/g,
                (match) => `$${match}`
            );

            let query = ProductModel.find(JSON.parse(queryStr));

            const sort = req?.query?.sort as string;
            if (sort) {
                const sortBy = sort.split(',').join(' ');
                query = query.sort(sortBy);
            } else {
                query = query.sort('-createdAt');
            }

            // 3) Field limiting
            const fields = req.query.fields as string;

            if (fields) {
                const fieldString = `${fields.split(',').join(' ')}`;
                query = query.select(fieldString);
            } else {
                query = query.select('-__v');
            }

            // 4) Pagination
            const page = req.query.page as string;
            const limit = req.query.limit as string;
            const queryPage: number = +page || 1;
            const queryLimit: number = +limit || 10;
            const querySkip = (queryPage - 1) * queryLimit;

            if (page) {
                const productNumber = await ProductModel.countDocuments();
                if (querySkip >= productNumber)
                    throw new Error('This page does not exist.');
            }

            query = query.skip(querySkip).limit(queryLimit);

            // execute the query

            const products = await query;

            res.status(200).json({
                status: 'success',
                result: products.length,
                data: products,
            });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const Products = await ProductModel.create(req.body);
            res.status(201).json({ status: 'success', data: Products });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const Products = await ProductModel.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            res.status(200).json({ status: 'success', data: Products });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }

    async getProductByID(req: Request, res: Response) {
        try {
            const Products = await ProductModel.findById(req.params.id);
            res.status(200).json({ status: 'success', data: Products });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const Products = await ProductModel.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json({ status: 'success', data: Products });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }

    async getProductStatistics(req: Request, res: Response) {
        try {
            const stats = await ProductModel.aggregate([
                {
                    $match: { star: { $gte: 0 } },
                },
                {
                    $group: {
                        // _id: '$star',
                        _id: { $toUpper: '$category' },
                        numProduct: { $sum: 1 },
                        numRating: { $sum: '$starCount' },
                        avgRating: { $avg: '$star' },
                        avgPrice: { $avg: '$price' },
                        minPrice: { $min: '$price' },
                        maxPrice: { $max: '$price' },
                    },
                },
                {
                    $sort: { avgPrice: 1 },
                },
                // {
                //     $match: { _id: { $ne: 'LAPTOP' } },
                // },
            ]);

            res.status(200).json({ status: 'success', data: stats });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }

    async getMonthlyPlan(req: Request, res: Response) {
        try {
            const year = +req.params.year;
            const plan = await ProductModel.aggregate([
                {
                    $unwind: '$features',
                },
            ]);
            res.status(200).json({ status: 'success', data: plan });
        } catch (error: any) {
            res.status(500).json({ status: 'success', data: error.message });
        }
    }
}

export default new ProductController();
