class UpdatePatientRequest {
    constructor(data) {
        this.currentUserId = data.currentUserId;
        this.targetPatientId = data.targetPatientId;
        this.email = data.email;
        this.contacts = data.contacts;
        this.medicalConditions = data.medicalConditions;
        this.allergies = data.allergies;
        this.avatarUrl = data.avatarUrl;
    }
}
module.exports = UpdatePatientRequest;