const { repositories } = require("../database/database");
const BcryptAuthenticationService = require("../services/BcryptAuthenticationService");
const JwtTokenService = require("../services/JwtTokenService");
//Auth
const RegisterPatientUseCase = require("../../application/use_cases/auth/RegisterUserUseCase");
const LoginUserUseCase = require("../../application/use_cases/auth/LoginUserUseCase");
const LogoutUserUseCase = require("../../application/use_cases/auth/LogoutUserUseCase");
const RefreshTokenUseCase = require("../../application/use_cases/auth/RefreshTokenUseCase");
// Admin
const CreateDoctorUseCase = require("../../application/use_cases/admin/CreateDoctorUseCase");
const UpdateDoctorUseCase = require("../../application/use_cases/admin/UpdateDoctorUseCase");
const DeleteUserUseCase = require("../../application/use_cases/admin/DeleteUserUseCase");
// Patient
const UpdatePatientProfileUseCase = require("../../application/use_cases/patient/UpdatePatientProfileUseCase");
// Shared
const GetUserProfileUseCase = require("../../application/use_cases/shared/GetUserProfileUseCase");
const GetUserListUseCase = require("../../application/use_cases/shared/GetUserListUseCase");
// AuthService
const AuthorizationService = require("../../domain/policies/AuthorizationService");
//Controller
const AuthController = require("../../presentation/controllers/AuthController");
const AdminController = require("../../presentation/controllers/AdminController");
const UserController = require("../../presentation/controllers/UserController");
//Chat
const SendMessageUseCase = require('../../application/use_cases/chat/SendMessageUseCase');
const GetAISuggestionUseCase = require('../../application/use_cases/chat/GetAISuggestionUseCase');
//Service
const authenticationService = new BcryptAuthenticationService();
const tokenService = new JwtTokenService();
const authorizationService = new AuthorizationService();
//Auth
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
// Admin
const createDoctorUseCase = new CreateDoctorUseCase({
  userRepository: repositories.userRepository,
  authenticationService: authenticationService,
  authorizationService: authorizationService
});

const updateDoctorUseCase = new UpdateDoctorUseCase({
  userRepository: repositories.userRepository,
  authorizationService: authorizationService
});

const deleteUserUseCase = new DeleteUserUseCase({
  userRepository: repositories.userRepository,
  authorizationService: authorizationService
});
// Patient
const updatePatientProfileUseCase = new UpdatePatientProfileUseCase({
  userRepository: repositories.userRepository,
  authorizationService: authorizationService
});
//Shared
const getUserProfileUseCase = new GetUserProfileUseCase({
  userRepository: repositories.userRepository,
  authorizationService: authorizationService
});

const getUserListUseCase = new GetUserListUseCase({
  userRepository: repositories.userRepository,
  authorizationService: authorizationService
});
//Chat
const sendMessageUseCase = new SendMessageUseCase({
  appointmentRepository: repositories.appointmentRepository
});
const authController = new AuthController({
  registerPatientUseCase,
  loginUserUseCase,
  refreshTokenUseCase,
  logoutUserUseCase
});
//Admin
const adminController = new AdminController({
  createDoctorUseCase,
  updateDoctorUseCase,
  deleteUserUseCase
});
//User
const userController = new UserController({
  getUserProfileUseCase,
  getUserListUseCase,
  updatePatientProfileUseCase
});

module.exports = {
  authController,
  adminController,
  userController,
  sendMessageUseCase,
  getAISuggestionUseCase
};