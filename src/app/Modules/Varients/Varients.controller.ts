import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { VarientsService } from './Varients.service';

//! create varients to Db
const createVarientsToDb = CatchAsync(async (req, res) => {
  const result = await VarientsService.createVarientsToDb(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Varient created successfully',
    data: result,
  });
});

//! get all varients
const getAllVarients = CatchAsync(async (req, res) => {
  const result = await VarientsService.getAllVarients(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All Varient fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

//! get varients by id
const getVarientsById = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VarientsService.getVarientsById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Varient fetched successfully',
    data: result,
  });
});

//! update varients
const updateVarients = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VarientsService.updateVarients(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Varient updated successfully',
    data: result,
  });
});

//! delete varients
const deleteVarients = CatchAsync(async (req, res) => {
  const { id } = req.params;
  await VarientsService.deleteVarients(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Varient deleted successfully',
    data: null,
  });
});

export const VarientsController = {
  createVarientsToDb,
  getAllVarients,
  getVarientsById,
  updateVarients,
  deleteVarients,
};
