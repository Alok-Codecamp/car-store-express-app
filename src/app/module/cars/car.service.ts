import CarModel from "./car.model"
import { ICars } from "./cars.interface"


// create function for insert data into db.
const createCarsDataIntoDb = async (carData: ICars) => {
    // console.log(carData)
    const result = await CarModel.create(carData)
    console.log('result:', result)
    return result;
}

const getAllCarsFromDb = async (searchTerm: string | null) => {
    if (searchTerm) {
        const result = await CarModel.find({ $or: [{ brand: searchTerm }, { model: searchTerm }, { category: searchTerm }] });
        return result;
    }
    else {
        const result = await CarModel.find();
        return result;
    }
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

    try {
        const result = await CarModel.findByIdAndDelete(carId);
        if (result) {
            return result
        }
        else {
            throw new Error("Car id doesn't match")
        }

    } catch (err) {
        return err
    }


}

export default {
    createCarsDataIntoDb,
    getAllCarsFromDb,
    getspecificCarFromDb,
    updateCarDataInDB,
    deleteCarDataInDB
}


