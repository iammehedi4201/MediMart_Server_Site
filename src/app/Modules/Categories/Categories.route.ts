import { Router } from 'express';
import validateRequest from '../../Middleware/ValidationRequest';
import { CategoriesValidation } from './Categories.validation';
import CheckAuth from '../../Middleware/CheckAuth';
import { categoryController } from './Categories.controller';

const router = Router();

//! create category
router.post(
  '/create-category',
  CheckAuth('Super_Admin', 'Admin'),
  validateRequest(CategoriesValidation.CreateCategorySchema),
  categoryController.createCategoryToDB,
);

//! get all categories
router.get('/get-all-categories', categoryController.getAllCategories);

//! update category
router.put(
  '/update-category/:id',
  CheckAuth('Super_Admin', 'Admin'),
  validateRequest(CategoriesValidation.UpdateCategorySchema),
  categoryController.updateCategory,
);

//! delete category
router.delete(
  '/delete-category/:id',
  CheckAuth('Super_Admin', 'Admin'),
  categoryController.deleteCategory,
);

export const CategoriesRoute = router;
