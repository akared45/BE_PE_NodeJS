const IGetMyProfileUseCase = require('../../interfaces/user/IGetMyProfileUseCase');
const MyProfileResponse = require('../../dtos/user/response/MyProfileResponse');
const { NotFoundException } = require('../../../domain/exceptions');

class GetMyProfileUseCase extends IGetMyProfileUseCase {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User');

    return new MyProfileResponse(user);
  }
}
module.exports = GetMyProfileUseCase;