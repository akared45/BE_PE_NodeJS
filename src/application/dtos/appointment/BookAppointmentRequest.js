class BookAppointmentRequest {
    constructor(data) {
        this.patientId = data.patientId;
        this.doctorId = data.doctorId;
        this.appointmentDate = data.appointmentDate;
        this.symptoms = data.symptoms;
        this.notes = data.notes;
    }
}
module.exports = BookAppointmentRequest;