const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../../../config/auth");
const prisma = require("../../../database/prismaClient");
const AppError = require("../../../utils/AppError");

class UserAuthenticateUseCase {
  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError("All fields must be filled.");
    }

    // Consulta no banco de dados se o usuário existe
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new AppError("Email or password is Invalid.");
    }

    // Compara a senha digitada com a senha do banco de dados
    const passwordMatch = await compare(password, user.password);

    // Se a senha não for igual, retorna um erro
    if (!passwordMatch) {
      throw new AppError("Email or password is Invalid.");
    }

    // Cria um token de autenticação para o usuário logado e retorna o usuário e o token
    const token = sign(
      { user_id: user.id, email, is_admin: user.is_admin },
      auth.jwt.secretUser,
      {
        expiresIn: auth.jwt.expiresIn
      }
    );

    return { user, token };
  }
}

module.exports = UserAuthenticateUseCase;
