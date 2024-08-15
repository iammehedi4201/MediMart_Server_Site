import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { OrderService } from './Order.service';

//! Create Order To DB
const createOrderToDB = CatchAsync(async (req, res) => {
  const result = await OrderService.createOrderToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Order created successfully',
    data: result,
  });
});

//! get all Orders
const getAllOrders = CatchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Orders fetched successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

//! get single Order
const getSingleOrder = CatchAsync(async (req, res) => {
  const result = await OrderService.getSingleOrder(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order fetched successfully',
    data: result,
  });
});

//! get User Orders
const getUserOrders = CatchAsync(async (req, res) => {
  console.log('req.params.id', req.params.id);

  const result = await OrderService.getUserOrders(req.params.id, req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User Orders fetched successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

//! get Orders History
const GetOrdersHistory = CatchAsync(async (req, res) => {
  const { salesHistory } = req.query;
  const result = await OrderService.GetOrdersHistory(salesHistory as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Sales history fetched successfully',
    data: result,
  });
});

//! update Order
const updateOrderStatus = CatchAsync(async (req, res) => {
  const result = await OrderService.updateOrder(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order updated successfully',
    data: result,
  });
});

//! delete Order
const deleteOrder = CatchAsync(async (req, res) => {
  await OrderService.deleteOrder(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order deleted successfully',
    data: null,
  });
});

export const OrderController = {
  createOrderToDB,
  getAllOrders,
  GetOrdersHistory,
  updateOrderStatus,
  deleteOrder,
  getSingleOrder,
  getUserOrders,
};
