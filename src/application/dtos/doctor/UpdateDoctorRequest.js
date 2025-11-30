class UpdateDoctorRequest {
    constructor(data) {
        this.currentUserId = data.currentUserId;
        this.targetDoctorId = data.targetDoctorId;
        this.bio = data.bio;
        this.avatarUrl = data.avatarUrl;
        this.fee = data.fee ? {
            base: Number(data.fee.base),
            increment: Number(data.fee.increment),
            level: data.fee.level,
            final: Number(data.fee.final)
        } : undefined;
        this.isActive = data.isActive;
    }
}

module.exports = UpdateDoctorRequest;