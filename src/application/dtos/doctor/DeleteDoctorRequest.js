class DeleteDoctorRequest {
    constructor({ currentUserId, targetDoctorId }) {
        this.currentUserId = currentUserId;
        this.targetDoctorId = targetDoctorId;
    }
}

module.exports = DeleteDoctorRequest;