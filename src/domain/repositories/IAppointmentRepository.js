const { NotImplementedException } = require('../exceptions');

class IAppointmentRepository {
    async addMessage(appointmentId, messageEntity) {
        throw new NotImplementedException('addMessage');
    }

    async findById(appointmentId) {
        throw new NotImplementedException('findById');
    }

    async save(appointment) {
        throw new NotImplementedException('save');
    }

    async findOverlapping(doctorId, startTime, endTime) {
        throw new NotImplementedException('findOverlapping');
    }
}
module.exports = IAppointmentRepository;