class CreateDoctorSuccessResponse {
    constructor(doctorId) {
        this.success = true;
        this.message = 'Creating successful doctors';
        this.doctorId = doctorId;
        this.defaultPassword = '123456';
    }
}
module.exports = CreateDoctorSuccessResponse;