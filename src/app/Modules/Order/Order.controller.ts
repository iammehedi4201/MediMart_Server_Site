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
const updateOrder = CatchAsync(async (req, res) => {
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
  await OrderService.deleteOrder(req.params.id);
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
  updateOrder,
  deleteOrder,
};
