const mongoose = require('mongoose');
const DEFAULT_FEE = 500000;
const AppointmentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    patientId: {
        type: String,
        ref: 'User',
        required: true
    },

    doctorId: {
        type: String,
        ref: 'User',
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },
    durationMinutes: {
        type: Number,
        default: 30
    },

    type: {
        type: String,
        enum: ['video', 'audio', 'chat', 'in_person'],
        default: 'chat'
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'in_progress'],
        default: 'pending'
    },

    calculatedFee: {
        type: Number,
        default: DEFAULT_FEE 
    },

    symptoms: String,
    doctorNotes: String,

    symptomDetails: [{ type: mongoose.Schema.Types.Mixed }],
    prescriptions: [{ type: mongoose.Schema.Types.Mixed }]

}, { timestamps: true, _id: false });

AppointmentSchema.index({ doctorId: 1, appointmentDate: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);