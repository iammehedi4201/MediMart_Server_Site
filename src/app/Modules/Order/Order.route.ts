import { Router } from 'express';
import validateRequest from '../../Middleware/ValidationRequest';
import { OrderValidation } from './Order.validation';
import CheckAuth from '../../Middleware/CheckAuth';
import { OrderController } from './Order.controller';

const router = Router();

//! Create a new Order
router.post(
  '/create-order',
  CheckAuth('Super_Admin', 'Admin', 'User'),
  validateRequest(OrderValidation.orderSchema),
  OrderController.createOrderToDB,
);

//! Get all Orders
router.get(
  '/get-orders',
  CheckAuth('Super_Admin', 'Admin'),
  OrderController.getAllOrders,
);

//! Get a single Order
router.get(
  '/get-order/:id',
  CheckAuth('Super_Admin', 'Admin', 'User'),
  OrderController.getSingleOrder,
);

//! Get user based Orders
router.get(
  '/get-user-orders/:id',
  CheckAuth('Super_Admin', 'Admin', 'User'),
  OrderController.getUserOrders,
);

//! Get Order History
router.get(
  '/get-order-History',
  CheckAuth('Super_Admin', 'Admin'),
  OrderController.GetOrdersHistory,
);

//! Update Order status
router.put(
  '/update-order/:id',
  CheckAuth('Super_Admin', 'Admin'),
  OrderController.updateOrderStatus,
);

//! Delete Order
router.delete(
  '/delete-order/:id',
  CheckAuth('Super_Admin', 'Admin'),
  OrderController.deleteOrder,
);

export const OrderRoutes = router;
