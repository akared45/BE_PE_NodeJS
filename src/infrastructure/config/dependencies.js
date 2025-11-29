const { repositories } = require("../database/database"); 
const BcryptAuthenticationService = require("../services/BcryptAuthenticationService");
const JwtTokenService = require("../services/JwtTokenService");
const RegisterPatientUseCase = require("../../application/use_cases/auth/RegisterUserUseCase"); 
const LoginUserUseCase = require("../../application/use_cases/auth/LoginUserUseCase");
const LogoutUserUseCase = require("../../application/use_cases/auth/LogoutUserUseCase");
const RefreshTokenUseCase = require("../../application/use_cases/auth/RefreshTokenUseCase");
const AuthController = require("../../presentation/controllers/AuthController");

const authenticationService = new BcryptAuthenticationService();
const tokenService = new JwtTokenService();

const registerPatientUseCase = new RegisterPatientUseCase({
  userRepository: repositories.userRepository,
  authenticationService: authenticationService,
});

const loginUserUseCase = new LoginUserUseCase({
  userRepository: repositories.userRepository,
  userSessionRepository: repositories.userSessionRepository,
  authenticationService: authenticationService, 
  tokenService: tokenService,                   
});

const refreshTokenUseCase = new RefreshTokenUseCase({
  userRepository: repositories.userRepository,
  userSessionRepository: repositories.userSessionRepository,
  tokenService: tokenService, 
});

const logoutUserUseCase = new LogoutUserUseCase({
  userSessionRepository: repositories.userSessionRepository,
});


const authController = new AuthController({
    registerPatientUseCase,
    loginUserUseCase,
    refreshTokenUseCase,
    logoutUserUseCase
});

module.exports = {
  authController
};