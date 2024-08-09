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
    const excludedFields = [
      'page',
      'limit',
      'sortOrder',
      'minPrice',
      'maxPrice',
      'search',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);
    //check if minPrice and maxPrice exists in query
    if (this.query['minPrice'] && this.query['maxPrice']) {
      queryObj['price'] = {
        $gte: Number(this.query['minPrice']),
        $lte: Number(this.query['maxPrice']),
      };
    } else if (this.query['minPrice']) {
      queryObj['price'] = { $gte: Number(this.query['minPrice']) };
    } else if (this.query['maxPrice']) {
      queryObj['price'] = { $lte: Number(this.query['maxPrice']) };
    }

    if (this.query['createdAt']) {
      //give me default date for show all products
      const date = new Date(this.query['createdAt'] as string);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      queryObj['createdAt'] = {
        $gte: date,
        $lt: nextDay,
      };
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sortBy() {
    const sortBy = 'price';
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
