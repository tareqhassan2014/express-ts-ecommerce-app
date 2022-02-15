import { Router } from 'express';
import { createPost, getAllPost, getPostByID } from './post.controller';

const router = Router();

router.route('/').get(getAllPost).post(createPost);
router.route('/:id').get(getPostByID);
export default router;
