import { Router } from "express";
import * as userHandler from "../handlers/user.handler";

const usersRouter = Router();

// api/v1/auth/user/1wd222vv6fac

usersRouter.get("/:id", userHandler.getUser);
usersRouter.post("/new", userHandler.createUser);

export default usersRouter;
