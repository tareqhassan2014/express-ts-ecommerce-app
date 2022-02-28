import { Router } from 'express';
import { errorHandler } from '../../middleware/error';
import AuthController from './user.controller';

const router = Router();

router.post('/signup', AuthController.signUp, errorHandler);
router.post('/login', AuthController.login);
// router.get(
//     '/auth-user',
//     passport.authenticate('jwt', { session: false }),
//     accessControl.grantAccess('readOwn', 'profile'),
//     AuthController.authUser
// );
export default router;
