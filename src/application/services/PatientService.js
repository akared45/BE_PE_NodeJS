class PatientService {
    constructor({
        getMyProfileUseCase,
        updateMyProfileUseCase,
        getDoctorPublicProfileUseCase,
        listDoctorsUseCase
    }) {
        this.getMyProfile = getMyProfileUseCase;
        this.updateMyProfile = updateMyProfileUseCase;
        this.getDoctorProfile = getDoctorPublicProfileUseCase;
        this.searchDoctors = listDoctorsUseCase;
    }
}

module.exports = PatientService;