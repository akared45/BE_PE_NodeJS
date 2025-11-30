class PatientProfileResponse {
    constructor(patientEntity) {
        this.id = patientEntity.id.toString();
        this.email = patientEntity.email;
        this.username = patientEntity.username;
        this.fullName = patientEntity.profile.fullName;
        this.dateOfBirth = patientEntity.profile.dateOfBirth;
        this.gender = patientEntity.profile.gender;
        this.avatarUrl = patientEntity.profile.avatarUrl;
        this.contacts = patientEntity.contacts;
        this.medicalConditions = patientEntity.medicalConditions;
        this.allergies = patientEntity.allergies;
    }
}

module.exports = PatientProfileResponse;