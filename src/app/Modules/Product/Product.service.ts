import httpStatus from 'http-status';
import AppError from '../../Helpers/AppError';
import { IProduct } from './Product.interface';
import { Product } from './Product.model';
import { Querybulder } from '../../builder/QueryBuilders';
import { searchAbleFields } from './Product.constant';
import generateShoeId from './Product.utils';

const CreateProductToDB = async (payLoad: IProduct) => {
  const { brand, model, color } = payLoad;
  payLoad.productId = await generateShoeId(brand, model, color);
  const result = await Product.create(payLoad);
  return result;
};

const GetProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new Querybulder(Product.find(), query)
    .Filter()
    .search(searchAbleFields)
    .sortBy();
  const result = await productQuery.modelQuery;
  return result;
};

const GetProductAFromDB = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }
  return product;
};

const UpdateProductFromDB = async (
  id: string,
  payLoad: IProduct,
  query: { duplicate: string },
) => {
  const { duplicate } = query;
  //Check if product exists
  const isProductExists = await Product.findById(id);
  if (!isProductExists) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }

  // check if duplicate is true and create a new product
  if (duplicate === 'true') {
    const { brand, model, color } = payLoad;
    payLoad.productId = await generateShoeId(brand, model, color);
    const result = await Product.create(payLoad);
    return {
      message: 'Product created successfully',
      data: result,
    };
  } else {
    //update product
    const { brand, model, color } = payLoad;
    payLoad.productId = await generateShoeId(brand, model, color);
    const result = await Product.findByIdAndUpdate(id, payLoad, {
      new: true,
      runValidators: true,
    });

    return {
      message: 'Product updated successfully',
      data: result,
    };
  }
};

const DeleteProductFromDb = async (ProductIds: string[]) => {
  //check if product exists
  const isProductExists = await Product.find({ _id: { $in: ProductIds } });

  if (!isProductExists) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }

  const result = await Product.deleteMany({ _id: { $in: ProductIds } });

  return result;
};

const verifyProduct = async (productId: string) => {
  //:check if product exists
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND);
  }
  return product;
};

export const ProductService = {
  CreateProductToDB,
  GetProductFromDB,
  GetProductAFromDB,
  UpdateProductFromDB,
  DeleteProductFromDb,
  verifyProduct,
};
