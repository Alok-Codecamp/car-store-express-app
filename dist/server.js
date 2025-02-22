"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config/config"));
// define the main function for run this application server
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // connect mongodb atlas using moonges connect method.
            yield mongoose_1.default.connect(config_1.default.db_uri);
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`car_store app server running ${config_1.default.appMood} mood on port: ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
process.on('unhandledRejection', () => {
    console.log(`unhandledRejection is detected,🤢 server is shutting down`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});
process.on('uncaughtException', () => {
    console.log(`uncaughtException is detected,🤢 server is shutting down`);
    process.exit();
});
