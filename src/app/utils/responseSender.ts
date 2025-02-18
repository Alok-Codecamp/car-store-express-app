import { Response } from "express";


export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

type Tresponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: TMeta;
    data: T;


}


const responseSender = <T>(res: Response, data: Tresponse<T>) => {


    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    })
}

export default responseSender;