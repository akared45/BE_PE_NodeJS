const MongoUserRepository = require("../../infrastructure/database/nosql/repositories/MongoUserRepository");
const MongoUserSessionRepository = require("../../infrastructure/database/nosql/repositories/MongoUserSessionRepository");
const JwtAuthService = require("../../infrastructure/auth/JwtAuthService");
//Import infrastructure
const RegisterUserUseCase = require("../../application/use_cases/RegisterUserUseCase");
const LoginUserUseCase = require("../../application/use_cases/LoginUserUseCase");
const LogoutUserUseCase = require("../../application/use_cases/LogoutUserUseCase");
const RefreshTokenUseCase = require("../../application/use_cases/RefreshTokenUseCase");

//Init implementations
const userRepository = new MongoUserRepository();
const userSessionRepository = new MongoUserSessionRepository();
const authService = new JwtAuthService();

//Dependency injection use case
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  authService
);

const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  authService,
  userSessionRepository
);
const refreshTokenUseCase = new RefreshTokenUseCase(
  userSessionRepository,
  userRepository,
  authService
);
const logoutUserUseCase = new LogoutUserUseCase(userSessionRepository);

module.exports = {
  registerUserUseCase,
  loginUserUseCase,
  refreshTokenUseCase,
  logoutUserUseCase,
};
