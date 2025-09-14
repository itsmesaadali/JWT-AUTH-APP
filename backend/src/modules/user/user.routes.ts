import { Router } from "express";
import { userController } from "./user.module";
import { verifyJWT } from "../../middlewares/auth.middlware";

const router = Router();

// All user routes require authentication
router.use(verifyJWT);

// Get current user data
router.get("/me", userController.getCurrentUser);

// Get user profile by ID
router.get("/:id", userController.getUserProfile);

// Update user profile
router.put("/profile", userController.updateUserProfile);

export default router;