import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductByID,
    updateProduct,
} from './product.controller';

const router = Router();

router.route('/').get(getAllProduct).post(createProduct);
router
    .route('/:id')
    .get(getProductByID)
    .patch(updateProduct)
    .delete(deleteProduct);
export default router;
