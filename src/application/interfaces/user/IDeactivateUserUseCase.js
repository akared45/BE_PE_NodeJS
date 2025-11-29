class IDeactivateUserUseCase {
  async execute(adminUser, targetUserId, dto) {
    throw new Error('Method execute() must be implemented');
  }
}
module.exports = IDeactivateUserUseCase;