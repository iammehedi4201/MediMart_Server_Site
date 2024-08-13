import { Router } from 'express';
import CheckAuth from '../../Middleware/CheckAuth';
import validateRequest from '../../Middleware/ValidationRequest';
import { VarientValidation } from './Varients.validation';
import { VarientsController } from './Varients.controller';

const router = Router();

//! creae varients
router.post(
  '/create-varients',
  CheckAuth('Super_Admin', 'Admin'),
  validateRequest(VarientValidation.createVarientsSchema),
  VarientsController.createVarientsToDb,
);

//! get all varients
router.get(
  '/get-varients',
  CheckAuth('Super_Admin', 'Admin'),
  VarientsController.getAllVarients,
);

//! get varients by id
router.get(
  '/:id',
  CheckAuth('Super_Admin', 'Admin'),
  VarientsController.getVarientsById,
);

//! update varients
router.put(
  '/update-varients/:id',
  CheckAuth('Super_Admin', 'Admin'),
  VarientsController.updateVarients,
);

//! delete varients
router.delete(
  '/delete-varients/:id',
  CheckAuth('Super_Admin', 'Admin'),
  VarientsController.deleteVarients,
);

export const VarientsRoutes = router;
