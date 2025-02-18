import express from 'express';
import orderController from './order.controller';
import { authValidator } from '../../middleware/authValidator';

const router = express.Router();

// create order route 
router.post('/create-order', authValidator('admin', 'user'), orderController.createOrder)
router.get('/', authValidator('admin'), orderController.getOrders)


router.get('/revenue', orderController.getRevenue)

export const orderRoutes = router;