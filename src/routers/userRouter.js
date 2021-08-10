import express from "express";
import { edit, remove, see, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", see);
userRouter.get("/:id(\\d+)/edit", edit);
userRouter.get("/:id(\\d+)/logout", logout);
userRouter.get("/:id(\\d+)/remove", remove);

export default userRouter;
