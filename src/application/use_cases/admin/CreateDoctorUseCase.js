const Doctor = require('../../../domain/entities/Doctor');
const FeeStructure = require('../../../domain/value_objects/FeeStructure');
const { Action, Resource } = require('../../../domain/enums');
const { AuthorizationException, BusinessRuleException, NotFoundException } = require('../../../domain/exceptions');
const DoctorResponse = require('../../dtos/doctor/DoctorResponse');

class CreateDoctorUseCase {
    constructor({ userRepository, authenticationService, authorizationService }) {
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.authorizationService = authorizationService;
    }

    async execute(request) {
        const actor = await this.userRepository.findById(request.currentUserId);
        if (!actor) {
            throw new AuthorizationException("User not found");
        }
        const canCreate = this.authorizationService.can(
            actor,
            Action.CREATE,
            Resource.DOCTOR,
            null
        );

        if (!canCreate) {
            throw new AuthorizationException("Only Admin can create new doctors.");
        }

        const existingUser = await this.userRepository.findByEmail(request.email);
        if (existingUser) {
            throw new BusinessRuleException("Email is already in use", "EMAIL_EXISTS");
        }

        const passwordHash = await this.authenticationService.hash(request.password);

        let doctorFee = undefined;
        if (request.fee) {
            doctorFee = new FeeStructure({
                base: request.fee.base,
                increment: request.fee.increment,
                level: request.fee.level,
                final: request.fee.final
            });
        }
        const newDoctor = new Doctor({
            username: request.username,
            email: request.email,
            passwordHash: passwordHash,
            profile: {
                fullName: request.fullName,
                avatarUrl: null
            },
            licenseNumber: request.licenseNumber,
            specCode: request.specCode,
            fee: doctorFee,
            schedules: [],
            unavailableDates: [],
            qualifications: request.qualifications,
            workHistory: request.workHistory
        });
        const savedDoctor = await this.userRepository.save(newDoctor);

        return new DoctorResponse(savedDoctor);
    }
}

module.exports = CreateDoctorUseCase;