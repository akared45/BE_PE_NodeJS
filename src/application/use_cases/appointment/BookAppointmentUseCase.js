const Appointment = require('../../../domain/entities/Appointment');
const { AppointmentStatus, AppointmentType } = require('../../../domain/enums');
const { AuthorizationException, BusinessRuleException, NotFoundException } = require('../../../domain/exceptions');

class BookAppointmentUseCase {
    static FIXED_PRICE = 50000;
    constructor({ appointmentRepository, userRepository }) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    async execute(request) {
        const { patientId, doctorId, appointmentDate, symptoms, notes } = request;
        const startTime = new Date(appointmentDate);
        const DURATION = 30;

        const doctor = await this.userRepository.findById(doctorId);
        if (!doctor || !doctor.isDoctor()) {
            throw new NotFoundException("Doctor not found");
        }

        const patient = await this.userRepository.findById(patientId);
        if (!patient) throw new AuthorizationException("User not found");

        if (!doctor.isWorkingAt(startTime, DURATION)) {
            throw new BusinessRuleException("Doctor is not working at this time");
        }

        const endTime = new Date(startTime.getTime() + DURATION * 60000);
        const overlapping = await this.appointmentRepository.findOverlapping(doctorId, startTime, endTime);

        if (overlapping.length > 0) {
            throw new BusinessRuleException("The selected time slot is already booked");
        }

        const feeAmount = BookAppointmentUseCase.FIXED_PRICE;

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            type: AppointmentType.CHAT,
            appointmentDate: startTime,
            durationMinutes: 30,
            status: AppointmentStatus.PENDING,
            calculatedFee: new Money(feeAmount),
            symptoms: symptoms,
            doctorNotes: notes || ''
        });

        await this.appointmentRepository.save(newAppointment);

        return {
            message: "Appointment booked successfully",
            price: feeAmount
        };
    }
}

module.exports = BookAppointmentUseCase;