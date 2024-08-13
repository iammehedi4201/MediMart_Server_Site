import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { ProductService } from './Product.service';

//: Create Product
const CreateProduct = CatchAsync(async (req, res) => {
  const result = await ProductService.CreateProductToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Product created successfully',
    data: result,
  });
});

//: Get all products
const GetAllProduct = CatchAsync(async (req, res) => {
  const result = await ProductService.GetProductFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product fetched successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

//: Get a product
const GetAProduct = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.GetProductAFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product fetched successfully',
    data: result,
  });
});

//: Update Product
const UpdateProduct = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.UpdateProductFromDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Product updated successfully',
    data: result,
  });
});

//: Delete Product
const DeleteProduct = CatchAsync(async (req, res) => {
  const { id } = req.params;
  await ProductService.DeleteProductFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: null,
  });
});

export const ProductController = {
  CreateProduct,
  GetAllProduct,
  GetAProduct,
  UpdateProduct,
  DeleteProduct,
};
