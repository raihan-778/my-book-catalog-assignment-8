import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/users',
    routes: UserRoutes,
  },

  //   {
  //     path: '/',
  //     route: UserRoutes,
  //   },
  //  {
  //     path: '/auth',
  //     route: AuthRoutes,
  //   },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
