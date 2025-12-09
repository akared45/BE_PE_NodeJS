const { repositories } = require("../database/database");

//--SERVICES--//
const BcryptAuthenticationService = require("../services/BcryptAuthenticationService");
const JwtTokenService = require("../services/JwtTokenService");
const AuthorizationService = require("../../domain/policies/AuthorizationService");
const OpenAIService = require('../services/OpenAIService'); // AI Service
const LocalDiskStorageService = require('../storage/LocalDiskStorageService'); // Storage Service

const authenticationService = new BcryptAuthenticationService();
const tokenService = new JwtTokenService();
const authorizationService = new AuthorizationService();
const aiService = new OpenAIService();
const storageService = new LocalDiskStorageService();

// Destructure Repositories
const {
    userRepository,
    userSessionRepository,
    appointmentRepository,
    specializationRepository
} = repositories;

//--USE_CASES--//

// 1. Auth
const RegisterUserUseCase = require("../../application/use_cases/auth/RegisterUserUseCase"); // Ensure filename is correct (RegisterUserUseCase vs RegisterPatientUseCase)
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

// 2. Admin Module
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

// 3. Specialization Module (Admin & Shared)
const GetAllSpecializationsUseCase = require("../../application/use_cases/shared/GetAllSpecializationsUseCase");
const CreateSpecializationUseCase = require("../../application/use_cases/admin/CreateSpecializationUseCase");
const UpdateSpecializationUseCase = require("../../application/use_cases/admin/UpdateSpecializationUseCase");
const DeleteSpecializationUseCase = require("../../application/use_cases/admin/DeleteSpecializationUseCase");
const GetSpecializationDetailUseCase = require("../../application/use_cases/shared/GetSpecializationDetailUseCase");

const getAllSpecializationsUseCase = new GetAllSpecializationsUseCase({
    specializationRepository
});

const createSpecializationUseCase = new CreateSpecializationUseCase({
    specializationRepository
});

const updateSpecializationUseCase = new UpdateSpecializationUseCase({
    specializationRepository
});

const deleteSpecializationUseCase = new DeleteSpecializationUseCase({
    specializationRepository
});

const getSpecializationDetailUseCase = new GetSpecializationDetailUseCase({
    specializationRepository
});

// 4. Doctor & Patient Module
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

// 5. Shared & Chat
const GetUserProfileUseCase = require("../../application/use_cases/shared/GetUserProfileUseCase");
const SendMessageUseCase = require('../../application/use_cases/chat/SendMessageUseCase');

const getUserProfileUseCase = new GetUserProfileUseCase({
    userRepository,
    authorizationService
});

const sendMessageUseCase = new SendMessageUseCase({
    appointmentRepository
});

// 6. Booking & Slots
const BookAppointmentUseCase = require("../../application/use_cases/appointment/BookAppointmentUseCase");
const GetAvailableSlotsUseCase = require("../../application/use_cases/shared/GetAvailableSlotsUseCase");

const bookAppointmentUseCase = new BookAppointmentUseCase({
    appointmentRepository,
    userRepository
});

const getAvailableSlotsUseCase = new GetAvailableSlotsUseCase({
    userRepository,
    appointmentRepository
});

// 7. AI Module
const SuggestSpecialtyUseCase = require('../../application/use_cases/ai/SuggestSpecialtyUseCase');

const suggestSpecialtyUseCase = new SuggestSpecialtyUseCase({
    aiService
});

//--CONTROLLERS--//
const AuthController = require("../../presentation/controllers/AuthController");
const AdminController = require("../../presentation/controllers/AdminController");
const DoctorController = require("../../presentation/controllers/DoctorController");
const PatientController = require("../../presentation/controllers/PatientController");
const UserController = require("../../presentation/controllers/UserController");
const AppointmentController = require("../../presentation/controllers/AppointmentController");
const SpecializationController = require("../../presentation/controllers/SpecializationController");
const AIController = require('../../presentation/controllers/AIController');
const UploadController = require('../../presentation/controllers/UploadController');

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
    getAllSpecializationsUseCase,
    createSpecializationUseCase,
    updateSpecializationUseCase,
    deleteSpecializationUseCase,
    getSpecializationDetailUseCase
});

const aiController = new AIController({
    suggestSpecialtyUseCase
});

const uploadController = new UploadController({
    storageService
});

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
    uploadController,
    sendMessageUseCase 
};