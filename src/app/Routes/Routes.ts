import express from 'express';
import { Authroutes } from '../Modules/Auth/Auth.route';
import { ProductRoutes } from '../Modules/Product/Product.route';
import { UserRoutes } from '../Modules/User/User.route';

const route = express.Router();

export const moduleRoute = [
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/auth',
    route: Authroutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
];

moduleRoute.forEach((Route) => route.use(Route.path, Route.route));

export default route;
