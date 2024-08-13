/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IOrder } from './Order.interface';
import { Product } from '../Product/Product.model';
import AppError from '../../Helpers/AppError';
import httpStatus from 'http-status';
import { Order } from './Order.model';
import { Querybulder } from '../../builder/QueryBuilders';
import {
  AllSalesHistory,
  LastDaySalesHistory,
  LastMonthSalesHistory,
  LastWeekSalesHistory,
  LastYearSalesHistory,
} from './Order.utlis';

//! Create order to DB
const createOrderToDB = async (payLoad: IOrder) => {
  payLoad.createdAt = new Date(payLoad.orderDate).toISOString();
  payLoad.updatedAt = new Date(payLoad.orderDate).toISOString();

  //Transaction Start
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // check if product quantity is available
    for (const product of payLoad.products) {
      const productInDB = await Product.findById(product.product).session(
        session,
      );
      if (!productInDB) {
        throw new AppError('Product not found', httpStatus.NOT_FOUND);
      }

      //check if Product quantity is less than order quantity
      if (productInDB.quantity < product.quantity) {
        throw new AppError(`Insufficient stock`, httpStatus.BAD_REQUEST);
      }

      //update product quantity
      productInDB.quantity -= product.quantity;
      if (productInDB.quantity === 0) {
        productInDB.stockStatus = true;
      }
      await productInDB.save({ session });
    }

    //create order
    const order = await Order.create([payLoad], { session });

    //commit transaction
    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(error.message, httpStatus.BAD_REQUEST);
  }
};

//! Get all Orders
const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new Querybulder(
    Order.find({ isDeleted: { $ne: true } }),
    query,
  )
    .paginate()
    .Filter()
    .sortBy();

  const result = await orderQuery.modelQuery; //
  const meta = await orderQuery.countTotal();
  return {
    data: result,
    meta,
  };
};

//! Get Order History
const GetOrdersHistory = async (salesHistory: string) => {
  //all sales history

  if (salesHistory === 'weekly') {
    const lastWeekSales = await LastWeekSalesHistory();
    return lastWeekSales;
  } else if (salesHistory === 'daily') {
    const lastDaySales = await LastDaySalesHistory();
    return lastDaySales;
  } else if (salesHistory === 'monthly') {
    const lastMonthSales = await LastMonthSalesHistory();
    return lastMonthSales;
  } else if (salesHistory === 'yearly') {
    const lastYearSales = await LastYearSalesHistory();
    return lastYearSales;
  } else {
    const allSalesHistory = await AllSalesHistory();
    return allSalesHistory;
  }
};

//! Update Order
const updateOrder = async (id: string, payLoad: IOrder) => {
  //check if order exist
  const order = await Order.findById(id);
  if (!order) {
    throw new AppError('Order not found', httpStatus.NOT_FOUND);
  }

  //update order
  const updatedOrder = await Order.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });

  return updatedOrder;
};

//! Delete Order
const deleteOrder = async (id: string) => {
  //check if order exist
  const order = await Order.findById(id);
  if (!order) {
    throw new AppError('Order not found', httpStatus.NOT_FOUND);
  }

  //delete order
  await Order.findByIdAndUpdate(id, { isDeleted: true });
};

export const OrderService = {
  createOrderToDB,
  getAllOrders,
  GetOrdersHistory,
  updateOrder,
  deleteOrder,
};
