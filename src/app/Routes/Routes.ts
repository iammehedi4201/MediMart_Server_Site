import { CategoriesRoute } from './../Modules/Categories/Categories.route';
import express from 'express';
import { ProductRoutes } from '../Modules/Product/Product.route';
import { UserRoutes } from '../Modules/User/User.route';
import { Authroutes } from '../Modules/Auth/Auth.route';
import { VarientsRoutes } from '../Modules/Varients/Varients.route';
import { OrderRoutes } from '../Modules/Order/Order.route';

const route = express.Router();

export const moduleRoute = [
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: Authroutes,
  },
  {
    path: '/category',
    route: CategoriesRoute,
  },
  {
    path: '/varient',
    route: VarientsRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoute.forEach((Route) => route.use(Route.path, Route.route));

export default route;
