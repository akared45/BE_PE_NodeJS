const { Action, Resource } = require('../../../domain/enums');
const { AuthorizationException, NotFoundException } = require('../../../domain/exceptions');

class UpdatePatientProfileUseCase {
    constructor({ userRepository, authorizationService }) {
        this.userRepository = userRepository;
        this.authorizationService = authorizationService;
    }

    async execute(request) {
        const { currentUserId, targetPatientId, contacts, medicalConditions, allergies } = request;

        const actor = await this.userRepository.findById(currentUserId);
        const targetPatient = await this.userRepository.findById(targetPatientId);

        if (!targetPatient || !targetPatient.isPatient()) throw new NotFoundException("Patient not found");

        const canUpdate = this.authorizationService.can(
            actor,
            Action.UPDATE,
            Resource.PATIENT,
            targetPatient
        );

        if (!canUpdate) {
            throw new AuthorizationException("You cannot update this profile");
        }

        if (contacts !== undefined) {
            if (!Array.isArray(contacts)) {
                throw new Error("Contacts must be provided as an array");
            }
            targetPatient.contacts = contacts;
        }

        if (medicalConditions !== undefined) {
            if (!Array.isArray(medicalConditions)) {
                throw new Error("Medical conditions must be an array");
            }
            targetPatient.medicalConditions = medicalConditions;
        }

        if (allergies !== undefined) {
            if (!Array.isArray(allergies)) {
                throw new Error("Allergies must be an array");
            }
            targetPatient.allergies = allergies;
        }


        await this.userRepository.save(targetPatient);

        return { message: "Profile updated successfully" };
    }
}
module.exports = UpdatePatientProfileUseCase;