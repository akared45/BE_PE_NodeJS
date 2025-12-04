const mongoose = require("mongoose");
const { AppointmentStatus, AppointmentType } = require('../../../../domain/enums');

const MessageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    type: { type: String, default: 'text' },
    content: { type: String, required: true },
    fileUrl: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    aiAnalysis: {
        suggestion: String,
        warning: String,
        confidence: Number
    }
}, { _id: false });

const AppointmentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    patientId: { type: String, required: true, ref: 'User' },
    doctorId: { type: String, required: true, ref: 'User' },
    type: { type: String, enum: Object.values(AppointmentType), default: AppointmentType.VIDEO },
    appointmentDate: Date,
    durationMinutes: Number,
    status: { type: String, enum: Object.values(AppointmentStatus), default: AppointmentStatus.PENDING },
    symptoms: String,
    doctorNotes: String,
    messages: [MessageSchema]

}, { timestamps: true, _id: false });

module.exports = mongoose.model('Appointment', AppointmentSchema);