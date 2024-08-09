import { Router } from 'express';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { ProductValidation } from './Product.validation';
import { ProductController } from './Product.controller';
import CheckAuth from '../../Middleware/CheckAuth';

const router = Router();

//:create product
router.post(
  '/create-product',
  CheckAuth('Seller'),
  ValidateRequest(ProductValidation.CreateProductValidationSchema),
  ProductController.CreateProduct,
);

//:get all products
router.get('/', CheckAuth('Buyer', 'Seller'), ProductController.GetAllProduct);

//: get a product
router.get('/:id', CheckAuth('Buyer', 'Seller'), ProductController.GetAProduct);

//:update product
router.patch(
  '/update-product/:id',
  CheckAuth('Seller'),
  ValidateRequest(ProductValidation.UpdateProductValidationSchema),
  ProductController.UpdateProduct,
);

//:delete product
router.delete(
  '/delete-product',
  CheckAuth('Seller'),
  ProductController.DeleteProduct,
);

//:Product Verification
router.get(
  '/verify-product/:id',
  CheckAuth('Buyer', 'Seller'),
  ProductController.verifyProduct,
);

export const ProductRoutes = router;
