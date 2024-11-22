import CarModel from "./car.model"
import { ICars } from "./cars.interface"


// create function for insert data into db.
const createCarsDataIntoDb = async (carData: ICars) => {

    const result = await CarModel.create(carData)
    return result;
}

const getAllCarsFromDb = async (queryParams: string | null) => {
    if (queryParams) {
        const result = await CarModel.find({ category: queryParams });
        return result;
    }
    else {
        const result = await CarModel.find();
        return result;
    }
}


export default {
    createCarsDataIntoDb,
    getAllCarsFromDb
}


