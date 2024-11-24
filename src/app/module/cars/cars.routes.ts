import express from 'express';
import carController from './car.controller';

const router = express.Router();

// route for insert data
router.post('/', carController.createCarData);

// route for get all data 
router.get('/', carController.getAllCars);

router.get('/:carId', carController.getspecificCar);

// route for update data 
router.put('/:carId', carController.updateCarData);

// route for delete car
router.delete('/:carId', carController.deleteCarData)

export const carRoutes = router;