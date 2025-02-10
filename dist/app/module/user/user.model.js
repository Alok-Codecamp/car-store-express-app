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
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'role is required!'],
        default: 'user'
    },
    address: {
        type: String,
    }
}, { timestamps: true, versionKey: false });
// hash password 
exports.UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plainPass = this.password;
            this.password = yield bcrypt_1.default.hash(plainPass, Number(config_1.default.bcrypt_salt_rounds));
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// delete password field  
exports.UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});
exports.UserSchema.statics.isUserExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.UserModel.findOne({ email: email });
});
exports.UserSchema.statics.isPasswordMatched = (plainPass, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plainPass, hashedPass);
});
exports.UserModel = (0, mongoose_1.model)('user', exports.UserSchema);
