"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cars_routes_1 = require("./app/module/cars/cars.routes");
const app = (0, express_1.default)();
//  middleware setup
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// base URL path for carRoutes module
app.use('/api/v1/cars', cars_routes_1.carRoutes);
app.get('/', (req, res) => {
    res.send('car-store-server is running');
});
exports.default = app;
