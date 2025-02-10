"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseSender = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data
    });
};
exports.default = responseSender;
