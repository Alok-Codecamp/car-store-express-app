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
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../queryBuilder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const car_model_1 = __importDefault(require("./car.model"));
// create function for insert data into db.
const createCarsDataIntoDb = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(carData)
    const result = yield car_model_1.default.create(carData);
    console.log('result:', result);
    return result;
});
const getAllCarsFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const carQuery = new QueryBuilder_1.default(car_model_1.default.find(), searchTerm).search(['brand', 'model', 'category']).filter().sort().fields().paginate();
    const result = yield carQuery.modelQuery;
    const meta = yield carQuery.countTotal();
    return {
        data: result,
        meta,
    };
});
//  get specific car data find by id
const getspecificCarFromDb = (carIdparams) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findById(carIdparams);
    return result;
});
//  funtion for update specific data 
const updateCarDataInDB = (carId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findByIdAndUpdate(carId, { $set: updateData }, { new: true });
    if (result) {
        return result;
    }
    else {
        throw new Error("Car id doesn't match");
    }
});
// function for delete specific data 
const deleteCarDataInDB = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findByIdAndDelete(carId);
    if (result) {
        return result;
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car id doesn't match");
    }
});
exports.default = {
    createCarsDataIntoDb,
    getAllCarsFromDb,
    getspecificCarFromDb,
    updateCarDataInDB,
    deleteCarDataInDB
};
