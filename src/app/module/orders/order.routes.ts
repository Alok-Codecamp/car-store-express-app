import express, { Router } from 'express';
import orderController from './order.controller';
import { authValidator } from '../../middleware/authValidator';

const router = express.Router();

// create order route 
router.post('/create-order', authValidator('admin', 'user'), orderController.createOrder)

router.get('/', authValidator('admin', 'user'), orderController.getOrders)

router.get('/:email', authValidator('admin', 'user'), orderController.getOrdersById);
router.put('/:orderId', authValidator('admin'), orderController.updateOrder)
router.post('/verify-payment', authValidator('admin', 'user'), orderController.verifyPayment)
router.delete('/:orderId', authValidator('admin'), orderController.deleteOrder);

export const orderRoutes = router;