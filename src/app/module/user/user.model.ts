import { CallbackError, model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import { role } from "./user.constant";
import bcrypt from 'bcrypt'
import config from "../../config/config";
export const UserSchema = new Schema<IUser, IUserModel>({
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
        enum: role,
        required: [true, 'role is required!'],
        default: 'user'
    },
    address: {
        type: String,
    }
}, { timestamps: true, versionKey: false })



// hash password 
UserSchema.pre('save', async function (next) {

    try {
        const plainPass = this.password;
        this.password = await bcrypt.hash(plainPass, Number(config.bcrypt_salt_rounds));
        next();
    } catch (err: any) {
        next(err)
    }
})

// delete password field  
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        return ret
    }
})


UserSchema.statics.isUserExistsByEmail = async (email: string) => {
    return await UserModel.findOne({ email: email })
}
UserSchema.statics.isPasswordMatched = async (plainPass: string, hashedPass) => {
    return await bcrypt.compare(plainPass, hashedPass);
}

export const UserModel = model<IUser, IUserModel>('user', UserSchema);