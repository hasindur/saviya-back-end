import express from "express";
import { saveUser } from "../controller/userController.js";




const userRouter = express.Router();

userRouter.post("/", saveUser);
// userRouter.get("/users", userController.getAllUsers);
// userRouter.get("/users/:id", userController.getUserById);
// userRouter.put("/users/:id", userController.updateUser);      //edit
// userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;