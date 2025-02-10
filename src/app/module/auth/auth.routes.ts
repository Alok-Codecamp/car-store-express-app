import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { authValidations } from "./auth.validation";
import { authController } from "./auth.controller";



const router = Router();


router.post('/login', requestValidator(authValidations.loginValidationSchema), authController.login)
router.post('/refresh-token', authController.refreshToken)



export const authRoutes = router;