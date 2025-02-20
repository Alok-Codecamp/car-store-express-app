import { AnyZodObject } from "zod";
import asyncWrapper from "../utils/asyncWraper";



const requestValidator = (zodSchema: AnyZodObject) => {
    return asyncWrapper(async (req, res, next) => {
        await zodSchema.parseAsync(req.body)

        next()
    }
    )
}


export default requestValidator;