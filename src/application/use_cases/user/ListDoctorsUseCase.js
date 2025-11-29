const DoctorListItemResponse = require('../../dtos/user/response/DoctorListItemResponse');

class ListDoctorsUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(filters = {}, page = 1, limit = 20) {
    const doctors = await this.userRepository.findByRole('doctor', filters, { page, limit });
    return doctors.map(d => new DoctorListItemResponse(d));
  }
}
module.exports = ListDoctorsUseCase;