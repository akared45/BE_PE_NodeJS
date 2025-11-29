const MongooseUserRepository = require('../infrastructure/database/nosql/repositories/MongooseUserRepository');

const GetMyProfileUseCase = require('./use_cases/user/GetMyProfileUseCase');
const UpdateMyProfileUseCase = require('./use_cases/user/UpdateMyProfileUseCase');
const CreateDoctorUseCase = require('./use_cases/user/CreateDoctorUseCase');
const GetDoctorPublicProfileUseCase = require('./use_cases/user/GetDoctorPublicProfileUseCase');
const GetDoctorPrivateProfileUseCase = require('./use_cases/user/GetDoctorPrivateProfileUseCase');
const ListDoctorsUseCase = require('./use_cases/user/ListDoctorsUseCase');
const GetPatientRecordUseCase = require('./use_cases/user/GetPatientRecordUseCase');
const DeactivateUserUseCase = require('./use_cases/user/DeactivateUserUseCase');

const UserService = require('./services/UserService');
const AdminService = require('./services/AdminService');
const DoctorService = require('./services/DoctorService');
const PatientService = require('./services/PatientService');

const userRepository = new MongooseUserRepository();

const getMyProfileUseCase = new GetMyProfileUseCase(userRepository);
const updateMyProfileUseCase = new UpdateMyProfileUseCase(userRepository);
const createDoctorUseCase = new CreateDoctorUseCase(userRepository);
const getDoctorPublicUseCase = new GetDoctorPublicProfileUseCase(userRepository);
const getDoctorPrivateUseCase = new GetDoctorPrivateProfileUseCase(userRepository);
const listDoctorsUseCase = new ListDoctorsUseCase(userRepository);
const getPatientRecordUseCase = new GetPatientRecordUseCase(userRepository);
const deactivateUserUseCase = new DeactivateUserUseCase(userRepository);

module.exports = {
  userService: new UserService({
    getMyProfileUseCase: getMyProfileUseCase,
    updateMyProfileUseCase,
    getDoctorPublicProfileUseCase: getDoctorPublicUseCase,
    getDoctorPrivateProfileUseCase: getDoctorPrivateUseCase,
    listDoctorsUseCase,
    getPatientRecordUseCase
  }),

  adminService: new AdminService({
    createDoctorUseCase,
    deactivateUserUseCase,
    getDoctorPrivateProfileUseCase: getDoctorPrivateUseCase,
    listDoctorsUseCase
  }),

  doctorService: new DoctorService({
    getMyProfileUseCase,
    updateMyProfileUseCase,
    getPatientRecordUseCase,
    getDoctorPrivateProfileUseCase: getDoctorPrivateUseCase
  }),

  patientService: new PatientService({
    getMyProfileUseCase,
    updateMyProfileUseCase,
    getDoctorPublicProfileUseCase: getDoctorPublicUseCase,
    listDoctorsUseCase
  })
};