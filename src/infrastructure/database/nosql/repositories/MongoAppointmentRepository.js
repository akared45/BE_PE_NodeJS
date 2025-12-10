const IAppointmentRepository = require('../../../../domain/repositories/IAppointmentRepository');
const AppointmentModel = require('../models/AppointmentModel');
const Appointment = require('../../../../domain/entities/Appointment');

class MongoAppointmentRepository extends IAppointmentRepository {
    _toDomain(doc) {
        if (!doc) return null;
        const pId = doc.patientId?._id ? doc.patientId._id.toString() : doc.patientId;
        const dId = doc.doctorId?._id ? doc.doctorId._id.toString() : doc.doctorId;

        return new Appointment({
            id: doc._id.toString(),
            patientId: pId,
            doctorId: dId,
            type: doc.type,
            appointmentDate: doc.appointmentDate,
            durationMinutes: doc.durationMinutes,
            status: doc.status,
            symptoms: doc.symptoms,
            doctorNotes: doc.doctorNotes,
            createdAt: doc.createdAt,
            symptomDetails: doc.symptomDetails,
            prescriptions: doc.prescriptions
        });
    }

    async findById(id) {
        const doc = await AppointmentModel.findById(id).lean();
        if (!doc) return null;
        return this._toDomain(doc);
    }

    async findByUserId(userId) {
        const docs = await AppointmentModel.find({
            $or: [
                { patientId: userId },
                { doctorId: userId }
            ]
        })
            .sort({ appointmentDate: -1 })
            .populate('patientId', 'name username profile avatar')
            .populate('doctorId', 'name username profile avatar')
            .lean();
        return docs.map(doc => {
            const getDisplayName = (u) => {
                if (!u) return "Unknown";
                if (u.name) return u.name;
                if (u.profile?.fullName) return u.profile.fullName;
                return u.username || "Unknown";
            };

            return {
                id: doc._id.toString(),
                status: doc.status,
                appointmentDate: doc.appointmentDate,
                symptoms: doc.symptoms,
                patientId: doc.patientId?._id || doc.patientId,
                patientName: getDisplayName(doc.patientId),
                doctorId: doc.doctorId?._id || doc.doctorId,
                doctorName: getDisplayName(doc.doctorId),
            };
        });
    }

    async save(appointment) {
        const persistenceData = {
            _id: appointment.id,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            status: appointment.status,
            type: appointment.type,
            appointmentDate: appointment.appointmentDate,
            durationMinutes: appointment.durationMinutes,
            symptoms: appointment.symptoms,
            doctorNotes: appointment.doctorNotes,
            symptomDetails: appointment.symptomDetails,
            prescriptions: appointment.prescriptions
        };

        await AppointmentModel.findByIdAndUpdate(
            appointment.id,
            persistenceData,
            { upsert: true, new: true }
        );

        return appointment;
    }


}

module.exports = MongoAppointmentRepository;