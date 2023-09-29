const { hash } = require("bcrypt");
const prisma = require("../../../../database/prismaClient");
const AppError = require("../../../../utils/AppError");

class CreateUserUseCase {
  async execute({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError("All fields must be filled.");
    }

    // Consulta no banco de dados se o usuário existe
    const userExists = await prisma.users.findFirst({
      where: {
        email
      }
    });

    if (userExists) {
      throw new AppError("email address already registered.");
    }

    const passwordHashed = await hash(password, 10); // Criptografa a senha

    // Cria um usuário no banco de dados e retorna o usuário
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: passwordHashed
      }
    });

    return user;
  }
}

module.exports = CreateUserUseCase;
