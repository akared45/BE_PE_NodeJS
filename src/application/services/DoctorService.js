class DoctorService {
    constructor({
        getMyProfileUseCase,
        updateMyProfileUseCase,
        getPatientRecordUseCase,
        getDoctorPrivateProfileUseCase
    }) {
        this.getMyProfile = getMyProfileUseCase;
        this.updateMyProfile = updateMyProfileUseCase;
        this.getPatientRecord = getPatientRecordUseCase;
        this.getMyDetail = getDoctorPrivateProfileUseCase;
    }
}

module.exports = DoctorService;