class DoctorProfileResponse {
    constructor(doctorEntity) {
        this.id = doctorEntity.id.toString();
        this.email = doctorEntity.email;
        this.username = doctorEntity.username;
        this.fullName = doctorEntity.profile.fullName;
        this.avatarUrl = doctorEntity.profile.avatarUrl;
        this.licenseNumber = doctorEntity.licenseNumber;
        this.specCode = doctorEntity.specCode;
        this.fee = doctorEntity.fee;
    }
}
module.exports = DoctorProfileResponse;