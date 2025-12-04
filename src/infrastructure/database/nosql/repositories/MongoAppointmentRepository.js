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
    _toPersistence(entity) {
        return {
            _id: entity.id,
            patientId: entity.patientId,
            doctorId: entity.doctorId,
            type: entity.type,
            appointmentDate: entity.appointmentDate,
            durationMinutes: entity.durationMinutes,
            status: entity.status,
            calculatedFee: entity.calculatedFee.amount || entity.calculatedFee,
            symptoms: entity.symptoms,
            doctorNotes: entity.doctorNotes,
        };
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

    async save(appointmentEntity) {
        const data = this._toPersistence(appointmentEntity);
        await AppointmentModel.findByIdAndUpdate(
            data._id,
            data,
            { upsert: true, new: true }
        );
    }

    async findOverlapping(doctorId, newStart, newEnd) {
        const bufferTime = 30 * 60000;
        const docs = await AppointmentModel.find({
            doctorId: doctorId,
            status: { $ne: 'cancelled' },
            appointmentDate: {
                $gte: new Date(newStart.getTime() - bufferTime + 1),
                $lt: newEnd
            }
        }).lean();
        return docs.filter(doc => {
            const docStart = new Date(doc.appointmentDate);
            const docEnd = new Date(docStart.getTime() + (doc.durationMinutes || 30) * 60000);
            return (docStart < newEnd && docEnd > newStart);
        }).map(d => this._toDomain(d));
    }
}

module.exports = MongoAppointmentRepository;