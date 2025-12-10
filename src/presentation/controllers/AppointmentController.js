const BookAppointmentRequest = require('../../application/dtos/appointment/BookAppointmentRequest');

class AppointmentController {
    constructor({ bookAppointmentUseCase, getMyAppointmentsUseCase }) {
        this.bookAppointmentUseCase = bookAppointmentUseCase;
        this.getMyAppointmentsUseCase = getMyAppointmentsUseCase;
    }

    bookAppointment = async (req, res, next) => {
        try {
            const requestDto = new BookAppointmentRequest({
                patientId: req.user.id,
                ...req.body
            });
            const result = await this.bookAppointmentUseCase.execute(requestDto);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };
    getMyAppointments = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const appointments = await this.getMyAppointmentsUseCase.execute(userId);
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AppointmentController;