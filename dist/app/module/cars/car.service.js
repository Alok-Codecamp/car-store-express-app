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
const car_model_1 = __importDefault(require("./car.model"));
// create function for insert data into db.
const createCarsDataIntoDb = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.create(carData);
    return result;
});
const getAllCarsFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        const result = yield car_model_1.default.find({ $or: [{ brand: searchTerm }, { model: searchTerm }, { category: searchTerm }] });
        return result;
    }
    else {
        const result = yield car_model_1.default.find();
        return result;
    }
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
    try {
        const result = yield car_model_1.default.findByIdAndDelete(carId);
        if (result) {
            return result;
        }
        else {
            throw new Error("Car id doesn't match");
        }
    }
    catch (err) {
        return err;
    }
});
exports.default = {
    createCarsDataIntoDb,
    getAllCarsFromDb,
    getspecificCarFromDb,
    updateCarDataInDB,
    deleteCarDataInDB
};
