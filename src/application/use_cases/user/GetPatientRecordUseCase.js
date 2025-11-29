const PatientRecordResponse = require('../../dtos/user/response/PatientRecordResponse');
const AuthorizationService = require('../../../domain/services/AuthorizationService');
const { NotFoundException } = require('../../../domain/exceptions');

class GetPatientRecordUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(doctorId, patientId) {
    const [doctor, patient] = await Promise.all([
      this.userRepository.findById(doctorId),
      this.userRepository.findById(patientId)
    ]);

    if (!patient || patient.role !== 'patient') throw new NotFoundException('Patient');
    AuthorizationService.requireDoctorCanViewPatient(doctor, patient);

    return new PatientRecordResponse(patient);
  }
}
module.exports = GetPatientRecordUseCase;