import express from 'express';
import { BookRoutes } from '../modules/book/book.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from './../modules/auth/auth.route';
import { UserProfileRoutes } from './../modules/user/user.profile.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/profile',
    routes: UserProfileRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
  {
    path: '/books',
    routes: BookRoutes,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
