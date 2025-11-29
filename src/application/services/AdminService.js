class AdminService {
    constructor({
        createDoctorUseCase,
        updateDoctorUseCase,
        deactivateUserUseCase,
        getDoctorPrivateProfileUseCase,
        listDoctorsUseCase
    }) {
        this.createDoctor = createDoctorUseCase;
        this.updateDoctor = updateDoctorUseCase;
        this.deactivateUser = deactivateUserUseCase;
        this.getDoctorDetail = getDoctorPrivateProfileUseCase;
        this.listAllDoctors = listDoctorsUseCase;
    }
}

module.exports = AdminService;