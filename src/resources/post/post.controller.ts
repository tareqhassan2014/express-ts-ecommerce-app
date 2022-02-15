import { Request, Response } from 'express';
import postModel from './post.model';

const getAllPost = async (req: Request, res: Response) => {
    try {
        const posts = await postModel.find();
        res.status(200).json({ status: 'success', data: posts });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const getPostByID = async (req: Request, res: Response) => {
    try {
        const posts = await postModel.findById(req.params.id);
        res.status(200).json({ status: 'success', data: posts });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const createPost = async (req: Request, res: Response) => {
    try {
        const posts = await postModel.create(req.body);
        res.status(201).json({ status: 'success', data: posts });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

export { getAllPost, createPost, getPostByID };
