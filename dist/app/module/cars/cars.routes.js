"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = __importDefault(require("./car.controller"));
const router = express_1.default.Router();
router.post('/create-car', car_controller_1.default.createCarData);
router.get('/', car_controller_1.default.getAllCars);
exports.carRoutes = router;
