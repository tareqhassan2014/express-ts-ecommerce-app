import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getAllUser,
    getUserByID,
    updateUser,
} from './user.controller';

const router = Router();

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUserByID).patch(updateUser).delete(deleteUser);
export default router;
