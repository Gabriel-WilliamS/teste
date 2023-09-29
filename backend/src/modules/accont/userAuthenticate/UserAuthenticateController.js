const UserAuthenticateUseCase = require("./UserAuthenticateUseCase");

class UserAuthenticateController {
  async handle(request, response) {
    const { email, password } = request.body;

    const userAuthenticateUseCase = new UserAuthenticateUseCase();

    const userAuth = await userAuthenticateUseCase.execute({ email, password });

    response.json(userAuth);
  }
}

module.exports = UserAuthenticateController;
