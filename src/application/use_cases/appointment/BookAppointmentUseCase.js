const Appointment = require('../../../domain/entities/Appointment');
const { BusinessRuleException } = require('../../../domain/exceptions');

class BookAppointmentUseCase {
    constructor({ appointmentRepository, userRepository }) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    async execute(request) {
        const { patientId, doctorId, appointmentDate, symptoms, type } = request;
        const doctor = await this.userRepository.findById(doctorId);
        if (!doctor || doctor.userType !== 'doctor') {
            throw new BusinessRuleException("Doctor not found");
        }
        const startTime = new Date(appointmentDate);
        const endTime = new Date(startTime.getTime() + 30 * 60000);
        const isOverlapping = await this.appointmentRepository.findOverlapping(doctorId, startTime, endTime);
        if (isOverlapping) {
            throw new BusinessRuleException("Doctor is busy at this time");
        }
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            appointmentDate,
            symptoms,
            type,
            durationMinutes: 30
        });
        const savedAppointment = await this.appointmentRepository.save(newAppointment);
        return savedAppointment;
    }
}

module.exports = BookAppointmentUseCase;