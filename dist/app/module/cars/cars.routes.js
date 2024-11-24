"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = __importDefault(require("./car.controller"));
const router = express_1.default.Router();
// route for insert data
router.post('/', car_controller_1.default.createCarData);
// route for get all data 
router.get('/', car_controller_1.default.getAllCars);
router.get('/:carId', car_controller_1.default.getspecificCar);
// route for update data 
router.put('/:carId', car_controller_1.default.updateCarData);
// route for delete car
router.delete('/:carId', car_controller_1.default.deleteCarData);
exports.carRoutes = router;
