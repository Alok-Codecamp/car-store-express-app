"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const errorSources = [{
            path: "duplicate",
            message: err.errmsg
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'duplicateId',
        errorSources
    };
};
exports.default = handleDuplicateError;
