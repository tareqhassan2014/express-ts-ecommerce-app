import { Request, Response } from 'express';
import UserModel from './user.model';

const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ status: 'success', data: users });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const getUserByID = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findById(req.params.id);
        res.status(200).json({ status: 'success', data: users });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'success', data: users });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).json({ status: 'success', data: users });
    } catch (error: any) {
        res.status(500).json({ status: 'success', data: error.message });
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.create(req.body);
        res.status(201).json({ status: 'success', data: users });
    } catch (error: any) {
        res.status(500).json({ status: 'error', data: error.message });
    }
};

export { getAllUser, createUser, getUserByID, updateUser, deleteUser };
