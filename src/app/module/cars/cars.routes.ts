import express from 'express';
import mongoose from 'mongoose';
import carController from './car.controller';

const router = express.Router();

router.post('/insertCarData', carController.createCarData);

router.get('/', carController.getAllCars);

export const carRoutes = router;