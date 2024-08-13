import { Querybulder } from '../../builder/QueryBuilders';
import { ICategory } from './Categories.interface';
import { Category } from './Categories.model';

//! create category to DB
const createCategoryToDB = async (payLoad: ICategory) => {
  const category = await Category.create(payLoad);
  return category;
};

//! get all categories
const getAllCategories = async (query: Record<string, unknown>) => {
  const categoryQuery = new Querybulder(
    Category.find({ isDeleted: { $ne: true } }),
    query,
  )
    .paginate()
    .Filter()
    .sortBy();

  const result = await categoryQuery.modelQuery; //
  const meta = await categoryQuery.countTotal();
  return {
    data: result,
    meta,
  };
};

//! update category
const updateCategory = async (id: string, payLoad: ICategory) => {
  //check if category exist
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  //update category
  const updatedCategory = await Category.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });

  return updatedCategory;
};

//! delete category
const deleteCategory = async (id: string) => {
  //check if category exist
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  //delete category
  await Category.findByIdAndUpdate(id, { isDeleted: true });
};

export const categoryService = {
  createCategoryToDB,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
