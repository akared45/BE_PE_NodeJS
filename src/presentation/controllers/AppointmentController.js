const BookAppointmentRequest = require('../../application/dtos/appointment/BookAppointmentRequest');

class AppointmentController {
    constructor({ bookAppointmentUseCase }) {
        this.bookAppointmentUseCase = bookAppointmentUseCase;
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
}

module.exports = AppointmentController;