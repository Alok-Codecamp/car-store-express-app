import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { userValidation } from "./user.zodValidation";
import { userController } from "./user.controller";
import { authValidator } from "../../middleware/authValidator";




const router = Router();

router.post('/create-user', requestValidator(userValidation.createUserValidationSchema), userController.createUser);
router.get('/', authValidator('admin'), userController.getAllUser);
router.get('/:userEmail', authValidator('admin', 'user'), userController.getUserByEmail);
router.put('/:userEmail', authValidator('admin', 'user'), requestValidator(userValidation.updateUserValidationSchema), userController.updateUser);


router.put('/change-password/:userEmail', authValidator('admin', 'user'), userController.changePassword);



export const userRoutes = router;