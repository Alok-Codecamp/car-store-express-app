import express, { Router } from 'express';
import orderController from './order.controller';
import { authValidator } from '../../middleware/authValidator';

const router = express.Router();

// create order route 
router.post('/create-order', authValidator('admin', 'user'), orderController.createOrder)

router.get('/', authValidator('admin', 'user'), orderController.getOrders)

router.get('/verify-payment', authValidator('admin', 'user'), orderController.verifyPayment)


router.get('/revenue', orderController.getRevenue)

export const orderRoutes = router;