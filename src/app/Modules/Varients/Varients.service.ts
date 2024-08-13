import { Querybulder } from '../../builder/QueryBuilders';
import { IVarients } from './Varients.interface';
import { Variant } from './Varients.model';

//! Create Varients
const createVarientsToDb = async (payLoad: IVarients) => {
  const Varient = Variant.create(payLoad);
  return Varient;
};

//! get all Varients
const getAllVarients = async (query: Record<string, unknown>) => {
  const varientQuery = new Querybulder(
    Variant.find({ isDeleted: { $ne: true } }),
    query,
  )
    .paginate()
    .Filter()
    .sortBy();

  const result = await varientQuery.modelQuery; //
  const meta = await varientQuery.countTotal();
  return {
    data: result,
    meta,
  };
};

//! get Varients by id
const getVarientsById = async (id: string) => {
  //check if Varients exist
  const Varient = await Variant.findById(id);
  if (!Varient) {
    throw new Error('Varients not found');
  }

  return Varient;
};

//! update Varients
const updateVarients = async (id: string, payLoad: IVarients) => {
  //check if Varients exist
  const Varient = await Variant.findById(id);
  if (!Varient) {
    throw new Error('Varients not found');
  }

  //update Varients
  const updatedVarient = await Variant.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });

  return updatedVarient;
};

//! delete Varients
const deleteVarients = async (id: string) => {
  //check if Varients exist
  const Varient = await Variant.findById(id);
  if (!Varient) {
    throw new Error('Varients not found');
  }

  //delete Varients
  await Variant.findByIdAndUpdate(id, { isDeleted: true });
};

export const VarientsService = {
  createVarientsToDb,
  getAllVarients,
  getVarientsById,
  updateVarients,
  deleteVarients,
};
