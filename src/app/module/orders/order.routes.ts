import express from 'express';
import app from '../../../app';
import orderController from './order.controller';

const router = express.Router();

// create order route 
router.post('/', orderController.createOrder)



export const orderRoutes = router;