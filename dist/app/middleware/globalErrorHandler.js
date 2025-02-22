"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const handleMongoseError_1 = __importDefault(require("../error/handleMongoseError"));
const handleCastError_1 = require("../error/handleCastError");
const handleDuplicateError_1 = __importDefault(require("../error/handleDuplicateError"));
const config_1 = __importDefault(require("../config/config"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const globalErrorhandler = (err, req, res, next) => {
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'unknown error';
    let errorSources = [
        {
            path: err.path || 'no path found',
            message: 'Something went wrong'
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const structuredError = (0, handleZodError_1.default)(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources;
    }
    else if (err.name === 'ValidationError') {
        const structuredError = (0, handleMongoseError_1.default)(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources;
    }
    else if (err.name === 'CastError') {
        const structuredError = (0, handleCastError_1.handleCastError)(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources;
    }
    else if (err.code === '11000') {
        const structuredError = (0, handleDuplicateError_1.default)(err);
        statusCode = structuredError.statusCode,
            message = structuredError.message,
            errorSources = structuredError.errorSources;
    }
    // handle AppError
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: 'App error ',
                message: err.message
            }
        ];
    }
    // handler for error
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: 'error ',
                message: err.message
            }
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        main: err,
        stack: config_1.default.appMood === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
};
exports.default = globalErrorhandler;
