import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import nodemailer from 'nodemailer'
import config from "../../config/config"

export const createToken = (jwtPayload: {}, jwtSecret: string, expiresIn: string) => {
    const options: SignOptions = {
        expiresIn: expiresIn as SignOptions['expiresIn']
    }
    return jwt.sign(jwtPayload, jwtSecret, options)
}

export const verifyToken = (token: string, secret: string) => {

    return jwt.verify(token, secret) as JwtPayload

}


// send reset url to user email

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.appMood === 'production' ? true : false, // true for port 465, false for other ports
        auth: {
            user: "alok61.bd@gmail.com",
            pass: "lqcj gris xoom kndd",
        },
    });


    // send mail with defined transport object
    await transporter.sendMail({
        from: 'alok61.bd@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Motion-Era reset password ✔ ", // Subject line
        text: "Reset your password within 10 minutes!", // plain text body
        html: html, // html body
    });

}
