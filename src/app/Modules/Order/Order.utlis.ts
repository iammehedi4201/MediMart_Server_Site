import { Order } from './Order.model';

//* LastDaySalesHistory
export const LastDaySalesHistory = async () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Set to the previous day

  const startOfDay = new Date(yesterday);
  startOfDay.setHours(0, 0, 0, 0); // Set to the beginning of the previous day

  const endOfDay = new Date(yesterday);
  endOfDay.setHours(23, 59, 59, 999); // Set to the end of the previous day

  console.log('startOfDay', startOfDay);
  console.log('endOfDay', endOfDay);

  const result = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    },
    {
      $unwind: '$products',
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        productName: '$product.name',
        quantity: '$products.quantity',
        price: '$products.price',
        buyerName: '$shippingAddress.name',
        salesDate: '$orderDate',
      },
    },
  ]);

  return result;
};

//* LastWeekSalesHistory
export const LastWeekSalesHistory = async () => {
  const today = new Date();

  const startOfLastWeek = new Date(today);
  startOfLastWeek.setDate(today.getDate() - today.getDay() - 6); // Set to the beginning of last week (Sunday)

  const endOfLastWeek = new Date(today);
  endOfLastWeek.setDate(today.getDate() - today.getDay()); // Set to the end of last week (Saturday)

  console.log('startOfLastWeek', startOfLastWeek);
  console.log('endOfLastWeek', endOfLastWeek);

  const result = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: startOfLastWeek,
          $lte: endOfLastWeek,
        },
      },
    },
    {
      $unwind: '$products',
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        productName: '$product.name',
        quantity: '$products.quantity',
        price: '$products.price',
        buyerName: '$shippingAddress.name',
        salesDate: '$orderDate',
      },
    },
  ]);

  return result;
};

//* LastMonthSalesHistory
export const LastMonthSalesHistory = async () => {
  const today = new Date();
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1,
  ); // Set to the beginning of last month

  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Set to the end of last month

  console.log('startOfLastMonth', startOfLastMonth);
  console.log('endOfLastMonth', endOfLastMonth);

  const result = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: startOfLastMonth,
          $lte: endOfLastMonth,
        },
      },
    },
    {
      $unwind: '$products',
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        productName: '$product.name',
        quantity: '$products.quantity',
        price: '$products.price',
        buyerName: '$shippingAddress.name',
        salesDate: '$orderDate',
      },
    },
  ]);

  return result;
};

//* LastYearSalesHistory
export const LastYearSalesHistory = async () => {
  const today = new Date();
  const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1); // Set to the beginning of last year

  const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31); // Set to the end of last year

  console.log('startOfLastYear', startOfLastYear);
  console.log('endOfLastYear', endOfLastYear);

  const result = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: startOfLastYear,
          $lte: endOfLastYear,
        },
      },
    },
    {
      $unwind: '$products',
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        productName: '$product.name',
        quantity: '$products.quantity',
        price: '$products.price',
        buyerName: '$shippingAddress.name',
        salesDate: '$orderDate',
      },
    },
  ]);

  return result;
};

//* AllSalesHistory
export const AllSalesHistory = async () => {
  const result = await Order.aggregate([
    {
      $match: {},
    },
    {
      $unwind: '$products',
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        productName: '$product.name',
        quantity: '$products.quantity',
        price: '$products.price',
        buyerName: '$shippingAddress.name',
        salesDate: '$orderDate',
      },
    },
  ]);

  return result;
};
