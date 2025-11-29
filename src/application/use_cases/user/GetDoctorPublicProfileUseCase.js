const DoctorPublicResponse = require('../../dtos/user/response/DoctorPublicResponse');
const { NotFoundException } = require('../../../domain/exceptions');

class GetDoctorPublicProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(doctorId) {
    const doctor = await this.userRepository.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') throw new NotFoundException('Doctor');

    return new DoctorPublicResponse(doctor);
  }
}
module.exports = GetDoctorPublicProfileUseCase;