import express from 'express';
import orderController from './order.controller';
import { authValidator } from '../../middleware/authValidator';

const router = express.Router();

// create order route 
router.post('/create-order', authValidator('Admin', 'User'), orderController.createOrder)
router.get('/', authValidator('Admin'), orderController.getOrders)


router.get('/revenue', orderController.getRevenue)

export const orderRoutes = router;