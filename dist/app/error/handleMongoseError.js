"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val.path,
            message: val.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'mongoose validation error',
        errorSources
    };
};
exports.default = handleMongooseError;
