"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//  middleware setup
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'https://motion-era.vercel.app', credentials: true }));
app.use((0, cookie_parser_1.default)());
// base URL path for carRoutes module
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('car-store-server is running');
});
// use global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
