const IAppointmentRepository = require('../../../../domain/repositories/IAppointmentRepository');
const AppointmentModel = require('../models/AppointmentModel');
const Appointment = require('../../../../domain/entities/Appointment');
const Message = require('../../../../domain/entities/Message');
const Money = require('../../../../domain/value_objects/Money');

class MongoAppointmentRepository extends IAppointmentRepository {
    _toDomain(doc) {
        if (!doc) return null;
        return new Appointment({
            id: doc._id,
            patientId: doc.patientId,
            doctorId: doc.doctorId,
            type: doc.type,
            appointmentDate: doc.appointmentDate,
            durationMinutes: doc.durationMinutes,
            status: doc.status,
            calculatedFee: new Money(doc.calculatedFee),
            symptoms: doc.symptoms,
            doctorNotes: doc.doctorNotes,
            createdAt: doc.createdAt,
            messages: (doc.messages || []).map(m => new Message(m)),
            symptomDetails: doc.symptomDetails || [],
            prescriptions: doc.prescriptions || [],
        });
    }

    _toPersistence(entity) {
        return {
            _id: entity.id.toString(),
            patientId: entity.patientId,
            doctorId: entity.doctorId,
            type: entity.type,
            appointmentDate: entity.appointmentDate,
            durationMinutes: entity.durationMinutes,
            status: entity.status,
            calculatedFee: entity.calculatedFee.amount,
            symptoms: entity.symptoms,
            doctorNotes: entity.doctorNotes,
            createdAt: entity.createdAt,
            messages: entity.messages,
            symptomDetails: entity.symptomDetails,
            prescriptions: entity.prescriptions

        };
    }

    async save(appointmentEntity) {
        const data = this._toPersistence(appointmentEntity);
        const updatedDoc = await AppointmentModel.findByIdAndUpdate(
            data._id,
            data,
            { upsert: true, new: true }
        ).lean();
        return this._toDomain(updatedDoc);
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

    async findOverlapping(doctorId, newStart, newEnd) {
        const startOfDay = new Date(newStart);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(newStart);
        endOfDay.setHours(23, 59, 59, 999);
        const docs = await AppointmentModel.find({
            doctorId: doctorId,
            status: { $ne: 'cancelled' },
            appointmentDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).lean();
        const overlappingDocs = docs.filter(doc => {
            const existingStart = new Date(doc.appointmentDate);
            const existingEnd = new Date(existingStart.getTime() + (doc.durationMinutes || 30) * 60000);
            return (existingStart < newEnd && existingEnd > newStart);
        });

        return overlappingDocs.map(d => this._toDomain(d));
    }
    async getBookedAppointments(doctorId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const docs = await AppointmentModel.find({
            doctorId: doctorId,
            status: { $ne: 'cancelled' },
            appointmentDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).select('appointmentDate durationMinutes').lean();

        return docs;
    }
}

module.exports = MongoAppointmentRepository;