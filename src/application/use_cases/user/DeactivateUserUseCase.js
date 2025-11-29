const AuthorizationService = require('../../../domain/services/AuthorizationService');
const { SuccessResponse } = require('../../dtos/user/response/SuccessResponse');

class DeactivateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(adminUser, targetUserId, dto) {
    AuthorizationService.requireAdmin(adminUser);

    const user = await this.userRepository.findById(targetUserId);
    if (!user) throw new NotFoundException('User');

    user.isActive = false;
    user.deactivatedAt = new Date();
    user.deactivationReason = dto.reason;

    await this.userRepository.save(user);
    return new SuccessResponse(null, 'Lock account access');
  }
}
module.exports = DeactivateUserUseCase;