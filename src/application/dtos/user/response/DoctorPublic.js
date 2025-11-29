class DoctorPublicResponse {
    constructor(doctor) {
        this.id = doctor.id.toString();
        this.fullName = doctor.profile.fullName;
        this.avatarUrl = doctor.profile.avatarUrl || '/avatars/doctor-default.jpg';
        this.specialization = doctor.specCode;
        this.yearsExperience = doctor.yearsExperience;
        this.rating = Number(doctor.rating).toFixed(1);
        this.reviewCount = doctor.reviewCount;
        this.bio = doctor.bio || 'Doctor has not updated his biography';
        this.consultationFee = doctor.fee?.final?.toNumber() || 0;
        this.availableSchedules = doctor.schedules.map(s => ({
            day: s.day,
            timeRange: `${s.start} - ${s.end}`,
            maxPatients: s.maxPatients
        }));
    }
}
module.exports = DoctorPublicResponse;