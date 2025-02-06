import { Router } from "express";
import { userRoutes } from "../module/user/user.routes";
import { orderRoutes } from "../module/orders/order.routes";
import { carRoutes } from "../module/cars/cars.routes";
import { authRoutes } from "../module/auth/auth.routes";




const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/orders',
        route: orderRoutes
    },
    {
        path: '/cars',
        route: carRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;