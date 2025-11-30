class DeletePatientRequest {
    constructor({ currentUserId, targetPatientId }) {
        this.currentUserId = currentUserId;
        this.targetPatientId = targetPatientId;
    }
}

module.exports = DeletePatientRequest;