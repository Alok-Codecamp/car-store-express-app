import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"


export const createToken = (jwtPayload: {}, jwtSecret: string, expiresIn: string) => {
    const options: SignOptions = {
        expiresIn: expiresIn as SignOptions['expiresIn']
    }
    return jwt.sign(jwtPayload, jwtSecret, options)
}

export const verifyToken = (token: string, secret: string) => {

    return jwt.verify(token, secret) as JwtPayload

}