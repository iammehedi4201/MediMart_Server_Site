import { FilterQuery, Query } from 'mongoose';
export class Querybulder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    let searchQuery = (this.query['search'] as string) || '';
    searchQuery = searchQuery.trim();
    this.modelQuery = this.modelQuery.find({
      $or: searchAbleFields.map((field) => ({
        [field]: { $regex: searchQuery, $options: 'i' },
      })),
    } as FilterQuery<T>);
    return this;
  }

  Filter() {
    const queryObj = { ...this.query };
    //Exclude fields from query
    const excludedFields = ['page', 'limit', 'sortOrder', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sortBy() {
    const sortBy = 'createdAt';
    let sortOrder = -1;
    sortOrder = this.query['sortOrder'] === 'asc' ? 1 : -1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder as never });
    return this;
  }

  paginate() {
    const page = (this.query['page'] as number) || 1;
    const limit = (this.query['limit'] as number) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
    };
  }
}
