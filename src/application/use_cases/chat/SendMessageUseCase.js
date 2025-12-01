const Message = require('../../../domain/entities/Message');
const { AuthorizationException, NotFoundException } = require('../../../domain/exceptions');
const MessageResponse = require('../../dtos/chat/MessageResponse');

class SendMessageUseCase {
    constructor({ appointmentRepository }) {
        this.appointmentRepository = appointmentRepository;
    }

    async execute(request) {
        const { senderId, appointmentId, content, type, fileUrl } = request;
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new NotFoundException("Appointment not found");
        }

        if (!appointment.hasParticipant(senderId)) {
            throw new AuthorizationException("You are not a participant of this appointment");
        }
        const newMessage = new Message({
            senderId,
            content,
            type,
            fileUrl,
            timestamp: new Date()
        });
        await this.appointmentRepository.addMessage(appointmentId, newMessage);
        return new MessageResponse(newMessage);
    }
}

module.exports = SendMessageUseCase;