class UserService {
    constructor({
        getMyProfileUseCase,
        updateMyProfileUseCase,
        getDoctorPublicProfileUseCase,
        getDoctorPrivateProfileUseCase,
        listDoctorsUseCase,
        getPatientRecordUseCase
    }) {
        this.getMyProfile = getMyProfileUseCase;
        this.updateMyProfile = updateMyProfileUseCase;
        this.getDoctorPublic = getDoctorPublicProfileUseCase;
        this.getDoctorPrivate = getDoctorPrivateProfileUseCase;
        this.listDoctors = listDoctorsUseCase;
        this.getPatientRecord = getPatientRecordUseCase;
    }
}

module.exports = UserService;