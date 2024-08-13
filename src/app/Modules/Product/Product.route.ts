import { Router } from 'express';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { ProductValidation } from './Product.validation';
import { ProductController } from './Product.controller';
import CheckAuth from '../../Middleware/CheckAuth';

const router = Router();

//! create product
router.post(
  '/create-product',
  CheckAuth('Super_Admin', 'Admin'),
  ValidateRequest(ProductValidation.CreateProductValidationSchema),
  ProductController.CreateProduct,
);

//! get all products
router.get('/get-products', ProductController.GetAllProduct);

//! get a product
router.get('/:id', ProductController.GetAProduct);

//! update product
router.put(
  '/update-product/:id',
  CheckAuth('Super_Admin', 'Admin'),
  ValidateRequest(ProductValidation.UpdateProductValidationSchema),
  ProductController.UpdateProduct,
);

//! delete product
router.delete(
  '/delete-product/:id',
  CheckAuth('Super_Admin', 'Admin'),
  ProductController.DeleteProduct,
);

export const ProductRoutes = router;
