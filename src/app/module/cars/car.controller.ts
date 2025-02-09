import { Request, Response } from "express";
import carService from "./car.service";
import asyncWrapper from "../../utils/asyncWraper";
import QueryBuilder from "../../queryBuilder/QueryBuilder";
import CarModel from "./car.model";
import responseSender from "../../utils/responseSender";
import status from "http-status";



const createCarData = async (req: Request, res: Response) => {

    try {
        // destructure data from request body 
        const carData = req.body;
        const result = await carService.createCarsDataIntoDb(carData);

        res.status(200).json({
            message: 'Car created successfully',
            succcess: true,
            data: result
        })


    } catch (err: any) {
        // const {name,erro}
        res.status(500).json({
            "message": err.message,
            "success": false,
            "error": err
        })
    }
}

// define controller function for get all car data and also get car data by query params

const getAllCars = asyncWrapper(async (req: Request, res: Response) => {


    const search = req.query;
    const result = await carService.getAllCarsFromDb(search);
    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'car retrive successfullly',
        meta: result.meta,
        data: result.data

    })

})

// define controller function for get specific car data by id

const getspecificCar = async (req: Request, res: Response) => {
    try {
        const { carId: carID } = req.params
        const result = await carService.getspecificCarFromDb(carID)
        res.status(200).json({
            message: "Cars retrieved successfully",
            status: true,
            data: result

        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err

        })
    }
}

// define controller function for update car data 
const updateCarData = async (req: Request, res: Response) => {
    try {
        const { carId: carID } = req.params;
        const updatedata = req.body
        // console.log(carID, updatedata);

        const result = await carService.updateCarDataInDB(carID, updatedata)
        res.status(200).json({
            message: "Cars data updated successfully",
            status: true,
            data: result

        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err

        })
    }
}
// define controller function for delete car data
const deleteCarData = asyncWrapper(async (req: Request, res: Response) => {

    const { carId: carID } = req.params;
    console.log(carID);


    const result = await carService.deleteCarDataInDB(carID)
    // if (result !== 'Car not found by given Id') {
    //     res.status(200).json({
    //         message: "Cars deleted successfully",
    //         status: true,
    //         data: {}

    //     })
    // }
    // else {
    //     res.status(404).json({
    //         message: result,
    //         status: false,

    //     })
    // }

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