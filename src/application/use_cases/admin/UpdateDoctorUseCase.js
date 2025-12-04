const { Action, Resource } = require('../../../domain/enums/Permission');
const { AuthorizationException, NotFoundException } = require('../../../domain/exceptions');

class UpdateDoctorUseCase {
    constructor({ userRepository, authorizationService }) {
        this.userRepository = userRepository;
        this.authorizationService = authorizationService;
    }

    async execute(request) {
        const { currentUserId, targetDoctorId, fullName, licenseNumber, specCode, fee, isActive } = request;

        const actor = await this.userRepository.findById(currentUserId);
        if (!actor) {
            throw new AuthorizationException("User performing update not found");
        }

        const targetDoctor = await this.userRepository.findById(targetDoctorId);
        if (!targetDoctor || !targetDoctor.isDoctor()) {
            throw new NotFoundException("Target doctor does not exist");
        }

        const canUpdate = this.authorizationService.can(
            actor,
            Action.UPDATE,
            Resource.DOCTOR,
            targetDoctor
        );

        if (!canUpdate) {
            throw new AuthorizationException("Permission denied");
        }

        if (fullName !== undefined) {
            targetDoctor.profile.fullName = fullName;
        }

        if (licenseNumber !== undefined) {
            targetDoctor.licenseNumber = licenseNumber;
        }

        if (specCode !== undefined) {
            targetDoctor.specCode = specCode;
        }

        if (isActive !== undefined) {
            targetDoctor.isActive = isActive;
        }
        if (request.qualifications) targetDoctor.qualifications = request.qualifications;
        if (request.workHistory) targetDoctor.workHistory = request.workHistory;

        await this.userRepository.save(targetDoctor);

        return {
            message: "Doctor updated successfully",
            id: targetDoctor.id.toString()
        };
    }
}
module.exports = UpdateDoctorUseCase;