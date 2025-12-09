const { NotFoundException } = require('../../../domain/exceptions');

class UpdateSpecializationUseCase {
    constructor({ specializationRepository }) {
        this.specializationRepository = specializationRepository;
    }

    async execute(code, request) {
        const existingSpec = await this.specializationRepository.findById(code);
        if (!existingSpec) {
            throw new NotFoundException(`Specialization '${code}'`);
        }

        const updatedSpec = existingSpec.update({
            name: request.name,
            category: request.category
        });

        await this.specializationRepository.update(updatedSpec);

        return { message: "Specialization updated successfully" };
    }
}

module.exports = UpdateSpecializationUseCase;