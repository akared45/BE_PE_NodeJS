const { Action, Resource } = require('../../../domain/enums/Permission');
const { AuthorizationException, NotFoundException } = require('../../../domain/exceptions');

class DeleteUserUseCase {
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

        const canDelete = this.authorizationService.can(
            actor,
            Action.DELETE,
            resource,
            targetUser
        );
        
        if (!canDelete) {
            throw new AuthorizationException("Permission denied");
        }

        await this.userRepository.delete(targetUserId);
        return {
            message: "User deleted successfully"
        };
    }
}
module.exports = DeleteUserUseCase;