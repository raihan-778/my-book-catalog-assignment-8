import express from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from './../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
