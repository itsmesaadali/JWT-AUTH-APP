import { Router } from "express";
import { authController } from "./auth.module";
import { verifyJWT } from "../../middlewares/auth.middlware";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/google", authController.googleAuth); // Add Google auth endpoint
authRoutes.post("/password/forgot", authController.forgotPassword);
authRoutes.post("/logout", verifyJWT, authController.logout);


export default authRoutes;
