const { Router } = require("express");

const CreateUserController = require("../modules/users/useCase/CreateUser/CreateUserController");

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle);

module.exports = userRouter;
