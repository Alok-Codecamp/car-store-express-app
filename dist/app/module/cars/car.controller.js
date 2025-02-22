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
const asyncWraper_1 = __importDefault(require("../../utils/asyncWraper"));
const responseSender_1 = __importDefault(require("../../utils/responseSender"));
const http_status_1 = __importDefault(require("http-status"));
const car_model_1 = __importDefault(require("./car.model"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createCarData = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure data from request body 
    const carData = req.body;
    const isCarExists = yield car_model_1.default.findOne({ model: carData.model });
    if (isCarExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This car already exists!');
    }
    const result = yield car_service_1.default.createCarsDataIntoDb(carData);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'car retrive successfully',
        data: result,
    });
}));
// define controller function for get all car data and also get car data by query params
const getAllCars = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params, req.query) 
    const search = req.query;
    const result = yield car_service_1.default.getAllCarsFromDb(search);
    (0, responseSender_1.default)(res, Object.assign({ statusCode: http_status_1.default.OK, success: true, message: 'car retrive successfullly' }, result));
}));
// define controller function for get specific car data by id
const getspecificCar = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId: carID } = req.params;
    const result = yield car_service_1.default.getspecificCarFromDb(carID);
    // res.status(200).json({
    //     message: "Cars retrieved successfully",
    //     status: true,
    //     data: result
    // })
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'car retrive successfully',
        data: result,
    });
}));
// define controller function for update car data 
const updateCarData = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId: carID } = req.params;
    const updatedata = req.body;
    // console.log(carID, updatedata);
    const result = yield car_service_1.default.updateCarDataInDB(carID, updatedata);
    res.status(200).json({
        message: "Cars data updated successfully",
        status: true,
        data: result
    });
}));
// define controller function for delete car data
const deleteCarData = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId: carID } = req.params;
    const result = yield car_service_1.default.deleteCarDataInDB(carID);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'car deleted successfully',
        data: result
    });
}));
// export all controller function 
exports.default = {
    createCarData,
    getAllCars,
    getspecificCar,
    updateCarData,
    deleteCarData
};
