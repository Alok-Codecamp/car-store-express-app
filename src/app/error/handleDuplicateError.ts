import { TErrorSources, TGenericError } from "../types/errorTypes";




const handleDuplicateError = (err: any): TGenericError => {
    const errorSources: TErrorSources = [{
        path: "duplicate",
        message: err.errmsg
    }
    ]


    const statusCode = 400;
    return {
        statusCode,
        message: 'duplicateId',
        errorSources
    }
}


export default handleDuplicateError;