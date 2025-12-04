const { repositories } = require("../database/database");
//--SERVICES--//
const BcryptAuthenticationService = require("../services/BcryptAuthenticationService");
const JwtTokenService = require("../services/JwtTokenService");
const AuthorizationService = require("../../domain/policies/AuthorizationService");

const authenticationService = new BcryptAuthenticationService();
const tokenService = new JwtTokenService();
const authorizationService = new AuthorizationService();

const {
    userRepository,
    userSessionRepository,
    appointmentRepository
} = repositories;

//--USE_CASES--//
const RegisterUserUseCase = require("../../application/use_cases/auth/RegisterUserUseCase");
const LoginUserUseCase = require("../../application/use_cases/auth/LoginUserUseCase");
const RefreshTokenUseCase = require("../../application/use_cases/auth/RefreshTokenUseCase");
const LogoutUserUseCase = require("../../application/use_cases/auth/LogoutUserUseCase");
//Auth
const registerPatientUseCase = new RegisterUserUseCase({
    userRepository,
    authenticationService
});

const loginUserUseCase = new LoginUserUseCase({
    userRepository,
    userSessionRepository,
    authenticationService,
    tokenService
});

const refreshTokenUseCase = new RefreshTokenUseCase({
    userRepository,
    userSessionRepository,
    tokenService
});

const logoutUserUseCase = new LogoutUserUseCase({
    userSessionRepository
});
//Admin module
const CreateDoctorUseCase = require("../../application/use_cases/admin/CreateDoctorUseCase");
const UpdateDoctorUseCase = require("../../application/use_cases/admin/UpdateDoctorUseCase");
const DeleteUserUseCase = require("../../application/use_cases/admin/DeleteUserUseCase");

const createDoctorUseCase = new CreateDoctorUseCase({
    userRepository,
    authenticationService,
    authorizationService
});

const updateDoctorUseCase = new UpdateDoctorUseCase({
    userRepository,
    authorizationService
});

const deleteUserUseCase = new DeleteUserUseCase({
    userRepository,
    authorizationService
});
//Doctor & Patient module
const GetDoctorListUseCase = require("../../application/use_cases/shared/GetDoctorListUseCase");
const GetDoctorDetailUseCase = require("../../application/use_cases/shared/GetDoctorDetailUseCase");
const GetPatientListUseCase = require("../../application/use_cases/shared/GetPatientListUseCase");
const UpdatePatientProfileUseCase = require("../../application/use_cases/patient/UpdatePatientProfileUseCase");

const getDoctorListUseCase = new GetDoctorListUseCase({
    userRepository
});
const getDoctorDetailUseCase = new GetDoctorDetailUseCase({
    userRepository
});

const getPatientListUseCase = new GetPatientListUseCase({
    userRepository,
    authorizationService
});

const updatePatientProfileUseCase = new UpdatePatientProfileUseCase({
    userRepository,
    authorizationService
});
//Shared & Chat
const GetUserProfileUseCase = require("../../application/use_cases/shared/GetUserProfileUseCase");
const SendMessageUseCase = require('../../application/use_cases/chat/SendMessageUseCase');

const getUserProfileUseCase = new GetUserProfileUseCase({
    userRepository,
    authorizationService
});

const sendMessageUseCase = new SendMessageUseCase({
    appointmentRepository
});
//--CONTROLLER--//
const AuthController = require("../../presentation/controllers/AuthController");
const AdminController = require("../../presentation/controllers/AdminController");
const DoctorController = require("../../presentation/controllers/DoctorController");
const PatientController = require("../../presentation/controllers/PatientController");
const UserController = require("../../presentation/controllers/UserController");

const authController = new AuthController({
  registerPatientUseCase,
  loginUserUseCase,
  refreshTokenUseCase,
  logoutUserUseCase
});

const adminController = new AdminController({
  createDoctorUseCase,
  updateDoctorUseCase,
  deleteUserUseCase
});

const doctorController = new DoctorController({
  getDoctorListUseCase,
  getDoctorDetailUseCase
});

const patientController = new PatientController({
  getPatientListUseCase,
  updatePatientProfileUseCase
});

const userController = new UserController({
  getUserProfileUseCase
});
//--EXPORT--//
module.exports = {
  authController,
  adminController,
  doctorController,
  patientController,
  userController,
  sendMessageUseCase
};