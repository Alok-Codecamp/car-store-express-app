import { Request, Response } from "express";
import status from "http-status";




export const routeNotFound = (req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json({
        success: 'false',
        message: 'Api not found!!',
        error: ' '
    })
}