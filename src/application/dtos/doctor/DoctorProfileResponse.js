class DoctorProfileResponse {
    constructor(doctorEntity) {
        this.id = doctorEntity.id.toString();
        this.email = doctorEntity.email;
        this.username = doctorEntity.username;
        this.fullName = doctorEntity.profile.fullName;
        this.avatarUrl = doctorEntity.profile.avatarUrl;
        this.bio = doctorEntity.bio;
        this.specialization = {
            code: doctorEntity.specCode,
            name: doctorEntity.specializationName
        };
        this.licenseNumber = doctorEntity.licenseNumber;
        this.qualifications = doctorEntity.qualifications;
        this.workHistory = doctorEntity.workHistory;
    }
}
module.exports = DoctorProfileResponse;