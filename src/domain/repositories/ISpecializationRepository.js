const { NotImplementedException } = require('../exceptions');

class ISpecializationRepository {
  async findAll() {
    throw new NotImplementedException('ISpecializationRepository.findAll');
  }
}

module.exports = ISpecializationRepository;