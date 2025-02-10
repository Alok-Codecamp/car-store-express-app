"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const requestValidator_1 = __importDefault(require("../../middleware/requestValidator"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/login', (0, requestValidator_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controller_1.authController.login);
router.post('/refresh-token', auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
