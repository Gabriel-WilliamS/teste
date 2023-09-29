const { Router } = require("express");
const UserAuthenticateController = require("../modules/accont/userAuthenticate/UserAuthenticateController");
const CreateUserController = require("../modules/users/useCase/CreateUser/CreateUserController");

const authRouter = Router();

const userAuthenticateController = new UserAuthenticateController();
const createUserController = new CreateUserController();

authRouter.use("/login", userAuthenticateController.handle);
authRouter.use("/user-register", createUserController.handle);

module.exports = authRouter;
