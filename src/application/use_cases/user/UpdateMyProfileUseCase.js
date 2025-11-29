const IUpdateMyProfileUseCase = require('../../interfaces/user/IUpdateMyProfileUseCase');
const AuthorizationService = require('../../../domain/services/AuthorizationService');
const { SuccessResponse } = require('../../dtos/user/response/SuccessResponse');

class UpdateMyProfileUseCase extends IUpdateMyProfileUseCase {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(currentUserId, dto) {
    const user = await this.userRepository.findById(currentUserId);
    AuthorizationService.requireCanEditOwnProfile({ id: currentUserId, isAdmin: () => user.role === 'admin' }, user);
    if (dto.fullName) user.profile.fullName = dto.fullName;
    if (dto.dateOfBirth) user.profile.dateOfBirth = new Date(dto.dateOfBirth);
    if (dto.gender) user.profile.gender = dto.gender;
    if (dto.avatarUrl) user.profile.avatarUrl = dto.avatarUrl;
    if (dto.contacts) user.contacts = dto.contacts;

    await this.userRepository.save(user);
    return new SuccessResponse(null, 'Profile update successful');
  }
}
module.exports = UpdateMyProfileUseCase;