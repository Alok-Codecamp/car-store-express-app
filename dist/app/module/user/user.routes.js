"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const requestValidator_1 = __importDefault(require("../../middleware/requestValidator"));
const user_zodValidation_1 = require("./user.zodValidation");
const user_controller_1 = require("./user.controller");
const authValidator_1 = require("../../middleware/authValidator");
const router = (0, express_1.Router)();
router.post('/create-user', (0, requestValidator_1.default)(user_zodValidation_1.userValidation.createUserValidationSchema), user_controller_1.userController.createUser);
router.get('/', (0, authValidator_1.authValidator)('admin'), user_controller_1.userController.getAllUser);
router.get('/:userEmail', (0, authValidator_1.authValidator)('admin', 'user'), user_controller_1.userController.getUserByEmail);
router.put('/:userEmail', (0, authValidator_1.authValidator)('admin', 'user'), (0, requestValidator_1.default)(user_zodValidation_1.userValidation.updateUserValidationSchema), user_controller_1.userController.updateUser);
router.put('/change-password/:userEmail', (0, authValidator_1.authValidator)('admin', 'user'), user_controller_1.userController.changePassword);
exports.userRoutes = router;
