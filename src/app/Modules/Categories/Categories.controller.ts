import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { categoryService } from './Categories.service';

//! create category to DB
const createCategoryToDB = CatchAsync(async (req, res) => {
  const result = await categoryService.createCategoryToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

//! get all categories
const getAllCategories = CatchAsync(async (req, res) => {
  const result = await categoryService.getAllCategories(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All categories',
    meta: result.meta,
    data: result?.data,
  });
});

//! update category
const updateCategory = CatchAsync(async (req, res) => {
  const result = await categoryService.updateCategory(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category updated successfully',
    data: result,
  });
});

//! delete category
const deleteCategory = CatchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category deleted successfully',
    data: null,
  });
});

export const categoryController = {
  createCategoryToDB,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
