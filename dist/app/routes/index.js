"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../modules/book/book.routes");
const category_routes_1 = require("../modules/category/category.routes");
const order_routes_1 = require("../modules/order/order.routes");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("./../modules/auth/auth.route");
const user_profile_route_1 = require("./../modules/user/user.profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/profile',
        routes: user_profile_route_1.UserProfileRoutes,
    },
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/categories',
        routes: category_routes_1.CategoryRoutes,
    },
    {
        path: '/books',
        routes: book_routes_1.BookRoutes,
    },
    {
        path: '/orders',
        routes: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
