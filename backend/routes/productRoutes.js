import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjetId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);

router
  .route('/:id')
  .get(checkObjetId, getProductById)
  .put(protect, admin, checkObjetId, updateProduct)
  .delete(protect, admin, checkObjetId, deleteProduct);

router.route('/:id/reviews').post(protect, checkObjetId, createProductReview);

export default router;
