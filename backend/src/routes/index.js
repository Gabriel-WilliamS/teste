const { Router } = require("express");

const routes = Router();
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");

routes.use("/users", userRouter);
routes.use("", authRouter);
module.exports = routes;
