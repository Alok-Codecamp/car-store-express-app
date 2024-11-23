import { Request, Response } from "express";
import carService from "./car.service";
import { ICars } from "./cars.interface";


const createCarData = async (req: Request, res: Response) => {
    try {
        // destructure data from request body 
        const carData = req.body;
        const currentDate = new Date().toLocaleDateString();
        const carDataWithDate = { ...carData, createdAt: currentDate, updatedAt: currentDate }


        const result = await carService.createCarsDataIntoDb(carDataWithDate);

        res.status(200).json({
            message: 'Car created successfully',
            succcess: true,
            data: result
        })


    } catch (err) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": err
        })
    }
}

const getAllCars = async (req: Request, res: Response) => {

    try {
        const { category } = req.query;
        if (category) {
            const result = await carService.getAllCarsFromDb(category as string)
            res.status(200).json({
                message: "Cars retrieved successfully",
                status: true,
                data: result

            })
        }
        else {
            const result = await carService.getAllCarsFromDb(null);
            res.status(200).json({
                message: "Cars retrieved successfully",
                status: true,
                data: result

            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err

        })
    }

}

export default {
    createCarData,
    getAllCars
}