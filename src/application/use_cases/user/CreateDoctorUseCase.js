const ICreateDoctorUseCase = require('../../interfaces/user/ICreateDoctorUseCase');
const { User } = require('../../../domain/entities/User');
const AuthorizationService = require('../../../domain/services/AuthorizationService');
const { ValidationException } = require('../../../domain/exceptions');
const bcrypt = require('bcrypt');

class CreateDoctorUseCase extends ICreateDoctorUseCase {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(adminUser, dto) {
    AuthorizationService.requireAdmin(adminUser);

    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new ValidationException('Email already in use');

    const doctor = new User({
      username: dto.username,
      email: dto.email,
      passwordHash: bcrypt.hashSync(dto.password, 10),
      role: 'doctor',
      profile: {
        fullName: dto.fullName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
        gender: dto.gender,
        avatarUrl: dto.avatarUrl
      },
      licenseNumber: dto.licenseNumber,
      specialization: dto.specialization,
      experienceYears: dto.experienceYears,
      bio: dto.bio,
      fee: { base: dto.baseFee, increment: dto.incrementFee },
      schedules: dto.schedules,
      unavailableDates: dto.unavailableDates
    });

    await this.userRepository.save(doctor);
    return { success: true, doctorId: doctor.id.toString() };
  }
}
module.exports = CreateDoctorUseCase;