"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../module/user/user.routes");
const order_routes_1 = require("../module/orders/order.routes");
const cars_routes_1 = require("../module/cars/cars.routes");
const auth_routes_1 = require("../module/auth/auth.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.userRoutes
    },
    {
        path: '/orders',
        route: order_routes_1.orderRoutes
    },
    {
        path: '/cars',
        route: cars_routes_1.carRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
