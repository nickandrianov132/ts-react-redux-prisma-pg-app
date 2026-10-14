import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.post('/registration', userController.regUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.post('/refresh', userController.refreshUser)

export default router