const IAppointmentRepository = require('../../../../domain/repositories/IAppointmentRepository');
const AppointmentModel = require('../models/AppointmentModel');
const Appointment = require('../../../../domain/entities/Appointment');
const Message = require('../../../../domain/entities/Message');

class MongoAppointmentRepository extends IAppointmentRepository {
    _toDomain(doc) {
        if (!doc) return null;
        return new Appointment({
            id: doc._id,
            patientId: doc.patientId,
            doctorId: doc.doctorId,
            type: doc.type,
            appointmentDate: doc.appointmentDate,
            status: doc.status,
            messages: (doc.messages || []).map(m => new Message({
                senderId: m.senderId,
                content: m.content,
                type: m.type,
                fileUrl: m.fileUrl,
                timestamp: m.timestamp,
                isRead: m.read,
                aiAnalysis: m.aiAnalysis
            }))
        });
    }

    async findById(id) {
        const doc = await AppointmentModel.findById(id).lean();
        return this._toDomain(doc);
    }
    async addMessage(appointmentId, messageEntity) {
        const messageData = {
            senderId: messageEntity.senderId,
            content: messageEntity.content,
            type: messageEntity.type,
            fileUrl: messageEntity.fileUrl,
            timestamp: messageEntity.timestamp,
            read: messageEntity.isRead,
            aiAnalysis: messageEntity.aiAnalysis ? {
                suggestion: messageEntity.aiAnalysis.suggestion,
                warning: messageEntity.aiAnalysis.warning,
                confidence: messageEntity.aiAnalysis.confidence
            } : null
        };
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            $push: { messages: messageData }
        });
    }
}

module.exports = MongoAppointmentRepository;