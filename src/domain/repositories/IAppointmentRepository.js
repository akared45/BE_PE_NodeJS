const { NotImplementedException } = require('../exceptions');

class IAppointmentRepository {
    async addMessage(appointmentId, messageEntity) {
        throw new NotImplementedException('addMessage');
    }

    async findById(appointmentId) {
        throw new NotImplementedException('findById');
    }
}
module.exports = IAppointmentRepository;