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
    appointmentRepository,
    specializationRepository
} = repositories;

//--USE_CASES--//
//Auth
const RegisterUserUseCase = require("../../application/use_cases/auth/RegisterUserUseCase");
const LoginUserUseCase = require("../../application/use_cases/auth/LoginUserUseCase");
const RefreshTokenUseCase = require("../../application/use_cases/auth/RefreshTokenUseCase");
const LogoutUserUseCase = require("../../application/use_cases/auth/LogoutUserUseCase");

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
    userSessionRepository,
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
//Booking
const BookAppointmentUseCase = require("../../application/use_cases/appointment/BookAppointmentUseCase");
const bookAppointmentUseCase = new BookAppointmentUseCase({
    appointmentRepository,
    userRepository
});
//Spec
const GetAllSpecializationsUseCase = require("../../application/use_cases/shared/GetAllSpecializationsUseCase");
const getAllSpecializationsUseCase = new GetAllSpecializationsUseCase({
  specializationRepository
});
//Slot
const GetAvailableSlotsUseCase = require("../../application/use_cases/shared/GetAvailableSlotsUseCase");
const getAvailableSlotsUseCase = new GetAvailableSlotsUseCase({
  userRepository,
  appointmentRepository
});
//--CONTROLLER--//
const AuthController = require("../../presentation/controllers/AuthController");
const AdminController = require("../../presentation/controllers/AdminController");
const DoctorController = require("../../presentation/controllers/DoctorController");
const PatientController = require("../../presentation/controllers/PatientController");
const UserController = require("../../presentation/controllers/UserController");
const AppointmentController = require("../../presentation/controllers/AppointmentController");
const SpecializationController = require("../../presentation/controllers/SpecializationController");

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
  getDoctorDetailUseCase,
  getAvailableSlotsUseCase
});

const patientController = new PatientController({
  getPatientListUseCase,
  updatePatientProfileUseCase
});

const userController = new UserController({
  getUserProfileUseCase
});

const appointmentController = new AppointmentController({
  bookAppointmentUseCase
});

const specializationController = new SpecializationController({
  getAllSpecializationsUseCase
});

const OpenAIService = require('../services/OpenAIService');
const SuggestSpecialtyUseCase = require('../../application/use_cases/ai/SuggestSpecialtyUseCase');
const AIController = require('../../presentation/controllers/AIController');
const aiService = new OpenAIService();

const suggestSpecialtyUseCase = new SuggestSpecialtyUseCase({
  aiService: aiService
});
const aiController = new AIController({
  suggestSpecialtyUseCase: suggestSpecialtyUseCase
});

//Image
const LocalDiskStorageService = require('../storage/LocalDiskStorageService');
const UploadController = require('../../presentation/controllers/UploadController');
const storageService = new LocalDiskStorageService();
const uploadController = new UploadController({ storageService });



//--EXPORT--//
module.exports = {
  authController,
  adminController,
  doctorController,
  patientController,
  userController,
  appointmentController,
  specializationController,
  aiController,
  sendMessageUseCase,
  uploadController
};