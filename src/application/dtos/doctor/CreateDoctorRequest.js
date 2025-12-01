class CreateDoctorRequest {
    constructor(data) {
        this.currentUserId = data.currentUserId;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.fullName = data.fullName;
        this.licenseNumber = data.licenseNumber;
        this.specCode = data.specCode;
        this.fee = data.fee;
    }
}
module.exports = CreateDoctorRequest;