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
// Doctor
const GetDoctorListUseCase = require("../../application/use_cases/shared/GetDoctorListUseCase");
const GetPatientListUseCase = require("../../application/use_cases/shared/GetPatientListUseCase");
const GetUserProfileUseCase = require("../../application/use_cases/shared/GetUserProfileUseCase");
const GetDoctorDetailUseCase = require("../../application/use_cases/shared/GetDoctorDetailUseCase");
// Patient
const UpdatePatientProfileUseCase = require("../../application/use_cases/patient/UpdatePatientProfileUseCase");

// Shared
const DoctorController = require("../../presentation/controllers/DoctorController");
const PatientController = require("../../presentation/controllers/PatientController");

// AuthService
const AuthorizationService = require("../../domain/policies/AuthorizationService");
//Controller
const AuthController = require("../../presentation/controllers/AuthController");
const AdminController = require("../../presentation/controllers/AdminController");
const UserController = require("../../presentation/controllers/UserController");
//Chat
const SendMessageUseCase = require('../../application/use_cases/chat/SendMessageUseCase');
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
const getDoctorListUseCase = new GetDoctorListUseCase({
  userRepository: repositories.userRepository
});

const getDoctorDetailUseCase = new GetDoctorDetailUseCase({
  userRepository: repositories.userRepository
});

const getPatientListUseCase = new GetPatientListUseCase({
  userRepository: repositories.userRepository,
  authorizationService: authorizationService
});
const getUserProfileUseCase = new GetUserProfileUseCase({
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
//Doctor
const doctorController = new DoctorController({
  getDoctorListUseCase,
  getDoctorDetailUseCase
});

const patientController = new PatientController({
  getPatientListUseCase,
  updatePatientProfileUseCase
});
//User
const userController = new UserController({
  getUserProfileUseCase,
});

module.exports = {
  authController,
  adminController,
  doctorController,
  patientController,
  userController,
  sendMessageUseCase
};