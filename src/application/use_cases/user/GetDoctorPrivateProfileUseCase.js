const DoctorAdminDetailResponse = require('../../dtos/user/response/DoctorAdminDetailResponse');
const AuthorizationService = require('../../../domain/services/AuthorizationService');
const { NotFoundException } = require('../../../domain/exceptions');

class GetDoctorPrivateProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(requesterId, doctorId) {
    const [requester, doctor] = await Promise.all([
      this.userRepository.findById(requesterId),
      this.userRepository.findById(doctorId)
    ]);

    if (!doctor || doctor.role !== 'doctor') throw new NotFoundException('Doctor');

    const isOwner = requesterId === doctorId;
    const isAdmin = requester?.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new AuthorizationException('Bạn không có quyền xem thông tin chi tiết này');
    }

    return new DoctorAdminDetailResponse(doctor);
  }
}
module.exports = GetDoctorPrivateProfileUseCase;