import { NextFunction, Request, Response } from 'express';
import jwt from '../../library/jwt';
import createResponse from '../../utility/responseGenerator';
import UserModel from './user.model';

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            };

            const user = new UserModel(body);
            await user.save();
            return res.json(
                createResponse(user, 'Registration successful!', false)
            );
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                throw new Error('No user with this email!');
            }
            const isValidPassword = await user.isValidPassword(
                req.body.password
            );
            if (!isValidPassword) {
                throw new Error('Incorrect email or password!');
            }

            const token = jwt.issueJWT(user);
            return res.json(
                createResponse(
                    {
                        name: user.name,
                        email: user.email,
                        id: user._id,
                        img: user.img,
                        role: user.role,
                        status: user.status,
                        token,
                    },
                    'Login successful!',
                    false,
                    token
                )
            );
        } catch (err) {
            next(err);
        }
    }

    async authUser(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json(createResponse({}));
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
