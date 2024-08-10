import express from 'express';
import { ProductRoutes } from '../Modules/Product/Product.route';
import { UserRoutes } from '../Modules/User/User.route';
import { Authroutes } from '../Modules/Auth/Auth.route';

const route = express.Router();

export const moduleRoute = [
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: Authroutes,
  },
];

moduleRoute.forEach((Route) => route.use(Route.path, Route.route));

export default route;
