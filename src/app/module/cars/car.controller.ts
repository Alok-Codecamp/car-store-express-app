import { Request, Response } from "express";
import carService from "./car.service";
import asyncWrapper from "../../utils/asyncWraper";
import responseSender, { TMeta } from "../../utils/responseSender";
import status from "http-status";
import { ICars } from "./cars.interface";
import CarModel from "./car.model";
import AppError from "../../utils/AppError";



const createCarData = asyncWrapper(async (req: Request, res: Response) => {


    // destructure data from request body 
    const carData = req.body;
    const isCarExists = await CarModel.findOne({ model: carData.model });
    if (isCarExists) {
        throw new AppError(status.CONFLICT, 'This car already exists!')
    }
    const result = await carService.createCarsDataIntoDb(carData);


    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'car retrive successfully',
        data: result,


    })


})

// define controller function for get all car data and also get car data by query params

const getAllCars = asyncWrapper(async (req: Request, res: Response) => {

    // console.log(req.params, req.query) 
    const search = req.query;
    const result: { data: ICars[]; meta: TMeta } = await carService.getAllCarsFromDb(search);

    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'car retrive successfullly',
        ...result
    })

})

// define controller function for get specific car data by id

const getspecificCar = asyncWrapper(async (req: Request, res: Response) => {

    const { carId: carID } = req.params
    const result = await carService.getspecificCarFromDb(carID)
    // res.status(200).json({
    //     message: "Cars retrieved successfully",
    //     status: true,
    //     data: result

    // })
    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'car retrive successfully',
        data: result,


    })
})

// define controller function for update car data 
const updateCarData = asyncWrapper(async (req: Request, res: Response) => {

    const { carId: carID } = req.params;
    const updatedata = req.body
    // console.log(carID, updatedata);

    const result = await carService.updateCarDataInDB(carID, updatedata)
    res.status(200).json({
        message: "Cars data updated successfully",
        status: true,
        data: result

    })
})



// define controller function for delete car data
const deleteCarData = asyncWrapper(async (req: Request, res: Response) => {

    const { carId: carID } = req.params;


    const result = await carService.deleteCarDataInDB(carID)
    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'car deleted successfully',
        data: result
    })

})



// export all controller function 
export default {
    createCarData,
    getAllCars,
    getspecificCar,
    updateCarData,
    deleteCarData
}