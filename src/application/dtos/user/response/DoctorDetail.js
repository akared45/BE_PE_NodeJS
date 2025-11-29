class DoctorDetailResponse {
  constructor(doctor) {
    Object.assign(this, new DoctorPublicResponse(doctor));
    this.username = doctor.username;
    this.email = doctor.email;
    this.isActive = doctor.isActive;
    this.licenseNumber = doctor.licenseNumber;
    this.totalAppointments = doctor.totalAppointments || 0;
    this.joinDate = doctor.createdAt.toISOString();
  }
}
module.exports = DoctorDetailResponse;