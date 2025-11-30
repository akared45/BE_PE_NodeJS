const { Action, Resource } = require('../../../domain/enums');
const { AuthorizationException, NotFoundException } = require('../../../domain/exceptions');

class GetUserProfileUseCase {
    constructor({ userRepository, authorizationService }) {
        this.userRepository = userRepository;
        this.authorizationService = authorizationService;
    }

    async execute(request) {
        const { currentUserId, targetUserId } = request;

        const actor = await this.userRepository.findById(currentUserId);
        const targetUser = await this.userRepository.findById(targetUserId);

        if (!targetUser) {
            throw new NotFoundException("User not found");
        }

        const resource = targetUser.isDoctor() ? Resource.DOCTOR : Resource.PATIENT;
        const canView = this.authorizationService.can(
            actor,
            Action.READ,
            resource,
            targetUser
        );

        if (!canView) {
            throw new AuthorizationException("Permission denied");
        }

        return targetUser;
    }
}
module.exports = GetUserProfileUseCase;