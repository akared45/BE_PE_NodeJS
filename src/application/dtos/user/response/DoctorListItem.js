class DoctorListItem {
    constructor(doctor) {
        this.id = doctor.id.toString();
        this.fullName = doctor.profile.fullName;
        this.avatarUrl = doctor.profile.avatarUrl;
        this.specialization = doctor.specCode;
        this.yearsExperience = doctor.yearsExperience;
        this.rating = Number(doctor.rating).toFixed(1);
        this.reviewCount = doctor.reviewCount;
        this.fee = doctor.fee?.final?.toNumber() || 0;
    }
}
module.exports = DoctorListItem;