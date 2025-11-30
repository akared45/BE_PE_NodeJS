const { Action, Resource } = require('../../../domain/enums');
const { AuthorizationException } = require('../../../domain/exceptions');

class GetUserListUseCase {
    constructor({ userRepository, authorizationService }) {
        this.userRepository = userRepository;
        this.authorizationService = authorizationService;
    }
    async execute(request) {
        const { currentUserId, typeToList, options } = request;

        const actor = await this.userRepository.findById(currentUserId);

        if (!actor) {
            throw new AuthorizationException("User not found");
        }
        
        const resourceToCheck = typeToList === 'doctor' ? Resource.DOCTOR : Resource.PATIENT;
        const canViewList = this.authorizationService.can(
            actor,
            Action.READ,
            resourceToCheck,
            null
        );

        if (!canViewList) {
            throw new AuthorizationException("Cannot view list");
        }
        const users = await this.userRepository.findAllByUserType(typeToList, options);

        return users;
    }
}
module.exports = GetUserListUseCase;