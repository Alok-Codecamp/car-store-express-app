import { Error } from "mongoose";
import { TErrorSources, TGenericError } from "../types/errorTypes";



export const handleCastError = (err: Error.CastError): TGenericError => {
    const errorSources: TErrorSources = [{
        path: err.path,
        message: err.message
    }
    ]


    const statusCode = 400;
    return {
        statusCode,
        message: 'invalied Id',
        errorSources: errorSources
    }
}