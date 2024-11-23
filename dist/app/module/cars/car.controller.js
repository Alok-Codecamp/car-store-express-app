"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_service_1 = __importDefault(require("./car.service"));
const createCarData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructure data from request body 
        const carData = req.body;
        const result = yield car_service_1.default.createCarsDataIntoDb(carData);
        res.status(200).json({
            succcess: true,
            message: 'car data created successfully',
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": err
        });
    }
});
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        if (category) {
            const result = yield car_service_1.default.getAllCarsFromDb(category);
            res.status(200).json({
                message: "Cars retrieved successfully",
                status: true,
                data: result
            });
        }
        else {
            const result = yield car_service_1.default.getAllCarsFromDb(null);
            res.status(200).json({
                message: "Cars retrieved successfully",
                status: true,
                data: result
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err
        });
    }
});
exports.default = {
    createCarData,
    getAllCars
};
