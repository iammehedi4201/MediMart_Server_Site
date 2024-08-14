import httpStatus from 'http-status';
import { Querybulder } from '../../builder/QueryBuilders';
import AppError from '../../Helpers/AppError';
import { searchAbleFields } from './Product.constant';
import { IProduct } from './Product.interface';
import { Product } from './Product.model';

const CreateProductToDB = async (payLoad: IProduct) => {
  const result = await Product.create(payLoad);
  return result;
};

const GetProductFromDB = async (query: Record<string, unknown>) => {
  const ProductQuery = new Querybulder(
    Product.find({ isDeleted: { $ne: true } })
      .populate('categories.primary')
      .populate('categories.secondary')
      .populate('categories.tertiary')
      .populate('variants'),
    query,
  )
    .paginate()
    .Filter()
    .search(searchAbleFields)
    .sortBy();

  const result = await ProductQuery.modelQuery;
  const meta = await ProductQuery.countTotal();
  return {
    data: result,
    meta,
  };
};

const GetProductAFromDB = async (productId: string) => {
  const product = await Product.findById(productId).populate('variants');
  if (!product) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }
  return product;
};

const UpdateProductFromDB = async (id: string, updateData: IProduct) => {
  //Check if product exists
  const isProductExists = await Product.findById(id);
  if (!isProductExists) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }

  // check if product deleted or not
  if (isProductExists.isDeleted) {
    throw new AppError('Product is deleted', httpStatus.BAD_REQUEST);
  }

  // update product
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  )
    .populate('categories.primary')
    .populate('categories.secondary')
    .populate('categories.tertiary')
    .populate('variants');

  return updatedProduct;
};

const DeleteProductFromDb = async (productId: string) => {
  //check if product exists
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }

  // // check if product deleted or not
  if (product.isDeleted) {
    throw new AppError('Product is deleted', httpStatus.BAD_REQUEST);
  }

  // delete product
  const result = await Product.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const ProductService = {
  CreateProductToDB,
  GetProductFromDB,
  GetProductAFromDB,
  UpdateProductFromDB,
  DeleteProductFromDb,
};
