import { Router } from "express";
import * as userHandler from "../handlers/user.handler";
import { validateAuthTokens } from "../middlewares/Jwt.token-validator";

const usersRouter = Router();

// api/v1/auth/user/1wd222vv6fac

usersRouter.get("/:id", userHandler.getUserById);
usersRouter.get("/me", validateAuthTokens, userHandler.getUser);
usersRouter.post("/signup", userHandler.registerUser);
usersRouter.post("/login", userHandler.loginUser);

export default usersRouter;
