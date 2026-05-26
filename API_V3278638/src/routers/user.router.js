import { Router } from "express";
import UserController from "../controller/user.controller.js";
import userScheme from "../schemes/user.schema.js";
import userMiddleware from "../middlewares/user.middleware.js";
import verifyToken from "../middlewares/jwt.middleware.js";

//import { createUser, showUser, showUserId, updateUser, deleteUser, createUserfk, loginUser } from "../controller/user.controller.js";

const router = Router();

router.post("/user", userMiddleware(userScheme.createUser), UserController.createUser);
router.get("/user", verifyToken, UserController.showUser);
router.get("/user/:id", verifyToken, UserController.showUserId);
router.put("/user/:id", verifyToken, userMiddleware(userScheme.updateUser), UserController.updateUser);
router.delete("/user/:id", verifyToken, UserController.deleteUser);
router.post("/user/login", UserController.loginUser);

export default router;