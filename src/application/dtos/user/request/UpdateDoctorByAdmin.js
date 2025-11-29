class UpdateDoctorByAdmin {
  constructor(data) {
    this.fullName = data.fullName?.trim();
    this.avatarUrl = data.avatarUrl;
    this.bio = data.bio?.trim();
    this.baseFee = data.baseFee !== undefined ? Number(data.baseFee) : undefined;
    this.incrementFee = data.incrementFee !== undefined ? Number(data.incrementFee) : undefined;
    this.schedules = Array.isArray(data.schedules) ? data.schedules : undefined;
    this.unavailableDates = Array.isArray(data.unavailableDates) ? data.unavailableDates : undefined;
    this.isActive = typeof data.isActive === 'boolean' ? data.isActive : undefined;
  }
}
module.exports = UpdateDoctorByAdmin;