import { Router } from 'express';
import productController from './product.controller';

const router = Router();

router
    .route('/')
    .get(productController.getAllProduct)
    .post(productController.createProduct);

router.route('/product-statistic').get(productController.getProductStatistics);
router.route('/monthly-plan/:year').get(productController.getMonthlyPlan);

router
    .route('/:id')
    .get(productController.getProductByID)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);
export default router;
