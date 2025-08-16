import express from "express";
import { loginUser, saveUser } from "../controller/userController.js";




const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", loginUser); // Assuming loginUser is the same as saveUser for now
//userRouter.get("/users", userController.getAllUsers);
// userRouter.get("/users/:id", userController.getUserById);
// userRouter.put("/users/:id", userController.updateUser);      //edit
// userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;