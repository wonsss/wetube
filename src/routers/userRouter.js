import express from "express";
import {
  edit,
  remove,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get("/:id", see);
// userRouter.get("/:id(\\d+)/edit", edit);
// userRouter.get("/:id(\\d+)/logout", logout);
// userRouter.get("/:id(\\d+)/remove", remove);
// userRouter.get("/github/start")

userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.get(":id", see);

export default userRouter;
