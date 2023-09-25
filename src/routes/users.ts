import { Router } from "express";
import { login, register, updateUser } from "../controllers/users";
import authorizationMiddleware from "../middleware/authorization";

const usersRoutes: Router = Router();

usersRoutes.route("/register").post(register);
usersRoutes.route("/login").post(login);
usersRoutes.route("/updateUser").patch(authorizationMiddleware, updateUser);

export default usersRoutes;
