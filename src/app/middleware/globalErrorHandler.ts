import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import handleMongooseError from "../error/handleMongoseError";
import { handleCastError } from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import config from "../config/config";
import AppError from "../utils/AppError";
import { TErrorSources } from "../types/errorTypes";



const globalErrorhandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = err?.statusCode || 500;
    let message = err?.message || 'unknown error'

    let errorSources: TErrorSources = [
        {
            path: err.path || 'no path found',
            message: 'Something went wrong'
        }
    ]


    if (err instanceof ZodError) {
        const structuredError = handleZodError(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources
    }
    else if (err.name === 'ValidationError') {
        const structuredError = handleMongooseError(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources
    }
    else if (err.name === 'CastError') {
        const structuredError = handleCastError(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources
    }
    else if (err.code === '11000') {
        const structuredError = handleDuplicateError(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources
    }
    // handle AppError

    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: 'App error ',
                message: err.message
            }
        ]

    }

    // handler for error

    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: 'error ',
                message: err.message
            }
        ]

    }




    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        main: err,
        stack: config.appMood === 'development' ? err?.stack : null

    })
}

export default globalErrorhandler;