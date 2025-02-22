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
exports.sendEmail = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config/config"));
const createToken = (jwtPayload, jwtSecret, expiresIn) => {
    const options = {
        expiresIn: expiresIn
    };
    return jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, options);
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
// send reset url to user email
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config_1.default.appMood === 'production' ? true : false, // true for port 465, false for other ports
        auth: {
            user: "alok61.bd@gmail.com",
            pass: "lqcj gris xoom kndd",
        },
    });
    // send mail with defined transport object
    yield transporter.sendMail({
        from: 'alok61.bd@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Motion-Era reset password ✔ ", // Subject line
        text: "Reset your password within 10 minutes!", // plain text body
        html: html, // html body
    });
});
exports.sendEmail = sendEmail;
