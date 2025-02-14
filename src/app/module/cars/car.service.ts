import status from "http-status"
import QueryBuilder from "../../queryBuilder/QueryBuilder"
import AppError from "../../utils/AppError"
import CarModel from "./car.model"
import { ICars } from "./cars.interface"
import { CLIENT_RENEG_WINDOW } from "tls"


// create function for insert data into db.
const createCarsDataIntoDb = async (carData: ICars) => {
    // console.log(carData)
    const result = await CarModel.create(carData)
    console.log('result:', result)
    return result;
}

const getAllCarsFromDb = async (searchTerm: Record<string, unknown>) => {
    console.log(searchTerm)
    const carQuery = new QueryBuilder(CarModel.find(), searchTerm).search(['brand', 'model', 'category']).filter().sort().fields().paginate();
    const result = await carQuery.modelQuery;

    const meta = await carQuery.countTotal();
    return {
        data: result,
        meta: meta,
    };
}

//  get specific car data find by id

const getspecificCarFromDb = async (carIdparams: string) => {
    const result = await CarModel.findById(carIdparams);
    return result;

}

//  funtion for update specific data 
const updateCarDataInDB = async (carId: string, updateData: Partial<ICars>) => {

    const result = await CarModel.findByIdAndUpdate(carId, { $set: updateData }, { new: true })
    if (result) {
        return result;
    }
    else {
        throw new Error("Car id doesn't match")
    }
}

// function for delete specific data 
const deleteCarDataInDB = async (carId: string) => {
    const result = await CarModel.findByIdAndDelete(carId);
    if (result) {
        return result
    }
    else {
        throw new AppError(status.NOT_FOUND, "Car id doesn't match")
    }
}

export default {
    createCarsDataIntoDb,
    getAllCarsFromDb,
    getspecificCarFromDb,
    updateCarDataInDB,
    deleteCarDataInDB
}


