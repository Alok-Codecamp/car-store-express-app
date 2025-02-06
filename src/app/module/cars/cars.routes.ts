import express from 'express';
import carController from './car.controller';

const router = express.Router();

// route for insert car data
router.post('/create-car', carController.createCarData);

// route for get all car data 
router.get('/', carController.getAllCars);

router.get('/:carId', carController.getspecificCar);

// route for update car data 
router.put('/:carId', carController.updateCarData);

// route for delete car data
router.delete('/:carId', carController.deleteCarData)

export const carRoutes = router;