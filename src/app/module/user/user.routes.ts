import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { userValidation } from "./user.zodValidation";
import { userController } from "./user.controller";
import { authValidator } from "../../middleware/authValidator";




const router = Router();

router.post('/create-user', requestValidator(userValidation.createUserValidationSchema), userController.createUser)
router.get('/', authValidator('Admin'), userController.getAllUser)


export const userRoutes = router;