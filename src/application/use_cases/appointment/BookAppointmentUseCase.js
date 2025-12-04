const Appointment = require('../../../domain/entities/Appointment');
const Money = require('../../../domain/value_objects/Money');
const { AppointmentStatus, AppointmentType } = require('../../../domain/enums');
const { AuthorizationException, BusinessRuleException, NotFoundException } = require('../../../domain/exceptions');

class BookAppointmentUseCase {
    static FIXED_PRICE = 50000;
    static DURATION_MINUTES = 30;

    constructor({ appointmentRepository, userRepository }) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    async execute(request) {
        const { patientId, doctorId, appointmentDate, symptoms, notes } = request;
        const startTime = new Date(appointmentDate);
        const endTime = new Date(startTime.getTime() + BookAppointmentUseCase.DURATION_MINUTES * 60000);

        if (startTime < new Date()) {
            throw new BusinessRuleException("Cannot book appointment in the past");
        }

        const doctor = await this.userRepository.findById(doctorId);
        if (!doctor || !doctor.isDoctor()) {
            throw new NotFoundException("Doctor not found");
        }

        const patient = await this.userRepository.findById(patientId);
        if (!patient) throw new AuthorizationException("User not found");

        if (!doctor.isWorkingAt(startTime, BookAppointmentUseCase.DURATION_MINUTES)) {
            throw new BusinessRuleException("Doctor is not working at this time (Check schedule)");
        }

        const overlapping = await this.appointmentRepository.findOverlapping(doctorId, startTime, endTime);
        if (overlapping.length > 0) {
            throw new BusinessRuleException("The selected time slot is already booked by another patient");
        }

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            type: AppointmentType.CHAT,
            appointmentDate: startTime,
            durationMinutes: BookAppointmentUseCase.DURATION_MINUTES,
            calculatedFee: new Money(BookAppointmentUseCase.FIXED_PRICE),
            status: AppointmentStatus.PENDING,
            symptoms: symptoms,
            doctorNotes: notes || ''
        });

        await this.appointmentRepository.save(newAppointment);

        return {
            message: "Appointment booked successfully",
            appointmentId: newAppointment.id.toString(),
            price: BookAppointmentUseCase.FIXED_PRICE,
            time: startTime.toISOString()
        };
    }
}

module.exports = BookAppointmentUseCase;